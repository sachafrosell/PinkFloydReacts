import abutton from './abutton.png'
import React from 'react'
import store from '../../config/store'

class A extends React.Component {

  handleClick = () => {
    let start = store.getState().map.start
    let quiz = store.getState().map.quizActive
    let page = store.getState().map.startPage
    let quizPosition = store.getState().quiz.quizPosition
    if (start) {
      let position = store.getState().player.position
      let comms = store.getState().map.comms
      let arr = []
      comms.forEach(comm => {
        if (comm.inComms(position)) {
          arr.push(comm)
        }
      })
      if (arr.length !== 0) {
        // window.alert(arr[0].name)
        console.log(arr[0].name);
      }
    } else {
      if (page < 2) {
        store.dispatch({
          type: 'NEXT_PAGE'
        })
      } else {
        if (!quiz) {
          store.dispatch({
            type: 'START_GAME',
            payload: {
              start: true
            }
          })
        } else {
          if (quizPosition < 1) {
            store.dispatch({
              type: "NEXT_QUIZ"
            })
          } else {
            store.dispatch({
              type: 'EXIT_QUIZ'
            })
            store.dispatch({
              type: 'RESET_QUIZ'
            })
          }
        }
      }
    }
  }

  render() {

    return (
      <div
        style={{position: "absolute", left: "380px", top: "30px"}}
        onClick={this.handleClick}
        >
      <img
      src={abutton}
      style={{
        width: "60px",
        height: "auto"
      }}
      alt={"A"}
      />
      </div>
    )
  }
}

export default A
