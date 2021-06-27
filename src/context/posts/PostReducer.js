import { types } from "../../types";

export default (state, action) => {
  switch (action.type) {

    case types.getAllPost:
      return {
        ...state,
        posts: action.payload.data,
        page: action.payload.page,
        limit: action.payload.limit,
        allPosts: action.payload.data,
        tagSelected: null
      }
    case types.limpiarTags:
      return {
        ...state,
        posts: state.allPosts,
        tagSelected: null
      }
    case types.getFilterPost:
      return {
        ...state,
        tagSelected: action.payload,
        posts: state.allPosts.filter(post => post.tags.includes(action.payload))
      }
    default:
      return state;
  }
};
