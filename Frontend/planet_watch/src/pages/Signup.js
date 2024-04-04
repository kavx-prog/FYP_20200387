import React, { useState } from "react";
import { Container } from "react-bootstrap";
import axiosInstance from "../axios";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");

  function signup(e) {
    e.preventDefault();
    const newUser = {
      first_name,
      last_name,
      username,
      email,
      password,
    };
    axiosInstance
      .post("register/", newUser)
      .then((res) => {
        console.log(res.data);
        // localStorage.setItem('access_token',res.data.access);
        // localStorage.setItem('refresh-token', res.data.refresh);
        // axiosInstance.defaults.headers['Authorization']='Bearer' + localStorage.getItem('access_token');
        window.location.replace("/login");
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  // function PasswordVisibilityToggle({ isVisible, onToggle }) {
  //     return (
  //       <span className="password-toggle" onClick={onToggle}>
  //         <FontAwesomeIcon icon={isVisible ? faEyeSlash : faEye} />
  //       </span>
  //     );
  //   }

  return (
    <div style={{ backgroundColor: "white" }}>
      <div class="row">
        <div class="col" style={{ backgroundColor: "white" }}>
          <div>
            <img
              src={require("../assets/images/logo.png")}
              height={"80px"}
              style={{ float: "right" }}
            ></img>
          </div>
          <img
            src={require("../assets/images/earthsave.jpeg")}
            class="img-fluid rounded-start"
            alt="..."
            style={{ width: "100%" }}
          />
        </div>
        <div class="col">
          <br></br> <br></br> <br></br>
          <Container style={{ backgroundColor: "#F8FFF" }}>
            <p
              style={{ fontSize: "36px", fontWeight: "700", color: "#3A3541" }}
            >
              Sign up
            </p>

            <form onSubmit={signup}>
              <div class="mb-3">
                <label class="form-label text-muted" style={{ color: "black" }}>
                  First name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleFirstName"
                  required="true"
                  onChange={(e) => {
                    setFirstName(e.target.value);
                  }}
                />
              </div>
              <div class="mb-3">
                <label class="form-label text-muted" style={{ color: "black" }}>
                  Last name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="exampleLasttName"
                  onChange={(e) => {
                    setLastName(e.target.value);
                  }}
                  required="true"
                />
              </div>
              <div class="mb-3">
                <label class="form-label text-muted" style={{ color: "black" }}>
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  required="true"
                />
              </div>
              <div class="mb-3">
                <label
                  for="exampleInputEmail1"
                  class="form-label text-muted"
                  style={{ color: "black" }}
                >
                  Email address
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required="true"
                  pattern="[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                  title="Email might contain alphanumeric characters, dots, underscores, percent signs, plus signs, hyphens, @ symbol, domain with dot and at least two letters. "
                />
                <div id="emailHelp" class="form-text">
                  We'll never share your email with anyone else.
                </div>
              </div>
              <div class="mb-3">
                <label
                  for="exampleInputPassword1"
                  class="form-label text-muted"
                  style={{ color: "black" }}
                >
                  Password{" "}
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="exampleInputPassword1"
                  pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}$"
                  title='Password must contain at least 6 characters, one uppercase letter, and one digit."'
                  required="true"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
              {/* <div class="mb-3">
                                <label for="exampleInputPassword1" class="form-label text-muted" style={{ color: "black" }}>Confirm password</label>
                                <input type="password" class="form-control" id="exampleInputConfirmPassword1" />
                            </div> */}
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
              <center>
                <p>
                  Back to
                  <a href="/login" style={{ textDecoration: "none" }}>
                    {" "}
                    Sign in
                  </a>
                </p>
              </center>
            </form>
          </Container>
        </div>
      </div>
    </div>
  );
}
export default Signup;

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
