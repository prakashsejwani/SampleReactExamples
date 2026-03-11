import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import type { ChangeEvent, FocusEvent } from 'react';
import { useInputControl } from './UseInputControl';

const createChangeEvent = (value: string): ChangeEvent<HTMLInputElement> =>
    ({ target: { value } } as ChangeEvent<HTMLInputElement>);

const createBlurEvent = (): FocusEvent<HTMLInputElement> =>
    ({} as FocusEvent<HTMLInputElement>);

describe('useInputControl', () => {
    it('should initialize with initialValue and all states false', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        expect(result.current.value).toBe('Oliver');
        expect(result.current.dirty).toBe(false);
        expect(result.current.touched).toBe(false);
        expect(result.current.different).toBe(false);
    });

    it('should update value when handleChange is called', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        act(() => {
            result.current.handleChange(createChangeEvent('Ol'));
        });
        expect(result.current.value).toBe('Ol');
    });

    it('should set dirty to true when user types', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        expect(result.current.dirty).toBe(false);
        act(() => {
            result.current.handleChange(createChangeEvent('O'));
        });
        expect(result.current.dirty).toBe(true);
    });

    it('should keep dirty true after typing once', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        act(() => {
            result.current.handleChange(createChangeEvent('O'));
            result.current.handleChange(createChangeEvent('Oliver'));
        });
        expect(result.current.dirty).toBe(true);
    });

    it('should set touched to true when handleBlur is called', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        expect(result.current.touched).toBe(false);
        act(() => {
            result.current.handleBlur(createBlurEvent());
        });
        expect(result.current.touched).toBe(true);
    });

    it('should set different to true when value differs from initial', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        expect(result.current.different).toBe(false);
        act(() => {
            result.current.handleChange(createChangeEvent('Ol'));
        });
        expect(result.current.different).toBe(true);
    });

    it('should set different to false when value equals initial again', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        act(() => {
            result.current.handleChange(createChangeEvent('Other'));
        });
        expect(result.current.different).toBe(true);
        act(() => {
            result.current.handleChange(createChangeEvent('Oliver'));
        });
        expect(result.current.different).toBe(false);
    });

    it('should reset value and all states when reset is called', () => {
        const { result } = renderHook(() => useInputControl('Oliver'));
        act(() => {
            result.current.handleChange(createChangeEvent('Jane'));
            result.current.handleBlur(createBlurEvent());
        });
        expect(result.current.value).toBe('Jane');
        expect(result.current.dirty).toBe(true);
        expect(result.current.touched).toBe(true);
        expect(result.current.different).toBe(true);

        act(() => {
            result.current.reset();
        });
        expect(result.current.value).toBe('Oliver');
        expect(result.current.dirty).toBe(false);
        expect(result.current.touched).toBe(false);
        expect(result.current.different).toBe(false);
    });

    it('should return stable handleChange, handleBlur, and reset references', () => {
        const { result, rerender } = renderHook(() => useInputControl('Oliver'));
        const change1 = result.current.handleChange;
        const blur1 = result.current.handleBlur;
        const reset1 = result.current.reset;
        rerender();
        expect(result.current.handleChange).toBe(change1);
        expect(result.current.handleBlur).toBe(blur1);
        expect(result.current.reset).toBe(reset1);
    });
});
