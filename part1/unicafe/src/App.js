import { useState } from "react";
import Button from "./components/Button";
import Estadistics from "./components/Estadistics";
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
        <Button handleClick={handleGood} text="good" />
        <Button handleClick={handleNeutral} text="neutral" />
        <Button handleClick={handleBad} text="bad" />
      </section>
      <Estadistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positive={positive}
      />
    </>
  );
};

export default App;
