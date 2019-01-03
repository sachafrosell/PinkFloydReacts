
import React from 'react';
import Player from '../player/index'
import Map from '../map/index'
import APIstore from '../APIstore/index'
import Gameboy from '../gameboy/index'
import Sound from 'react-sound'
import Door from './door.mp3'
import Breath from '../map/breath.mp3'
import Collision from './collision.mp3'
import Select from './select.mp3'
import Start from '../start/index'
import Text from '../text/index'
import Quiz from '../quiz/index'
import { connect } from 'react-redux'


class World extends React.Component {


  startGame = () => {
    let start = this.props.start
    let quiz = this.props.quiz
    if (start) {
      return (
        <div>
        <Map />
        <Player />
        <Text />

        </div>
        )
    } else {
      if (!quiz) {
        return (
          <div>
          <Start />
          <Sound
          url={Breath}
          playStatus={Sound.status.PLAYING}
          />
          </div>
        )
      } else {
        return (
          <div>
          <Quiz />
          </div>
          )
        }
      }
    }


  render() {
    return (
      <div
        style={{
          position: 'relative',
          maxWidth: '288px',
          maxHeight: '160px',
          margin: '20px auto'
        }}
      >
      <APIstore />
      <Gameboy />
        {this.startGame()}

        <Sound
        url={Door}
        volume={40}
        playStatus={Sound.status.STOPPED}
        />
        <Sound
        url={Select}
        volume={20}
        playStatus={Sound.status.STOPPED}
        />
        <Sound
        url={Collision}
        volume={20}
        playStatus={Sound.status.STOPPED}
        />
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  let thisState = {...state}
  return {
    start: thisState.map.start,
    quiz: thisState.map.quizActive
  }
}

export default connect(mapStateToProps)(World);
