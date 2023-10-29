import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();
  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <form className="d-flex" role="search" onSubmit={submitHandler}>
      <input
        className="form-control"
        type="search"
        placeholder="Search"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button type="submit" className="border-0 p-2">
        <i className="fa fa-search"></i>
      </button>
    </form>
  );
}
