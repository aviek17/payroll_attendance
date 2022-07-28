import React, { useState, useEffect } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom';
import Heading from './SubComponents/Heading';
import axios from "axios"
import {allEmployeeList} from "../Apis/apis"

import Swal from 'sweetalert2'


const ViewEmployee = () => {

  const [list, setList] = useState([])
  const getList = async () => {
    const res = await allEmployeeList();
    setList(res.data)
  }

  useEffect(() => {
    getList();
  }, [])


  const deleteEmployee = async (event) => {
    const _id = event.target.value;
    const res = await axios.post("http://localhost:5000/deleteUser", {
      _id : _id
    });

    if(res.data.deletedCount == 1){
      // window.alert("Deleted Successfully");
      Swal.fire({
        icon: 'success',
        title: "Success",
        text: "Deleted Successfully"

    })

      
    }else{
      // window.alert("Deletion Failed");
      Swal.fire({
        icon: 'error',
        title: "Error",
        text: "Deletion Failed"

    })

    }
  }


  return (
    <>
      <div className="bg-light container mt-5 employee nempMain">
        <Heading
          heading="Employee"
        />
        <div className="container pl-4 pr-4 mt-5 d-flex justify-content-between align-items-center">
          <h4> Employee Table </h4>
        </div>
        <hr />

        <table id="dtBasicExample" className="mt-5 mb-5 table table-hover table-responsive table-bordered" >
          <thead className="bg-dark text-light">

            <tr className='text-center'>
              <th class="th-sm" style={{width: "16%"}}>Name
              </th>
              
              <th class="th-sm">Address
              </th>
              <th class="th-sm">Email
              </th>
              <th class="th-sm">Phone
              </th>
              <th class="th-sm">Department
              </th>
              <th class="th-sm" style={{width: "12%"}}>Joining Date
              </th>
              <th class="th-sm">Gender
              </th>
              <th className="th-sm">Marital Status</th>
              <th class="th-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {
              list.map((curr, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td>{curr.firstname} {curr.lastname}</td>
                    
                    <td>{curr.streetAdd}, {curr.city}, {curr.state}</td>
                    <td>{curr.email}</td>
                    <td>{curr.mobile}</td>
                    <td>{curr.role}</td>
                    <td>{curr.joinDate}</td>
                    <td>{curr.gender}</td>
                    <td>{curr.marital}</td>
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          Action
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li>
                            <Link className="dropdown-item" to={`viewemployee/profile/${curr._id}`}> <i className="fa fa-user"></i>  Profile</Link>
                          </li>
                          {/* <li>
                            <Link className="dropdown-item" to={`viewemployee/edit/${curr._id}`}><i className="fa fa-edit"></i>  Edit</Link>
                          </li> */}
                          <li>
                           <button className="dropdown-item" to="#" value={curr._id} onClick={deleteEmployee}><i className="fa fa-trash" ></i> Delete</button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )
              })
            }


          </tbody>

        </table>
        <div className='pagination'>
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                  <span class="sr-only">Previous</span>
                </a>
              </li>
              <li class="page-item"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                  <span class="sr-only">Next</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>



      </div>
    </>
  )
}

export default ViewEmployee;