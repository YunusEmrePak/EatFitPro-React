import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const idRef = useRef();

  const showId = () => {
    fetch(`http://localhost:8080/user/get?id=${idRef.current.value}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.email === null) {
          setError("User is not found!");
          setData([]);
          return;
        } else {
          console.log(data);
          setData(data);
        }
      });
  };

  return (
    <div>
      <input ref={idRef} />
      <button onClick={showId}>Show</button>
      <div>Name: {data.name}</div>
      <div>Surname: {data.surname}</div>
      <div>Email: {data.email}</div>
      <div>Length: {data.length}</div>
      <div>Weight: {data.weight}</div>
      <div>{error}</div>
    </div>
  );
}

export default App;

// https://api.themoviedb.org/3/search/movie?api_key=bcc4ff10c2939665232d75d8bf0ec093&query=${query}

// http://localhost:8080/user/get?id=50
