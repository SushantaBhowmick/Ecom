import React, { useEffect } from 'react';
import {BrowserRouter as Router, Route, Routes, } from "react-router-dom"
import WebFont from 'webfontloader'
import './App.css';
import Header from "./components/layout/Header/Header"
import Footer from './components/layout/Footer/Footer';
import Home from './components/Home/Home';
import ProductDetails from './components/Product/ProductDetails.js';


function App() {

  useEffect(()=>{
    WebFont.load({
      google:{
        families: ["Roboto","Droid Sans","Chilanka"],
      },
    });
  },[])

  return (
  <Router>
    <Header />
    <Routes>
    <Route exact path='/' element={<Home />}/>
    {/* <Route exact path='/product/:id' element={<ProductDetails />}/> */}
    </Routes>
    <Footer />
  </Router>
  );
}

export default App;
