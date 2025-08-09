import React from 'react';
import '../styles/FilterPanel.css';

function FilterPanel() {
  return (
    <div className="filter-panel">
      <h3>Quick Filters</h3>
      <div className="filter-group">
        <label>City</label>
        <select><option>Vancouver</option></select>
      </div>
      <div className="filter-group">
        <label>Property Type</label>
        <select><option>All</option></select>
      </div>
      <div className="filter-group">
        <label>Bedrooms</label>
        <select><option>Any</option></select>
      </div>
      <div className="filter-group">
        <label>Price Range</label>
        <input type="range" min="0" max="1000000" />
      </div>
    </div>
  );
}

export default FilterPanel;