import "../assets/styles/ChatBot.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBIcon,
  MDBBtn,
  MDBTypography,
  MDBTextArea,
  MDBCardHeader,
} from "mdb-react-ui-kit";
import { Container, Row } from "react-bootstrap";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function CarbonChatBot() {
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
              Carbon Footprint Calculator
              <img
                src={require("../assets/images/project.png")}
                height={"90px"}
                style={{ float: "right" }}
              ></img>
            </h1>
          </Row>
          <MDBContainer fluid className="py-5 ">
            <MDBRow>
              {/* <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                <h5 className="font-weight-bold mb-3 text-center text-dark">
                  Member
                </h5>
                <MDBCard className="mask-custom">
                  <MDBCardBody>
                    <MDBTypography listUnStyled className="mb-0">
                      <li
                        className="p-2 border-bottom"
                        style={{
                          borderBottom:
                            "1px solid rgba(255,255,255,.3) !important",
                        }}
                      >
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-8.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">John Doe</p>
                              <p className="small text-dark">
                                Hello, Are you there?
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small mb-1 text-dark">Just now</p>
                            <span className="badge bg-danger float-end">1</span>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom">
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Danny Smith</p>
                              <p className="small text-dark">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-darks mb-1">5 mins ago</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom">
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-2.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Alex Steward</p>
                              <p className="small text-dark">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-dark mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom">
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-3.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Ashley Olsen</p>
                              <p className="small text-dark">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-dark mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom">
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-4.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Kate Moss</p>
                              <p className="small text-dark">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-dark mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2 border-bottom">
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Lara Croft</p>
                              <p className="small text-dark">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-dark mb-1">Yesterday</p>
                          </div>
                        </a>
                      </li>
                      <li className="p-2">
                        <a
                          href="#!"
                          className="d-flex justify-content-between link-light"
                        >
                          <div className="d-flex flex-row">
                            <img
                              src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                              alt="avatar"
                              className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                              width="60"
                            />
                            <div className="pt-1">
                              <p className="fw-bold mb-0">Brad Pitt</p>
                              <p className="small text-dark">
                                Lorem ipsum dolor sit.
                              </p>
                            </div>
                          </div>
                          <div className="pt-1">
                            <p className="small text-dark mb-1">5 mins ago</p>
                            <span className="text-dark float-end">
                              <MDBIcon fas icon="check" />
                            </span>
                          </div>
                        </a>
                      </li>
                    </MDBTypography>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol> */}
              {/* <MDBCol md="6" lg="7" xl="8"> */}
              <MDBCol>
                <MDBTypography listUnStyled className="text-dark">
                  <li className="d-flex justify-content-between mb-4">
                    <img
                      src="https://media.gettyimages.com/id/1479744690/vector/robot-artificial-intelligence-avatar-icon-profile-diverse-bot-face-for-chatbot-and-social.jpg?s=1024x1024&w=gi&k=20&c=Y7pVZ3gio4XuQE335QwXsr9n8UXIutEkJzCNJSQUveQ="
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                      width="60"
                    />
                    <MDBCard
                      style={{ height: "200px" }}
                      className="mask-custom"
                    >
                      <MDBCardHeader
                        className="d-flex justify-content-between p-3"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,.3)",
                        }}
                      >
                        <p className="fw-bold text-dark mb-0">EcoBuddy</p>
                        <p className="text-dark small mb-0">
                          <MDBIcon far icon="clock" /> 12 mins ago
                        </p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className="mb-0 text-dark">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </MDBCardBody>
                    </MDBCard>
                  </li>
                  <li class="d-flex justify-content-between mb-4">
                    <MDBCard
                      style={{ height: "200px" }}
                      className="w-100 mask-custom"
                    >
                      <MDBCardHeader
                        className="d-flex justify-content-between p-3"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,.3)",
                        }}
                      >
                        <p class="fw-bold mb-0 text-dark">Oshidhie</p>
                        <p class="text-dark small mb-0">
                          <MDBIcon far icon="clock" /> 13 mins ago
                        </p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className="mb-0 text-dark">
                          Sed ut perspiciatis unde omnis iste natus error sit
                          voluptatem accusantium doloremque laudantium.
                        </p>
                      </MDBCardBody>
                    </MDBCard>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-5.webp"
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start ms-3 shadow-1-strong"
                      width="60"
                    />
                  </li>
                  <li className="d-flex justify-content-between mb-4">
                    <img
                      src="https://media.gettyimages.com/id/1479744690/vector/robot-artificial-intelligence-avatar-icon-profile-diverse-bot-face-for-chatbot-and-social.jpg?s=1024x1024&w=gi&k=20&c=Y7pVZ3gio4XuQE335QwXsr9n8UXIutEkJzCNJSQUveQ="
                      alt="avatar"
                      className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                      width="60"
                    />
                    <MDBCard
                      style={{ height: "200px" }}
                      className="mask-custom"
                    >
                      <MDBCardHeader
                        className="d-flex justify-content-between p-3"
                        style={{
                          borderBottom: "1px solid rgba(255,255,255,.3)",
                        }}
                      >
                        <p className="fw-bold mb-0 text-dark">EcoBuddy</p>
                        <p className="text-dark small mb-0">
                          <MDBIcon far icon="clock" /> 10 mins ago
                        </p>
                      </MDBCardHeader>
                      <MDBCardBody>
                        <p className="mb-0 text-dark">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna aliqua.
                        </p>
                      </MDBCardBody>
                    </MDBCard>
                  </li>
                  <li className="mb-3">
                    <MDBTextArea id="textAreaExample" rows={4} />
                  </li>
                  <MDBBtn color="light" size="lg" rounded className="float-end">
                    Send
                  </MDBBtn>
                </MDBTypography>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
}
