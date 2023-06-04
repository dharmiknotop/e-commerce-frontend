import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetails } from '../redux/actions/productAction'
import { useParams } from 'react-router-dom'
import { addItemsToCart } from '../redux/actions/cartAction'
import { useNavigate } from 'react-router-dom'
import Loader from '../components/Loader/Loader'
import Navbar from '../components/Navbar'
import './productScreen.css'
import Footer from '../components/Footer'
const Productscreen = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [value, setValue] = useState(0)
  const { product, loading } = useSelector((state) => state.productDetails)
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) {
      return
    }
    setValue(newQty)
  }

  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1
    if (1 >= quantity) {
      return
    }
    setValue(newQty)
  }
  const addtoCart = (newQty) => {
    dispatch(addItemsToCart(id, newQty))
    navigate('/Cart')
  }
  useEffect(() => {
    dispatch(getProductDetails(id))
  }, [dispatch, id])
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container Product p-5 mt-5 mr-5 ml-5 mb-0 ">
            <div className="row">
              <div className="col-lg-6 col-sm-6 col-md-4 productImage">
                {product.images &&
                  product.images.map((item, i) => (
                    <img key={i} src={item.url} alt="" />
                  ))}
              </div>
              <div className="col-lg-6 col-sm-6 col-md-4 ">
                <p>
                  <h1 className="ItemFont  mx-auto ">{product.name}</h1>
                </p>

                <p>
                  <b>
                    <span className="ItemFont ">{product.price}</span>
                  </b>
                </p>

                <p>
                  <span className="ItemFont">Quantity</span>
                </p>
                <div className="quantity1">
                  <button
                    className="plus"
                    onClick={() => {
                      increaseQuantity(product._id, value, product.stock)
                    }}
                  >
                    +
                  </button>
                  <input type="text" readOnly value={value} />
                  <button
                    className="minus"
                    onClick={() => {
                      decreaseQuantity(product._id, value)
                    }}
                  >
                    -
                  </button>
                </div>
                <p>
                  <button
                    onClick={() => {
                      addtoCart(value)
                    }}
                    className="btn btn-outline-primary"
                  >
                    {' '}
                    ADD TO CART
                  </button>
                </p>
                <p>
                  <h3 className="ItemFont">Description</h3>
                </p>
                <span className="ItemFont">{product.description}</span>
              </div>
            </div>
          </div>
          <Footer />
        </>
      )}
    </>
  )
}

export default Productscreen
