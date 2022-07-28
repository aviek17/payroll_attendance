import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import Heading from './SubComponents/Heading'
import Swal from 'sweetalert2'

import axios from "axios"


const AddRole = () => {


    const [values, setValues] = useState({
        role: '',
        description: '',
        hod: ''
    })


    const handleChange = (prop) => (e) => {
        setValues({
            ...values,
            [prop]: e.target.value
        })
    }


    const addRole = async (event) => {
        const res = await axios.post("http://localhost:5000/addRole", {
            name: values.role,
            description: values.description,
            head: values.hod
        })

        if (res.status === 200) {
            // window.alert(res.data.message)
            Swal.fire({
                icon: 'success',
                title: "Success",
                text: res.data.message

            })
        } else {
            // window.alert(res.data.error)
            Swal.fire({
                icon: 'error',
                title: "Error",
                text: res.data.error

            })
        }
    }

    return (
        <>
            <div className="container bg-light mt-5 nempMain">
                <Heading
                    heading="Roles"
                />

                <div className="container  mt-5 mb-4">
                    <h4 className="mt-5 mb-3">Add New Role</h4>
                </div>
                <hr />
                <div className="container mt-5 mb-5 attMain ">
                    <div className="row form-group justify-content-center d-flex">
                        <label className="col-md-2 control-label"> Role: </label>
                        <div className="col-md-4">
                            <TextField id="outlined" label="Role" fullWidth required value={values.role} onChange={handleChange('role')} />
                        </div>
                    </div>
                    <br />
                    <div className="row form-group justify-content-center d-flex ">
                        <label className="col-md-2 control-label"> Description: </label>
                        <div className="col-md-4">
                            <TextField id="outlined" label="Description" fullWidth value={values.description} onChange={handleChange('description')} />
                        </div>
                    </div>
                    <br />
                    <div className="row form-group justify-content-center d-flex">
                        <label className="col-md-2 control-label"> Head of Department: </label>
                        <div className="col-md-4">
                            <FormControl fullWidth>

                                <TextField id="outlined" label="Head of Department" fullWidth value={values.hod} onChange={handleChange('hod')} />
                            </FormControl>
                        </div>
                    </div>
                    <br />
                    <div className='mt-3 justify-content-center d-flex'>
                        <Button variant='contained' style={{ width: '180px' }} className="mb-5" onClick={addRole}>
                            Submit
                        </Button>
                    </div>
                </div>


            </div>
        </>
    )
}

export default AddRole