import React, { useState, useEffect } from 'react'
import { Link, NavLink, useHistory } from 'react-router-dom';
import Heading from './SubComponents/Heading';
import axios from "axios"
import Swal from 'sweetalert2'

const ViewUser = () => {

  const history = useHistory();
  // console.log(history.location.pathname);

  const [list, setList] = useState([])
  const getList = async () => {
    const res = await axios.get("http://localhost:5000/findEmployee")
   // console.log(res.data);
    setList(res.data)
  }

  useEffect(() => {
    getList();
  }, [])

  const deleteUser = async (event) => {
    //console.log(event.target.value)
    const response = await axios.post("http://localhost:5000/deleteUser",{
      _id : event.target.value
    })
    if(response.data.deletedCount == 1){
      // window.alert("Deleted Successfully")
      Swal.fire({
        icon: 'success',
        title: "Success",
        text: "Deleted Successfully"

    })
      history.push("/viewuser")
    }else{
      // window.alert("Cannot be Deleted")
      Swal.fire({
        icon: 'success',
        title: "Success",
        text:"Cannot be Deleted"

    })
    }
  }

  return (
    <>
      <div className="bg-light container mt-5 employee nempMain">
        <Heading
          heading="Users"
        />
        <div className="container pl-4 pr-4 mt-5 d-flex justify-content-between align-items-center">
          <h4> User Table </h4>
        </div>
        <hr />

        <table id="dtBasicExample" className="mt-5 mb-5 table table-hover table-responsive table-bordered" >
          <thead className="bg-dark text-light">
            <tr className='text-center'>
              <th class="th-sm">Name
              </th>

              <th class="th-sm">Email
              </th>

              <th class="th-sm">Department
              </th>
              <th class="th-sm">Gender
              </th>
              <th class="th-sm">Employment Type
              </th>


              <th class="th-sm">Actions
              </th>
            </tr>
          </thead>
          <tbody className="mb-1">


            {
              list.map((curr, index) => {
                return (
                  <tr className="text-center" key={index}>
                    <td>{curr.firstname} {curr.lastname}</td>

                    <td>{curr.email}</td>

                    <td>{curr.role}</td>
                    <td>{curr.gender}</td>
                    <td>{curr.employmentType}</td>

                    {/* <td>
                      <div className="dropdown">
                        <button className="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Action
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">

                            <li></li>
                            <li></li>
                          </ul>
                        </div>
                      </div>
                    </td> */}
                    <td>
                      <div class="dropdown">
                        <button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                          Action
                        </button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                          <li>
                            <Link className="dropdown-item" to={`/viewuser/edituser/${curr._id}`}><i className="fa fa-edit"></i>  Edit Role</Link>
                          </li>
                          <li>
                            <button className="dropdown-item" value={curr._id} onClick={deleteUser}><i className="fa fa-trash"></i>  Delete</button>
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

export default ViewUser