import React, { useRef, useState } from 'react'

const AddWidgets = ({ addWidget, dashboard }) => {
    const [selectedCategory, setSelectedCategory] = useState(" ");
    const [widgets, setWidgets] = useState({
        "id": Date.now(),
        title: "", content: ""
    })
    const refClose = useRef(null);
    const id = Date.now();

    const handleClick = (e) => {
        e.preventDefault();
        selectedCategory &&
            addWidget(selectedCategory, id, widgets.title, widgets.content)
        setWidgets({ title: "", content: "" })
        setSelectedCategory(" ")
        refClose.current.click();
    }
    const handleChange = (e) => {
        setWidgets({ ...widgets, [e.target.name]: e.target.value });
    }


    return (
        <div className="card m-2" style={{ width: "18rem", height: "9rem" }}>
            <div className="card-body d-flex justify-content-center align-items-center">
                <button type="button" className=" navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation"><span className='btn btn-outline-primary'>+Add Widgets</span></button>
                <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Add Widgets</h5>
                        <button ref={refClose} type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <div>
                            <p>Personalise your Dashboard</p>
                            <form>
                                <select className="form-select" aria-label="Default select example" onChange={(e) => setSelectedCategory(e.target.value)}>
                                    <option value="">Select Category</option>
                                    {dashboard.categories.map((category) => (
                                        <option key={category.name} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                                <div>
                                    <div className="my-3">
                                        <label htmlFor="widgetname" className="form-label">Enter Widget Name</label>
                                        <input type="text" className="form-control" name='title' id="widgetname" value={widgets.title} minLength={1} onChange={handleChange} aria-describedby="emailHelp" />
                                    </div>
                                    <div className="my-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Enter Widget Content</label>
                                        <input name='content' value={widgets.content} onChange={handleChange} minLength={1} type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                                    </div>
                                    <button className='btn btn-primary' disabled={widgets.title.length < 1 || widgets.content.length < 1} type='submit'
                                        onClick={handleClick}
                                    >
                                        Add to {selectedCategory}
                                    </button>
                                </div>

                            </form>

                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default AddWidgets
