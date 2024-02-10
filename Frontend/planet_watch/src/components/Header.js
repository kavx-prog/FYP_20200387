import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Logout from "./Logout";
import { Button } from "react-bootstrap";
function Header() {
  return (
    <header>
    <nav class="navbar bg-dark" data-bs-theme="light">
      <Link to ="/dashboard">
        <img src={require("../assets/images/logo.png")} height={100} />
      </Link>
    </nav>
    </header>
  );
}

export default Header;
