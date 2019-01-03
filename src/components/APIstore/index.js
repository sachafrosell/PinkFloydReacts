import { connect } from 'react-redux'
import React from 'react'
import store from '../../config/store'

let state = {}

class APIstore extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      store: {}
    }
  }

  checkSave = () => {
    if (this.props.player.save) {
      let thisState = this.props
      state = thisState
      this.saveFetch(state)
    }
  }

  checkLoad = () => {
    if (this.props.player.load) {
      this.loadFetch()
    }
  }

  loadFetch = () => {
    fetch(`http://localhost:3000/state`)
      .then(r => r.json())
      .then(data => {
        this.setState({
          store: data.state
        }, () => this.mapStateToStore(this.state.store))
      })
  }

  mapStateToStore = (state) => {
    window.alert("loaded game")
    let player = state.player
    let map = state.map
    let start = state.start
    let text = state.text
    let quiz = state.quiz
    store.dispatch({
      type: "LOAD_PLAYER",
      payload: {
        player: player
      }
    })
    store.dispatch({
      type: "LOAD_MAP",
      payload: {
        map: map
      }
    })
    store.dispatch({
      type: "LOAD_START",
      payload: {
        start: start
      }
    })
    store.dispatch({
      type: "LOAD_TEXT",
      payload: {
        text: text
      }
    })
    store.dispatch({
      type: "LOAD_QUIZ",
      payload: {
        quiz: quiz
      }
    })
    store.dispatch({
      type: "LOADING"
    })

  }

  saveFetch = (state) => {
    let newPlayer = {...state.player, save: false}
    let newMap = {...state.map, obstacles: [], portals: [], comms: []}
    let newState = {...state, player: newPlayer, map: newMap}
    console.log("saving")
    fetch(`http://localhost:3000/state`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        state: newState
      })
    })
      .then(() => {
        console.log("saved")
        window.alert("saved game")
      })
  }

  render() {
    return (
      <>
      {this.checkSave()}
      {this.checkLoad()}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state
  }
}

export default connect(mapStateToProps)(APIstore)
