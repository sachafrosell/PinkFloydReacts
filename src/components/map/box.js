export default class Box {
  constructor(x, y, w, h) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  inBox = (newPos) => {
    // console.log("X:", "new", newPos[0], "this",this.x, "Y:", "new",newPos[1], "this",this.y);
    if (newPos[0] > this.x - 13 && newPos[0] < this.x + this.w - 3){
      if (newPos[1] < this.y + this.h - 10 && newPos[1] > this.y - 14) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
}
