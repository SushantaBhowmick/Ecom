import React, { Fragment, useEffect } from 'react'
import "./ProductList.css"
import { DataGrid } from "@material-ui/data-grid";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import { useDispatch, useSelector } from "react-redux"
import { useAlert } from "react-alert"
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-ui/core';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { deleteOrder, getAllOrders,clearErrors } from '../../actions/orderAction';
import { DELETE_ORDERS_RESET } from '../../constants/orderConstant';

const OrderList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error:deleteError,isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler =(id)=>{
        dispatch(deleteOrder(id))
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (deleteError) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Orders Deleted Successfully!");
            navigate("/admin/orders")
            dispatch({type:DELETE_ORDERS_RESET})
        }
        
        dispatch(getAllOrders())
    },[dispatch,error,alert,isDeleted,deleteError,navigate])

    const columns = [
        { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },
        {
          field: "status",
          headerName: "Status",
          minWidth: 150,
          flex: 0.5,
          cellClassName:(params)=>{
            return params.getValue(params.id,"status")==="Delivered" ?
             "greenColor"
             : "redColor";
          },
        },
        {
          field: "itemQty",
          type: "number",
          headerName: "Items Qty",
          minWidth: 150,
          flex: 0.4
        },
        {
          field: "amount",
          headerName: "Amount",
          type: "number",
          minWidth: 150,
          flex: 0.5
        },
        {
            field: "action",
            headerName: "Action",
            minWidth: 150,
            flex: 0.3,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <Fragment>
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`} >
                            <EditIcon />
                        </Link>
                        <Button onClick={()=>deleteOrderHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ]

    const rows = [];
    orders &&
        orders.forEach((item) => {
            rows.push({
                id: item._id,
                status: item.orderStatus,
                itemQty: item.orderItems.length,
                amount: item.totalPrice,
            })
        });

    return (
        <Fragment>
            <MetaData title={`All ORDERS - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id='productHeading'>ALL ORDERS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className='productListTable'
                        autoHeight
                    />
                </div>
            </div>
        </Fragment>
    )
}

export default OrderList