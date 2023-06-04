import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Navbar from '../Navbar'
import { Scrollbars } from 'react-custom-scrollbars-2'
import Item from './Item'
import { useNavigate } from 'react-router-dom'
import './cart.css'
import Footer from '../Footer'
import { ToastContainer, toast, Slide } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Cart = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const checkout = () => {
    isAuthenticated
      ? navigate('/order/ShippingInfo')
      : toast.error('You Need to Login First')
  }
  useEffect(() => {
    if (!isAuthenticated) {
      toast.error('You Need to Login First')
    }
  }, [])

  return (
    <>
      <Navbar />
      {cartItems && cartItems.length > 0 ? (
        <>
          <div className="container MainCart">
            <h2 className="darkblue">
              <AiOutlineShoppingCart style={{ marginRight: 10 }} />
              <span>Shopping Cart</span>
            </h2>
            <div className="ps-5 mb-3">
              You have {cartItems.length} Items in the cart..
            </div>
            <div className="DivideCart">
              <div className="cart">
                <Scrollbars style={{ width: '100%', height: '70vh' }}>
                  {cartItems &&
                    cartItems.map((item, i) => (
                      <Item key={item.product} item={item} />
                    ))}
                </Scrollbars>
              </div>

              <div className="checkout ">
                <h3 className="darkblue">
                  <AiOutlineShoppingCart style={{ marginRight: 10 }} />
                  Cart Total
                </h3>
                <div className="subtotal ">
                  <span className=""> SubTotal :</span>
                  <span className="cartSubTotal">
                    {` ₹${cartItems.reduce(
                      (acc, item) => acc + item.quantity * item.price,
                      0,
                    )}`}
                  </span>
                </div>
                <button className="Checkout" onClick={checkout}>
                  Checkout
                </button>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <h1>No Item Present in the cart</h1>
      )}
      <ToastContainer
        position="bottom-center"
        transition={Slide}
        theme="dark"
        newestOnTop
        pauseOnFocusLoss
        draggable={false}
        pauseOnHover
        limit={0}
      />
    </>
  )
}

export default Cart
