import React, { useReducer } from "react";
import clienteAxios from "../../config/axios";
import { types } from "../../types";
import PostContext from "./PostContext";
import PostReducer from "./PostReducer";

const PostState = (props) => {
  const initialState = {
    posts: [],
    allPosts: [],
    comments: [],
    likes: null,
    page: 0,
    tagSelected: null,
    limit:null
  };

  const [state, dispatch] = useReducer(PostReducer, initialState);

  const getAllPosts = async () => {
    try {
      const response = await clienteAxios.get("/post");
      dispatch({
        type: types.getAllPost,
        payload: response.data
      })
    } catch (error) {
      console.log(error);
    }
  };

  const getPostsByHashTag = (hashtag) => {
    dispatch({
      type: types.getFilterPost,
      payload: hashtag
    })
  }

  const LimpiarTags = () => {
    dispatch({
      type: types.limpiarTags
    })
  }
  

  return (
    <PostContext.Provider
      value={{
        posts: state.posts,
        allPosts: state.allPosts,
        comments: state.comments,
        likes: state.likes,
        page: state.page,
        tagSelected: state.tagSelected,
        limit: state.limit,
        getPostsByHashTag,
        getAllPosts,
        LimpiarTags
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};
export default PostState;
