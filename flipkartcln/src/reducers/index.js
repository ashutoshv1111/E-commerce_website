import { combineReducers } from "redux";
import productReducer from "./product.reducer";
import categoryReducer from './category.reducer';
import authReducers from "./auth.reducer";
import cartReducer from './cart.reducer';
import userReducer from './user.reducer';


const rootReducer = combineReducers({
 
    category: categoryReducer,
    product: productReducer,
    auth: authReducers,
    cart: cartReducer,
    user: userReducer
    
})

export default rootReducer;