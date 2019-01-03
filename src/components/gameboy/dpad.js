import dpad from './dpad.png'
import React from 'react'
import store from '../../config/store'
import soundmanager2 from 'soundmanager2'
const blockSize = 3;
let i = ""
const speed = 80

class Dpad extends React.Component {

  handleDown = event => {
    let start = store.getState().map.start
    let name = event.target.className
    if (start) {
      i = setInterval(() => {
        this.switchThis(name)
      }, speed)
    } else {
      this.switchThis(name)
    }
  }

  handleUp = event => {
    let start = store.getState().map.start
    if (start) {
      clearInterval(i)
      store.dispatch({
        type: 'WALK_PLAYER',
        payload: {
          spriteX: -16
        }
      })
    }
  }

  switchThis = (name) => {
    let start = store.getState().map.start
    if (start) {
      switch(name) {
        case "UP":
        this.dispatchMove("UP")
        break;
        case "RIGHT":
        this.dispatchMove("RIGHT")
        break;
        case "DOWN":
        this.dispatchMove("DOWN")
        break;
        case "LEFT":
        this.dispatchMove("LEFT")
        break;
      }
    } else {
      switch(name) {
        case "UP":
          store.dispatch({
            type: "UP"
          })
          break;
        case "DOWN":
          store.dispatch({
            type: "DOWN"
          })
          break;

      }
    }
  }

  dispatchMove = (direction) => {
    this.walk()
    let newPos = this.getNewPosition(direction)
    this.portalLogic(newPos)
    let collisionArray = this.collisionLogic(direction)
    if (collisionArray.length === 0) {
      store.dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          position: this.getNewPosition(direction),
          direction: direction,
          spriteY: this.getSpriteLocation(direction)
        }
      })
    } else {
      soundmanager2.soundManager.sounds.sound2.play();
      store.dispatch({
        type: 'MOVE_PLAYER',
        payload: {
          direction: direction,
          spriteY: this.getSpriteLocation(direction)
        }
      })
    }
  }

  walk = () => {
    store.dispatch({
      type: 'WALK_PLAYER',
      payload: {
        spriteX: store.getState().player.spriteX + 16
      }
    })
  }

  getNewPosition = (direction) => {
    const oldPos = store.getState().player.position
    switch(direction) {
      case "LEFT":
        return [
          oldPos[0] - blockSize,
          oldPos[1]
        ]
      case "RIGHT":
        return [
          oldPos[0] + blockSize,
          oldPos[1]
        ]
      case "UP":
        return [
          oldPos[0],
          oldPos[1] - blockSize
        ]
      case "DOWN":
        return [
          oldPos[0],
          oldPos[1] + blockSize
        ]
      default:
        console.log(oldPos);
    }
  }

  portalLogic = (newPos) => {
    let portals = store.getState().map.portals
    portals.forEach(portal => {
      if (portal.inPortal(newPos)){
        store.dispatch({
          type: 'PORTAL_HIT',
          payload: {
            inPortal: true,
            level: portal.name
          }
        })
      }
    })
  }

  collisionLogic = (direction) => {
    let arr = []
    let newPos = this.getNewPosition(direction)
    let obstacles = store.getState().map.obstacles
    obstacles.forEach(box => {
      if (box.inBox(newPos)) {
        arr.push(1)
      }
    })
    return arr
  }

  getSpriteLocation = (direction) => {
    switch(direction) {
      case "LEFT":
        return -16;
      case "RIGHT":
        return -32;
      case "UP":
        return -48;
      case "DOWN":
        return 0;
      default:
        console.log(direction);
    }
  }

  render() {

    return (
      <div style={{position: "absolute", left: "-145px", top: "20px"}}>
        <div>
          <img
          src={dpad}
          style={{
            width: "100px",
            height: "auto"
          }}
          alt={"Dpad"}
          />
        </div>
        <div>
          <div
          className="UP"
          onMouseDown={this.handleDown}
          onMouseUp={this.handleUp}
          style={{
            position: "absolute",
            top: "12px",
            left: "37px",
            width: "25px",
            height: "25px"
          }}
          />
          <div
          className="RIGHT"
          onMouseDown={this.handleDown}
          onMouseUp={this.handleUp}
          style={{
            position: "absolute",
            top: "37px",
            left: "63px",
            width: "25px",
            height: "25px"
          }}
          />
          <div
          className="DOWN"
          onMouseDown={this.handleDown}
          onMouseUp={this.handleUp}
          style={{
            position: "absolute",
            top: "62px",
            left: "37px",
            width: "25px",
            height: "25px"
          }}
          />
          <div
          className="LEFT"
          onMouseDown={this.handleDown}
          onMouseUp={this.handleUp}
          style={{
            position: "absolute",
            top: "37px",
            left: "12px",
            width: "25px",
            height: "25px"
          }}
          />
        </div>
      </div>
    )
  }
}

export default Dpad
