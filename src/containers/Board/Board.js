import React, { useState, useContext, useEffect } from 'react';

import Cell from '../../components/Cell/Cell';
import styles from './Board.module.css';
import { GameContext } from '../../Contexts/inputsContext';

const createBoard = (size = 3) => {
    const board = [];
    for (let i = 0; i < size; i++){
        board.push(undefined);
    }

    return board;
}

const Board = (props) => {
    const [turn, setTurn] = useState(true);
    const [board, setBoard] = useState(createBoard(3));
    const [winner, setWinner] = useState('');
    const [gameContext, setGameContext] = useContext(GameContext);
    
    useEffect(() => {
        setBoard(createBoard(gameContext.boardSize));
        setTurn(true);
        setWinner('');
    }, [gameContext.boardSize, gameContext.reset]);

    useEffect(() => {
        endGameHandler();
    }, [board]);

    const onCellCklicHandler = (index) => {
        let boardCopy = [...board];
        if(turn) {
            if (boardCopy[index] === undefined) {
                updateBoard({ index, symbol: 'X', boardCopy });
            }
        } else {
            if (boardCopy[index] === undefined) {
                updateBoard({ index, symbol: 'O', boardCopy });
            }
        }
    }

    const endGameHandler = () => {
        const symbol = !turn ? 'X' : 'O';
        let counter = 0;

        for (let i = 0; i < gameContext.boardSize; i++) {
            if(board[i] === symbol) {
                counter++;
                if(gameContext.winRowStreak === counter) {
                    if(symbol === 'X') {
                        alert('First player is a winner!');
                        setGameContext({...gameContext, reset: !gameContext.reset});
                    }
                    else {
                        alert('Second player is a winner!');
                        setGameContext({...gameContext, reset: !gameContext.reset});
                    }
                    return;
                }
            } else counter = 0;
        }

        if(!board.includes(undefined)) {
            alert('Tie!');
            setGameContext({...gameContext, reset: !gameContext.reset});
        }
    }

    const updateBoard = ({ index, symbol, boardCopy }) => {
        boardCopy = [...board];
        boardCopy[index] = symbol;
        // endGameHandler(boardCopy, symbol);
        setBoard(boardCopy);
        setTurn(!turn);
    }

    return (
        <div className={styles.board}>
            {board.map((value, index) => (
                <Cell key={index} click={() => onCellCklicHandler(index)}>{value}</Cell>
            ))}
        </div>
    );
}

export default Board;