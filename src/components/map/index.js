
import React from 'react';
import Level1 from './opening-level.json'
import Level2 from './level-2.json'
import Level3 from './level3.json'
import Level2Locked from './level2Locked.json'
import House1 from './house1.json'
import House2 from './basement-blackout.json'
import House3 from './loft.json'
import Green1 from './green1.json'
import Lavaland from './lavaland.json'
import Dungeon1 from './dungeon1.json'
import Dungeon2 from './dungeon2.json'
import Dungeon3 from './dungeon3.json'
import Dungeon4 from './dungeon4.json'
import Dungeon5 from './dungeon5.json'
import Dungeon6 from './dungeon6.json'
import Dungeon7 from './dungeon7.json'
import Dungeon8 from './dungeon8.json'
import Dungeon9 from './dungeon9.json'
import Dungeon10 from './dungeon10.json'
import Dungeon11 from './dungeon11.json'
import Dungeon12 from './dungeon12.json'
import Dungeon13 from './dungeon13.json'
import Dungeon14 from './dungeon14.json'
import Dungeon15 from './dungeon15.json'
import Dungeon9Locked from './dungeon9-locked.json'
import Master1 from './master1.json'
import Box from './box'
import Portal from './portal'
import Comms from './comms'
import store from '../../config/store'
import LevelTiles from './level-tiles'
import Sound from 'react-sound'
import Breath from './breath.mp3'
import GreatEyeInTheSky from './greateyeinthesky.mp3'
import Money from './money.mp3'
import { connect } from 'react-redux'

const layers1 = Level1.layers
const layers2 = Level2.layers
const level3 = Level3.layers
const level2Locked = Level2Locked.layers
const house1 = House1.layers
const house2 = House2.layers
const house3 = House3.layers
const green1 = Green1.layers
const lavaland = Lavaland.layers
const dungeon1 = Dungeon1.layers
const dungeon2 = Dungeon2.layers
const dungeon3 = Dungeon3.layers
const dungeon4 = Dungeon4.layers
const dungeon5 = Dungeon5.layers
const dungeon6 = Dungeon6.layers
const dungeon7 = Dungeon7.layers
const dungeon8 = Dungeon8.layers
const dungeon9 = Dungeon9.layers
const dungeon10 = Dungeon10.layers
const dungeon11 = Dungeon11.layers
const dungeon12 = Dungeon12.layers
const dungeon13 = Dungeon13.layers
const dungeon14 = Dungeon14.layers
const dungeon15 = Dungeon15.layers
const dungeon9Locked = Dungeon9Locked.layers
const master1 = Master1.layers
const jsxElements = []
let previousLevel = "house2"

function importAll(r) {
  let images = {};
  r.keys().map((item, index) => {
    images[index + 1] = r(item);
    return null
  });
  return images;
}

const images = importAll(require.context('./basictiles', false, /\.(png|jpe?g|svg)$/));


class Map extends React.Component {


  drawTiles = () => {
    let keys = store.getState().player.keys
      if (this.props.level === "level1") {
        this.makeLevel(layers1)
      } else if (this.props.level === "level2") {
        if (keys.includes("master1")) {
          this.makeLevel(layers2)
        } else {
          this.makeLevel(level2Locked)
        }
      } else if (this.props.level === "house1") {
        this.makeLevel(house1)
      } else if (this.props.level === "house2") {
        this.makeLevel(house2)
      } else if (this.props.level === "house3") {
        this.makeLevel(house3)
      } else if (this.props.level === "green1-1" || this.props.level === "green1-2") {
        this.makeLevel(green1)
      } else if (this.props.level === "dungeon1") {
        this.makeLevel(dungeon1)
      } else if (this.props.level === "lavaland") {
        this.makeLevel(lavaland)
      } else if (this.props.level === "dungeon3") {
        this.makeLevel(dungeon3)
      } else if (this.props.level === "dungeon2") {
        this.makeLevel(dungeon2)
      } else if (this.props.level === "master1") {
        this.makeLevel(master1)
      } else if (this.props.level === "dungeon4") {
        this.makeLevel(dungeon4)
      } else if (this.props.level === "dungeon5") {
        this.makeLevel(dungeon5)
      } else if (this.props.level === "dungeon6") {
        this.makeLevel(dungeon6)
      } else if (this.props.level === "dungeon7") {
        this.makeLevel(dungeon7)
      } else if (this.props.level === "dungeon8") {
        this.makeLevel(dungeon8)
      } else if (this.props.level === "dungeon9") {
        if (keys.includes("master2")) {
          this.makeLevel(dungeon9)
        } else {
          this.makeLevel(dungeon9Locked)
        }
      } else if (this.props.level === "dungeon10-1" || this.props.level === "dungeon10-2" || this.props.level === "dungeon10") {
        this.makeLevel(dungeon10)
      } else if (this.props.level === "dungeon11") {
        this.makeLevel(dungeon11)
      } else if (this.props.level === "dungeon12") {
        this.makeLevel(dungeon12)
      } else if (this.props.level === "dungeon13") {
        this.makeLevel(dungeon13)
      } else if (this.props.level === "dungeon14") {
        this.makeLevel(dungeon14)
      } else if (this.props.level === "dungeon15") {
        this.makeLevel(dungeon15)
      } else if (this.props.level === "level3") {
        this.makeLevel(level3)
      }
  }

