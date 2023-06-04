import { useEffect, useState } from 'react'
import './product.css'
import './FeaturedProducts.css'
import { Link, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { gsap } from 'gsap/dist/gsap'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { addItemsToCart } from '../../redux/actions/cartAction'
import { useDispatch } from 'react-redux'

const Product = ({ product, i }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  console.log(product)

  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    gsap.fromTo(
      '.s0',
      {
        autoAlpha: 0,
        y: '100%',
        duration: 1,
      },
      {
        autoAlpha: 1,

        y: '0%',
        duration: 1,
        scrollTrigger: {
          trigger: '.RightDiv',
          // markers: true,
          start: 'bottom center',
          triggerActions: 'play none none reverse',
          end: 'bottom bottom ',
        },
      },
    )
    gsap.fromTo(
      '.s1',
      {
        autoAlpha: 0,
        y: '100%',
        duration: 1,
      },
      {
        autoAlpha: 1,
        delay: 0.2,

        y: '0%',
        duration: 1,
        scrollTrigger: {
          trigger: '.RightDiv',
          // markers: true,
          start: 'bottom center',
          triggerActions: 'play none none reverse',
          end: 'bottom bottom ',
        },
      },
    )
    gsap.fromTo(
      '.s2',
      {
        autoAlpha: 0,
        y: '100%',
        duration: 1,
      },
      {
        autoAlpha: 1,
        delay: 0.4,

        y: '0%',
        duration: 1,
        scrollTrigger: {
          trigger: '.RightDiv',
          // markers: true,
          start: 'bottom center',
          triggerActions: 'play none none reverse',
          end: 'bottom bottom ',
        },
      },
    )
    gsap.fromTo(
      '.s3',
      {
        autoAlpha: 0,
        y: '100%',
        duration: 1,
      },
      {
        autoAlpha: 1,
        delay: 0.6,

        y: '0%',
        duration: 1,
        scrollTrigger: {
          trigger: '.RightDiv',
          // markers: true,
          start: 'bottom center',
          triggerActions: 'play none none reverse',
          end: 'bottom bottom ',
        },
      },
    )

    gsap.fromTo(
      '.s4',
      {
        autoAlpha: 0,
        y: '100%',
        duration: 1,
      },
      {
        autoAlpha: 1,
        delay: 0.6,

        y: '0%',
        duration: 1,
        scrollTrigger: {
          trigger: '.RightDiv',
          // markers: true,
          start: 'bottom center',
          triggerActions: 'play none none reverse',
          end: 'bottom bottom ',
        },
      },
    )
  }, [])
  const [item, setItem] = useState(0)
  const addtoCart = (newQty) => {
    dispatch(addItemsToCart(product._id, newQty))
    navigate('/Cart')
  }
  const increaseQuantity = (quantity, stock) => {
    const newQty = quantity + 1
    if (stock <= quantity) {
      return
    }
    setItem(newQty)
  }
  const decreaseQuantity = (quantity) => {
    const newQty = quantity - 1
    if (1 >= quantity) {
      return
    }
    setItem(newQty)
  }

  return (
    <div className={`Products s${i}`}>
      <div className={`featuringProduct `}>
        <div className="cart-container">
          <div className="FeaturedProduct">
            <div className="theFront">
              <LazyLoadImage
                className="card-img-top"
                src={product?.images[0]?.url}
                alt="Card image cap"
              />
            </div>

            <div className="theBack d-flex justify-content-center flex-column align-items-center">
              <div className="d-flex align-items-center flex-column ">
                <div className="quantity">
                  <button
                    className="plus"
                    onClick={() => {
                      increaseQuantity(item, product.stock)
                    }}
                  >
                    +
                  </button>
                  <input type="text" readOnly value={item} />
                  <button
                    className="minus"
                    onClick={() => {
                      decreaseQuantity(item)
                    }}
                  >
                    -
                  </button>
                </div>
                <AiOutlineShoppingCart
                  onClick={() => {
                    addtoCart(item)
                  }}
                  size={20}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Link to={`/product/${product._id}`}>
        {' '}
        <div className="productName">
          {' '}
          <span> {product.name} </span> <span>₹ {product.price} </span>
        </div>
      </Link>
    </div>
  )
}

export default Product
