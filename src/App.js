import React, { Component } from 'react';
import World from './components/world/index'
import './index.css'

class App extends Component {
  render() {
    return (
      <div style={{position: "relative", top: "100px" }}>
        <World />
      </div>
    )
  }
}

export default App;
