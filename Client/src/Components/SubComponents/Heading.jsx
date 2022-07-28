import React from 'react'
import { Link,useHistory } from 'react-router-dom'

const Heading = (props) => {

  const history = useHistory();


  //console.log(history.location.pathname);
  return (
        <>
            <div className="mb-2 d-flex justify-content-between align-items-center" >
                    <h3 className=" mt-4 display-6">{props.heading}</h3>
                    <Link  className="homeBtn" onClick={() => {history.push('/')}}  > <i className="fa fa-home"></i> Home </Link>
              </div>
        </>
    
  )
}

export default Heading;