import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Col, ListGroup, Image, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { listProductDetails, deleteProduct } from "../actions/productAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import QtySpinner from "../components/QtySpinner";
import { PRODUCT_DELETE_RESET } from "../constants/productConstants";
import { getUserDetails } from "../actions/userActions";

export default function ProductScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // const [qty, setQty] = useState(1);
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  useEffect(() => {
    if (userInfo) {
      dispatch(getUserDetails());
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
      navigate("/");
    } else {
      dispatch(listProductDetails(params.id));
    }
  }, [dispatch, navigate, params, successDelete, userInfo]);

  // const addToCartHandler = () => {
  //   navigate(`/cart/${params.id}?qty=${qty}`);
  // };

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure to delete the item?")) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div>
      <Link className="btn btn-dark my-3" to="/">
        Go Back
      </Link>
      <Row>
        <Col className="align-items-center">
          <h1>Products Detail</h1>
        </Col>
      </Row>
      {loadingDelete && <Loader />}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Row>
          <Col md={6}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={6}>
            <ListGroup variant="flush">
              <ListGroup.Item className="border-0 text-secondary">
                {product.category}
              </ListGroup.Item>
              <ListGroup.Item className="border-0 text-secondary">
                <h2>{product.name}</h2>
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                <Row>
                  <Col md={6} sm={6}>
                    <h3>Price: ${product.price}</h3>
                  </Col>
                  <Col md={4} sm={4}>
                    {product.countInStock > 0 ? (
                      <Alert variant="success sm">"In Stock"</Alert>
                    ) : (
                      <Alert variant="danger">"Out of Stock"</Alert>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item className="border-0">
                Description: {product.description}
              </ListGroup.Item>
              {/* {product.countInStock > 0 && (
                <ListGroup.Item className="border-0">
                  <Row>
                    <Col>Qty</Col>
                    <Col>
                      <Form.Control
                        as="select"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>
                  </Row>
                </ListGroup.Item>
              )} */}
              <ListGroup.Item>
                <Row>
                  <Col md={6} sm={12} className="mb-4">
                    <QtySpinner product={product} />
                  </Col>
                  <Col md={6} sm={12}>
                    {userInfo && user.isAdmin && (
                      <>
                        <LinkContainer to={`/product/${product._id}/edit`}>
                          <Button
                            className="btn-block me-4"
                            type="button"
                            variant="outline-secondary"
                          >
                            Edit
                          </Button>
                        </LinkContainer>
                        <Button
                          className="btn-block me-4"
                          type="button"
                          variant="outline-danger"
                          onClick={() => deleteHandler(product._id)}
                        >
                          DELETE
                        </Button>
                      </>
                    )}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </div>
  );
}
