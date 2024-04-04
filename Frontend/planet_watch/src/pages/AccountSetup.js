import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { Container } from 'react-bootstrap';
import axiosInstance from '../axios';
import "../assets/styles/accountpopup.css";
import jwtDecode from 'jwt-decode';
function AccountSetup() {
  const [telephoneNumber,setContact]=useState("");
  const [province,setProvince] = useState("")
  const [district , setDistrict] = useState("")
  const [area,setArea]= useState('')
  const [isPopupVisible, setPopupVisibility] = useState(true);

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
      setPopupVisibility(false);
      
      
    }).catch((error)=>{
      console.log(error.message)
    })
  }
    return (
       <div>
       {isPopupVisible &&(
        <div className="popup">
        {/* <span
          className="close-button"
        //   onClick={() => closeMessage()}
        >
          &#10006;
        </span> */}
        <div className="popup-content">
          {/* Your first-time login popup content here */}
          <form
           onSubmit={setupInfo}
           >
                        <h3>Contact & Location Setup</h3>
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
                        <div class="d-grid gap-2">
                        <button type="submit"  style={{border:"none",borderRadius:"5px", backgroundColor:"#51B737",color:"white",height:"40px"}}>Submit</button></div>
                        {/* <center>
                            <p style={{color:"red"}}>{errorMessage}</p></center> */}
                        </form>
                       
        </div>
      </div>
       )}
           
      </div>
       
      );
    };
    

export default AccountSetup

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