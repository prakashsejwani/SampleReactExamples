import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import HierarchicalCheckboxes from './HierarchicalCheckboxes';

describe('HierarchicalCheckboxes', () => {
    it('renders the top level nodes', () => {
        render(<HierarchicalCheckboxes />);
        expect(screen.getByText('Electronics')).toBeInTheDocument();
        expect(screen.getByText('Books')).toBeInTheDocument();
        expect(screen.getByText('Toys')).toBeInTheDocument();
    });

    it('updates children when a parent is checked', () => {
        render(<HierarchicalCheckboxes />);

        // We can't query by label using standard getByLabelText easily because structure has span inside label, 
        // but we can query the checkbox nearest to the text or just check if "Toys" checkbox changes.
        // The easiest is to use role.
        const electronicsLabel = screen.getByText('Electronics');
        const electronicsCheckbox = electronicsLabel.previousSibling as HTMLInputElement;

        fireEvent.click(electronicsCheckbox);

        // After clicking electronics, Mobile phones should be checked
        const mobilePhonesLabel = screen.getByText('Mobile phones');
        const mobilePhonesCheckbox = mobilePhonesLabel.previousSibling as HTMLInputElement;
        expect(mobilePhonesCheckbox.checked).toBe(true);
    });
});
