import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_REMOVE_ITEMS,
  CART_DETAILS_REQUEST,
  CART_DETAILS_SUCCESS,
  CART_DETAILS_FAIL,
  CART_DETAILS_RESET,
  CART_UPDATE_REQUEST,
  CART_UPDATE_SUCCESS,
  CART_UPDATE_FAIL,
  CART_UPDATE_RESET,
  CART_DETAIL_ADD_ITEM,
  CART_DETAIL_REMOVE_ITEM,
  CART_DETAIL_REMOVE_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };
    case CART_REMOVE_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export const cartDetailsReducer = (
  state = { cart: { cartItems: [] } },
  action
) => {
  switch (action.type) {
    case CART_DETAILS_REQUEST:
      return { ...state, loading: true };
    case CART_DETAILS_SUCCESS:
      return { loading: false, success: true, cart: action.payload };
    case CART_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case CART_DETAILS_RESET:
      return { cart: { cartItems: [] } };
    case CART_DETAIL_ADD_ITEM:
      const item = action.payload;

      const existItem = state.cart.cartItems.find(
        (x) => x.product === item.product
      );

      if (existItem) {
        return {
          ...state,
          cart: {
            cartItems: state.cart.cartItems.map((x) =>
              x.product === existItem.product ? item : x
            ),
          },
        };
      } else {
        return {
          ...state,
          cart: { cartItems: [...state.cart.cartItems, item] },
        };
      }
    case CART_DETAIL_REMOVE_ITEM:
      return {
        ...state,
        cart: {
          cartItems: state.cart.cartItems.filter(
            (x) => x.product !== action.payload
          ),
        },
      };
    case CART_DETAIL_REMOVE_ITEMS:
      return {
        ...state,
        cartItems: [],
      };
    default:
      return state;
  }
};

export const cartUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case CART_UPDATE_REQUEST:
      return { loading: true };
    case CART_UPDATE_SUCCESS:
      return { loading: false, success: true, cart: action.payload };
    case CART_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case CART_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
