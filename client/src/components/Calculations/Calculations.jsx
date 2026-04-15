import { getTopThreeNumbers } from "../../utils/calculations";

export default function Calculations({ data }) {
  if (!data || !Array.isArray(data)) {
    return <p>No data available.</p>;
  }

  const topThreeRepeated = getTopThreeNumbers(data);

  return (
    <div className="calculations-container">
      <div className="top-three-repeated-container">
        <p className="top-repeated">
          Top 3 Repeated Numbers:
        </p>

        <div className="balls-row">
          {topThreeRepeated.map((num, index) => (
            <span key={index} className="ball white-ball">
              {num}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}