import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import useParams from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";

const Sea = () => {
  const { objectID } = useParams();

  const [journeys, setJourneys] = useState([]);
  const [hours, setHours] = useState("");
  const [type, setType] = useState("");
  const [passengers, setPassengers] = useState("");
  const [fuelType, setFuelType] = useState("");
  const [boatType, setBoatType] = useState("");
  const [totalEmission, setTotalEmission] = useState("0");
  const [data, setData] = useState(null); // Added state for fetched data
  const [loading, setLoading] = useState(true); // Added loading state

  const [username, setusername] = useState(true);
  const [automobile_emission, setautomobile_emission] = useState(true);
  const [railway_emission, setrailway_emission] = useState(true);
  const [aquatic_emission, setaquatic_emission] = useState(true);
  const [aviation, setaviation] = useState(true);

  useEffect(() => {
    window.history.forward();
    axiosInstance
      .get(`/transportation/${objectID}/`)
      .then((response) => {
        setData(response.data);

        setusername(response.data.username);
        setautomobile_emission(response.data.automobile_emission);
        setrailway_emission(response.data.railway_emission);
        setaquatic_emission(response.data.aquatic_emission);
        setaviation(response.data.aviation);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [objectID]);

  const deleteJourney = (index) => {
    const updatedJourneys = [...journeys];
    updatedJourneys.splice(index, 1);
    setJourneys(updatedJourneys);
  };

  // console.log(automobile_emission);
  const updateData = (totalRailEmissionnew) => {
    const updatedData = {
      username: username,
      automobile_emission: automobile_emission,
      railway_emission: railway_emission,
      aquatic_emission: parseFloat(totalRailEmissionnew).toFixed(2),
      aviation: aviation,
    };

    axiosInstance
      .put(`/transportation/${objectID}/`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };
  const fuelConsumptionMap = {
    1: 0,
    2: 7.5,
    3: 25,
    4: 150,
    5: 750,
  };

  var CO2PerLiter = 0;

  switch (parseInt(type)) {
    case 1:
      CO2PerLiter = 0;
      break;
    case 2:
      CO2PerLiter = 2.68;
      break;
    case 3:
      CO2PerLiter = 2.68;
      break;
    case 4:
      CO2PerLiter = 3.3;
      break;
    case 5:
      CO2PerLiter = 3.3;
      break;
    default:
      break;
  }

  const addJourney = () => {
    const fuelConsumptionhpl = fuelConsumptionMap[type];
    const journeyEmission =
      ((parseFloat(hours) * fuelConsumptionhpl) / parseInt(passengers)) *
      CO2PerLiter;

    const journey = {
      hours: parseFloat(hours),
      passengers: parseInt(passengers),
      emission: journeyEmission.toFixed(2),
      boatType,
      fuelType,
      fuelConsumption: parseFloat(fuelConsumptionhpl),
    };
    setJourneys([...journeys, journey]);
    setHours("");
  };

  const boatTypes = (selectedType) => {
    setType(selectedType);
    const boatInfo = getBoatInfo(selectedType);
    setPassengers(boatInfo.passengers);
    setFuelType(boatInfo.fuelType);
    setBoatType(boatInfo.boatType);
  };

  const getBoatInfo = (selectedType) => {
    const boatInfoMap = {
      1: {
        passengers: "2",
        fuelType: "Human Power / Wind",
        boatType: "Row Or Sail Boat",
      },
      2: {
        passengers: "15",
        fuelType: "Petrol",
        boatType: "Speedboat",
      },
      3: {
        passengers: "75",
        fuelType: "Diesel",
        boatType: "Ferrie",
      },
      4: {
        passengers: "1500",
        fuelType: "Heavy fuel oil",
        boatType: "Cruise ship",
      },
      5: {
        passengers: "15000",
        fuelType: "Heavy fuel oil",
        boatType: "Cargo ship",
      },
    };
    return boatInfoMap[selectedType];
  };

  const validateForm = () => {
    return hours && passengers;
  };

  const calculateTotalEmissionhandler = () => {
    const totalRailEmissionnew = calculateTotalEmission();
    setTotalEmission(totalRailEmissionnew);

    // calculateTotalEmission()
    // setTotalEmission(calculateTotalEmission())
    console.log(parseFloat(totalRailEmissionnew).toFixed(2));
    updateData(totalRailEmissionnew);
  };

  const calculateTotalEmission = () => {
    let totalEmission = 0;
    let CO2PerLiter = 0;
    journeys.forEach((journey) => {
      switch (journey.fuelType) {
        case "Human Power / Wind":
          CO2PerLiter = 0;
          break;
        case "Petrol":
          CO2PerLiter = 2.68;
          break;
        case "Diesel":
          CO2PerLiter = 2.68;
          break;
        case "Heavy fuel oil":
          CO2PerLiter = 3.3;
          break;
        default:
          break;
      }
      console.log("CO2PerLiter", CO2PerLiter);
      let journeyEmission =
        ((journey.hours * journey.fuelConsumption) / journey.passengers) *
        CO2PerLiter;
      console.log("journey.hours", journey.hours);
      console.log("journey.passengers", journey.passengers);
      console.log("journey.fuelConsumption", journey.fuelConsumption);
      totalEmission += journeyEmission;
    });
    return totalEmission;
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-3 mt-3 bg-white px-5" style={{ fontSize: "20px" }}>
        <div className="text-center mb-4">
          <h1 class="display-3">Aquatic</h1>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-center display-6"> Add Journeys </h3>

          <Container className="border border-success  border-3">
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={6} md={4} className="d-flex justify-content-end">
                <label>Hours Rode : </label>
              </Col>
              <Col xs={7} md={8} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={4} md={3} className="d-flex justify-content-end">
                <label>Boat Type : </label>
              </Col>
              <Col xs={10} md={9} className="d-flex justify-content-start">
                <ButtonGroup>
                  <ToggleButton
                    id={"1"}
                    type="radio"
                    variant="outline-success"
                    value="1"
                    onChange={(e) => boatTypes(e.target.value)}
                    checked={type === "1"}
                  >
                    Row Or Sail Boat
                  </ToggleButton>
                  <ToggleButton
                    id={"2"}
                    type="radio"
                    variant="outline-success"
                    value="2"
                    onChange={(e) => boatTypes(e.target.value)}
                    checked={type === "2"}
                  >
                    Speedboat
                  </ToggleButton>
                  <ToggleButton
                    id={"3"}
                    type="radio"
                    variant="outline-success"
                    value="3"
                    onChange={(e) => boatTypes(e.target.value)}
                    checked={type === "3"}
                  >
                    Ferrie
                  </ToggleButton>
                  <ToggleButton
                    id={"4"}
                    type="radio"
                    variant="outline-success"
                    value="4"
                    onChange={(e) => boatTypes(e.target.value)}
                    checked={type === "4"}
                  >
                    Cruise ship
                  </ToggleButton>
                  <ToggleButton
                    id={"5"}
                    type="radio"
                    variant="outline-success"
                    value="5"
                    onChange={(e) => boatTypes(e.target.value)}
                    checked={type === "5"}
                  >
                    Cargo ship
                  </ToggleButton>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col>
                <label>
                  Boat Type : <strong>{type}</strong>
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col>
                <label>
                  Average Passenger Count By Boat Type :{" "}
                  <strong>{passengers}</strong>
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col>
                <label>
                  Fuel Type : <strong>{fuelType}</strong>
                </label>
              </Col>
            </Row>
            <Button
              variant="success"
              className="mt-3 mb-3"
              onClick={addJourney}
              disabled={!validateForm()}
            >
              Add Journey
            </Button>
          </Container>
        </div>
        <Row className="d-flex justify-content-center mb-3">
          <Col xs={6} md={6}>
            <Button
              variant="success"
              onClick={() => calculateTotalEmissionhandler()}
            >
              Calculate Total Emission
            </Button>
          </Col>
          <Col xs={6} md={6} className="d-flex justify-content-end">
            <p>Total Emission: {parseFloat(totalEmission).toFixed(4)} kgCO2</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          <Col className="d-flex justify-content-center">
            <Button variant="success" as={Link} to="/carbonDash">
              Home
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          <Col>
            <h3 className="text-center display-6"> Journeys </h3>
          </Col>
        </Row>
        <Row>
          {journeys.map((journey, index) => (
            <Col md={6}>
              <div
                key={index}
                class="card text-center mt-3 mb-3"
                style={{ height: "350px", fontSize: "15px" }}
              >
                <div class="card-header">Journey No.{index + 1}</div>
                <div class="card-body">
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="d-flex justify-content-end">
                      <strong>Hours :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.hours} Hours
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="d-flex justify-content-end">
                      <strong>Boat Type :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.boatType}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="d-flex justify-content-end">
                      <strong>Fuel Type :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.fuelType}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="d-flex justify-content-end">
                      <strong>Passengers :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.passengers}
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="d-flex justify-content-end">
                      <strong>Emission :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.emission} kgCO2
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col>
                      <Button
                        variant="danger"
                        onClick={() => deleteJourney(index)}
                      >
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default Sea;
