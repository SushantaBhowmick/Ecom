import React from 'react'
import "./Dashboard.css"
import Sidebar from './Sidebar.jsx'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Chart from 'chart.js/auto';
import {Doughnut,Line} from "react-chartjs-2"

const Dashboard = () => {

    const lineState = {
        labels:["Initial Amount","Amount Earned"],
        datasets:[
            {
                label:"TOTAL AMOUNT",
                backgroundColor:["tomato"],
                hoverBackgroundColor:["rgb(197,72,79)"],
                data:[0,4000]
                
            },
        ],
    };
    const doughnutState = {
        labels:["Out Of Stock","InStock"],
        datasets:[
            {
                backgroundColor:["#00A6B4","#6B00B4"],
                hoverBackgroundColor:["#4B5000","#35014F"],
                data:[2,10]
             
            }
        ]
    }
    
  return (
    <div className='dashboard'>
        <Sidebar />
        
        <div className="dashboardContainer">
            <Typography component={"h1"}>Dashboard</Typography>

            <div className="dashboardSummery">
                <div>
                    <p>
                        Total Amount <br /> ₹2000
                    </p>
                </div>
                <div className="dashboardSummeryBox2">
                    <Link to={"/admin/products"}>
                        <p>Products</p>
                        <p>50</p>
                    </Link>
                    <Link to={"/admin/orders"}>
                        <p>Orders</p>
                        <p>4</p>
                    </Link>
                    <Link to={"/admin/users"}>
                        <p>Users</p>
                        <p>2</p>
                    </Link>
                </div>
            </div>
            <div className="lineChart">
                <Line data={lineState} />
            </div>

        <div className="doughnutChart">
            <Doughnut data={doughnutState} />
        </div>

        </div>
    </div>
  )
}

export default Dashboard