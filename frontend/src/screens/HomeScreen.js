import React, { useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Product from "../components/Product";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productAction";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";
import { getUserDetails } from "../actions/userActions";

export default function HomeScreen() {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products, pages, page } = productList;

  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const keyword = useParams().keyword;
  const pageNumber = useParams().pageNumber || 1;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
    if (userInfo) {
      dispatch(getUserDetails());
    }
  }, [dispatch, keyword, pageNumber, userInfo]);

  return (
    <div>
      {keyword && (
        <Link className="btn btn-light my-3" to="/">
          Go Back
        </Link>
      )}
      <Row>
        <Col className="align-items-center">
          <h1>Products</h1>
        </Col>
      </Row>
      {userInfo && user.isAdmin && (
        <Row>
          <Col className="d-flex justify-content-end">
            <Link to={`/product/create`}>
              <Button className="my-3" variant="info">
                Add Product
              </Button>
            </Link>
          </Col>
        </Row>
      )}
      {loading ? (
        <Loader>Loading...</Loader>
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
          <Paginate pages={pages} page={page} />
        </>
      )}
    </div>
  );
}
