import React, { useEffect, useState } from 'react'
import './newProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { NEW_PRODUCT_RESET } from '../../redux/constants/productConstants'
import { createProduct, clearErrors } from '../../redux/actions/productAction'
import { BiCategory } from 'react-icons/bi'
import { RiProductHuntLine } from 'react-icons/ri'
import { RiPriceTag3Fill } from 'react-icons/ri'
import { MdOutlineDescription } from 'react-icons/md'
import { AiOutlineStock } from 'react-icons/ai'

import Sider from './Sider'
const NewProduct = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, success } = useSelector((state) => state.newProduct)

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [Stock, setStock] = useState(0)
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])
  const [featured, setFeatured] = useState('')

  const categories = ['Visting Card', 'Flyer', 'Templates', 'Designs']

  useEffect(() => {
    if (error) {
      console.log(` Error: ${error}`)
      dispatch(clearErrors())
    }

    if (success) {
      navigate('/admin/products')
      dispatch({ type: NEW_PRODUCT_RESET })
    }
  }, [dispatch, error, navigate, success])
  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])

    files.forEach((file) => {
      const reader = new FileReader()

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result])
          setImages((old) => [...old, reader.result])
        }
      }

      reader.readAsDataURL(file)
    })
  }
  const createProductSubmitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('description', description)

    myForm.set('price', price)
    myForm.set('category', category)
    myForm.set('featured', featured)

    images.forEach((image) => {
      myForm.append('images', image)
    })

    myForm.set('Stock', Stock)
    dispatch(createProduct(myForm))
  }
  return (
    <>
      <Sider />
      <div className="NewProduct">
        {' '}
        <form
          className="createProductForm "
          encType="multipart/form-data"
          onSubmit={createProductSubmitHandler}
        >
          <span>Create Product</span>

          <div>
            <RiProductHuntLine />
            <input
              type="text"
              placeholder="Product Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <RiPriceTag3Fill />
            <input
              type="number"
              placeholder="Price"
              required
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <MdOutlineDescription />
            <textarea
              placeholder="Product Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              cols="30"
              rows="1"
            ></textarea>
          </div>
          <div>
            <input
              type="text"
              placeholder="Featured"
              required
              value={featured}
              onChange={(e) => setFeatured(e.target.value)}
            />
          </div>
          <div>
            <BiCategory />
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="">Choose Category</option>
              {categories.map((cate) => (
                <option key={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          </div>

          <div>
            <AiOutlineStock />
            <input
              type="number"
              placeholder="Stock"
              required
              onChange={(e) => setStock(e.target.value)}
            />
          </div>

          <div id="createProductFormFile">
            <input
              type="file"
              name="avatar"
              accept="image/*"
              onChange={createProductImagesChange}
              multiple
            />
          </div>

          <div id="createProductFormImage">
            {imagesPreview.map((image, index) => (
              <img key={index} src={image} alt="Product Preview" />
            ))}
          </div>
          <button
            id="createProductBtn"
            type="submit"
            disabled={loading ? true : false}
          >
            Create
          </button>
        </form>
      </div>
      <h1> creat product</h1>
    </>
  )
}

export default NewProduct
