import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import axios from 'axios';
import {Elements} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import WebFont from 'webfontloader'
import './App.css';
import Header from "./components/layout/Header/Header"
import Footer from './components/layout/Footer/Footer';
import About from './components/layout/About/About';
import Contact from './components/layout/Contact/Contact';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails';
import Products from './components/Product/Products';
import Search from './components/Product/Search';
import LoginSignup from './components/User/LoginSignup';
import store from './store'
import { loadUser } from './actions/userAction';
import UserOptions from "./components/layout/Header/UserOptions"
import { useSelector } from 'react-redux';
import Profile from './components/User/Profile';
import ProtectedRoute from './components/Route/ProtectedRoute';
import UpdateProfile from './components/User/UpdateProfile';
import UpdatePassword from './components/User/UpdatePassword';
import ForgotPassword from './components/User/ForgotPassword';
import ResetPassword from './components/User/ResetPassword';
import Cart from './components/Cart/Cart';
import Shipping from './components/Cart/Shipping';
import ConfirmOrder from './components/Cart/ConfirmOrder';
import Payment from './components/Cart/Payment';
import OrderSuccess from './components/Cart/OrderSuccess';
import Orders from './components/Order/Orders';
import OrderDetails from './components/Order/OrderDetails';
import Dashboard from './components/Admin/Dashboard';
import ProductList from './components/Admin/ProductList';
import NewProduct from './components/Admin/NewProduct';
import UpdateProduct from './components/Admin/UpdateProduct';
import OrderList from './components/Admin/OrderList';
import UpdateOrder from './components/Admin/UpdateOrder';
import UserList from './components/Admin/UserList';
import UpdateUser from './components/Admin/UpdateUser';
import ReviewList from './components/Admin/ReviewList';
import NotFound from './components/layout/NotFound/NotFound.jsx';



function App() {

  const {isAuthenticated,user} = useSelector(state=>state.user);

  const [stripeApiKey, setStripeApiKey] =useState("");

  async function getStripeApiKey(){
    const {data} = await axios.get("https://ecommerce-jfiz.onrender.com/api/v1/stripeapikey",{withCredentials: true});

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"],
      },
    });
    store.dispatch(loadUser());

    getStripeApiKey();

  },[])

  window.addEventListener("contextmenu", (e) => e.preventDefault());
  

  return (
  <Router>
    <Header />
    {isAuthenticated && <UserOptions user={user} />}
    <Routes>
    <Route exact path='/' element={<Home />}/>
    <Route exact path='/product/:id' element={<ProductDetails />}/>
    <Route exact path='/products' element={<Products />}/>
    <Route path='/products/:keyword' element={<Products />}/>
    <Route exact path='/search' element={<Search />}/>
    <Route exact path='/login' element={<LoginSignup />} />
    <Route exact path='/about' element={<About />} />
    <Route exact path='/contact' element={<Contact />} />

    <Route element={<ProtectedRoute/> }>
      <Route exact path='/account' element={<Profile />} />
      <Route exact path='/me/update' element={<UpdateProfile />} />
      <Route exact path='/password/update' element={<UpdatePassword />} />
      <Route exact path='/login/shipping' element={<Shipping />} />
      <Route exact path='/order/confirm' element={<ConfirmOrder />} />
      <Route exact path='/cart' element={<Cart />} />

     {stripeApiKey && <Route exact path='/process/payment' element={ <Elements stripe={loadStripe(stripeApiKey)} > <Payment /> </Elements>} />}

      <Route exact path='/success' element={<OrderSuccess />} />
      <Route exact path='/orders' element={<Orders />} />

      <Route exact path='/order/:id' element={<OrderDetails /> } />

      <Route isAdmin={true} exact path='/admin/dashboard' element={<Dashboard /> } />
      <Route isAdmin={true} exact path='/admin/products' element={<ProductList /> } />
      <Route isAdmin={true}  path='/admin/product' element={<NewProduct /> } />
      <Route isAdmin={true}  path='/admin/product/:id' element={<UpdateProduct /> } />
      <Route isAdmin={true}  path='/admin/orders' element={<OrderList /> } />
      <Route isAdmin={true}  path='/admin/order/:id' element={<UpdateOrder /> } />
      <Route isAdmin={true} exact path='/admin/users' element={<UserList /> } />
      <Route isAdmin={true} exact path='/admin/user/:id' element={<UpdateUser /> } />
      <Route isAdmin={true} exact path='/admin/reviews' element={<ReviewList /> } />
    </Route>

 
    <Route exact path='/password/forgot' element={<ForgotPassword />} />
    <Route exact path='/password/reset/:token' element={<ResetPassword />} />

    

    
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
