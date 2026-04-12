import "../PastResults/PastResults.css";

export default function PastResults({ data, title }) {
  if (!data) return <p>No past results available.</p>;

  const results = Array.isArray(data) ? data : [];

  if (!results.length) {
    return <p>No past results available.</p>;
  }

  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - 3);

  const filteredResults = results
    .filter((draw) => new Date(draw.drawDate) >= cutoffDate)
    .sort((a, b) => new Date(b.drawDate) - new Date(a.drawDate));

  return (
    <div className="past-results-container">
      <h3>{title} - Past Results</h3>

      {/* GRID HEADER */}
      <div className="results-grid header">
        <div>Date</div>
        <div>Winning Numbers</div>
        <div>Bonus Number</div>
        <div>Jackpot</div>
      </div>

      {/* GRID ROWS */}
      {filteredResults.length === 0 ? (
        <p>No recent results found.</p>
      ) : (
        filteredResults.map((draw, index) => (
          <div key={index} className="results-grid row">

            {/* DATE */}
            <div className="cell">
              {draw.drawDate}
            </div>

            {/* NUMBERS */}
            <div className="cell numbers">
              {Array.isArray(draw.numbers)
                ? draw.numbers.join(", ")
                : "N/A"}
            </div>

            {/* BONUS */}
            <div className="cell">
              {draw.bonus || "N/A"}
            </div>

            {/* JACKPOT */}
            <div className="cell">
              {draw.jackpot || "N/A"}
            </div>

          </div>
        ))
      )}
    </div>
  );
}