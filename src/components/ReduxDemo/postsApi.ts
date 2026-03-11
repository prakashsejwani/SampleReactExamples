import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
}

export const postsApi = createApi({
    reducerPath: 'postsApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://jsonplaceholder.typicode.com',
    }),
    endpoints: (builder) => ({
        getPosts: builder.query<Post[], void>({
            query: () => '/posts',
            transformResponse: (response: Post[]) => response.slice(0, 10),
        }),
    }),
});

export const { useGetPostsQuery } = postsApi;
