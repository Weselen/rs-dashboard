
import React, { useState } from 'react';
import '../styles/InsightsPanel.css';
import zoneStats from '../data/zone-stats';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';


ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

function InsightsPanel({ zone }) {
  const [activeTab, setActiveTab] = useState('market');
  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Avg Rent ($)',
        data: [2400, 2500, 2550, 2600, 2700, 2750],
        fill: true,
        borderColor: '#0077b6',
        backgroundColor: 'rgba(0, 119, 182, 0.1)',
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
    scales: {
      y: { beginAtZero: false },
    },
  };

  const stats = zoneStats[zone];

  return (
    <div className="insights-panel">
      <h3>{zone}</h3>

      {!stats ? (
        <p>No data available for this zone.</p>
      ) : (
        <>
          <section>
            <strong>🏠 Rent by Bedrooms:</strong>
            <ul>
              {Object.entries(stats.rent || {}).map(([bedroom, price]) => (
                <li key={bedroom}>{bedroom}: ${price}</li>
              ))}
            </ul>
          </section>

          <section>
            <strong>📉 Vacancy Rate by Bedrooms:</strong>
            <ul>
              {Object.entries(stats.vacancy || {}).map(([bedroom, rate]) => (
                <li key={bedroom}>{bedroom}: {rate}</li>
              ))}
            </ul>
          </section>

          <p><strong>🚨 Crime Rate:</strong> {stats.crimeRate}</p>
          <p><strong>🏗️ Housing Starts:</strong> {stats.housingStarts}</p>
          <p><strong>🏁 Completions:</strong> {stats.housingCompletions}</p>
          <p><strong>📊 Housing Need:</strong> {stats.housingNeed}</p>

          <div className='tab-bar'>
            <button
              className={activeTab === 'market' ? 'active' : ''}
              onClick={() => setActiveTab('market')}
            >
              📊 Market Trends
            </button>
            <button
              className={activeTab === 'demographics' ? 'active' : ''}
              onClick={() => setActiveTab('demographics')}
            >
              📈 Demographics & Economy
            </button>
          </div>   
            {/* DEMOGRAPHICS TAB */}
          {activeTab === 'demographics' && (
          <div className="chart-wrapper">
            <Line data={chartData} options={chartOptions} />
          </div>     
          )}
        </>
      )}
    </div>
  );
}

export default InsightsPanel;