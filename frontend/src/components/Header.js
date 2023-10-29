import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { formatCurrency } from "../utilites/formatCurrency";
import { logout } from "../actions/userActions";
import Modal from "react-bootstrap/Modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import PasswordReset from "./PasswordReset";
import SearchBar from "./SearchBar";
import CheckEmail from "./CheckEmail";
import {
  CART_DETAILS_RESET,
  CART_REMOVE_ITEMS,
} from "../constants/cartConstants";
import { getUserCart } from "../actions/cartActions";

function Header() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    if (window.confirm("Are you sure to log out?")) {
      dispatch({ type: CART_REMOVE_ITEMS });
      dispatch({ type: CART_DETAILS_RESET });
      dispatch(logout());
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [modalStatus, setModalStatus] = useState("");
  function handleSignInModal() {
    if (modalStatus === "forgotPassword") {
      return <PasswordReset setModalStatus={setModalStatus} />;
    } else if (modalStatus === "signUp") {
      return <SignUp setModalStatus={setModalStatus} />;
    } else if (modalStatus === "resetPassword") {
      return <CheckEmail setModalStatus={setModalStatus} />;
    } else {
      return <SignIn setModalStatus={setModalStatus} />;
    }
  }

  const cart = useSelector((state) =>
    userInfo ? state.cartDetails.cart : state.cart
  );
  const { cartItems } = cart;

  const cartQuantity = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const carSubtotal = formatCurrency(
    cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)
  );

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserCart());
    }
  }, [dispatch, userInfo]);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Management Chuwa</Navbar.Brand>
          </LinkContainer>
          <SearchBar />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto justify-content-end">
              {userInfo ? (
                <Nav.Link
                  onClick={() => {
                    logoutHandler();
                    handleClose();
                  }}
                >
                  <i className="fas fa-user me-2"></i>Logout
                </Nav.Link>
              ) : (
                <div>
                  <Nav.Link onClick={handleShow}>
                    <i className="fas fa-user me-2"></i>Sign In
                  </Nav.Link>
                  <Modal
                    show={show}
                    onHide={handleClose}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header
                      style={{ border: "1px solid #fff" }}
                      closeButton
                      onClick={() => setModalStatus("")}
                    />
                    <Modal.Body>{handleSignInModal()}</Modal.Body>
                  </Modal>
                </div>
              )}
              <LinkContainer to="/cart">
                <Nav.Link className="sticky-top">
                  {/* <i className="fas fa-shopping-cart"></i>Cart */}
                  <i className="fas fa-shopping-cart"></i>
                  {cartQuantity > 0 && (
                    <div
                      className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                      style={{
                        color: "white",
                        width: "1rem",
                        height: "1rem",
                        position: "absolute",
                        top: 0,
                        transform: "translate(90%, 25%)",
                      }}
                    >
                      {cartQuantity}
                    </div>
                  )}
                  <span className="ms-3">{carSubtotal}</span>
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
