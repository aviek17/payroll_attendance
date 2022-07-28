import React from 'react'

const AdminCards = (props) => {
  return (
        <>
            
                <div className="card mt-2 mb-2" >
                    <div className="card-body p-4">
                        <div className="d-flex justify-content-between">
                            <h2 className="card-title" style={{fontSize:'50px'}} >{props.num}</h2>
                            <i className={props.icon} style={{fontSize:'48px'}} ></i>
                        </div>
                        <h5 className="card-title">{props.heading}</h5>
                        <p className="card-text" style={{fontSize:'12px'}}>{props.para}</p>
                    </div>
                </div>
        </>
  )
}

export default AdminCards