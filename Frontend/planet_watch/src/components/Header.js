import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Logout from "./Logout";
import Notifications from "../pages/Noftifications";
import { Button } from "react-bootstrap";
function Header() {
  return (
    <header>
    <nav class="navbar bg-dark" data-bs-theme="light">
      <Link to ="/dashboard">
        <img src={require("../assets/images/logo.png")} height={100} />
      </Link>
      <Link to ="/checkaccup">
        <Button style={{backgroundColor:"#B3FF84",border:"None",color:"black",fontWeight:"bold", float:"right"}}>Set up your account</Button>
      </Link>
      <Notifications/> <Logout/>
       
      
    </nav>
    </header>
  );
}

export default Header;
