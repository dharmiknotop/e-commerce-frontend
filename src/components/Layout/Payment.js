import React, { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import GooglePayButton from '@google-pay/button-react'
import axios from 'axios'
import './payment.css'
import { createOrder, clearErrors } from '../../redux/actions/orderAction'
import Footer from '../Footer'
const Payment = () => {
  const orderInfo = JSON.parse(sessionStorage.getItem('orderInfo'))
  const dispatch = useDispatch()

  const { error } = useSelector((state) => state.newOrder)

  const { shippingInfo, cartItems } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.user)

  const paymentData = {
    amount: Math.round(orderInfo.totalPrice * 100),
  }
  const order = {
    shippingInfo,
    orderItems: cartItems,
    itemsPrice: orderInfo.subtotal,
    taxPrice: orderInfo.tax,
    shippingPrice: orderInfo.shippingCharges,
    totalPrice: orderInfo.totalPrice,
  }
  useEffect(() => {
    if (error) {
      console.log(error)
      dispatch(clearErrors())
    }
  }, [dispatch, error])
  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center flex-column"
        style={{ height: '100vh' }}
      >
        <GooglePayButton
          environment="TEST"
          paymentRequest={{
            apiVersion: 2,
            apiVersionMinor: 0,
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
                tokenizationSpecification: {
                  type: 'PAYMENT_GATEWAY',
                  parameters: {
                    gateway: 'example',
                    gatewayMerchantId: 'exampleGatewayMerchantId',
                  },
                },
              },
            ],
            merchantInfo: {
              merchantId: '12345678901234567890',
              merchantName: 'Demo Merchant',
            },
            transactionInfo: {
              totalPriceStatus: 'FINAL',
              totalPriceLabel: 'Total',
              totalPrice: `${orderInfo && orderInfo.totalPrice}`,
              currencyCode: 'INR',
              countryCode: 'IN',
            },
            shippingAddressRequired: true,
            callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
          }}
          onLoadPaymentData={(paymentRequest) => {
            console.log('Success', paymentRequest)
          }}
          onPaymentAuthorized={(paymentData) => {
            console.log('Payment Authorised Success', paymentData)
            dispatch(createOrder(order))

            return { transactionState: 'SUCCESS' }
          }}
          onPaymentDataChanged={(paymentData) => {
            return {}
          }}
          existingPaymentMethodRequired="false"
          buttonColor="black"
          buttonType="Buy"
        />
        <br />
        (No real payment will be Taken. This is just for Testing purpose.)
      </div>
      <Footer />
    </>
  )
}

export default Payment
