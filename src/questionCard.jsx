import styled from "styled-components";
import axios from "axios";
import background from "./assets/img/background.png";
import _ from "lodash";
import { ReactComponent as Adventure } from "./assets/img/undraw_adventure_4hum 1.svg";
import { ReactComponent as Results } from "./assets/img/undraw_winners_ao2o_2.svg";
import { useState, useEffect } from "react";
import QuestionField from "./questionField";
const Container = styled.div`
  background-image: url(${background});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 100%;
  position: relative;
  .country-quiz-text {
    position: absolute;
    font-family: Poppins;
    font-style: normal;
    font-weight: 700;
    font-size: 36px;
    line-height: 54px;
    top: -48px;
    left: 0;
    text-transform: uppercase;
    color: #f2f2f2;
  }
  .adventure {
    position: absolute;
    top: -60px;
    right: 0;
  }
`;

const QuestionBox = styled.div`
  position: absolute;
  width: ${props => (props.showResult ? "30%" : "60%")};
  height: ${props => (props.showResult ? "60%" : "fit-content%")};
  left: ${props => (props.showResult ? "35%" : "20%")};
  top: ${props => (props.showResult ? "20%" : "10%")};
  border-radius: 24px;
  background-color: #ffffff;
  p {
    font-family: Poppins;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 36px;
    color: #2f527b;
    margin-top: ${props => (props.questionType === 0 ? "68px" : "68px")};
    margin-left: 32px;
  }

  .question-field {
    margin: 25px 5%;
  }
  img {
    position: absolute;
    top: 68px;
    right: 5%;
    width: 84px;
    height: 54px;
  }
  .next-button {
    display: flex;
    justify-content: flex-start;
    width: 116px;
    margin: 0px 5% 2% auto;
    padding: 15px 36px;
    background-color: #f9a826;
    box-shadow: 0px 2px 4px rgba(252, 168, 47, 0.4);
    border-radius: 12px;
    cursor: pointer;
    p {
      margin: 0;
      font-family: Poppins;
      font-style: normal;
      font-weight: bold;
      font-size: 18px;
      line-height: 27px;
      color: #ffffff;
    }
  }

  .results-svg {
    display: block;
    width: 70%;
    height: 40%;
    margin: 0px auto 10% auto;
  }
  .results-text {
    display: block;
    font-family: Poppins;
    font-style: normal;
    font-weight: 800;
    font-size: 48px;
    line-height: 72px;
    color: #1d355d;
    text-align: center;
  }
  .results-number {
    margin: 0px 0px 10% 0px;
    font-family: Poppins;
    font-style: normal;
    font-weight: normal;
    font-size: 18px;
    line-height: 27px;
    text-align: center;
  }

  .results-number-text {
    color: red;
    font-size: 36px;
    font-weight: 800;
  }
  .results-try-button {
    display: block;
    margin-left: auto;
    margin-right: auto;
    width: 40%;
    height: 15%;
    background-color: #ffffff;
    border: 2px solid #1d355d;
    box-sizing: border-box;
    border-radius: 12px;
    font-family: Poppins;
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 27px;
    color: #1d355d;
  }
  .results-try-button:hover {
    background-color: #ccc;
    cursor: pointer;
  }
`;

const QuestionCard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [allNations, setAllNations] = useState([]);
  const [isQuestionAnswered, setIsQuestionAnswered] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [questionType, setQuestionType] = useState(_.random(1));
  const [correctNum, setCorrectNum] = useState(0);
  useEffect(() => {
    console.log("fetch nations");
    const fetchNations = async () => {
      const result = await axios("https://restcountries.eu/rest/v2/all");
      const allNations = result.data.map((item, index) => ({
        name: item.name,
        capital: item.capital,
        flag: item.flag,
      }));
      setAllNations(allNations);
      setQuestions(c => getQuestions(allNations));
    };
    fetchNations();
    setIsLoading(false);
    //Load Questions for the first time
    setQuestions(c => getQuestions(allNations));
  }, []);

  const getQuestions = nations => {
    const correctAnswer = _.random(3);
    const selectedNations = _.shuffle(nations).slice(0, 4);
    const position = ["A", "B", "C", "D"];
    return selectedNations.map((item, index) => ({
      position: position[index],
      capital: item.capital,
      country: item.name,
      flag: item.flag,
      correctAnswer: index === correctAnswer,
      clicked: false,
      id: index,
    }));
  };

  const handleClick = index => {
    if (isQuestionAnswered) return;
    const newQuestions = [...questions];
    newQuestions[index].clicked = true;
    setQuestions(newQuestions);
    setIsQuestionAnswered(true);
    if (index !== questions.findIndex(item => item.correctAnswer === true))
      setIsFinished(true);
  };

  const getNextQuestions = () => {
    setQuestionType(_.random(1));
    if (!isFinished) {
      setQuestions(c => getQuestions(allNations));
      setIsQuestionAnswered(false);
      setCorrectNum(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleReset = () => {
    setQuestions(c => getQuestions(allNations));
    setIsQuestionAnswered(false);
    setIsFinished(false);
    setShowResult(false);
    setCorrectNum(0);
  };
  return (
    <>
      {console.log("rendered!")}
      <Container>
        {isLoading && <h1 className="Loading-text">Loading ...</h1>}
        {!isLoading && !showResult && (
          <QuestionBox showResult={showResult} questionType={questionType}>
            <h1 className="country-quiz-text">Country Quiz</h1>
            <Adventure className="adventure" />
            {questions.length > 0 && questionType === 0 && (
              <p className="question">
                {
                  questions.filter(item => item.correctAnswer === true)[0]
                    .capital
                }{" "}
                is the capital of{" "}
              </p>
            )}
            {questions.length > 0 && questionType === 1 && (
              <>
                <img
                  src={
                    questions.filter(item => item.correctAnswer === true)[0]
                      .flag
                  }
                  alt=""
                ></img>
                <p className="question">
                  Which country does this flag belong to?
                </p>
              </>
            )}
            {questions.map((item, index) => (
              <QuestionField
                key={item.id}
                onClick={() => handleClick(index)}
                position={item.position}
                country={item.country}
                clicked={item.clicked}
                isAnswered={isQuestionAnswered}
                correctAnswer={item.correctAnswer}
              ></QuestionField>
            ))}
            {isQuestionAnswered && (
              <div onClick={() => getNextQuestions()} className="next-button">
                <p>Next</p>
              </div>
            )}
          </QuestionBox>
        )}

        {showResult && (
          <QuestionBox showResult={showResult} questionType={questionType}>
            <h1 className="country-quiz-text">Country Quiz</h1>
            <Results className="results-svg"></Results>
            <h2 className="results-text">Results</h2>
            <p className="results-number">
              You got <span className="results-number-text">{correctNum}</span>{" "}
              correct answers
            </p>
            <button className="results-try-button" onClick={handleReset}>
              Try again
            </button>
          </QuestionBox>
        )}
      </Container>
    </>
  );
};

export default QuestionCard;
