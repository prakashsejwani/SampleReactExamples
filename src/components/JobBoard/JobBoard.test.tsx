import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import JobBoard from './JobBoard';

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe('JobBoard Component', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should fetch and render job IDs and details', async () => {
        const mockIds = [1, 2, 3];
        const mockJob = (id: number) => ({
            id,
            title: `Job ${id}`,
            by: 'user',
            time: 1600000000,
        });

        (fetch as jest.Mock)
            .mockResolvedValueOnce({ ok: true, json: async () => mockIds }) // First call for IDs
            .mockResolvedValueOnce({ ok: true, json: async () => mockJob(1) })
            .mockResolvedValueOnce({ ok: true, json: async () => mockJob(2) })
            .mockResolvedValueOnce({ ok: true, json: async () => mockJob(3) });

        render(<JobBoard />);

        await waitFor(() => expect(screen.getByText('Job 1')).toBeInTheDocument());
        expect(screen.getByText('Job 2')).toBeInTheDocument();
        expect(screen.getByText('Job 3')).toBeInTheDocument();
    });

    it('should load more jobs on button click', async () => {
        // Mock enough IDs to have more pages
        const mockIds = Array.from({ length: 10 }, (_, i) => i + 1);
        const mockJob = (id: number) => ({
            id,
            title: `Job ${id}`,
            by: 'user',
            time: 1600000000,
        });

        (fetch as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('jobstories')) return Promise.resolve({ ok: true, json: async () => mockIds });
            const id = parseInt(url.split('/').pop()!.split('.')[0]);
            return Promise.resolve({ ok: true, json: async () => mockJob(id) });
        });

        render(<JobBoard />);

        // Initially loads 6 jobs
        await waitFor(() => expect(screen.getAllByRole('listitem').length).toBe(6));

        const loadMoreBtn = screen.getByText('Load More Jobs');
        fireEvent.click(loadMoreBtn);

        await waitFor(() => expect(screen.getAllByRole('listitem').length).toBe(10));
        expect(screen.queryByText('Load More Jobs')).not.toBeInTheDocument();
    });
});
