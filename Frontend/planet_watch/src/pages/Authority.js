import React, { useState ,useEffect} from "react";
import { Container, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
//import { useHistory } from "react-router";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from "react-i18next";
function Authority() {
  const { t, i18n } = useTranslation();
  const [emeregencyMessages,setEmergencyMessages]=useState([])
  const [click,setClick] = useState()
  const [isClicked, setIsClicked] = useState(false);
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/authcontact').then((response)=>{
        setEmergencyMessages(response.data)
        console.log(emeregencyMessages)
    }).catch((error)=>{
        console.log(error.message)
    })
  }, [])
  const handleButtonClick = (id) => {
    setClick(id)
    setIsClicked(id);
    // You can perform actions based on the clicked record ID
  };
  const sendSMS = async ()=>{
    const response = await axios.post(`http://127.0.0.1:8000/makeseen/${click}/`);
    console.log(response.data.message)
  }
  return (
    <div>
       <Header></Header>
      <br></br>
      <Container style={{ backgroundColor: "white", border: "solid 1px #B3FF84" }}>
      <br></br>
      <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            Emergency Notification Management
            <img
              src={require("../assets/images/call119.jpg")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
        </div>
      <br></br>
      <table class="table table-bordered table-success table-responsive-lg" style={{backgroundColor:"#90EE90"}}>
  <thead >
    <tr class="table-success">
      <th scope="col"></th>
      <th scope="col">{t("Affected Area")}</th>
      <th scope="col">{t("sender")}</th>
      <th scope="col"></th>
    </tr>
  </thead>
  <tbody>
  {emeregencyMessages.filter(data=>!data.is_seen).map((data)=>{
    return(
        <tr>
      <th scope="row">{data.id}</th>
      <td>{data.affectedArea}</td>
      <td>{data.userphone}</td>
      <td>
      <button className="btn btn-success" onClick={() => { handleButtonClick(data.id)
    setClick(data.id);
    // console.log(data.id)
    console.log(click)
    sendSMS();
  }}> 
   {isClicked === data.id ? 'Sent SMS' : 'Send SMS'}
   </button>
      </td>
    </tr>
    )
  })}
    
  </tbody>
</table>
      </Container>
      <br></br>
      <Footer></Footer>
    </div>
  );
}

export default Authority;
