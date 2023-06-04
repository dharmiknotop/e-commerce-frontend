import React from 'react'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import './FeaturedProducts.css'
const Products = ({ product, i }) => {
  return (
    <div className={`Products s${i}`}>
      <div className={`featuringProduct `}>
        <div className="cart-container">
          <div className="FeaturedProduct">
            <div className="theFront">
              <LazyLoadImage
                className="card-img-top"
                src={product.images[0].url}
                alt="Card image cap"
              />
            </div>

            <div className="theBack d-flex justify-content-center flex-column align-items-center">
              <div className="d-flex align-items-center flex-column ">
                <Link className="BugFixed" to={`/product/${product._id}`}>
                  <span>{product.name}</span>
                </Link>
                <span>₹{product.price}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="">sdsda</div>
      </div>
      <div className="productName">
        {' '}
        <span> {product.name} </span> <span>₹ {product.price} </span>
      </div>
    </div>
  )
}

export default Products
