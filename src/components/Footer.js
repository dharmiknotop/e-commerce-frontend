import React from 'react'
import './Footer.css'
import { Link } from 'react-router-dom'
import { FaFacebookSquare } from 'react-icons/fa'
import { AiOutlineInstagram } from 'react-icons/ai'
import { AiOutlineTwitter } from 'react-icons/ai'
import { BsWhatsapp } from 'react-icons/bs'
const Footer = () => {
  return (
    <div className="Trying">
      <div className="Footer  px-4 mainfont">
        <div className="firstdiv d-flex justify-content-center align-items-center flex-column">
          <div className="d-flex flex-column m-1">
            <span style={{ marginBottom: '0' }}>Parth </span>
            <span> Enterprise</span>
          </div>
          <span>10,nirman appartment T.B Road Ruturaj flat</span>
          <span>
            <BsWhatsapp color="#4cca5a" /> 8487923230
          </span>
        </div>
        <div className="seconddiv">
          <div className="FooterTitle primaryFont">
            {' '}
            Useful Links <div className="FooterHr"></div>
          </div>
          <div className="FooterItem">
            <Link to="/cart">
              <span>Cart</span>
            </Link>
            <Link to="/products">
              <span>Products</span>
            </Link>
            <Link to="/orders">
              <span>Orders</span>
            </Link>
            <Link to="/">
              <span>About us</span>
            </Link>
          </div>
        </div>
        <div className="seconddiv">
          <div className="FooterTitle primaryFont">
            {' '}
            Categories <div className="FooterHr"></div>
          </div>
          <div className="FooterItem">
            <Link to="/product/623196a8dd517210fb8f07f5">
              <span>Visting card</span>
            </Link>
            <Link to="/product/62319732a2d0fe1f1795c016">
              <span>Flyers</span>
            </Link>
            <Link to="/product/623b5e73a84af0d7130a5bd4">
              <span>Thumbnails</span>
            </Link>
          </div>
        </div>
        <div className="seconddiv">
          <div className="FooterTitle primaryFont">
            {' '}
            Contanct us <div className="FooterHr"></div>
          </div>
          <div className="FooterItem">
            <Link className="" to="">
              <FaFacebookSquare /> : Something
            </Link>
            <Link className="" to="">
              <AiOutlineInstagram /> : Something
            </Link>
            <Link className="" to="">
              <AiOutlineTwitter /> : Something
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
