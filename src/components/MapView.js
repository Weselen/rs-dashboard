import React, { useState } from 'react';
import '../styles/MapView.css';

import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import neighborhoods from '../data/vancouver-neighborhoods.js'; //load GeoJSON data
import zoneStats from '../data/zone-stats'; 

// Fix for default Leaflet icons
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

function MapView({ onZoneClick }) {
  const position = [49.2827, -123.1207]; // Center on Vancouver

  // Style each zone (gray fill, white border)
  const geoStyle = {
    fillColor: "#90e0ef",
    weight: 1,
    color: "#0077b6",
    fillOpacity: 0.2,
  };

  // Handler for each zone
  const onEachFeature = (feature, layer) => {
    const zoneName = feature.properties.name;
    const stats = zoneStats[zoneName];

    if (!stats) return;

    const rent = stats.rent?.["2BR"] ?? "N/A";
    const vacancy = stats.vacancy?.["2BR"] ?? "N/A";
    const crime = stats.crimeRate ?? "N/A";

    const popupContent = `
      <strong>${zoneName}</strong><br/>
      💰 2BR Rent: $${rent}<br/>
      📉 Vacancy Rate: ${vacancy}<br/>
      🚨 Crime Rate: ${crime}
    `;

    layer.bindPopup(popupContent);

    layer.on({
      click: () => {
        onZoneClick(zoneName); // Send clicked zone name to parent

      },
      mouseover: (e) => {
        e.target.setStyle({ fillOpacity: 0.8 });
      },
      mouseout: (e) => {
        e.target.setStyle({ fillOpacity: 0.2 });
      },
    });

    // Optional: tooltip label
    layer.bindTooltip(zoneName, { permanent: false, direction: 'center' });
  };

  return (
    <div className="map-view">
      <MapContainer center={position} zoom={12} scrollWheelZoom={true} style={{ height: '100%', borderRadius: '12px' }}>
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* GeoJSON polygons */}
        <GeoJSON data={neighborhoods} style={geoStyle} onEachFeature={onEachFeature} />

        {/* Default center marker for now */}
        <Marker position={position}>
          <Popup>Center Marker</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapView;