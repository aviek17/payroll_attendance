import axios from 'axios';
import {useState} from 'react';


const [dept, setDept] = useState([]);
const [leaveStat, setLeaveStat] = useState([]);
const [totalLeave, setTotalLeave] = useState([]);
const getCount = async () => {
  const res = await axios.get("http://localhost:5000/getCount");
}



export const department = {
    legend: {
      top: 'bottom',
      left : '15%'
    },
   
    series: [
      {
        name: 'Department Chart',
        type: 'pie',
        radius: [50, 200],
        center: ['55%', '50%'],
        // roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          { value: 40, name: 'rose 1' },
          { value: 38, name: 'rose 2' },
          { value: 32, name: 'rose 3' },
          { value: 30, name: 'rose 4' },
          { value: 28, name: 'rose 5' },
          { value: 26, name: 'rose 6' },
          { value: 22, name: 'rose 7' },
          { value: 18, name: 'rose 8' }
        ]
      }
    ]
  };

  export const Leave = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      bottom: '1%',
      left: '25%'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: false,
            fontSize: '40',
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Search Engine' },
          { value: 735, name: 'Direct' },
          { value: 580, name: 'Email' },
          { value: 484, name: 'Union Ads' },
          { value: 300, name: 'Video Ads' }
        ]
      }
    ]
  };