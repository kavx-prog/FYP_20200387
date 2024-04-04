import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom"; // Import useParams from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axiosInstance from "../../../axios";

const Train = () => {
  const { objectID } = useParams();
  const [journeys, setJourneys] = useState([]);
  const [distance, setDistance] = useState("");
  const [passengers, setPassengers] = useState("0");
  const [totalRailEmission, setTotalEmission] = useState("0");
  const [data, setData] = useState(null); // Added state for fetched data
  const [loading, setLoading] = useState(true); // Added loading state

  const [username, setusername] = useState(true);
  const [automobile_emission, setautomobile_emission] = useState(true);
  const [railway_emission, setrailway_emission] = useState(true);
  const [aquatic_emission, setaquatic_emission] = useState(true);

  const [aviation, setaviation] = useState(true);

  // const [objectID, setObjectID] = useState(null);

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/plane/${objectID}/`);
  };

  useEffect(() => {
    // Disable backward navigation
    window.history.forward();

    // Listen for the beforeunload event to prevent leaving the page
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = '';
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    // window.history.forward();

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
      username:username,
      automobile_emission: automobile_emission,
      railway_emission: parseFloat(totalRailEmissionnew).toFixed(2),
      aquatic_emission: aquatic_emission,
      aviation: aviation,
    };

    axiosInstance.put(`/transportation/${objectID}/`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const addJourney = () => {
    let journeyEmission = 0;

    let fuelConsumptionKmpl = 0.25;
    let CO2PerLiter = 2.68;

    journeyEmission =
      (parseFloat(distance) * CO2PerLiter) / (fuelConsumptionKmpl * parseInt(passengers));

    const journey = {
      distance: parseFloat(distance),
      passengers: parseInt(passengers),
      emission: journeyEmission.toFixed(2),
    };
    setJourneys([...journeys, journey]);
    setDistance("");

  };

  const validateForm = () => {
    if (!distance) {
      return false; // Distance is required
    }

    if (!passengers) {
      return false; // Method selection is required
    }

    return true; // All checks passed, form is valid
  };

  const calculateTotalEmissionhandler = () => {

    const totalRailEmissionnew = calculateTotalEmission();
    setTotalEmission(totalRailEmissionnew);

    console.log(parseFloat(totalRailEmissionnew).toFixed(2))
    updateData(totalRailEmissionnew);
  }

  const calculateTotalEmission = () => {
    let totalRailEmission = 0;
    journeys.forEach((journey) => {
      let fuelConsumptionKmpl = 0.25;
      let CO2PerLiter = 2.68;

      const journeyEmission =
        (journey.distance * CO2PerLiter) /
        (fuelConsumptionKmpl * journey.passengers);
      totalRailEmission += journeyEmission;
    });
    setTotalEmission(totalRailEmission)
    return totalRailEmission;
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-3 mt-3 bg-white px-5" style={{ fontSize: "20px" }}>
        <div className="text-center mb-4">
          <h1 class="display-3">Railroad</h1>
        </div>

        <div className="text-center mb-4">
          <h3 className="text-center display-6"> Add Journeys </h3>

          <Container className="border border-success  border-3">
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={6} md={4} className="d-flex justify-content-end">
                <label>Distance (Km) : </label>
              </Col>
              <Col xs={7} md={8} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={4} md={4} className="d-flex justify-content-end">
                <label>Trian Type : </label>
              </Col>
              <Col xs={10} md={8} className="d-flex justify-content-start">
                <ButtonGroup>
                  <ToggleButton
                    id={"1"}
                    type="radio"
                    variant="outline-success"
                    value="150"
                    onChange={(e) => setPassengers(e.target.value)}
                    checked={passengers === "150"}
                  >
                    Commuter
                  </ToggleButton>
                  <ToggleButton
                    id={"2"}
                    type="radio"
                    variant="outline-success"
                    value="250"
                    onChange={(e) => setPassengers(e.target.value)}
                    checked={passengers === "250"}
                  >
                    Regional
                  </ToggleButton>
                  <ToggleButton
                    id={"3"}
                    type="radio"
                    variant="outline-success"
                    value="350"
                    onChange={(e) => setPassengers(e.target.value)}
                    checked={passengers === "350"}
                  >
                    Intercity
                  </ToggleButton>
                  <ToggleButton
                    id={"4"}
                    type="radio"
                    variant="outline-success"
                    value="450"
                    onChange={(e) => setPassengers(e.target.value)}
                    checked={passengers === "450"}
                  >
                    Express
                  </ToggleButton>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={8} md={8} className="d-flex justify-content-end">
                <label>Average Passenger Count Based On Train Type: </label>
              </Col>
              <Col xs={3} md={4} className="d-flex justify-content-start">
                <label>{passengers} Passengers</label>
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
            <p>Total Emission: {parseFloat(totalRailEmission).toFixed(4)} kgCO2</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          {/* <Col>
            <Button variant="success" as={Link} to="/road">
              &lt;&lt; Automobile Emission
            </Button>
          </Col> */}
          {/* <Col className="d-flex justify-content-start">
            <Button variant="success" as={Link} to="/main">
              Back To Home
            </Button>
          </Col> */}
          <Col className="d-flex justify-content-end">
            <Button variant="success" onClick={handleNavigate}>
              Aviation Emission &gt;&gt;
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
                style={{ fontSize: "15px" }}
              >
                <div class="card-header">Journey No.{index + 1}</div>
                <div class="card-body">
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="d-flex justify-content-end">
                      <strong>Distance :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.distance} Km
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

export default Train;
