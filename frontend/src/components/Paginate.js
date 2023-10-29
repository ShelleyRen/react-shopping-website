import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export default function Paginate({ pages, page }) {
  return (
    <Pagination className="d-flex justify-content-end">
      {[...Array(pages).keys()].map((x) => (
        <LinkContainer key={x + 1} to={`/page/${x + 1}`}>
          <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
        </LinkContainer>
      ))}
    </Pagination>
  );
}
