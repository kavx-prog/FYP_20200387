import React, { useState } from "react";

import GaugeChart from "react-gauge-chart";
function NavigationCard() {
  const [activeTab, setActiveTab] = useState("tab1");
  const [subactiveTab, setSubActiveTab] = useState("tab3");
  const value = 400; // The value to indicate on the gauge
  const min = 0; // The minimum value of the gauge
  const max = 500; // The maximum value of the gauge
  const percent = (value - min) / (max - min);

  const gaugeData = [
    { value: 0.1, label: "0-50", color: "#71FC30" },
    { value: 0.1, label: "50-100", color: "#FBFF41" },
    { value: 0.1, label: "100-150", color: "#FF784E" },
    { value: 0.1, label: "150-200", color: "#FF0101" },
    { value: 0.2, label: "200-300", color: "#7C05A6" },
    { value: 0.4, label: "300-500", color: "#831717" },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleSubTabClick = (tab) => {
    setSubActiveTab(tab);
  };
  return (
    <div>
      <div
        className="card"
        style={{
          width: "40rem",
          backgroundColor: "#F8FFF7",
          border: "1px solid #B3FF84",
        }}
      >
        <div className="card-header">
          <ul
            className="nav nav-tabs card-header-tabs"
            style={{ backgroundColor: "#F8FFF7", border: "1px solid #B3FF84" }}
          >
            <li className="nav-item" style={{ width: "20rem" }}>
              <a
                className={`nav-link ${activeTab === "tab1" ? "active" : ""}`}
                onClick={() => handleTabClick("tab1")}
                href="#tab1"
              >
                <img
                  alt="Air quality"
                  src={require("../assets/images/air-pollution.png")}
                  class="rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                />{" "}
                Air Quality
              </a>
            </li>
            <li className="nav-item" style={{ width: "18.8rem" }}>
              <a
                className={`nav-link ${activeTab === "tab2" ? "active" : ""}`}
                onClick={() => handleTabClick("tab2")}
                href="#tab2"
              >
                <img
                  alt="Air quality"
                  src={require("../assets/images/stethoscope.png")}
                  class="rounded-circle"
                  style={{ width: "30px", height: "30px" }}
                />{" "}
                Health Tips
              </a>
            </li>
          </ul>
        </div>
        <div className="card-body">
          <div className="tab-content">
            <div
              className={`tab-pane fade ${
                activeTab === "tab1" ? "show active" : ""
              }`}
              id="tab1"
            >
              <h5 className="card-title">Air quality at this time</h5>
              <GaugeChart
                id="gauge-chart"
                nrOfLevels={6}
                arcPadding={0}
                cornerRadius={3}
                percent={percent}
                textColor="#333"
                needleColor="#333"
                colors={gaugeData.map((data) => data.color)}
                arcLabels={gaugeData.map((data) => ({
                  text: data.label,
                  color: "#333",
                }))}
                hideText="True"
              />

              <p className="card-text">This is the content of Tab 1.</p>
            </div>
            <div
              className={`tab-pane fade ${
                activeTab === "tab2" ? "show active" : ""
              }`}
              id="tab2"
            >
              <h5 className="card-title">Planet Watch Health Tips</h5>
              {/* <p className="card-text">This is the content of Tab 2.</p> */}
              <div className="card">
                <div className="card-header">
                  <ul className="nav nav-tabs card-header-tabs">
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          subactiveTab === "tab3" ? "active" : ""
                        }`}
                        onClick={() => handleSubTabClick("tab3")}
                        href="#tab3"
                      >
                        <img
                          alt="Air quality"
                          src={require("../assets/images/general.png")}
                          class="rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          subactiveTab === "tab4" ? "active" : ""
                        }`}
                        onClick={() => handleSubTabClick("tab4")}
                        href="#tab4"
                      >
                        <img
                          alt="Air quality"
                          src={require("../assets/images/inhaler.png")}
                          class="rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          subactiveTab === "tab5" ? "active" : ""
                        }`}
                        onClick={() => handleSubTabClick("tab5")}
                        href="#tab5"
                      >
                        <img
                          alt="Air quality"
                          src={require("../assets/images/children.png")}
                          class="rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={`nav-link ${
                          subactiveTab === "tab6" ? "active" : ""
                        }`}
                        onClick={() => handleSubTabClick("tab6")}
                        href="#tab6"
                      >
                        <img
                          alt="Air quality"
                          src={require("../assets/images/couple.png")}
                          class="rounded-circle"
                          style={{ width: "30px", height: "30px" }}
                        />
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="card-body">
                  <div className="tab-content">
                    <div
                      className={`tab-pane fade ${
                        subactiveTab === "tab3" ? "show active" : ""
                      }`}
                      id="tab3"
                    >
                      <h5 className="card-title">Air quality at this time</h5>
                      <p className="card-text">This is the content of Tab 1.</p>
                    </div>
                  </div>
                  <div className="tab-content">
                    <div
                      className={`tab-pane fade ${
                        subactiveTab === "tab4" ? "show active" : ""
                      }`}
                      id="tab4"
                    >
                      <h5 className="card-title">quality at this time</h5>
                      <p className="card-text">This is the content of Tab 1.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NavigationCard;
