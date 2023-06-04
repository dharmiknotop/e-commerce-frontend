import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { clearErrors, myOrders } from '../redux/actions/orderAction'
import OrderItem from '../components/Order/OrderItem.js'
import Footer from '../components/Footer'
import Loader from '../components/Loader/Loader'
import '../components/Order/Orderitem.css'
import { Scrollbars } from 'react-custom-scrollbars-2'

const Orderscreen = () => {
  const dispatch = useDispatch()

  const { loading, error, orders } = useSelector((state) => state.myOrders)
  useEffect(() => {
    if (error) {
      dispatch(clearErrors())
    }

    dispatch(myOrders())
  }, [dispatch])

  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          {' '}
          <div style={{ height: '100vh', marginTop: '15vh' }}>
            {orders && orders ? (
              <div
                className="container OrderDetails "
                style={{
                  height: '100vh',
                  background: '#f5f5f5 ',
                }}
              >
                {/* <h1>Your order {orders && orders.length}</h1> */}
                <div className="allOrders  mt-5">
                  <div
                    style={{
                      fontFamily: 'Roboto',
                      textAlign: 'center',
                      fontSize: '1.2rem',
                    }}
                    className="orderTitle  p-2"
                  >
                    <span>Order ID</span>
                    <span>Item Qty</span>
                    <span>Amount</span>
                    <span>Status</span>

                    <span>Details</span>
                  </div>
                  <Scrollbars style={{ width: '100%', height: '70vh' }}>
                    {orders &&
                      orders.map((item) => (
                        <OrderItem key={item} Item={item} />
                      ))}
                  </Scrollbars>
                </div>
              </div>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: '100vh' }}
              >
                You have currently 0 Order.
              </div>
            )}
            <Footer />
          </div>
        </>
      )}
    </>
  )
}

export default Orderscreen
