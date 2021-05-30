import React from 'react'; 

const input = {
    boardSize: 3,
    winRowStreak: 3,
    reset: false
}

export const GameContext = React.createContext(input);