import './App.css';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';
import React, {useEffect} from 'react';
import HomePage from './containers/HomePage';
import ProductListPage from './containers/ProductListPage';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn } from './actions';
import ProductDetailsPage from './containers/ProductDetailsPage';
import CartPage from './containers/CartPage';
import { updateCart } from './actions/cart.action';
import CheckoutPage from './containers/CheckoutPage';
import OrderPage from './containers/OrderPage';
import OrderDetailsPage from './containers/OrderDetailsPage';

function App() {


  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  useEffect(() => {

    if(!auth.authenticate){
      dispatch(isUserLoggedIn());
    }
  },[auth.authenticate]);

  useEffect(() => {
    // console.log('App.js - updateCart')
    dispatch(updateCart())
  },[auth.authenticate])


  return (
    <div className="App">
    
      <Router>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/cart" element={<CartPage/>} />
          <Route path="/checkout" element={<CheckoutPage/>} />
          <Route path="/account/orders" element={<OrderPage/>} />
          <Route path="/order_details/:orderId" element={<OrderDetailsPage/>} />
          <Route path="/:productSlug/:productId/p" element={<ProductDetailsPage/>} />
          <Route path="/:slug" element={<ProductListPage/>} />
         
          
          
        </Routes>
      </Router>
    </div>
    
  );
}
 
export default App;

{/* <Route path="/cart" component={CartPage} />
          <Route path="/checkout" component={CheckoutPage} />
          <Route path="/account/orders" component={OrderPage} />
          <Route path="/order_details/:orderId" component={OrderDetailsPage} />
          <Route
            path="/:productSlug/:productId/p"
            component={ProductDetailsPage}
          />
          < */}
