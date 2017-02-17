var defaultState = {
  user_id: undefined
}

module.exports = (state=defaultState, action) => {
  switch(action.type) {
    case 'AUTH_USER':
      return {
        user_id: action.user_id,
        token: action.token,
        currentUser: action.currentUser
      }

    case 'UNAUTH_USER':
      return {
        user_id: undefined,
        token: undefined,
        currentUser: undefined
      };

    default:
      return state;
  }
}
