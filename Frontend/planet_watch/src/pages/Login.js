import axios from "axios";
import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import axiosInstance from "../axios";
import "../assets/styles/accountpopup.css";
function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function signin(e) {
    e.preventDefault();
    const loggedInUser = {
      username,
      password,
    };
    axiosInstance
      .post("api/token/", loggedInUser)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("access_token", res.data.access);
        localStorage.setItem("refresh-token", res.data.refresh);
        axiosInstance.defaults.headers["Authorization"] =
          "Bearer" + localStorage.getItem("access_token");

        window.location.replace("/dashboard");
      })
      .catch((err) => {
        console.log(err.message);
        if (err.message === "Request failed with status code 401") {
          setErrorMessage("Please enter valid username or password");
          console.log(errorMessage);
        }
      });
  }
  return (
    
    <div>
      <Container>
      <div style={{ backgroundColor: "white", display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
      <div class="row">
        <div class="col">
          <img
            src={require("../assets/images/home.jpg")}
            class="img-fluid rounded-start"
            alt="..."
          />
        </div>
        <div class="col">
          <br></br> <br></br> <br></br>
          <p style={{ fontSize: "36px", fontWeight: "700", color: "#3A3541" }}>
            Sign in
          </p>
          <p
            style={{
              fontSize: "14px",
              fontWeight: "400",
              color: "#3A3541",
              paddingTop: "0px",
            }}
          >
            Welcome back!
          </p>
          <p>
            Don't have an account?{" "}
            <a href="/signup" style={{ textDecoration: "none" }}>
              {" "}
              Sign up
            </a>
          </p>
          <form onSubmit={signin}>
            <div class="mb-3">
              <label
                for="exampleInputUsername"
                class="form-label text-muted"
                style={{ color: "black" }}
              >
                Username
              </label>
              <input
                type="text"
                className="form-control"
                id="username"
                aria-describedby="emailHelp"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                required={true}
                style={{ width: "90%" }}
              />

              {/* <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div> */}
            </div>
            <div class="mb-3">
              <label
                for="exampleInputPassword1"
                class="form-label text-muted"
                style={{ color: "black" }}
              >
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                required="true"
                style={{ width: "90%" }}
              />
            </div>
            <div class="mb-3 form-check">
              <input
                type="checkbox"
                class="form-check-input"
                id="exampleCheck1"
              />
              <label class="form-check-label" for="exampleCheck1">
                Check me out
              </label>
              <a href="" style={{ float: "right", textDecoration: "none" , width: "30%"}}>
                Forgot passowrd?
              </a>
            </div>

            <div class="d-grid gap-2">
              <button
                type="submit"
                style={{
                  border: "none",
                  borderRadius: "5px",
                  backgroundColor: "#51B737",
                  color: "white",
                  height: "40px",
                }}
              >
                Submit
              </button>
            </div>
            <br></br>
            <center>
              <p style={{ color: "red" }}>{errorMessage}</p>
            </center>
          </form>
        </div>
      </div>
      </div>
      </Container>
    </div>
  );
}
export default Login;

{
  /* <form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
    <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <div class="mb-3 form-check">
    <input type="checkbox" class="form-check-input" id="exampleCheck1">
    <label class="form-check-label" for="exampleCheck1">Check me out</label>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form> */
}
