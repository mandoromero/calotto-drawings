import "../PastResults/PastResults.css";

export default function PastResults({ data }) {
  if (!data) return <p>No past results available.</p>;

  // Handle both API shapes
  const results = data?.DrawResults || data;

  if (!Array.isArray(results)) {
    return <p>Invalid data format</p>;
  }

  // Get last 3 months
  const previousResults = new Date();
  previousResults.setMonth(previousResults.getMonth() - 3);

  const filteredResults = results
    .filter((draw) => {
      const drawDate = new Date(draw.DrawDate);
      return drawDate >= previousResults;
    })
    .sort((a, b) => new Date(b.DrawDate) - new Date(a.DrawDate));

    console.log("PastResults recieived data:", data);
    console.log("Results:", results);

  return (
    <div className="past-results-container">
      <h3>{title}</h3>

      <div className="results-scroll">
        {filteredResults.length === 0 ? (
          <p>No recent results found.</p>
        ) : (
          filteredResults.map((draw, index) => (
            <div key={index} className="result-row">
              <p className="result-date">
                <strong>{draw.DrawDate}</strong>
              </p>

              <p className="result-numbers">
                {Array.isArray(draw.WinningNumbers)
                  ? draw.WinningNumbers.join(", ")
                  : draw.WinningNumbers || "N/A"}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}