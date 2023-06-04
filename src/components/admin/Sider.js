import React from 'react'
import logo from '../parth-logo.webp'
import { Link } from 'react-router-dom'
import './Sider.css'
const Sider = () => {
  return (
    <>
      <div className="sider bg-light">
        <img src={logo} alt="" />
        <Link to="/admin/dashBoard">
          {' '}
          <p className="p-4">DashBoard</p>
        </Link>
        <Link to="/admin/products">
          {' '}
          <p className="p-4 ">Produts</p>
        </Link>
        <Link to="/admin/orders">
          {' '}
          <p className="p-4">Order</p>
        </Link>
        <Link to="/admin/users">
          {' '}
          <p className="p-4">Users</p>
        </Link>
      </div>
    </>
  )
}

export default Sider
