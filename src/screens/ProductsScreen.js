import React, { useEffect, useState } from 'react'
import './productScreen.css'
import Navbar from '../components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { getProduct } from '../redux/actions/productAction'
import Loader from '../components/Loader/Loader'
import Products from '../components/product/Products'
import { useParams } from 'react-router-dom'
import Slider from '@material-ui/core/Slider'
import Footer from '../components/Footer'
const categories = [
  'all',
  'Laptop',
  'Footwear',
  'Bottom',
  'Tops',
  'Attire',
  'Camera',
]
const ProductsScreen = () => {
  const { keyword } = useParams()

  const [price, setPrice] = useState([0, 25000])
  const [category, setCategory] = useState('')

  const [ratings, setRatings] = useState(0)
  const dispatch = useDispatch()
  const { loading, error, products, productsCount } = useSelector(
    (state) => state.products,
  )
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }
  useEffect(() => {
    dispatch(getProduct(keyword, price, category))
  }, [dispatch, keyword, price, category])
  return (
    <>
      <Navbar />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container ProductScreen">
            <div className="row">
              <div className="col-lg-2">
                {' '}
                <span
                  className="d-flex justify-content-center"
                  style={{ fontWeight: '500', fontSize: '1.3rem' }}
                >
                  PRICE
                </span>
                <Slider
                  value={price}
                  onChange={priceHandler}
                  valueLabelDisplay="auto"
                  aria-labelledby="range-slider"
                  min={0}
                  max={25000}
                />{' '}
                <span
                  style={{ fontWeight: '500', fontSize: '1.3rem' }}
                  className="d-flex justify-content-center"
                >
                  CATEGORIES
                </span>
                <hr style={{ width: '100%' }} />
                <ul className="categoryBox text-center">
                  {' '}
                  {categories.map((category) => (
                    <li
                      className="category-link"
                      key={category}
                      onClick={() => setCategory(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-lg-10">
                <span
                  style={{ fontWeight: '800', fontSize: '1.5rem' }}
                  className="d-flex justify-content-center"
                >
                  All PRODUCTS
                </span>
                <hr style={{ width: '100%' }} />

                <div className="container">
                  <div className="FeaturedProducts ">
                    {' '}
                    {products &&
                      products.map((p, i) => (
                        <Products key={p._id} product={p} i={i} />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <Footer />
    </>
  )
}

export default ProductsScreen
