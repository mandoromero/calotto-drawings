import {
  getTopThreeNumbers,
  getTopThreePairs,
  getTopThreeTriplets
} from "../../utils/calculations";

import "../Calculations/Calculations.css";

export default function Calculations({ data }) {

  if (!data || !Array.isArray(data)) {
    return <p>No data available.</p>;
  }

  const topThreeNumbers = getTopThreeNumbers(data);
  const topThreePairs = getTopThreePairs(data);
  const topThreeTriplets = getTopThreeTriplets(data);

  return (
    <div className="calculations-container">

      {/* 🔢 TOP NUMBERS (3 BALLS) */}
      <div className="section">
        <h2>Top 3 Repeated Numbers</h2>

        <div className="top-repeated-row">
          {topThreeNumbers.map((num, index) => (
            <span key={index} className="top-repeated">
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* 🔗 TOP PAIRS (6 BALLS) */}
      <div className="section">
        <h2>Top 3 Repeated Pairs</h2>

        <div className="pairs-row">
          {topThreePairs.map((pair, index) => (
            <div key={index} className="pair-group">

              {pair.map((num, i) => (
                <span key={i} className="ball white-ball">
                  {num}
                </span>
              ))}

              {/* comma */}
              {index !== topThreePairs.length - 1 && (
                <span className="comma">,</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 🔺 TOP TRIPLETS (9 BALLS) */}
      <div className="section">
        <h2>Top 3 Triplets</h2>

        <div className="triplets-row">
          {topThreeTriplets.map((triplet, index) => (
            <div key={index} className="triplet-group">

              {triplet.map((num, i) => (
                <span key={i} className="ball white-ball">
                  {num}
                </span>
              ))}

              {/* comma */}
              {index !== topThreeTriplets.length - 1 && (
                <span className="comma">,</span>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}