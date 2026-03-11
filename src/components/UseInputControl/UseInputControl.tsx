import { useState, useCallback } from 'react';
import './styles.scss';

export interface UseInputControlReturn {
    value: string;
    dirty: boolean;
    touched: boolean;
    different: boolean;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
    reset: () => void;
}

export function useInputControl(initialValue: string): UseInputControlReturn {
    const [value, setValue] = useState(initialValue);
    const [dirty, setDirty] = useState(false);
    const [touched, setTouched] = useState(false);

    const handleChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
        setDirty(true);
    }, []);

    const handleBlur = useCallback((_event: React.FocusEvent<HTMLInputElement>) => {
        setTouched(true);
    }, []);

    const reset = useCallback(() => {
        setValue(initialValue);
        setDirty(false);
        setTouched(false);
    }, [initialValue]);

    return {
        value,
        dirty,
        touched,
        different: value !== initialValue,
        handleChange,
        handleBlur,
        reset,
    };
}

export default function UseInputControlDemo() {
    const nameInput = useInputControl('Oliver');

    return (
        <div className="use-input-control-demo">
            <h2>useInputControl Hook</h2>
            <form onSubmit={(e) => e.preventDefault()}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input
                        id="name"
                        value={nameInput.value}
                        onChange={nameInput.handleChange}
                        onBlur={nameInput.handleBlur}
                    />
                </div>
                <p>Touched: {nameInput.touched.toString()}</p>
                <p>Dirty: {nameInput.dirty.toString()}</p>
                <p>Different: {nameInput.different.toString()}</p>
                <div className="button-group">
                    <button type="submit" disabled={!nameInput.different}>
                        Submit
                    </button>
                    <button type="button" onClick={nameInput.reset}>
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
}
