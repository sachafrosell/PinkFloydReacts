const initialState = {
  inComm: false,
  commName: "",
  commPosition: 0,
  justFinished: false
}

const textReducer = (state=initialState, action) => {
  switch(action.type) {
    case "WHICH_COMM":
        return {
          ...state,
          inComm: true,
          commName: action.payload.commName
        }
    case "CLEAR_COMMS":
        return {
          ...state,
          inComm: false,
          commName: action.payload.commName,
          commPosition: 0
        }
    case "UPDATE_COMM":
        return {
          ...state,
          commPosition: state.commPosition + 1
        }
    case "JUST_FINISHED":
        return {
          ...state,
          justFinished: true
        }
    case "EXIT_COMMS":
        return {
          ...state,
          justFinished: false
        }

    default:
      return state
  }
}

export default textReducer
