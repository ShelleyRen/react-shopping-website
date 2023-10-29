import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { register } from "../actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";

function SignUp(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error } = userRegister;

  const submitHandler = (e) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setMessage("Please enter valid email address");
    } else if (password.length < 6) {
      setMessage("Password should be at lease 6 characters.");
    } else {
      setMessage("");
      dispatch(register(email, password));
    }
  };

  return (
    <Form onSubmit={submitHandler}>
      <h3>Sign up an account</h3>
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
        ></Form.Control>
      </Form.Group>
      <Form.Group controlId="password" className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <div className="d-grid">
        <button type="submit" className="btn btn-info mb-3">
          Create account
        </button>
      </div>
      <div className="d-flex justify-content-between">
        <div className="dont-have-an-account">
          Already have an account{" "}
          <button
            onClick={() => props.setModalStatus("")}
            className="border-0 bg-white text-info text-decoration-underline"
          >
            Sign in
          </button>
        </div>
      </div>
    </Form>
  );
}
export default SignUp;
