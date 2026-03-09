"use client"

import WorldMap from "@/components/WorldMap";
import { useDashboardHook } from "@/hooks/useDashboardHook";

const Dashboard = () => {

  const {
    assemblers,
    electricians,
    cars
  } = useDashboardHook ();



  return (
    <div className="dashboardContent">
      <div className="dashboardContent__map">
        
        {/* Kasnije dodaješ kartice, tablice, grafove itd. */}
        <WorldMap />
      </div>

      <div className="dashboardContent__cards">
        <div className="dashboardContent__info">
          <h2 className="dashboardContent__title">ASSEMBLERS</h2>
          <h3 className="dashboardContent__number">{assemblers}</h3>
        </div>
        <div className="dashboardContent__info">
          <h2 className="dashboardContent__title">ELECTRICIANS</h2>
          <h3 className="dashboardContent__number">{electricians}</h3>
        </div>
        <div className="dashboardContent__info">
          <h2 className="dashboardContent__title">CARS</h2>
          <h3 className="dashboardContent__number">{cars}</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
