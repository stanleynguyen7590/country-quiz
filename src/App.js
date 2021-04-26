import React from "react";
// import axios from "axios";
// import { useState, useEffect } from "react";
import QuestionCard from "./questionCard";
import GlobalStyle from "./globalStyle";
function App() {
  // const [nations, setNations] = useState([]);
  // useEffect(() => {
  //   const fetchNations = async () => {
  //     const result = await axios("https://restcountries.eu/rest/v2/all");
  //     setNations(
  //       result.data.map((item, index) => ({
  //         name: item.name,
  //         capital: item.capital,
  //       }))
  //     );
  //   };
  //   fetchNations();
  // }, []);

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <QuestionCard></QuestionCard>
    </>
  );
}

export default App;
