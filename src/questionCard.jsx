import styled from "styled-components";
import axios from "axios";
import background from "./assets/img/background.png";
import GlobalStyle from "./globalStyle";
import _ from "lodash";
import { ReactComponent as Adventure } from "./assets/img/undraw_adventure_4hum 1.svg";
import { ReactComponent as Results } from "./assets/img/undraw_winners_ao2o_2.svg";
import { useState, useEffect } from "react";
import AnswerField from "./answerField";
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
  height: ${props => (props.showResult ? "80%" : "fit-content")};
  left: ${props => (props.showResult ? "35%" : "20%")};
  top: ${props => (props.showResult ? "10%" : "20%")};
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
  const [answers, setAnswers] = useState([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [questionType, setQuestionType] = useState(_.random(1));
  const [numberOfCorrectAnswers, setNumberOfCorrectAnswers] = useState(0);

  useEffect(() => {
    const fetchNations = async () => {
      const result = await axios("https://restcountries.eu/rest/v2/all");
      const allNations = result.data.map((item, index) => ({
        name: item.name,
        capital: item.capital,
        flag: item.flag,
      }));
      setAllNations(allNations);
      setAnswers(c => getNewAnswers(allNations));
    };
    fetchNations();
    setIsLoading(false);
  }, []);

  const getNewAnswers = nations => {
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

  const chooseAnswer = index => {
    if (isQuestionAnswered) return;
    const newAnswers = [...answers];
    newAnswers[index].clicked = true;
    setAnswers(newAnswers);
    setIsQuestionAnswered(true);
    if (index !== answers.findIndex(item => item.correctAnswer === true))
      setIsFinished(true);
  };

  const getNextQuestion = () => {
    setQuestionType(_.random(1));
    if (!isFinished) {
      setAnswers(c => getNewAnswers(allNations));
      setIsQuestionAnswered(false);
      setNumberOfCorrectAnswers(c => c + 1);
    } else {
      setShowResult(true);
    }
  };

  const resetGame = () => {
    setAnswers(c => getNewAnswers(allNations));
    setIsQuestionAnswered(false);
    setIsFinished(false);
    setShowResult(false);
    setNumberOfCorrectAnswers(0);
  };

  const getCorrectAnswer = answers =>
    answers.filter(item => item.correctAnswer === true)[0];

  const renderQuestion = (questions, questionType) => {
    if (answers.length > 0) {
      if (questionType === 0) {
        return (
          <p className="question">
            {getCorrectAnswer(answers).capital + "is the capital of"}
          </p>
        );
      } else {
        return (
          <>
            <img src={getCorrectAnswer(answers).flag} alt=""></img>
            <p className="question">Which country does this flag belong to?</p>
          </>
        );
      }
    }
  };

  const renderResult = () => (
    <QuestionBox showResult={showResult} questionType={questionType}>
      <h1 className="country-quiz-text">Country Quiz</h1>
      <Results className="results-svg"></Results>
      <h2 className="results-text">Results</h2>
      <p className="results-number">
        You got{" "}
        <span className="results-number-text">{numberOfCorrectAnswers}</span>{" "}
        correct answers
      </p>
      <button className="results-try-button" onClick={resetGame}>
        Try again
      </button>
    </QuestionBox>
  );

  return (
    <>
      <GlobalStyle></GlobalStyle>
      <Container>
        {isLoading && <h1 className="Loading-text">Loading ...</h1>}
        {/* Render the questions box */}
        {!isLoading && !showResult && (
          <QuestionBox showResult={showResult} questionType={questionType}>
            <h1 className="country-quiz-text">Country Quiz</h1>
            <Adventure className="adventure" />
            {renderQuestion(answers, questionType)}
            {/* Render answer fields */}
            {answers.map((item, index) => (
              <AnswerField
                key={item.id}
                onClick={() => chooseAnswer(index)}
                position={item.position}
                country={item.country}
                clicked={item.clicked}
                isAnswered={isQuestionAnswered}
                correctAnswer={item.correctAnswer}
              ></AnswerField>
            ))}
            {/* Render the next button */}
            {isQuestionAnswered && (
              <div onClick={() => getNextQuestion()} className="next-button">
                <p>Next</p>
              </div>
            )}
          </QuestionBox>
        )}
        {/* Render results */}
        {showResult && renderResult()}
      </Container>
    </>
  );
};

export default QuestionCard;
