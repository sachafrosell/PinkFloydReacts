const initialState = {
  quizPosition: 0,
  quizName: "",
  quizAnswer: false,
  whichAnswer: 0
}

const quizReducer = (state=initialState, action) => {
  switch(action.type) {
    case "NEXT_QUIZ":
        return {
          ...state,
          quizPosition: state.quizPosition + 1
        }
    case "RESET_QUIZ":
        return {
          ...state,
          quizPosition: 0
        }
    case "SET_QUIZ":
        return {
          ...state,
          quizName: action.payload.quizName
        }
    case "SET_ANSWER":
        return {
          ...state,
          whichAnswer: action.payload.whichAnswer
        }
    case "SET_BOOLEAN":
        return {
          ...state,
          quizAnswer: action.payload.quizAnswer
        }

    default:
      return state
  }
}

export default quizReducer
