import { Avatar, Button, Typography } from '@material-ui/core'
import GitHubIcon from "@material-ui/icons/GitHub";
import InstagramIcon from "@material-ui/icons/Instagram";
import "./About.css"
import React from 'react'

const About = () => {

  const visitFacebook= () => {
    window.location = "https://www.facebook.com/sushanta.bhowmick.798";
  };

  return (
   <div className="aboutSection">
    <div></div>
    <div className="aboutSectionGradient"></div>
    <div className="aboutSectionContainer">
      <Typography component={"h1"}>About Us</Typography>

      <div>
        <div>
          <Avatar
          style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
          src="https://scontent.fccu7-1.fna.fbcdn.net/v/t39.30808-6/318244238_1197816031139450_7501008936276927899_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=peWZNJBV26UAX-OYivR&_nc_ht=scontent.fccu7-1.fna&oh=00_AfDHrRnp3QvmghQt8W6D9wcb5RBF3VKSL0IdVek-3nmi_w&oe=64CAE809"
          alt="Founder"
          />
          <Typography >Sushanta Bhowmick</Typography>
          <Button onClick={visitFacebook} >Visit Facebook</Button>
          <span> This is a sample wesbite made by @SushantaBhowmick. Only with the
              purpose to Learn MERN Stack.
          </span>
        </div>
        <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/channel/UCO7afj9AUo0zV69pqEYhcjw"
              target="blank"
            >
              <GitHubIcon className="youtubeSvgIcon" />
            </a>

            <a href="https://www.instagram.com/sushanta8514/" target="blank">
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
      </div>
    </div>
   </div>
  )
}

export default About