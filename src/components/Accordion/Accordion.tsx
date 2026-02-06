import { useState } from "react";
import './styles.scss';

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

const ACCORDION: AccordionItem[] = [
  {
    id: "html",
    title: "HTML",
    content:
      "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    id: "css",
    title: "CSS",
    content:
      "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
  },
  {
    id: "javascript",
    title: "JavaScript",
    content:
      "JavaScript is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
  },
];

export default function Accordion() {
  const [activeId, setActiveId] = useState<string | null>(null);

  function toggle(id: string) {
    setActiveId((prev: string | null) => (prev === id ? null : id));
  }

  return (
    <div className="accordion-container">
      {ACCORDION.map((item) => {
        const isOpen = activeId === item.id;

        return (
          <div key={item.id} className="accordion-item">
            <button
              className="accordion-header"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`panel-${item.id}`}
            >
              {item.title}
              <span className={`icon ${isOpen ? 'open' : ''}`}>
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </button>

            <div
              id={`panel-${item.id}`}
              className={`accordion-content ${isOpen ? 'open' : ''}`}
              role="region"
              aria-labelledby={item.id}
            >
              <p>{item.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
