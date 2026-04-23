"use client";

import WorldMap from "@/components/WorldMap";
import { useDashboardHook } from "@/hooks/useDashboardHook";
import { AiOutlineTool } from "react-icons/ai";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { LiaCarSideSolid } from "react-icons/lia";

const Dashboard = () => {
  const { assemblers, electricians, cars } = useDashboardHook();

  return (
    <div className="dashboardContent">
      <WorldMap />

      <div className="dashboardContent__cards">
        <div className="dashboardContent__info">
          <div className="dashboardContent__top">
            <h2 className="dashboardContent__role">ASSEMBLERS</h2>
            <AiOutlineTool className="dashboardContent__icon" />
          </div>
          <h3 className="dashboardContent__number">{assemblers}</h3>
          <p className="dashboardContent__title">Active units across globe</p>
        </div>
        <div className="dashboardContent__info">
          <div className="dashboardContent__top">
            <h2 className="dashboardContent__role">ELECTRICIANS</h2>
            <AiOutlineThunderbolt className="dashboardContent__icon" />
          </div>
          <h3 className="dashboardContent__number">{electricians}</h3>
          <p className="dashboardContent__title">Active units across globe</p>
        </div>
        <div className="dashboardContent__info">
          <div className="dashboardContent__top">
            <h2 className="dashboardContent__role">CARS</h2>
            <LiaCarSideSolid className="dashboardContent__icon" />
          </div>
          <h3 className="dashboardContent__number">{cars}</h3>
          <p className="dashboardContent__title">Active Cars across globe</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
