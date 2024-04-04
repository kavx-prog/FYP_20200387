import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function FloodTips() {

  const { t } = useTranslation();

  return (
    <div>
       <Header></Header>
      <br></br>
      <Container>
        <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
          {t("tips_and_tricks")}
            <img
              src={require("../assets/images/bulb.png")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
          <br></br>
          <ul class="nav nav-tabs" style={{ borderColor: "#B3FF84" }}>
            <li class="nav-item" style={{ borderColor: "#B3FF84" }}>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                  backgroundColor: "#E9FFE7",
                }}
                to="/floodtips"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/circleFlood.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Floods
              </Link>
            </li>
            <li class="nav-item">
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                }}
                to="/cyclonetips"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/circleCyclone.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Cyclone
              </Link>
            </li>
            <li class="nav-item">
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                }}
                to="/landslidetips"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/circleLand.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                LandSlides
              </Link>
            </li>
            <li
              class="nav-item"
              style={{
                backgroundColor: "#E9FFE7",
                borderBottom: "0px",
                // borderBottomColor: "#E9FFE7",
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                }}
                to="/thunder"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/circleThunder.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                {t("Thunderstorm")}
              </Link>
            </li>
          </ul>
          <Container
            style={{ backgroundColor: "#E9FFE7", borderColor: "#B3FF84" }}
          >
            <br></br>
            <h2>Flood Safety Tips</h2>

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
                  <img
                    src={require("../assets/images/phoneAlert.jpg")}
                    class="card-img-top"
                    alt="noWash"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      Monitor local weather updates and pay attention to flood
                      warnings issued by the authorities.
                    </h5>
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
                  <img
                    src={require("../assets/images/emergencyKit.jpg")}
                    class="card-img-top"
                    alt="noPhone"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      Put together an emergency kit containing essential items
                      such as non-perishable food, water, flashlights,
                      batteries, a first aid kit, important documents, and a
                      portable battery-powered radio
                    </h5>
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
                  <img
                    src={require("../assets/images/safeguardHome.jpg")}
                    class="card-img-top"
                    alt="noFloor"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      Elevate electrical switches, sockets, and appliances above
                      anticipated flood levels. Move valuable items, furniture,
                      and electrical equipment to higher floors or elevated
                      areas.
                    </h5>
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
                  <img
                    src={require("../assets/images/shelters.jpg")}
                    class="card-img-top"
                    alt="noTree"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      If authorities issue evacuation orders, follow them
                      immediately. Evacuate to higher ground or designated
                      shelters.
                    </h5>
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
                  <img
                    src={require("../assets/images/food.jpg")}
                    class="card-img-top"
                    alt="noBike"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      Do not consume food or water that has come into contact
                      with floodwaters, as it may be contaminated. Use bottled
                      water for drinking and cooking, or boil water before use.
                    </h5>
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
                  <img
                    src={require("../assets/images/return.jpg")}
                    class="card-img-top"
                    alt="noPhone"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      Wait for authorities to declare it safe to return home
                      after a flood. Be cautious of damaged infrastructure,
                      weakened structures, or live electrical wires.
                    </h5>
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
                  <img
                    src={require("../assets/images/damagehome.jpg")}
                    class="card-img-top"
                    alt="noPhone"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      Inspect your home for any structural damage caused by the
                      flood.
                    </h5>
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
                  <img
                    src={require("../assets/images/authorities.jpg")}
                    class="card-img-top"
                    alt="noPhone"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title">
                      Report any damages or hazards to the relevant authorities,
                      such as the local disaster management center or
                      municipality.
                    </h5>
                  </div>
                </div>
              </div>
            </div>

            <br></br>
            <h2>Flood Types</h2>
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
                      <h5 class="card-title">Monsoonal Floods</h5>
                    </center>
                    <p>
                      Sri Lanka is influenced by the southwest and northeast
                      monsoons, resulting in heavy rainfall during specific
                      seasons. Monsoonal floods occur when these seasonal
                      monsoons bring excessive rainfall, causing rivers,
                      streams, and reservoirs to overflow.
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
                    src={require("../assets/images/sideflash.gif")}
                    class="card-img-top"
                    alt="sideflash"
                  ></img> */}
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Flash Floods</h5>
                    </center>
                    <p>
                      Flash floods occur suddenly and are characterized by a
                      rapid rise in water levels within a short period. They are
                      typically caused by intense rainfall, often associated
                      with thunderstorms or heavy downpours. Flash floods can be
                      highly destructive and occur in both urban and rural
                      areas.
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
                    src={require("../assets/images/ground.gif")}
                    class="card-img-top"
                    alt="ground"
                  ></img> */}
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Riverine Floods</h5>
                    </center>
                    <p>
                      Riverine floods happen when rivers and their tributaries
                      overflow their banks due to heavy rainfall or the
                      accumulation of water from upstream areas. Riverine floods
                      are common in Sri Lanka, parti cularly in low-lying
                      regions, and can result in prolonged inundation.
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
                    src={require("../assets/images/conduction.gif")}
                    class="card-img-top"
                    alt="conduction"
                  ></img> */}
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">
                        Coastal and Tsunami-Related Floods
                      </h5>
                    </center>
                    <p>
                      Sri Lanka has a long coastline, and coastal areas can be
                      susceptible to flooding. High tides, storm surges, and
                      tsunamis caused by seismic activities can result in
                      coastal flooding, leading to significant damage in coastal
                      communities.
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
                      <h5 class="card-title">Urban Flooding</h5>
                    </center>
                    <p>
                      Rapid urbanization and inadequate drainage systems in some
                      areas of Sri Lanka can lead to urban flooding. When
                      rainwater cannot be efficiently drained due to poorly
                      designed or clogged drainage systems, it can accumulate in
                      streets, neighborhoods, and urban areas, causing flooding.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
          </Container>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default FloodTips;