  makeLevel = (layers) => {
    layers.forEach(layer => {
      if (layer.name !== "collisions" && layer.name !== "portals"  && layer.name !== "comms") {
        let counter = 0
        for (let y = 0; y < layer.height; y++) {
          for (let x = 0; x < layer.width; x++) {
            jsxElements.push(
              <div
                style={{
                  position: "absolute",
                  top: y * 16,
                  left: x * 16,
                  width: '16px',
                  height: '16px',
                  backgroundImage: `url('${images[layer.data[counter]]}')`,
                  opacity: layer.opacity
                }}
              />
            )
            counter++
          }
        }
      } else if (layer.name === "collisions") {
        layer.objects.forEach(obj => {
          this.createAndDispatchBoxes(obj)
        })
      } else if (layer.name === "portals") {
        layer.objects.forEach(obj => {
          this.createAndDispatchPortals(obj)
        })
      } else if (layer.name === "comms") {
        layer.objects.forEach(obj => {
          this.createAndDispatchComms(obj)
        })
      }
    })
  }


  createAndDispatchBoxes = (obj) => {
    let box = new Box(obj.x, obj.y, obj.width, obj.height)
    store.dispatch({
      type: 'ADD_OBSTACLE',
      payload: {
        obstacle: box
      }
    })
  }

  createAndDispatchPortals = (obj) => {
    let portal = new Portal(obj.x, obj.y, obj.width, obj.height, obj.name)
    store.dispatch({
      type: 'ADD_PORTAL',
      payload: {
        portal: portal
      }
    })
  }

  createAndDispatchComms = (obj) => {
    let comms = new Comms(obj.x, obj.y, obj.width, obj.height, obj.name)
    store.dispatch({
      type: 'ADD_COMMS',
      payload: {
        comms: comms
      }
    })
  }


  inPortal = (boolean, level) => {
    if (boolean) {
      this.whichLevel(level)
    }
  }

