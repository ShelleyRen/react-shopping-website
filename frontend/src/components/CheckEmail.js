import React from "react";

export default function CheckEmail() {
  return (
    <div>
      <div className="container h-100 d-flex justify-content-center mb-5">
        <i className="fas fa-envelope-circle-check fa-3x"></i>
      </div>
      <span>
        We have sent the update password link to your email, please check.
      </span>
    </div>
  );
}
