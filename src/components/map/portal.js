// import Sound from 'react-sound'
import soundmanager2 from 'soundmanager2'

soundmanager2.soundManager.defaultOptions.multiShot = false
soundmanager2.soundManager.setupOptions.debugMode = false

export default class Portal {
  constructor(x, y, w, h, name) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.name = name
  }

  inPortal = (newPos) => {
    // console.log("X:", "new", newPos[0], "this",this.x, "Y:", "new",newPos[1], "this",this.y);
    if (newPos[0] > this.x - 13 && newPos[0] < this.x + this.w - 3){
      if (newPos[1] < this.y + this.h + 5 && newPos[1] > this.y - 18) {
        // console.log(soundmanager2.soundManager.defaultOptions.multiShot)
        soundmanager2.soundManager.sounds.sound0.play()
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
