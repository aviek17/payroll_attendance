import React, { useState, useEffect, useRef } from 'react'
import { useParams } from "react-router-dom"
import img1 from '../Images/treva.png'
import axios from "axios"
import { Button } from '@mui/material';
import { useReactToPrint } from 'react-to-print';

const Payslip = () => {
   

    
    
    
    // const marginTop="10px"
    const paddingRight="20px"
    // const marginBottom="px"
    const marginLeft="-100px"

    const pageStyle = `
        @page {
            margin-left: ${marginLeft} !important; 
            margin-right: ${paddingRight} !important;
        }

        @media print {
            #content{
                margin-top: 500px !important;
                width: 400px !important;
            }

            .prUpper {
                display: flex !important;
            }
        }
        `;
   


    const componentRef = useRef();
    const printPage = useReactToPrint({
        content: () => componentRef.current,
      });


    // //console.log(salInWord);


    const { id } = useParams()

    var salaries;

    const [list, setList] = useState({})
   

    // const [salInWord,setSalInWord] = useState('');
    var perMon = 0;
    var basic = 0;
    var hra = 0;
    var splAll = 0;
    var pf = 0;
    var it = 0;
    var grat = 0;
    var medIns = 0;
    var grosstot = 0;
    // var salInWord = "";
    const calculateSalaryBreakdown = (sal) => {
        // //console.log("Check"+sal)
        perMon = Number(sal / 12).toFixed(2);

        //console.log(perMon);
        basic = Number((0.4 * perMon).toFixed(2));
        //console.log(basic);

        hra = Number((0.2 * perMon).toFixed(2));
        //console.log(hra);
        splAll = Number((0.17 * perMon).toFixed(2));
        //console.log(splAll);
        pf = Number((0.08 * perMon).toFixed(2));
        //console.log(pf);
        it = Number((0.05 * perMon).toFixed(2));
        //console.log(it);
        grat = Number((0.05 * perMon).toFixed(2));
        //console.log(grat);
        medIns = Number((0.05 * perMon).toFixed(2));
        //console.log(medIns);

        grosstot = Number(basic + hra + splAll + pf + it).toFixed(2);
        //console.log(grosstot);

    }
    // const [salary,setSalary] = useState()
    const getInfo = async () => {
        const res = await axios.post("http://localhost:5000/empInfo", {
            id: id
        })

        // //console.log(res.data.salary);
        setList(res.data)
        // setSalary(res.data.salary)

    }

    useEffect(() => {
        getInfo();

    }, [])
    
    //console.log(list)
    salaries = list.salary
    //console.log(salaries)
    calculateSalaryBreakdown(salaries);


    const d = new Date();
    var yr = Number(String(d.getFullYear()).slice(-2));
    var mon = d.getMonth();
    const month = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    // //console.log(month[mon]+"'"+yr);



    // //console.log(salary)




    return (
        <>
            <style>{ pageStyle }</style>

            <div className="align-items-center container bg-light mt-3 nempMain" id="#content" ref={componentRef} >
                <h3 className="text-center pt-4 ">Payslip For The Month {`${month[mon]}'${yr}`}</h3>
                <div className="row prUpper container lh-1 justify-content-between">
                    <div className="col-md-4">
                        <img height="100" width="100" src={img1} alt="dummy img" />
                        <div className="">
                            <p>Company Name</p>
                            <p>Company Address</p>
                            <p>Company Address 2</p>
                            <br />
                            <br />
                            <p><b>CTC: &nbsp; Rs. {`${salaries}`}</b></p>
                        </div>
                        <br />
                    </div>

                    <div className="col-md-4  payslipRight text-left" >
                        <h6>{list.firstname} {list.lastname}</h6>
                        <p>Role:    {list.role}</p>
                        <p>Employee ID : {list.employeeID}</p>
                        <p>Joining Date: {list.joinDate}</p>
                    </div>
                </div>
                <br />
                <div class=" row container">
                    <div className="col-md-6 container">
                        <table className="table table-striped">
                            <thead>
                                <tr className="font-weight-bold"><h4>Earnings</h4></tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Basic Salary</td>
                                    <td className="text-center">{basic}</td>
                                </tr>
                                <tr>
                                    <td>House Rent Allowance (H.R.A)</td>
                                    <td className="text-center">{hra}</td>
                                </tr>
                                <tr>
                                    <td>Special Allowance</td>
                                    <td className="text-center">{splAll}</td>
                                </tr>
                                {/* <tr>
                                        <td>g</td>
                                        <td className="text-center">55</td>
                                    </tr>
                                    <tr>
                                        <td>Total Earnings</td>
                                        <td className="text-center">3000</td>
                                    </tr> */}
                            </tbody>
                        </table>
                    </div>
                    <br />
                    <div className="col-md-6 container">
                        <table className="table table-striped">
                            <thead>
                                <tr className="font-weight-bold"><h4>Deductions</h4></tr>
                            </thead>
                            <tbody>

                                <tr>
                                    <td>Provinent Fund (PF)</td>
                                    <td className="text-center">{pf}</td>
                                </tr>
                                <tr>
                                    <td>Proffesional Tax (PT)</td>
                                    <td className="text-center">{it}</td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
                <br />
                <div className="container text-capitalize ps-4 pb-1">
                    <p>Gratuity: &nbsp; Rs. {`${grat}`}</p>
                    <p>Medical Insurance: &nbsp; Rs. {`${medIns}`}</p>
                    <p><b>Monthly Gross : &nbsp; Rs. {`${grosstot}/-`}</b></p>
                </div>
            </div>
            <div className="container d-flex justify-content-end mt-2 mb-5">
                <Button variant='contained' onClick={printPage} > Print </Button>
            </div>
        </>
    )
}

export default Payslip