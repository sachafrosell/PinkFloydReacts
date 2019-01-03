import React from 'react'
import startTest from './start-page.png'
import moon8 from './moon8.png'
import { connect } from 'react-redux'

class Start extends React.Component {
  checkPosition = () => {
    if (this.props.startPage === 1) {
      return (
        <>
        <img
        src={moon8}
        style={{
          width: "288px",
          height: "auto"
        }}
        alt={"start"}
        />
        </>
      )
    } else if (this.props.startPage === 2) {
      return (
        <>
        <img
        src={startTest}
        style={{
          width: "288px",
          height: "auto"
        }}
        alt={"start"}
        />
        <div style={{position: "absolute", top: "20px", left: "75px"}}>
          <p> New Game </p>
          <p> Continue </p>
          <p> Settings </p>
        </div>
        <div style={{position: "absolute", top: `${this.props.pointerPosition}px`, left: "50px"}}>
          <p> > </p>
        </div>
        </>
      )
    }
  }
  render() {
    return (
      <div style={{position: "absolute"}}>
        {this.checkPosition()}
      </div>
    )
  }

}


const mapStateToProps = (state) => {
  let thisState = {...state}
  return {
    pointerPosition: thisState.start.pointerPosition,
    startPage: thisState.map.startPage
  }
}

export default connect(mapStateToProps)(Start)
