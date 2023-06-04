import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  getAdminProduct,
  clearErrors,
  deleteProduct,
} from '../../redux/actions/productAction'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { DELETE_PRODUCT_RESET } from '../../redux/constants/productConstants'

import { AiFillDelete } from 'react-icons/ai'
import './AdminProduct.css'
import Sider from './Sider'
const AdminProduct = () => {
  const navigate = useNavigate()
  const { products, error } = useSelector((state) => state.products)
  const { error: deleteError, isDeleted } = useSelector(
    (state) => state.product,
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAdminProduct())
    if (deleteError) {
      dispatch(clearErrors())
    }

    if (isDeleted) {
      navigate('/admin/dashboard')
      dispatch({ type: DELETE_PRODUCT_RESET })
    }
  }, [dispatch, error, deleteError, navigate, isDeleted])
  const RemoveTheItem = (id) => {
    dispatch(deleteProduct(id))
  }
  return (
    <>
      <Sider />
      <div
        className="All-products"
        style={{ marginLeft: '17vw', marginRight: '2vw', marginTop: '15vh' }}
      >
        <h2 className="mainfont" style={{ textAlign: 'center' }}>
          All Products
          <hr style={{ width: '100%' }} />
        </h2>
        <div className="allOrders mt-5">
          <div className="orderTitle p-2">
            <span>Product_id</span>
            <span>Product_Name</span>
            <span>Order Stock</span>
            <span>Price</span>
            <span>Action</span>
          </div>
        </div>
      </div>
      <div className="AdminPadding">
        {products &&
          products.map((i) => (
            <>
              <div
                className="pt-3 px-1 "
                style={{ fontFamily: 'Roboto', textAlign: 'center' }}
              >
                <div className="orderItems ">
                  <Link className="AdminItem" to={`/product/${i._id}`}>
                    <span className="m-2  ">{i._id}</span>
                  </Link>{' '}
                  <Link className="AdminItem" to={`/product/${i._id}`}>
                    <span className="m-2  ">{i.name}</span>
                  </Link>{' '}
                  <span className="m-2  ">{i.Stock}</span>
                  <span className="AdminItem">{i.price}</span>
                  <div className="AdminItem">
                    {' '}
                    <Link to={`/admin/product/${i._id}`}>
                      <span className="m-2  ">Update</span>
                    </Link>
                    <span className="">
                      <AiFillDelete
                        className="Delete"
                        onClick={() => {
                          RemoveTheItem(`${i._id}`)
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </>
          ))}
        <div
          style={{
            marginLeft: '17vw',
            marginTop: '1rem',
            marginRight: '2vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <hr style={{ width: '100vw', color: 'black', height: '3px' }} />
          <h4 className="mainfont">Add A new product To your Website</h4>
          <Link to="/admin/product">
            {' '}
            <button className="btn btn-outline-primary" style={{}}>
              New Product
            </button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default AdminProduct
