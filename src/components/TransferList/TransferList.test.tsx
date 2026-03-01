import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import TransferList from './TransferList';

describe('TransferList', () => {
    it('renders with initial items in the Available list', () => {
        render(<TransferList />);
        expect(screen.getByText('React.js')).toBeInTheDocument();
        expect(screen.getByText('Available')).toBeInTheDocument();
        expect(screen.getByText('10 items')).toBeInTheDocument();
    });

    it('allows selecting an item', () => {
        render(<TransferList />);
        const item = screen.getByText('React.js').parentElement;
        fireEvent.click(item!);
        expect(item).toHaveClass('selected');
    });

    it('moves selected items to the right', () => {
        render(<TransferList />);
        const item = screen.getByText('React.js').parentElement;
        fireEvent.click(item!);

        const moveRightButton = screen.getByTitle('Move Selected Right');
        fireEvent.click(moveRightButton);

        const selectedPane = screen.getByText('Selected').closest('.list-pane');
        expect(selectedPane?.textContent).toContain('React.js');
        expect(screen.getByText('1 items')).toBeInTheDocument(); // Right pane count
    });

    it('moves all items to the right', () => {
        render(<TransferList />);
        const moveAllRightButton = screen.getByTitle('Move All Right');
        fireEvent.click(moveAllRightButton);

        const availablePane = screen.getByText('Available').closest('.list-pane');
        expect(availablePane?.textContent).toContain('0 items');

        const selectedPane = screen.getByText('Selected').closest('.list-pane');
        expect(selectedPane?.textContent).toContain('10 items');
    });
});
