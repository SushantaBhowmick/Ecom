import React, { useEffect } from 'react'
import "./Dashboard.css"
import Sidebar from './Sidebar.jsx'
import { Typography } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Chart from 'chart.js/auto';
import { Doughnut, Line } from "react-chartjs-2"
import { useDispatch, useSelector } from 'react-redux'
import { getAdminProduct } from '../../actions/productAction'
import { getAllOrders } from '../../actions/orderAction'
import { getUsers } from '../../actions/userAction'

const Dashboard = () => {

    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);

    let outOfStock = 0;

    products &&
        products.forEach((item) => {
            if (item.stock === 0) {
                outOfStock += 1;
            }
        });
    useEffect(() => {

        dispatch(getAdminProduct())
        dispatch(getAllOrders())
        dispatch(getUsers());
    }, [dispatch])
    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["tomato"],
                hoverBackgroundColor: ["rgb(197,72,79)"],
                data: [0, 4000]

            },
        ],
    };
    const doughnutState = {
        labels: ["Out Of Stock", "InStock"],
        datasets: [
            {
                backgroundColor: ["#00A6B4", "#6B00B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock]

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
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to={"/admin/orders"}>
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to={"/admin/users"}>
                            <p>Users</p>
                            <p>{users ? users.length : 9}</p>
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