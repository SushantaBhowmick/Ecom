import React, { Fragment, useEffect, useState } from 'react'
import "./Product.css"
import Loader from '../layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination';
import Typography from '@material-ui/core/Typography'
import { Slider } from '@material-ui/core';

const categories=[
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartTV",
  "SmartPhones"
];


const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0,25000]);
  const [category,setCategory]= useState("");

  const [ ratings,setRatings]= useState(0)

  const { 
    products, 
    loading, 
    error, 
    productsCount, 
    resultPerPage, 
  } = useSelector(
    (state) => state.products
  );
  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }
  const priceHandler =(event, newPrice)=>{
    setPrice(newPrice)
  }

  useEffect(() => {
    dispatch(getProduct(keyword,currentPage,price,category,ratings));
  }, [dispatch, keyword,currentPage,price,category,ratings]);


  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <Fragment>
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
                <Typography >Price</Typography>
                <Slider 
                value={price}
                onChange={priceHandler}
                valueLabelDisplay='auto'
                aria-labelledby='range-slider'
                min={0}
                max={25000}
                />

                <Typography>Categories</Typography>
                <ul className="category-Box">
                  {
                    categories.map((category)=>(
                      <li
                      className='category-link'
                      key={category}
                      onClick={()=>setCategory(category)}
                      >
                        {category}
                      </li>
                    ))
                  }
                </ul>

                <fieldset>
                  <Typography component="legend">Ratings Above</Typography>
                  <Slider 
                  value={ratings}
                  onChange={(e,newRating)=>{
                    setRatings(newRating);
                  }}
                  aria-labelledby  = "continuous-slider"
                  valueLabelDisplay='auto'
                  min={0}
                  max={5}
                  />
                </fieldset>
          </div>

{
  resultPerPage < productsCount && (
    <div className="paginationBox">
    <Pagination
          activePage={currentPage}
          itemsCountPerPage={resultPerPage}
          totalItemsCount={productsCount}
          onChange={setCurrentPageNo}
          nextPageText="Next"
          prevPageText="Prev"
          firstPageText="1st"
          lastPageText="Last"
          itemClass="page-item"
          linkClass="page-link"
          activeClass="pageItemActive"
          activeLinkClass="pageLinkActive"
        />
    </div>
  )
}
         
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products
