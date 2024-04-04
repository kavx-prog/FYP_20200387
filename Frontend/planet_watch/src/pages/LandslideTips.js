import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function LandslideTips() {

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
                  backgroundColor: "#E9FFE7",
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
            <h2>Landslide Safety Tips</h2>
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
                    src={require("../assets/images/radio.png")}
                    class="card-img-top"
                    alt="Stay Informed"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Stay Informed</h5>
                    </center>
                    <p>
                      Be aware of the weather conditions in your area and pay
                      attention to any landslide warnings or advisories issued
                      by local authorities or meteorological agencies.
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
                    src={require("../assets/images/sign.png")}
                    class="card-img-top"
                    alt="Report any concerns"
                    style={{ height: "50%", width: "95%", paddingLeft: "20px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Report any concerns</h5>
                    </center>
                    <p>
                      If you notice any signs of potential landslide hazards,
                      such as cracks in the ground or retaining walls, erosion,
                      or land movement, report it to your local authorities,
                      land management agencies, or geotechnical professionals.
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
                    src={require("../assets/images/heavy.jpg")}
                    class="card-img-top"
                    alt="Be cautious during heavy rainfall"
                    style={{ height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">
                        Be cautious during heavy rainfall
                      </h5>
                    </center>
                    <p>
                      Streamer development during a lightning strike can pose a
                      threat to individuals as multiple streamers discharge,
                      potentially causing harm even without a completed
                      lightning channel.
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
                    src={require("../assets/images/beaware.jpg")}
                    class="card-img-top"
                    alt="Plan your surroundings"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Plan your surroundings</h5>
                    </center>
                    <p>
                      If you live in an area prone to landslides, consider the
                      landscape and topography when planning your surroundings.
                      Avoid building or living near steep slopes or areas with
                      loose soil or rock.
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
                    src={require("../assets/images/drain.jpg")}
                    class="card-img-top"
                    alt="Maintain drainage systems"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Maintain drainage systems</h5>
                    </center>
                    <p>
                      Keep gutters, ditches, and storm drains clear of debris to
                      ensure proper water drainage. Excessive water accumulation
                      can increase the risk of landslides.
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
                    src={require("../assets/images/warning.jpg")}
                    class="card-img-top"
                    alt="Know the Signs"
                    style={{ paddingBottom: "20px" }}
                  ></img>

                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Know the Signs</h5>
                    </center>
                    <p>
                      Learn to recognize the signs of an impending landslide,
                      such as sudden changes in water flow or patterns, unusual
                      sounds, cracking of the ground, or tilting of trees or
                      utility poles. If you notice any of these signs, evacuate
                      the area immediately.
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
                    src={require("../assets/images/evacuate.jpg")}
                    class="card-img-top"
                    alt="Evacuate if necessary"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Evacuate if necessary</h5>
                    </center>
                    <p>
                      If an official evacuation order is issued or you feel that
                      your safety is at risk, evacuate the area immediately. Do
                      not delay or underestimate the potential danger of a
                      landslide.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <br></br>
            <h2>Classifications of a Landslide</h2>
            <center>
              <p style={{ fontSize: "20px" }}>
                Landslides are classified by their type of movement. There are
                four main types of movements.
              </p>
            </center>
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
                    src={require("../assets/images/falls.jpeg")}
                    class="card-img-top"
                    alt="Falls"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Falls</h5>
                    </center>
                    <p>
                      Falls are landslides that involve the collapse of material
                      from a cliff or steep slope. Falls usually involve a
                      mixture of free fall through the air, bouncing or rolling.
                      A fall-type landslide results in the collection of rock or
                      debris near the base of a slope.
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
                    src={require("../assets/images/topple.jpg")}
                    class="card-img-top"
                    alt="Topples"
                    style={{ paddingBottom: "20px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Topples</h5>
                    </center>
                    <p>
                      A side flash occurs when lightning strikes a taller object
                      near the victim and a portion of the current jumps from
                      taller object to the victim.
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
                    src={require("../assets/images/slide.jpg")}
                    class="card-img-top"
                    alt="slides"
                    style={{ paddingBottom: "20px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Slides</h5>
                    </center>
                    <p>
                      A slide-type landslide is a specific downhill movement of
                      material along a deep slip surface. It is characterized by
                      a prominent main scarp, a backward-tilted block at the
                      top, and rotational movement below.
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
                    src={require("../assets/images/flow.jpg")}
                    class="card-img-top"
                    alt="Flow"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Flow</h5>
                    </center>
                    <p>
                      Flows are landslides that involve the movement of material
                      down a slope in the form of a fluid. Flows often leave
                      behind a distinctive, upside-down funnel shaped deposit
                      where the landslide material has stopped moving. There are
                      different types of flows: mud, debris and rock (rock
                      avalanches).
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <center>
              <p style={{ fontSize: "20px" }}>
                <b>Slides</b> are characterised by a failure of material at
                depth and then movement by sliding along a rupture or slip
                surface. There are two types of slide failure, rotational slides
                (slumps) and translational (planar) slides.
              </p>
            </center>
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
                    src={require("../assets/images/rotational.jpg")}
                    class="card-img-top"
                    alt="Rotational slides"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Rotational slides</h5>
                    </center>
                    <p>
                      If the slip surface is listric (curved or spoon-shaped)
                      the slide is said to be rotational. A good example of a
                      rotational landslide is the Holbeck Hall landslide, in
                      Scarborough, North Yorkshire.
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
                    src={require("../assets/images/translational.jpg")}
                    class="card-img-top"
                    alt="Translational slides"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title">Translational slides</h5>
                    </center>
                    <p>
                      A translational or planar landslide is a downslope
                      movement of material that occurs along a distinctive
                      planar surface of weakness such as a fault, joint or
                      bedding plane. Some of the largest and most damaging
                      landslides on Earth are translational. These landslides
                      occur at all scales and are not self-stabilising. They can
                      be very rapid where discontinuities are steep.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
          </Container>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default LandslideTips;
