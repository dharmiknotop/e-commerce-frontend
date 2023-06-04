import React, { useEffect, useState } from 'react';
import FeaturedProduct from '../components/product/FeaturedProduct';
import CommonProduct from '../components/product/CommonProduct';
import NewProduct from '../components/product/NewProduct.js';
import { getProduct } from '../redux/actions/productAction';
import Loader from '../components/Loader/Loader';
import Home from '../components/Layout/Home';
import Navbar from '../components/Navbar2';
import Footer from '../components/Footer';
import axios from 'axios';
const Homescreen = () => {
  const [productsList, setProductsList] = useState([]);

  const [loading, setLoading] = useState('');

  const getProducts = async () => {
    try {
      const res = await axios.get(
        'https://e-commerce-api-23.onrender.com//api/v1/products/homepage'
      );

      setProductsList([...res.data.products]);

      console.log(productsList);
    } catch (error) {
      console.log(error);
    }
  };
  // useEffect(() => {
  //   dispatch(getProduct())
  // }, [dispatch])
  useEffect(() => {
    getProducts();
  }, []);
  useEffect(() => {
    console.log(productsList);
  }, [productsList]);
  return (
    <>
      <Navbar />
      <Home />
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="container">
            <div className="row">
              <div>
                <span
                  style={{ fontWeight: '800', fontSize: '1.5rem' }}
                  className="d-flex justify-content-center"
                >
                  FEATURED PRODUCTS
                </span>
                <hr style={{ width: '100%' }} />
              </div>
              <div className="container">
                <div className="FeaturedProducts ">
                  {productsList &&
                    productsList.map((p, k) => (
                      <FeaturedProduct key={p._id} product={p} i={k++} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <NewProduct />
      <CommonProduct />
      <Footer />
    </>
  );
};

export default Homescreen;
