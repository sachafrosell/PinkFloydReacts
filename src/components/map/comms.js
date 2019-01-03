import soundmanager2 from 'soundmanager2'

export default class Comms {
  constructor(x, y, w, h, name) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.name = name
  }

  inComms = (newPos) => {
    // console.log("X:", "new", newPos[0], "this",this.x, "Y:", "new",newPos[1], "this",this.y);
    if (newPos[0] > this.x - 13 && newPos[0] < this.x + this.w - 3){
      if (newPos[1] < this.y + this.h - 3 && newPos[1] > this.y - 16) {
        soundmanager2.soundManager.sounds.sound1.play()
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
