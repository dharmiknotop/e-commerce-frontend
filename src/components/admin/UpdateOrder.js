import React, { useEffect, useState } from 'react'

import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import './UpdateOrder.css'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader/Loader'
import { Scrollbars } from 'react-custom-scrollbars-2'

import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from '../../redux/actions/orderAction'
import { UPDATE_ORDER_RESET } from '../../redux/constants/orderConstants'
import Sider from './Sider'
const UpdateOrder = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams()

  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)
  const { order, error, loading } = useSelector((state) => state.orderDetails)
  const { error: updateError, isUpdated } = useSelector((state) => state.order)
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0,
  )
  const updateOrderSubmitHandler = (e) => {
    e.preventDefault()

    const myForm = new FormData()

    myForm.set('status', status)

    dispatch(updateOrder(id, myForm))
  }
  const [status, setStatus] = useState('')

  const shippingCharges = subtotal > 1000 ? 0 : 200

  const tax = subtotal * 0.18

  const totalPrice = subtotal + tax + shippingCharges
  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }
    if (updateError) {
      dispatch(clearErrors())
    }
    if (isUpdated) {
      dispatch({ type: UPDATE_ORDER_RESET })
    }

    dispatch(getOrderDetails(id))
  }, [dispatch, id, error, updateError, isUpdated])
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <Sider />
          <div className="confirmOrderPage" style={{ paddingLeft: '20vw' }}>
            <div>
              <div className="confirmshippingArea">
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>
                      Name :<span> {order.user && order.user.name}</span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Phone :{' '}
                      <span>
                        {order.shippingInfo && order.shippingInfo.phoneNo}
                      </span>
                    </p>
                  </div>
                  <div>
                    <p>
                      Address :
                      <span>
                        {order.shippingInfo &&
                          `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p>
                      Order Status :
                      <span
                        className={
                          order.paymentInfo &&
                          order.paymentInfo.status === 'succeeded'
                            ? 'text-success'
                            : 'text-danger'
                        }
                      >
                        {order.paymentInfo &&
                        order.paymentInfo.status === 'succeeded'
                          ? ' PAID'
                          : ' NOT PAID'}
                      </span>
                    </p>
                  </div>
                </div>
                <div className="orderDetailsContainerBox">
                  <div className="">
                    <p>
                      Amount :{' '}
                      <span>{order.totalPrice && order.totalPrice}</span>
                    </p>
                  </div>
                </div>
                <div className="orderDetailsContainerBox">
                  <div>
                    <p
                      className={
                        order.orderStatus && order.orderStatus === 'Delivered'
                          ? 'greenColor'
                          : 'redColor'
                      }
                    >
                      {order.orderStatus && order.orderStatus}
                    </p>
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
                            {item.name}
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
            <div
              style={{
                display: order.orderStatus === 'Delivered' ? 'none' : 'block',
              }}
            >
              <form
                className="updateOrderForm"
                onSubmit={updateOrderSubmitHandler}
              >
                <h1>Process Order</h1>

                <div>
                  <select onChange={(e) => setStatus(e.target.value)}>
                    <option value="">Choose Category</option>
                    {order.orderStatus === 'Processing' && (
                      <option value="Shipped">Shipped</option>
                    )}

                    {order.orderStatus === 'Shipped' && (
                      <option value="Delivered">Delivered</option>
                    )}
                  </select>
                </div>

                <button
                  className="btn btn-primary"
                  id="createProductBtn"
                  type="submit"
                  disabled={
                    loading ? true : false || status === '' ? true : false
                  }
                >
                  Process
                </button>
              </form>
            </div>
          </div>
          {/*  */}
        </>
      )}
    </>
  )
}

export default UpdateOrder
