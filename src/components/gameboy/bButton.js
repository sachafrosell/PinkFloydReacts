import bbutton from './bbutton.png'
import React from 'react'
import store from '../../config/store'

class B extends React.Component {

  handleClick = () => {
    let start = store.getState().map.start
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
      store.dispatch({
        type: 'START_GAME',
        payload: {
          start: true
        }
      })
    }
  }

  render() {

    return (
      <div
      style={{position: "absolute", left: "318px", top: "45px"}}
      onClick={this.handleClick}
      >
      <img
      src={bbutton}
      style={{
        width: "60px",
        height: "auto"
      }}
      alt={"B"}
      />
      </div>
    )
  }
}

export default B
