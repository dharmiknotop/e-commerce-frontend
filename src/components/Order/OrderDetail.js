import React from 'react'
import './OrderDetails.css'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useNavigate, useParams } from 'react-router-dom'
import { Scrollbars } from 'react-custom-scrollbars-2'
import { FaShippingFast } from 'react-icons/fa'
import { getOrderDetails } from '../../redux/actions/orderAction'
import Loader from '../Loader/Loader'
import Footer from '../Footer'
const OrderDetail = () => {
  const { id } = useParams()
  const dispatch = useDispatch()

  const { order, loading } = useSelector((state) => state.orderDetails)

  useEffect(() => {
    dispatch(getOrderDetails(id))
  }, [dispatch, id])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <div className="confirmOrderPage">
            <div>
              <div className="confirmshippingArea">
                <span>
                  <FaShippingFast />{' '}
                  <span style={{ marginLeft: 10 }}>Shippings Info</span>
                </span>{' '}
                <div className="confirmshippingAreaBox">
                  <div>
                    <p>Name:</p>
                    <span>{order.user && order.user.name}</span>
                  </div>
                  <div>
                    <p>Phone:</p>
                    <span>
                      {' '}
                      {order.shippingInfo &&
                        `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                    </span>
                  </div>
                  <div>
                    <p>Address:</p>
                    <span>
                      {order.shippingInfo && order.shippingInfo.address}
                    </span>
                  </div>
                </div>
              </div>

              <div className="confirmCartItems">
                Your Cart Items:
                <Scrollbars style={{ width: '100%', height: '50vh' }}>
                  <div className="confirmCartItemsContainer">
                    {order.orderItems &&
                      order.orderItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {<span>{item.name}</span>}
                          </Link>{' '}
                          <span>
                            {item.quantity} X ₹{item.price} ={' '}
                            <b>₹{item.price * item.quantity}</b>
                          </span>
                        </div>
                      ))}
                  </div>
                </Scrollbars>
              </div>
            </div>

            <div>
              <div className="orderSummary">
                Order Summery
                <div>
                  <div>
                    <p>Subtotal:</p>
                    <span>₹{order.itemsPrice && order.itemsPrice}</span>
                  </div>
                  <div>
                    <p>Shipping Charges:</p>
                    <span>₹{order.shippingPrice && order.shippingPrice}</span>
                  </div>
                  <div>
                    <p>GST:</p>
                    <span>₹{order.totalPrice && order.taxPrice}</span>
                  </div>
                </div>
                <div className="orderSummaryTotal">
                  <p>
                    <b>Total:</b>
                  </p>
                  <span>₹{order.totalPrice && order.totalPrice}</span>
                </div>
                <button>Modify</button>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default OrderDetail
