import { Button } from '@material-ui/core'
import React from 'react'
import "./Contact.css"
import { Link } from 'react-router-dom'

const Contact = () => {
  return (
    <div className="contact">
      <Link className='mailBtn' to={"mailto:mymaildevelopers1@gmail.com"} >
        <Button>Contact: mymaildevelopers1@gmail.com</Button>
      </Link>
    </div>
  )
}

export default Contact