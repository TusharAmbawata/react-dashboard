import React from 'react'

const Widgets = ({ widget, categoryName, removeWidget, updateN }) => {

    return (
        <>
            <div className="card m-2" style={{ width: "18rem", minHeight: "9rem" }}>
                <div className="card-body">
                    <h5 className="card-title">{widget.title}</h5>
                    <p className="card-text">{widget.content}</p>
                    <div className='d-flex justify-content-end'>
                        <button className='btn btn-danger' onClick={() => removeWidget(categoryName, widget.id)}>
                            Remove
                        </button>
                        <button className='btn btn-primary mx-2' onClick={() => updateN(categoryName, widget.id, widget.title, widget.content)}>
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Widgets
