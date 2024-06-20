import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    selected_post: {
        id: 0,
        title: "",
        body: "",
        userId: 1
    }
}

export const postSlice = createSlice({
    name: "post",
    initialState,
    reducers:{
        getposts: (state, action) => {
            state.posts = action.payload
        },
        editPost:(state, action) => {
            state.selected_post[action.payload.key] = action.payload.value
        }
    },
})
export const { getposts, editPost } = postSlice.actions;

export default postSlice.reducer