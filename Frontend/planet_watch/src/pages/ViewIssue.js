import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function ViewIssue() {
  const { t } = useTranslation();

  const { rowId } = useParams();
  const [issueDetails, setIssueDetails] = useState(null);

  useEffect(() => {
    // Fetch data based on rowId
    axios
      .get(`http://localhost:8000/issues/${rowId}`)
      .then((response) => {
        // Set the issue details
        setIssueDetails(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [rowId]);

  if (!issueDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header></Header>
      <br></br>
      <Container>
        <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            {t("view_issue")}
            <img
              src={require("../assets/images/question.jpg")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
          <br></br>
          <div>
            <Container
              style={{ backgroundColor: "#E9FFE7", borderColor: "#B3FF84" }}
            >
              {" "}
              <br></br>
              <Row class="d-flex justify-content-center">
                <Col>
                  <label
                    for="Nature of the Issue"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    {t("noft")} :
                  </label>
                </Col>
                <Col>
                  <label
                    for="Nature of the Issue"
                    className="form-label"
                    style={{}}
                  >
                    {issueDetails.issueName}
                  </label>
                </Col>
              </Row>
              <Row class="d-flex justify-content-center">
                <Col>
                  <label
                    for="date"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    {t("d_date")} :
                  </label>
                </Col>
                <Col>
                  <label
                    for="Disaster Occured Date"
                    className="form-label"
                    style={{}}
                  >
                    {issueDetails.disasterDate}
                  </label>
                </Col>
              </Row>
              <Row class="d-flex justify-content-center">
                <Col>
                  <label
                    for="Province"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    {t("province")} :
                  </label>
                </Col>
                <Col>
                  <label for="Province" className="form-label" style={{}}>
                    {issueDetails.province}
                  </label>
                </Col>
              </Row>
              <Row class="d-flex justify-content-center">
                <Col>
                  <label
                    for="District"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    {t("district")} :
                  </label>
                </Col>
                <Col>
                  <label for="District" className="form-label" style={{}}>
                    {issueDetails.District}
                  </label>
                </Col>
              </Row>
              <Row class="d-flex justify-content-center">
                <Col>
                  <label
                    for="Affected Area based on District"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    {t("a_area")} :
                  </label>
                </Col>
                <Col>
                  <label
                    for="Brief Description of the Issue"
                    className="form-label"
                    style={{}}
                  >
                    {issueDetails.affectedArea}
                  </label>
                </Col>
              </Row>
              <Row class="d-flex justify-content-center">
                <Col>
                  <label
                    for="Brief Description of the Issue"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    {t("b_des")} :
                  </label>
                </Col>
                <Col>
                  <label
                    for="Brief Description of the Issue"
                    className="form-label"
                    style={{}}
                  >
                    {issueDetails.issueDescription}
                  </label>
                </Col>
              </Row>
              <Row class="d-flex justify-content-center">
                <Col>
                  <label
                    for="Expected Solution"
                    className="form-label"
                    style={{ fontWeight: "bold" }}
                  >
                    {t("solution")} :
                  </label>
                </Col>
                <Col>
                  <label
                    for="Expected Solution"
                    className="form-label"
                    style={{}}
                  >
                    {issueDetails.expectedSolution}
                  </label>
                </Col>
              </Row>
              <Link style={{ textDecoration: "none" }} to="/allissues">
                <button
                  style={{
                    float: "right",
                  }}
                  className="btn btn-dark"
                >
                  {t("back")}
                </button>
              </Link>
              <br></br>
            </Container>
            <br></br>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default ViewIssue;
