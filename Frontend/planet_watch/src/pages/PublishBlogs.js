import React, { useState } from "react";
import { Col, Container, Row, Modal } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function PublishBlogs() {
 
  const [showPopup, setShowPopup] = useState(false);
 
  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the data to be sent
    const formData = {
      blogTitle: document.getElementById("blogTitle").value,
      publishDate: document.getElementById("publishDate").value,
      author: document.getElementById("author").value,
      content: document.getElementById("content").value,
      
    };

    // Make the API call using Axios
    axios
      .post("http://localhost:8000/blogs/", formData)
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
              Lets publish your ideas
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
                  Blog Title
                </label>
                <input class="form-control" id="blogTitle" required></input>
              </Col>
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Publish Date
                </label>
                <input
                  type="date"
                  class="form-control"
                  id="publishDate"
                  required
                ></input>
              </Col>
            </Row>
            <Row className="mb-3">
              <Col>
                <label for="exampleFormControlInput1" className="form-label">
                  Author
                </label>
                <input class="form-control" id="author" required></input>
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
                <label for="exampleFormControlInput1" className="form-label">
                  Content
                </label>
                <textarea rows="20" class="form-control" id="content" required></textarea>
              </Col>
            </Row>
            <Row className="mt-5">
              <Col>
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <a href="/addblogs">
                  <button
                    style={{
                      float: "right",
                    }}
                    className="btn btn-dark"
                  >
                    Back
                  </button>
                </a>
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
                <p>Your blog has been published successfully!</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Link to="/blogs">
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

export default PublishBlogs;
