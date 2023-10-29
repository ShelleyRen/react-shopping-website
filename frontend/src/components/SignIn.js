import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Message from "./Message";
import Loader from "./Loader";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error } = userLogin;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter valid email address");
    } else if (password.length < 6) {
      setMessage("Password should be at lease 6 characters.");
    } else {
      setMessage("");
      dispatch(login(email, password));
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <h3 className="align-items-center">Sign in to your account</h3>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form.Group controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>

      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        ></Form.Control>
      </Form.Group>

      <div className="d-grid">
        <button type="submit" className="btn btn-info mb-3">
          Sign In
        </button>
      </div>

      <div className="d-flex justify-content-between">
        <div className="dont-have-an-account">
          Don't have an account?{" "}
          <button
            onClick={() => props.setModalStatus("signUp")}
            className="border-0 bg-white text-info text-decoration-underline"
          >
            Sign up
          </button>
        </div>
        <div className="forgot-password text-right">
          <button
            onClick={() => props.setModalStatus("forgotPassword")}
            className="border-0 bg-white text-info text-decoration-underline"
          >
            Forgot password?
          </button>
        </div>
      </div>
    </Form>
  );
}
export default SignIn;
