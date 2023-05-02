import React from 'react'
import playstore from "../../../images/playstore.png"
import appstore from "../../../images/Appstore.png"
import "./footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="" />
        <img src={appstore} alt="" />
      </div>

      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <p>High Quality is our first priority</p>
        <p>Copyrights 2023 &copy; Sushanta Bhowmick</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="https://www.instagram.com/sushanta8514/">Instagram</a>
        <a href="https://github.com/SushantaBhowmick">GitHub</a>
        <a href="https://twitter.com/Sushant31147320">Twitter</a>
      </div>


    </footer>
  )
}

export default Footer