import { render, screen, act } from '@testing-library/react';
import TrafficLight from './TrafficLight';

jest.useFakeTimers();

describe('TrafficLight Component', () => {
    it('should start with green light', () => {
        render(<TrafficLight />);
        expect(screen.getByText('green')).toBeInTheDocument();
        expect(screen.getByText('green')).toHaveClass('green');
    });

    it('should change to yellow after 3 seconds', () => {
        render(<TrafficLight />);
        act(() => {
            jest.advanceTimersByTime(3000);
        });
        expect(screen.getByText('yellow')).toBeInTheDocument();
    });

    it('should change to red after yellow (1 second)', () => {
        render(<TrafficLight />);
        act(() => {
            jest.advanceTimersByTime(3000); // to yellow
        });
        act(() => {
            jest.advanceTimersByTime(1000); // to red
        });
        expect(screen.getByText('red')).toBeInTheDocument();
    });

    it('should cycle back to green after red (4 seconds)', () => {
        render(<TrafficLight />);
        act(() => {
            jest.advanceTimersByTime(3000); // to yellow
        });
        act(() => {
            jest.advanceTimersByTime(1000); // to red
        });
        act(() => {
            jest.advanceTimersByTime(4000); // back to green
        });
        expect(screen.getByText('green')).toBeInTheDocument();
    });
});
