import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import ReduxDemo from './ReduxDemo.tsx';
import { makeStore } from './store.ts';
import { useGetPostsQuery } from './postsApi.ts';

vi.mock('./postsApi.ts', async (importOriginal) => {
    const actual = await importOriginal<typeof import('./postsApi.ts')>();
    return {
        ...actual,
        useGetPostsQuery: vi.fn(),
    };
});

const mockPosts = [
    { id: 1, userId: 1, title: 'First post', body: 'Body one' },
    { id: 2, userId: 1, title: 'Second post', body: 'Body two' },
];

describe('ReduxDemo', () => {
    beforeEach(() => {
        vi.mocked(useGetPostsQuery).mockReturnValue({
            data: undefined,
            isLoading: true,
            isSuccess: false,
            isError: false,
            error: null,
            refetch: vi.fn(),
        });
    });

    it('should render loading state when posts are loading', () => {
        const store = makeStore();
        render(
            <Provider store={store}>
                <ReduxDemo />
            </Provider>
        );
        expect(screen.getByText(/loading/i)).toBeInTheDocument();
    });

    it('should render list of posts when fetch succeeds', async () => {
        vi.mocked(useGetPostsQuery).mockReturnValue({
            data: mockPosts,
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null,
            refetch: vi.fn(),
        });
        const store = makeStore();
        render(
            <Provider store={store}>
                <ReduxDemo />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText('First post')).toBeInTheDocument();
            expect(screen.getByText('Second post')).toBeInTheDocument();
        });
    });

    it('should show selected post id from Redux when a post is clicked', async () => {
        vi.mocked(useGetPostsQuery).mockReturnValue({
            data: mockPosts,
            isLoading: false,
            isSuccess: true,
            isError: false,
            error: null,
            refetch: vi.fn(),
        });
        const store = makeStore();
        render(
            <Provider store={store}>
                <ReduxDemo />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText('First post')).toBeInTheDocument();
        });
        await userEvent.click(screen.getByText('First post'));
        await waitFor(() => {
            expect(screen.getByText(/selected.*1/i)).toBeInTheDocument();
        });
    });

    it('should show error state when fetch fails', async () => {
        vi.mocked(useGetPostsQuery).mockReturnValue({
            data: undefined,
            isLoading: false,
            isSuccess: false,
            isError: true,
            error: { status: 500, data: 'Server error' },
            refetch: vi.fn(),
        });
        const store = makeStore();
        render(
            <Provider store={store}>
                <ReduxDemo />
            </Provider>
        );
        await waitFor(() => {
            expect(screen.getByText(/error/i)).toBeInTheDocument();
        });
    });
});
