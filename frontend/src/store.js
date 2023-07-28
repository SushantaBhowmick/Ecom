
import { createStore, combineReducers,applyMiddleware} from "redux";
import thunk from "redux-thunk";
import { persistStore,persistReducer} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
import { 
    newProductReducer,
    newReviewSubmitReducer,
    productDetailsReducer, 
    productReducer, 
    productsReducer 
} from "./reducers/productReducer";
import {forgotPasswordReducer, profileReducer, userReducer} from './reducers/userReducer'
import { cartReducer } from "./reducers/cartReducer";
import { OrderReducer, allOrdersReducer, myOrdersReducer, newOrderReducer, orderDetailsReducer } from "./reducers/orderReducer";

const persistConfig = {
    key:'root',
    storage
}

const reducer = combineReducers({
    products: productsReducer,
    productDetails: productDetailsReducer,
    user: userReducer,
    profile: profileReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewSubmitReducer,
    newProduct: newProductReducer,
    product:productReducer,
    allOrders: allOrdersReducer,
    order: OrderReducer,
})

let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        :[],
    },
    
};
const persistedReducer = persistReducer(persistConfig,reducer)

const middleware = [thunk];

const store = createStore(
    persistedReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)
const persistor = persistStore(store)
export default store;
export {persistor}