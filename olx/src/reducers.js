const initialState = {
  currentUser: null,
  currentUserPending: true,
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "auth/setUser": {
      return {
      ...state,
      currentUser: action.payload,
      currentUserPending: false
      }
    }
    case "post/setDetails": return {
      ...state,
      postDetails: action.payload,
      postDetailsPending: action.payload ? true : false
    }
    default:
      return state;
  }
}
