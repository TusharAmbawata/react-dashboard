import React, { useEffect, useRef, useState } from 'react'
import Row from './Row'
import { dashboardData } from '../data'
import Navbar from './Navbar';

const Dashboard = () => {
  const [dashboard, setDashboard] = useState(loadFromLocalStorage());
  const [widgets, setWidgets] = useState({ id: "", etitle: "", econtent: "" });
  const ref = useRef(null);
  const refClose = useRef(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [c, setC] = useState("");
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    saveToLocalStorage(dashboard);
  }, [dashboard]);

  const addWidget = (categoryName, id, title, content) => {
    const widget = { id, title, content };
    const updatedCategories = dashboard.categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: [...category.widgets, widget],
        };
      }
      return category;
    });

    setDashboard({ ...dashboard, categories: updatedCategories });
  };

  const removeWidget = (categoryName, widgetId) => {
    const updatedCategories = dashboard.categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: category.widgets.filter((widget) => widget.id !== widgetId),
        };
      }
      return category;
    });

    setDashboard({ ...dashboard, categories: updatedCategories });
  };

  const updateWidget = (categoryName, id, title, content) => {
    const widgetd = { id, title, content };
    const updatedCategories = dashboard.categories.map((category) => {
      if (category.name === categoryName) {
        return {
          ...category,
          widgets: category.widgets.map((widget) => {
            if (widget.id === id) {
              return { ...widget, ...widgetd };
            }
            return widget;
          }),
        };
      }
      return category;
    });

    setDashboard({ ...dashboard, categories: updatedCategories });
  };

  const updateN = (category, id, title, content) => {
    setC(category);
    setWidgets({ id, etitle: title, econtent: content });
    ref.current.click();
  };

  const onchange = (e) => {
    setWidgets({ ...widgets, [e.target.name]: e.target.value });
  };

  const handleClick = () => {
    updateWidget(c, widgets.id, widgets.etitle, widgets.econtent);
    refClose.current.click();
  };

  const addCategory = () => {
    if (newCategoryName.trim() === "") return;

    const newCategory = {
      name: newCategoryName,
      widgets: [],
    };

    setDashboard({
      ...dashboard,
      categories: [...dashboard.categories, newCategory],
    });

    setNewCategoryName("");
  };

  const removeCategory = (categoryName) => {
    const updatedCategories = dashboard.categories.filter(
      (category) => category.name !== categoryName
    );

    setDashboard({ ...dashboard, categories: updatedCategories });
  };

  return (
    <>
      <div>
        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Widget</h1>
                <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <form className='my-4'>
                  <div className="mb-3">
                    <label htmlFor="etitle" className="form-label">Widget Title</label>
                    <input type="text" className="form-control" id="etitle" name="etitle" minLength={1} value={widgets.etitle} aria-describedby="emailHelp" onChange={onchange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="edescription" className="form-label">Widget Description</label>
                    <input type="text" className="form-control" id="econtent" name="econtent" minLength={1} value={widgets.econtent} onChange={onchange} />
                  </div>
                </form>
              </div>
              <div className="modal-footer">
                <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button disabled={widgets.etitle.length < 1 || widgets.econtent.length < 1} type="button" className="btn btn-primary" onClick={handleClick}>Update Widget</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Navbar dashboard={dashboard} searchTerm={searchTerm} setSearchTerm={setSearchTerm} newCategoryName={newCategoryName} setNewCategoryName={setNewCategoryName} addCategory={addCategory}/>
        {dashboard.categories.map((category) => {
          // Filter widgets based on the search term
          const filteredWidgets = category.widgets.filter(widget =>
            widget.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            widget.content.toLowerCase().includes(searchTerm.toLowerCase())
          );

          return (
            <Row
              key={category.name}
              category={{ ...category, widgets: filteredWidgets }}
              removeWidget={removeWidget}
              addWidget={addWidget}
              updateN={updateN}
              removeCategory={removeCategory}
              dashboard={dashboard}
            />
          );
        })}
      </div>
    </>
  )
}

// Function to save dashboard data to localStorage
const saveToLocalStorage = (data) => {
  localStorage.setItem("dashboardData", JSON.stringify(data));
};

// Function to load dashboard data from localStorage
const loadFromLocalStorage = () => {
  const savedData = localStorage.getItem("dashboardData");
  return savedData ? JSON.parse(savedData) : dashboardData.dashboard;
};

export default Dashboard;
