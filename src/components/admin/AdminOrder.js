import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import {
  getAllOrders,
  deleteOrder,
  clearErrors,
} from '../../redux/actions/orderAction'
import './AdminProduct.css'
import Sider from './Sider'
import { AiFillDelete } from 'react-icons/ai'
import { MdEdit } from 'react-icons/md'
import { DELETE_ORDER_RESET } from '../../redux/constants/orderConstants'
const AdminOrder = () => {
  const { orders, error } = useSelector((state) => state.allOrders)
  const { error: deleteError, isDeleted } = useSelector((state) => state.order)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  useEffect(() => {
    if (error) {
      console.log(error)
      dispatch(clearErrors())
    }
    if (deleteError) {
      console.log(deleteError)
      dispatch(clearErrors())
    }

    if (isDeleted) {
      console.log('Order Deleted Successfully')
      navigate('/admin/orders')
      dispatch({ type: DELETE_ORDER_RESET })
    }
    dispatch(getAllOrders())
  }, [dispatch, error, deleteError, navigate, isDeleted])
  const RemoveTheItem = (id) => {
    dispatch(deleteOrder(id))
  }
  return (
    <>
      <Sider />
      <div
        className=""
        style={{ marginLeft: '17vw', marginRight: '2vw', marginTop: '15vh' }}
      >
        <h2 className="mainfont" style={{ textAlign: 'center' }}>
          All Orders
          <hr style={{ width: '100%' }} />
        </h2>
        <div className="allOrders mt-5">
          <div className="orderTitle p-2 ">
            <span>order_id</span>
            <span>Order status</span>
            <span>Order Item</span>
            <span>Price</span>
            <span>Action</span>
          </div>
        </div>
      </div>

      <div className=" AdminPadding">
        {orders &&
          orders.map((i) => (
            <div
              className="pt-3 px-1  "
              style={{
                fontFamily: 'Roboto',
                textAlign: 'center',
              }}
            >
              {' '}
              <div className="orderItems  ">
                <span className="AdminItem m-2">{i._id} </span>
                <span className="AdminItem">
                  <span
                    className={
                      i.orderStatus === 'Processing'
                        ? 'text-muted'
                        : i.orderStatus === 'Shipping'
                        ? ' text-danger'
                        : i.orderStatus === 'Delivered'
                        ? 'text-success'
                        : 'none'
                    }
                  >
                    {i.orderStatus}
                  </span>
                </span>
                <span className="AdminItem m-2">
                  {i && i.orderItems.length}
                </span>
                <span className="AdminItem m-2"> {i && i.totalPrice}</span>
                <span className="AdminItem m-2">
                  <AiFillDelete
                    className="Delete"
                    onClick={() => {
                      RemoveTheItem(`${i._id}`)
                    }}
                  />
                  <Link to={`/admin/order/${i._id}`}>
                    <MdEdit />
                  </Link>{' '}
                </span>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default AdminOrder
