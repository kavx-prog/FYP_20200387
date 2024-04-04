import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../axios";

const Plane = () => {
  const { objectID } = useParams();

  const [journeys, setJourneys] = useState([]);
  const [hours, setHours] = useState("");
  const [type, setType] = useState("");
  const [passengers, setPassengers] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [planeType, setPlaneType] = useState("");
  const [totalEmission, setTotalEmission] = useState("0");

  const [data, setData] = useState(null); // Added state for fetched data
  const [loading, setLoading] = useState(true); // Added loading state

  const [username, setusername] = useState(true);
  const [automobile_emission, setautomobile_emission] = useState(true);
  const [railway_emission, setrailway_emission] = useState(true);
  const [aquatic_emission, setaquatic_emission] = useState(true);
  const [aviation, setaviation] = useState(true);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/sea/${objectID}/`);
  };

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
      aquatic_emission: aquatic_emission,
      aviation: parseFloat(totalRailEmissionnew).toFixed(2),
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

  const calculateTotalEmissionhandler = () => {
    const totalRailEmissionnew = calculateTotalEmission();
    setTotalEmission(totalRailEmissionnew);

    // calculateTotalEmission()
    // setTotalEmission(calculateTotalEmission())
    console.log(parseFloat(totalRailEmissionnew).toFixed(2));
    updateData(totalRailEmissionnew);
  };

  const fuelConsumptionMap = {
    1: 2750,
    2: 2950,
    3: 3750,
    4: 4250,
    5: 8000,
  };
  const CO2PerLiter = 3.16;

  const addJourney = () => {
    const fuelConsumptionhpl = fuelConsumptionMap[type];
    const journeyEmission =
      ((parseFloat(hours) * fuelConsumptionhpl) / parseInt(passengers)) *
      CO2PerLiter;
   console.log("journeyEmission", journeyEmission);

    const journey = {
      hours: parseFloat(hours),
      passengers: parseInt(passengers),
      emission: journeyEmission.toFixed(2),
      planeType,
      fuelConsumption : parseInt(fuelConsumptionhpl),
    };
    setJourneys([...journeys, journey]);
    setHours("");
  };

  const planeTypes = (selectedType) => {
    setType(selectedType);
    const planeInfo = getPlaneInfo(selectedType);
    setPassengers(planeInfo.passengers);
    setBodyType(planeInfo.bodyType);
    setPlaneType(planeInfo.planeType);
  };

  const getPlaneInfo = (selectedType) => {
    const planeInfoMap = {
      1: {
        passengers: "200",
        bodyType: "Narrow-body",
        planeType: "Airbus A320neo",
      },
      2: {
        passengers: "180",
        bodyType: "Narrow-body",
        planeType: "Boeing 737 MAX 8",
      },
      3: {
        passengers: "275",
        bodyType: "Wide-body",
        planeType: "Airbus A330-300",
      },
      4: {
        passengers: "375",
        bodyType: "Wide-body",
        planeType: "Boeing 777-300ER",
      },
      5: {
        passengers: "689",
        bodyType: "Very large wide-body",
        planeType: "Airbus A380-800",
      },
    };
    return planeInfoMap[selectedType];
  };

  const validateForm = () => {
    return hours && passengers;
  };

  const calculateTotalEmission = () => {
    let totalEmission = 0;
    journeys.forEach((journey) => {
      let journeyEmission =
        ((journey.hours * journey.fuelConsumption) / journey.passengers) *
        CO2PerLiter;
        
        totalEmission += journeyEmission;
        console.log("fuelConsumptionhpl", journey.fuelConsumption);
        console.log("totalEmission", totalEmission);
        console.log("journeyEmission", journeyEmission);
    },);
    return totalEmission;
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div
        className="mb-3 mb-3 mt-3 bg-white px-5"
        style={{ fontSize: "20px" }}
      >
        <div className="text-center mb-4">
          <h1 class="display-3">Aviation</h1>
        </div>
        <div className="text-center mb-4">
          <h3 className="text-center display-6"> Add Journeys </h3>

          <Container className="border border-success  border-3">
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={6} md={5} className="d-flex justify-content-end">
                <label>Hours Flew : </label>
              </Col>
              <Col xs={7} md={7} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={hours}
                  onChange={(e) => setHours(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={4} md={2} className="d-flex justify-content-end">
                <label>Plane Type : </label>
              </Col>
              <Col xs={10} md={10} className="d-flex justify-content-start">
                <ButtonGroup>
                  <ToggleButton
                    id={"1"}
                    type="radio"
                    variant="outline-success"
                    value="1"
                    onChange={(e) => planeTypes(e.target.value)}
                    checked={type === "1"}
                  >
                    Airbus A320neo
                  </ToggleButton>
                  <ToggleButton
                    id={"2"}
                    type="radio"
                    variant="outline-success"
                    value="2"
                    onChange={(e) => planeTypes(e.target.value)}
                    checked={type === "2"}
                  >
                    Boeing 737 MAX 8
                  </ToggleButton>
                  <ToggleButton
                    id={"3"}
                    type="radio"
                    variant="outline-success"
                    value="3"
                    onChange={(e) => planeTypes(e.target.value)}
                    checked={type === "3"}
                  >
                    Airbus A330-300
                  </ToggleButton>
                  <ToggleButton
                    id={"4"}
                    type="radio"
                    variant="outline-success"
                    value="4"
                    onChange={(e) => planeTypes(e.target.value)}
                    checked={type === "4"}
                  >
                    Boeing 777-300ER
                  </ToggleButton>
                  <ToggleButton
                    id={"5"}
                    type="radio"
                    variant="outline-success"
                    value="5"
                    onChange={(e) => planeTypes(e.target.value)}
                    checked={type === "5"}
                  >
                    Airbus A380-800
                  </ToggleButton>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col>
                <label>
                  Plane Type : <strong>{type}</strong>
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col>
                <label>
                  Average Passenger Count By Plane Type :{" "}
                  <strong>{passengers}</strong>
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col>
                <label>
                  Body Type : <strong>{bodyType}</strong>
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
          {/* <Col>
            <Button variant="success" as={Link} to="/train">
              &lt;&lt; Railroad Emission
            </Button>
          </Col> */}
          <Col className="d-flex justify-content-start">
            {/* <Button variant="success" as={Link} to="/">
              Back To Home
            </Button> */}
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="success" onClick={handleNavigate}>
              Aquatic Emission &gt;&gt;
            </Button>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          <Col>
            <h3 className="text-center display-6"> Journeys </h3>
          </Col>
        </Row>
        <Row style={{ width: "60vw" }}>
          {journeys.map((journey, index) => (
            <Col md={6}>
              <div
                key={index}
                class="card text-center mt-3 mb-3"
                style={{ fontSize: "15px" }}
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
                      <strong>Plane Type :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.planeType}
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

export default Plane;
