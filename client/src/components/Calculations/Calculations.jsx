import {
  getTopThreeNumbers,
  getTopThreePairs,
  getTopThreeTriplets
} from "../../utils/calculations";

import "../Calculations/Calculations.css";

export default function Calculations({ data }) {

  // 🛑 SAFETY CHECK
  if (!data || !Array.isArray(data)) {
    return <p>No data available.</p>;
  }

  // 📊 CALCULATIONS
  const topThreeNumbers = getTopThreeNumbers(data);
  const topThreePairs = getTopThreePairs(data);
  const topThreeTriplets = getTopThreeTriplets(data);

  return (
    <div className="calculations-container">

      {/* 🔢 TOP 3 NUMBERS */}
      <div className="section">
        <h2>Top 3 Repeated Numbers</h2>

        <div className="top-three">
          {topThreeNumbers.map((num, index) => (
            <span key={index} className="ball white-ball">
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* 🔗 TOP 3 PAIRS */}
      <div className="section">
        <h2>Top 3 Repeated Pairs</h2>

        <div className="pairs-line">
          {topThreePairs.map((pair, index) => (
            <span key={index} className="pair-text">
              {pair.map((num) => `[${num}]`).join("")}
              {index !== topThreePairs.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>

      {/* 🔺 TOP 3 TRIPLETS */}
      <div className="section">
        <h2>Top 3 Triplets</h2>

        <div className="triplets-line">
          {topThreeTriplets.map((triplet, index) => (
            <span key={index} className="triplet-text">
              {triplet.map((num) => `[${num}]`).join("")}
              {index !== topThreeTriplets.length - 1 && ", "}
            </span>
          ))}
        </div>
      </div>

    </div>
  );
}