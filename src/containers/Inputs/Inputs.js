import React, { useState, useContext, useEffect } from 'react';

import styles from './Inputs.module.css';
import { GameContext } from '../../Contexts/inputsContext';

const MAX_BOARD_SIZE = 20;
const MIN_BOARD_SIZE = 3;

const Inputs = (props) => {
    const [gameContext, setGameContext] = useContext(GameContext);
    const [boardSize, setBoardSize] = useState(MIN_BOARD_SIZE);
    const [winRowStreak, setWinRowStreak] = useState(3);
    const [error, setError] = useState('');

    useEffect(() => {

    }, [gameContext]);

    const onStartGameHandler = () => {
        if (!isNaN(boardSize) && !isNaN(winRowStreak)) {
            if( boardSize > MAX_BOARD_SIZE) {
                setError('The MAX board size can\'t be greather than 20!');
                return;
            }
            else if (boardSize < MIN_BOARD_SIZE) {
                setError('The MIN board size can\'t be less than 3!');
                return;
            }
            if (winRowStreak > boardSize) {
                setError('Row streak can\'t be bigger than a board size');
                return;
            }
            if (winRowStreak < MIN_BOARD_SIZE) {
                setError('Row streak can\'t be less than a 3');
                return;
            }
    
            setError('');
            setGameContext({
                boardSize,
                winRowStreak,
                reset: !gameContext.reset
            });
        } else {
            setError("You can enter only numbers!");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.inputs}>
                <label>Board Size: </label>
                <input type="number" defaultValue="3" onChange={e => setBoardSize(parseInt(e.target.value))} />
            </div>
            <div className={styles.inputs}>
                <label>Row To Win: </label>
                <input type="number" defaultValue="3" onChange={e => setWinRowStreak(parseInt(e.target.value))} />
            </div>
            {error !== '' ? <p style={{color: "red", margin: 0}}>{error}</p> : null}
            <button className={styles.btn} onClick={onStartGameHandler}>Start Game / Reset</button>
        </div>
    );
}

export default Inputs;