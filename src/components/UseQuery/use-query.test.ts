import { renderHook, waitFor } from '@testing-library/react';
import useQuery from './use-query';

// Mock fetch
global.fetch = jest.fn() as jest.Mock;

describe('useQuery', () => {
    beforeEach(() => {
        (fetch as jest.Mock).mockClear();
    });

    it('should start in loading state', () => {
        (fetch as jest.Mock).mockImplementation(() => new Promise(() => { }));
        const { result } = renderHook(() => useQuery('https://api.example.com'));
        expect(result.current.loading).toBe(true);
        expect(result.current.data).toBeNull();
    });

    it('should fetch data successfully', async () => {
        const mockData = { message: 'hello' };
        (fetch as jest.Mock).mockResolvedValue({
            ok: true,
            json: async () => mockData,
        });

        const { result } = renderHook(() => useQuery('https://api.example.com'));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.data).toEqual(mockData);
        expect(result.current.error).toBeNull();
    });

    it('should handle fetch errors', async () => {
        const mockError = new Error('Network error');
        (fetch as jest.Mock).mockRejectedValue(mockError);

        const { result } = renderHook(() => useQuery('https://api.example.com'));

        await waitFor(() => expect(result.current.loading).toBe(false));
        expect(result.current.error).toEqual(mockError);
        expect(result.current.data).toBeNull();
    });
});
