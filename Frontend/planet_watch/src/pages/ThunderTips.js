import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function ThunderTips() {
  const { t } = useTranslation();

  return (
    <div>
      <Header></Header>
      <br></br>
      <Container>
        <div className="p-3 mb-2 bg-white text-dark">
          <h1
            style={{
              fontFamily: "Montserrat",
              textTransform: "uppercase",
            }}
          >
            {t("tips_and_tricks")}
            <img
              src={require("../assets/images/bulb.png")}
              height={"80px"}
              style={{ float: "right" }}
              alt="bulb"
            />
          </h1>
          <br />
          <ul className="nav nav-tabs" style={{ borderColor: "#B3FF84" }}>
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
                  backgroundColor: "#E9FFE7",
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
            <br />
            <h2>{t("Thunderstorm_st")}</h2>

            <Row xs={1} md={3} className="g-4">
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
                    src={require("../assets/images/noWash.png")}
                    class="card-img-top"
                    alt="noWash"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title" style={{ textAlign: "justify" }}>
                      {t("l1")}
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
                    src={require("../assets/images/noPhone.png")}
                    class="card-img-top"
                    alt="noPhone"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title" style={{ textAlign: "justify" }}>
                      {t("l2")}
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
                    src={require("../assets/images/noFloor.png")}
                    class="card-img-top"
                    alt="noFloor"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title" style={{ textAlign: "justify" }}>
                      {t("l3")}
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
                    src={require("../assets/images/noTree.png")}
                    class="card-img-top"
                    alt="noTree"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title" style={{ textAlign: "justify" }}>
                      {t("l4")}
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
                    src={require("../assets/images/noBike.png")}
                    class="card-img-top"
                    alt="noBike"
                  ></img>
                  <div class="card-body">
                    <h5 class="card-title" style={{ textAlign: "justify" }}>
                      {t("l5")}
                    </h5>
                  </div>
                </div>
              </div>
            </Row>

            <br />
            <h2>{t("Lightning_t_W")}</h2>
            <Row xs={1} md={3} className="g-4">
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
                    src={require("../assets/images/direct.gif")}
                    class="card-img-top"
                    alt="direct"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ textAlign: "center" }}>
                        Direct Strike
                      </h5>
                    </center>
                    <p>{t("l6")}</p>
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
                    src={require("../assets/images/sideflash.gif")}
                    class="card-img-top"
                    alt="sideflash"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ textAlign: "center" }}>
                        Side Flash
                      </h5>
                    </center>
                    <p>{t("l7")}</p>
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
                    src={require("../assets/images/ground.gif")}
                    class="card-img-top"
                    alt="ground"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ textAlign: "center" }}>
                        Ground Current
                      </h5>
                    </center>
                    <p>{t("l8")}</p>
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
                    src={require("../assets/images/conduction.gif")}
                    class="card-img-top"
                    alt="conduction"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ textAlign: "center" }}>
                        Conduction
                      </h5>
                    </center>
                    <p>{t("l9")}</p>
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
                    src={require("../assets/images/streamer.gif")}
                    class="card-img-top"
                    alt="..."
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ textAlign: "center" }}>
                        Streamer
                      </h5>
                    </center>
                    <p>{t("l10")}</p>
                  </div>
                </div>
              </div>
            </Row>

            <br />
          </Container>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default ThunderTips;
