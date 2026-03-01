import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Modal from './Modal';

describe('Modal Component', () => {
    it('renders correctly when open', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={true} onClose={handleClose} title="Test Title">
                <p>Test Content</p>
            </Modal>
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('does not render when closed', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={false} onClose={handleClose} title="Test Title">
                <p>Test Content</p>
            </Modal>
        );

        expect(screen.queryByText('Test Title')).not.toBeInTheDocument();
        expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
    });

    it('calls onClose when close button clicked', () => {
        const handleClose = vi.fn();
        render(
            <Modal isOpen={true} onClose={handleClose} title="Test Title">
                <p>Test Content</p>
            </Modal>
        );

        fireEvent.click(screen.getByLabelText('Close modal'));
        expect(handleClose).toHaveBeenCalledTimes(1);
    });
});
