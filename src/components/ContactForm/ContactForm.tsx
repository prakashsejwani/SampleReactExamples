import submitForm from './submitForm';
import './ContactForm.scss';

export default function ContactForm() {
  return (
    <form
      className="contact-form"
      onSubmit={submitForm}
      action="https://questions.greatfrontend.com/api/questions/contact-form"
      method="POST"
    >
      <div>
        <label htmlFor="name" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Full Name</label>
        <input
          id="name"
          type="text"
          name="name"
          placeholder="e.g. John Doe"
          required
        />
      </div>
      <div>
        <label htmlFor="email" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="e.g. john@example.com"
          required
        />
      </div>
      <div>
        <label htmlFor="message" style={{ color: '#94a3b8', fontSize: '0.875rem' }}>Message</label>
        <textarea
          id="message"
          name="message"
          placeholder="How can we help?"
          required
        ></textarea>
      </div>
      <button type="submit">Send Message</button>
    </form>
  );
}
