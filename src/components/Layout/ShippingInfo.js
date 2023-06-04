import React, { Fragment, useState } from 'react'
import './Shipping.css'
import Navbar from '../Navbar'
import { useSelector, useDispatch } from 'react-redux'
import { saveShippingInfo } from '../../redux/actions/cartAction'
import { Country, State } from 'country-state-city'
import { useNavigate } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { AiFillPhone } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'
import { GoLocation } from 'react-icons/go'
import { BsFillFlagFill } from 'react-icons/bs'
import { FaCity } from 'react-icons/fa'
import Footer from '../Footer'

const Shipping = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { shippingInfo } = useSelector((state) => state.cart)

  const [address, setAddress] = useState(shippingInfo.address)
  const [city, setCity] = useState(shippingInfo.city)
  const [state, setState] = useState(shippingInfo.state)
  const [country, setCountry] = useState(shippingInfo.country)
  const [pinCode, setPinCode] = useState(shippingInfo.pinCode)
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo)

  const shippingSubmit = (e) => {
    e.preventDefault()

    dispatch(
      saveShippingInfo({ address, city, state, country, pinCode, phoneNo }),
    )
    navigate('/order/confirm')
  }

  return (
    <>
      <Navbar />
      <div className="shippingContainer">
        <div className="shippingBox mt-5">
          <h2 className="shippingHeading">Shipping Details</h2>

          <form
            className="shippingForm"
            encType="multipart/form-data"
            onSubmit={shippingSubmit}
          >
            <div>
              <BsFillFlagFill color="gray" />
              <input
                autocomplete="none"
                auto
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div>
              <AiFillHome />
              <input
                autocomplete="none"
                type="text"
                placeholder="City"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>

            <div>
              <GoLocation />
              <input
                autocomplete="none"
                type="number"
                placeholder="Pin Code"
                required
                value={pinCode}
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>

            <div>
              <AiFillPhone />
              <input
                autocomplete="false"
                type="number"
                placeholder="Phone Number"
                required
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                size="10"
              />
            </div>

            <div>
              <BiWorld />

              <select
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                <option value="">Country</option>
                {Country &&
                  Country.getAllCountries().map((item) => (
                    <option key={item.isoCode} value={item.isoCode}>
                      {item.name}
                    </option>
                  ))}
              </select>
            </div>

            {country && (
              <div>
                <FaCity />

                <select
                  required
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                >
                  <option value="">State</option>
                  {State &&
                    State.getStatesOfCountry(country).map((item) => (
                      <option key={item.isoCode} value={item.isoCode}>
                        {item.name}
                      </option>
                    ))}
                </select>
              </div>
            )}

            <input
              autocomplete="none"
              type="submit"
              value="Continue"
              className="shippingBtn"
              disabled={state ? false : true}
            />
          </form>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Shipping
