import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    mode: 'light',
    user: null,
    token: null,
    posts: []
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light';
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends;
            } else {
                console.error("user friends non-existent :(");
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        },
        setComment: (state, action) => {
            const { postId, comment } = action.payload;
            const postToUpdateIndex = state.posts.findIndex(post => post._id === postId);
            if (postToUpdateIndex !== -1) {
                // Found the post, so updating it
                state.posts[postToUpdateIndex] = {
                    ...state.posts[postToUpdateIndex],
                    comments: [...state.posts[postToUpdateIndex].comments, comment]
                };
            } else {
                console.error("Post not found");
            }
        }
    }
});

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost, setComment } = authSlice.actions;
export default authSlice.reducer;