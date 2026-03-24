import { render, screen } from '@testing-library/react';
import UseIdDemo from './UseId';

describe('UseIdDemo', () => {
    it('should render the form with correctly linked inputs and labels', () => {
        render(<UseIdDemo />);

        // Get elements
        const emailInput = screen.getByLabelText(/Email Address/i);
        const passwordInput = screen.getByLabelText(/Password/i);
        const generatedIdText = screen.getByTestId('generated-id');

        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(generatedIdText).toBeInTheDocument();

        // Check that the generated id matches what the inputs are using
        const baseId = generatedIdText.textContent;
        expect(baseId).toBeTruthy();

        expect(emailInput).toHaveAttribute('id', `${baseId}-email`);
        expect(passwordInput).toHaveAttribute('id', `${baseId}-password`);
    });
});
