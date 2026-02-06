import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LikeButton from './LikeButton';

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe('LikeButton Component', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should render initial state', () => {
        render(<LikeButton />);
        expect(screen.getByText('Like')).toBeInTheDocument();
        expect(screen.getByRole('button')).not.toHaveClass('liked');
    });

    it('should toggle like on click successfully', async () => {
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => ({ message: 'success' }),
        });

        render(<LikeButton />);
        const button = screen.getByRole('button');

        fireEvent.click(button);

        // Check loading state
        expect(button).toHaveClass('loading');

        await waitFor(() => expect(screen.getByText('Liked')).toBeInTheDocument());
        expect(button).toHaveClass('liked');
        expect(button).not.toHaveClass('loading');
    });

    it('should not toggle if fetch fails', async () => {
        (fetch as jest.Mock).mockRejectedValue(new Error('API Error'));
        console.error = jest.fn(); // Suppress error log

        render(<LikeButton />);
        const button = screen.getByRole('button');

        fireEvent.click(button);

        await waitFor(() => expect(button).not.toHaveClass('loading'));
        expect(screen.getByText('Like')).toBeInTheDocument();
        expect(button).not.toHaveClass('liked');
    });
});
