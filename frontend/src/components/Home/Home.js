import React, { useEffect } from 'react'
import { CgMouse } from 'react-icons/cg'
import './Home.css'
import Product from './Product'
import MetaData from '../layout/MetaData'
import { getProduct } from "../../actions/productAction";
import { useDispatch,  } from 'react-redux'


const product = {
  name: "Blue TShirt",
  image: [{ url: "https://www.beyoung.in/api/cache/catalog/products/full_sleeves_new_update_images/plain_navy_blue_full_sleeves_t-shirt_base_08_03_2023_400x533.jpg" }],
  price: "$100",
  _id: "sushanta"

}

const Home = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProduct())
  }, [dispatch])


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