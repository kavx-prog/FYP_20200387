import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode";

function Food() {
  const [numPeople, setNumPeople] = useState(1);
  const [selectedFood, setSelectedFood] = useState({});
  const [quantity, setQuantity] = useState({});
  const [objectID, setObjectID] = useState(null);

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

  const navigate = useNavigate();

  const handleNavigate = async () => {
    try {
      const newObjectID = await updateDB((calculateTotalConsumption()).toFixed(4)); // Wait for updateDB to complete
      navigate(`/beverages/${newObjectID}/`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateDB = (totalConsumption) => {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:8000/diet/", {
          username: userId,
          food_emission: (parseFloat(totalConsumption).toFixed(2)),
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

  const foodList = [
    { name: "Red Meat", emission: 6.9 },
    { name: "Chicken", emission: 3.9 },
    { name: "Fish", emission: 1.8 },
    { name: "Cheese", emission: 13.6 },
    { name: "Yogurt", emission: 6.9 },
    { name: "Butter", emission: 2.8 },
    { name: "Cream", emission: 2.6 },
    { name: "Ice cream", emission: 20.4 },
    { name: "Plant Based Food", emission: 2.03 },
    { name: "Biscuits", emission: 1.7 },
    { name: "Chips", emission: 2.2 },
    { name: "Cookies", emission: 1.8 },
    { name: "Chocolate", emission: 2.1 },
  ];

  const handleFoodChange = (foodName) => (event) => {
    const checked = event.target.checked;
    setSelectedFood((prevSelected) => {
      if (checked) {
        return {
          ...prevSelected,
          [foodName]: true,
        };
      } else {
        const { [foodName]: _, ...rest } = prevSelected;
        return rest;
      }
    });
  };

  const handleQuantityChange = (foodName) => (event) => {
    const value = event.target.value;
    setQuantity((prevDetails) => ({
      ...prevDetails,
      [foodName]: parseFloat(value),
    }));
  };

  const calculateTotalConsumption = () => {
    let totalConsumption = 0;
    for (const food in quantity) {
      for (const i in selectedFood) {
        if (food === i && quantity[food]) {
          totalConsumption +=
            (quantity[food] * foodList.find((a) => a.name === food).emission) /
            numPeople;
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
          <h1 class="display-3">Food</h1>
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
                  Select Food Items You Use
                </label>
              </Col>
            </Row>
            <Row>
              {foodList.map((food) => (
                <Col md={6}>
                  <div key={food.name} className="mb-3">
                    <label className="d-flex justify-content-start">
                      <input
                        type="checkbox"
                        checked={selectedFood[food.name] || false}
                        onChange={handleFoodChange(food.name)}
                      />
                      {food.name}
                    </label>
                    {selectedFood[food.name] && (
                      <div
                        className="d-flex justify-content-start"
                        style={{ fontSize: "15px" }}
                      >
                        <label>Quantity (kg):</label>
                        <input
                          type="number"
                          value={
                            quantity && quantity[food.name] !== undefined
                              ? quantity[food.name]
                              : ""
                          }
                          onChange={handleQuantityChange(food.name)}
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
            <Button variant="success" as={Link} to="/main">
              &lt;&lt; Back To Home
            </Button>
          </Col> */}
          <Col className="d-flex justify-content-end">
            <Button variant="success" onClick={handleNavigate}>
              Beverages &gt;&gt;
            </Button>
          </Col>
        </Row>
      </div>
    </Container>
  );
}

export default Food;
