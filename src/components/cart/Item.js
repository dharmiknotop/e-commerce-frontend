import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { RiDeleteBin6Line } from 'react-icons/ri'
import {
  addItemsToCart,
  removeItemsFromCart,
} from '../../redux/actions/cartAction'
const Item = ({ item }) => {
  const dispatch = useDispatch()

  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }
  const increaseQuantityOptions = (id, quantity) => {
    dispatch(addItemsToCart(id, quantity))
  }
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1
    if (1 >= quantity) {
      return
    }
    dispatch(addItemsToCart(id, newQty))
  }
  const deleteCartItems = (id) => {
    dispatch(removeItemsFromCart(id))
  }
  const categories = ['0', '100', '200', '300']
  return (
    <div className="cartItem">
      <div className="cartProduct">
        <div className="cartItemImg">
          <img src={item.image} alt="" />
        </div>
        <div className="darkblue">
          <b> {item.name}</b>
          <b style={{ color: 'black' }}> Price: ₹{item.price}</b>
        </div>
      </div>
      {item.category && item.category === 'laptop' ? (
        <div className="selectPrice">
          <select
            value={item.quantity}
            onChange={(e) => {
              increaseQuantityOptions(item.product, e.target.value)
            }}
          >
            {categories.map((cate) => (
              <option key={cate} value={cate}>
                {cate}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div className="quantity">
          <button
            className="plus"
            onClick={() => {
              increaseQuantity(item.product, item.quantity, item.stock)
            }}
          >
            +
          </button>
          <input type="text" readOnly value={item.quantity} />
          <button
            className="minus"
            onClick={() => {
              decreaseQuantity(item.product, item.quantity)
            }}
          >
            -
          </button>
        </div>
      )}

      <h5>₹{item.quantity * item.price} </h5>
      <div className="RemoveItemCart">
        <p onClick={() => deleteCartItems(item.product)}>
          <RiDeleteBin6Line />
        </p>
      </div>
    </div>
  )
}

export default Item
