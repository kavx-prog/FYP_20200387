import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { BrowserRouter as Router, Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";

function AllIssues() {
  const [searchQuery, setSearchQuery] = useState("");
  const [originaldata, setOriginalData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const history = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    axios
      .get("http://localhost:8000/issues/")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    // Create a function to handle filtering based on the search query
    const handleSearch = () => {
      const lowerCaseQuery = searchQuery.toLowerCase();
      const filteredData = originaldata.filter((item) =>
      item.issueName.toLowerCase().includes(lowerCaseQuery)
      );
      setData(filteredData);
    };

    // Call the search function when the searchQuery state changes
    handleSearch();
  }, [searchQuery, originaldata]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/issues/");
      setData(response.data);
      setOriginalData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleViewMore = (rowId) => {
    // Set the selected row
    setSelectedRow(rowId);

    // Navigate to the details page with URL parameters
    history(`/viewIssue/${rowId}`);
   
  };
  

  return (
    <div>
       <Header></Header>
      <br></br>
      <Container>
        <div className="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            {t("all_issues")}
            <img
              src={require("../assets/images/question.jpg")}
              height={"80px"}
              style={{ float: "right" }}
              alt="question"
            />
          </h1>
          <br />
          <Row>
            <Col xs={12} md={12}>
              <ul className="nav nav-tabs" style={{ borderColor: "#B3FF84" }}>
            <li class="nav-item" style={{ borderColor: "#B3FF84" }}>
              <Link
                class="nav-link active"
                aria-current="page"
                to="/allissues"
                style={{
                  fontSize: "20px",
                  borderColor: "#B3FF84",
                  backgroundColor: "#E9FFE7",
                }}
              >
                <img
                  src={require("../assets/images/allIssues.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                {t("all_issues")}
              </Link>
            </li>
            <li class="nav-item">
              <Link
                class="nav-link active"
                aria-current="page"
                to="/myissues"
                style={{ fontSize: "20px", borderColor: "#B3FF84" }}
              >
                <img
                  src={require("../assets/images/user.png")}
                  height={"40px"}
                  style={{ paddingRight: "10px" }}
                />
                {t("my_issues")}
              </Link>
            </li>
            <b>
              <li class="nav-item">
                <a
                  class="nav-link active"
                  aria-current="page"
                  href="/addissue"
                  style={{
                    fontSize: "20px",
                    borderColor: "#B3FF84",
                    backgroundColor: "#A3FF9B",
                  }}
                >
                  <img
                    src={require("../assets/images/plus.png")}
                    height={"40px"}
                    style={{ paddingRight: "10px" }}
                  />
                  {t("add_issues")}
                </a>
              </li>
            </b>
          </ul>
          <Container
            style={{ backgroundColor: "#E9FFE7", borderColor: "#B3FF84" }}
          >
            <br></br>
            <h2>{t("all_issues")}</h2>
            <br />
            <div className="input-group rounded">
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search by Nature of the Issue"
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                    aria-label="Search"
                    aria-describedby="search-addon"
                  />
                </div>
                <br />
                <Table striped responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th class="text-center">{t("noft")}</th>
                  <th class="text-center">{t("date")}</th>
                  <th class="text-center">{t("district")}</th>
                  <th class="text-center">{t("a_area")}</th>
                  <th class="text-center">{t("view")}</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    <td class="text-center">{item.id}</td>
                    <td class="text-center">{item.issueName}</td>
                    <td class="text-center">{item.disasterDate}</td>
                    <td class="text-center">{item.District}</td>
                    <td class="text-center">{item.affectedArea}</td>
                    <td class="text-center">
                      <button
                        onClick={() => handleViewMore(item.id)}
                        style={{
                          border: "none",
                          color: "blue",
                          background: "none",
                        }}
                      >
                        <i class="bi bi-box-arrow-in-down-right"></i>
                      </button>
                    </td>
                  </tr>
                ))}
                {/* <td class="text-center">1</td>
                  <td class="text-center">Mark</td>
                  <td class="text-center">Otto</td>
                  <td class="text-center">@mdo</td>
                  <td class="text-center">njbjb</td>
                  <td class="text-center">sfgsdgs</td>
                  <td class="text-center">
                    <button
                      style={{
                        border: "none",
                        color: "blue",
                        background: "none",
                      }}
                    >
                      <i class="bi bi-box-arrow-in-down-right"></i>
                    </button>
                  </td> */}
              </tbody>
            </Table>
          </Container>
          </Col>
          </Row>
        </div>
      </Container>
      <Footer />
    </div>
  );
}

export default AllIssues;
