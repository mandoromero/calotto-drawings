import "../PastResults/PastResults.css";

export default function PastResults({ data, title }) {
  if (!data) {
    return <p>No past results available.</p>;
  }

  const results = Array.isArray(data) ? data : [];

  if (!results.length) {
    return <p>No past results available.</p>;
  }

  // Get YYYY-MM-DD without timezone conversion
  const getDateString = (date) => {
    if (!date) {
      return null;
    }

    const dateString = String(date).split("T")[0];
    const [year, month, day] = dateString.split("-");

    if (!year || !month || !day) {
      return null;
    }

    return dateString;
  };

  // Format date for display
  const formatDate = (date) => {
    const dateString = getDateString(date);

    if (!dateString) {
      return "N/A";
    }

    const [year, month, day] = dateString.split("-");

    return new Date(
      Number(year),
      Number(month) - 1,
      Number(day)
    ).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  /*
   * Sort ALL results from newest to oldest.
   *
   * Example:
   *
   * Sep 21  <-- latest draw / Lottery Card
   * Sep 19  <-- Past Results
   * Sep 17  <-- Past Results
   * Sep 14  <-- Past Results
   * Sep 12  <-- Past Results
   * ...
   */
  const sortedResults = results
    .filter((draw) => getDateString(draw.drawDate))
    .sort((a, b) => {
      const dateA = getDateString(a.drawDate);
      const dateB = getDateString(b.drawDate);

      return dateB.localeCompare(dateA);
    });

  /*
   * Remove the newest result.
   *
   * The newest result belongs on the Lottery Card.
   * Everything after it belongs in Past Results.
   */
  const previousResults = sortedResults.slice(1);

  return (
    <div className="past-results-container">
      <h3 className="page-title">
        {title} - Past Results
      </h3>

      <div className="results-scroll">
        {/* GRID HEADER */}
        <div className="results-grid header">
          <div>Date</div>
          <div>Winning Numbers</div>
          <div>Bonus Number</div>
          <div>Jackpot</div>
        </div>

        {/* GRID ROWS */}
        {previousResults.length === 0 ? (
          <p>No past results available.</p>
        ) : (
          previousResults.map((draw, index) => (
            <div
              key={`${draw.drawDate}-${index}`}
              className="results-grid row"
            >
              {/* DATE */}
              <div className="cell">
                {formatDate(draw.drawDate)}
              </div>

              {/* WINNING NUMBERS */}
              <div className="cell numbers">
                {Array.isArray(draw.numbers)
                  ? draw.numbers.join(", ")
                  : "N/A"}
              </div>

              {/* BONUS NUMBER */}
              <div className="cell">
                {draw.bonus ?? "N/A"}
              </div>

              {/* JACKPOT */}
              <div className="cell">
                {draw.jackpot ?? "N/A"}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}