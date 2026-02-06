import { renderHook, act } from '@testing-library/react';
import useTimeout from './use-timeout';

describe('useTimeout', () => {
    it('should call callback after delay', () => {
        jest.useFakeTimers();
        const callback = jest.fn();
        const delay = 1000;
        renderHook(() => useTimeout(callback, delay));
        act(() => {
            jest.runAllTimers();
        });
        expect(callback).toHaveBeenCalledTimes(1);
        jest.useRealTimers();
    });
});
