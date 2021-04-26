import styled, { css } from "styled-components";
import CheckCircleOutlineOutlinedIcon from "@material-ui/icons/CheckCircleOutlineOutlined";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
const Field = styled.div`
  width: 90%;
  height: 56px;
  background-color: ${props =>
    !props.isAnswered
      ? "#ffffff"
      : props.correctAnswer
      ? "#60BF88"
      : props.clicked
      ? "#EA8282"
      : "#ffffff"};
  border-radius: 12px;
  border: ${props =>
    props.clicked || (props.correctAnswer && props.isAnswered)
      ? "none"
      : "2px solid rgba(96, 102, 208, 0.7)"};
  display: flex;
  justify-content: start;
  cursor: pointer;
  .country,
  .position {
    display: inline-block;
    font-family: Poppins;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 52px;
    color: ${props =>
      props.clicked || (props.correctAnswer && props.isAnswered)
        ? "#ffffff"
        : "rgba(96, 102, 208, 0.8)"};
  }
  .position {
    margin-left: 19px;
  }
  .country {
    margin-left: 47px;
  }
  svg {
    margin-top: 15px;
    margin-left: auto;
    margin-right: 12px;
    color: #f2f2f2;
  }
  ${props =>
    !props.isAnswered &&
    css`
      &:hover {
        /* overflow: visible; */
        cursor: pointer;
        background-color: #f9a826;
        border: none;
        span {
          color: #ffffff;
        }
      }
    `}
`;

const QuestionField = ({
  position,
  country,
  isAnswered,
  correctAnswer,
  clicked,
  onClick,
}) => {
  return (
    <Field
      className="question-field"
      onClick={onClick}
      correctAnswer={correctAnswer}
      clicked={clicked}
      isAnswered={isAnswered}
    >
      <div className="position">{position}</div>
      <div className="country">{country}</div>
      {isAnswered && correctAnswer && <CheckCircleOutlineOutlinedIcon />}
      {isAnswered && clicked && !correctAnswer && <HighlightOffIcon />}
    </Field>
  );
};

export default QuestionField;
