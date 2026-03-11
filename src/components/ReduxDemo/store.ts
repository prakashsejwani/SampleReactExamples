import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './postsSlice';
import { postsApi } from './postsApi';

export function makeStore() {
    return configureStore({
        reducer: {
            posts: postsReducer,
            [postsApi.reducerPath]: postsApi.reducer,
        },
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(postsApi.middleware),
    });
}

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
