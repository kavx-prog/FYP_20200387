import React from "react";
import { Container } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function TipsTricks() {
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
              <a
                class="nav-link active"
                aria-current="page"
                href="/floodtips"
                style={{ fontSize: "20px", borderColor: "#B3FF84" }}
              >
                <img
                  src={require("../assets/images/circleFlood.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Floods
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#"
                style={{ fontSize: "20px", borderColor: "#B3FF84" }}
              >
                <img
                  src={require("../assets/images/circleCyclone.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Cyclone
              </a>
            </li>
            <li class="nav-item">
              <a
                class="nav-link active"
                aria-current="page"
                href="#"
                style={{ fontSize: "20px", borderColor: "#B3FF84" }}
              >
                <img
                  src={require("../assets/images/circleLand.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                LandSlides
              </a>
            </li>
            <li class="nav-item" style={{ backgroundColor: "#E9FFE7" }}>
              <a
                class="nav-link active"
                aria-current="page"
                href="/thunder"
                style={{
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                  // backgroundColor: "#E9FFE7",
                }}
              >
                <img
                  src={require("../assets/images/circleThunder.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                {t("Thunderstorm")}
              </a>
            </li>
          </ul>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default TipsTricks;
