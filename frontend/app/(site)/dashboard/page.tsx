import WorldMap from "@/components/WorldMap";

const Dashboard = () => {
  return (
    <div className="dashboardContent">

{/* 1 */}


      {/*<div className="dashboardContent__select">
        <select
        name="Employee group"
        id=""
        className="dashboardContent__dropdown"
      >
        <option value="" disabled>
          EMPLOYEE LOCATIONS
        </option>
        <option value="assemblers">Assemblers</option>
        <option value="electricians">Electricians</option>
      </select>
      </div>
      */}

      {/* 2 */}
      <div className="dashboardContent__map">
      
      {/* Kasnije dodaješ kartice, tablice, grafove itd. */}
      <WorldMap />
      </div>
      
      

{/* 3 */}
      <div className="dashboardContent__cards">
        <div className="dashboardContent__info">
          <h2 className="dashboardContent__title">ASSEMBLERS</h2>
          <h3 className="dashboardContent__number">15</h3>
        </div>
        <div className="dashboardContent__info">
          <h2 className="dashboardContent__title">ELECTRICIANS</h2>
          <h3 className="dashboardContent__number">10</h3>
        </div>
        <div className="dashboardContent__info">
          <h2 className="dashboardContent__title">CARS</h2>
          <h3 className="dashboardContent__number">7</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
