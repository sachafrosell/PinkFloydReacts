import store from '../../config/store'
import soundmanager2 from 'soundmanager2'
import quotes from '../text/character.js'
import quiz from '../text/quiz.js'

const blockSize = 3;
let speed = 1
let walkSpeed = 80
let i = ""
let isKeyDown = false
let hitting = false
let hitInt = ""


function handleMovement(player) {

  function getNewPosition(direction) {
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


  function dispatchMove(direction) {
    let inComm = store.getState().text.inComm
    if (!inComm) {
      walk()
      let newPos = getNewPosition(direction)
      portalLogic(newPos)
      let collisionArray = collisionLogic(direction)
      if (collisionArray.length === 0) {
        store.dispatch({
          type: 'MOVE_PLAYER',
          payload: {
            position: getNewPosition(direction),
            direction: direction,
            spriteY: getSpriteLocation(direction)
          }
        })
      } else {
        if (!hitting) {
          hitting = true
          hitInt = setInterval(() => {
            soundmanager2.soundManager.sounds.sound2.play();
          }, 500)
        }
        store.dispatch({
          type: 'MOVE_PLAYER',
          payload: {
            direction: direction,
            spriteY: getSpriteLocation(direction)
          }
        })
      }
    }
  }

  function collisionLogic(direction) {
    let arr = []
    let newPos = getNewPosition(direction)
    let obstacles = store.getState().map.obstacles
    obstacles.forEach(box => {
      if (box.inBox(newPos)) {
        arr.push(1)
      }
    })
    return arr
  }

  function portalLogic(newPos) {
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

  function walk() {
    store.dispatch({
      type: 'WALK_PLAYER',
      payload: {
        spriteX: store.getState().player.spriteX + 16
      }
    })
  }


  function getSpriteLocation(direction) {
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

  function handleKeyDown(e) {
    let start = store.getState().map.start
    if (start) {
      switch(e.keyCode) {
        case 65:
        dispatchMove("LEFT")
        break
        case 37:
        dispatchMove("LEFT")
        break
        case 87:
        dispatchMove("UP")
        break
        case 38:
        dispatchMove("UP")
        break
        case 68:
        dispatchMove("RIGHT")
        break
        case 39:
        dispatchMove("RIGHT")
        break
        case 83:
        dispatchMove("DOWN")
        break
        case 40:
        dispatchMove("DOWN")
        break

        default:
      }
    }

  }

  function handleSelectDown(e) {
    let start = store.getState().map.start
    if (start) {
      switch(e.keyCode) {
        case 90:
          checkComms()
          break
        case 13:
          checkComms()
          break
        case 27:
          store.dispatch({
            type: 'RESET_GAME',
            payload: {
              start: false
            }
          })
          store.dispatch({
            type: "RESET_PLAYER",
            payload: {
              position: [47, 107]
            }
          })
          store.dispatch({
            type: "SWITCH_LEVEL",
            payload: {
              level: "house2"
            }
          })
          break
        default:
      }
    }

  }

  function checkComms() {
    let inComm = store.getState().text.inComm
    let commName = store.getState().text.commName
    let commPosition = store.getState().text.commPosition
    let start = store.getState().map.start
    if (!store.getState().text.justFinished) {
    if (start) {
      if (!inComm && !store.getState().text.justFinished) {
        let position = store.getState().player.position
        let comms = store.getState().map.comms
        let arr = []
        comms.forEach(comm => {
          if (comm.inComms(position)) {
            arr.push(comm)
          }
        })
        if (arr.length !== 0) {
          store.dispatch({
            type: "WHICH_COMM",
            payload: {
              commName: arr[0].name
            }
          })
        } else {
          store.dispatch({
            type: "CLEAR_COMMS",
            payload: {
              commName: ""
            }
          })
        }
      } else {
        let quote = quotes[commName]
        if (commPosition !== quote.length -1) {
          soundmanager2.soundManager.sounds.sound1.play()
          store.dispatch({
            type: "UPDATE_COMM"
          })
        } else {
          store.dispatch({
            type: "ACTIVATE_QUIZ",
          })
          store.dispatch({
            type: "JUST_FINISHED",
          })
          store.dispatch({
            type: "CLEAR_COMMS",
            payload: {
              commName: ""
            }
          })
        }
      }
    } else {
      store.dispatch({
        type: 'START_GAME',
        payload: {
          start: true
        }
      })
    }
  } else {
    let thisQuiz = quiz["master1"]["wrong"]
    console.log(thisQuiz)
    console.log(commPosition);
    if (commPosition !== thisQuiz.length - 1) {
      soundmanager2.soundManager.sounds.sound1.play()
      store.dispatch({
        type: "UPDATE_COMM"
      })
    } else {
      // console.log("hti");
      store.dispatch({
        type: "EXIT_COMMS",
      })
      store.dispatch({
        type: "CLEAR_COMMS",
        payload: {
          commName: ""
        }
      })
    }
  }
  }


  function checkShift(e) {
    e.preventDefault()
    if (e.keyCode === 16) {
      if (store.getState().player.shoes === "walkingShoes") {
        store.dispatch({
          type: 'CHANGE_SHOES',
          payload: {
            speed: 20,
            shoes: "runningShoes"
          }
        })
      } else {
        store.dispatch({
          type: 'CHANGE_SHOES',
          payload: {
            speed: 80,
            shoes: "walkingShoes"
          }
        })
      }
    }
  }
  window.addEventListener('keydown', e => {
    checkShift(e)
  })


  window.addEventListener('keydown', e => {
    e.preventDefault()
    if (e.keyCode === 65 || e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 87 || e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 38 ) {
      if (!e.repeat && isKeyDown === false) {
        isKeyDown = true
        i = setInterval(() => {
          handleKeyDown(e)
        }, walkSpeed)
      }
    } else {
      if (!e.repeat && isKeyDown === false) {
        isKeyDown = true
        handleSelectDown(e)
      }
    }
  })

  window.addEventListener('keyup', e => {
    isKeyDown = false
    hitting = false
    clearInterval(i)
    clearInterval(hitInt)
    let start = store.getState().map.start
    if (start) {
      if (e.keyCode === 65 || e.keyCode === 68 || e.keyCode === 83 || e.keyCode === 87 || e.keyCode === 39 || e.keyCode === 37 || e.keyCode === 40 || e.keyCode === 38 ) {
        setTimeout(() => {
          store.dispatch({
            type: 'WALK_PLAYER',
            payload: {
              spriteX: -16
            }
          })
        }, speed)
      }
    }
  })

  return player
}



export default handleMovement
