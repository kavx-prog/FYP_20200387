import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axiosInstance from "../../../axios";

function Energy() {
  const [numPeople, setNumPeople] = useState(1);
  const [selectedAppliances, setSelectedAppliances] = useState({});
  const [usageDetails, setUsageDetails] = useState({});
  const [bulbType, setBulbType] = useState("");
  const [acBTU, setBTU] = useState("");
  const [acCount, setAcCount] = useState("1");
  const [bulbCount, setBulbCount] = useState("1");
  const [bulbTime, setBulbTime] = useState("1");
  const [FridgePower, setFridgepower] = useState(1500);
  const [objectID, setObjectID] = useState(null);

  const token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(token);
  const userfromtoken = decodedToken.user_id;

  function getLastObjectFromArray(jsonArray) {
    if (jsonArray && jsonArray.length > 0) {
      return jsonArray[jsonArray.length - 1];
    } else {
      return null;
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/emissionsetup/`
        );
        const existingRecord = response.data.filter(
          (record) => record.user === userfromtoken
        );

        if (existingRecord && existingRecord.length > 0) {
          const lastObject = getLastObjectFromArray(existingRecord);
          setNumPeople(lastObject.people_count);
          setBulbType(lastObject.bulb_type);
          setBulbCount(lastObject.bulb_count);
          setBTU(lastObject.ac_btu);
          setAcCount(parseInt(lastObject.ac_count));
          setFridgepower(parseInt(lastObject.refrigerator_power));
        } else {
          // setDataExist(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [userfromtoken]);

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
      const newObjectID = await updateDB(
        (calculateTotalConsumption() * 0.71).toFixed(4)
      ); // Wait for updateDB to complete
      navigate(`/waterAndGas/${newObjectID}/`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateDB = (totalConsumption) => {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/energy/", {
          username: userId,
          electricity_emission: parseFloat(totalConsumption).toFixed(2),
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

  const applianceList = [
    { name: "Refrigerator", power: FridgePower },
    { name: "Air Conditioner", power: 1200 },
    { name: "Microwave Oven", power: 1200 },
    { name: "Rice Cooker", power: 400 },
    { name: "Toaster", power: 1100 },
    { name: "Blender", power: 750 },
    { name: "Vacuum Cleaner", power: 1400 },
    { name: "Iron", power: 1400 },
    { name: "Hair Dryer", power: 1800 },
    { name: "Electric Kettle", power: 1500 },
    { name: "Fan", power: 39.3 },
    { name: "TV", power: 100 },
    { name: "Computer", power: 280 },
  ];

  const handleApplianceChange = (applianceName) => (event) => {
    const checked = event.target.checked;
    setSelectedAppliances((prevSelected) => {
      if (checked) {
        return {
          ...prevSelected,
          [applianceName]: true,
        };
      } else {
        const { [applianceName]: _, ...rest } = prevSelected;
        return rest;
      }
    });
  };

  const handleUsageChange = (applianceName) => (event) => {
    const value = event.target.value;
    setUsageDetails((prevDetails) => ({
      ...prevDetails,
      [applianceName]: parseFloat(value),
    }));
  };

  const calculateTotalConsumption = () => {
    let totalConsumption = 0;

    if (bulbType === "LED") {
      totalConsumption += (0.006 * bulbCount * bulbTime) / numPeople;
    }
    if (bulbType === "CFL") {
      totalConsumption += (0.019 * bulbCount * bulbTime) / numPeople;
    }
    if (bulbType === "Tungsten") {
      totalConsumption += (0.0625 * bulbCount * bulbTime) / numPeople;
    }

    for (const i in selectedAppliances) {
      if (i === "Refrigerator") {
        totalConsumption += FridgePower / (1000 * numPeople);
      }
    }

    for (const appliance in usageDetails) {
      for (const i in selectedAppliances) {
        if (appliance === i && usageDetails[appliance]) {
          if (appliance === "Air Conditioner") {
            totalConsumption +=
              (acBTU * acCount * usageDetails[appliance]) / 10000 / numPeople;
          } else {
            totalConsumption +=
              (usageDetails[appliance] *
                applianceList.find((a) => a.name === appliance).power) /
              1000 /
              numPeople; // Convert to kWh
          }
        }
      }
    }
    return totalConsumption;
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="mb-3 mt-3 bg-white px-5" style={{ fontSize: "20px" }}>
        <div className="text-center mb-4">
          <h1 class="display-3">Electricity</h1>
        </div>

        <div className="text-center mb-4">
          <Container
            style={{ width: "50vw" }}
            className="border border-success  border-3"
          >
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={7} md={6} className="d-flex justify-content-end">
                <label>Number of People : </label>
              </Col>
              <Col xs={7} md={6} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={parseInt(numPeople)}
                  min={1}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    setNumPeople(isNaN(newValue) ? 1 : newValue);
                  }}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={6} md={6} className="d-flex justify-content-end">
                <label>Bulb Type : </label>
              </Col>
              <Col xs={7} md={6} className="d-flex justify-content-start">
                <ButtonGroup>
                  <ToggleButton
                    id={"1"}
                    type="radio"
                    variant="outline-success"
                    value="LED"
                    checked={bulbType === "LED"}
                    onChange={(e) => setBulbType(e.target.value)}
                  >
                    LED
                  </ToggleButton>
                  <ToggleButton
                    id={"2"}
                    type="radio"
                    variant="outline-success"
                    value="CFL"
                    checked={bulbType === "CFL"}
                    onChange={(e) => setBulbType(e.target.value)}
                  >
                    CFL
                  </ToggleButton>
                  <ToggleButton
                    id={"3"}
                    type="radio"
                    variant="outline-success"
                    value="Tungsten"
                    checked={bulbType === "Tungsten"}
                    onChange={(e) => setBulbType(e.target.value)}
                  >
                    Tungsten
                  </ToggleButton>
                </ButtonGroup>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={6} md={6} className="d-flex justify-content-end">
                <label>Duration(Hours) : </label>
              </Col>
              <Col xs={7} md={6} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={bulbTime}
                  min={0}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    setBulbTime(isNaN(newValue) ? 1 : newValue);
                  }}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={6} md={6} className="d-flex justify-content-end">
                <label>Bulbs Count : </label>
              </Col>
              <Col xs={10} md={6} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={parseInt(bulbCount)}
                  min={0}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    setBulbCount(isNaN(newValue) ? 1 : newValue);
                  }}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Container
          style={{ width: "50vw" }}
          className="border border-success  border-3"
        >
          <Row className="d-flex justify-content-center mb-3">
            <Col className="d-flex justify-content-center">
              <label style={{ fontSize: "25px" }}>Select Appliances</label>
            </Col>
          </Row>
          <Row>
            {applianceList.map((appliance) => (
              <Col md={6}>
                <div key={appliance.name} className="mb-3">
                  <label>
                    <input
                      type="checkbox"
                      checked={selectedAppliances[appliance.name] || false}
                      onChange={handleApplianceChange(appliance.name)}
                    />
                    {appliance.name}
                  </label>
                  {selectedAppliances[appliance.name] &&
                    appliance.name !== "Refrigerator" && (
                      <div style={{ fontSize: "15px" }}>
                        <label>Usage (hours/day) : </label>
                        <input
                          type="number"
                          // min={1}
                          value={
                            usageDetails &&
                            usageDetails[appliance.name] !== undefined
                              ? usageDetails[appliance.name]
                              : ""
                          }
                          onChange={handleUsageChange(appliance.name)}
                        />
                      </div>
                    )}
                  {selectedAppliances[appliance.name] &&
                    appliance.name === "Air Conditioner" && (
                      <div style={{ fontSize: "15px" }}>
                        <label>BTU : </label>
                        <ButtonGroup>
                          <ToggleButton
                            id={"4"}
                            type="radio"
                            variant="outline-success"
                            value="5000"
                            checked={parseInt(acBTU) === 5000}
                            onChange={() => setBTU("5000")}
                          >
                            5,000
                          </ToggleButton>
                          <ToggleButton
                            id={"5"}
                            type="radio"
                            variant="outline-success"
                            value="10000"
                            checked={parseInt(acBTU) === 10000}
                            onChange={() => setBTU("10000")}
                          >
                            10,000
                          </ToggleButton>
                          <ToggleButton
                            id={"6"}
                            type="radio"
                            variant="outline-success"
                            value="12000"
                            checked={parseInt(acBTU) === 12000}
                            onChange={() => setBTU("12000")}
                          >
                            12,000
                          </ToggleButton>
                          <ToggleButton
                            id={"7"}
                            type="radio"
                            variant="outline-success"
                            value="18000"
                            checked={parseInt(acBTU) === 18000}
                            onChange={() => setBTU("18000")}
                          >
                            18,000
                          </ToggleButton>
                          <ToggleButton
                            id={"8"}
                            type="radio"
                            variant="outline-success"
                            value="24000"
                            checked={parseInt(acBTU) === 24000}
                            onChange={() => setBTU("24000")}
                          >
                            24,000
                          </ToggleButton>
                        </ButtonGroup>
                        <div>
                          <label>Number Of Air Conditioners:</label>
                          <input
                            type="number"
                            value={acCount}
                            onChange={(e) => setAcCount(e.target.value)}
                          />
                        </div>
                      </div>
                    )}
                </div>
              </Col>
            ))}
          </Row>
        </Container>

        <Row className="d-flex justify-content-center mb-3 mt-3">
          <Col xs={6} md={6} className="d-flex justify-content-end">
            <p>Total Electricity Consumption : </p>
          </Col>
          <Col xs={6} md={6} className="d-flex justify-content-start">
            <p> {calculateTotalConsumption().toFixed(4)} kWh/day</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          <Col xs={6} md={6} className="d-flex justify-content-end">
            <p>Total Emission : </p>
          </Col>
          <Col xs={6} md={6} className="d-flex justify-content-start">
            <p>{(calculateTotalConsumption() * 0.71).toFixed(4)} kgCO2</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          {/* <Col>
            <Button variant="success" as={Link} to="/main">
              &lt;&lt; Back To Home
            </Button>
          </Col> */}
          <Col className="d-flex justify-content-start">
            <Link to="/carbonDash">
              <Button variant="success">&lt;&lt; Go Back To Home</Button>
            </Link>
          </Col>
          <Col className="d-flex justify-content-end">
            <Button variant="success" onClick={handleNavigate}>
              Water And Gas Emission &gt;&gt;
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Energy;
