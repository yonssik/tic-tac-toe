import React, { useState } from 'react';

import Board from './containers/Board/Board';
import Inputs from './containers/Inputs/Inputs';
import { GameContext } from './Contexts/inputsContext';

function App() {
  const [gameContext, setGameContext] = useState({
    winStreak: 3,
    boardSize: 3
  });

  return (
    <GameContext.Provider value={[gameContext, setGameContext]}>
        <div style={{display: "flex", flexDirection: "column", gap: "20px"}}>
          <Inputs />
          <Board />
        </div>
    </GameContext.Provider>
  );
}

export default App;
