const initialState = {
  obstacles: [],
  portals: [],
  comms: [],
  level: "house2",
  previousLevel: "house2",
  inPortal: false,
  start: false,
  startPage: 1,
  quizActive: false,
  loading: false
}

const mapReducer = (state=initialState, action) => {
  switch(action.type) {
    case "ADD_OBSTACLE":
      return {
        ...state,
        obstacles: [...state.obstacles, action.payload.obstacle]
      }
    case "ADD_PORTAL":
      return {
        ...state,
        portals: [...state.portals, action.payload.portal]
      }
    case "ADD_COMMS":
      return {
        ...state,
        comms: [...state.comms, action.payload.comms]
      }
    case "START_GAME":
      return {
        ...state,
        start: action.payload.start
      }
    case "RESET_GAME":
      return {
        ...state,
        start: action.payload.start,
        startPage: 1
      }
    case "NEXT_PAGE":
      return {
        ...state,
        startPage: state.startPage + 1
      }
    case "ACTIVATE_QUIZ":
      return {
        ...state,
        quizActive: true,
        start: false
      }
    case "EXIT_QUIZ":
      return {
        ...state,
        quizActive: false,
        start: true
      }
    case "PORTAL_HIT":
      return {
        ...state,
        inPortal: action.payload.inPortal,
        level: action.payload.level
      }
    case "SWITCH_LEVEL":
      return {
        ...state,
        level: action.payload.level,
        previousLevel: state.level,
        inPortal: false,
        obstacles: [],
        portals: [],
        comms: [],
      }
    case "LOAD_MAP":
      return {
        ...action.payload.map,
        obstacles: [],
        portals: [],
        comms: [],
      }
    case "LOADING":
      return {
        ...state,
        loading: !state.loading
      }
    default:
      return state
  }
}

export default mapReducer
