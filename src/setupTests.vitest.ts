import './setupTests';
import { vi } from 'vitest';

// Polyfill jest global for compatibility
(globalThis as any).jest = {
    ...vi,
    // Add specific mappings if needed, but vi acts as jest mostly
    // For example, jest.fn() -> vi.fn()
};
