import React, { Fragment } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import Product from './Product.jsx'
import MetaData from '../layout/MetaData'

const product ={
  name:"Blue TShirt",
  image:[{url:"https://www.beyoung.in/api/cache/catalog/products/full_sleeves_new_update_images/plain_navy_blue_full_sleeves_t-shirt_base_08_03_2023_400x533.jpg"}],
  price:"$100",
  _id:"sushanta"

}

const Home = () => {
  return (
    <>
    <MetaData title={"ECOMMERCE"} />
      <div className="banner">
        <p>Welcome to Ecommerce</p>
        <h1>FIND AMAZING PRODUCTS BELOW</h1>

        <a href="#container">
          <button>
            Scroll <CgMouse />
          </button>
        </a>
      </div>
      <h1 className='homeHeading'>Featured Products</h1>
      <div className="container" id='container'>
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
    <Product product={product} />
      </div>
    </>
  )
}

export default Home