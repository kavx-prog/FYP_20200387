import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axiosInstance from "../../../axios";

function Beverages() {
  const { objectID } = useParams();
  const [numPeople, setNumPeople] = useState(1);
  const [selectBeverage, setSelectedBeverages] = useState({});
  const [volume, setVolume] = useState({});

  const [data, setData] = useState(null); // Added state for fetched data
  const [loading, setLoading] = useState(true);

  const [username, setusername] = useState(true);
  const [food_emission, setfood_emission] = useState(true);
  const [beverages_emission, setbeverages_emission] = useState(true);

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
          setNumPeople(parseInt(lastObject.people_count));
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
  }, [objectID]);

  const navigate = useNavigate();

  const handleNavigate = async () => {
    try {
      await updateData(calculateTotalConsumption().toFixed(4)); // Wait for updateDB to complete
      navigate(`/carbonDash`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // window.history.forward();

    axiosInstance
      .get(`/diet/${objectID}/`)
      .then((response) => {
        setData(response.data);

        setusername(response.data.username);
        setfood_emission(response.data.food_emission);
        setbeverages_emission(response.data.beverages_emission);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [objectID]);

  const updateData = (totalEmissionnew) => {
    const updatedData = {
      username: username,
      food_emission: food_emission,
      beverages_emission: parseFloat(totalEmissionnew).toFixed(2),
    };

    axiosInstance
      .put(`/diet/${objectID}/`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const beveragesList = [
    { name: "Bottled Water", emission: 2.1 },
    { name: "Tap Water", emission: 0.005 },
    { name: "Soft Drinks", emission: 2.5 },
    { name: "Coffe", emission: 0.2 },
    { name: "Tea", emission: 0.2 },
    { name: "Milk", emission: 1.39 },
  ];

  const handelBeverageChange = (beverageName) => (event) => {
    const checked = event.target.checked;
    setSelectedBeverages((prevSelected) => {
      if (checked) {
        return {
          ...prevSelected,
          [beverageName]: true,
        };
      } else {
        const { [beverageName]: _, ...rest } = prevSelected;
        return rest;
      }
    });
  };

  const handleVolumeChange = (beverageName) => (event) => {
    const value = event.target.value;
    setVolume((prevDetails) => ({
      ...prevDetails,
      [beverageName]: parseFloat(value),
    }));
  };

  const calculateTotalConsumption = () => {
    let totalConsumption = 0;
    for (const beverage in volume) {
      for (const i in selectBeverage) {
        if (beverage === i && volume[beverage]) {
          totalConsumption +=
            (volume[beverage] *
              beveragesList.find((a) => a.name === beverage).emission) /
            numPeople;
        }
      }
    }
    return totalConsumption;
  };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="mb-3 mt-3 bg-white px-5" style={{ fontSize: "20px" }}>
        <div className="text-center mb-4">
          <h1 class="display-3">Beverages</h1>
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
                  value={numPeople}
                  min={1}
                  onChange={(e) => {
                    const newValue = parseInt(e.target.value);
                    setNumPeople(isNaN(newValue) ? 1 : newValue);
                  }}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3">
              <Col className="d-flex justify-content-center">
                <label style={{ fontSize: "25px" }}>
                  Select Beverage Items You Use
                </label>
              </Col>
            </Row>
            <Row>
              {beveragesList.map((beverage) => (
                <Col md={6}>
                  <div key={beverage.name} className="mb-3">
                    <label className="d-flex justify-content-start">
                      <input
                        type="checkbox"
                        checked={selectBeverage[beverage.name] || false}
                        onChange={handelBeverageChange(beverage.name)}
                      />
                      {beverage.name}
                    </label>
                    {selectBeverage[beverage.name] &&
                      (beverage.name === "Coffe" ||
                        beverage.name === "Tea") && (
                        <div
                          className="d-flex justify-content-start"
                          style={{ fontSize: "15px" }}
                        >
                          <label>Volume (Cups):</label>
                          <input
                            type="number"
                            value={
                              volume && volume[beverage.name] !== undefined
                                ? volume[beverage.name]
                                : "0"
                            }
                            min={0}
                            onChange={handleVolumeChange(beverage.name)}
                          />
                        </div>
                      )}
                    {selectBeverage[beverage.name] &&
                      beverage.name !== "Coffe" &&
                      beverage.name !== "Tea" && (
                        <div
                          className="d-flex justify-content-start"
                          style={{ fontSize: "15px" }}
                        >
                          <label>Volume (Liters):</label>
                          <input
                            type="number"
                            value={
                              volume && volume[beverage.name] !== undefined
                                ? volume[beverage.name]
                                : "0"
                            }
                            min={0}
                            onChange={handleVolumeChange(beverage.name)}
                          />
                        </div>
                      )}
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
        <Row className="d-flex justify-content-center mb-3 mt-3">
          <Col xs={6} md={6} className="d-flex justify-content-end">
            <p>Total Emission : </p>
          </Col>
          <Col xs={6} md={6} className="d-flex justify-content-Start">
            <p> {calculateTotalConsumption().toFixed(2)} kgCO2</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          {/* <Col>
            <Button variant="success" as={Link} to="/food">
              &lt;&lt; Food
            </Button>
          </Col> */}
          <Col className="d-flex justify-content-end">
            <Button variant="success" onClick={handleNavigate}>
              Home &gt;&gt;
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}
export default Beverages;
