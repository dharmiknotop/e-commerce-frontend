import React from 'react'
import { Link } from 'react-router-dom'

const NewProduct = () => {
  return (
    <div className="newProduct d-flex justify-content-center align-items-center flex-column">
      <div className="SaleContent d-flex flex-column">
        <span>SAVE 30% OFF</span>
        <span>
          {' '}
          Use the Coupon Code for The first Buy and Get 30% discount.
        </span>
        <div>
          <Link to="/products">
            <button className="btn btn-primary ">BUY NOW</button>
          </Link>{' '}
        </div>{' '}
      </div>
    </div>
  )
}

export default NewProduct
