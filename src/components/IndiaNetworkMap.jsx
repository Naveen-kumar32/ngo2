import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Building2 } from "lucide-react";

// Accurate vector paths for all 36 States & Union Territories of India
import { INDIA_STATES } from "./indiaStateData";

export const HUBS = [
  { id: "delhi", name: "Delhi NCR", x: 344, y: 321, ngos: 142, focus: "Education & Child Welfare", region: "North" },
  { id: "mumbai", name: "Mumbai", x: 235, y: 605, ngos: 185, focus: "Healthcare & Livelihoods", region: "West" },
  { id: "bengaluru", name: "Bengaluru", x: 346, y: 775, ngos: 134, focus: "Tech Education & Environment", region: "South" },
  { id: "chennai", name: "Chennai", x: 422, y: 785, ngos: 128, focus: "Disability Care & Women", region: "South" },
  { id: "kolkata", name: "Kolkata", x: 654, y: 495, ngos: 116, focus: "Rural Literacy & Healthcare", region: "East" },
  { id: "hyderabad", name: "Hyderabad", x: 405, y: 645, ngos: 98, focus: "Youth Skills & Nutrition", region: "South" },
  { id: "ahmedabad", name: "Ahmedabad", x: 200, y: 495, ngos: 88, focus: "Water & Women Groups", region: "West" },
  { id: "jaipur", name: "Jaipur", x: 308, y: 360, ngos: 76, focus: "Rural Artisans & Schools", region: "North" },
  { id: "lucknow", name: "Lucknow", x: 440, y: 375, ngos: 82, focus: "Community Health & Sanitation", region: "North" },
  { id: "guwahati", name: "Guwahati", x: 745, y: 405, ngos: 64, focus: "Ecology & Indigenous Support", region: "NorthEast" },
  { id: "bhubaneswar", name: "Bhubaneswar", x: 575, y: 565, ngos: 71, focus: "Disaster Relief & Tribal Care", region: "East" },
  { id: "kochi", name: "Kochi", x: 310, y: 865, ngos: 69, focus: "Coastal Ecology & Health", region: "South" },
  { id: "chandigarh", name: "Chandigarh", x: 335, y: 255, ngos: 54, focus: "Youth Skills & Farmers", region: "North" },
  { id: "srinagar", name: "Srinagar", x: 295, y: 155, ngos: 45, focus: "Winter Relief & Livelihood", region: "North" },
  { id: "patna", name: "Patna", x: 570, y: 395, ngos: 68, focus: "Primary Education & Health", region: "East" },
  { id: "bhopal", name: "Bhopal", x: 375, y: 470, ngos: 62, focus: "Forest Care & Tribal Rights", region: "Central" }
];

export const NETWORK_LINKS = [
  ["delhi", "jaipur"],
  ["delhi", "chandigarh"],
  ["delhi", "srinagar"],
  ["delhi", "lucknow"],
  ["delhi", "ahmedabad"],
  ["delhi", "mumbai"],
  ["delhi", "bhopal"],
  ["delhi", "kolkata"],
  ["mumbai", "ahmedabad"],
  ["mumbai", "bhopal"],
  ["mumbai", "hyderabad"],
  ["mumbai", "bengaluru"],
  ["bengaluru", "chennai"],
  ["bengaluru", "hyderabad"],
  ["bengaluru", "kochi"],
  ["chennai", "hyderabad"],
  ["chennai", "bhubaneswar"],
  ["chennai", "kochi"],
  ["hyderabad", "bhopal"],
  ["hyderabad", "bhubaneswar"],
  ["kolkata", "bhubaneswar"],
  ["kolkata", "patna"],
  ["kolkata", "guwahati"],
  ["lucknow", "patna"],
  ["lucknow", "bhopal"],
  ["patna", "guwahati"],
  ["bhopal", "ahmedabad"],
  ["bhopal", "bhubaneswar"]
];

