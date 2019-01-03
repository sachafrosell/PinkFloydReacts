const initialState = {
  position: [47, 107],
  direction: "UP",
  spriteX: -16,
  spriteY: -48,
  speed: 80,
  shoes: "walkingShoes",
  keys: [],
  save: false,
  load: false
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
        keys: [...state.keys, action.payload.key]
      }
    case "SAVE_GAME":
      return {
        ...state,
        save: true
      }
    case "TOGGLE_SAVE":
      return {
        ...state,
        save: false
      }
    case "LOAD_GAME":
      return {
        ...state,
        load: true
      }
    case "TOGGLE_LOAD":
      return {
        ...state,
        load: false
      }
    case "LOAD_PLAYER":
      return {
        ...action.payload.player
      }
    default:
      return state
  }
}

export default playerReducer
