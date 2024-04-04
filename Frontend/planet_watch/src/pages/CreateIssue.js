import React, { useState } from "react";
import { Container, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Link } from "react-router-dom";
//import { useHistory } from "react-router";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function CreateIssue() {
  const { t } = useTranslation();

  const [showPopup, setShowPopup] = useState(false);
  //const history = useHistory();
  const token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;
  const [formData, setFormData] = useState({
    user: userId,
    issueName: "",
    disasterDate: "",
    province: "",
    District: "",
    affectedArea: "",
    issueDescription: "",
    expectedSolution: "",
  });

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;
    console.log(userId);
    // Make the API call using Axios
    axios
      .post("http://localhost:8000/issues/", formData)
      .then((response) => {
        // Handle success response
        console.log(response.data);
        // Reset the form data
        setFormData({
          user: userId,
          issueName: "",
          disasterDate: "",
          province: "",
          District: "",
          affectedArea: "",
          issueDescription: "",
          expectedSolution: "",
        });
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
            {t("add_issues")}
            <img
              src={require("../assets/images/question.jpg")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </h1>
          <br></br>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label for="Nature of the Issue" className="form-label">
                {t("noft")}
              </label>
              <select
                className="form-select"
                id="issueName"
                onChange={handleChange}
                value={formData.issueName}
                required
              >
                <option value="" disabled selected>
                  {t("select")}
                </option>
                <option value="Landslide">{t("Landslide")}</option>
                <option value="Heat Waves">{t("Heat_Waves")}</option>
                <option value="Floods">{t("Floods")}</option>
                <option value="Wildfire">{t("Wildfire")}</option>
                <option value="Droughts">{t("Droughts")}</option>
                <option value="Cyclones">{t("Cyclones")}</option>
                <option value="Thunderstorm">{t("Thunderstorm")}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="exampleFormControlInput1">{t("d_date")}</label>
              <input
                value={formData.disasterDate}
                onChange={handleChange}
                type="date"
                class="form-control"
                id="disasterDate"
                required
                max={new Date().toISOString().split("T")[0]}
              />
            </div>

            <br></br>

            <div className="mb-3">
              <label for="Select Province" className="form-label">
                {t("s_province")}
              </label>
              <select
                className="form-select"
                id="province"
                onChange={handleChange}
                value={formData.province}
                required
              >
                <option value="" disabled selected>
                  {t("select")}
                </option>
                <option value="Central">{t("Central")}</option>
                <option value="Eastern">{t("Eastern")}</option>
                <option value="North Central">{t("North_Central")}</option>
                <option value="North Western">{t("North_Western")}</option>
                <option value="Northern">{t("Northern")}</option>
                <option value="Sabaragamuwa">{t("Sabaragamuwa")}</option>
                <option value="Southern">{t("Southern")}</option>
                <option value="Uva">{t("Uva")}</option>
                <option value="Western">{t("Western")}</option>
              </select>
            </div>

            <div className="mb-3">
              <label for="Select District" className="form-label">
                {t("s_district")}
              </label>
              <select
                className="form-select"
                id="District"
                onChange={handleChange}
                value={formData.District}
                required
              >
                <option value="" disabled selected>
                  {t("select")}
                </option>
                <option value="Ampara">{t("Ampara")}</option>
                <option value="Anuradhapura">{t("Anuradhapura")}</option>
                <option value="Badulla">{t("Badulla")}</option>
                <option value="Batticaloa">{t("Batticaloa")}</option>
                <option value="Colombo">{t("Colombo")}</option>
                <option value="Galle">{t("Galle")}</option>
                <option value="Gampaha">{t("Gampaha")}</option>
                <option value="Hambantota">{t("Hambantota")}</option>
                <option value="Jaffna">{t("Jaffna")}</option>
                <option value="Kalutara">{t("Kalutara")}</option>
                <option value="Kandy">{t("Kandy")}</option>
                <option value="Kegalle">{t("Kegalle")}</option>
                <option value="Kilinochchi">{t("Kilinochchi")}</option>
                <option value="Kurunegala">{t("Kurunegala")}</option>
                <option value="Mannar">{t("Mannar")}</option>
                <option value="Matale">{t("Matale")}</option>
                <option value="Matara">{t("Matara")}</option>
                <option value="Moneragala">{t("Monaragala")}</option>
                <option value="Mullaitivu">{t("Mullaitivu")}</option>
                <option value="Nuwara Eliya">{t("Nuwara_Eliya")}</option>
                <option value="Polonnaruwa">{t("Polonnaruwa")}</option>
                <option value="Puttalam">{t("Puttalam")}</option>
                <option value="Ratnapura">{t("Ratnapura")}</option>
                <option value="Trincomalee">{t("Trincomalee")}</option>
                <option value="Vavuniya">{t("Vavuniya")}</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="area">{t("a_area")}</label>
              <input
                value={formData.affectedArea}
                onChange={handleChange}
                className="form-control"
                id="affectedArea"
                aria-describedby="emailHelp"
                placeholder="Dehiwala"
                maxLength={15} // Set the maximum number of characters allowed
              />
              <small className="form-text text-muted">
                {formData.affectedArea.length}/15 characters
              </small>
            </div>

            <br></br>

            <div class="form-group">
              <label for="issueDescription">{t("b_des")}</label>
              <textarea
                value={formData.issueDescription}
                onChange={handleChange}
                class="form-control"
                id="issueDescription"
                rows="3"
                maxLength={500} // Set the maximum number of characters allowed
              />
              <small className="form-text text-muted">
                {formData.issueDescription.length}/500 characters
              </small>
            </div>

            <br></br>

            <div class="form-group">
              <label for="expectedSolution">{t("solution")}</label>
              <textarea
                class="form-control"
                onChange={handleChange}
                value={formData.expectedSolution}
                id="expectedSolution"
                rows="2"
                maxLength={200} // Set the maximum number of characters allowed
              />
              <small className="form-text text-muted">
                {formData.expectedSolution.length}/200 characters
              </small>
            </div>

            <br></br>
            <a href="#">
              <button type="submit" className="btn btn-success">
                {t("submit")}
              </button>
            </a>
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
          </form>
        </div>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>{t("success")}</Modal.Title>
          </Modal.Header>
          <Modal.Body className="text-center">
            <div className="d-flex flex-column align-items-center">
              <p>{t("success_m")}</p>
              <Link to="/allissues">
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

export default CreateIssue;
