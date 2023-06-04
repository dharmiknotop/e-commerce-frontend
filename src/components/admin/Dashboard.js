import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { getAdminProduct } from '../../redux/actions/productAction'
import { getAllUsers } from '../../redux/actions/userAction'
import { getAllOrders } from '../../redux/actions/orderAction'
import Sider from './Sider.js'
import 'chart.js/auto'
import { Chart } from 'react-chartjs-2'

import './dashboard.css'
const Dashboard = () => {
  const dispatch = useDispatch()
  const { user, loading } = useSelector((state) => state.user)
  const { users } = useSelector((state) => state.allUsers)
  const { products } = useSelector((state) => state.products)
  const { orders } = useSelector((state) => state.allOrders)

  let outOfStock = 0
  let outOfStockOrder = 0
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1
      }
    })
  const navigate = useNavigate()
  useEffect(() => {
    dispatch(getAllUsers())

    {
      user && !user.role === 'admin'
        ? navigate('/login')
        : navigate('/admin/dashboard')
    }
    dispatch(getAdminProduct())
    dispatch(getAllOrders())
  }, [user, dispatch, navigate])
  const doughnutState = {
    labels: ['Out of Stock', 'InStock'],
    datasets: [
      {
        backgroundColor: ['#00A6B4', '#6800B4'],
        hoverBackgroundColor: ['#4B5000', '#35014F'],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  }
  // const orderdata = {
  //   labels: ['Out of Stock', 'InStock'],
  //   datasets: [
  //     {
  //       backgroundColor: ['#00A6B4', '#6800B4'],
  //       hoverBackgroundColor: ['#4B5000', '#35014F'],
  //       data: [outOfStockOrder, products.length - outOfStockOrder],
  //     },
  //   ],
  // }
  return (
    <div className="dashboard">
      <Sider />
      <div className="AdminMargin">
        <div className="Adminboard">
          {' '}
          <Link to="/admin/products">
            {' '}
            <div className="AllProducts">
              <p>Product</p> {products && products.length}
            </div>
          </Link>
          <Link to="/admin/orders">
            {' '}
            <div className="AllOrders">
              <p>Orders</p>
              {orders && orders.length}
            </div>
          </Link>
          <Link to="/admin/users">
            {' '}
            <div className="AllUsers">
              <p>Users</p>
              {users && users.length}
            </div>
          </Link>
        </div>
        <div className="doughnutChart">
          <div className="piechart">
            <Chart type="pie" data={doughnutState} />
          </div>
        </div>
        {/* <div className="doughnutChart">
          <div className="piechart">
            <Chart type="pie" data={orderdata} />
          </div>
        </div> */}
      </div>{' '}
    </div>
  )
}

export default Dashboard
