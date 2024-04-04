import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/styles/news.css";
import axios from "axios";
import Header from '../components/Header';
import Footer from '../components/Footer';

function NewsDashboard() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=keyword&apiKey=e11ec4fba23846e8aefbaa86c04f1775"
      )
      .then((response) => {
        const responseData = response.data.articles;
        setOriginalData(responseData);
        setFilteredData(responseData);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    // Filter data based on date range
    const filtered = originalData.filter((item) => {
      const formattedDate = formatDate(item.publishedAt);
      return formattedDate.includes(searchTerm);
    });
    setFilteredData(filtered);
  }, [searchTerm, originalData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
       <Header></Header>
      <br></br>

      <Container>
        <div class="p-3 mb-2 bg-white text-dark">
          <h1 style={{ fontFamily: "Montserrat", textTransform: "uppercase" }}>
            NEWS DASHBOARD
            <img
              src={require("../assets/images/weather.png")}
              height={"70px"}
              style={{ float: "right" }}
            ></img>
          </h1>

          <br></br>
          <br></br>

          <center>
            <img
              src={require("../assets/images/onedisastera.jpg")}
              width={"80%"}
              style={{}}
            ></img>
          </center>
          <br></br>
          <br></br>
           <div class="input-group rounded">
            <input
              type="text"
              class="form-control rounded"
              placeholder="Search by date"
              aria-label="Search"
              aria-describedby="search-addon"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div {...settings}>
            <Row className="row-cols-1 row-cols-md-3 g-5 mb-5">
              {filteredData.map((item) => (
                <Col key={item.id}>
                    <div
                      className="card mt-5"
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        height: "100%",
                      }}
                    >
                      <div className="card-top">
                        <img src={item.urlToImage} alt={item.category} />
                        <h1>{item.author}</h1>
                      </div>
                      <div className="card-bottom text-dark">
                        <h3>{item.title}</h3>
                        <h5>Date {formatDate(item.publishedAt)}</h5>
                        <p>{item.description}</p>
                        <div style={{ marginTop: "auto", textAlign: "center" }}>
                          <a href={item.url}>
                            <button type="button" className="btn btn-secondary">
                              Read More
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </Col>
                ))}
            </Row>
          </div>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}

export default NewsDashboard;
