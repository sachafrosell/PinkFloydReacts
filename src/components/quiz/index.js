import React from 'react'
import { connect } from 'react-redux'
import startTest from './start-page.png'
import Sound from 'react-sound'
import OnTheRun from './ontherun.mp3'
import quiz from '../text/quiz'

const Quiz = props => {


  const checkQuiz = () => {
    let name = props.quizName
    if (props.quizActive && quiz[name]) {
      switch(props.quizPosition) {
        case 0:
          return (
            <>
              <Sound
                url={OnTheRun}
                playStatus={Sound.status.PLAYING}
              />
              <img
              src={startTest}
              style={{
                width: "288px",
                height: "auto"
              }}
              alt={"quiz"}
              />
              <div style={{position: "absolute", top: "20px", left: "10px"}}>
                <p> {quiz[name]["question"]} </p>
              </div>

            </>
          )
        case 1:
          return (
            <>
              <Sound
                url={OnTheRun}
                playStatus={Sound.status.PLAYING}
              />
              <img
              src={startTest}
              style={{
                width: "288px",
                height: "auto"
              }}
              alt={"start"}
              />
              <div style={{position: "absolute", top: "20px", left: "75px"}}>
                {quiz[name]["choices"].map((a, i) => {
                  return (
                    <p key={i} > {a} </p>
                  )
                })}

              </div>
              <div style={{position: "absolute", top: `${props.pointerPosition}px`, left: "50px"}}>
                <p> > </p>
              </div>
            </>
          )
      }
    }
  }
  return (
    <div>
      {checkQuiz()}
    </div>
  )

}
const mapStateToProps = state => {
  return {
    quizActive: state.map.quizActive,
    pointerPosition: state.start.pointerPosition,
    quizPosition: state.quiz.quizPosition,
    quizName: state.quiz.quizName
  }
}

export default connect(mapStateToProps)(Quiz)
