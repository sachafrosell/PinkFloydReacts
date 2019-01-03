import React from 'react'
import { connect } from 'react-redux'
import startTest from './start-page.png'
import Sound from 'react-sound'
import OnTheRun from './ontherun.mp3'

const Quiz = props => {

  const checkQuiz = () => {
    if (props.quizActive) {
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
              alt={"start"}
              />
              <div style={{position: "absolute", top: "20px", left: "70px"}}>
                <p> What is my favorite year...?! </p>
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
                <p> 1973 </p>
                <p> 1984 </p>
                <p> 1994 </p>
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
    quizPosition: state.quiz.quizPosition
  }
}

export default connect(mapStateToProps)(Quiz)
