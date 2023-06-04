import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect, lazy, Suspense } from 'react'
import './App.css'
import { useSelector } from 'react-redux'
import { loadUser } from './redux/actions/userAction'
import store from './redux/store'
import Loader from './components/Loader/Loader'

const Homescreen = lazy(() => import('./screens/Homescreen'))
const ProductScreen = lazy(() => import('./screens/Productscreen'))
const ProductsScreen = lazy(() => import('./screens/ProductsScreen'))
const LoginSignUp = lazy(() => import('./components/User/LoginSignUp'))
const ShippingInfo = lazy(() => import('./components/Layout/ShippingInfo.js'))
const ConfirmOrder = lazy(() => import('./components/Layout/ConfirmOrder'))
const Cart = lazy(() => import('./components/cart/Cart.js'))
const Payment = lazy(() => import('./components/Layout/Payment'))
const OrderSucess = lazy(() => import('./components/Order/OrderSucess.js'))
const OrderScreen = lazy(() => import('./screens/Orderscreen'))
const OrderDetail = lazy(() => import('./components/Order/OrderDetail.js'))
const Dashboard = lazy(() => import('./components/admin/Dashboard.js'))
const AdminProduct = lazy(() => import('./components/admin/AdminProduct.js'))
const AdminUser = lazy(() => import('./components/admin/AdminUser.js'))
const AdminOrder = lazy(() => import('./components/admin/AdminOrder.js'))
const NewProduct = lazy(() => import('./components/admin/NewProduct'))
const UpdateProduct = lazy(() => import('./components/admin/UpdateProduct'))
const UpdateOrder = lazy(() => import('./components/admin/UpdateOrder.js'))
const UpdateUser = lazy(() => import('./components/admin/UpdateUser.js'))
function App() {
  const { user } = useSelector((state) => state.user)
  useEffect(() => {
    store.dispatch(loadUser())
  }, [])

  return (
    <div style={{ width: '100vw' }}>
      <Suspense fallback={<Loader />}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Homescreen />} />
            <Route exact path="/Cart" element={<Cart />} />
            <Route exact path="/product/:id" element={<ProductScreen />} />
            <Route exact path="/products" element={<ProductsScreen />} />
            <Route
              exact
              path="/products/:keyword"
              element={<ProductsScreen />}
            />
            <Route exact path="/login" element={<LoginSignUp />} />
            <Route
              exact
              path="/order/ShippingInfo"
              element={<ShippingInfo />}
            />
            <Route exact path="/process/payment" element={<Payment />} />
            <Route
              isAdmin={true}
              exact
              path="/order/confirm"
              element={<ConfirmOrder />}
            />
            <Route exact path="/success" element={<OrderSucess />} />
            <Route exact path="/orders" element={<OrderScreen />} />
            <Route exact path="/order/:id" element={<OrderDetail />} />

            {user && user.role === 'admin' ? (
              <>
                <Route exact path="/admin/dashboard" element={<Dashboard />} />
                <Route
                  exact
                  path="/admin/products"
                  element={<AdminProduct />}
                />
                <Route exact path="/admin/orders" element={<AdminOrder />} />
                <Route exact path="/admin/users" element={<AdminUser />} />
                <Route exact path="/admin/product" element={<NewProduct />} />
                <Route
                  exact
                  path="/admin/product/:id"
                  element={<UpdateProduct />}
                />
                <Route
                  exact
                  path="/admin/order/:id"
                  element={<UpdateOrder />}
                />
                <Route exact path="/admin/user/:id" element={<UpdateUser />} />
              </>
            ) : (
              <></>
            )}
          </Routes>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
