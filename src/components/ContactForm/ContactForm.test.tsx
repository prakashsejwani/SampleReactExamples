import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import ContactForm from './ContactForm';

// Initial mock
global.fetch = jest.fn();

describe('ContactForm Component', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        global.fetch = jest.fn();
        jest.spyOn(window, 'alert').mockImplementation(() => { });
    });

    it('should render all form fields', () => {
        render(<ContactForm />);
        expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email Address')).toBeInTheDocument();
        expect(screen.getByLabelText('Message')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Send Message' })).toBeInTheDocument();
    });

    it('should submit form data successfully', async () => {
        (fetch as jest.Mock).mockResolvedValueOnce({
            ok: true,
            text: async () => 'CONTACT_SUCCESS_MSG',
        });

        render(<ContactForm />);

        fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });

        fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
        expect(fetch).toHaveBeenCalledWith(
            'https://questions.greatfrontend.com/api/questions/contact-form',
            expect.objectContaining({
                method: 'POST',
                body: JSON.stringify({ name: 'John Doe', email: 'john@example.com', message: 'Hello' }),
            })
        );
        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('CONTACT_SUCCESS_MSG'));
    });

    it('should show error alert if fetch fails', async () => {
        (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

        render(<ContactForm />);

        // Fill form to pass validation
        fireEvent.change(screen.getByLabelText('Full Name'), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByLabelText('Email Address'), { target: { value: 'john@example.com' } });
        fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Hello' } });

        fireEvent.click(screen.getByRole('button', { name: 'Send Message' }));

        await waitFor(() => expect(window.alert).toHaveBeenCalledWith('Error submitting form!'));
    });
});
