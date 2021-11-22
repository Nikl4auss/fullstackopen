import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const handleGood = () => {
    const newAll = all + 1;
    const newGood = good + 1;
    setAll(newAll);
    setGood(newGood);
    handleAverage(newGood, bad, newAll);
    handlePositive(newGood, newAll);
  };

  const handleNeutral = () => {
    const newAll = all + 1;
    setAll(newAll);
    setNeutral(neutral + 1);
    handleAverage(good, bad, newAll);
    handlePositive(good, newAll);
  };

  const handleBad = () => {
    const newAll = all + 1;
    const newBad = bad + 1;
    setAll(newAll);
    setBad(newBad);
    handleAverage(good, newBad, newAll);
    handlePositive(good, newAll);
  };

  const handleAverage = (good, bad, all) => {
    setAverage((good - bad) / all);
  };

  const handlePositive = (good, all) => {
    setPositive((good / all) * 100);
  };

  return (
    <>
      <section>
        <h1>give feedback</h1>
        <button onClick={() => handleGood()}>good</button>
        <button onClick={() => handleNeutral()}>neutral</button>
        <button onClick={() => handleBad()}>bad</button>
      </section>
      <section>
        <h1>Stadistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
        <p>all {all}</p>
        <p>average {average}</p>
        <p>positive {positive} %</p>
      </section>
    </>
  );
};

export default App;
