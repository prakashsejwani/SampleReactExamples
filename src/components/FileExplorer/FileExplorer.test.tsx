import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FileExplorer from './FileExplorer';

const mockData = [
    {
        id: 1,
        name: 'z-file.txt',
    },
    {
        id: 2,
        name: 'a-dir',
        children: [
            { id: 3, name: 'inner-file.txt' }
        ]
    },
    {
        id: 4,
        name: 'b-file.txt',
    }
];

describe('FileExplorer Component', () => {
    it('renders initial state correctly and sorts folders first', () => {
        const { container } = render(<FileExplorer data={mockData} />);

        const items = container.getElementsByClassName('name');
        // a-dir (folder) should be first, then b-file.txt, then z-file.txt
        expect(items[0].textContent).toBe('a-dir');
        expect(items[1].textContent).toBe('b-file.txt');
        expect(items[2].textContent).toBe('z-file.txt');
    });

    it('expands a directory when clicked', () => {
        render(<FileExplorer data={mockData} />);

        const directory = screen.getByText('a-dir');
        expect(screen.queryByText('inner-file.txt')).not.toBeInTheDocument();

        fireEvent.click(directory);
        expect(screen.getByText('inner-file.txt')).toBeInTheDocument();
    });

    it('collapses a directory when clicked again', () => {
        render(<FileExplorer data={mockData} />);

        const directory = screen.getByText('a-dir');
        fireEvent.click(directory); // expand
        expect(screen.getByText('inner-file.txt')).toBeInTheDocument();

        fireEvent.click(directory); // collapse
        expect(screen.queryByText('inner-file.txt')).not.toBeInTheDocument();
    });

    it('shows empty folder message when folder has no children', () => {
        const emptyDirData = [
            { id: 1, name: 'empty-dir', children: [] }
        ];
        render(<FileExplorer data={emptyDirData} />);

        fireEvent.click(screen.getByText('empty-dir'));
        expect(screen.getByText('(empty folder)')).toBeInTheDocument();
    });

    it('renders nested structure correctly', () => {
        const nestedData = [
            {
                id: 1,
                name: 'root',
                children: [
                    {
                        id: 2,
                        name: 'level1',
                        children: [
                            { id: 3, name: 'level2.txt' }
                        ]
                    }
                ]
            }
        ];
        render(<FileExplorer data={nestedData} />);

        fireEvent.click(screen.getByText('root'));
        expect(screen.getByText('level1')).toBeInTheDocument();

        fireEvent.click(screen.getByText('level1'));
        expect(screen.getByText('level2.txt')).toBeInTheDocument();
    });

    it('displays no files found when data is empty', () => {
        render(<FileExplorer data={[]} />);
        expect(screen.getByText('No files found')).toBeInTheDocument();
    });
});
