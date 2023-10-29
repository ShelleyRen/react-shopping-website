import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormContainer from "../components/FormContainer";

export default function NotFound() {
  return (
    <FormContainer>
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{ height: 600 }}
      >
        <i className="fas fa-circle-exclamation fa-4x mb-4"></i>

        <h3 className="mb-3">Oops, somthing went wrong!</h3>

        <Link to="/">
          <Button variant="info">Go Home</Button>
        </Link>
      </div>
    </FormContainer>
  );
}
