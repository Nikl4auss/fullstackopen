import StatisticsLine from "./StatisticsLine";

const Statistics = ({ good, neutral, bad, all, average, positive }) => {
  if (all === 0) {
    return (
      <section>
        <h1>Statistics</h1>
        <p>no feedback given</p>
      </section>
    );
  }

  return (
    <section>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text={"good"} value={good} />
          <StatisticsLine text={"neutral"} value={neutral} />
          <StatisticsLine text={"bad"} value={bad} />
          <StatisticsLine text={"all"} value={all} />
          <StatisticsLine text={"average"} value={average} />
          <StatisticsLine text={"positive"} value={positive} />
        </tbody>
      </table>
    </section>
  );
};

export default Statistics;
