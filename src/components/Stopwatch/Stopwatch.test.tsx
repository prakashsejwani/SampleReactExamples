import { render, screen, fireEvent, act } from '@testing-library/react';
import Stopwatch from './Stopwatch';

jest.useFakeTimers();

describe('Stopwatch Component', () => {
    it('should start with 00:00.00', () => {
        render(<Stopwatch />);
        expect(screen.getByText('00:00.00')).toBeInTheDocument();
    });

    it('should start and stop timer', () => {
        render(<Stopwatch />);
        const startButton = screen.getByText('Start');

        fireEvent.click(startButton);
        expect(screen.getByText('Stop')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(1500);
        });

        // Check if time updated. Note: Date.now() is used in the component, 
        // we should mock Date.now() for precise testing if needed,
        // but fake timers + advancing time should work if Date.now is also mocked by jest.
        expect(screen.queryByText('00:00.00')).not.toBeInTheDocument();

        fireEvent.click(screen.getByText('Stop'));
        expect(screen.getByText('Start')).toBeInTheDocument();
    });

    it('should reset timer', () => {
        render(<Stopwatch />);
        const startButton = screen.getByText('Start');
        const resetButton = screen.getByText('Reset');

        fireEvent.click(startButton);
        act(() => {
            jest.advanceTimersByTime(1000);
        });

        fireEvent.click(resetButton);
        expect(screen.getByText('00:00.00')).toBeInTheDocument();
        expect(screen.getByText('Start')).toBeInTheDocument();
    });
});
