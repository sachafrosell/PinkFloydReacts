
import React from 'react';
import Level1 from './opening-level.json'
import Level2 from './level-2.json'
import House1 from './house1.json'
import House2 from './basement-blackout.json'
import Lavaland from './basement.json'
import House3 from './loft.json'
import Dungeon1 from './dungeon1.json'
import Dungeon2 from './dungeon2.json'
import Dungeon3 from './dungeon3.json'
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

const layers1 = Level1.layers
const layers2 = Level2.layers
const house1 = House1.layers
const house2 = House2.layers
const house3 = House3.layers
const lavaland = Lavaland.layers
const dungeon1 = Dungeon1.layers
const dungeon2 = Dungeon2.layers
const dungeon3 = Dungeon3.layers
const master1 = Master1.layers
const jsxElements = []

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
  constructor(props) {
    super(props)
    this.state = {
      level: "",
      mounted: false
    }
  }

  componentDidMount() {
    this.setState({
      mounted: true,
      level: store.getState().map.level
    })
  }

  drawTiles = () => {

      if (this.state.level === "level1") {
        this.makeLevel(layers1)
      } else if (this.state.level === "level2") {
        this.makeLevel(layers2)
      } else if (this.state.level === "house1") {
        this.makeLevel(house1)
      } else if (this.state.level === "house2") {
        this.makeLevel(house2)
      } else if (this.state.level === "house3") {
        this.makeLevel(house3)
      } else if (this.state.level === "dungeon1") {
        this.makeLevel(dungeon1)
      } else if (this.state.level === "lavaland") {
        this.makeLevel(lavaland)
      } else if (this.state.level === "dungeon3") {
        this.makeLevel(dungeon3)
      } else if (this.state.level === "dungeon2") {
        this.makeLevel(dungeon2)
      } else if (this.state.level === "master1") {
        this.makeLevel(master1)
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

  renderTiles = () => {
    return jsxElements.map(element => {
      return element
    })
  }

  inPortal = (boolean, level) => {
    if (boolean) {
      this.whichLevel(level)
    }
  }

  whichLevel = (level) => {
    // console.log(level, this.state.level);
    switch(this.state.level) {
      case "level1":
        if (level === "level2") {
          this.handleLevelSwitch(level, [128, 145])
        } else {
          this.handleLevelSwitch(level, [128, 8])
        }
        break;
      case "master1":
        if (level === "level1") {
          this.handleLevelSwitch(level, [128, 145])
        }
        break;
      case "level2":
        if (level === "level1"){
          this.handleLevelSwitch(level, [128, 3])
        } else if (level === "house1") {
          this.handleLevelSwitch(level, [128, 144])
        } else if (level === "dungeon1") {
          this.handleLevelSwitch(level, [128, 144])
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
          this.handleLevelSwitch(level, [240, 144])
        }
        break;
      case "dungeon1":
        if (level === "level2"){
          this.handleLevelSwitch(level, [128, 5])
        } else if (level === "dungeon3") {
          this.handleLevelSwitch(level, [224, 144])
        } else if (level === "dungeon2") {
          this.handleLevelSwitch(level, [48, 144])
        }
        break;
      case "dungeon2":
        if (level === "dungeon1"){
          this.handleLevelSwitch(level, [48, 8])
        } else if (level === "lavaland") {
          this.handleLevelSwitch(level, [240, 5])
        }
        break;
      case "dungeon3":
        if (level === "dungeon1"){
          this.handleLevelSwitch(level, [224, 8])
        }
        break;
      default:
        return ""
    }
  }


  handleLevelSwitch = (level, position) => {
    setTimeout(() => {
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
    , 1)
  }

  whichSong = () => {
    return (
      <Sound
        url={this.songLogic(this.state.level)}
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
        return Money
      case "level2":
        return GreatEyeInTheSky
      case "lavaland":
        return Money
      case "master1":
        return Money
      case "dungeon1":
        return Money
      case "dungeon2":
        return Money
      case "dungeon3":
        return Money
      default:
        return ""
    }
  }

  checkThing = () => {
    if (this.state.mounted) {
      this.drawTiles()
      return this.renderTiles()
    }
  }


  render() {
    return (
      <div>
        <LevelTiles inPortal={this.inPortal}/>
        {this.checkThing()}
        {jsxElements.splice(0, jsxElements.length)}
        <Sound
          url={this.songLogic(this.state.level)}
          playStatus={Sound.status.PLAYING}
        />
      </div>
    )
  }
}



export default Map
