import React, { useState, useEffect } from "react";
import { Col, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axiosInstance from "../axios";

function EditProject() {
  const { objectID } = useParams();
  const [showPopup, setShowPopup] = useState(false);
  const [textFields, setTextFields] = useState([{ name: "", email: "" }]);
  const [sliderValue, setSliderValue] = useState(50);
  const [tasktextFields, setTaskTextFields] = useState([
    { description: "", assignUser: "", state: "" },
  ]);
  const [timelinetextFields, setTimelineTextFields] = useState([
    { date: "", title: "", discription: "" },
  ]);
  //   const [projectDetails, setProjectDetails] = useState("");
  const [projectDetails, setProjectDetails] = useState({});

  useEffect(() => {
    axiosInstance
      .get(`/projects/${objectID}/`)
      .then((response) => {
        setProjectDetails(response.data);
        setTextFields(response.data.contributors);
        setTaskTextFields(response.data.tasks);
        setTimelineTextFields(response.data.timeline);
        setSliderValue(response.data.progress);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [objectID]);

  // console.log(objectID);
  // console.log(projectDetails);

  const handleSliderChange = (event) => {
    setSliderValue(event.target.value);
  };

  const addTextField = (e) => {
    e.preventDefault();
    setTextFields([...textFields, { name: "", email: "" }]);
  };

  const addTimelineTextField = (e) => {
    e.preventDefault();
    setTimelineTextFields([
      ...timelinetextFields,
      { date: "", title: "", discription: "" },
    ]);
  };

  const addTaskTextField = (e) => {
    e.preventDefault();
    setTaskTextFields([
      ...tasktextFields,
      { description: "", assignUser: "", state: "" },
    ]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const formData = {
      user: projectDetails.user,
      projectTitle: document.getElementById("projectTitle").value,
      helddate: document.getElementById("heldDate").value,
      progress: sliderValue,
      district: document.getElementById("district").value,
      province: document.getElementById("province").value,
      location: document.getElementById("location").value,
      description: document.getElementById("description").value,
      contributors: textFields,
      tasks: tasktextFields,
      timeline: timelinetextFields,
    };

    // axios
    //   .put(`http://localhost:8000/diet/${objectID}/`, updatedData)
    //   .then((response) => {
    //     console.log("Data updated successfully:", response.data);
    //   })
    //   .catch((error) => {
    //     console.error("Error updating data:", error);
    //   });

    // Make the API call using Axios
    axiosInstance
      .put(`/projects/${objectID}/`, formData)
      .then((response) => {
        console.log(response.data);
        // Handle success response and perform any additional actions
        console.log("Data updated successfully:", response.data);
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
              Edit Project
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
                  Project Title
                </label>
                <input
                  class="form-control"
                  id="projectTitle"
                  value={projectDetails.projectTitle}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      projectTitle: e.target.value,
                    })
                  }
                  required
                ></input>
              </Col>
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Held Date
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="heldDate"
                  value={projectDetails.helddate}
                  required
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      helddate: e.target.value,
                    })
                  }
                ></input>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label for="Select Province" className="form-label">
                  Select Province
                </label>
                <select
                  className="form-select"
                  value={projectDetails.province}
                  id="province"
                  required
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      province: e.target.value,
                    })
                  }
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="Central">Central</option>
                  <option value="Eastern">Eastern</option>
                  <option value="North Central">North Central</option>
                  <option value="North Western">North Western</option>
                  <option value="Northern">Northern</option>
                  <option value="Sabaragamuwa">Sabaragamuwa</option>
                  <option value="Southern">Southern</option>
                  <option value="Uva">Uva</option>
                  <option value="Western">Western</option>
                </select>
              </Col>
              <Col>
                <label for="Select District" className="form-label">
                  Select District
                </label>
                <select
                  className="form-select"
                  value={projectDetails.district}
                  id="district"
                  required
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      district: e.target.value,
                    })
                  }
                >
                  <option value="" disabled selected>
                    Select your option
                  </option>
                  <option value="Ampara">Ampara</option>
                  <option value="Anuradhapura">Anuradhapura</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Batticaloa">Batticaloa</option>
                  <option value="Colombo">Colombo</option>
                  <option value="Galle">Galle</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Hambantota">Hambantota</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Kegalle">Kegalle</option>
                  <option value="Kilinochchi">Kilinochchi</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Mannar">Mannar</option>
                  <option value="Matale">Matale</option>
                  <option value="Matara">Matara</option>
                  <option value="Moneragala">Moneragala</option>
                  <option value="Mullaitivu">Mullaitivu</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Polonnaruwa">Polonnaruwa</option>
                  <option value="Puttalam">Puttalam</option>
                  <option value="Ratnapura">Ratnapura</option>
                  <option value="Trincomalee">Trincomalee</option>
                  <option value="Vavuniya">Vavuniya</option>
                </select>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Location
                </label>
                <input
                  class="form-control"
                  value={projectDetails.location}
                  id="location"
                  required
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      location: e.target.value,
                    })
                  }
                ></input>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label for="exampleFormControlTextarea1" class="form-label">
                  Project Description
                </label>
                <textarea
                  class="form-control"
                  id="description"
                  rows="3"
                  value={projectDetails.description}
                  onChange={(e) =>
                    setProjectDetails({
                      ...projectDetails,
                      description: e.target.value,
                    })
                  }
                ></textarea>
              </Col>
            </Row>
            <Row className="mt-5 mb-3">
              <Col>
                <h2 style={{ fontFamily: "Montserrat", float: "left" }}>
                  Contributors
                </h2>
              </Col>
            </Row>
            {textFields.map((textField, index) => (
              <Row className="mb-3">
                <Col key={index}>
                  <label for="exampleFormControlInput1" className="form-label">
                    Name
                  </label>
                  <input
                    value={textField.name}
                    onChange={(e) => {
                      const newFields = [...textFields];
                      newFields[index].name = e.target.value;
                      setTextFields(newFields);
                    }}
                    placeholder="Name"
                    class="form-control"
                  />
                </Col>
                <Col>
                  <label for="exampleFormControlInput1" className="form-label">
                    Email
                  </label>
                  <input
                    value={textField.email}
                    onChange={(e) => {
                      const newFields = [...textFields];
                      newFields[index].email = e.target.value;
                      setTextFields(newFields);
                    }}
                    placeholder="Email"
                    class="form-control"
                  />
                </Col>
              </Row>
            ))}
            <button onClick={addTextField} class="btn btn-light">
              Add More
            </button>
            <Row className="mt-5 mb-3">
              <Col>
                <h2 style={{ fontFamily: "Montserrat", float: "left" }}>
                  Tasks
                </h2>
              </Col>
            </Row>
            {tasktextFields.map((textField, index) => (
              <Row key={index} className="mb-3">
                <Col>
                  <label for="exampleFormControlInput1" className="form-label">
                    Description
                  </label>
                  <input
                    value={textField.description}
                    class="form-control"
                    onChange={(e) => {
                      const newFields = [...tasktextFields];
                      newFields[index].description = e.target.value;
                      setTaskTextFields(newFields);
                    }}
                    placeholder="Description"
                  />
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Assign User
                      </label>
                      <select
                        value={textField.assignUser}
                        className="form-select"
                        onChange={(e) => {
                          const newFields = [...tasktextFields];
                          newFields[index].assignUser = e.target.value;
                          setTaskTextFields(newFields);
                        }}
                      >
                        <option value="">Assign User</option>
                        {textFields.map((textField, index) => (
                          <option key={index} value={textField.name}>
                            {textField.name}
                          </option>
                        ))}
                      </select>
                    </Col>
                    <Col>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        State
                      </label>
                      <select
                        value={textField.state}
                        className="form-select"
                        onChange={(e) => {
                          const newFields = [...tasktextFields];
                          newFields[index].state = e.target.value;
                          setTaskTextFields(newFields);
                        }}
                      >
                        <option value="">Select State</option>
                        <option value="open">Open</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
            <button onClick={addTaskTextField} class="btn btn-light">
              Add More
            </button>

            <Row className="mt-5 mb-3">
              <Col>
                <h2 style={{ fontFamily: "Montserrat", float: "left" }}>
                  Timeline
                </h2>
              </Col>
            </Row>
            {timelinetextFields.map((timeline, index) => (
              <Row key={index} className="mb-3">
                <Col>
                  <label for="exampleFormControlInput1" className="form-label">
                    Held Date
                  </label>
                  <input
                    type="date"
                    value={timeline.date}
                    class="form-control"
                    id="Date"
                    required
                    onChange={(e) => {
                      const newFields = [...timelinetextFields];
                      newFields[index].date = e.target.value;
                      setTimelineTextFields(newFields);
                    }}
                    placeholder="Date"
                  ></input>
                </Col>
                <Col>
                  <Row>
                    <Col>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Title
                      </label>
                      <input
                        type="text"
                        value={timeline.title}
                        class="form-control"
                        id="title"
                        required
                        onChange={(e) => {
                          const newFields = [...timelinetextFields];
                          newFields[index].title = e.target.value;
                          setTimelineTextFields(newFields);
                        }}
                        placeholder="Title"
                      ></input>
                    </Col>
                    <Col>
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Discription
                      </label>
                      <input
                        type="text"
                        value={timeline.discription}
                        class="form-control"
                        id="discription"
                        required
                        onChange={(e) => {
                          const newFields = [...timelinetextFields];
                          newFields[index].discription = e.target.value;
                          setTimelineTextFields(newFields);
                        }}
                        placeholder="Discription"
                      ></input>
                    </Col>
                  </Row>
                </Col>
              </Row>
            ))}
            <button onClick={addTimelineTextField} class="btn btn-light">
              Add More
            </button>

            <Row className="mb-3 mt-3">
              <Col>
                <div className="form-group">
                  <label htmlFor="slider">
                    Progress: {parseInt(sliderValue)}%
                  </label>
                  <input
                    type="range"
                    className="form-range"
                    id="slider"
                    min="0"
                    max="100"
                    value={sliderValue}
                    onChange={handleSliderChange}
                  />
                </div>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${sliderValue}%` }}
                    aria-valuenow={sliderValue}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button
                  style={{
                    float: "right",
                  }}
                  className="btn btn-dark"
                >
                  Back
                </button>
              </Col>
            </Row>
          </form>
        </div>
        <Modal show={showPopup} onHide={() => setShowPopup(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col>
                <p>Your Project has been submitted successfully!</p>
              </Col>
            </Row>
            <Row>
              <Col className="d-flex justify-content-center">
                <Link to="/projectDash">
                  <button className="btn btn-success">OK</button>
                </Link>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default EditProject;
