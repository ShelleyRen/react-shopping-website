import React from "react";
import { useDispatch, useSelector } from "react-redux";
import InputSpinner from "react-bootstrap-input-spinner";
import { addToCart, updateUserCart } from "../actions/cartActions";
import { Button } from "react-bootstrap";

export default function QtySpinner({ product }) {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const cart = useSelector((state) =>
    userInfo ? state.cartDetails.cart : state.cart
  );
  const { cartItems } = cart;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const existItem = cartItems.find((item) => item.product === product._id);

  const addToCartHandler = () => {
    dispatch(addToCart(product._id, 1));
  };

  return (
    <>
      {existItem === undefined ? (
        <Button
          onClick={addToCartHandler}
          className="btn-block me-4"
          type="button"
          disabled={product.countInStock === 0}
          variant="info"
        >
          Add To Cart
        </Button>
      ) : (
        <InputSpinner
          type={"int"}
          max={product.countInStock}
          min={1}
          step={1}
          value={existItem.qty}
          onIncrease={(e) =>
            dispatch(addToCart(product._id, Number(existItem.qty + 1)))
          }
          onDecrease={(e) =>
            dispatch(addToCart(product._id, Number(existItem.qty - 1)))
          }
          variant={"info"}
          disabled={product.countInStock === 0}
          size="sm"
        />
      )}
    </>
  );
}
