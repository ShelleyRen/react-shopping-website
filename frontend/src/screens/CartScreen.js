import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import Message from "../components/Message";
import { Link } from "react-router-dom";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
  Container,
} from "react-bootstrap";
import { removeFromCart } from "../actions/cartActions";

export default function CartScreen() {
  // const productId = useParams().id;
  // console.log(productId);
  // const location = useLocation();
  // const qty = location.search ? Number(location.search.split("=")[1]) : 1;
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const cart = useSelector((state) => state.cart);
  // const { cartItems } = cart;

  const cart = useSelector((state) =>
    userInfo ? state.cartDetails.cart : state.cart
  );
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {};

  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [invalidDiscountCode, setInvalidDiscountCode] = useState(false);

  const itemPrice = cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2);

  const taxPrice = Number(itemPrice * 0.1).toFixed(2);

  const discountPrice = discount.toFixed(2);

  const totalPrice =
    Number(itemPrice) + Number(taxPrice) - Number(discountPrice);

  const TWENTYOFF = "20OFF";
  const WELCOME = "WELCOME";

  const applyDiscountHandler = () => {
    if (discountCode.toUpperCase(20) === TWENTYOFF) {
      setDiscount(20);
      setInvalidDiscountCode(false);
    } else if (discountCode.toUpperCase() === WELCOME) {
      setDiscount(30);
      setInvalidDiscountCode(false);
    } else {
      setInvalidDiscountCode(true);
    }
  };

  // useEffect(() => {
  //   if (productId) {
  //     console.log(productId);
  //     dispatch(addToCart(productId, qty));
  //   }
  // }, [dispatch, productId, qty]);

  return (
    <Row>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <Message>
          Your cart is empty <Link to="/">Go Back</Link>
        </Message>
      ) : (
        <ListGroup variant="flush">
          {cartItems.map((item) => (
            <ListGroup.Item key={item.product} className="border-0 mb-3">
              <Row>
                <Col md={2} xs={4}>
                  <Image src={item.image} alt={item.name} fluid rounded />
                </Col>
                <Col md={3} xs={5}>
                  <Link to={`/products/${item.product}`}>{item.name}</Link>
                </Col>
                <Col md={1} xs={3}>
                  ${item.price}
                </Col>
                <Col md={1} xs={4}></Col>
                <Col md={2} xs={5}>
                  <Form.Control
                    as="select"
                    value={item.qty}
                    onChange={(e) =>
                      dispatch(addToCart(item.product, Number(e.target.value)))
                    }
                  >
                    {[...Array(item.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2} xs={3}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => removeFromCartHandler(item.product)}
                  >
                    <i className="fa fa-trash"></i>
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
          <Row className="my-3 px-3">
            <Container>
              Apply Discount Code
              <Row>
                <Col xs={8} md={8}>
                  <Form.Control
                    type="text"
                    onChange={(e) => setDiscountCode(e.target.value)}
                    placeholder="Enter Discount Code"
                    className="my-3"
                  ></Form.Control>
                  {invalidDiscountCode && (
                    <Message variant="danger">Invalid Discount Code</Message>
                  )}
                </Col>
                <Col xs={4} md={4}>
                  <Button
                    type="submit"
                    variant="info"
                    className="btn-block my-3"
                    onClick={applyDiscountHandler}
                  >
                    Apply
                  </Button>
                </Col>
              </Row>
            </Container>
          </Row>
        </ListGroup>
      )}
      <Card>
        <ListGroup variant="flush">
          <ListGroup.Item className="border-0">
            <Row className="font-weight-bold">
              <Col xs={8} md={8}>
                Subtotal
              </Col>
              <Col xs={4} md={4}>
                ${itemPrice}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="border-0 text-bold">
            <Row>
              <Col xs={8} md={8}>
                Tax
              </Col>
              <Col xs={4} md={4}>
                ${taxPrice}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            <Row>
              <Col xs={8} md={8}>
                Discount
              </Col>
              <Col xs={4} md={4}>
                -${discountPrice}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item className="border-0">
            <Row>
              <Col xs={8} md={8}>
                Estimated Total
              </Col>
              <Col xs={4} md={4} className="text-right">
                {totalPrice}
              </Col>
            </Row>
          </ListGroup.Item>
          <ListGroup.Item>
            <Row>
              <Col xs={6} md={8}>
                <Link to="/" className="btn btn-success me-3 mb-3">
                  Continue Shopping
                </Link>
              </Col>
              <Col xs={6} md={4}>
                <Button
                  type="button"
                  className="btn-block mb-3"
                  variant="info"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Continue To Checkout
                </Button>
              </Col>
            </Row>
          </ListGroup.Item>
        </ListGroup>
      </Card>
    </Row>
  );
}
