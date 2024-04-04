import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import jwtDecode from "jwt-decode";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyIssues() {
  const { t } = useTranslation();
  const [myIssues, setMyIssues] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken.user_id;

    axios
      .get("http://127.0.0.1:8000/issues/")
      .then((response) => {
        setMyIssues(response.data.filter((item) => item.user === userId));
        console.log(myIssues);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  const navigate = useNavigate();

  const { rowId } = useParams();

  const handleDelete = async (rowId) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/issues/${rowId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        console.error("Deleted");
        // After successful deletion, you may want to update the state to reflect the changes
        setMyIssues((prevIssues) =>
          prevIssues.filter((issue) => issue.id !== rowId)
        );
      } else {
        console.error("Failed to delete item.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
                    style={{
                      fontSize: "20px",
                      borderColor: "#B3FF84",
                      backgroundColor: "#E9FFE7",
                    }}
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
                <br></br>
                <Table striped responsive>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th class="text-center">{t("noft")}</th>
                      <th class="text-center">{t("date")}</th>
                      <th class="text-center">{t("district")}</th>
                      <th class="text-center">{t("a_area")}</th>
                      <th class="text-center">{t("del")}</th>
                      <th class="text-center">{t("edit")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myIssues.map((myissue) => (
                      <tr key={myissue.id}>
                        <td class="text-center">{myissue.id}</td>
                        <td class="text-center">{myissue.issueName}</td>
                        <td class="text-center">{myissue.disasterDate}</td>
                        <td class="text-center">{myissue.District}</td>
                        <td class="text-center">{myissue.affectedArea}</td>
                        <td class="text-center">
                          <button
                            style={{
                              border: "none",
                              color: "black",
                              background: "none",
                            }}
                            onClick={() => {
                              handleDelete(myissue.id);
                            }}
                          >
                            <i
                              class="bi bi-trash3"
                              style={{ border: "none", color: "red" }}
                            ></i>
                          </button>
                        </td>
                        <td class="text-center">
                          <a href={`/editissue/${selectedRecord}`}>
                            <button
                              style={{
                                border: "none",
                                color: "blue",
                                background: "none",
                              }}
                              onClick={() => {
                                setSelectedRecord(myissue.id);
                              }}
                            >
                              <i class="bi bi-pencil-square"></i>
                            </button>
                          </a>
                        </td>
                      </tr>
                    ))}
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
export default MyIssues;
