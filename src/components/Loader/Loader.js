import React from 'react'
import './Loader.css'
import logo from '../parth-logo.webp'
const Loader = () => {
  return (
    <div className="loading">
      <div>
        <div></div>
        <span className="logo">
          <img src={logo} alt="" />
        </span>
      </div>
    </div>
  )
}

export default Loader
