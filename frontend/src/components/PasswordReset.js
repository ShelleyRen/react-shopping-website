import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { resetPassword } from "../actions/userActions";
import { USER_PASSWORD_RESET_RESET } from "../constants/userConstants";

function PasswordReset(props) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState(null);

  const userPasswordReset = useSelector((state) => state.userPasswordReset);
  const { loading, error, success } = userPasswordReset;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    if (email === "") {
      setMessage("Eamil cannot be empty");
    } else {
      setMessage("");
      dispatch(resetPassword(email));
    }
  };

  useEffect(() => {
    if (success) {
      dispatch({ type: USER_PASSWORD_RESET_RESET });
      props.setModalStatus("resetPassword");
    }
  }, [dispatch, props, success]);

  return (
    <Form onSubmit={submitHandler}>
      <h3>Update your password</h3>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form.Group controlId="email" className="mb-3">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></Form.Control>
      </Form.Group>

      <div className="d-grid">
        <button type="submit" className="btn btn-info mb-3">
          Update password
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
export default PasswordReset;