  whichLevel = (level) => {
    // console.log(previousLevel);
    if (level !== previousLevel) {
      switch(previousLevel) {
        case "level1":
        if (level === "level2") {
          this.handleLevelSwitch(level, [128, 148])
        } else {
          this.handleLevelSwitch(level, [128, -2])
        }
        break;
        case "master1":
        if (level === "level1") {
          this.handleLevelSwitch(level, [128, 148])
        }
        break;
        case "level2":
        if (level === "level1"){
          this.handleLevelSwitch(level, [128, -2])
        } else if (level === "house1") {
          this.handleLevelSwitch(level, [128, 144])
        } else if (level === "dungeon1") {
          this.handleLevelSwitch(level, [128, 148])
        }
        break;
        case "house1":
        if (level === "level2"){
          this.handleLevelSwitch(level, [32, 60])
        } else if (level === "house2") {
          this.handleLevelSwitch(level, [16, 112])
        } else if (level === "house3") {
          this.handleLevelSwitch(level, [224, 32])
        }
        break;
        case "house2":
        if (level === "house1"){
          this.handleLevelSwitch(level, [64, 112])
        } else {
          this.handleLevelSwitch(level, [103, 128])
        }
        break;
        case "house3":
        this.handleLevelSwitch(level, [208, 48])
        break;
        case "lavaland":
        if (level === "house2") {
          this.handleLevelSwitch(level, [90, 128])
        } else if (level === "dungeon2") {
          this.handleLevelSwitch(level, [224, 148])
        }
        break;
        case "dungeon1":
        if (level === "level2"){
          this.handleLevelSwitch(level, [128, 5])
        } else if (level === "dungeon3") {
          this.handleLevelSwitch(level, [224, 148])
        } else if (level === "dungeon2") {
          this.handleLevelSwitch(level, [48, 148])
        }
        break;
        case "dungeon2":
        if (level === "dungeon1"){
          this.handleLevelSwitch(level, [48, 8])
        } else if (level === "lavaland") {
          this.handleLevelSwitch(level, [240, 5])
        } else if (level === "dungeon4") {
          this.handleLevelSwitch(level, [144, 148])
        } else if (level === "dungeon10") {
          this.handleLevelSwitch(level, [16, 148])
        }
        break;
        case "dungeon3":
        if (level === "dungeon1"){
          this.handleLevelSwitch(level, [224, 8])
        } else if (level === "dungeon10"){
          this.handleLevelSwitch(level, [16, 148])
        }
        break
        case "dungeon4":
        if (level === "dungeon2"){
          this.handleLevelSwitch(level, [144, -2])
        } else if (level === "dungeon5"){
          this.handleLevelSwitch(level, [96, 148])
        } else if (level === "dungeon7"){
          this.handleLevelSwitch(level, [0, 64])
        } else if (level === "dungeon6"){
          this.handleLevelSwitch(level, [256, 148])
        } else if (level === "dungeon8"){
          this.handleLevelSwitch(level, [16, 148])
        }
        break;
        case "dungeon5":
        if (level === "dungeon9"){
          this.handleLevelSwitch(level, [272, 43])
        } else if (level === "dungeon4"){
          this.handleLevelSwitch(level, [96, -2])
        }
        break
        case "dungeon6":
        if (level === "dungeon4"){
          this.handleLevelSwitch(level, [256, -2])
        }
        break
        case "dungeon7":
        if (level === "dungeon4"){
          this.handleLevelSwitch(level, [272, 64])
        } else if (level === "dungeon15"){
          this.handleLevelSwitch(level, [0, 64])
        }
        break
        case "dungeon8":
        if (level === "dungeon4"){
          this.handleLevelSwitch(level, [16, -2])
        }
        break
        case "dungeon9":
        if (level === "dungeon5"){
          this.handleLevelSwitch(level, [0, 48])
        } else if (level === "level3"){
          this.handleLevelSwitch(level, [144, 148])
        }
        break
        case "dungeon10":
        if (level === "dungeon3"){
          this.handleLevelSwitch(level, [16, -2])
        } else if (level === "dungeon13"){
          this.handleLevelSwitch(level, [144, 148])
        } else if (level === "green1-1"){
          this.handleLevelSwitch(level, [0, 128])
        } else if (level === "green1-2"){
          this.handleLevelSwitch(level, [0, 48])
        } else if (level === "dungeon12"){
          this.handleLevelSwitch(level, [240, 148])
        } else if (level === "dungeon11"){
          this.handleLevelSwitch(level, [80, 148])
        }
        break
        case "dungeon10-1":
        if (level === "dungeon3"){
          this.handleLevelSwitch(level, [16, -2])
        } else if (level === "dungeon13"){
          this.handleLevelSwitch(level, [144, 148])
        } else if (level === "green1-1"){
          this.handleLevelSwitch(level, [0, 128])
        } else if (level === "green1-2"){
          this.handleLevelSwitch(level, [0, 48])
        } else if (level === "dungeon12"){
          this.handleLevelSwitch(level, [240, 148])
        } else if (level === "dungeon11"){
          this.handleLevelSwitch(level, [80, 148])
        }
        break
        case "dungeon10-2":
        if (level === "dungeon3"){
          this.handleLevelSwitch(level, [16, -2])
        } else if (level === "dungeon13"){
          this.handleLevelSwitch(level, [144, 148])
        } else if (level === "green1-1"){
          this.handleLevelSwitch(level, [0, 128])
        } else if (level === "green1-2"){
          this.handleLevelSwitch(level, [0, 48])
        } else if (level === "dungeon12"){
          this.handleLevelSwitch(level, [240, 148])
        } else if (level === "dungeon11"){
          this.handleLevelSwitch(level, [80, 148])
        }
        break
        case "dungeon13":
        if (level === "dungeon10"){
          this.handleLevelSwitch(level, [240, -2])
        }
        break
        case "green1-1":
        if (level === "dungeon10-1"){
          this.handleLevelSwitch(level, [272, 128])
        } else if (level === "dungeon10-2"){
          this.handleLevelSwitch(level, [272, 64])
        }
        break
        case "green1-2":
        if (level === "dungeon10-1"){
          this.handleLevelSwitch(level, [272, 128])
        } else if (level === "dungeon10-2"){
          this.handleLevelSwitch(level, [272, 64])
        }
        break
        case "dungeon12":
        if (level === "dungeon10"){
          this.handleLevelSwitch(level, [192, -2])
        } else if (level === "dungeon14"){
          this.handleLevelSwitch(level, [144, 148])
        }
        break
        case "dungeon14":
        if (level === "dungeon12"){
          this.handleLevelSwitch(level, [144, -2])
        }
        break
        case "dungeon11":
        if (level === "dungeon10"){
          this.handleLevelSwitch(level, [80, -2])
        }
        break
        case "dungeon15":
        if (level === "dungeon7"){
          this.handleLevelSwitch(level, [272, 64])
        }
        break
        case "level3":
        if (level === "dungeon9"){
          this.handleLevelSwitch(level, [144, -2])
        }
        break
        default:
        return ""
      }
      // if (!this.props.loading) {
        previousLevel = level
      // }
    }
  }


