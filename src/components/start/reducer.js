const initialState = {
  currentSelection: 1,
  pointerPosition: 20
}

const startReducer = (state=initialState, action) => {
  switch(action.type) {
    case "UP":
      if (state.currentSelection !== 1) {
        return {
          ...state,
          currentSelection: state.currentSelection - 1,
          pointerPosition: state.pointerPosition - 32
        }
      }
    case "DOWN":
      if (state.currentSelection !== 3) {
        return {
          ...state,
          currentSelection: state.currentSelection + 1,
          pointerPosition: state.pointerPosition + 32
        }
      }
    case "LOAD_START":
      return {
        ...action.payload.start
      }
    default:
      return state
  }
}

export default startReducer
