import React, { useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(0);

  const increaseNumber = () => {
    setNumber((prev) => prev + 1);
  };

  const decreaseNumber = () => {
    setNumber((prev) => prev - 1);
  };

  return (
    <div>
      <div className="App">Hello Mehmet!</div>
      <button onClick={increaseNumber}>Increase Number</button>
      <button onClick={decreaseNumber}>Decrease Number</button>
      <div>{number}</div>
    </div>
  );
}

export default App;
