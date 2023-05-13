import React, { Fragment, useEffect } from 'react'
import "./Product.css"
import Loader from '../layout/Loader/Loader'
import { useDispatch, useSelector } from 'react-redux';
import { getProduct } from '../../actions/productAction';
import ProductCard from '../Home/ProductCard'

const Products = () => {
  const dispatch = useDispatch();
  const { products, loading, error, productCount } = useSelector(
    (state) => state.products
  );

  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch])
  return (
    <Fragment>
      {loading ? (<Loader />) : (
        <Fragment>
          <h2 className="productHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  )
}

export default Products
