import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import jwtDecode from "jwt-decode";
import axiosInstance from "../axios";

const ProjectDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteron, setFilteron] = useState(false);
  const [data, setData] = useState([]);
  const [originaldata, setOriginalData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const history = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Create a function to handle filtering based on the search query
    const handleSearch = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredData = originaldata.filter((item) =>
        item.projectTitle.toLowerCase().includes(lowerCaseQuery)
      );
      setData(filteredData);
    };

    // Call the search function when the searchQuery state changes
    handleSearch();
  }, [searchQuery, originaldata]); // Re-run the effect when searchQuery or originaldata changes

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/projects/");
      setData(response.data);
      setOriginalData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleViewMore = (rowId) => {
    // Set the selected row
    setSelectedRow(rowId);

    // Navigate to the details page with URL parameters
    history(`/projectProfile/${rowId}`);
  };

  const handleFilter = () => {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    setData(originaldata.filter((item) => item.user === userId));

    setFilteron(true);
  };

  const handleclearFilter = () => {
    setData(originaldata);

    setFilteron(false);
  };

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <Header></Header>
      <Container>
        <div class="p-3 mt-3 mb-2 bg-white text-dark">
          <h2 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
            {t("header_project_dashboard")}
          </h2>
          <div
            className="mb-3"
            style={{ fontFamily: "Montserrat", textAlign: "center" }}
          >
            <p style={{ fontFamily: "Montserrat" }}>
              {t("description_project_dashboard")}
            </p>
          </div>
          <Row className="mb-3 w-100">
            {/* <Col>
              <h3 style={{ fontFamily: "Montserrat", float: "left" }}>
                Categories
              </h3>
            </Col> */}
            <Col>
              <Link to="/addProject">
                <button style={{ float: "right" }} className="btn btn-success">
                  + {t("launch_your_project")}
                </button>
              </Link>
            </Col>
          </Row>
          {/* <Row class="d-flex justify-content-center">
            <Col>
              <div class="card" style={{ width: "18rem", height: "4rem" }}>
                <div class="card-body text-dark">
                  <h5 class="card-title">Recent Projects</h5>
                </div>
              </div>
            </Col>
            <Col>
              <div class="card" style={{ width: "18rem", height: "4rem" }}>
                <div class="card-body text-dark">
                  <h5 class="card-title">All Projects</h5>
                </div>
              </div>
            </Col>
            <Col>
              <div class="card" style={{ width: "18rem", height: "4rem" }}>
                <div class="card-body text-dark">
                  <h5 class="card-title">My Contributions</h5>
                </div>
              </div>
            </Col>
            <Col>
              <div class="card" style={{ width: "18rem", height: "4rem" }}>
                <div class="card-body text-dark">
                  <h5 class="card-title">Critical Projects</h5>
                </div>
              </div>
            </Col>
          </Row> */}
          <Row className="mt-3">
            <Col>
              <h2 style={{ fontFamily: "Montserrat", textAlign: "center" }}>
                {t("projects")}
              </h2>
            </Col>
          </Row>
          <Row className="mt-3 mb-5">
            <Col>
              <div class="input-group rounded">
                <input
                  type="search"
                  class="form-control rounded"
                  placeholder={t("search_by_project_title")}
                  value={searchQuery}
                  onChange={handleSearchInputChange}
                  aria-label="Search"
                  aria-describedby="search-addon"
                />
              </div>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col className="d-flex justify-content-start mb-3" md={6}>
              <Button
                variant={filteron ? "outline-success" : "success"}
                onClick={() => handleclearFilter()}
                style={{ width: "100vh" }}
              >
                {t("all_projects")}
              </Button>
            </Col>
            <Col className="d-flex justify-content-end mb-3" md={6}>
              <Button
                variant={filteron ? "success" : "outline-success"}
                onClick={() => handleFilter()}
                style={{ width: "100vh" }}
              >
                {t("my_projects")}
              </Button>
            </Col>
          </Row>
          <Row className="mt-3 mb-5">
            {data.map((item) => (
              <Col key={item.id} className="d-flex justify-content-start">
                <div class=" card text-dark mb-5">
                  <div class="card-body">
                    <h5 class="d-flex justify-content-center card-title">{item.projectTitle}</h5>
                    <p class="d-flex justify-content-center card-text">{item.helddate}</p>
                    <button
                      class="btn btn-success"
                      onClick={() => handleViewMore(item.id)}
                    >
                      {t("learn_more")}
                    </button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default ProjectDashboard;
