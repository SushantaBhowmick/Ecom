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
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstant';

const ProductList = () => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, products } = useSelector((state) => state.products);
    const { error:deleteError,isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler =(id)=>{
        dispatch(deleteProduct(id))
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
            alert.success("Product Deleted Successfully!");
            navigate("/admin/products")
            dispatch({type:DELETE_PRODUCT_RESET})
        }
        
        dispatch(getAdminProduct())
    },[dispatch,error,alert,isDeleted,deleteError,navigate])

    const columns = [
        { field: "id", headerName: "Product Id", minWidth: 200, flex: 0.5 },
        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 0.8,
        },
        {
            field: "stock",
            headerName: "Stock",
            type:"number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "price",
            headerName: "Price",
            minWidth: 250,
            type: "number",
            flex: 0.5,
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
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`} >
                            <EditIcon />
                        </Link>
                        <Button onClick={()=>deleteProductHandler(params.getValue(params.id, "id"))}>
                            <DeleteIcon />
                        </Button>
                    </Fragment>
                )
            }
        },
    ]

    const rows = [];
    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.stock,
                price: item.price,
                name: item.name,
            })
        });

    return (
        <Fragment>
            <MetaData title={`All Products - Admin`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id='productHeading'>ALL PRODUCTS</h1>
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

export default ProductList