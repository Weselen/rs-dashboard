
import React, { useState } from 'react';
import '../styles/Dashboard.css';
import FilterPanel from './FilterPanel';
import MapView from './MapView';
import InsightsPanel from './InsightsPanel';

function Dashboard() {
  const [selectedZone, setSelectedZone] = useState('Mount Pleasant'); // default zone

  return (
    <div className="dashboard-wrapper">
      <FilterPanel />
      <MapView onZoneClick={setSelectedZone} />
      <InsightsPanel zone={selectedZone} />
    </div>
  );
}

export default Dashboard;