import { render, screen, fireEvent, act } from '@testing-library/react';
import ProgressBars from './ProgressBars';

jest.useFakeTimers();

describe('ProgressBars Component', () => {
    it('should render empty state initially', () => {
        render(<ProgressBars />);
        expect(screen.getByText(/Click button to add bars/)).toBeInTheDocument();
    });

    it('should add a progress bar when button is clicked', () => {
        const { container } = render(<ProgressBars />);
        const addButton = screen.getByText('+ Add Progress Bar');

        fireEvent.click(addButton);
        expect(screen.queryByText(/Click button to add bars/)).not.toBeInTheDocument();
        expect(container.querySelectorAll('.progress-track').length).toBe(1);
    });

    it('should increment progress of added bar', () => {
        const { container } = render(<ProgressBars />);
        const addButton = screen.getByText('+ Add Progress Bar');

        fireEvent.click(addButton);
        const progressFill = container.querySelector('.progress-fill') as HTMLDivElement;

        // Initial width might be 0%
        expect(progressFill.style.width).toBe('0%');

        act(() => {
            jest.advanceTimersByTime(1000); // 50% of 2000ms
        });

        // Width should be around 50%
        expect(parseFloat(progressFill.style.width)).toBeGreaterThan(0);

        act(() => {
            jest.advanceTimersByTime(1000); // 100%
        });
        expect(progressFill.style.width).toBe('100%');
    });
});
