import React from 'react'
import Widgets from './Widgets'
import AddWidgets from './AddWidgets'

const Row = ({category,removeWidget,addWidget,updateN,removeCategory,dashboard}) => {
    return (
        <div className='p-4'>
            <div className='d-flex justify-content-between'>
            <h3>{category.name}</h3>
            <button className='btn btn-danger' onClick={()=>removeCategory(category.name)}>Delete</button>
            </div>
            <div className='row row-cols-1 row-cols-md-4 g-4 p-2'>
                {category.widgets.map((e) =>
                    
                        <div key={e.id} className='col'>
                            <Widgets widget={e} key={e.id} categoryName={category.name} removeWidget={removeWidget} updateN={updateN}/>
                        </div>
                    
                )}
                <div className='col'key={category.name}>
                    <AddWidgets addWidget={addWidget} dashboard={dashboard}/>
                </div>
            </div>
        </div>
    )
}

export default Row
