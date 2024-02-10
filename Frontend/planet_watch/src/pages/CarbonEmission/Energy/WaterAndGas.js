import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

function WaterAndGas() {
  const { objectID } = useParams();
  const [numPeople, setNumPeople] = useState(1);
  const [waterVol, setWaterVol] = useState("");
  const [gasDuration, setgasDuration] = useState("");

  const [data, setData] = useState(null); // Added state for fetched data
  const [loading, setLoading] = useState(true);

  const [username, setusername] = useState(true);
  const [electricity_emission, setelectricity_emission] = useState(true);
  const [waterandgas_emission, setwaterandgas_emission] = useState(true);

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

    axios
      .get(`http://localhost:8000/energy/${objectID}/`)
      .then((response) => {
        setData(response.data);

        setusername(response.data.username);
        setelectricity_emission(response.data.electricity_emission);
        setwaterandgas_emission(response.data.waterandgas_emission);


        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [objectID]);

  const updateData = (totalEmissionnew) => {
    const updatedData = {
      username:username,
      electricity_emission: electricity_emission,
      waterandgas_emission: parseFloat(totalEmissionnew).toFixed(2),
    };

    axios.put(`http://localhost:8000/energy/${objectID}/`, updatedData)
      .then((response) => {
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  const calculateTotalConsumption = () => {
    let totalConsumption = 0;

    if (gasDuration !== null && gasDuration > 0) {
      totalConsumption += 11.2 / (gasDuration * numPeople);
    }

    totalConsumption += (0.005 * waterVol) / numPeople;

    return totalConsumption;
  };

  // const updateDB = (totalConsumption) => {
  //   return new Promise((resolve, reject) => {
  //     axios
  //       .post("http://localhost:8000/energy/", {
  //         username: "llll",
  //         electricity_emission: (parseFloat(totalConsumption).toFixed(2)),
  //       })
  //       .then((response) => {
  //         const receivedId = response.data.id;
  //         setObjectID(receivedId);
  //         console.log("Total emission saved successfully:", receivedId);
  //         resolve(receivedId); // Resolve the promise with the received ID
  //       })
  //       .catch((error) => {
  //         console.error("Error saving total emission:", error);
  //         reject(error); // Reject the promise if there's an error
  //       });
  //   });
  // };

  return (
    <Container
      className="d-flex justify-content-center"
      style={{ minHeight: "80vh" }}
    >
      <div className="mb-3 mt-3 bg-white px-5" style={{ fontSize: "20px" }}>
        <div className="text-center mb-4">
          <h1 class="display-3">Water And Gas</h1>
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
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={7} md={6} className="d-flex justify-content-end">
                <label>Water Usage (Liters) : </label>
              </Col>
              <Col xs={7} md={6} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={waterVol !== undefined ? waterVol : "0"}
                  onChange={(e) => setWaterVol(e.target.value)}
                />
              </Col>
            </Row>
            <Row className="d-flex justify-content-center mb-3 mt-3">
              <Col xs={7} md={6} className="d-flex justify-content-end">
                <label>Gas Cylinder Duration (Days) : </label>
              </Col>
              <Col xs={7} md={6} className="d-flex justify-content-start">
                <input
                  type="number"
                  value={gasDuration !== undefined ? gasDuration : "0"}
                  onChange={(e) => setgasDuration(e.target.value)}
                />
              </Col>
            </Row>
          </Container>
        </div>
        <Row className="d-flex justify-content-center mb-3">
          <Col xs={6} md={6} className="d-flex justify-content-end">
            <p>Total Emission : </p>
          </Col>
          <Col xs={6} md={6} className="d-flex justify-content-start">
            <p>{calculateTotalConsumption().toFixed(4)} kgCO2</p>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mb-3">
          {/* <Col>
            <Button variant="success" as={Link} to="/energy">
              &lt;&lt; Electricity Emission
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

export default WaterAndGas;
