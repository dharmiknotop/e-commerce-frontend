import React, { useEffect, useState } from 'react'
import './newProduct.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { UPDATE_PRODUCT_RESET } from '../../redux/constants/productConstants'
import { useParams } from 'react-router-dom'
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from '../../redux/actions/productAction'

import Sider from './Sider'
const UpdateProduct = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { error, product } = useSelector((state) => state.productDetails)
  const { loading, error: updateError, isUpdated } = useSelector(
    (state) => state.product,
  )

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [Stock, setStock] = useState(0)
  const [oldImages, setOldImages] = useState([])
  const [images, setImages] = useState([])
  const [imagesPreview, setImagesPreview] = useState([])

  const categories = [
    'laptop',
    'Footwear',
    'Bottom',
    'Tops',
    'Attire',
    'Camera',
    'SmartPhones',
  ]

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id))
    } else {
      setName(product.name)
      setDescription(product.description)
      setPrice(product.price)
      setCategory(product.category)
      setStock(product.Stock)
      setOldImages(product.images)
    }
    if (error) {
      console.log(` Error: ${error}`)
      dispatch(clearErrors())
    }
    if (updateError) {
      alert.error(updateError)
      dispatch(clearErrors())
    }

    if (isUpdated) {
      navigate('/admin/products')
      dispatch({ type: UPDATE_PRODUCT_RESET })
    }
  }, [dispatch, error, navigate, isUpdated, id, product, updateError])
  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files)

    setImages([])
    setImagesPreview([])
    setOldImages([])

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
  const UpdateProductSubmitHandler = (e) => {
    e.preventDefault()
    const myForm = new FormData()

    myForm.set('name', name)
    myForm.set('description', description)

    myForm.set('price', price)
    myForm.set('category', category)

    images.forEach((image) => {
      myForm.append('images', image)
    })

    myForm.set('Stock', Stock)
    dispatch(updateProduct(id, myForm))
  }
  return (
    <>
      <Sider />
      <form
        className="createProductForm"
        encType="multipart/form-data"
        onSubmit={UpdateProductSubmitHandler}
      >
        <h1>Create Product</h1>

        <div>
          <input
            type="text"
            placeholder="Product Name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Price"
            required
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>

        <div>
          <textarea
            placeholder="Product Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="1"
          ></textarea>
        </div>

        <div>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose Category</option>
            {categories.map((cate) => (
              <option key={cate} value={cate}>
                {cate}
              </option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            placeholder="Stock"
            required
            onChange={(e) => setStock(e.target.value)}
            value={Stock}
          />
        </div>

        <div id="createProductFormFile">
          <input
            type="file"
            name="avatar"
            accept="image/*"
            onChange={updateProductImagesChange}
            multiple
          />
        </div>
        <div id="createProductFormImage">
          {oldImages &&
            oldImages.map((image, index) => (
              <img key={index} src={image.url} alt="Old Product Preview" />
            ))}
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
      <h1> creat product</h1>
    </>
  )
}

export default UpdateProduct
