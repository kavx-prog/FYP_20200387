import React, { useState } from "react";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import axios from "axios";
import { Container, Form, Button, Row, Col, Modal } from "react-bootstrap";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { BrowserRouter as Router, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function LocationForm({ onLocationSubmit }) {
  const [locationName, setLocationName] = useState("");
  const [city, setCity] = useState("");
  const [description, setDescription] = useState("");
  const [latitude, setMarkerPositionlan] = useState();
  const [longitude, setMarkerPositionlng] = useState();

  const [showPopup, setShowPopup] = useState(false);

  const { t } = useTranslation();

  const handleMapClick = (e) => {
    setMarkerPositionlan(parseFloat(e.latLng.lat().toFixed(6))); // Round to 6 decimals
    setMarkerPositionlng(parseFloat(e.latLng.lng().toFixed(6)));
    // Update the Marker position with the clicked coordinates
    setPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
  };
 
  const [position, setPosition] = useState({ lat: 7.8731, lng: 80.7718 });

  const mcenter = {
    lat: 7.8731,
    lng: 80.7718,
  };
  const location = {
    locationName,
    city,
    description,
    latitude,
    longitude,
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/locations/", location)
      .then(() => {
        setShowPopup(true);
      })
      .catch((err) => {
        console.log(err.message);
      });
    // onLocationSubmit({ locationName, city, description , markerPosition});
  };

  return (
    <div>
      <Header></Header>
      <br></br>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <Container>
            <div className="bg-white text-dark">
              <h1 style={{ textTransform: "uppercase" }}>
                {t("add_r_l")}
                <img
                  src={require("../assets/images/loc.png")}
                  height={"60px"}
                  style={{ float: "right" }}
                ></img>
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "88vh",
                }}
              >
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Form.Group controlId="locationName">
                        <Form.Label>{t("loc_name")} : </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Show on the map"
                          value={locationName}
                          onChange={(e) => setLocationName(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="city">
                        <Form.Label>{t("city")} : </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="City"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Form.Group controlId="description">
                    <Form.Label>{t("Description")} : </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      placeholder="Type the resources you have"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </Form.Group>
                  <br />
                  <Row>
                    <Col>
                      <Form.Group controlId="latitude">
                        <Form.Label>{t("Latitude")} : </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Latitude"
                          value={latitude}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="longitude">
                        <Form.Label>{t("Longitude")} : </Form.Label>
                        <Form.Control
                          type="text"
                          placeholder="Longitude"
                          value={longitude}
                          readOnly
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <br />
                  <Button type="submit" className="btn btn-success">
                    {t("submit")}
                  </Button>
                </Form>
              </div>
            </div>
            <Modal show={showPopup} onHide={() => setShowPopup(false)}>
              <Modal.Header closeButton>
                <Modal.Title>{t("success")}</Modal.Title>
              </Modal.Header>
              <Modal.Body className="text-center">
                <div className="d-flex flex-column align-items-center">
                  <p>{t("success_m")}</p>
                  <br></br>
                  <Link to="/locshow">
                    <button className="btn btn-success">{t("ok")}</button>
                  </Link>
                </div>
              </Modal.Body>
            </Modal>
          </Container>
        </div>
        <div style={{ flex: 1 }}>
          <LoadScript googleMapsApiKey="AIzaSyAM7fsnOFQ-z7tYeJSUeVeGLvyHHLfJgYg">
            <GoogleMap
              mapContainerStyle={{ width: "90%", height: "700px" }}
              center={{ lat: 7.8731, lng: 80.7718 }}
              zoom={8}
              onClick={handleMapClick}
            >
              <Marker
                position={position} // use state variable 'position' here
    clickable={true}
    draggable={true}
    onClick={handleMapClick}
              />
            </GoogleMap>
          </LoadScript>
        </div>
      </div>

      <br />
      <Footer></Footer>
    </div>
  );
}

export default LocationForm;
