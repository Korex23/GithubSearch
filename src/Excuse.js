import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [response, setResponse] = useState("");
  const fetchExcuse = (excuse) => {
    axios
      .get(`https://excuser-three.vercel.app/v1/excuse/${excuse}/`)
      .then((res) => {
        setResponse(res.data[0].excuse);
      });
  };

  return (
    <>
      <h1>Generate an Excuse</h1>
      <div>
        <button onClick={() => fetchExcuse("party")}>Party</button>
      </div>
      <div>
        <button onClick={() => fetchExcuse("family")}>Family</button>
      </div>
      <button onClick={() => fetchExcuse("office")}>Office</button>

      <p>{response}</p>
    </>
  );
};

export default App;
