import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

import axios from "axios";
import GaugeChart from "react-gauge-chart";
import "../assets/styles/hexagon.css";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Header from "./Header";
import Footer from "./Footer";
const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 7.8731,
  lng: 80.7718,
};

function AQIMap() {
  const { t, i18n } = useTranslation();


  var [lat, setLatitude] = useState();
  var [longi, setLongitude] = useState();
  var [airqualitydata, setAirQualityData] = useState();
  const [activeTab, setActiveTab] = useState("tab1");
  const [subactiveTab, setSubActiveTab] = useState("tab3");
  var [datetime, setDateTime] = useState();
  var [date, setDate] = useState();

  const [baqi, setBaqi] = useState({});
  const [fraAtmo, setFraAtmo] = useState({});
  const [pollutants, setPollutants] = useState({});
  const [co, setCO] = useState({});
  const [o3, setO3] = useState({});
  const [pm10, setPM10] = useState({});
  const [pm25, setPM25] = useState({});
  const [so2, setSO2] = useState({});
  const [no, setNo] = useState({});
  const [healthRecommendations, setHealthRecommendations] = useState({});

  var value = 0; // The value to indicate on the gauge
  const min = 0; // The minimum value of the gauge
  const max = 500; // The maximum value of the gauge
  var percent = (value - min) / (max - min);
  const [indexes, setIndexes] = useState({});

  const gaugeData = [
    { value: 0.1, label: "0-50", color: "#71FC30" },
    { value: 0.1, label: "50-100", color: "#FBFF41" },
    { value: 0.1, label: "100-150", color: "#FF784E" },
    { value: 0.1, label: "150-200", color: "#FF0101" },
    { value: 0.2, label: "200-300", color: "#7C05A6" },
    { value: 0.4, label: "300-500", color: "#831717" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleSubTabClick = (tab) => {
    setSubActiveTab(tab);
  };

  const getCoordinates = (event) => {
    var clickedLatitude = event.latLng.lat();
    var clickedLongitude = event.latLng.lng();

    const decimalPlaces = 10;
    lat = clickedLatitude.toString(decimalPlaces);
    longi = clickedLongitude.toString(decimalPlaces);

    setLatitude(lat);
    setLongitude(longi);
    axios
      .get(`http://127.0.0.1:8000/process-aqi/${lat}/${longi}/`)
      .then((res) => {
        setAirQualityData(res.data.data);
        setDateTime(airqualitydata.datetime);

        setIndexes(airqualitydata.indexes);

        setBaqi(airqualitydata.indexes.baqi);


        setFraAtmo(airqualitydata.indexes.fra_atmo);
        setPollutants(airqualitydata.pollutants);
        setNo(airqualitydata.pollutants.co.concentration);
        setCO(airqualitydata.pollutants.no2.concentration);
        setO3(airqualitydata.pollutants.o3.concentration);
        setPM10(airqualitydata.pollutants.pm10.concentration);
        setPM25(airqualitydata.pollutants.pm25.concentration);
        setSO2(airqualitydata.pollutants.so2.concentration);
        setHealthRecommendations(airqualitydata.health_recommendations);
        console.log(airqualitydata);
        console.log(airqualitydata.datetime);
        console.log(airqualitydata.pollutants.co.concentration);

        // datetime= datetime.toLocaleDateString('en-GB')
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  // useEffect (()=>{
  //   function getAqiData(){
  //     axios.get(`http://127.0.0.1:8000/process-aqi/${lat}/${longi}/`)
  //     .then((res)=>{

  //       setAirQualityData(res);

  //     }).catch((err)=>{
  //       alert(err.message)
  //     });

  //   }getAqiData();
  //   // console.log(res.data.data.datetime);
  //   //     console.log(res.data.data.pollutants);
  //       console.log(airqualitydata);
  // },[lat,longi])

  return (
    <div>
    <Header></Header>
    <br></br>
      <Container
        style={{ backgroundColor: "white", border: "solid 1px #B3FF84" }}
      >
        <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            {t("air quality tracker")}
            <img
              src={require("../assets/images/air.png")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
        </div>

        <div className="row">
          <div className="col">
            <div
              className="card"
              style={{
                width: "40rem",
                backgroundColor: "#F8FFF7",
                border: "1px solid #B3FF84",
                height: "400px",
              }}
            >
              <div className="card-header">
                <ul
                  className="nav nav-tabs card-header-tabs"
                  style={{
                    backgroundColor: "#F8FFF7",
                    border: "1px solid #B3FF84",
                  }}
                >
                  <li className="nav-item" style={{ width: "20rem" }}>
                    <a
                      className={`nav-link ${activeTab === "tab1" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("tab1")}
                      href="#tab1"
                    >
                      <img
                        alt="Air quality"
                        src={require("../assets/images/air-pollution.png")}
                        class="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />{" "}
                      {t("air quality")}
                    </a>
                  </li>
                  <li className="nav-item" style={{ width: "18.8rem" }}>
                    <a
                      className={`nav-link ${activeTab === "tab2" ? "active" : ""
                        }`}
                      onClick={() => handleTabClick("tab2")}
                      href="#tab2"
                    >
                      <img
                        alt="Air quality"
                        src={require("../assets/images/stethoscope.png")}
                        class="rounded-circle"
                        style={{ width: "30px", height: "30px" }}
                      />{" "}
                      {t("health tips")}
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
                    <h5
                      className="card-title"
                      style={{
                        color: "black",
                      }}
                    >
                      {t("air quality at this time")}
                    </h5>
                    <p style={{ color: "black" }}>{datetime}</p>
                    <div className="row">
                      <div className="col">
                        <p style={{ color: "black" }}>{baqi.category}</p>
                      </div>
                      <div className="col" style={{ textAlign: "center" }}>
                        <p style={{ color: "black" }}>{baqi.aqi}</p>
                      </div>
                    </div>
                    {/* {indexes.map((data)=>{
                            return(
                              <p>{data.baqi.category}</p>
                            )
                           })}
                           
                            */}
                    { }
                    {(percent = baqi.aqi)}
                    {(percent = (percent - min) / (max - min))}
                    <div
                      style={{
                        width: "250px",
                        display: "block",
                        alignContent: "center",
                        alignItems: "center",
                        alignSelf: "center",
                      }}
                    >
                      <GaugeChart
                        id="gauge-chart"
                        nrOfLevels={6}
                        arcPadding={0}
                        cornerRadius={3}
                        percent={percent}
                        textColor="#333"
                        needleColor="#333"
                        colors={gaugeData.map((data) => data.color)}
                        arcLabels={gaugeData.map((data) => ({
                          text: data.label,
                          color: "#333",
                        }))}
                        hideText={true}
                      />
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade ${activeTab === "tab2" ? "show active" : ""
                      }`}
                    id="tab2"
                  >
                    <h5 className="card-title" style={{ color: "black" }}>
                      Planet Watch Health Tips
                    </h5>

                    <div
                      className="card"
                      style={{
                        backgroundColor: "#F8FFF7",
                        border: "1px solid #B3FF84",
                      }}
                    >
                      <div className="card-header">
                        <ul
                          className="nav nav-tabs card-header-tabs"
                          style={{ backgroundColor: "#F8FFF7" }}
                        >
                          <li className="nav-item">
                            <a
                              className={`nav-link ${subactiveTab === "tab3" ? "active" : ""
                                }`}
                              onClick={() => handleSubTabClick("tab3")}
                              href="#tab3"
                            >
                              <img
                                alt="Air quality"
                                src={require("../assets/images/general.png")}
                                class="rounded-circle"
                                style={{ width: "30px", height: "30px" }}
                              />
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${subactiveTab === "tab4" ? "active" : ""
                                }`}
                              onClick={() => handleSubTabClick("tab4")}
                              href="#tab4"
                            >
                              <img
                                alt="Air quality"
                                src={require("../assets/images/inhaler.png")}
                                class="rounded-circle"
                                style={{ width: "30px", height: "30px" }}
                              />
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${subactiveTab === "tab5" ? "active" : ""
                                }`}
                              onClick={() => handleSubTabClick("tab5")}
                              href="#tab5"
                            >
                              <img
                                alt="Air quality"
                                src={require("../assets/images/children.png")}
                                class="rounded-circle"
                                style={{ width: "30px", height: "30px" }}
                              />
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className={`nav-link ${subactiveTab === "tab6" ? "active" : ""
                                }`}
                              onClick={() => handleSubTabClick("tab6")}
                              href="#tab6"
                            >
                              <img
                                alt="Air quality"
                                src={require("../assets/images/couple.png")}
                                class="rounded-circle"
                                style={{ width: "30px", height: "30px" }}
                              />
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div className="card-body">
                        <div className="tab-content">
                          <div
                            className={`tab-pane fade ${subactiveTab === "tab3" ? "show active" : ""
                              }`}
                            id="tab3"
                          >
                            <p className="card-text" style={{ color: "black" }}>
                              {healthRecommendations.general_population}
                            </p>
                          </div>
                        </div>

                        <div className="tab-content">
                          <div
                            className={`tab-pane fade ${subactiveTab === "tab4" ? "show active" : ""
                              }`}
                            id="tab4"
                          >
                            <p className="card-text" style={{ color: "black" }}>
                              {healthRecommendations.lung_diseases}
                            </p>
                            <p className="card-text" style={{ color: "black" }}>
                              {healthRecommendations.heart_diseases}
                            </p>
                          </div>
                        </div>
                        <div className="tab-content">
                          <div
                            className={`tab-pane fade ${subactiveTab === "tab5" ? "show active" : ""
                              }`}
                            id="tab5"
                          >
                            <p className="card-text" style={{ color: "black" }}>
                              {healthRecommendations.children}
                            </p>
                          </div>
                        </div>
                        <div className="tab-content">
                          <div
                            className={`tab-pane fade ${subactiveTab === "tab6" ? "show active" : ""
                              }`}
                            id="tab6"
                          >
                            <p className="card-text" style={{ color: "black" }}>
                              {healthRecommendations.elderly}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <LoadScript googleMapsApiKey="AIzaSyAPzE4mVkfq0GwPTHPnlwxlnrKkXqXjmQ8">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={7}
              >
                <Marker
                  position={center}
                  clickable={true}
                  draggable={true}
                  onDragEnd={getCoordinates}
                ></Marker>
                {/* Child components, such as markers, info windows, etc. */}
                <></>
              </GoogleMap>
            </LoadScript>
          </div>
        </div>
        <br></br>
        <Container
          style={{ backgroundColor: "#F8FFF7", border: "solid 1px #B3FF84" }}
        >
          <br></br>
          <h5>{t("pollutants")}</h5>

          <div class="row row-cols-1 row-cols-md-3 g-4">
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "white",
                  color: "black",
                  height: "100%",
                }}
              >
                {/* <img
                    src={require("../assets/images/direct.gif")}
                    class="card-img-top"
                    alt="direct"
                  ></img> */}
                <div class="card-body">
                  <center>
                    {/* <div className="hexagon-content" style={{ alignContent: "center" }}>
                      <div className="hexagon-text" style={{ alignItems: "center" }}>
                        <p
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                            textAlign: "center"
                          }}
                        >
                          CO </p></div>
                      <br></br>
                      <div style={{ alignItems: "center" }}>
                        <p style={{ textAlign: "center" }}>{co.value} {co.units}
                        </p>

                        <br></br>




                      </div>
                    </div> */}
                    {/* <div className="hexagon-content"> */}
                      {/* <span className="hexagon-text"> */}
                      {/* <p className="hexagon-text"
                        style={{
                          fontSize: "30px",
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        CO <br></br>
                        {co.value} {co.units}
                      </p>
                      <br></br>


                      */}

                      {/* </span> */}
                    
                    <div className="hexagon-content">
                      <span className="hexagon-text">
                        {/* <p
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        > */}
                          CO
                        {/* </p> */}
                        <br></br>
                        {co.value} {co.units}
                      </span>
                    </div>                   
                    <p style={{ textAlign: "justify" }}>
                      {t("Typically originates from incomplete combustion of carbon fuels, such as that which occurs in car engines and power plants")}
                    </p>
                  </center>
                </div>
              </div>
            </div>
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "white",
                  color: "black",
                  height: "100%",
                }}
              >
                {/* <img
                    src={require("../assets/images/sideflash.gif")}
                    class="card-img-top"
                    alt="sideflash"
                  ></img> */}
                <div class="card-body">
                  <center>
                    <div className="hexagon-content">
                      <span className="hexagon-text">
                        {/* <p
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        > */}
                          NO2
                        {/* </p> */}
                        <br></br>
                        {no.value} {no.units}
                      </span>
                    </div>
                    <p style={{ textAlign: "justify" }}>
                      {t("Main")}
                    </p>
                  </center>
                </div>
              </div>
            </div>
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "white",
                  color: "black",
                  height: "100%",
                }}
              >
                {/* <img
                    src={require("../assets/images/ground.gif")}
                    class="card-img-top"
                    alt="ground"
                  ></img> */}
                <div class="card-body">
                  <center>
                    <div className="hexagon-content">
                      <span className="hexagon-text">
                        {/* <p
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        > */}
                          O3
                        {/* </p> */}
                        <br></br>
                        {o3.value} {o3.units}
                      </span>
                    </div>
                    <p style={{ textAlign: "justify" }}>
                      {t("Ozone")}
                    </p>
                  </center>
                </div>
              </div>
            </div>
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "white",
                  color: "black",
                  height: "100%",
                }}
              >
                {/* <img
                    src={require("../assets/images/conduction.gif")}
                    class="card-img-top"
                    alt="conduction"
                  ></img> */}
                <div class="card-body">
                  <center>
                  <div className="hexagon-content">
                      <div className="hexagon-text">
                        {/* <p
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        > */}
                          PM10
                        {/* </p> */}
                        <br></br>
                        {pm10.value} {pm10.units}
                      </div>
                    </div> </center>
                    <p style={{ textAlign: "justify" }}>
                      {t("Main sources")}
                    </p>
                 
                </div>
              </div>
            </div>
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "white",
                  color: "black",
                  height: "100%",
                }}
              >
                {/* <img
                    src={require("../assets/images/streamer.gif")}
                    class="card-img-top"
                    alt="..."
                  ></img> */}
                <div class="card-body">
                  <center>
                    <div className="hexagon-content">
                      <span className="hexagon-text">
                        {/* <p
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        > */}
                          PM25
                        {/* </p> */}
                        <br></br>
                        {pm25.value} {pm25.units}
                      </span>
                    </div>
                    <p style={{ textAlign: "justify" }}>
                      {t("Main sources are combustion processes")}
                    </p>
                  </center>
                </div>
              </div>
            </div>
            <div class="col" style={{ paddingLeft: "30px" }}>
              <div
                class="card"
                style={{
                  width: "20rem",
                  backgroundColor: "white",
                  color: "black",
                  height: "100%",
                }}
              >
                {/* <img
                    src={require("../assets/images/streamer.gif")}
                    class="card-img-top"
                    alt="..."
                  ></img> */}
                <div class="card-body">
                  <center>
                    <div className="hexagon-content">
                      <span className="hexagon-text">
                        {/* <p
                          style={{
                            fontSize: "30px",
                            fontWeight: "bold",
                            color: "black",
                          }}
                        > */}
                          SO2
                        {/* </p> */}
                        <br></br>
                        {so2.value} {so2.units}
                      </span>
                    </div>
                    <p style={{ textAlign: "justify" }}>
                     {t("sulfur-containing")}
                    </p>
                  </center>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default AQIMap;
