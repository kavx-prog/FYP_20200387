import { BrowserRouter as Router, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();

  return (
    <footer class="bg-dark text-white bottom">
      <div class="container p-4">
        <div class="row">
          <div class="col-lg-4 col-md-12 mb-4 mb-md-0">
            <a href="#">
              <img src={require("../assets/images/logo.png")} height={200} />
            </a>
          </div>
          <div class="col-lg-3 col-md-6 mb-4 mb-md-0">
            <center>
              <h5 class="text-uppercase" style={{ paddingTop: "2rem"}}>{t("services")}</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <Link
                    to="/warnings"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("alert")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/carbonDash"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("carbon_footprint_calculator")}
                  </Link>
                </li>

                
                <li>
                  <Link
                    to="/floodtips"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("tips_and_tricks")}
                  </Link>
                </li>

              
              </ul>
            </center>
          </div>

          <div
            class="col-lg-4 col-md-6 mb-4 mb-md-0"
            style={{ paddingLeft: "10%" }}
          >
            <center>
              <h5 class="text-uppercase" style={{ paddingTop: "2rem"}}>{t("tools")}</h5>

              <ul class="list-unstyled mb-0">
                <li>
                  <Link
                    to="/airquality"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("air_quality_tracker")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/locshow"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("free_food_resources")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/addcomplaints"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("carbon_complaints")}
                  </Link>
                </li>

                <li>
                  <Link
                    to="/foods"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("carbon_reduction_g")}
                  </Link>
                </li>
                
                {/* <li>
                  <Link
                    to="/emergencykit"
                    class="text-white"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {t("emergency kit")}
                  </Link>
                </li> */}
              </ul>
            </center>
          </div>

        </div>
        <hr></hr>
      </div>

      <div class="text-center p-1" style={{ backgroundcolor: "black" }}>
        © 2024 PlanetWatch
      </div>
    </footer>
  );
}

export default Footer;
