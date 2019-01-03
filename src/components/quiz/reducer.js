const initialState = {
  quizPosition: 0
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

    default:
      return state
  }
}

export default quizReducer
