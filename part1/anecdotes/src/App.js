import { useState } from "react";
import Button from "./components/Button";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [mostVoted, setMostVoted] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const generateRandomNumber = (min, max) =>
    Math.floor(Math.random() * (max - min) + min);

  const handleClick = () => {
    const randomNumber = generateRandomNumber(0, anecdotes.length);
    setSelected(randomNumber);
  };

  const handleVote = () => {
    const newPoints = [...points];
    newPoints[selected] = newPoints[selected] + 1;
    setPoints(newPoints);
    handleMostVoted(newPoints);
  };

  const handleMostVoted = (points) => {
    console.log(Math.max(...points));
    const newMostVoted = points.indexOf(Math.max(...points));
    setMostVoted(newMostVoted);
  };

  return (
    <div>
      <section>
        <h1>Anecdote of the day</h1>
        <p>{anecdotes[selected]}</p>
        <p>has {points[selected]} votes</p>
        <Button handleClick={handleClick} text={"next anecdote"} />
        <Button handleClick={handleVote} text={"vote"} />
      </section>
      <section>
        <h1>Most Voted</h1>
        <p>{anecdotes[mostVoted]}</p>
        <p>has {points[mostVoted]} votes</p>
      </section>
    </div>
  );
};

export default App;
