import { useState } from 'react';
import * as Components from './components';
import './App.scss';

const EXAMPLE_COMPONENTS = [
    { name: 'Accordion', Component: Components.Accordion },
    { name: 'Contact Form', Component: Components.ContactForm },
    { name: 'Counter', Component: Components.Counter },
    { name: 'Digital Clock', Component: Components.DigitalClock },
    { name: 'Holy Grail', Component: Components.HolyGrail },
    {
        name: 'Image Carousel',
        Component: () => <Components.ImageCarousel images={[
            { src: 'https://picsum.photos/id/10/600/400', alt: 'Ocean' },
            { src: 'https://picsum.photos/id/20/600/400', alt: 'Mountain' },
            { src: 'https://picsum.photos/id/30/600/400', alt: 'Sky' },
        ]} />
    },
    { name: 'Job Board', Component: Components.JobBoard },
    { name: 'Like Button', Component: Components.LikeButton },
    { name: 'Progress Bars', Component: Components.ProgressBars },
    { name: 'Star Rating', Component: Components.StarRating },
    { name: 'Stopwatch', Component: Components.Stopwatch },
    { name: 'Tabs', Component: Components.Tabs },
    { name: 'Todo List', Component: Components.TodoList },
    { name: 'Traffic Light', Component: Components.TrafficLight },
    { name: 'useArray Hook', Component: Components.UseArray },
    { name: 'useBoolean Hook', Component: Components.UseBoolean },
    { name: 'useCounter Hook', Component: Components.UseCounter },
    { name: 'useCounter2 Hook', Component: Components.UseCounter2 },
    { name: 'useCycle Hook', Component: Components.UseCycle },
    { name: 'useQuery Hook', Component: Components.UseQuery },
    { name: 'useTimeout Hook', Component: Components.UseTimeout },
];

function App() {
    const [selectedExample, setSelectedExample] = useState(EXAMPLE_COMPONENTS[0].name);

    const CurrentComponent = EXAMPLE_COMPONENTS.find(c => c.name === selectedExample)?.Component || (() => null);

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>React Examples Portfolio</h1>
                <p>A collection of converted React components</p>
            </header>

            <div className="portfolio-layout">
                <aside className="sidebar">
                    <nav>
                        <ul>
                            {EXAMPLE_COMPONENTS.map(ex => (
                                <li key={ex.name}>
                                    <button
                                        className={selectedExample === ex.name ? 'active' : ''}
                                        onClick={() => setSelectedExample(ex.name)}
                                    >
                                        {ex.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>

                <main className="viewer">
                    <section className="component-card">
                        <h2>{selectedExample}</h2>
                        <div className="component-wrapper">
                            <CurrentComponent />
                        </div>
                    </section>
                </main>
            </div>
        </div>
    );
}

export default App;
