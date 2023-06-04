import React, { useEffect } from 'react'
import { MdLaunch } from 'react-icons/md'
import { FaCircle } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const OrderItem = ({ Item }) => {
  useEffect(() => {}, [])

  return (
    <>
      <div className=" primaryFont">
        {' '}
        <div
          style={{ textAlign: 'center', fontSize: '1.2rem' }}
          className="orderItems p-3"
        >
          <span>{Item._id} </span>

          <span>{Item && Item.orderItems.length} </span>
          <span>{Item && Item.totalPrice}</span>
          <span
            className={`
            ${
              Item.orderStatus === 'Processing'
                ? 'text-gray'
                : Item.orderStatus === 'Shipped'
                ? 'text-green'
                : 'text-red'
            } d-flex align-items-center justify-content-center`}
          >
            {Item.orderStatus === 'Processing' ? (
              <FaCircle color="yellow" size={15} />
            ) : Item.orderStatus === 'Shipped' ? (
              <FaCircle color="green" size={15} />
            ) : (
              <FaCircle color="red" size={15} />
            )}
            {Item.orderStatus}
          </span>
          <span>
            <Link to={`/order/${Item._id}`}>
              <MdLaunch />
            </Link>{' '}
          </span>
        </div>
      </div>
    </>
  )
}

export default OrderItem
