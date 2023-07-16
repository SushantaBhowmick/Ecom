import React, { Fragment } from 'react'
import "./Cart.css"
import CartItemCard from './CartItemCard.jsx'

const Cart = () => {

    const item = {
        product: "productId",
        price: 200,
        name: "Product",
        quantity: 1,
        image: "https://i.ibb.co/DRST11n/1.webp"
    }
    return (
        <Fragment>
            <div className="cartPage">
                <div className="cartHeader">
                    <p>Product</p>
                    <p>Quantity</p>
                    <p>SubTotal</p>
                </div>
                <div className="cartContainer">
                    <CartItemCard item={item} />
                    <div className="cartInput">
                        <button>-</button>
                        <input type="number" value={item.quantity} readOnly />
                        <button>+</button>
                    </div>
                    <p className="cartSubtotal">{`₹${item.price * item.quantity}`}</p>
                </div>

                <div className="cartGrossTotal">
                    <div></div>
                    <div className="cartGrossTotalBox">
                        <p>Gross Total</p>
                        <p>{`₹600`}</p>
                    </div>
                    <div></div>
                    <div className="checkOutBtn">
                        <button>Check Out</button>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Cart