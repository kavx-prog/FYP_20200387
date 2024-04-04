import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/styles/CarbonDashboard.css";
import { Link } from "react-router-dom";
// import DoughnutChart from "../components/DoughnutChart";
// import ChartComponent from "../components/Chart";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";
import jwtDecode from "jwt-decode";
import axiosInstance from "../axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Label,
} from "recharts";

const CarbonDashBoard = () => {
  const [automobile, setAutomobile] = useState([]);
  const [railway, setRailway] = useState([]);
  const [aviation, setAviation] = useState([]);
  const [aquatic, setAquatic] = useState([]);

  const [electricity, setElectricity] = useState([]);
  const [waterAndGas, setWaterAndGas] = useState([]);

  const [food, setFood] = useState([]);
  const [beverages, setBeverages] = useState([]);

  const [MainShow, setMainShow] = useState("1");
  const [SecondShow, setSecondShow] = useState("1");

  const [transportTotal, setTransportTotal] = useState(0);
  const [energyTotal, setEnergyTotal] = useState(0);
  const [foodTotal, setFoodTotal] = useState(0);

  const { t } = useTranslation();

  const token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;

  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  };

  useEffect(() => {
    axiosInstance
      .get("/transportation/")
      .then((res) => {
        // const ResData = res.data;
        const ResData = res.data.filter((item) => item.username === userId);

        // use "ResData.slice(0, 7).map" to get only 7 records

        const formattedAutomobile = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.automobile_emission),
          };
        });

        const formattedRailway = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.railway_emission),
          };
        });

        const formattedAviation = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.aviation),
          };
        });

        const formattedAquatic = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.aquatic_emission),
          };
        });

        // const formattedAutomobile = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.automobile_emission),
        // }));

        // const formattedRailway = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.railway_emission),
        // }));

        // const formattedAviation = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.aviation),
        // }));

        // const formattedAquatic = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.aquatic_emission),
        // }));

        // console.log(formattedData);
        // console.log(formattedRailway);
        // console.log(formattedAutomobile);
        setAutomobile(formattedAutomobile);
        setRailway(formattedRailway);
        setAviation(formattedAviation);
        setAquatic(formattedAquatic);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/energy/")
      .then((res) => {
        // const ResData = res.data;
        const ResData = res.data.filter((item) => item.username === userId);

        const formattedElectricity = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.electricity_emission),
          };
        });

        const formattedWaterAndGas = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.waterandgas_emission),
          };
        });

        // const formattedElectricity = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.electricity_emission),
        // }));

        // const formattedWaterAndGas = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.waterandgas_emission),
        // }));

        setElectricity(formattedElectricity);
        setWaterAndGas(formattedWaterAndGas);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    axiosInstance
      .get("/diet/")
      .then((res) => {
        // const ResData = res.data;
        const ResData = res.data.filter((item) => item.username === userId);

        const formattedFood = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.food_emission),
          };
        });

        const formattedBevarages = ResData.map((value, index) => {
          const date = new Date(value.date);
          const formattedDate = date.toLocaleString("en-US", options);

          return {
            name: formattedDate,
            value: parseFloat(value.beverages_emission),
          };
        });

        // const formattedFood = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.food_emission),
        // }));

        // const formattedBevarages = ResData.map((value, index) => ({
        //   name: `Day ${index + 1}`,
        //   value: parseFloat(value.beverages_emission),
        // }));

        setFood(formattedFood);
        setBeverages(formattedBevarages);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  useEffect(() => {
    const transportArray = automobile
      .map((obj) => obj.value)
      .concat(railway.map((obj) => obj.value))
      .concat(aviation.map((obj) => obj.value))
      .concat(aquatic.map((obj) => obj.value));

    const energyArray = electricity
      .map((obj) => obj.value)
      .concat(waterAndGas.map((obj) => obj.value));

    const foodArray = food
      .map((obj) => obj.value)
      .concat(beverages.map((obj) => obj.value));

    const transportTotal = transportArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const energyTotal = energyArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    const foodTotal = foodArray.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );

    // console.log("transportArray : ", transportArray);
    // console.log("energyArray : ", energyArray);
    // console.log("foodArray : ", foodArray);

    // console.log("transportTotal : ", transportTotal);
    // console.log("energyTotal : ", energyTotal);
    // console.log("foodTotal : ", foodTotal);

    setTransportTotal(transportTotal);
    setEnergyTotal(energyTotal);
    setFoodTotal(foodTotal);
  }, [
    automobile,
    railway,
    aviation,
    aquatic,
    electricity,
    waterAndGas,
    food,
    beverages,
  ]);

  const handleTips = () => {
    // Find the greatest value

    let greatestValue = transportTotal;

    if (energyTotal > greatestValue) {
      greatestValue = energyTotal;
    }

    if (foodTotal > greatestValue) {
      greatestValue = foodTotal;
    }

    // Navigate based on the greatest value
    if (greatestValue === transportTotal) {
      // Navigate to URL for transportTotal
      window.location.href = "/trans";
    } else if (greatestValue === energyTotal) {
      // Navigate to URL for energyTotal
      window.location.href = "/elec";
    } else {
      // Navigate to URL for foodTotal (or a default URL if none match)
      window.location.href = "/foods";
    }
  };

  return (
    <div>
      <Header></Header>
      <br></br>
      <Container>
        <div class="p-5 bg-white text-dark">
          <h2 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
            {t("header_carbon_dashboard")}
          </h2>
          <Row class="d-flex justify-content-center">
            <Col>
              <p style={{ fontFamily: "Montserrat" }}>
                {t("description_carbon_dashboard")}
                {/* Introducing our Carbon Footprint Dashboard, a powerful tool
                designed to empower individuals and organizations to track,
                understand, and reduce their carbon footprint. With our
                intuitive and user-friendly interface, you can easily monitor
                and visualize your carbon emissions across various activities
                and sectors. Gain valuable insights into your energy
                consumption, transportation choices, waste management, and more.
                Our dashboard provides real-time data and personalized
                recommendations to help you make informed decisions and take
                meaningful actions towards a greener future. Join us in the
                journey towards sustainability as we strive to create a world
                with a smaller carbon footprint, one dashboard at a time.
                Together, we can make a significant impact and pave the way for
                a cleaner and healthier planet for generations to come. */}
              </p>
            </Col>
            {/* <Col xs={6} md={3}>
              <DoughnutChart />
            </Col> */}
          </Row>
          <br></br>
          {/* <Row class="d-flex justify-content-center">
            <Col lg={3}>
              <div
                class="card bg-white text-dark border border-dark"
                style={{ width: "18rem", height: "5rem" }}
              >
                <div class="card-body">
                  <h5 class="card-title">
                    27 tCO2e{" "}
                    <i
                      style={{ color: "red" }}
                      class="bi bi-arrow-up-right-circle-fill"
                    ></i>
                  </h5>
                  <p>Weekly Total Emmisions</p>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div
                class="card bg-white text-dark border border-dark"
                style={{ width: "18rem", height: "5rem" }}
              >
                <div class="card-body">
                  <h5 class="card-title">
                    4 tCO2e{" "}
                    <i
                      style={{ color: "green" }}
                      class="bi bi-arrow-down-right-circle-fill"
                    ></i>
                  </h5>
                  <p>Emmisions Avoided</p>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div
                class="card bg-white text-dark border border-dark"
                style={{ width: "18rem", height: "5rem" }}
              >
                <div class="card-body">
                  <h5 class="card-title">
                    1.1 tCO2e{" "}
                    <i
                      style={{ color: "green" }}
                      class="bi bi-arrow-down-right-circle-fill"
                    ></i>
                  </h5>
                  <p>Daily Emmisions</p>
                </div>
              </div>
            </Col>
            <Col lg={3}>
              <div
                class="card bg-white text-dark border border-dark"
                style={{ width: "18rem", height: "5rem" }}
              >
                <div class="card-body">
                  <h5 class="card-title">
                    0.01 tCO2e{" "}
                    <i
                      style={{ color: "green" }}
                      class="bi bi-arrow-down-right-circle-fill"
                    ></i>
                  </h5>
                  <p>Last Emission</p>
                </div>
              </div>
            </Col>
          </Row> */}
          {/* <Row className="mb-3 mt-5 w-100">
            <Col>
              <Link to="/chatBot">
                <button style={{ float: "left" }} className="btn btn-success">
                  Calculate Your Carbon Footprint
                </button>
              </Link>
            </Col>
            <Col>
              <Link to="/food">
                <button style={{ float: "right" }} className="btn btn-success">
                  How To Reduce Carbon Footprint
                </button>
              </Link>
            </Col>
          </Row> */}
          <Row className="d-flex justify-content-center mb-3">
            <Col className="mb-3" md={4}>
              <Button
                variant={MainShow === "1" ? "success" : "outline-success"}
                onClick={() => setMainShow("1")}
                style={{ width: "50vh" }}
              >
                {t("transportation")}
              </Button>
            </Col>
            <Col className="mb-3" md={4}>
              <Button
                variant={MainShow === "2" ? "success" : "outline-success"}
                onClick={() => setMainShow("2")}
                style={{ width: "50vh" }}
              >
                {t("energy")}
              </Button>
            </Col>
            <Col className="mb-3" md={4}>
              <Button
                variant={MainShow === "3" ? "success" : "outline-success"}
                onClick={() => setMainShow("3")}
                style={{ width: "50vh" }}
              >
                {t("diet_and_food")}
              </Button>
            </Col>
          </Row>

          {MainShow === "1" && (
            <Row className="d-flex justify-content-center mb-3">
              <Col className="mb-3" md={3}>
                <Button
                  variant={SecondShow === "1" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("1")}
                  style={{ width: "30vh" }}
                >
                  {t("automobile")}
                </Button>
              </Col>
              <Col className="mb-3" md={3}>
                <Button
                  variant={SecondShow === "2" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("2")}
                  style={{ width: "30vh" }}
                >
                  {t("railway")}
                </Button>
              </Col>
              <Col className="mb-3" md={3}>
                <Button
                  variant={SecondShow === "3" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("3")}
                  style={{ width: "30vh" }}
                >
                  {t("aviation")}
                </Button>
              </Col>
              <Col className="mb-3" md={3}>
                <Button
                  variant={SecondShow === "4" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("4")}
                  style={{ width: "30vh" }}
                >
                  {t("aquatic")}
                </Button>
              </Col>
            </Row>
          )}
          {MainShow === "2" && (
            <Row className="d-flex justify-content-center mb-3">
              <Col className="mb-3" md={6}>
                <Button
                  variant={SecondShow === "1" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("1")}
                  style={{ width: "60vh" }}
                >
                  {t("electricity_emission")}
                </Button>
              </Col>
              <Col className="mb-3" md={6}>
                <Button
                  variant={SecondShow === "2" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("2")}
                  style={{ width: "60vh" }}
                >
                  {t("water_and_gas")}
                </Button>
              </Col>
            </Row>
          )}
          {MainShow === "3" && (
            <Row className="d-flex justify-content-center mb-3">
              <Col className="mb-3" md={6}>
                <Button
                  variant={SecondShow === "1" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("1")}
                  style={{ width: "60vh" }}
                >
                  {t("food")}
                </Button>
              </Col>
              <Col className="mb-3" md={6}>
                <Button
                  variant={SecondShow === "2" ? "success" : "outline-success"}
                  onClick={() => setSecondShow("2")}
                  style={{ width: "60vh" }}
                >
                  {t("beverages")}
                </Button>
              </Col>
            </Row>
          )}
          {MainShow === "1" && SecondShow === "1" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("automobile")} </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={automobile}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "1" && SecondShow === "2" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("railway")} </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={railway}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "1" && SecondShow === "3" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("aviation")} </h3>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={aviation}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "1" && SecondShow === "4" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("aquatic")} </h3>

              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={aquatic}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "2" && SecondShow === "1" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("electricity_emission")} </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={electricity}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "2" && SecondShow === "2" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("water_and_gas")} </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={waterAndGas}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "3" && SecondShow === "1" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("food")} </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={food}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "3" && SecondShow === "2" && (
            <Row
              style={{ height: "400px" }}
              className="justify-content-center align-items-center"
            >
              <h3 className="text-center"> {t("beverages")} </h3>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={beverages}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Row>
          )}
          {MainShow === "1" && (
            <Row className="d-flex justify-content-center mt-5 mb-3">
              <Col className="mb-3">
                <h4 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
                  {t("total_transportation_emission")} :{" "}
                  {parseFloat(transportTotal.toFixed(2))} kgCO2
                </h4>
              </Col>
            </Row>
          )}
          {MainShow === "2" && (
            <Row className="d-flex justify-content-center mt-5 mb-3">
              <Col className="mb-3">
                <h4 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
                  {t("total_energy_emission")} :{" "}
                  {parseFloat(energyTotal.toFixed(2))} kgCO2
                </h4>
              </Col>
            </Row>
          )}
          {MainShow === "3" && (
            <Row className="d-flex justify-content-center mt-5 mb-3">
              <Col className="mb-3">
                <h4 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
                  {t("total_dietary_emission")} :{" "}
                  {parseFloat(foodTotal.toFixed(2))} kgCO2
                </h4>
              </Col>
            </Row>
          )}

          <br></br>
          <hr />
          <Row className="mb-3 mt-3 w-100">
            <Col className="d-flex justify-content-center">
              <h4> {t("calculate_your_carbon_footprint")} </h4>
            </Col>
          </Row>
          {/* <h4> {t("calculate_your_carbon_footprint")} </h4> */}

          <Row className="d-flex justify-content-center mb-3">
            <Col className="mb-3" md={4}>
              <Link to="/road">
                <Button variant={"success"} style={{ width: "50vh" }}>
                  {t("transportation")}
                </Button>
              </Link>
            </Col>
            <Col className="mb-3" md={4}>
              <Link to="/energy">
                <Button variant={"success"} style={{ width: "50vh" }}>
                  {t("energy")}
                </Button>
              </Link>
            </Col>
            <Col className="mb-3" md={4}>
              <Link to="/food">
                <Button variant={"success"} style={{ width: "50vh" }}>
                  {t("diet_and_food")}
                </Button>
              </Link>
            </Col>
          </Row>

          {/* <Row className="mb-3 mt-5 w-100">
            <Col className="d-flex justify-content-start">
              <Link to="/road">
                <button style={{ width: "50vh" }} className="btn btn-success">
                  {t("transportation")}
                </button>
              </Link>
            </Col>
            <Col className="d-flex justify-content-center">
              <Link to="/energy">
                <button style={{ width: "50vh" }} className="btn btn-success">
                  {t("energy")}
                </button>
              </Link>
            </Col>
            <Col className="d-flex justify-content-end">
              <Link to="/food">
                <button style={{ width: "50vh" }} className="btn btn-success">
                  {t("diet_and_food")}
                </button>
              </Link>
            </Col>
          </Row> */}
          {/* <Row className="mb-3 mt-5 w-100">
            <Col>
              <Link to="/foods">
                <button
                  style={{ float: "right", width: "50vh" }}
                  className="btn btn-primary"
                >
                  {t("emission_reduction_tips")} &gt;&gt;
                </button>
              </Link>
            </Col>
          </Row> */}
          <br></br>
          <hr />

          <Row className="mb-3 mt-3 w-100">
            <Col className="d-flex justify-content-center">
              <h4> {t("more_options")} </h4>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center mb-3">
            <Col className="d-flex justify-content-start mb-3" md={4}>
              <Link to="/emissionSetup">
                <Button
                  onClick={() => setMainShow("3")}
                  style={{ width: "50vh" }}
                >
                  {t("configure_emission")}
                </Button>
              </Link>
            </Col>
            <Col className="d-flex justify-content-end mb-3" md={4}>
              <Button onClick={() => handleTips()} style={{ width: "50vh" }}>
                {t("emission_reduction_tips")}
              </Button>
            </Col>
          </Row>

          {/* <Row
            style={{ height: "400px" }}
            className="justify-content-center align-items-center"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="rainfall"
                  name="Rainfall"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  data={automobile}
                />
                <Line
                  type="monotone"
                  dataKey="tempMax"
                  name="Temp Max"
                  stroke="#82ca9d"
                  activeDot={{ r: 8 }}
                  data={railway}
                />
                <Line
                  type="monotone"
                  dataKey="tempMin"
                  name="Temp Min"
                  stroke="#ffc658"
                  activeDot={{ r: 8 }}
                  data={aviation}
                />
              </LineChart>
            </ResponsiveContainer>
          </Row> */}
          <br></br>
        </div>
        <br></br>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default CarbonDashBoard;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// function LineChartExample(){