export default function IndiaNetworkMap({ isHero = false, compact = false }) {
  const [activeHub, setActiveHub] = useState(HUBS[0]);
  const [hoveredHub, setHoveredHub] = useState(null);

  const current = hoveredHub || activeHub;
  const hubMap = Object.fromEntries(HUBS.map(h => [h.id, h]));

  return (
    <div className={`map-component-root ${isHero ? "map-in-hero" : ""} ${compact ? "map-compact" : ""}`}>
      {/* Map Display Box - Completely unobstructed without popup cards covering it */}
      <div className="map-svg-card">
        <svg
          className="map-india-svg"
          viewBox="100 40 800 920"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="mapAura" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#2f7a5d" stopOpacity="0.12" />
              <stop offset="100%" stopColor="#f8f4ec" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="stateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f8f4ec" />
              <stop offset="50%" stopColor="#f3eee3" />
              <stop offset="100%" stopColor="#e6dfd3" />
            </linearGradient>
            <filter id="glowEffect" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="pinShadow" x="-50%" y="-50%" width="200%" height="200%">
              <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#231f1a" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Aura */}
          <circle cx="480" cy="500" r="420" fill="url(#mapAura)" />

          {/* 36 Authentic State Outlines */}
          <g className="states-layer">
            {INDIA_STATES.map(state => (
              <path
                key={state.id}
                d={state.d}
                className="state-path"
                fill="url(#stateGradient)"
                stroke="#a89e90"
                strokeOpacity="0.7"
                strokeWidth="0.8"
                strokeLinejoin="round"
              />
            ))}
          </g>

          {/* Active Network Routes - All highlighted in vibrant orange */}
          <g className="routes-layer">
            {NETWORK_LINKS.map(([fromId, toId], idx) => {
              const from = hubMap[fromId];
              const to = hubMap[toId];
              if (!from || !to) return null;

              const isHighlighted =
                current && (current.id === fromId || current.id === toId);

              const dx = to.x - from.x;
              const dy = to.y - from.y;
              const cx = (from.x + to.x) / 2 - dy * 0.12;
              const cy = (from.y + to.y) / 2 + dx * 0.12;
              const pathD = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;

              return (
                <g key={`${fromId}-${toId}`}>
                  <motion.path
                    d={pathD}
                    fill="none"
                    stroke={isHighlighted ? "#a9431f" : "#d98e1f"}
                    strokeOpacity={isHighlighted ? 1 : 0.85}
                    strokeWidth={isHighlighted ? "2.8" : "1.8"}
                    strokeLinecap="round"
                    filter={isHighlighted ? "url(#glowEffect)" : undefined}
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, delay: (idx % 8) * 0.08 }}
                  />
                  <circle r={isHighlighted ? 4 : 2.8} fill={isHighlighted ? "#a9431f" : "#d98e1f"}>
                    <animateMotion
                      path={pathD}
                      dur={`${2.5 + (idx % 4) * 0.6}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              );
            })}
          </g>

          {/* Drop Pins on Hubs */}
          <g className="pins-layer">
            {HUBS.map(hub => {
              const isSelected = current && current.id === hub.id;

              return (
                <g
                  key={hub.id}
                  className="city-pin"
                  transform={`translate(${hub.x}, ${hub.y})`}
                  style={{
                    cursor: "pointer",
                    transition: "all 0.3s ease"
                  }}
                  onClick={() => setActiveHub(hub)}
                  onMouseEnter={() => setHoveredHub(hub)}
                  onMouseLeave={() => setHoveredHub(null)}
                >
                  {/* Radar pulse rings */}
                  <circle
                    r="10"
                    fill={isSelected ? "rgba(217, 142, 31, 0.3)" : "rgba(29, 91, 69, 0.25)"}
                    className="pin-pulse"
                  />

                  {/* Pin Shape */}
                  <g transform="translate(-8, -22)" filter="url(#pinShadow)">
                    <path
                      d="M8 0C3.58 0 0 3.58 0 8C0 14 8 22 8 22C8 22 16 14 16 8C16 3.58 12.42 0 8 0Z"
                      fill={isSelected ? "#d98e1f" : "#1d5b45"}
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                    <circle cx="8" cy="8" r="3" fill="#ffffff" />
                  </g>

                  {/* Pin text label */}
                  <text
                    x="0"
                    y="14"
                    textAnchor="middle"
                    fill={isSelected ? "#b45309" : "#231f1a"}
                    fontSize="11"
                    fontWeight="700"
                    className="pin-text-label"
                  >
                    {hub.name}
                  </text>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Hub Details Bar (Positioned OUTSIDE and BELOW the map so it never blocks the map!) */}
      {current && (
        <div className="hub-info-bar">
          <div className="hib-left">
            <span className="hib-badge">
              <MapPin size={12} /> {current.region} Hub
            </span>
            <h4>{current.name} Network</h4>
            <p>{current.focus}</p>
          </div>
          <div className="hib-right">
            <div className="hib-stat">
              <Building2 size={14} color="#6fa88a" />
              <strong>{current.ngos}+</strong>
              <span>Listed NGOs</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
