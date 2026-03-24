import { render, screen, fireEvent } from '@testing-library/react';
import StringAnagram from './StringAnagram';

describe('StringAnagram', () => {
    it('initializes with listen and silent which are anagrams', () => {
        render(<StringAnagram />);
        
        expect(screen.getByDisplayValue('listen')).toBeInTheDocument();
        expect(screen.getByDisplayValue('silent')).toBeInTheDocument();
        expect(screen.getByText('They are an anagram!')).toBeInTheDocument();
    });

    it('changes to false when inputs are not anagrams', () => {
        render(<StringAnagram />);
        
        const input1 = screen.getByLabelText(/First Word\/Phrase/i);
        fireEvent.change(input1, { target: { value: 'apple' } });
        
        expect(screen.getByText('Not an anagram.')).toBeInTheDocument();
    });

    it('handles spaces and ignores casing', () => {
        render(<StringAnagram />);
        
        const input1 = screen.getByLabelText(/First Word\/Phrase/i);
        const input2 = screen.getByLabelText(/Second Word\/Phrase/i);
        
        fireEvent.change(input1, { target: { value: 'Dormitory' } });
        fireEvent.change(input2, { target: { value: 'Dirty room' } });
        
        expect(screen.getByText('They are an anagram!')).toBeInTheDocument();
    });
});
