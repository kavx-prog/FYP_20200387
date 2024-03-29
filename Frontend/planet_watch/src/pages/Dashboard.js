import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Link, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";

function Dashboard() {
  const navigate = useNavigate();
  const [firstTimeLogin, setFirstTimeLogin] = useState();

  // multi language handlers
  const { t, i18n } = useTranslation();
  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  const currentLanguage = i18n.language;

  // console.log(currentLanguage);
  function checkLog() {
    const isFirstTime = localStorage.getItem("firstTimeLogin");
    // If it's the first time login, set a flag in localStorage.
    if (isFirstTime === null) {
      setFirstTimeLogin(false);
      console.log(firstTimeLogin);
    } else {
      setFirstTimeLogin(true);
    }
    navigate("/checkaccup");
  }
  useEffect(() => {
    // Check if this is the user's first login based on some condition (e.g., using localStorage).
    // Ensure it's a boolean

    const isFirstTime = localStorage.getItem("firstTimeLogin");
    // If it's the first time login, set a flag in localStorage.
    if (isFirstTime === null) {
      setFirstTimeLogin(false);
      console.log(firstTimeLogin);
    } else {
      setFirstTimeLogin(true);
    }
  }, []);
  // const checkStatus = ()=>{
  //     // Check if this is the user's first login based on some condition (e.g., using localStorage).
  //   const isFirstTime = localStorage.getItem('firstTimeLogin');
  //   setFirstTimeLogin(isFirstTime);
  //   console.log(isFirstTime)
  //   console.log(firstTimeLogin)
  //   // If it's the first time login, set a flag in localStorage.
  //   // if (firstTimeLogin === null) {
  //   localStorage.setItem('firstTimeLogin', 'true');
  //   // }
  // }

  return (
    <div>
      <Header></Header>
      <Container style={{ paddingTop: "20px" }}>
        <div class="p-3 mb-2 bg-white text-dark">
          <Row className="d-flex justify-content-center mb-3">
            <Col className="mb-3" md={4}>
              <Button
                variant={
                  currentLanguage === "en" ? "success" : "outline-success"
                }
                onClick={() => changeLanguage("en")}
                style={{ width: "50vh" }}
              >
                English
              </Button>
            </Col>
            <Col className="mb-3" md={4}>
              <Button
                variant={
                  currentLanguage === "sl" ? "success" : "outline-success"
                }
                onClick={() => changeLanguage("sl")}
                style={{ width: "50vh" }}
              >
                සිංහල
              </Button>
            </Col>
            {/* <Col className="mb-3" md={4}>
              <Button onClick={checkLog}>
                Set up your account
              </Button>
            </Col> */}
          </Row>
          <h3
            style={{
              fontFamily: "Montserrat",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {t("services")}
          </h3>
          <p>{t("stay_informed_main_dashboard")}</p>
          <br></br>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            {/* alert */}
            <Link to="/warnings" style={{ textDecoration: "none" }}>
              <div class="col" style={{ paddingLeft: "30px", height: "100%" }}>
                <div
                  class="card shadow"
                  style={{
                    width: "20rem",
                    backgroundColor: "white",
                    color: "black",
                    height: "15rem",
                  }}
                >
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">{t("alert")}</h5>
                      <img
                        src={require("../assets/images/alert.png")}
                        class="card-img-top"
                        alt="Alerts"
                        style={{ width: "50%" }}
                      ></img>
                    </center>
                  </div>
                </div>
              </div>
            </Link>
            {/* tips */}
            <Link to="/floodtips" style={{ textDecoration: "none" }}>
              <div class="col" style={{ paddingLeft: "30px", height: "100%" }}>
                <div
                  class="card shadow"
                  style={{
                    width: "20rem",
                    backgroundColor: "white",
                    color: "black",
                    height: "15rem",
                  }}
                >
                  <div class="card-body">
                    <center>
                      <h5 class="card-title"> {t("tips_and_tricks")}</h5>
                      <img
                        src={require("../assets/images/bulb.png")}
                        class="card-img-top"
                        alt="Alerts"
                        style={{ width: "50%" }}
                      ></img>
                    </center>
                  </div>
                </div>
              </div>
            </Link>
            {/* emergency notification */}
            <Link to="/authority" style={{ textDecoration: "none" }}>
              <div class="col" style={{ paddingLeft: "30px", height: "100%" }}>
                <div
                  class="card shadow"
                  style={{
                    width: "20rem",
                    backgroundColor: "white",
                    color: "black",
                    height: "100%",
                  }}
                >
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">
                        {" "}
                        {t("Emergency Notification Management")}
                      </h5>
                      <img
                        src={require("../assets/images/call119.png")}
                        class="card-img-top"
                        alt="Alerts"
                        style={{ width: "40%" }}
                      ></img>
                    </center>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <br></br>

          <h3
            style={{
              fontFamily: "Montserrat",
              textTransform: "uppercase",
              fontWeight: "bold",
            }}
          >
            {t("tools")}
          </h3>
          <p>{t("Stay_aware_of_air_quality_main_dashboard")}</p>
          <br></br>
          <div class="row row-cols-1 row-cols-md-3 g-4">
            {/* air */}
            <Link to="/airquality" style={{ textDecoration: "none" }}>
              <div class="col" style={{ paddingLeft: "30px", height: "100%" }}>
                <div
                  class="card shadow"
                  style={{
                    width: "20rem",
                    backgroundColor: "white",
                    color: "black",
                    height: "100%",
                  }}
                >
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">{t("air_quality_tracker")}</h5>
                      <img
                        src={require("../assets/images/air.png")}
                        class="card-img-top"
                        alt="Air Quality Tracker"
                        style={{ width: "50%" }}
                      ></img>
                    </center>
                  </div>
                </div>
              </div>
            </Link>

            {/* complain */}
            <Link to="/addcomplaints" style={{ textDecoration: "none" }}>
              <div class="col" style={{ paddingLeft: "30px", height: "100%" }}>
                <div
                  class="card shadow"
                  style={{
                    width: "20rem",
                    backgroundColor: "white",
                    color: "black",
                    height: "100%",
                  }}
                >
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">{t("carbon_complaints")}</h5>
                      <img
                        src={require("../assets/images/complaint.png")}
                        class="card-img-top"
                        alt="Carbon Emission Complaints"
                        style={{ width: "50%", paddingTop: "10px" }}
                      ></img>
                    </center>
                  </div>
                </div>
              </div>
            </Link>

            {/* footprint */}
            <Link to="/carbonDash" style={{ textDecoration: "none" }}>
              <div class="col" style={{ paddingLeft: "30px", height: "100%" }}>
                <div
                  class="card shadow"
                  style={{
                    width: "20rem",
                    backgroundColor: "white",
                    color: "black",
                    height: "100%",
                  }}
                >
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">
                        {" "}
                        {t("carbon_footprint_calculator")}
                      </h5>
                      <img
                        src={require("../assets/images/carbonfootprint .png")}
                        class="card-img-top"
                        alt="Carbon Footprint Calculator"
                        style={{ width: "50%", paddingTop: "10px" }}
                      ></img>
                    </center>
                  </div>
                </div>
              </div>
            </Link>
            
            {/* footprint reduction */}
            
            <Link to="/foods" style={{ textDecoration: "none" }}>
              
              <div class="col" style={{ paddingLeft: "30px", height: "100%" }}>
                <div
                  class="card shadow"
                  style={{
                    width: "20rem",
                    backgroundColor: "white",
                    color: "black",
                    height: "15rem",
                  }}
                >
                  
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">{t("carbon_complaints_reduce")}</h5>
                      <img
                        src={require("../assets/images/co2 reduce.png")}
                        class="card-img-top"
                        alt="Carbon Emission Reduction Guidance"
                        style={{ width: "50%", paddingTop: "10px" }}
                      ></img>
                    </center>
                  </div>
                </div>
              </div>
            </Link>
          </div>

          <br></br>
          
          <br></br>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default Dashboard;
