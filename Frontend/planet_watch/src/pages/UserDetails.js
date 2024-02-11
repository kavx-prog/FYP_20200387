import React, { useState ,useEffect} from "react";
import { Container, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
//import { useHistory } from "react-router";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from "react-i18next";
import jwtDecode from "jwt-decode";
function UserDetails() {
  const [myInfo,setMyInfo]=useState([])
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    axios.get('http://127.0.0.1:8000/userdetails').then((response)=>{
        setMyInfo(response.data.filter((item) => item.user === userId))
        console.log(myInfo)
    }).catch((error)=>{
        console.log(error.message)
    })
  }, [])
  
  return (
    <div>
       <Header></Header>
      <br></br>
      <Container style={{ backgroundColor: "white", border: "solid 1px #B3FF84" }}>
      <br></br>
      <h2 style={{fontWeight:"bold",color:"black"}}>Your Details</h2>
     
      <br></br>
    
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default UserDetails;
