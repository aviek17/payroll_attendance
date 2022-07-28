import React, { useState, useEffect } from 'react'
import Heading from './SubComponents/Heading'
import { Backdrop, Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField } from '@mui/material'
import axios from "axios";


const ViewRole = () => {

  const [list, setList] = useState([])

  const getRoles = async () => {
    const res = await axios.get("http://localhost:5000/getAllRoles");
    //console.log(res.data);
    setList(res.data)
  }

  useEffect(() => {
    getRoles()
  }, [])

  const [empName, setEmpName] = useState([])
  const [selectedProject, setSelectedProject] = useState([]);


  const [open, setOpen] = useState(false);
  const handleOpen = async (proj,name) => {
    setSelectedProject(proj)
    // const name = event.target.value;
    const employeeName = await axios.post("http://localhost:5000/getRoleEmployeeName", {
      name: name
    })
    //console.log(employeeName)
    setEmpName(employeeName.data)

    setOpen(true)
  };
  const handleClose = () => setOpen(false);

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '700px',
    height: '350px',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    fontSize: 14,
  };




  const [values, setValues] = useState({

    'hod': '',
    'description': ''
  })



  const handleChange = (prop) => (e) => {
    setValues({
      ...values,
      [prop]: e.target.value,
    })
  }

  return (
    <>
      <div className="container mt-5 bg-light nempMain">
        <Heading
          heading="View Roles"
        />
        <div className="mt-5 mb-3 container">
          <h4>Roles List</h4>
        </div>
        <hr />
        <div className="container">
          <table id="dtBasicExample" className="mt-5 mb-5 table table-hover table-responsive table-bordered" >
            <thead className="bg-dark text-light">
              <tr className='text-center'>
                <th class="th-sm">Department
                </th>

                <th class="th-sm">Description
                </th>
                <th class="th-sm">HOD
                </th>
                <th class="th-sm">Number of Employees
                </th>
                <th class="th-sm">Action
                </th>
              </tr>
            </thead>
            <tbody className="mb-1">
              {
                list.map((curr, index) => {
                  //console.log(curr.name + "---")
                  var deptName = curr.name
                  return (
                    <tr className="text-center" key={index}>
                      <td className="th-sm">{curr.name}</td>
                      <td className="th-sm">{curr.description}</td>
                      <td className="th-sm">{curr.head_of_dept}</td>
                      <td className="th-sm">{curr.no_of_employee}</td>

                      <td>
                        <Button onClick={() => handleOpen(curr,curr.name)} variant="contained">
                          Update
                        </Button>

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

      </div>


      <Modal

        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={style}>

          <div className="container">
            <h5>
              Department  Details
            </h5>
            <hr />
            <div className="row container " >
              <div className="col-md-4">
                <TextField
                  variant='outlined'
                  label="Department"
                  disabled
                  value={selectedProject.name}
                />
              </div>

              <div className="col-md-4 mb-3">
                <TextField
                  variant='outlined'
                  label="Description"
                  onChange={handleChange('description')}
                  value={values.description}
                />
              </div>
            </div>
            <div className="row container">
              <div className="col-md-6 mt-3">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">Select HOD: </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={values.hod}
                    label="Select HOD:"
                    onChange={handleChange('hod')}
                  >
                    {
                      empName.map((x, index) => {
                        var name = x.firstname + " " + x.lastname
                        return (
                          <MenuItem value={name}>{name}</MenuItem>
                        )
                      })
                    }
                  </Select>
                </FormControl>
              </div>
              <div className="col-md-6 mt-3">
                <TextField
                  label="Number of Employee"
                  value={selectedProject.no_of_employee}
                  disabled
                  variant='outlined' />
              </div>
            </div>
            <br />
            <div className="container mt-5 d-flex justify-content-end">
              <Button variant='contained' style={{ width: '180px' }} onClick={handleClose} >
                Submit
              </Button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  )
}

export default ViewRole