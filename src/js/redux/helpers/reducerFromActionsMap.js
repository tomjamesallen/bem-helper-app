export default function reducerFromActionsMap(initialState, actionMap = {}) {
  return (state = initialState, action = {}) => {
    if (typeof actionMap[action.type] === 'function') {
      return actionMap[action.type](state, action)
    }
    else {
      return state
    }
  }
}
