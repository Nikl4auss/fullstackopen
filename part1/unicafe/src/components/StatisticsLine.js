const StatisticsLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>
        {value} {text === "positive" ? "%" : ""}
      </td>
    </tr>
  );
};

export default StatisticsLine;
