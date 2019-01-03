import React from 'react'
import { connect } from 'react-redux'
import startTest from '../start/start-page.png'
import quotes from './character.js'
import quiz from './quiz.js'

const Text = props => {

const checkRender = () => {
  let name = props.text.commName
  if (props.text.inComm) {
    if (quotes[props.text.commName]) {
      return (
        <>
        <img
        src={startTest}
        style={{
          width: "250px",
          height: "60px",
          borderRadius: "1px"
        }}
        alt={"textCover"}
        />
        <div style={{position: "absolute", top: "0px", left: "10px", fontSize: "8px"}}>
        <p> {quotes[props.text.commName][props.text.commPosition]} </p>
        </div>
        </>
      )
    }
  } else if (props.text.justFinished) {
    let boolean = checkAnswer()
    return (
      <>
      <img
      src={startTest}
      style={{
        width: "250px",
        height: "60px",
        borderRadius: "1px"
      }}
      alt={"start"}
      />
      <div style={{position: "absolute", top: "0px", left: "10px", fontSize: "8px"}}>
      {(boolean) ? <p> {quiz["master1"]["right"][props.text.commPosition]} </p> : <p> {quiz["master1"]["wrong"][props.text.commPosition]} </p> }
      </div>
      </>
    )
  }
}

  const checkAnswer = () => {
    let answer = props.answer
    if (answer) {
      return true
    } else {
      return false
    }
  }

  return (
    <div style={{position: "absolute", top: "90px", left: "20px", opacity: 0.7}}>
      {checkRender()}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    text: state.text,
    answer: state.quiz.quizAnswer
  }
}

export default connect(mapStateToProps)(Text)
