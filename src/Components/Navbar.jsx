import React from 'react'

const Navbar = ({ dashboard, searchTerm, setSearchTerm, newCategoryName, addCategory,setNewCategoryName }) => {
    return (
        <div className="d-flex justify-content-between align-items-center bg-dark text-light p-2 newnav" >
            <h3>{dashboard.name}</h3>
            <div className="d-flex">
                <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Search Widgets"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <input
                    className="form-control me-2"
                    type="text"
                    placeholder="Add New Category"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addCategory}>Add</button>
            </div>
        </div>
    )
}

export default Navbar
