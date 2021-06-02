const initialState = {
  currentUser: null,
  currentUserPending: false,
  posts: [],
  postsPending: false,
  postDetails: null,
  postDetailsPending: false
};

export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "auth/setUser": return {
      ...state,
      currentUser: action.payload,
      currentUserPending: action.payload ? true : false
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
