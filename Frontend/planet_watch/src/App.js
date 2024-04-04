import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import AQIMap from "./components/aqimap";
import NewsDahsboard from "./pages/NewsDashboard";
import TipsTricks from "./pages/TipsTricks";
import ThunderTips from "./pages/ThunderTips";
import FloodTips from "./pages/FloodTips";
import Homepage from "./pages/Homepage";
import NavigationCard from "./components/NavigationCard";
import ProjectProfile from "./pages/ProjectProfile";
// import WarningAlerts from "./pages/WarningAlerts";
import CarbonChatBot from "./pages/CarbonChatBot";
import CarbonDashBoard from "./pages/CarbonDashBoard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Layout from "./components/Layout";
import LandslideTips from "./pages/LandslideTips";
import CarbonnFood from "./pages/CarbonFood";
import CarbonElectricity from "./pages/CarbonElectricity";
import CarbonTransportation from "./pages/CarbonTransportation";
import CarbonIndustry from "./pages/CarbonIndustry";
import CycloneTips from "./pages/CycloneTips";
import Dashboard from "./pages/Dashboard";
import PrivateRoutes from "./protectedRoutes";
import PublishBlogs from "./pages/PublishBlogs";
import CreateComplaints from "./pages/CreateComplaints";

import LocationForm from "./pages/LocationForm";
import LocationDropdown from "./pages/LocationDropdown";

import Checkwarning from "./pages/Checkwarning";
import Authority from "./pages/Authority";
import LineChartExample from "./pages/LineChartExample";

import Road from "./pages/CarbonEmission/Transportation/Road";
import Train from "./pages/CarbonEmission/Transportation/Train";
import Plane from "./pages/CarbonEmission/Transportation/Plane";
import Sea from "./pages/CarbonEmission/Transportation/Sea";
import Energy from "./pages/CarbonEmission/Energy/Energy";
import Food from "./pages/CarbonEmission/Diet And Food/Food";
import Beverages from "./pages/CarbonEmission/Diet And Food/Beverages";
import WaterAndGas from "./pages/CarbonEmission/Energy/WaterAndGas";
import EmergencyKit from "./pages/EmergencyKit"
import Logout from "./components/Logout";
import AccountSetup from "./pages/AccountSetup";
import CheckAccup from "./pages/CheckAccup";
import Notifications from "./pages/Noftifications";
import UserDetails from "./pages/UserDetails";
import EmissionSetup from "./pages/CarbonEmission/EmissionSetup";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" Component={Homepage} />
        <Route exact path="/login" Component={Login} />
        <Route exat path="/signup" Component={Signup} />
      </Routes>
      <Routes>
        {/* <Route exact path="/dashboard" Component={Dashboard} /> */}
        <Route element={<PrivateRoutes />}>
          <Route exact path="/news" element={<NewsDahsboard />} />
          <Route path="/airquality" element={<AQIMap />} />
          <Route path="/warnings" element={<Checkwarning />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route exact path="/accup" Component={AccountSetup} />
          <Route exact path="/checkaccup" Component={CheckAccup} />
          <Route exact path="/notifications" Component={Notifications} />
          <Route exact path="/checkaccup" Component={UserDetails} />
          <Route exact path="/emergencykit" Component={EmergencyKit} />
          <Route exact path="/floodtips" Component={FloodTips} />
          <Route exact path="/thunder" Component={ThunderTips} />
          <Route exact path="/freefood" Component={LocationForm} />
          <Route exact path="/locshow" Component={LocationDropdown} />
        </Route>

        {/* Transportation emission estimation */}
        <Route path="/road" element={<Road />} />
        <Route path="/train/:objectID" element={<Train />} />
        <Route path="/plane/:objectID" element={<Plane />} />
        <Route path="/sea/:objectID" element={<Sea />} />

        {/* energy emission estimation */}
        <Route exact path="/energy" element={<Energy />} />
        <Route exact path="/waterAndGas/:objectID" element={<WaterAndGas />} />

        {/* food and water emission estimation */}
        <Route exact path="/food" element={<Food />} />
        <Route exact path="/beverages/:objectID" element={<Beverages />} />

        <Route exact path="/emissionSetup" element={<EmissionSetup />} />

        <Route exact path="/nav" Component={NavigationCard} />
        <Route exact path="/landslidetips" Component={LandslideTips} />
        <Route exact path="/carbonDash" Component={CarbonDashBoard} />
        <Route exact path="/chatBot" Component={CarbonChatBot} />
        <Route exact path="/foods" Component={CarbonnFood} />
        <Route exact path="/elec" Component={CarbonElectricity} />
        <Route exact path="/trans" Component={CarbonTransportation} />
        <Route exact path="/industry" Component={CarbonIndustry} />
        <Route exact path="/cyclonetips" Component={CycloneTips} />
        <Route exact path="/addblogs" Component={PublishBlogs} />
        <Route exact path="/addcomplaints" Component={CreateComplaints} />
        <Route exact path="/authority" Component={Authority} />
        <Route exact path="/linechart" Component={LineChartExample} />
        <Route exact path="/logout" Component={Logout} />
        
        {/* <Route exact path="" Component={LineChartExample} /> */}
        {/* <Route exact path="/land" Component={LandslideWarning} /> */}
      </Routes>
    </Router>
  );

  //   <BrowserRouter>

  //   <Route path="/" component={Frontpage} exact />
  //   <Route path="/home" component={HomePage} />
  //   <Route path="/about" component={AboutPage} />

  //   <Route
  //     path="/admin"
  //     render={({ match: { url } }) => (
  //       <>
  //         <Route path={`${url}/`} component={Backend} exact />
  //         <Route path={`${url}/home`} component={Dashboard} />
  //         <Route path={`${url}/users`} component={UserPage} />
  //       </>
  //     )}
  //   />

  // </BrowserRouter>
}

export default App;
