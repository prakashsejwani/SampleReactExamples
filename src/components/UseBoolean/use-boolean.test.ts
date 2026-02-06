import { renderHook, act } from '@testing-library/react';
import useBoolean from './use-boolean';

describe('useBoolean', () => {
    it('should initialize with initial value', () => {
        const { result } = renderHook(() => useBoolean(true));
        expect(result.current.value).toBe(true);
    });

    it('should set to true', () => {
        const { result } = renderHook(() => useBoolean(false));
        act(() => {
            result.current.setTrue();
        });
        expect(result.current.value).toBe(true);
    });

    it('should set to false', () => {
        const { result } = renderHook(() => useBoolean(true));
        act(() => {
            result.current.setFalse();
        });
        expect(result.current.value).toBe(false);
    });

    it('should toggle value', () => {
        const { result } = renderHook(() => useBoolean(false));
        act(() => {
            result.current.toggle();
        });
        expect(result.current.value).toBe(true);
        act(() => {
            result.current.toggle();
        });
        expect(result.current.value).toBe(false);
    });
});