//   const data = [
//     { name: 'Jan', value: 30 },
//     { name: 'Feb', value: 45 },
//     { name: 'Mar', value: 28 },
//     { name: 'Apr', value: 62 },
//     { name: 'May', value: 50 },
//     { name: 'Jun', value: 38 },
//   ];

//   const [rainfall,setRainfall] = useState([])
//   useEffect(()=>{
//     axios.get('https://api.open-meteo.com/v1/forecast?latitude=6.6858&longitude=80.4036&daily=temperature_2m_max,temperature_2m_min,rain_sum&timezone=auto').then((res)=>{
//       const ResData = res.data.daily.rain_sum;

//       // Reformat the data to match the structure expected by Recharts
//       const formattedData = ResData.map((value, index) => ({
//         name: `Day ${index + 1}`,
//         value,
//       }));
//       console.log(formattedData)
//       console.log(ResData)
//       setRainfall(formattedData);
//     }).catch((error)=>{
//         console.log(error.message)
//     })
//   },[])
//   return (
//     <ResponsiveContainer width="100%" height={300} >
//       <LineChart
//         data={rainfall}
//         margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
//       >
//         <CartesianGrid strokeDasharray="3 3" />
//         <XAxis dataKey="name" />
//         <YAxis />
//         <Tooltip />
//         <Legend />
//         <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
//       </LineChart>
//     </ResponsiveContainer>
//   );
// };

// export default LineChartExample;
