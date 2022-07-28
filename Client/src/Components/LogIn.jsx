import React, { useState } from 'react';
import { NavLink , useHistory } from 'react-router-dom';
import "../App.css"
import LoginImage from "../Images/login-img.png"


const LogIn = () => {
  
  const history = useHistory();
  let name, value

  const [userLog, setUserLog] = useState({
    email: "",
    password: "",
    type : ""
  })


  const handleInputs = (event) => {
    // event.preventDefault()
    name = event.target.name
    value = event.target.value

    setUserLog({ ...userLog, [name]: value })
  }


  const PostData = async (event) => {
    event.preventDefault()
    const {email,password} = userLog;
    // const res = await axios.post("http://localhost:5000/login",{
    //   email:email, password:password
    // })

    const res = await fetch("http://localhost:5000/login",{
      method : "POST",
      credentials: "include",
      headers : {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify({
        employeeId : email, password:password , type : "Employee"
      })
    })

    //console.log(res);
    const data = await res.json() 
    //console.log(data.message)
   
    if(data.message == "success"){
      window.alert("Success")
      window.localStorage.setItem("loggedState", true)
      window.location.reload()
      history.push("/")
    }else{
      window.alert("Not Success")
    }

  }


  return (<>
    <section className="signup">
      <div className="container">
        <div className="signup-content">
          <div className="signup-image">
            <figure>
              <img src={LoginImage} alt="Book Image" srcSet="" />
            </figure>
            
          </div>
          <div className="signup-form">
            <h2 className="form-title">
              Log In  Here
            </h2>
            <form method="POST" id="addBooks" className="register-form">
              <div className="form-group">
                <label htmlFor="email"></label>
                <input type="text" name="email" id="email" autoComplete="off" value={userLog.email}
                  onChange={handleInputs} placeholder="Employee Id" />
              </div>

              <div className="form-group">
                <label htmlFor="password"></label>
                <input type="password" name="password" id="password" autoComplete="off" value={userLog.password}
                  onChange={handleInputs} placeholder="Password" />
              </div>

              <div className="form-group form-button">
                <input type="submit" name="register" id='register' className="form-submit" onClick={PostData} value="Log In" />
              </div>
            </form>

          </div>

        </div>
      </div>
    </section>
  </>)
};

export default LogIn;
