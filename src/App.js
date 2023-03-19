import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  // const [fact, setFact] = useState("");
  // fetch("https://catfact.ninja/fact")
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log(data);
  //   });
  // const fetchCat = () => {
  //   axios.get("https://catfact.ninja/fact").then((res) => {
  //     setFact(res.data.fact);
  //     console.log(res.data);
  //   });
  // };
  // useEffect(() => {
  //   fetchCat();
  // }, []);

  // return (
  //   <div>
  //     <button onClick={fetchCat}> Generate Cat Fact</button>
  //     <p>{fact}</p>
  //   </div>
  // );
  const [name, setName] = useState("");
  const [predictedAge, setPredictedAge] = useState(null);
  const fetchData = () => {
    axios.get(`https://api.agify.io/?name=${name}`).then((res) => {
      setPredictedAge(res.data);
    });
  };

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="namee"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <button onClick={fetchData}>Guess Age</button>
        <p>Name: {predictedAge?.name}</p>
        <p>Age is: {predictedAge?.age}</p>
        <p>Count: {predictedAge?.count}</p>
      </div>
    </>
  );
}

export default App;
