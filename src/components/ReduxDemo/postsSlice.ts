import { createSlice } from '@reduxjs/toolkit';

export interface PostsState {
    selectedPostId: number | null;
}

const initialState: PostsState = {
    selectedPostId: null,
};

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setSelectedPostId: (state, action: { payload: number | null }) => {
            state.selectedPostId = action.payload;
        },
    },
});

export const { setSelectedPostId } = postsSlice.actions;
export default postsSlice.reducer;

export const selectSelectedPostId = (state: { posts: PostsState }) =>
    state.posts.selectedPostId;
