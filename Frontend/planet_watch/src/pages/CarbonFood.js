import React from "react";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function CarbonnFood() {
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
                  backgroundColor: "#E9FFE7",
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
                Reducing the carbon footprint from food is an important step in
                mitigating climate change. Here are several ways you can reduce
                your carbon footprint in relation to food:
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
                    src={require("../assets/images/healthydiet.png")}
                    class="card-img-top"
                    alt="Choose a plant-based diet"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Choose a plant-based diet
                      </h5>
                    </center>
                    <p>
                      Consuming a plant-based diet, or reducing the amount of
                      meat and dairy you consume, can have a significant impact
                      on reducing carbon emissions. The production of meat and
                      dairy products requires more resources and generates more
                      greenhouse gas emissions compared to plant-based foods.
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
                    src={require("../assets/images/local.jpg")}
                    class="card-img-top"
                    alt="Eat local and seasonal foods"
                    style={{ paddingBottom: "20px" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Eat local and seasonal foods
                      </h5>
                    </center>
                    <p>
                      Supporting local farmers and consuming foods that are in
                      season reduces the distance that food needs to travel to
                      reach your plate. This helps minimize transportation
                      emissions associated with long-distance food supply
                      chains.
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
                    src={require("../assets/images/organic.png")}
                    class="card-img-top"
                    alt="Choose organic and sustainable options"
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Choose organic and sustainable options
                      </h5>
                    </center>
                    <p>
                      Organic farming practices tend to have lower environmental
                      impacts. Look for organic certifications when purchasing
                      fruits, vegetables, and other food products. Additionally,
                      consider sustainable seafood options and look for
                      certifications like the Marine Stewardship Council (MSC)
                      label.
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
                    src={require("../assets/images/waste.jpg")}
                    class="card-img-top"
                    alt="Reduce food waste"
                    style={{ height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5
                        class="card-title"
                        style={{ fontWeight: "bold" }} // paddingTop: "18px"
                      >
                        Reduce food waste
                      </h5>
                    </center>
                    <p>
                      Approximately one-third of all food produced globally goes
                      to waste. By minimizing food waste at home, you can reduce
                      the emissions associated with producing, transporting, and
                      disposing of wasted food. Plan your meals, store food
                      properly, and consider composting food scraps.
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
                    src={require("../assets/images/ownFood.jpg")}
                    class="card-img-top"
                    alt="Grow your own food"
                    style={{ height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Grow your own food
                      </h5>
                    </center>
                    <p>
                      If you have the space and resources, growing your own
                      fruits, vegetables, and herbs can significantly reduce
                      your carbon footprint. It eliminates transportation
                      emissions and ensures you have access to fresh, homegrown
                      produce.
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
                    src={require("../assets/images/support.jpg")}
                    class="card-img-top"
                    alt="Support sustainable agriculture"
                    style={{ height: "50%" }}
                  ></img>
                  <div class="card-body">
                    <center>
                      <h5 class="card-title" style={{ fontWeight: "bold" }}>
                        Support sustainable agriculture
                      </h5>
                    </center>
                    <p>
                      Look for certifications like Fairtrade or Rainforest
                      Alliance when purchasing food products such as coffee,
                      chocolate, tea, and bananas. These certifications ensure
                      that the products are sourced sustainably and that the
                      farmers are being paid fair wages.
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

export default CarbonnFood;
