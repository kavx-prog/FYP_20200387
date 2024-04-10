import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/styles/CarbonDashboard.css";
import { Link } from "react-router-dom";
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
      <Header />
      <br></br>
      <Container>
        <div className="p-5 bg-white text-dark">
          <h2 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
            {t("header_carbon_dashboard")}
          </h2>
          <Row className="justify-content-center">
            <Col md={8}>
              <p style={{ fontFamily: "Montserrat", textAlign: "center" }}>
                {t("description_carbon_dashboard")}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md={4} className="mb-3">
              <Button
                variant={MainShow === "1" ? "success" : "outline-success"}
                onClick={() => setMainShow("1")}
                style={{ width: "100%" }}
              >
                {t("transportation")}
              </Button>
            </Col>
            <Col md={4} className="mb-3">
              <Button
                variant={MainShow === "2" ? "success" : "outline-success"}
                onClick={() => setMainShow("2")}
                style={{ width: "100%" }}
              >
                {t("energy")}
              </Button>
            </Col>
            <Col md={4} className="mb-3">
              <Button
                variant={MainShow === "3" ? "success" : "outline-success"}
                onClick={() => setMainShow("3")}
                style={{ width: "100%" }}
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

          <Row className="justify-content-center mb-3">
            <Col md={4} className="mb-3">
              <Link to="/road">
                <Button variant="success" style={{ width: "100%" }}>
                  {t("transportation")}
                </Button>
              </Link>
            </Col>
            <Col md={4} className="mb-3">
              <Link to="/energy">
                <Button variant="success" style={{ width: "100%" }}>
                  {t("energy")}
                </Button>
              </Link>
            </Col>
            <Col md={4} className="mb-3">
              <Link to="/food">
                <Button variant="success" style={{ width: "100%" }}>
                  {t("diet_and_food")}
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-center mb-3">
            <Col md={4} className="mb-3">
              <Link to="/emissionSetup">
                <Button style={{ width: "100%" }}>
                  {t("configure_emission")}
                </Button>
              </Link>
            </Col>
            <Col md={4} className="mb-3">
              <Button onClick={handleTips} style={{ width: "100%" }}>
                {t("emission_reduction_tips")}
              </Button>
            </Col>
          </Row>
        </div>
      </Container>
      <br></br>
      <Footer />
    </div>
  );
};

export default CarbonDashBoard;