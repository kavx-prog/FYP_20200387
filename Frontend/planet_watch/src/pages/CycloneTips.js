import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function CycloneTips() {

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
                  backgroundColor: "#E9FFE7",
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
            <h2>Cyclone Safety Tips</h2>
            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              Before the Cyclone:
            </p>

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
                    src={require("../assets/images/tv.jpg")}
                    class="card-img-top"
                    alt="Stay informed"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Stay informed</h5>
                    </center>
                    <p>
                      Monitor weather forecasts, warnings, and updates from
                      reliable sources. Pay attention to the cyclone's projected
                      path, intensity, and estimated time of arrival.
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
                  <img
                    src={require("../assets/images/emerKit.jpg")}
                    class="card-img-top"
                    alt="Emergency kit"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Emergency kit</h5>
                    </center>
                    <p>
                      Prepare an emergency kit with essential supplies,
                      including non-perishable food, drinking water, a first aid
                      kit, flashlight, batteries, a battery-powered or
                      hand-crank radio, necessary medications, and important
                      documents in a waterproof container.
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
                  <img
                    src={require("../assets/images/safety.jpg")}
                    class="card-img-top"
                    alt="Evacuation plan:"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Evacuation plan:</h5>
                    </center>
                    <p>
                      Familiarize yourself with evacuation routes, shelters, and
                      the evacuation plan of your area. Determine where you
                      would go if you need to evacuate, and plan for your pets
                      as well.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <br></br>

            <p style={{ fontSize: "20px", fontWeight: "bold" }}>
              During the Cyclone:
            </p>
            <br></br>
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
                    src={require("../assets/images/shelter.jpg")}
                    class="card-img-top"
                    alt="Shelter"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Shelter</h5>
                    </center>
                    <p>
                      Seek shelter indoors well before the cyclone arrives. Move
                      to a small, windowless interior room on the lowest level
                      of your home. If possible, use mattresses or heavy
                      furniture to create a physical barrier for added
                      protection.
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
                  <img
                    src={require("../assets/images/stayaway.jpg")}
                    class="card-img-top"
                    alt="Stay away from windows:"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Stay away from windows:</h5>
                    </center>
                    <p>
                      Avoid being near windows, glass doors, or skylights during
                      the cyclone. They can shatter due to high winds and flying
                      debris, posing a significant risk of injury.
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
                  <img
                    src={require("../assets/images/turnoff.jpg")}
                    class="card-img-top"
                    alt="Power and utilities"
                    style={{ height: "55%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Power and utilities</h5>
                    </center>
                    <p>
                      Turn off electricity, gas, and water supplies if advised
                      to do so. Unplug appliances to protect them from power
                      surges once the cyclone passes.
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
                  <img
                    src={require("../assets/images/connected.jpg")}
                    class="card-img-top"
                    alt="Stay connected"
                    style={{ height: "55%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Stay connected</h5>
                    </center>
                    <p>
                      Keep your mobile phone charged and have a backup power
                      source available. Use it sparingly to conserve battery
                      life and stay connected with loved ones or emergency
                      services.
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

export default CycloneTips;
