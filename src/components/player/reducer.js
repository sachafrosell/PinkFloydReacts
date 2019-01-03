const initialState = {
  position: [47, 107],
  direction: "UP",
  spriteX: -16,
  spriteY: -48,
  speed: 80,
  shoes: "walkingShoes",
  keys: []
}

const playerReducer = (state=initialState, action) => {
  switch(action.type) {
    case "MOVE_PLAYER":
      return {
        ...state,
        ...action.payload
      }
    case "WALK_PLAYER":
      return {
        ...state,
        spriteX: action.payload.spriteX
      }
    case "CHANGE_SHOES":
      return {
        ...state,
        speed: action.payload.speed,
        shoes: action.payload.shoes
      }
    case "RESET_PLAYER":
      return {
        ...state,
        position: action.payload.position
      }
    case "ADD_KEY":
      return {
        ...state,
        position: action.payload.position
      }
    default:
      return state
  }
}

export default playerReducer
