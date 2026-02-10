import { useState } from 'react';
import Board from './board.tsx';
import './TicTacToe.scss';

type SquareValue = string | null;
type Squares = SquareValue[];
type History = Squares[];

type Difficulty = 'easy' | 'medium' | 'impossible' | 'friend';
type PlayerType = 'human' | 'computer';

export default function Game() {
    const [history, setHistory] = useState<History>([Array(9).fill(null)] as Squares[]);
    const [currentMove, setCurrentMove] = useState<number>(0);
    const [difficulty, setDifficulty] = useState<Difficulty>('medium');
    const [xPlayer, setXPlayer] = useState<PlayerType>('human');
    const [oPlayer, setOPlayer] = useState<PlayerType>('computer');

    const xIsNext = currentMove % 2 === 0;
    const currentSquares: Squares = history[currentMove];

    function handlePlay(nextSquares: Squares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function handleRestart() {
        setHistory([Array(9).fill(null)] as Squares[]);
        setCurrentMove(0);
    }

    return (
        <div className="tictactoe">
            <div className="tt-card">
                <div className="tt-top-bar">
                    <div className="tt-select-group">
                        <label className="tt-label" htmlFor="tt-difficulty">
                            Difficulty
                        </label>
                        <select
                            id="tt-difficulty"
                            className="tt-select"
                            value={difficulty}
                            onChange={(e) => setDifficulty(e.target.value as Difficulty)}
                        >
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="impossible">Impossible</option>
                            <option value="friend">Play against a friend</option>
                        </select>
                    </div>

                    <div className="tt-players">
                        <button
                            type="button"
                            className={`tt-player-pill ${xPlayer === 'human' ? 'active' : ''}`}
                            onClick={() =>
                                setXPlayer((prev) => (prev === 'human' ? 'computer' : 'human'))
                            }
                        >
                            <span className="tt-player-symbol">X</span>
                            <span className="tt-player-role">
                                {xPlayer === 'human' ? 'You' : 'Computer'}
                            </span>
                        </button>

                        <button
                            type="button"
                            className={`tt-player-pill ${oPlayer === 'human' ? 'active' : ''}`}
                            onClick={() =>
                                setOPlayer((prev) => (prev === 'human' ? 'computer' : 'human'))
                            }
                        >
                            <span className="tt-player-symbol">O</span>
                            <span className="tt-player-role">
                                {oPlayer === 'human' ? 'You' : 'Computer'}
                            </span>
                        </button>
                    </div>
                </div>

                <p className="tt-helper-text">Start game or select player</p>

                <div className="tt-board-surface">
                    <div className="tt-board">
                        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                    </div>
                </div>

                <button type="button" className="tt-restart" onClick={handleRestart}>
                    Restart game
                </button>
            </div>
        </div>
    );
}