import axios from "axios";
import {
    CLEAR_ERRORS,
    CREATE_ORDER_FAIL,
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    MY_ORDERS_FAIL, 
    MY_ORDERS_REQUEST,
    MY_ORDERS_SUCCESS,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDERS_REQUEST,
    ALL_ORDERS_SUCCESS,
    ALL_ORDERS_FAIL,
    UPDATE_ORDERS_REQUEST,
    UPDATE_ORDERS_SUCCESS,
    UPDATE_ORDERS_FAIL,
    DELETE_ORDERS_REQUEST,
    DELETE_ORDERS_SUCCESS,
    DELETE_ORDERS_FAIL,
} from "../constants/orderConstant";

//create Order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const { data } = await axios.post("http://localhost:4000/api/v1/order/new", order, config);

        dispatch({ type: CREATE_ORDER_SUCCESS, payload: data });

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message,
        })
    }
}

// My Orders
export const myOrders = () => async (dispatch) => {
    try {
      dispatch({ type: MY_ORDERS_REQUEST });
  
      const { data } = await axios.get("http://localhost:4000/api/v1/orders/me",{withCredentials: true});
  
      dispatch({ type: MY_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: MY_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// get All Orders (admin)
export const getAllOrders = () => async (dispatch) => {
    try {
      dispatch({ type: ALL_ORDERS_REQUEST });
  
      const { data } = await axios.get("http://localhost:4000/api/v1/admin/orders",{withCredentials: true});
  
      dispatch({ type: ALL_ORDERS_SUCCESS, payload: data.orders });
    } catch (error) {
      dispatch({
        type: ALL_ORDERS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

  
//update order (admin)
export const updateOrder = (id,order) => async (dispatch) => {
    try {
        dispatch({ type: UPDATE_ORDERS_REQUEST });
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        };
        const { data } = await axios.put(`http://localhost:4000/api/v1/admin/order/${id}`, order, config);

        dispatch({ type: UPDATE_ORDERS_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({
            type: UPDATE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}

  
//DELETe order (admin)
export const deleteOrder = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_ORDERS_REQUEST });
       
        const { data } = await axios.delete(`http://localhost:4000/api/v1/admin/order/${id}`,{withCredentials:true});

        dispatch({ type: DELETE_ORDERS_SUCCESS, payload: data.success });

    } catch (error) {
        dispatch({
            type: DELETE_ORDERS_FAIL,
            payload: error.response.data.message,
        })
    }
}


//Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: ORDER_DETAILS_REQUEST });
      
        const { data } = await axios.get(`http://localhost:4000/api/v1/order/${id}`,{withCredentials: true});

        dispatch({ type: ORDER_DETAILS_SUCCESS, payload: data.order });

    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message,
        })
    }
}


//Clearing Errors
export const clearErrors = () => async (dispatch) => {
    dispatch({ type: CLEAR_ERRORS })
}