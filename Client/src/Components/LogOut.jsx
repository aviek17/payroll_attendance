import React, {useEffect} from 'react'
import {goLogOut} from "../Apis/apis"
import {useHistory} from "react-router-dom"

const LogOut = () => {
  const history = useHistory();
  const response = async () =>{
    const res =await goLogOut();
    //console.log(res)
    window.localStorage.setItem("loggedState", false)
    history.push("/")
  }
  useEffect(() => {
    response();
  }, [])
  
  return (
    <div></div>
  )
}

export default LogOut