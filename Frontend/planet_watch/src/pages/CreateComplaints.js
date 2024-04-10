import React, { useState } from "react";
import { Col, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

function CreateComplaints() {
  const [showPopup, setShowPopup] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const formData = {
      complaintTitle: document.getElementById("complaintTitle").value,
      fileDate: document.getElementById("fileDate").value,
      // complaintType: document.getElementById("complaintTyple").value,
      // authority: document.getElementById("authority").value,
      area: document.getElementById("area").value,
      content: document.getElementById("content").value,
    };

    // Make the API call using Axios
    axios
      .post("http://localhost:8000/complaints/", formData)
      .then((response) => {
        console.log(response.data);
        // Handle success response and perform any additional actions

        // Redirect to another page
        setShowPopup(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle error response
      });
  };

  return (
    <div>
      <Header></Header>
      <br></br>
      <Container>
        <div class="p-3 mb-2 bg-white text-dark">
          <Row>
            <h1
              style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}
            >
              File a Complaints
              <img
                src={require("../assets/images/project.png")}
                height={"90px"}
                style={{ float: "right" }}
              ></img>
            </h1>
          </Row>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Complaint Title
                </label>
                <input
                  class="form-control"
                  id="complaintTitle"
                  required
                ></input>
              </Col>
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Date
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="fileDate"
                  required
                ></input>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className="mb-3">
                  <label for="Nature of the Issue" className="form-label">
                    Nature of the Complaint
                  </label>
                  <select className="form-select" id="complaintType" required>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="Vehicle">Vehicle</option>
                    <option value="Forestry">Forestry</option>
                    <option value="Coastal">Coastal</option>
                  </select>
                </div>
              </Col>
              <Col>
                <label for="image" class="form-label">
                  Upload Images
                </label>
                <input class="form-control" type="file" id="image" multiple />
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <div className="mb-3">
                  <label for="Nature of the Issue" className="form-label">
                    Authority
                  </label>
                  <select className="form-select" id="authority" required>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option value="CEA">
                      Central Environtmental Authority
                    </option>
                    <option value="Forestry">
                      The Wildlife & Nature Protection Society
                    </option>
                    <option value="Coastal">
                      Srilanka Sustainable Energy Authority
                    </option>
                  </select>
                </div>
              </Col>
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Area
                </label>
                <input class="form-control" id="area" required></input>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Briefly explain your Complaint
                </label>
                <textarea
                  rows="3"
                  class="form-control"
                  id="content"
                  required
                ></textarea>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
              </Col>
              <Col>
                <button
                  style={{
                    float: "right",
                  }}
                  className="btn btn-dark"
                >
                  <a
                    href="/dashboard"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    Back to Dashboard
                  </a>
                </button>
              </Col>
            </Row>
          </form>
        </div>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{t("success")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="d-flex flex-column align-items-center">
              <p>Your complaint has been filed successfully!</p>
              <Link to="/dashboard">
                <button className="btn btn-success">{t("ok")}</button>
              </Link>
            </div>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default CreateComplaints;
