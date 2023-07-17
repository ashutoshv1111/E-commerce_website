import React, {useEffect} from 'react';
import {  Route, Routes } from 'react-router-dom';
import './App.css';
import { Home } from './containers/Home';
import { Signin } from './containers/Signin';
import { Signup } from './containers/Signup';
import Protected from './components/HOC/PrivateRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isUserLoggedIn, getInitialData } from './actions';
import { Products } from './containers/Products';
import { Orders } from './containers/Orders';
import { Category } from './containers/Category';
import NewPage from './containers/NewPage';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  //componentDidMount or componentDidUpadate
  useEffect(()=> {
    if(!auth.authenticate){
        dispatch(isUserLoggedIn());
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }
   
   
},[auth.authenticate]);

  return (
    // <Router>
      <Routes>
       
        <Route path="/" element={<Protected><Home/></Protected>} />       
        <Route path="/page" element={<Protected><NewPage/></Protected>} />       
        <Route path="/category" element={<Protected><Category/></Protected>} />       
        <Route path="/products" element={<Protected><Products/></Protected>} />       
        <Route path="/orders" element={<Protected><Orders/></Protected>} />  


        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    // </Router>
  );
}

export default App;
