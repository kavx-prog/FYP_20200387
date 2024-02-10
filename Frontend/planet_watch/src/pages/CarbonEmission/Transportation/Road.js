import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const Road = () => {
  const [journeys, setJourneys] = useState([]);
  const [distance, setDistance] = useState("");
  const [method, setMethod] = useState("");
  const [passengers, setPassengers] = useState("");
  const [hVehicle, setHVehicle] = useState("");
  const [pMethod, setPMethod] = useState("");
  const [pType, setPType] = useState("");
  const [totalEmission, setTotalEmission] = useState("0");
  const [objectID, setObjectID] = useState(null);

  useEffect(() => {
    // Disable backward navigation
    window.history.forward();

    // Listen for the beforeunload event to prevent leaving the page
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const navigate = useNavigate();

  const handleNavigate = async () => {
    try {
      const newObjectID = await updateDB(); // Wait for updateDB to complete
      navigate(`/train/${newObjectID}/`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const deleteJourney = (index) => {
    const updatedJourneys = [...journeys];
    updatedJourneys.splice(index, 1);
    setJourneys(updatedJourneys);
  };

  const updateDB = () => {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8000/transportation/", {
          username: userId,
          automobile_emission: parseFloat(totalEmission).toFixed(2),
        })
        .then((response) => {
          const receivedId = response.data.id;
          setObjectID(receivedId);
          console.log("Total emission saved successfully:", receivedId);
          resolve(receivedId); // Resolve the promise with the received ID
        })
        .catch((error) => {
          console.error("Error saving total emission:", error);
          reject(error); // Reject the promise if there's an error
        });
    });
  };

  const addJourney = () => {
    let journeyEmission = 0;

    let fuelConsumptionKmpl = 0;
    let CO2PerLiter = 0;

    if (parseInt(method) === 1) {
      fuelConsumptionKmpl = 4;
      CO2PerLiter = 2.7 / parseInt(passengers);
    } else if (parseInt(method) === 2) {
      if (parseInt(hVehicle) === 1) {
        fuelConsumptionKmpl = 12;
        CO2PerLiter = 2.3;
      } else {
        if (parseInt(pMethod) === 1) {
          CO2PerLiter = 2.3;
          switch (parseInt(pType)) {
            case 1:
              fuelConsumptionKmpl = 15;
              break;
            case 2:
              fuelConsumptionKmpl = 9;
              break;
            case 3:
              fuelConsumptionKmpl = 8;
              break;
            case 4:
              fuelConsumptionKmpl = 4.9;
              break;
            case 5:
              fuelConsumptionKmpl = 35;
              break;
            case 6:
              fuelConsumptionKmpl = 50;
              break;
            default:
              break;
          }
        } else if (parseInt(pMethod) === 2) {
          CO2PerLiter = 2.68;
          switch (parseInt(pType)) {
            case 1:
              fuelConsumptionKmpl = 16.9;
              break;
            case 2:
              fuelConsumptionKmpl = 12.75;
              break;
            case 3:
              fuelConsumptionKmpl = 8;
              break;
            case 4:
              fuelConsumptionKmpl = 5;
              break;
            case 5:
              fuelConsumptionKmpl = 22.5;
              break;
            case 6:
              fuelConsumptionKmpl = 60;
              break;
            default:
              break;
          }
        }
      }
    }

    journeyEmission =
      (parseFloat(distance) * CO2PerLiter) / fuelConsumptionKmpl;

    const journey = {
      distance: parseFloat(distance),
      method: parseInt(method),
      passengers: parseInt(passengers),
      hVehicle: parseInt(hVehicle),
      pMethod: parseInt(pMethod),
      pType: parseInt(pType),
      emission: journeyEmission.toFixed(2),
    };
    setJourneys([...journeys, journey]);
    setDistance("");
    setMethod("");
    setPassengers("");
    setHVehicle("");
    setPMethod("");
    setPType("");
  };

  const validateForm = () => {
    if (!distance) {
      return false; // Distance is required
    }

    if (!method) {
      return false; // Method selection is required
    }

    if (method === "1" && !passengers) {
      return false; // Passengers are required for public transport
    }

    if (method === "2") {
      if (!hVehicle) {
        return false; // Vehicle selection is required for private transport
      }

      if (hVehicle === "2" && !pMethod) {
        return false; // Fuel type is required for rental vehicles
      }

      if (hVehicle === "2" && ["1", "2"].includes(pMethod) && !pType) {
        return false; // Vehicle type is required for certain fuel types
      }
    }

    return true; // All checks passed, form is valid
  };

  const getVehicleTypeName = (type) => {
    switch (type) {
      case 1:
        return "Car";
      case 2:
        return "Van";
      case 3:
        return "SUV";
      case 4:
        return "Commercial Vehicle";
      case 5:
        return "Threewheeler";
      case 6:
        return "Motorbike";
      default:
        return "";
    }
  };

  const calculateTotalEmission = () => {
    let totalEmission = 0;
    journeys.forEach((journey) => {
      let fuelConsumptionKmpl = 0;
      let CO2PerLiter = 0;

      if (journey.method === 1) {
        fuelConsumptionKmpl = 4;
        CO2PerLiter = 2.7 / journey.passengers;
      } else if (journey.method === 2) {
        if (journey.hVehicle === 1) {
          fuelConsumptionKmpl = 12;
          CO2PerLiter = 2.3;
        } else {
          if (journey.pMethod === 1) {
            CO2PerLiter = 2.3;
            switch (journey.pType) {
              case 1:
                fuelConsumptionKmpl = 15;
                break;
              case 2:
                fuelConsumptionKmpl = 9;
                break;
              case 3:
                fuelConsumptionKmpl = 8;
                break;
              case 4:
                fuelConsumptionKmpl = 4.9;
                break;
              case 5:
                fuelConsumptionKmpl = 35;
                break;
              case 6:
                fuelConsumptionKmpl = 50;
                break;
              default:
                break;
            }
          } else if (journey.pMethod === 2) {
            CO2PerLiter = 2.68;
            switch (journey.pType) {
              case 1:
                fuelConsumptionKmpl = 16.9;
                break;
              case 2:
                fuelConsumptionKmpl = 12.75;
                break;
              case 3:
                fuelConsumptionKmpl = 8;
                break;
              case 4:
                fuelConsumptionKmpl = 5;
                break;
              case 5:
                fuelConsumptionKmpl = 22.5;
                break;
              case 6:
                fuelConsumptionKmpl = 60;
                break;
              default:
                break;
            }
          }
        }
      }

      const journeyEmission =
        (journey.distance * CO2PerLiter) / fuelConsumptionKmpl;
      totalEmission += journeyEmission;
    });

    return totalEmission;
  };

  return (
    <Container
      className="d-flex justify-content-center "
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-3 mt-3 bg-white px-5 " style={{ fontSize: "20px" }}>
        <div className="text-center mb-4">
          <h1 class="display-3">Automobile</h1>
        </div>
        <div className="text-center mb-4">
          <h3 className="text-center display-6"> Add Journeys </h3>

          <Container className="border border-success  border-3">
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={6} md={6} className="d-flex justify-content-end">
                <label>Distance (Km) : </label>
              </Col>
              <Col xs={6} md={6} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={distance}
                  onChange={(e) => setDistance(e.target.value)}
                />
              </Col>
            </Row>

            <Row className="d-flex justify-content-center mb-3">
              <Col xs={6} md={6} className="d-flex justify-content-end">
                <label>Method :</label>
              </Col>
              <Col xs={6} md={6} className="d-flex justify-content-start">
                <ButtonGroup>
                  <ToggleButton
                    id={"1"}
                    type="radio"
                    variant="outline-success"
                    value="1"
                    checked={method === "1"}
                    onChange={() => setMethod("1")}
                  >
                    Public
                  </ToggleButton>
                  <ToggleButton
                    id={"2"}
                    type="radio"
                    variant="outline-success"
                    value="2"
                    checked={method === "2"}
                    onChange={() => setMethod("2")}
                  >
                    Private
                  </ToggleButton>
                </ButtonGroup>
              </Col>
            </Row>

            {method === "1" && (
              <Row className="d-flex justify-content-center mb-3">
                <Col xs={6} md={6} className="d-flex justify-content-end">
                  <label>Average Passenger Count :</label>
                </Col>
                <Col xs={6} md={6} className="d-flex justify-content-start">
                  <input
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                  />
                </Col>
              </Row>
            )}

            {method === "2" && (
              <Row className="justify-content-center">
                <Row className="d-flex justify-content-center mb-3 mt-3">
                  <Col xs={6} md={6} className="d-flex justify-content-end">
                    <label>Vehicle Ownership : </label>
                  </Col>
                  <Col xs={6} md={6} className="d-flex justify-content-start">
                    <ButtonGroup>
                      <ToggleButton
                        id={"3"}
                        type="radio"
                        variant="outline-success"
                        value="1"
                        checked={hVehicle === "1"}
                        onChange={() => setHVehicle("1")}
                      >
                        Personal
                      </ToggleButton>
                      <ToggleButton
                        id={"4"}
                        type="radio"
                        variant="outline-success"
                        value="2"
                        checked={hVehicle === "2"}
                        onChange={() => setHVehicle("2")}
                      >
                        Rental
                      </ToggleButton>
                    </ButtonGroup>
                  </Col>
                </Row>
                {hVehicle === "2" && (
                  <div>
                    <Row className="d-flex justify-content-center mb-3 mt-3">
                      <Col xs={6} md={6} className="d-flex justify-content-end">
                        <label>Fuel Type :</label>
                      </Col>
                      <Col
                        xs={6}
                        md={6}
                        className="d-flex justify-content-start"
                      >
                        <ButtonGroup>
                          <ToggleButton
                            id={"5"}
                            type="radio"
                            variant="outline-success"
                            value="1"
                            checked={pMethod === "1"}
                            onChange={() => setPMethod("1")}
                          >
                            Petrol
                          </ToggleButton>
                          <ToggleButton
                            id={"6"}
                            type="radio"
                            variant="outline-success"
                            value="2"
                            checked={pMethod === "2"}
                            onChange={() => setPMethod("2")}
                          >
                            Diesel
                          </ToggleButton>
                        </ButtonGroup>
                      </Col>
                    </Row>
                    {["1", "2"].includes(pMethod) && (
                      <Row className="d-flex justify-content-center mb-3 mt-4">
                        <Col
                          xs={4}
                          md={4}
                          className="d-flex justify-content-end"
                        >
                          <label>Vehicle Type : </label>
                        </Col>
                        <Col
                          xs={12}
                          md={8}
                          className="d-flex justify-content-start"
                        >
                          <ButtonGroup>
                            <ToggleButton
                              id={"7"}
                              type="radio"
                              variant="outline-success"
                              value="1"
                              checked={pType === "1"}
                              onChange={() => setPType("1")}
                            >
                              Car
                            </ToggleButton>
                            <ToggleButton
                              id={"8"}
                              type="radio"
                              variant="outline-success"
                              value="2"
                              checked={pType === "2"}
                              onChange={() => setPType("2")}
                            >
                              Van
                            </ToggleButton>
                            <ToggleButton
                              id={"9"}
                              type="radio"
                              variant="outline-success"
                              value="3"
                              checked={pType === "3"}
                              onChange={() => setPType("3")}
                            >
                              SUV
                            </ToggleButton>
                            <ToggleButton
                              id={"10"}
                              type="radio"
                              variant="outline-success"
                              value="4"
                              checked={pType === "4"}
                              onChange={() => setPType("4")}
                            >
                              Commercial Vehicle
                            </ToggleButton>
                            <ToggleButton
                              id={"11"}
                              type="radio"
                              variant="outline-success"
                              value="5"
                              checked={pType === "5"}
                              onChange={() => setPType("5")}
                            >
                              Threewheeler
                            </ToggleButton>
                            <ToggleButton
                              id={"12"}
                              type="radio"
                              variant="outline-success"
                              value="6"
                              checked={pType === "6"}
                              onChange={() => setPType("6")}
                            >
                              Motorbike
                            </ToggleButton>
                          </ButtonGroup>
                        </Col>
                      </Row>
                    )}
                  </div>
                )}
              </Row>
            )}
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
              onClick={() => setTotalEmission(calculateTotalEmission())}
            >
              Calculate Total Emission
            </Button>
          </Col>
          <Col xs={6} md={6} className="d-flex justify-content-end">
            <p>Total Emission: {parseFloat(totalEmission).toFixed(4)} kgCO2</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          <Col>
            <Button variant="success" as={Link} to="/main">
              &lt;&lt; Go Back To Home
            </Button>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="success" onClick={handleNavigate}>
              Railroad Emission &gt;&gt;
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
                      <strong>Distance :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.distance} Km
                    </Col>
                  </Row>
                  <Row className="d-flex justify-content-center mb-3">
                    <Col className="d-flex justify-content-end">
                      <strong>Method :</strong>
                    </Col>
                    <Col className="d-flex justify-content-start">
                      {journey.method === 1 ? "Public" : "Private"}
                    </Col>
                  </Row>
                  {journey.method === 1 && (
                    <Row className="d-flex justify-content-center mb-3">
                      <Col className="d-flex justify-content-end">
                        <strong>Passengers :</strong>
                      </Col>
                      <Col className="d-flex justify-content-start">
                        {journey.passengers}
                      </Col>
                    </Row>
                  )}
                  {journey.method === 2 && (
                    <div>
                      <Row className="d-flex justify-content-center mb-3">
                        <Col className="d-flex justify-content-end">
                          <strong>Vehicle Type :</strong>
                        </Col>
                        <Col className="d-flex justify-content-start">
                          {journey.hVehicle === 1 ? "Personal" : "Rental"}
                        </Col>
                      </Row>
                      {journey.hVehicle === 2 && (
                        <div>
                          <Row className="d-flex justify-content-center mb-3">
                            <Col className="d-flex justify-content-end">
                              <strong>Fuel Type :</strong>
                            </Col>
                            <Col className="d-flex justify-content-start">
                              {journey.pMethod === 1 ? "Petrol" : "Diesel"}
                            </Col>
                          </Row>
                          <Row className="d-flex justify-content-center mb-3">
                            <Col className="d-flex justify-content-end">
                              <strong>Vehicle Type :</strong>
                            </Col>
                            <Col className="d-flex justify-content-start">
                              {getVehicleTypeName(journey.pType)}
                            </Col>
                          </Row>
                        </div>
                      )}
                    </div>
                  )}
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

export default Road;
