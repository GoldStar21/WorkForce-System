import WorldMap from "@/components/WorldMap";
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LiaCarSideSolid } from "react-icons/lia";

const EmpDashboard = () => {
  return (
    <div className="dashboardContent">
      <WorldMap />

      <div className="dashboardContent__cards">
        <div className="dashboardContent__info">
          <div className="dashboardContent__top">
            <h2 className="dashboardContent__title">ASSEMBLERS</h2>
            <AiOutlineTool className="dashboardContent__icon" />
          </div>
          <h3 className="dashboardContent__number"></h3>
          <p className="dashboardContent__title">Active units across globe</p>
        </div>
        <div className="dashboardContent__info">
          <div className="dashboardContent__top">
            <h2 className="dashboardContent__title">ELECTRICIANS</h2>
            <AiOutlineThunderbolt className="dashboardContent__icon" />
          </div>
          <h3 className="dashboardContent__number"></h3>
          <p className="dashboardContent__title">Active units across globe</p>
        </div>
        <div className="dashboardContent__info">
          <div className="dashboardContent__top">
            <h2 className="dashboardContent__title">CARS</h2>
            <LiaCarSideSolid className="dashboardContent__icon" />
          </div>
          <h3 className="dashboardContent__number"></h3>
          <p className="dashboardContent__title">Active Cars across globe</p>
        </div>
      </div>
    </div>
  );
};

export default EmpDashboard;
