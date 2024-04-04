import GreenSideBar from "../components/GreenSideBar";
import Feed from "../components/Feed";
import "../assets/styles/showcase.css";

function GreenShowcase() {
  return (
    <>
    
      <div className="showCaseContainer">
        <GreenSideBar />
        <Feed/>
      </div>
    </>
  );
}
export default GreenShowcase;
