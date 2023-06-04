import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Sider from './Sider'
import { MdEdit } from 'react-icons/md'
import { AiFillDelete } from 'react-icons/ai'

import {
  getAllUsers,
  clearErrors,
  deleteUser,
} from '../../redux/actions/userAction'
import { DELETE_USER_RESET } from '../../redux/constants/userConstants'

const AdminUser = () => {
  const navigate = useNavigate()
  const { error, users } = useSelector((state) => state.allUsers)
  const dispatch = useDispatch()
  const deleteUserHandler = (id) => {
    dispatch(deleteUser(id))
  }

  useEffect(() => {
    dispatch(getAllUsers())
  }, [dispatch, error, navigate, deleteUserHandler])

  return (
    <>
      {' '}
      <Sider />
      <div
        className="All-products"
        style={{ marginLeft: '17vw', marginRight: '2vw', marginTop: '15vh' }}
      >
        <h2 className="mainfont" style={{ textAlign: 'center' }}>
          All Users
          <hr style={{ width: '100%' }} />
        </h2>
        <div className="allOrders mt-5">
          <div className="orderTitle p-2">
            <span>order_id</span>
            <span>User_Name</span>
            <span>Order Item</span>
            <span>Price</span>
            <span>Action</span>
          </div>
        </div>
      </div>
      <div className="AdminPadding">
        {users &&
          users.map((i) => (
            <div className="pt-3 px-1">
              {' '}
              <div
                style={{
                  fontFamily: 'Roboto',
                  textAlign: 'center',
                  gridTemplateColumns: '2fr 1fr 2fr 1fr 1fr',
                }}
                className="orderItems"
              >
                <span className="AdminItem m-2">{i._id} </span>
                <span className="AdminItem m-2">{i.name} </span>
                <span className="AdminItem m-2">{i.email} </span>
                <span className="AdminItem m-2">{i.role} </span>
                <span className="AdminItem m-2">
                  <AiFillDelete
                    onClick={() => {
                      deleteUserHandler(`${i._id}`)
                    }}
                  />
                  <Link to={`/admin/user/${i._id}`}>
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

export default AdminUser
