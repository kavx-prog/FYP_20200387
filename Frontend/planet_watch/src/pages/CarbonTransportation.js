import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function CarbonTransportation() {
  return (
    <div>
       <Header></Header>
      <br></br>
      <Container>
        <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            Lets reduce your carbon footprint
            <img
              src={require("../assets/images/reduce.jpg")}
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
                to="/foods"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/foodCircle.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Food
              </Link>
            </li>
            <li class="nav-item">
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                }}
                to="/elec"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/elecCircle.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Energy
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
                to="/trans"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/transportCircle.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Transpotation
              </Link>
            </li>
            <li class="nav-item" style={{ backgroundColor: "#E9FFE7" }}>
              <Link
                style={{
                  textDecoration: "none",
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                }}
                to="/industry"
                class="nav-link active"
                aria-current="page"
              >
                <img
                  src={require("../assets/images/industryCircle.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                Industry
              </Link>
            </li>
          </ul>
          <Container
            style={{ backgroundColor: "#E9FFE7", borderColor: "#B3FF84" }}
          >
            <br></br>
            <center>
              <p style={{ fontSize: "20px" }}>
                Reducing carbon footprint from transportation is crucial for
                mitigating climate change. Here are several ways you can help
                reduce carbon emissions from transportation:
              </p>
            </center>
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
                    src={require("../assets/images/efficientVehicles.jpg")}
                    class="card-img-top"
                    alt="Choose fuel-efficient vehicles"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Choose fuel-efficient vehicles
                      </h5>
                    </center>
                    <p>
                      Opt for vehicles with higher fuel efficiency, such as
                      hybrid or electric cars. These vehicles produce fewer
                      emissions and are becoming increasingly available and
                      affordable.
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
                    src={require("../assets/images/errands.jpg")}
                    class="card-img-top"
                    alt="Combine errands"
                    style={{ paddingBottom: "18px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Combine errands
                      </h5>
                    </center>
                    <p>
                      Consolidate your errands into a single trip rather than
                      making multiple separate trips. This reduces mileage and
                      fuel usage, resulting in lower emissions.
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
                    src={require("../assets/images/publictrans.jpg")}
                    class="card-img-top"
                    alt="Use public transportation"
                    style={{ paddingBottom: "18px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Use public transportation
                      </h5>
                    </center>
                    <p>
                      Utilize public transportation systems like buses, trams,
                      subways, or trains whenever possible. Mass transit options
                      generally have lower emissions per passenger compared to
                      individual car travel.
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
                    src={require("../assets/images/walkbike.jpg")}
                    class="card-img-top"
                    alt="Walk or bike"
                    style={{ paddingBottom: "15px", height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5
                        class="card-title"
                        style={{ fontWeight: "bold" }} // paddingTop: "18px"
                      >
                        Walk or bike
                      </h5>
                    </center>
                    <p>
                      Whenever feasible, choose to walk or bike for shorter
                      distances instead of driving. This not only reduces
                      emissions but also provides health benefits.
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
                    src={require("../assets/images/routes.jpg")}
                    class="card-img-top"
                    alt="Advocate for renewable energy"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Advocate for renewable energy
                      </h5>
                    </center>
                    <p>
                      Proper trip planning helps minimize travel distance and
                      time, reducing fuel consumption and emissions. Use GPS or
                      navigation apps to find the most efficient routes and
                      avoid traffic congestion.
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
                    src={require("../assets/images/carpool.jpg")}
                    class="card-img-top"
                    alt="Carpool and rideshare"
                    style={{ paddingBottom: "18px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Carpool and rideshare
                      </h5>
                    </center>
                    <p>
                      Sharing a ride with others reduces the number of vehicles
                      on the road, leading to lower emissions per person.
                      Carpooling or using ridesharing services like UberPool or
                      Lyft Line can significantly reduce carbon footprint.
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
                    src={require("../assets/images/telecommunicate.jpg")}
                    class="card-img-top"
                    alt="Telecommute"
                    // style={{ paddingBottom: "18px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Telecommute
                      </h5>
                    </center>
                    <p>
                      If your job allows it, working from home or telecommuting
                      can eliminate the need for daily commuting, leading to
                      significant carbon savings.
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
                    src={require("../assets/images/maintainCar.jpg")}
                    class="card-img-top"
                    alt="Maintain your vehicle"
                    // style={{ paddingBottom: "18px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Maintain your vehicle
                      </h5>
                    </center>
                    <p>
                      Regularly maintain your vehicle to keep it in optimal
                      condition. Well-maintained vehicles operate more
                      efficiently and emit fewer pollutants. Ensure that tires
                      are properly inflated, and keep up with regular oil
                      changes and tune-ups.
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

export default CarbonTransportation;
