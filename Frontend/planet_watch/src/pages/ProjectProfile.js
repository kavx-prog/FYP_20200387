import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import "../assets/styles/ProjectProfile.css";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import jwtDecode from "jwt-decode";
import axiosInstance from "../axios";

const ProjectProfile = () => {
  const [showPopup, setShowPopup] = useState(false);

  const token = localStorage.getItem("access_token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user_id;

  const { rowId } = useParams();
  const [projectDetails, setProjectDetails] = useState(null);
  useEffect(() => {
    axiosInstance
      .get(`/projects/${rowId}/`)
      .then((response) => {
        setProjectDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [rowId]);

  const navigate = useNavigate();

  const handleNavigate = async () => {
    try {
      const newObjectID = projectDetails.id; // Wait for updateDB to complete
      navigate(`/editProject/${newObjectID}/`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDelete = async () => {
    axiosInstance
      .delete(`/projects/${rowId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        // Handle a successful response here, such as displaying a success message.
        console.error("Deleted");
        navigate(`/projectDash`);
        console.log("Resource deleted successfully", response);
      })
      .catch((error) => {
        // Handle errors, such as displaying an error message.
        console.error("Error deleting resource", error);
      });
  };

  if (!projectDetails) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Header></Header>
      <br></br>
      <Container>
        <div class="p-5 bg-white text-dark">
          <h2
            className="display-5"
            style={{ fontFamily: "Montserrat", textAlign: "center" }}
          >
            {projectDetails.projectTitle}
          </h2>
          <Row>
            <Col>
              <p style={{ fontFamily: "Montserrat" }}>
                Welcome to the Project Management Tool Dashboard! This platform
                streamlines project management, aiding organization. It offers
                features for tracking progress, task assignment, and team
                collaboration. View ongoing projects with names, statuses, and
                deadlines. Explore project details, milestones, and resource
                allocation easily. Interactive charts provide insights for
                performance analysis and improvement. Boost productivity,
                streamline workflows, and achieve project success with our
                powerful tool.
              </p>
            </Col>
            <Row className="mb-4">
              <Col className="d-flex justify-content-start">
                <h3 class="mt-4 display-6">
                  Project By <strong> {projectDetails.user}</strong>
                </h3>
              </Col>
              <Col className="d-flex justify-content-end">
                <h3 class="mt-4 ">
                  <strong>
                    {Object.keys(projectDetails.contributors).length}
                  </strong>{" "}
                  Members are currently contributing
                </h3>
              </Col>
            </Row>
            {/* <Row className="mb-4">
              <Col className="d-flex justify-content-end">
              <Button variant="success" onClick={handleNavigate}>
              Edit Project
            </Button>
              </Col>
            </Row> */}

            {userId === projectDetails.user && (
              <Row className="mb-4">
                <Col className="d-flex justify-content-start">
                  <Button variant="danger" onClick={() => setShowPopup(true)}>
                    Delete Project
                  </Button>
                </Col>
                <Col className="d-flex justify-content-end">
                  <Button variant="success" onClick={handleNavigate}>
                    Edit Project
                  </Button>
                </Col>
              </Row>
            )}
          </Row>
          <hr class="solid"></hr>
          <div>
            <div className="text-center">
              <h2
                class="mt-5"
                style={{ fontFamily: "Montserrat", textAlign: "center" }}
              >
                Overall Progress
              </h2>
            </div>
            <ProgressBar
              style={{ height: "3vw", fontSize: "16px" }}
              className="mb-4"
              now={projectDetails.progress}
              label={`${parseInt(projectDetails.progress)}%`}
            />
          </div>
          <hr class="solid"></hr>
          <div className="text-center mb-4">
            <h2
              class="mt-5"
              style={{ fontFamily: "Montserrat", textAlign: "center" }}
            >
              Project Details
            </h2>
          </div>
          <Container
            style={{ width: "50vw" }}
            className="border   border-3 mb-5"
          >
            <Row className="d-flex justify-content-start mt-3">
              <Col md={6} className="d-flex justify-content-end">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Project Title :
                </label>
              </Col>
              <Col md={6} lassName="d-flex justify-content-start">
                <label className="form-label l-5">
                  {projectDetails.projectTitle}
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-start">
              <Col md={6} className="d-flex justify-content-end">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Held Date :
                </label>
              </Col>
              <Col md={6} lassName="d-flex justify-content-start">
                <label className="form-label l-5">
                  {projectDetails.helddate}
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-start">
              <Col md={6} className="d-flex justify-content-end">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  District :
                </label>
              </Col>
              <Col md={6} lassName="d-flex justify-content-start">
                <label className="form-label l-5">
                  {projectDetails.district}
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-start">
              <Col md={6} className="d-flex justify-content-end">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Province :
                </label>
              </Col>
              <Col md={6} lassName="d-flex justify-content-start">
                <label className="form-label l-5">
                  {projectDetails.province}
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-start">
              <Col md={6} className="d-flex justify-content-end">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Location :
                </label>
              </Col>
              <Col md={6} lassName="d-flex justify-content-start">
                <label className="form-label l-5">
                  {projectDetails.location}
                </label>
              </Col>
            </Row>
            <Row className="d-flex justify-content-start mb-3">
              <Col md={6} className="d-flex justify-content-end">
                <label className="form-label" style={{ fontWeight: "bold" }}>
                  Description :
                </label>
              </Col>
              <Col md={6} lassName="d-flex justify-content-start">
                <label className="form-label l-5">
                  {projectDetails.description}
                </label>
              </Col>
            </Row>
          </Container>
          <hr class="solid"></hr>
          <div className="text-center mb-4">
            <h2
              class="mt-5"
              style={{ fontFamily: "Montserrat", textAlign: "center" }}
            >
              Contributors
            </h2>
          </div>
          <Container
            style={{ width: "50vw" }}
            className="border   border-3 mb-5"
          >
            {projectDetails.contributors.map((item, index) => (
              <Row
                key={index}
                className="d-flex justify-content-start mt-3 mb-3"
              >
                <Col md={6} className="d-flex justify-content-end">
                  <label className="form-label" style={{ fontWeight: "bold" }}>
                    {item.name} :
                  </label>
                </Col>
                <Col md={6} lassName="d-flex justify-content-start">
                  <label className="form-label l-5">{item.email}</label>
                </Col>
              </Row>
            ))}
          </Container>
          <hr class="solid"></hr>
          <div className="text-center mb-4">
            <h2
              class="mt-5"
              style={{ fontFamily: "Montserrat", textAlign: "center" }}
            >
              Tasks
            </h2>
          </div>
          <Container
            style={{ width: "50vw" }}
            className="border   border-3 mb-5"
          >
            <Row className="d-flex justify-content-center mt-3 mb-3">
              <Col md={4} className="d-flex justify-content-start">
                <label
                  className="form-label l-5"
                  style={{ fontWeight: "bold" }}
                >
                  User Name
                </label>
              </Col>
              <Col md={4} lassName="d-flex justify-content-center">
                <label
                  className="form-label l-5"
                  style={{ fontWeight: "bold" }}
                >
                  Description{" "}
                </label>
              </Col>

              <Col md={4} lassName="d-flex justify-content-end">
                <label
                  className="form-label l-5"
                  style={{ fontWeight: "bold" }}
                >
                  State
                </label>
              </Col>
            </Row>
            {projectDetails.tasks.map((item, index) => (
              <Row
                key={index}
                className="d-flex justify-content-center mt-3 mb-3"
              >
                <Col md={4} className="d-flex justify-content-start">
                  <label className="form-label l-5">{item.assignUser}</label>
                </Col>
                <Col md={4} lassName="d-flex justify-content-center">
                  <label className="form-label l-5">{item.description} </label>
                </Col>

                <Col md={4} lassName="d-flex justify-content-end">
                  <label className="form-label l-5">{item.state}</label>
                </Col>
              </Row>
            ))}
          </Container>
          <hr class="solid"></hr>
          <h2
            class="mt-5"
            style={{ fontFamily: "Montserrat", textAlign: "center" }}
          >
            Project Timeline
          </h2>
          <br></br>
          <div class="container">
            <div class="row">
              <div class="col-md-12">
                <div class="">
                  <div class="card-body">
                    <div id="content">
                      <ul class="timeline">
                        {projectDetails.timeline.map((item, index) => (
                          <li key={index} class="event" data-date={item.date}>
                            <h3>{item.title}</h3>
                            <p>{item.discription}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br></br>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Deletion</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <p>Are You Sure You Want To Delete This Project?</p>
              </Col>
            </Row>
            <Row className="d-flex justify-content-center">
              <Col className="mb-2">
                <Link>
                  <Button
                    variant="danger"
                    className="btn btn-success"
                    onClick={handleDelete}
                  >
                    Delete
                  </Button>
                </Link>
              </Col>
              <Col className="">
                <Button
                  onClick={() => setShowPopup(false)}
                  className="btn btn-success"
                >
                  Cancel
                </Button>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default ProjectProfile;
