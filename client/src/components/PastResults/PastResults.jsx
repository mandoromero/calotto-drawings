import "./PastResults.css";

export default function PastResults({ data, title = "Past 3 Months" }) {
  if (!data) return null;

  // Handle both possible API shapes
  const results = data?.DrawResults || data;

  // Get last 3 months
  const PastResults = new Date();
  PastResults.setMonth(PastResults.getMonth() - 3);

  const filteredResults = (results || [])
    .filter((draw) => {
      const drawDate = new Date(draw.DrawDate);
      return drawDate >= PastResults;
    })
    .sort((a, b) => new Date(b.DrawDate) - new Date(a.DrawDate));

  return (
    <div className="past-results-container">
      <h3>{title}</h3>

      <div className="results-scroll">
        {filteredResults.map((draw, index) => (
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
        ))}
      </div>
    </div>
  );
}