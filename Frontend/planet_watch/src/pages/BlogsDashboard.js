import React, { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "../assets/styles/blogs.css";
import Header from '../components/Header';
import Footer from '../components/Footer';

const BlogDashboard = () => {
  return (
    <div>
       <Header></Header>
      <br></br>
      <Container>
        <div className="container-white">
          <div className="blog-section-title">
            <h1>Share Your thoughts  <div className="publish-button"><a href="/addBlogs"><button className="btn btn-secondary ">Publish a Blog</button></a></div></h1>
          </div>
          <div className="blog-section-description">
            <p>
              Welcome to our thought-provoking blog section, where we dive into
              the complex issues of disasters, climate change, and
              sustainability. Our mission is to deepen your understanding of the
              challenges our planet faces and explore innovative solutions that
              can shape a resilient and sustainable future.
            </p>
          </div>
          <Row>
            <div className="pill-section">
              <Col md={12} lg={12} flex="auto">
                <Row>
                  <Col md={2} lg={2} flex="auto">
                    <div className="pill">
                      <div>Latest Blogs</div>
                    </div>
                  </Col>
                  <Col md={2} lg={2} flex="auto">
                    <div className="pill">
                      <div>Sustainability</div>
                    </div>
                  </Col>
                  <Col md={2} lg={2} flex="auto">
                    <div className="pill">
                      <div>Disasters</div>
                    </div>
                  </Col>
                  {/* <Col md={2} lg={2} flex="auto">
                    <div className="blog-search">
                      <div>Latest Blogs</div>
                    </div>
                  </Col> */}
                </Row>
              </Col>
            </div>
            <Col md={24} lg={24} flex="auto">
              <div className="blog-section-subtitle">
                <h2>Latest Blogs</h2>
              </div>
            </Col>
            <Col md={24} lg={24} flex="auto">
              <div className="blog-card-container">
                <h3></h3>
                <Row>
                  <Col md={4} lg={4} flex="auto">
                    <div className="blog-card">
                      <img src="https://cdn.vox-cdn.com/thumbor/bw9scCZ4Vrg1UYrtDqQF4oMECNg=/0x0:5760x4312/1200x800/filters:focal(1332x2006:2252x2926)/cdn.vox-cdn.com/uploads/chorus_image/image/61152223/shutterstock_274566236.0.jpg"></img>
                      <div className="blog-title">
                        Sustainability at Home: Creating an Eco-Friendly Heaven
                      </div>
                      <div className="blog-author">Author : Lakmini Senarathne</div>
                      <div className="blog-description">
                        <p>
                          "Sustainability at Home: Creating an Eco-Friendly
                          Heaven" is a comprehensive guide that aims to inspire
                          and empower individuals to adopt a sustainable
                          lifestyle within the confines of their own homes. In a
                          world grappling with pressing environmental
                          challenges, this guide recognizes the urgent need for
                          individuals to take responsibility for their
                          ecological impact and make positive changes in their
                          daily lives.
                        </p>
                      </div>
                      <button type="button" className="btn btn-secondary">
                        Read More
                      </button>
                    </div>
                  </Col>
                  <Col md={4} lg={4} flex="auto">
                    <div className="blog-card">
                      <img src="https://cdnuploads.aa.com.tr/uploads/Contents/2022/11/11/thumbs_b_c_513980607bf339331ec50e5251273633.jpg?v=224536"></img>
                      <div className="blog-title">
                        Learning from History: Lessons and Insights from Past
                        Disasters
                      </div>
                      <div className="blog-author">Author : Sepal Wijerathne</div>
                      <div className="blog-description">
                        <p>
                          "Learning from History: Lessons and Insights from Past
                          Disasters" delves into the invaluable wisdom that can
                          be gleaned from studying and analyzing the calamities
                          of the past. Throughout history, humanity has faced
                          numerous challenges and catastrophic events, each
                          leaving behind a trail of devastation, loss, and
                          valuable lessons.
                        </p>
                      </div>
                      <button type="button" className="btn btn-secondary">
                        Read More
                      </button>
                    </div>
                  </Col>
                  <Col md={4} lg={4} flex="auto">
                    <div className="blog-card">
                      <img src="https://www.feednavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/feed/feednavigator.com/news/regulation/we-don-t-have-any-time-to-lose-climate-change-report-shows-global-action-is-more-urgent-than-previously-thought/13285015-1-eng-GB/We-don-t-have-any-time-to-lose-Climate-change-report-shows-global-action-is-more-urgent-than-previously-thought.jpg"></img>
                      <div className="blog-title">
                        Climate Change and Health: Unraveling the Human
                        Consequences
                      </div>
                      <div className="blog-author">Author : Sepal Wijerathne</div>
                      <div className="blog-description">
                        <p>
                          ""Climate Change and Health: Unraveling the Human
                          Consequences" delves into the intricate relationship
                          between our changing climate and its profound impact
                          on human well-being. This summary takes us on a
                          journey through the myriad ways in which climate
                          change manifests as a threat to our physical and
                          mental health, unraveling the complex web of
                          consequences that affect individuals and communities
                          worldwide..
                        </p>
                      </div>
                      <button type="button" className="btn btn-secondary">
                        Read More
                      </button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default BlogDashboard;
