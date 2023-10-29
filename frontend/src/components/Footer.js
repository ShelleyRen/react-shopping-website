import React from "react";
import { Container, Row, Col } from "react-bootstrap";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer>
      <Container>
        <Row>
          <Col>© {year} All Rights Reserved</Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
