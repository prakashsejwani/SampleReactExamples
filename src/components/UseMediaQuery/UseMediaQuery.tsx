import { useState, useEffect } from 'react';
import './styles.scss';

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState<boolean>(() => {
        if (typeof window === 'undefined') return false;
        return window.matchMedia(query).matches;
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const mediaQueryList = window.matchMedia(query);

        const handleChange = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };

        setMatches(mediaQueryList.matches);
        mediaQueryList.addEventListener('change', handleChange);
        return () => mediaQueryList.removeEventListener('change', handleChange);
    }, [query]);

    return matches;
}

export default function UseMediaQueryDemo() {
    const isSmallDevice = useMediaQuery('only screen and (max-width: 768px)');

    return (
        <div className="use-media-query-demo">
            <h2>useMediaQuery Hook</h2>
            <div className="demo-content">
                <p>Query: <code>only screen and (max-width: 768px)</code></p>
                <span className={`match-badge ${isSmallDevice ? 'match' : 'no-match'}`}>
                    {isSmallDevice ? 'Matches' : 'No match'}
                </span>
                <div>
                    {isSmallDevice && <a href="#menu">Menu</a>}
                </div>
            </div>
        </div>
    );
}
