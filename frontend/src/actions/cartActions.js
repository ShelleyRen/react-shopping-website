import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_DETAIL_ADD_ITEM,
  CART_DETAIL_REMOVE_ITEM,
} from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}/`);

  const {
    userLogin: { userInfo },
  } = getState();

  dispatch({
    type: userInfo ? CART_DETAIL_ADD_ITEM : CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  const {
    cartDetails: {
      cart: { cartItems },
    },
  } = getState();

  if (userInfo) {
    dispatch(updateUserCart({ cartItems }));
  } else {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  const {
    userLogin: { userInfo },
  } = getState();

  dispatch({
    type: userInfo ? CART_DETAIL_REMOVE_ITEM : CART_REMOVE_ITEM,
    payload: id,
  });

  const {
    cartDetails: {
      cart: { cartItems },
    },
  } = getState();

  if (userInfo) {
    dispatch(updateUserCart({ cartItems }));
  } else {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );
  }
};

export const updateUserCart = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/users/cart`, user, config);

    dispatch({ type: CART_UPDATE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CART_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getUserCart = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CART_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/cart`, config);

    dispatch({ type: CART_DETAILS_SUCCESS, payload: data });

    // const {
    //   cartDetails: { cart },
    // } = getState();
  } catch (error) {
    dispatch({
      type: CART_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
