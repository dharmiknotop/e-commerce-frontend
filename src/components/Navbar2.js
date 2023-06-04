import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './Navbar.css'
// import { useNavigate } from 'react-router-dom'
// import { BiSearch } from 'react-icons/bi'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { HiOutlineMail } from 'react-icons/hi'
import { BiLogIn } from 'react-icons/bi'
import { BiLogOut } from 'react-icons/bi'
import { FaProductHunt } from 'react-icons/fa'

import { AiFillHome } from 'react-icons/ai'
import { ImCross } from 'react-icons/im'
import { GoThreeBars } from 'react-icons/go'
import logo from './parth-logo.webp'
import { logout } from '../redux/actions/userAction'
const Navbar = () => {
  const dispatch = useDispatch()
  // const [keyword, setKeyword] = useState('')
  const [navbar, setNavbar] = useState('')
  const [stickyNavbar, setstickyNavbar] = useState(false)

  // const navigate = useNavigate()

  // const searchSubmitHandler = (e) => {
  //   e.preventDefault()
  //   if (keyword.trim()) {
  //     navigate(`/products/${keyword}`)
  //   } else {
  //     navigate('/products')
  //   }
  // }
  const ShowTheNavbar = () => {
    setNavbar('true')
  }
  const RemoveTheNavbar = () => {
    setNavbar('false')
  }
  const changeBackground = () => {
    if (window.scrollY >= 80) {
      setstickyNavbar(true)
    } else {
      setstickyNavbar(false)
    }
  }
  const logOut = () => {
    dispatch(logout())
  }
  window.addEventListener('scroll', changeBackground)
  const { user, isAuthenticated } = useSelector((state) => state.user)
  const { cartItems } = useSelector((state) => state.cart)
  return (
    <>
      <nav>
        <div className="conatiner">
          <div className={!stickyNavbar ? 'TopNavar active' : 'TopNavar'}>
            <div className="ToggleButton">
              <GoThreeBars onClick={ShowTheNavbar} size={50} color="white" />
            </div>
            <div className=" d-flex">
              {' '}
              <div className="SlideAnimation">
                <Link to="/">Home</Link>
              </div>
              <div className="SlideAnimation1">
                {' '}
                <Link to="/orders">Orders</Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className={`Navbar ${navbar === 'true' ? 'displayNavbar' : ''}`}>
        <div className="cross">
          <ImCross onClick={RemoveTheNavbar} color="white" />{' '}
        </div>

        <div className="d-flex justify-content-center align-items-center flex-column">
          <img src={logo} alt="" />
          <div className="details">
            <AiOutlineUser />
            {!user && <>Anonymous </>}
            {user && <>{user.name}</>}
          </div>

          <div className="details">
            <HiOutlineMail />
            {!user && <>Anonymous@gmail.com </>}
            {user && <>{user.email}</>}
          </div>

          <Link className="category" to="/">
            <div className="category">
              <AiFillHome />
              Home
            </div>
          </Link>

          <Link className="category" to="/products">
            <div className="category">
              <FaProductHunt />
              Products
            </div>
          </Link>
          <Link className="category" to="/Cart">
            <div>
              <AiOutlineShoppingCart />
              Cart ({(cartItems && cartItems.length) || 0})
            </div>
          </Link>

          <Link className="category" to="/Cart">
            <div className="category">
              <AiFillHome />
              About us
            </div>
          </Link>
          {isAuthenticated ? (
            <>
              {' '}
              <Link className="category" to="/" onClick={logOut}>
                <div className="category">
                  <BiLogOut />
                  Log out
                </div>
              </Link>
            </>
          ) : (
            <>
              <Link className="category" to="/login">
                <div className="category">
                  <BiLogIn />
                  Log In
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Navbar