  handleLevelSwitch = (level, position) => {

      store.dispatch({
        type: 'RESET_PLAYER',
        payload: {
          position: position
        }
      })
      store.dispatch({
        type: 'SWITCH_LEVEL',
        payload: {
          level: level,
          inPortal: false,
        }
      })
      this.setState({
        level: level
      })
  }

  whichSong = () => {
    return (
      <Sound
        url={this.songLogic(this.props.level)}
        playStatus={Sound.status.PLAYING}
      />
    )
  }

  songLogic = (level) => {
    switch(level) {
      case "house2":
        return GreatEyeInTheSky
      case "basement":
        return GreatEyeInTheSky
      case "house1":
        return GreatEyeInTheSky
      case "level1":
        return GreatEyeInTheSky
      case "level2":
        return GreatEyeInTheSky
      case "green1-1":
        return GreatEyeInTheSky
      case "green1-2":
        return GreatEyeInTheSky
      case "lavaland":
        return Money
      case "master1":
        return GreatEyeInTheSky
      case "dungeon1":
        return Money
      case "dungeon2":
        return Money
      case "dungeon3":
        return Money
      case "dungeon4":
        return Money
      case "dungeon5":
        return Money
      case "dungeon6":
        return Money
      case "dungeon7":
        return Money
      case "dungeon8":
        return Money
      case "dungeon9":
        return Money
      case "dungeon10":
        return Money
      case "dungeon10-1":
        return Money
      case "dungeon10-2":
        return Money
      case "dungeon11":
        return Money
      case "dungeon12":
        return Money
      case "dungeon13":
        return Money
      case "dungeon14":
        return Money
      case "dungeon15":
        return Money
      case "level3":
        return Breath
      default:
        return ""
    }
  }

  makeAndDisplay = () => {
      // if (this.props.loading) {
      //   previousLevel = this.props.level
      //   console.log(previousLevel);
      // }
      this.drawTiles()
      return jsxElements.splice(0, jsxElements.length)
  }

  render() {
    return (
      <div>
        <LevelTiles inPortal={this.inPortal}/>
        {this.makeAndDisplay()}
        <Sound
          url={this.songLogic(this.props.level)}
          playStatus={Sound.status.PLAYING}
        />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    level: state.map.level,
    loading: state.map.loading
  }
}


export default connect(mapStateToProps)(Map)
