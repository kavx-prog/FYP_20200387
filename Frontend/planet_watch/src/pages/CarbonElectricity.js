import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function CarbonElectricity() {
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
                  backgroundColor: "#E9FFE7",
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
                Reducing your carbon footprint from electricity is an important
                step towards combating climate change and transitioning to a
                more sustainable energy system. Here are some effective ways to
                reduce your carbon footprint associated with electricity:
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
                    src={require("../assets/images/effeciency.jpg")}
                    class="card-img-top"
                    alt="Energy efficiency"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Energy efficiency
                      </h5>
                    </center>
                    <p>
                      Improving the energy efficiency of your home or workplace
                      is a great way to reduce electricity consumption and lower
                      carbon emissions. Consider these measures:
                      <ul>
                        <li>
                          Install energy-efficient appliances and electronics.
                        </li>
                        <li>
                          Use LED light bulbs, which consume less energy than
                          traditional incandescent bulbs.
                        </li>
                        <li>
                          Insulate your home properly to reduce heating and
                          cooling needs.
                        </li>
                        <li>
                          Turn off lights and unplug devices when not in use.
                        </li>
                      </ul>
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
                    // height: "100%",
                  }}
                >
                  <img
                    src={require("../assets/images/renewable.jpg")}
                    class="card-img-top"
                    alt="Renewable energy sources"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Renewable energy sources
                      </h5>
                    </center>
                    <p>
                      Switching to renewable energy sources for your electricity
                      can significantly reduce your carbon footprint. Here's
                      how:
                      <ul>
                        <li>
                          Install solar panels on your property to generate your
                          own clean energy.
                        </li>
                        <li>
                          Participate in community solar programs if installing
                          panels is not feasible.
                        </li>
                        <li>
                          Choose an electricity provider that offers renewable
                          energy options or green energy tariffs.
                        </li>
                        <li>
                          Turn off lights and unplug devices when not in use.
                        </li>
                      </ul>
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
                    src={require("../assets/images/conservation.jpg")}
                    class="card-img-top"
                    alt="Energy conservation"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Energy conservation
                      </h5>
                    </center>
                    <p>
                      <ul>
                        <li>
                          Be mindful of your energy consumption and practice
                          energy conservation habits
                        </li>
                        <li>Use natural lighting whenever possible.</li>
                        <li>
                          Set thermostats at energy-efficient temperatures.
                        </li>
                        <li>
                          Optimize heating and cooling systems with programmable
                          thermostats.
                        </li>
                        <li>
                          Use power strips to easily turn off multiple devices
                          at once.
                        </li>
                        <li>
                          Air dry clothes instead of using a dryer when weather
                          permits.
                        </li>
                      </ul>
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
                    src={require("../assets/images/offset.jpg")}
                    class="card-img-top"
                    alt="Offsetting carbon emissions"
                    // style={{ height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5
                        class="card-title"
                        style={{ fontWeight: "bold" }} // paddingTop: "18px"
                      >
                        Offsetting carbon emissions
                      </h5>
                    </center>
                    <p>
                      <ul>
                        <li>
                          Consider carbon offset programs to compensate for any
                          remaining emissions.
                        </li>
                        <li>
                          Invest in projects that reduce greenhouse gas
                          emissions, such as reforestation or renewable energy
                          initiatives.
                        </li>
                      </ul>
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
                    src={require("../assets/images/advocating.jpg")}
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
                      <ul>
                        <li>
                          Support policies and initiatives that promote the
                          expansion of renewable energy sources.
                        </li>
                        <li>
                          Encourage your community, workplace, or local
                          government to adopt renewable energy options
                        </li>
                      </ul>
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
                    src={require("../assets/images/monitor.jpg")}
                    class="card-img-top"
                    alt="Monitor and track your energy use"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Monitor and track your energy use
                      </h5>
                    </center>
                    <p>
                      <ul>
                        <li>
                          Install energy monitoring devices to keep track of
                          your electricity consumption.
                        </li>
                        <li>
                          Identify areas where you can further reduce energy
                          usage and adjust your habits accordingly.
                        </li>
                      </ul>
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

export default CarbonElectricity;
