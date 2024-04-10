import React, { useState, useEffect } from "react";
import axios from "axios";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";
import "../assets/styles/locDropdown.css";

const LocationDropdown = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [map, setMap] = useState(null);
  const googleMapsApiKey = "AIzaSyAM7fsnOFQ-z7tYeJSUeVeGLvyHHLfJgYg"; 

  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/location/") // Change the URL to your API endpoint
      .then((response) => {
        setLocations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching locations:", error);
      });
  }, []);

  const handleLocationSelect = (event) => {
    const selectedIndex = event.target.selectedIndex;
    const selectedLocation = locations[selectedIndex - 1]; // Adjust the index as the first option is "Select a location"
    setSelectedLocation(selectedLocation);
  };

  // Define map options
  const mapOptions = {
    center: selectedLocation
      ? {
          lat: parseFloat(selectedLocation.latitude),
          lng: parseFloat(selectedLocation.longitude),
        }
      : { lat: 7.8731, lng: 80.7718 },
    zoom: 8, // Adjust the initial zoom level as needed
  };

  return (
    <div>
      <Header></Header>
      <br></br>
      <Container>
        <center>
          <div className="bg-white text-dark" style={{ height: "840px" }}>
            <h1 style={{ textTransform: "uppercase" }}>
            {t("s_location")}
              <img
                src={require("../assets/images/diet.png")}
                height={"70px"}
                style={{ float: "right" }}
              ></img>
            </h1>
            <Row className="justify-content-center">
              <Col>
                <label className="mr-2">
                  {t("s_location_r")} : {" "}
                </label>
                <select className="location-dropdown" onChange={handleLocationSelect}>
                  <option value="">Location</option>
                  {locations.map((location) => (
                    <option key={location.locationName} value={location.locationName}>
                      {location.locationName}
                    </option>
                  ))}
                </select>
              </Col>
              <Col xs="auto">
                <Link to="/freefood" style={{ textDecoration: "none" }}>
                  <Button type="submit" className="btn btn-dark">
                    {t("add_r")}
                  </Button>
                </Link>
              </Col>
            </Row>
            <br />
            <div style={{ height: "400px", width: "100%", flex: 1 }}>
              <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                  mapContainerStyle={{ width: "90%", height: "700px" }}
                  center={mapOptions.center}
                  zoom={mapOptions.zoom}
                  onLoad={(map) => setMap(map)}
                >
                  {selectedLocation && (
                    <Marker
                      position={{
                        lat: parseFloat(selectedLocation.latitude),
                        lng: parseFloat(selectedLocation.longitude),
                      }}
                      title={selectedLocation.locationName}
                    />
                  )}
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </center>
      </Container>
      <br />
      <Footer></Footer>
    </div>
  );
};

export default LocationDropdown;
