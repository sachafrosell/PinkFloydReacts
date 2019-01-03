import React from 'react'
import Image from './gameboy.png'
import A from './aButton'
import B from './bButton'
import Dpad from './dpad'
const Gameboy = () => {
  return (
    <div>
      <div style={{position: "absolute", left: "-295px", top: "-110px"}}>
        <img
        src={Image}
        style={{
          width: "870px",
          height: "400px"
        }}
        alt={"gameboy"}
        />
      </div>
      <div>
        <A />
        <B />
        <Dpad />
      </div>
    </div>
  )
}

export default Gameboy
