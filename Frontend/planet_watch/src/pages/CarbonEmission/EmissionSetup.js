import React, { useState, useEffect } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import Button from "react-bootstrap/Button";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

function EmissionSetup() {
  const [showPopup, setShowPopup] = useState(false);
  const [dataExist, setDataExist] = useState(false);

  const [numPeople, setNumPeople] = useState(1);
  const [bulbType, setBulbType] = useState("");
  const [bulbCount, setBulbCount] = useState("1");
  const [acBTU, setBTU] = useState("");
  const [acCount, setAcCount] = useState("1");
  const [acType, setAcType] = useState("Inverter");
  const [fridgeType, setFridgeType] = useState("1");
  const [fuelPersonal, setFuelPersonal] = useState("1");
  const [gasDuration, setGasDuration] = useState("1");

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(dataExist){
      // console.log(objectID);
      updateUserData(objectID);
    }else{
      console.log("data dosen't exist");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/emissionsetup/`);
        const existingRecord = response.data.filter(
          (record) => record.user === userfromtoken
        );
  
        if (existingRecord && existingRecord.length > 0) {
          const lastObject = getLastObjectFromArray(existingRecord);
  
          setObjectID(lastObject.id);
          setNumPeople(lastObject.people_count);
          setBulbType(lastObject.bulb_type);
          setBulbCount(lastObject.bulb_count);
          setBTU(lastObject.ac_btu);
          setAcCount(lastObject.ac_count);
          setAcType(lastObject.ac_type);
          setFridgeType(lastObject.refrigerator_power);
          setFuelPersonal(lastObject.veh_emi);
          setGasDuration(lastObject.gas_duration);
  
          setDataExist(true);
        } else {
          setDataExist(false);
        }
      } catch (error) {
        console.error(error);
        // Handle errors, e.g., show an error message to the user
      }
    };
  
    fetchData();
  }, [userfromtoken]);
  

  const updateUserData = (id) => {
    const updatedData = {
      veh_emi: parseFloat(fuelPersonal).toFixed(4),
      people_count: parseFloat(numPeople).toFixed(4),
      bulb_type: bulbType,
      bulb_count: parseFloat(bulbCount).toFixed(4),
      ac_btu: parseFloat(acBTU).toFixed(4),
      ac_count: parseFloat(acCount).toFixed(4),
      ac_type: acType,
      refrigerator_power: parseFloat(fridgeType).toFixed(4),
      gas_duration: parseFloat(gasDuration).toFixed(4),
      user: userfromtoken,
    };
    console.log(updatedData);
    axios
      .put(`http://localhost:8000/emissionsetup/${id}/`, updatedData)
      .then((response) => {
        setShowPopup(true);
        console.log("Data updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      });
  };

  // const createNewUserRecord = (data) => {
  //   axios
  //     .post("http://localhost:8000/emissionsetup/", formData)
  //     .then((response) => {
  //       console.log(response.data);
  //       // Handle success response and perform any additional actions

  //       // Redirect to another page
  //       setShowPopup(true);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       // Handle error response
  //     });
  //   console.log("Creating a new user record:", data);
  // };

  return (
    <div>
      <Header></Header>
      <Container
        className="d-flex justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="mb-3 mt-3 bg-white px-5" style={{ fontSize: "20px" }}>
          <div className="text-center mt-4 mb-4">
            <h1 class="display-5">Configure Details</h1>
          </div>

          <div className="text-center mb-4">
            <Container
            // style={{ width: "50vw" }}
            // className="border border-success border-2"
            >
              {/* <div className="text-center mt-3 mb-4">
                <h3 class="display-6">Electricity</h3>
              </div> */}
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
                  <label>Bulbs Count : </label>
                </Col>
                <Col xs={10} md={6} className="d-flex justify-content-start">
                  <input
                    type="number"
                    value={bulbCount}
                    min={0}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setBulbCount(isNaN(newValue) ? 1 : newValue);
                    }}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mb-3 mt-3">
                <Col xs={6} md={6} className="d-flex justify-content-end">
                  <label>Air Conditioner BTU : </label>
                </Col>
                <Col xs={7} md={6} className="d-flex justify-content-start">
                  <ButtonGroup>
                    <ToggleButton
                      id={"4"}
                      type="radio"
                      variant="outline-success"
                      value="800"
                      checked={parseInt(acBTU) === 800}
                      onChange={(e) => setBTU(e.target.value)}
                    >
                      800
                    </ToggleButton>
                    <ToggleButton
                      id={"5"}
                      type="radio"
                      variant="outline-success"
                      value="1200"
                      checked={parseInt(acBTU) === 1200}
                      onChange={(e) => setBTU(e.target.value)}
                    >
                      1200
                    </ToggleButton>
                    <ToggleButton
                      id={"6"}
                      type="radio"
                      variant="outline-success"
                      value="1500"
                      checked={parseInt(acBTU) === 1500}
                      onChange={(e) => setBTU(e.target.value)}
                    >
                      1500
                    </ToggleButton>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mb-3 mt-3">
                <Col xs={6} md={6} className="d-flex justify-content-end">
                  <label>Air Conditioner(s) Count : </label>
                </Col>
                <Col xs={10} md={6} className="d-flex justify-content-start">
                  <input
                    type="number"
                    value={acCount}
                    min={0}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setAcCount(isNaN(newValue) ? 1 : newValue);
                    }}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mb-3 mt-3">
                <Col xs={6} md={6} className="d-flex justify-content-end">
                  <label>Refrigerator Door Type : </label>
                </Col>
                <Col xs={7} md={6} className="d-flex justify-content-start">
                  <ButtonGroup>
                    <ToggleButton
                      id={"7"}
                      type="radio"
                      variant="outline-success"
                      value="250"
                      checked={parseInt(fridgeType) === 250}
                      onChange={(e) => setFridgeType(e.target.value)}
                    >
                      Single Door
                    </ToggleButton>
                    <ToggleButton
                      id={"8"}
                      type="radio"
                      variant="outline-success"
                      value="380"
                      checked={parseInt(fridgeType) === 380}
                      onChange={(e) => setFridgeType(e.target.value)}
                    >
                      Double Door
                    </ToggleButton>
                  </ButtonGroup>
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mb-3 mt-3">
                <Col xs={7} md={6} className="d-flex justify-content-end">
                  <label>Fuel Consumption of Personal Vehicle : </label>
                </Col>
                <Col xs={7} md={6} className="d-flex justify-content-start">
                  <input
                    type="number"
                    value={fuelPersonal}
                    min={1}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setFuelPersonal(isNaN(newValue) ? 1 : newValue);
                    }}
                  />
                </Col>
              </Row>
              <Row className="d-flex justify-content-center mb-3 mt-3">
                <Col xs={7} md={6} className="d-flex justify-content-end">
                  <label>Gas Cylinder Duration : </label>
                </Col>
                <Col xs={7} md={6} className="d-flex justify-content-start">
                  <input
                    type="number"
                    value={gasDuration}
                    min={1}
                    onChange={(e) => {
                      const newValue = parseInt(e.target.value);
                      setGasDuration(isNaN(newValue) ? 1 : newValue);
                    }}
                  />
                </Col>
              </Row>
            </Container>
          </div>
          <Row className="d-flex justify-content-center mb-3">
            <Col className="d-flex justify-content-center">
              <Button variant="success" onClick={handleSubmit}>
                Submit
              </Button>
            </Col>
          </Row>
        </div>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Data Updated</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <p>Your Data is Updated Successfully!</p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Button
                  onClick={() => setShowPopup(false)}
                  className="btn btn-success"
                >
                  Ok
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default EmissionSetup;
