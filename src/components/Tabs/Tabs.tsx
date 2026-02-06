import { useState } from 'react';
import './Tabs.scss';

interface TabItem {
  id: string;
  label: string;
  content: string;
}

const TABS: TabItem[] = [
  {
    id: "html",
    label: "HTML",
    content: "The HyperText Markup Language or HTML is the standard markup language for documents designed to be displayed in a web browser.",
  },
  {
    id: "css",
    label: "CSS",
    content: "Cascading Style Sheets is a style sheet language used for describing the presentation of a document written in a markup language such as HTML or XML.",
  },
  {
    id: "js",
    label: "JavaScript",
    content: "JavaScript, often abbreviated as JS, is a programming language that is one of the core technologies of the World Wide Web, alongside HTML and CSS.",
  },
];

export default function Tabs() {
  const [activeTab, setActiveTab] = useState(TABS[0].id);

  return (
    <div className="tabs-container">
      <div className="tab-list" role="tablist">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={activeTab === tab.id ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content" role="tabpanel">
        <p key={activeTab}>
          {TABS.find((tab) => tab.id === activeTab)?.content}
        </p>
      </div>
    </div>
  );
}
