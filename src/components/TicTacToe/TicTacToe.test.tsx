import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Game from './Game';

function getSquares(container: HTMLElement) {
    return Array.from(container.getElementsByClassName('square')) as HTMLButtonElement[];
}

describe('TicTacToe Game', () => {
    it('renders difficulty selector, players and helper text', () => {
        render(<Game />);

        expect(screen.getByLabelText('Difficulty')).toBeInTheDocument();
        expect(screen.getByText('Start game or select player')).toBeInTheDocument();
        expect(screen.getByText('X')).toBeInTheDocument();
        expect(screen.getByText('O')).toBeInTheDocument();
    });

    it('plays a full game where X wins', () => {
        const { container } = render(<Game />);

        const squares = getSquares(container);

        // X moves
        fireEvent.click(squares[0]);
        expect(squares[0].textContent).toBe('X');
        expect(screen.getByText('Next player: O')).toBeInTheDocument();

        // O moves
        fireEvent.click(squares[3]);
        expect(squares[3].textContent).toBe('O');

        // X
        fireEvent.click(squares[1]);
        expect(squares[1].textContent).toBe('X');

        // O
        fireEvent.click(squares[4]);
        expect(squares[4].textContent).toBe('O');

        // X winning move
        fireEvent.click(squares[2]);

        expect(screen.getByText('Winner: X')).toBeInTheDocument();
    });

    it('restarts the game and clears the board', () => {
        const { container } = render(<Game />);

        const squaresBefore = getSquares(container);
        fireEvent.click(squaresBefore[0]);
        expect(squaresBefore[0].textContent).toBe('X');

        fireEvent.click(screen.getByText('Restart game'));

        const squaresAfter = getSquares(container);
        squaresAfter.forEach((square) => {
            expect(square.textContent).toBe('');
        });
        expect(screen.getByText('Next player: X')).toBeInTheDocument();
    });
});

