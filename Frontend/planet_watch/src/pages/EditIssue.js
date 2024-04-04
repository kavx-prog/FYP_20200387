import React, { useState, useEffect } from "react";
import { Container, Modal } from "react-bootstrap";
import { BrowserRouter as Router, useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";
import axios from "axios";

function EditIssue() {
  const data = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    user: "",
    issueName: "",
    disasterDate: "",
    province: "",
    District: "",
    affectedArea: "",
    issueDescription: "",
    expectedSolution: "",
  });

  const { t } = useTranslation();

  useEffect(() => {
    // Fetch issue details from the API
    axios
      .get(`http://localhost:8000/issues/${data.issueID}/`)
      .then((response) => {
        // Set the form data based on the fetched issue details
        setFormData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching issue data:", error);
      });
  }, [data.issueID]);

  const handleChange = (event) => {
    const { id, value } = event.target;

    // Check if the length exceeds 15 characters
    if (id === "area" && value.length > 15) {
      setError(true);
    } else {
      setError(false);
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Make the API call to update the issue using Axios
    axios
      .put(`http://localhost:8000/issues/${data.issueID}/`, formData)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        setShowPopup(true);
      })
      .catch((error) => {
        // Handle error response
        console.error(error);
      });
  };

  return (
    <div>
      <Header></Header>
      <br></br>
      <Container>
        <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            Edit Issue
            <img
              src={require("../assets/images/question.jpg")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
          <br></br>
          <form onSubmit={handleSubmit}>
            {/* Issue Name */}
            <div className="mb-3">
              <label htmlFor="isses" className="form-label">
                {t("noft")}
              </label>
              <input
                type="text"
                className="form-control"
                id="isses"
                readOnly
                value={formData.issueName}
                onChange={handleChange}
              />
            </div>

            {/* Disaster Occurred Date */}
            <div className="form-group">
              <label htmlFor="date">Disaster Occurred Date</label>
              <input
                type="text"
                className="form-control"
                id="date"
                readOnly
                value={formData.disasterDate}
                onChange={handleChange}
              />
            </div>

            {/* Province */}
            <div className="mb-3">
              <label htmlFor="province" className="form-label">
                {t("province")}
              </label>
              <input
                type="text"
                className="form-control"
                id="province"
                readOnly
                value={formData.province}
                onChange={handleChange}
              />
            </div>

            {/* District */}
            <div className="mb-3">
              <label htmlFor="district" className="form-label">
                {t("district")}
              </label>
              <input
                type="text"
                className="form-control"
                id="district"
                readOnly
                value={formData.District}
                onChange={handleChange}
              />
            </div>

            {/* Affected Area */}
            <div className="form-group">
              <label htmlFor="area">{t("a_area")}</label>
              <input
                className="form-control"
                id="area"
                aria-describedby="emailHelp"
                value={formData.affectedArea}
                onChange={(event) =>
                  handleChange({
                    target: { id: "affectedArea", value: event.target.value },
                  })
                }
                maxLength={15} // Set the maximum number of characters allowed
              />
              <small className="form-text text-muted">
                {formData.affectedArea.length}/15 characters
              </small>
            </div>

            {/* Issue Description */}
            <div className="form-group">
              <label htmlFor="BrifeDescription">
                Brief Description of the Issue
              </label>
              <textarea
                className="form-control"
                id="BrifeDescription"
                rows="3"
                value={formData.issueDescription}
                onChange={(event) =>
                  handleChange({
                    target: {
                      id: "issueDescription",
                      value: event.target.value,
                    },
                  })
                }
                maxLength={500} // Set the maximum number of characters allowed
              />
              <small className="form-text text-muted">
                {formData.issueDescription.length}/500 characters
              </small>
            </div>

            {/* Expected Solution */}
            <div className="form-group">
              <label htmlFor="solution">Expected Solution</label>
              <textarea
                className="form-control"
                id="solution"
                rows="2"
                value={formData.expectedSolution}
                onChange={(event) =>
                  handleChange({
                    target: {
                      id: "expectedSolution",
                      value: event.target.value,
                    },
                  })
                }
                maxLength={200} // Set the maximum number of characters allowed
              />
              <small className="form-text text-muted">
                {formData.expectedSolution.length}/200 characters
              </small>
            </div>

            <br />
            <a href="#">
              <button type="submit" className="btn btn-success">
                Update
              </button>
            </a>
            <Link style={{ textDecoration: "none" }} to="/myissues">
              <button
                style={{
                  float: "right",
                }}
                className="btn btn-dark"
              >
                Back
              </button>
            </Link>
          </form>
        </div>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{t("success")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="d-flex flex-column align-items-center">
              <p>{t("update_m")}</p>
              <Link to="/myissues">
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

export default EditIssue;
