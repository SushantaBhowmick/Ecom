import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from './CartItemCard.jsx'
import { useDispatch, useSelector } from 'react-redux'
import { addItemsToCart,removeItemFromCart } from '../../actions/cartAction'
import RemoveShoppingCartIcon from '@material-ui/icons/RemoveShoppingCart'
import { Link, useNavigate } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cartItems } = useSelector((state) => state.cart);

    const increaseQuantity = (id, quantity, stock) => {
        const newQty = quantity + 1;
        if (stock <= quantity) {
            return
        }
        dispatch(addItemsToCart(id, newQty))
    }

    const decreaseQuantity = (id, quantity) => {
        const newQty = quantity - 1;
        if ( 1 >= quantity) {
            return
        }
        dispatch(addItemsToCart(id, newQty))
    }
    const deleteCartItems = (id)=>{
        dispatch(removeItemFromCart(id));
    
    };
    const checkOutHandler= ()=>{
        navigate("/login?redirect=shipping")
    }

    return (
        <Fragment>
            {cartItems.length === 0? (
                <div className="emptyCart">
                    <RemoveShoppingCartIcon />
                    <p>No Product In Your Cart</p>
                    <Link to={"/products"} >Go To Products</Link>
                </div>
            ):(
                <Fragment>
                    <MetaData title={`Cart(${cartItems.length})`} />
                <div className="cartPage">
                    <div className="cartHeader">
                        <p>Product</p>
                        <p>Quantity</p>
                        <p>SubTotal</p>
                    </div>
    
                    {
                        cartItems && cartItems.map((item) => (
                            <div className="cartContainer" key={item.product}>
                                <CartItemCard item={item} deleteCartItems = { deleteCartItems} />
                                <div className="cartInput">
                                    <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                    <input type="number" value={item.quantity} readOnly />
                                    <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)}>+</button>
                                </div>
                                <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                            </div>
                        ))
                    }
    
                    <div className="cartGrossTotal">
                        <div></div>
                        <div className="cartGrossTotalBox">
                            <p>Gross Total</p>
                            <p>{`₹${cartItems.reduce(
                                (acc,item)=>acc + item.quantity * item.price,0)}`}</p>
                        </div>
                        <div></div>
                        <div className="checkOutBtn">
                            <button onClick={checkOutHandler}>Check Out</button>
                        </div>
                    </div>
                </div>
            </Fragment>
            )}
        </Fragment>
    )
}

export default Cart