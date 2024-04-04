import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker, MarkerClusterer, InfoWindow } from "@react-google-maps/api";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/styles/hexagon.css";
import Header from '../components/Header';
import Footer from '../components/Footer';
import axios from "axios";
import LineChartExample from "./LineChartExample";
import "../assets/styles/hexagon.css";
import CheckModal from "./CheckModal";
import jwtDecode from 'jwt-decode';
import WindChart from "./WindChart";
import SlideChart from "./SlideChart";
import { useTranslation } from "react-i18next";
const containerStyle = {
  width: "100%",
  height: "500px",
};
const center = {
  lat: 6.7056,
  lng: 80.3847,
};
// Modal.setAppElement('#root');
function Checkwarning() {
  const { t, i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState("tab1");
  const [disasterType, setdisasterType] = useState();
  const [flood, setFlood] = useState({});
  const [landslide, setLandslide] = useState({});
  const [strongwind, setStrongwind] = useState({});
  const [thunder, setThunder] = useState({});
  const [requestTime, setRequestTime] = useState(null);
  const [userLocationlat, setUserLocationlat] = useState();
  const [userLocationlong, setUserLocationlong] = useState();
  const [emergencyflood, setEmergencyflood] = useState([]);
  const [emergencyslide, setEmergencyslide] = useState([]);
  const [emergencywind, setEmergencywind] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [selectedMarkerslide, setSelectedMarkerslide] = useState(null);
  const [selectedwind, setSelectedwind] = useState(null);
  const [floodGuidance, setFloodGuidance] = useState([])
  const [slideGuidance, setslideGuidance] = useState([])
  const [windGuidance, setwindGuidance] = useState([])
  const [thunderGuidance, setthunderGuidance] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [owner_id, setowner_id] = useState({});
//   useEffect(() => {
//     // Get the token from storage (localStorage, cookies, etc.)
//     const token = localStorage.getItem('access_token'); // Adjust this according to your setup

//     if (token) {
//       const decodedToken = jwtDecode(token);
//       owner = {

//       }
//       setowner_id(decodedToken.user_id);
//       console.log(owner_id)
//     }
//   }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };


  const [isfloodModalOpen, setIsfloodModalOpen] = useState();

  const openfloodModal = () => {
    setIsfloodModalOpen(true);
  };

  const closefloodModal = () => {
    setIsfloodModalOpen(false);
  };

  const [isLandModalOpen, setIsLandModalOpen] = useState();

  const openLandModal = () => {
    setIsLandModalOpen(true);
  };

  const closeLandModal = () => {
    setIsLandModalOpen(false);
  };

  const [isStrongwindModalOpen, setIsStrongwindModalOpen] = useState();

  const openStrongwindModal = () => {
    setIsStrongwindModalOpen(true);
  };

  const closeStrongwindModal = () => {
    setIsStrongwindModalOpen(false);
  };

  const [isThunderModalOpen, setIsThunderModalOpen] = useState();

  const openThunderModal = () => {
    setIsThunderModalOpen(true);
  };

  const closeThunderModal = () => {
    setIsThunderModalOpen(false);
  };

  const colorMap = {
    "[0]": "#10F034", // Green for [0]
    "[1]": "#FFFF00", // Yellow for [1]
    "[2]": "#FFA500", // Orange for [2]
    "[3]": "#FF0000", // Red for [3]
  };

  const impactRangeMap = {
    "[0]": "0 - 335",
    "[1]": "335 - 3003",
    "[2]": "3003 - 14650",
    "[3]": "More than 14650",
  }

  const RiskMap = {
    "[0]": "Low Risk",
    "[1]": "Medium Risk",
    "[2]": "High Risk",
    "[3]": "Very High Risk",
  }


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  // axios.get('http://127.0.0.1:8000/floodpred/').then((res)=>{
  //   setFlood(res.data)

  // }).catch((err)=>{
  //   console.log(err.message)
  // })
  useEffect(() => {
    fetchFlood();
  }, {})
  useEffect(() => {
    fetchLandslide();
  }, {})
  useEffect(() => {
    fetchStrongWind();
  }, {})
  useEffect(() => {
    fetchThunder();
  }, {})
  useEffect(() => {
    getPlacesFlood()
  }, [])
  useEffect(() => {
    getPlacesLandslide()
  }, [])
  useEffect(() => {
    getPlacesWind()
  }, [])

  useEffect(() => {
    getGuidanceFlood()
  }, [])
  useEffect(() => {
    getGuidanceSlide()
  }, [])
  useEffect(() => {
    getGuidanceWind()
  }, [])
  useEffect(() => {
    getGuidanceThunder()
  }, [])
  // useEffect(()=>{
  //   axios.get()
  // })

  // useEffect(() => {
  //   function getloc(){
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         // const { latitude, longitude } = position.coords;
  //         // setUserLocation({ lat: latitude, lng: longitude });
  //         // console.log(userLocation)
  //         const pos = {
  //           lat : position.coords.latitude,
  //           lng: position.coords.longitude
  //         }
  //         setUserLocationlat(pos.lat)
  //         setUserLocationlong(pos.lng)
  //         console.log(userLocationlat)



  //       }
  //     );
  //   } else {
  //     console.error('Geolocation is not supported by this browser.');
  //   }}
  // // }, {});
  //   // console.log(userLocation)
  //   //       console.log(setUserLocation)

  //   console.log(getloc())


  const fetchFlood = async () => {
    try {
      const currentTime = new Date();
      const formattedDateTime = `${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}`;

      setRequestTime(formattedDateTime);
      console.log(requestTime);
      const response = await axios.get('http://127.0.0.1:8000/floodpred/');
      setFlood(response.data);
      console.log(response.data);

    } catch (error) {
      console.log(error.message);
    }

  }
  const fetchLandslide = async () => {
    try {
      const currentTime = new Date();
      const formattedDateTime = `${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}`;

      setRequestTime(formattedDateTime);
      console.log(requestTime);
      const response = await axios.get('http://127.0.0.1:8000/landslidepred/');
      setLandslide(response.data);
      console.log(response.data);

    } catch (error) {
      console.log(error.message);
    }

  }

  const fetchStrongWind = async () => {
    try {
      const currentTime = new Date();
      const formattedDateTime = `${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}`;

      setRequestTime(formattedDateTime);
      console.log(requestTime);
      const response = await axios.get('http://127.0.0.1:8000/windpred/');
      setStrongwind(response.data);
      console.log(response.data);

    } catch (error) {
      console.log(error.message);
    }

  }

  const fetchThunder = async () => {
    try {
      const currentTime = new Date();
      const formattedDateTime = `${currentTime.toDateString()} ${currentTime.toLocaleTimeString()}`;

      setRequestTime(formattedDateTime);
      console.log(requestTime);
      const response = await axios.get('http://127.0.0.1:8000/thunderpred/');
      setThunder(response.data);
      console.log(response.data);

    } catch (error) {
      console.log(error.message);
    }

  }

  const getGuidanceFlood = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/guidance/');
      const filteredFloodGuidance = response.data
        .filter(item => item.disaster === 'Flood')
        .map(({ disaster, ...rest }) => rest);
      setFloodGuidance(filteredFloodGuidance);
      console.log(floodGuidance)
    } catch (error) {
      console.log(error.message)
    }
  }
  const getGuidanceSlide = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/guidance/');
      const filteredslideGuidance = response.data
        .filter(item => item.disaster === 'Landslide')
        .map(({ disaster, ...rest }) => rest);
      setslideGuidance(filteredslideGuidance);
      console.log(floodGuidance)
    } catch (error) {
      console.log(error.message)
    }
  }
  const getGuidanceWind = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/guidance/');
      const filteredwindGuidance = response.data
        .filter(item => item.disaster === 'Strongwind')
        .map(({ disaster, ...rest }) => rest);
      setwindGuidance(filteredwindGuidance);
      console.log(windGuidance)
    } catch (error) {
      console.log(error.message)
    }}
    const getGuidanceThunder = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/guidance/');
        const filteredthunderGuidance = response.data
          .filter(item => item.disaster === 'Thunder')
          .map(({ disaster, ...rest }) => rest);
        setthunderGuidance(filteredthunderGuidance);
        console.log(windGuidance)
      } catch (error) {
        console.log(error.message)
      }
    }
  const getPlacesFlood = async () => {
    try {

      const response = await axios.get('http://127.0.0.1:8000/emergency/');

      console.log(response.data)
      const filteredFloodData = response.data
        .filter(item => item.flood === true)
        .map(({ flood, ...rest }) => rest);
      setEmergencyflood(filteredFloodData);

    } catch (error) {
      console.log(error.message)
    }
  }
  const getPlacesLandslide = async () => {
    try {

      const response = await axios.get('http://127.0.0.1:8000/emergency/');

      console.log(response.data)
      const filteredslideData = response.data
        .filter(item => item.landslide === true)
        .map(({ landslide, ...rest }) => rest);
      setEmergencyslide(filteredslideData);

    } catch (error) {
      console.log(error.message)
    }
  }
    const getPlacesWind = async () => {
    try {

      const response = await axios.get('http://127.0.0.1:8000/emergency/');

      console.log(response.data)
      const filteredwindData = response.data
        .filter(item => item.strongwind === true)
        .map(({ strongwind, ...rest }) => rest);
      setEmergencywind(filteredwindData);

    } catch (error) {
      console.log(error.message)
    }
  }
  const contactAuthority = async ()=>{
//     // await axios.post('http://127.0.0.1:8000/contact/');
//     // if (!owner_id) {
//     //     console.log("User ID not available.");
//     //     return;
//     //   }
    
//     //   try {
//     //     const response = await axios.post('http://127.0.0.1:8000/contact/', {
//     //       owner_id: owner_id,
//     //     });
//     //     console.log(response.data.message);
//     //   } catch (error) {
//     //     console.error(error.response.data.error);
//     //   }
    try {
    const token = localStorage.getItem('access_token')
      const decodedToken = jwtDecode(localStorage.getItem('access_token'));
      const user = {
        id: decodedToken.user_id,
        
        // Include other user fields as needed
      };
      console.log(user)

      const response = await axios.post('http://127.0.0.1:8000/contact/', user, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data.message);
    } catch (error) {
      console.error(error.response.data.error);
    }
  }

  console.log(emergencyflood)

  const iconColor = colorMap[flood.impactRange] || "#000000";
  const victimRange = impactRangeMap[flood.impactRange]
  const riskLevel = RiskMap[flood.impactRange]
 
  return (
    <div>
      <Header></Header>
      <br></br>
      <Container
        style={{ backgroundColor: "white", border: "solid 1px #B3FF84" }}
      >
        <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
           {t("warning alerts")}
            <img
              src={require("../assets/images/sign.png")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
        </div>
        {flood !== 0 && (<div
          className="card"
          style={{
            backgroundColor: "#F8FFF7",
            border: "1px solid #B3FF84",
            height: "400px",
          }}
        >
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item" style={{ width: "35rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab1")}
                  href="#tab1"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/warningAl.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  {t("info")}
                </a>
              </li>
              <li className="nav-item" style={{ width: "44.5rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab2")}
                  href="#tab2"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/help.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {t("help")}
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === "tab1" ? "show active" : ""
                  }`}
                id="tab1"
              >
                {/* <h5 className="card-title" style={{color:"black"}}>Tab 1 Content</h5> */}
                {/* <div className="row ">
                                      <div className='col'><center>
                                          <img alt="Air quality" src={require("../assets/images/flooded-house.png")} class="rounded-circle" style={{ width: '100px', height: '100px', alignItself: "center" }} />
                                      </center>
                                      </div>
                                      <div className='col' style={{ float: "right" }}>
  
                                      </div>
                                  </div> */}
                <div class="row ">
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-8">
                          {/* <img
                            src={require("../assets/images/flooded-house.png")}
                            class="img-fluid rounded-start"
                            alt="..."
                          /> */}
                          <LineChartExample/>
                        </div>
                       
                        {/* <div class="col-md-6">
                          <div class="card-body">
                            <h5 class="card-title" style={{ color: "black" }}>
                              Flood
                            </h5>

                            <p class="card-text" style={{ color: "black" }}>
                              Ratnapura, Sabaragamuwa, Sri Lanka
                            </p>
                            <span>
                              <i
                                class="bi bi-square"
                                style={{
                                  color: iconColor,
                                  background: iconColor,
                                }}
                              >
                                Low
                              </i>
                            </span>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div> */}
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-6">
                          <div class="card-body" style={{alignItems:"left"}}>
                            <h5 class="card-title" style={{ color: "black",fontWeight:"bold" }}>
                              {t("flood")}
                            </h5>

                            <p class="card-text" style={{ color: "black" }}>
                              Ratnapura, Sabaragamuwa, Sri Lanka
                            </p>
                            <span>
                              <i
                                class="bi bi-square"
                                style={{
                                  color: iconColor,
                                  background: iconColor,
                                }}
                              >
                                {riskLevel}
                              </i>
                            </span>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div>
                        <div class="col-md-6">
                          <div class="card-body">
                            <h5 class="card-title" style={{ color: "black" }}>
                              Damage Estimation
                            </h5>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                These are predicted values
                              </small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Affected ares:</small>
                              </span>
                              <small> Ratnapura , Kegalle</small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>No. of victims:</small>
                              </span>{" "}
                              <small> {victimRange}</small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Risk Level:</small>{" "}
                              </span>{" "}
                              <small> {riskLevel}</small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${activeTab === "tab2" ? "show active" : ""
                  }`}
                id="tab2"
              >
                <div
                  class="card mb-3"
                  style={{
                    width: "540px",
                    border: "none",
                    backgroundColor: "#F8FFF7",
                  }}
                >
                  <div class="row g-0">
                    <div class="col">
                      <img
                        src={require("../assets/gifs/emergency-call.gif")}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h3 class="card-title" style={{ color: "black" }}>
                          Emergency hotline
                        </h3>
                        <br></br>
                        <div class="d-grid gap-2">
                          <button class="btn btn-danger" type="button" onClick={contactAuthority}>
                            119
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="card-title"></h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>)}
        
        {" "}
        <br></br>
        {landslide !== 0 && (<div
          className="card"
          style={{
            backgroundColor: "#F8FFF7",
            border: "1px solid #B3FF84",
            height: "400px",
          }}
        >
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item" style={{ width: "35rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab1")}
                  href="#tab1"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/warningAl.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  {t("info")}
                </a>
              </li>
              <li className="nav-item" style={{ width: "44.5rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab2")}
                  href="#tab2"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/help.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {t("help")}
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === "tab1" ? "show active" : ""
                  }`}
                id="tab1"
              >
                {/* <h5 className="card-title" style={{color:"black"}}>Tab 1 Content</h5> */}
                {/* <div className="row ">
                                      <div className='col'><center>
                                          <img alt="Air quality" src={require("../assets/images/flooded-house.png")} class="rounded-circle" style={{ width: '100px', height: '100px', alignItself: "center" }} />
                                      </center>
                                      </div>
                                      <div className='col' style={{ float: "right" }}>
  
                                      </div>
                                  </div> */}
                <div class="row ">
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-8">
                         
                          <SlideChart/>
                        </div>
                       
                        
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-6">
                          <div class="card-body" style={{alignItems:"left"}}>
                            <h5 class="card-title" style={{ color: "black" , fontWeight:"bold"}}>
                              {t("landslide")}
                            </h5>

                            <p class="card-text" style={{ color: "black" }}>
                              Ratnapura, Sabaragamuwa, Sri Lanka
                            </p>
                            <span>
                              <i
                                class="bi bi-square"
                                style={{
                                  color: iconColor,
                                  background: iconColor,
                                }}
                              >
                                {riskLevel}
                              </i>
                            </span>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div>
                        {/* <div class="col-md-6">
                          <div class="card-body">
                            <h5 class="card-title" style={{ color: "black" }}>
                              Damage Estimation
                            </h5>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                These are predicted values
                              </small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Affected ares:</small>
                              </span>
                              <small> Ratnapura , Kegalle</small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Estimating house damages:</small>
                              </span>{" "}
                              <small> {landslide.damaged_houses}</small>
                            </p> */}
                            {/* <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Risk Level:</small>{" "}
                              </span>{" "}
                              <small> {riskLevel}</small>
                            </p> */}
                            {/* <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${activeTab === "tab2" ? "show active" : ""
                  }`}
                id="tab2"
              >
                <div
                  class="card mb-3"
                  style={{
                    width: "540px",
                    border: "none",
                    backgroundColor: "#F8FFF7",
                  }}
                >
                  <div class="row g-0">
                    <div class="col">
                      <img
                        src={require("../assets/gifs/emergency-call.gif")}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h3 class="card-title" style={{ color: "black" }}>
                          Emergency hotline
                        </h3>
                        <br></br>
                        <div class="d-grid gap-2">
                          <button class="btn btn-danger" type="button" onClick={contactAuthority}>
                            119
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="card-title"></h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>)}

        <br></br>
        {strongwind !== 0 && (<div
          className="card"
          style={{
            backgroundColor: "#F8FFF7",
            border: "1px solid #B3FF84",
            height: "400px",
          }}
        >
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item" style={{ width: "35rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab1")}
                  href="#tab1"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/warningAl.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  {t("info")}
                </a>
              </li>
              <li className="nav-item" style={{ width: "44.5rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab2")}
                  href="#tab2"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/help.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {t("help")}
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === "tab1" ? "show active" : ""
                  }`}
                id="tab1"
              >
          
                <div class="row ">
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-8">
                         
                          <WindChart/>
                        </div>
                       
                        
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-8">
                          <div class="card-body" style={{alignItems:"left"}}>
                            <h5 class="card-title" style={{ color: "black",fontWeight:"bold" }}>
                              {t("strongwind")}
                            </h5>

                            <p class="card-text" style={{ color: "black" }}>
                              Ratnapura, Sabaragamuwa, Sri Lanka
                            </p>
                            <span>
                              <i
                                class="bi bi-square"
                                style={{
                                  color: iconColor,
                                  background: iconColor,
                                }}
                              >
                                {riskLevel}
                              </i>
                            </span>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div>
                        {/* <div class="col-md-6">
                          <div class="card-body">
                            <h5 class="card-title" style={{ color: "black" }}>
                              Damage Estimation
                            </h5>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                These are predicted values
                              </small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Affected ares:</small>
                              </span>
                              <small> Ratnapura , Kegalle</small>
                              
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Estimating house damages:</small>
                              </span>{" "}
                              <small> {strongwind.damaged_houses}</small>
                            </p>
                        
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${activeTab === "tab2" ? "show active" : ""
                  }`}
                id="tab2"
              >
                <div
                  class="card mb-3"
                  style={{
                    width: "540px",
                    border: "none",
                    backgroundColor: "#F8FFF7",
                  }}
                >
                  <div class="row g-0">
                    <div class="col">
                      <img
                        src={require("../assets/gifs/emergency-call.gif")}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h3 class="card-title" style={{ color: "black" }}>
                          Emergency hotline
                        </h3>
                        <br></br>
                        <div class="d-grid gap-2">
                          <button class="btn btn-danger" type="button" onClick={contactAuthority}>
                            119
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="card-title"></h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>)}
        {thunder !== 0 && (<div
          className="card"
          style={{
            backgroundColor: "#F8FFF7",
            border: "1px solid #B3FF84",
            height: "400px",
          }}
        >
          <div className="card-header">
            <ul className="nav nav-tabs card-header-tabs">
              <li className="nav-item" style={{ width: "35rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab1")}
                  href="#tab1"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/warningAl.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />{" "}
                  {t("info")}
                </a>
              </li>
              <li className="nav-item" style={{ width: "44.5rem" }}>
                <a
                  className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                  onClick={() => handleTabClick("tab2")}
                  href="#tab2"
                  style={{ fontWeight: "bold", textAlign: "center" }}
                >
                  {" "}
                  <img
                    alt="Air quality"
                    src={require("../assets/images/help.jpg")}
                    class="rounded-circle"
                    style={{ width: "30px", height: "30px" }}
                  />
                  {t("help")}
                </a>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="tab-content">
              <div
                className={`tab-pane fade ${activeTab === "tab1" ? "show active" : ""
                  }`}
                id="tab1"
              >
                {/* <h5 className="card-title" style={{color:"black"}}>Tab 1 Content</h5> */}
                {/* <div className="row ">
                                      <div className='col'><center>
                                          <img alt="Air quality" src={require("../assets/images/flooded-house.png")} class="rounded-circle" style={{ width: '100px', height: '100px', alignItself: "center" }} />
                                      </center>
                                      </div>
                                      <div className='col' style={{ float: "right" }}>
  
                                      </div>
                                  </div> */}
                <div class="row ">
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-8">
                         
                          <LineChartExample/>
                        </div>
                       
                        
                      </div>
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div
                      class="card mb-3"
                      style={{
                        // width: "540px",
                        border: "none",
                        backgroundColor: "#F8FFF7",
                      }}
                    >
                      <div class="row g-0">
                      <div class="col-md-6">
                          <div class="card-body" style={{alignItems:"left"}}>
                            <h5 class="card-title" style={{ color: "black", fontWeight:"bold" }}>
                             {t("thunderstrom")}
                            </h5>

                            <p class="card-text" style={{ color: "black" }}>
                              Ratnapura, Sabaragamuwa, Sri Lanka
                            </p>
                            <span>
                              <i
                                class="bi bi-square"
                                style={{
                                  color: iconColor,
                                  background: iconColor,
                                }}
                              >
                                {riskLevel}
                              </i>
                            </span>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div>
                        {/* <div class="col-md-6">
                          <div class="card-body">
                            <h5 class="card-title" style={{ color: "black" }}>
                              Damage Estimation
                            </h5>
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                These are predicted values
                              </small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>Affected ares:</small>
                              </span>
                              <small> Ratnapura , Kegalle</small>
                            </p>
                            <p class="card-text" style={{ color: "black" }}>
                              <span
                                style={{ color: "black", fontWeight: "bold" }}
                              >
                                <small>No. of victims</small>
                              </span>{" "}
                              
                              <small>{thunder.victims} </small>
                            </p>
                           
                            <p class="card-text" style={{ color: "black" }}>
                              <small class="text-muted">
                                Last updated {requestTime}
                              </small>
                            </p>
                          </div>
                        </div> */}
                        
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className={`tab-pane fade ${activeTab === "tab2" ? "show active" : ""
                  }`}
                id="tab2"
              >
                <div
                  class="card mb-3"
                  style={{
                    width: "540px",
                    border: "none",
                    backgroundColor: "#F8FFF7",
                  }}
                >
                  <div class="row g-0">
                    <div class="col">
                      <img
                        src={require("../assets/gifs/emergency-call.gif")}
                        class="img-fluid rounded-start"
                        alt="..."
                      />
                    </div>
                    <div class="col-md-8">
                      <div class="card-body">
                        <h3 class="card-title" style={{ color: "black" }}>
                          Emergency hotline
                        </h3>
                        <br></br>
                        <div class="d-grid gap-2">
                          <button class="btn btn-danger" type="button" onClick={contactAuthority}>
                            119
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h5 className="card-title"></h5>
                <p className="card-text"></p>
              </div>
            </div>
          </div>
        </div>)}
        <Container
          style={{ backgroundColor: "#F8FFF7", border: "1px solid #B3FF84" }}
        >
     
          <br></br>

          <h3>{t("safety tips")}</h3>

          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col-md-3" style={{ paddingLeft: "30px" }}>
              {/* <div>
     
      <button type="button" class="btn btn-info btn-lg btn-block"  onClick={openModal} >FLOOD</button>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
     */}
             
                  <br></br>
                  
                  <div>
      <button class="btn btn-lg" style={{fontWeight:"bold",backgroundColor:"#B0E0E6"}} onClick={openfloodModal} onDoubleClick={closefloodModal}>{t("Flood Safety Tips")}</button>
      {isfloodModalOpen && (
       
          <div className="modalContainer_1">
          
            <div class="row row-cols-1 row-cols-md-3 g-4">
                      <div class="col" style={{ paddingLeft: "30px" }}>
                        <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>Pre flood guidance</p></div>
                          <div class="card-body">

                            <div>
                              {floodGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'pre' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        
                      </div>
                      <div class="col" style={{ paddingLeft: "30px" }}>
                    <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>DURING</p></div>
                          <div class="card-body">

                            <div>
                              {floodGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'during' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                      {/* {flood ===0 &&()} */}
                      <div class="col" style={{ paddingLeft: "30px" }}>
                   <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>POST</p></div>
                          <div class="card-body">

                            <div>
                              {floodGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'post' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                    </div>
            {/* <div className="footer">
              <button onDoubleClick={closefloodModal} id="cancelBtn">
                Cancel
              </button>
              
            </div> */}
          </div>
        
      )}
    </div>
               
            </div>
           
            <div class="col-md-3" style={{ paddingLeft: "30px" }}>
              {/* <div>
     
      <button type="button" class="btn btn-info btn-lg btn-block"  onClick={openModal} >FLOOD</button>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
     */}
             
                  <br></br>
                  
                  <div>
      <button class="btn btn-lg" style={{fontWeight:"bold",backgroundColor:"#98FB98"}} onClick={openLandModal} onDoubleClick={closeLandModal}>{t("Landslide Safety Tips")} </button>
      {isLandModalOpen && (
       
          <div className="modalContainer_2">
          
            {/* <div className="titleCloseBtn">
              <button onClick={closeLandModal}>X</button>
            </div> */}
            <div class="row row-cols-1 row-cols-md-3 g-4">
                      <div class="col" style={{ paddingLeft: "30px" }}>
                        <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>Pre flood guidance</p></div>
                          <div class="card-body">

                            <div>
                              {slideGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'pre' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        
                      </div>
                      <div class="col" style={{ paddingLeft: "30px" }}>
                    <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>DURING</p></div>
                          <div class="card-body">

                            <div>
                              {slideGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'during' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                      {/* {flood ===0 &&()} */}
                      <div class="col" style={{ paddingLeft: "30px" }}>
                   <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>POST</p></div>
                          <div class="card-body">

                            <div>
                              {slideGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'post' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                    </div>
            {/* <div className="footer">
              <button  onDoubleClick={closeModal} id="cancelBtn">
                Cancel
              </button>
              <button>Continue</button>
            </div> */}
          </div>
        
      )}
    </div>
               
            </div>
            <div class="col-md-3" style={{ paddingLeft: "20px" }}>
              {/* <div>
     
      <button type="button" class="btn btn-info btn-lg btn-block"  onClick={openModal} >FLOOD</button>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
     */}
             
                  <br></br>
                  
                  <div>
      <button class="btn btn-lg" style={{fontWeight:"bold",backgroundColor:"#FFDAB9"}} onClick={openStrongwindModal} onDoubleClick={closeStrongwindModal}>{t("Strongwind Safety Tips")}</button>
      {isStrongwindModalOpen && (
       
          <div className="modalContainer_3">
          
           
            <div class="row row-cols-1 row-cols-md-3 g-4">
                      <div class="col" style={{ paddingLeft: "30px" }}>
                        <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>Pre flood guidance</p></div>
                          <div class="card-body">

                            <div>
                              {windGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'pre' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        
                      </div>
                      <div class="col" style={{ paddingLeft: "30px" }}>
                    <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>DURING</p></div>
                          <div class="card-body">

                            <div>
                              {windGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'during' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                      {/* {flood ===0 &&()} */}
                      <div class="col" style={{ paddingLeft: "30px" }}>
                   <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>POST</p></div>
                          <div class="card-body">

                            <div>
                              {windGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'post' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                    </div>
            {/* <div className="footer">
              <button onClick={closeModal} id="cancelBtn">
                Cancel
              </button>
              <button>Continue</button>
            </div> */}
          </div>
        
      )}
    </div>
               
            </div>
            <div class="col-md-3" style={{ paddingLeft: "10px" }}>
              {/* <div>
     
      <button type="button" class="btn btn-info btn-lg btn-block"  onClick={openModal} >FLOOD</button>
      
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <h2>Modal Content</h2>
        <p>This is the content of the modal.</p>
        <button onClick={closeModal}>Close Modal</button>
      </Modal>
    </div>
     */}
             
                  <br></br>
                  
                  <div>
      <button class="btn btn-lg" style={{fontWeight:"bold",backgroundColor:"#E6E6FA"}} onClick={openThunderModal} onDoubleClick={closeThunderModal}>{t("Thunderstorm Safety Tips")}</button>
      {isThunderModalOpen && (
       
          <div className="modalContainer_3">
          
           
            <div class="row row-cols-1 row-cols-md-3 g-4">
                      <div class="col" style={{ paddingLeft: "30px" }}>
                        <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>Pre flood guidance</p></div>
                          <div class="card-body">

                            <div>
                              {thunderGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'pre' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        
                      </div>
                      <div class="col" style={{ paddingLeft: "30px" }}>
                    <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>DURING</p></div>
                          <div class="card-body">

                            <div>
                              {windGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'during' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                      {/* {flood ===0 &&()} */}
                      <div class="col" style={{ paddingLeft: "30px" }}>
                   <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>POST</p></div>
                          <div class="card-body">

                            <div>
                              {windGuidance.map((item, index) => (
                                <div key={index}>
                                  {item.moment === 'post' && (
                                    <ul style={{ color: "black" }}>
                                      {item.action.split(', ').map((point, index) => (
                                        <li key={index}>{point}</li>
                                      ))}
                                    </ul>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                      
                      </div>
                    </div>
            {/* <div className="footer">
              <button onClick={closeModal} id="cancelBtn">
                Cancel
              </button>
              <button>Continue</button>
            </div> */}
          </div>
        
      )}
    </div>
               
            </div>
          </div>
          <br></br>
        </Container>
        <br></br>
        <Container
          style={{ backgroundColor: "#F8FFF7", border: "1px solid #B3FF84" }}
        >
          <br></br>

          <h3>{t("Evacuation Routes and Shelter Sites")}</h3>
          <br></br>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "#B0E0E6",
                  color: "black",
                  border: "none",
                }}
              > <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>{t("flood")}</p></div>
                <div class="card-body">

                  <div>
                    <ul>
                      {emergencyflood.map(item => (
                        <li key={item.id}>
                          {item.location} {/* Replace with your location property */}

                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "#98FB98",
                  color: "black",
                  border: "none",
                }}
              > <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>{t("landslide")}</p></div>
                <div class="card-body">

                  <div>
                    <ul>
                      {emergencyslide.map(item => (
                        <li key={item.id}>
                          {item.location} {/* Replace with your location property */}

                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
            {/* {flood ===0 &&()} */}
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "#FFDAB9",
                  color: "black",
                  border: "none",
                }}
              > <div class="card-header"><p style={{ fontWeight: "bold", textAlign: "center" }}>{t("strongwind")}</p></div>
                <div class="card-body">

                  <div>
                    <ul>
                      {emergencywind.map(item => (
                        <li key={item.id}>
                          {item.location} {/* Replace with your location property */}

                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>
          <br></br>
          <LoadScript googleMapsApiKey="AIzaSyAPzE4mVkfq0GwPTHPnlwxlnrKkXqXjmQ8">
            <GoogleMap
              mapContainerStyle={containerStyle}
              center={center}
              zoom={9}
            >
              {/* <Marker
                  position={place}
                  clickable={true}
                  draggable={true}
                ></Marker> */}
              <MarkerClusterer options={{ imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }}>
                {(clusterer) =>
                  emergencyflood.map((place, index) => (
                    <Marker key={index}
                      position={{ lat: place.latitude, lng: place.longitude }}
                      clusterer={clusterer}
                      clickable={true}
                      onClick={() => setSelectedMarker(place)}
                    >
                      {selectedMarker === place && (
                        <InfoWindow onCloseClick={() => setSelectedMarker(null)}>
                          <div>
                            <p style={{ fontWeight: "bold" }}>{place.location}</p>
                            <ul>
                              <li style={{ color: "blue" }}>Flood</li>
                            </ul>

                          </div>
                        </InfoWindow>
                      )}
                    </Marker>

                  ))
                }
              </MarkerClusterer>
              <MarkerClusterer options={{ imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }}>
                {(clusterer) =>
                  emergencyslide.map((place, index) => (
                    <Marker key={index}
                      position={{ lat: place.latitude, lng: place.longitude }}
                      clusterer={clusterer}
                      clickable={true}
                      onClick={() => setSelectedMarkerslide(place)}
                    >
                      {selectedMarkerslide === place && (
                        <InfoWindow onCloseClick={() => setSelectedMarkerslide(null)}>
                          <div>
                            <p style={{ fontWeight: "bold" }}>{place.location}</p>
                            <ul>
                              <li style={{ color: "blue" }}>Landslide</li>
                            </ul>

                          </div>
                        </InfoWindow>
                      )}
                    </Marker>

                  ))
                }
              </MarkerClusterer>
              <MarkerClusterer options={{ imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' }}>
                {(clusterer) =>
                  emergencywind.map((place, index) => (
                    <Marker key={index}
                      position={{ lat: place.latitude, lng: place.longitude }}
                      clusterer={clusterer}
                      clickable={true}
                      onClick={() => setSelectedwind(place)}
                    >
                      {selectedwind === place && (
                        <InfoWindow onCloseClick={() => setSelectedwind(null)}>
                          <div>
                            <p style={{ fontWeight: "bold" }}>{place.location}</p>
                            <ul>
                              <li style={{ color: "blue" }}>Strongwind</li>
                            </ul>

                          </div>
                        </InfoWindow>
                      )}
                    </Marker>

                  ))
                }
              </MarkerClusterer>
              {/* {emergencyflood.map(item=>(
                  <Marker key= {item.id}
                  position={{lat:parseFloat(item.latitude),lng:parseFloat(item.longitude)}}></Marker>
                ))} */}

              {/* Child components, such as markers, info windows, etc. */}
              <></>
            </GoogleMap>
          </LoadScript>
        </Container>
      </Container>
      <Footer></Footer>
    </div>
  );


}

export default Checkwarning;
