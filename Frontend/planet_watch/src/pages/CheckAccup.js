import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axiosInstance from '../axios';
import "../assets/styles/accountpopup.css";
import jwtDecode from 'jwt-decode';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { useTranslation } from "react-i18next";
function CheckAccup() {
  const { t, i18n } = useTranslation();
    const navigate = useNavigate()
  const [telephoneNumber,setContact]=useState("");
  const [province,setProvince] = useState("")
  const [district , setDistrict] = useState("")
  const [area,setArea]= useState('')
  const [isPopupVisible, setPopupVisibility] = useState(true);
  const [myInfo,setMyInfo]=useState({})
  
function setvisibility(){
    setPopupVisibility(true)
    console.log(isPopupVisible)
}
function getUserDetails(){
  const token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;
  console.log(userId)
  axios.get('http://127.0.0.1:8000/userdetails/').then((response)=>{
      setMyInfo(response.data.filter((item) => item.owner === userId))
      console.log(myInfo)
  }).catch((error)=>{
      console.log(error.message)
  })
}
  function setupInfo(e){
    const token = localStorage.getItem('access_token')
      const decodedToken = jwtDecode(localStorage.getItem('access_token'));
      const user = {
        id: decodedToken.user_id,
        
        // Include other user fields as needed
      };
      console.log(user)
    e.preventDefault();
    const info = {
      province,district,area,telephoneNumber,user
    }
    axiosInstance.post('userdetails/',info, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=>{
      console.log(res.data);
      alert("Success");
      navigate("/dashboard")
      setPopupVisibility(false);
      localStorage.setItem("firstTimeLogin", "true");
      
      
    }).catch((error)=>{
      console.log(error.message)
    })
  }
    return (
    
       <div >
       <Header></Header>
       <br></br>
       <Container>
          
       {isPopupVisible &&(
        
        <div style={{backgroundColor:"white"}}>
        {/* <span
          className="close-button"
        //   onClick={() => closeMessage()}
        >
          &#10006;
        </span> */}
       
          {/* Your first-time login popup content here */}
          <form
           onSubmit={setupInfo} style={{padding:"50px"}}
           >
                         <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            {t("Your Details")}
            <img
              src={require("../assets/images/details2.jpg")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
        </div>
                        <p>Share Your Location and Contact Details so We Can Stay Connected!</p>
                        
                        <div class="mb-3">
                            <label for="exampleInpuProvince" class="form-label " style={{ color: "black" }}>Province</label>
                            <input type="text" class="form-control" id="province" 
                            onChange={(e)=>{
                                setProvince(e.target.value);
                            }} 
                            required="true" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInpuDistrict" class="form-label " style={{ color: "black" }}>District</label>
                            <input type="text" class="form-control" id="District" 
                            onChange={(e)=>{
                                setDistrict(e.target.value);
                            }} 
                            required="true" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInpuArea" class="form-label " style={{ color: "black" }}>Area</label>
                            <input type="text" class="form-control" id="Area" 
                            onChange={(e)=>{
                                setArea(e.target.value);
                            }} 
                            required="true" />
                        </div>
                        <div class="mb-3">
                            <label for="exampleInputTelephone" class="form-label " style={{ color: "black" }}>Contact Number</label>
                            <input type="number" class="form-control" id="contactnum" placeholder='94767878595'
                             onChange={(e)=>{
                                setContact(e.target.value);
                            }} 
                            required="true"/>
                            {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
                        </div>
                        <div class="d-grid gap-2"><center>
                        <button type="submit" className='btn btn-success' onClick={getUserDetails}>Submit</button></center></div>
                       
                        {/* <center>
                            <p style={{color:"red"}}>{errorMessage}</p></center> */}
                        </form>
                      
                     <center>
                          {/* <p>{myInfo[0].area}</p> */}
                          
                          <div class="card border-success mb-3" style={{maxWidth:"50rem",alignItems:"center"}}>
  <div class="card-body">
    <h5 class="card-title" style={{color:"green",fontWeight:"bold",fontSize:"30px"}}>Your Contact Details</h5>
    <button className='btn btn-dark' onClick={getUserDetails}>Show My Details</button>
    {myInfo[0] && (
      <div>
    <p class="card-text">Province : {myInfo[0].province} </p>
    <p class="card-text">District : {myInfo[0].district}</p>
    <p class="card-text">Area : {myInfo[0].area}</p>
    <p class="card-text">Contact Number : {myInfo[0].telephoneNumber}</p>
    </div>
    )}
  </div>
</div>
<br></br></center>         
      </div>
       )}
       </Container>
       <br></br>
       <Footer></Footer>
      </div>
       
      );
    };
    

export default CheckAccup

{/* <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form> */}