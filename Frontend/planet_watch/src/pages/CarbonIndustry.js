import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function CarbonIndustry() {
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
                  backgroundColor: "#E9FFE7",
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
                Reducing carbon footprint from industry is crucial for
                mitigating climate change and promoting sustainable practices.
                Here are some effective strategies to achieve that:
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
                    src={require("../assets/images/energymanagment.jpg")}
                    class="card-img-top"
                    alt="Improve energy efficiency"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Improve energy efficiency
                      </h5>
                    </center>
                    <p>
                      Enhance energy management systems, conduct energy audits,
                      and implement energy-efficient technologies to reduce
                      energy consumption and associated carbon emissions.
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
                    src={require("../assets/images/transitionrenewable.jpg")}
                    class="card-img-top"
                    alt="Transition to renewable energy"
                    // style={{ paddingBottom: "20px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Transition to renewable energy
                      </h5>
                    </center>
                    <p>
                      Shift towards renewable energy sources such as solar,
                      wind, hydro, or geothermal power. Install on-site
                      renewable energy systems or purchase renewable energy
                      credits to replace fossil fuel-based energy.
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
                    src={require("../assets/images/ecogoods.jpg")}
                    class="card-img-top"
                    alt="Use sustainable materials"
                    // style={{ paddingBottom: "15px", height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5
                        class="card-title"
                        style={{ fontWeight: "bold" }} // paddingTop: "18px"
                      >
                        Use sustainable materials
                      </h5>
                    </center>
                    <p>
                      Choose environmentally friendly and sustainable materials
                      throughout the production process. This includes selecting
                      renewable or recycled materials and reducing the use of
                      hazardous substances.
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
                    src={require("../assets/images/logistics.jpg")}
                    class="card-img-top"
                    alt="Optimize transportation and logistics"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Optimize transportation and logistics
                      </h5>
                    </center>
                    <p>
                      Improve transportation efficiency by reducing the distance
                      traveled, optimizing routes, and utilizing more
                      fuel-efficient vehicles. Encourage the use of electric or
                      hybrid vehicles and promote carpooling or public
                      transportation for employee commuting.
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
                    src={require("../assets/images/CarbonCapture.png")}
                    class="card-img-top"
                    alt="Implement carbon capture and storage"
                    style={{ height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Implement carbon capture and storage (CCS)
                      </h5>
                    </center>
                    <p>
                      Explore and invest in carbon capture and storage
                      technologies that can capture and store carbon dioxide
                      emissions, preventing them from being released into the
                      atmosphere.
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
                    src={require("../assets/images/trading.jpg")}
                    class="card-img-top"
                    alt="Engage in emissions trading"
                    style={{ paddingBottom: "18px", height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Engage in emissions trading
                      </h5>
                    </center>
                    <p>
                      Participate in emissions trading systems where applicable
                      or invest in high-quality carbon offset projects to
                      compensate for unavoidable emissions.
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
                    src={require("../assets/images/circular.jpg")}
                    class="card-img-top"
                    alt="Encourage circular economy practices"
                    // style={{ paddingBottom: "18px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Encourage circular economy practices
                      </h5>
                    </center>
                    <p>
                      Embrace circular economy principles by designing products
                      for durability, repairability, and recyclability. Promote
                      the reuse and recycling of materials and reduce waste
                      generation.
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
                    src={require("../assets/images/teamwork.jpg")}
                    class="card-img-top"
                    alt="Collaborate and share best practices"
                    style={{ paddingTop: "15px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Collaborate and share best practices
                      </h5>
                    </center>
                    <p>
                      Engage in industry associations, partnerships, and
                      knowledge-sharing platforms to exchange ideas,
                      experiences, and best practices for reducing carbon
                      footprint. Collaboration can foster innovation and
                      collective action.
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

export default CarbonIndustry;
