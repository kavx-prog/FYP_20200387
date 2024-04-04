import React from "react";
import { Button } from "../Button";
// import myVideo from "../assets/images/home.mp4"
import "../assets/styles/main.css";
import "../assets/styles/homepage.css";

function Homepage() {
  return (
    <>
      <div className="hero-container">
        <video
          src="https://res.cloudinary.com/dsrjhcvbd/video/upload/v1684943283/Research%20Project/Video/Video_gbpvah.mp4"
          type="video/mp4"
          autoPlay
          muted
          loop
        />
        <h1>Planet Watch</h1>
        <p>Preapare, Preserve, and Protect</p>
        <div className="hero-btns">
          <Button
            className="btns"
            buttonStyle="btn--outline"
            buttonSize="btn--large"
          >
            GET STARTED
          </Button>
        </div>
      </div>
    </>
  );
}

export default Homepage;
