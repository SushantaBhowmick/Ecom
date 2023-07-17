import React, { Fragment } from 'react'
import "./ConfirmOrder.css"
import { useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import CheckOutSteps from './CheckOutSteps';
import { Typography } from '@material-ui/core';
import { Link,useNavigate } from 'react-router-dom';

const ConfirmOrder = () => {

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);

    const naviagte = useNavigate();

    const subTotal = cartItems.reduce(
        (acc, item) => acc + item.quantity * item.price,
        0
    );

    const shippingCharges = subTotal > 1000 ? 0 : 200;

    const tax = subTotal * 0.18;

    const totalPrice = subTotal + tax + shippingCharges;

    const address = `
    ${shippingInfo.address},
    ${shippingInfo.city},
    ${shippingInfo.state},
    ${shippingInfo.pinCode},
    ${shippingInfo.country}`

    const proceedToPayment =()=>{
        const data = {
            subTotal,
            shippingCharges,
            tax,
            totalPrice
        };
        sessionStorage.setItem("orderInfo",JSON.stringify(data));

        naviagte("/process/payment")
       
    }

    return (
        <Fragment>
            <MetaData title={"Confirm Order"} />
            <CheckOutSteps activeStep={1} />
            <div className="confirmOrderPage">
                <div>
                    <div className="confirmShippingArea">
                        <Typography >Shipping Info</Typography>
                        <div className="confirmShippingAreaBox">
                            <div>
                                <p>Name:</p>
                                <span>{user.name}</span>
                            </div>
                            <div>
                                <p>Phone:</p>
                                <span>{shippingInfo.phoneNo}</span>
                            </div>
                            <div>
                                <p>Address:</p>
                                <span>{address}</span>
                            </div>
                        </div>
                    </div>
                    <div className="confirmCartItems">
                        <Typography>Your Cart Items:</Typography>
                        <div className="confirmCartItemsContainer">
                            {cartItems && cartItems.map((item) => (
                                <div key={item.product}>
                                    <img src={item.image} alt="Product" />
                                    <Link to={`/product/${item.product}`} >
                                        {item.name}
                                    </Link>
                                    <span>
                                        {item.quantity} X ₹{item.price} =
                                        <b>₹{item.price * item.quantity}</b>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="orderSummery">
                        <Typography>Order Summery</Typography>
                        <div>
                            <div>
                                <p>SubTotal:</p>
                                <span>₹{subTotal}</span>
                            </div>
                            <div>
                                <p>Shipping Charges:</p>
                                <span>₹{shippingCharges}</span>
                            </div>
                            <div>
                                <p>GST:</p>
                                <span>₹{tax}</span>
                            </div>
                        </div>
                        <div className="orderSummeryTotal">
                            <p>
                                <b>Total:</b>
                            </p>
                            <span>₹{totalPrice}</span>
                        </div>

                        <button onClick={proceedToPayment}>Proceed To Payment</button>

                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default ConfirmOrder