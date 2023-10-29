import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import QtySpinner from "./QtySpinner";

export default function Product({ product }) {
  return (
    <Card className="my-3 p-3 rounded">
      <Link to={`/products/${product._id}`}>
        <Card.Img src={product.image} variant="top"></Card.Img>
      </Link>
      <Card.Body>
        <Link to={`/products/${product._id}`}>
          <Card.Title as="div">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">${product.price}</div>
        </Card.Text>
        <QtySpinner product={product} />
      </Card.Body>
    </Card>
  );
}
