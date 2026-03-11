import { describe, it, expect } from 'vitest';
import postsReducer, { setSelectedPostId, selectSelectedPostId } from './postsSlice';

const getRootState = (selectedPostId: number | null) => ({
    posts: { selectedPostId },
});

describe('postsSlice', () => {
    describe('reducer', () => {
        it('should return initial state with selectedPostId null', () => {
            expect(postsReducer(undefined, { type: 'unknown' })).toEqual({
                selectedPostId: null,
            });
        });

        it('should set selectedPostId when setSelectedPostId is dispatched', () => {
            const state = postsReducer(undefined, setSelectedPostId(5));
            expect(state.selectedPostId).toBe(5);
        });

        it('should replace selectedPostId when dispatching again', () => {
            let state = postsReducer(undefined, setSelectedPostId(1));
            state = postsReducer(state, setSelectedPostId(2));
            expect(state.selectedPostId).toBe(2);
        });

        it('should allow setting null to clear selection', () => {
            let state = postsReducer(undefined, setSelectedPostId(3));
            state = postsReducer(state, setSelectedPostId(null));
            expect(state.selectedPostId).toBe(null);
        });
    });

    describe('selectSelectedPostId', () => {
        it('should return null when no selection', () => {
            expect(selectSelectedPostId(getRootState(null))).toBe(null);
        });

        it('should return selected id from state', () => {
            expect(selectSelectedPostId(getRootState(10))).toBe(10);
        });
    });
});
