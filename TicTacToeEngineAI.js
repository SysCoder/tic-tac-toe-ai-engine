
// Insert a valid game state and get an evaluation of the game state.
//
// Input: ['X', 'O', '', '', '', '', '', '', '']
// Output:
// {
//   winner: 'X',
//   depth: 5,
//   nextBestGameState: ['X', 'O', '', 'X', '', '', '', '', '']
// }
//
// ['X', 'O', '', '', '', '', '', '', ''] corresponds to
//  X | O |
//  ---------
//    |   |
//  ---------
//    |  |
//
// Winner: wins the game with perfect play from current position.
// Depth: shows how many moves until the game is finsihed with perfect play
// on both sides.
// NextBestGameState: Gives the next best move for current player.
function computeMove(gameState) {
  let whoWon = determineWinner(gameState);
  if (whoWon === 'X') {
    return {winner: whoWon, depth: 0, nextBestGameState: gameState};
  } else if (whoWon === 'O') {
    return {winner: whoWon, depth: 0, nextBestGameState: gameState};
  } else {
    let possibleMoves = computePossibleMoves(gameState);
    if (possibleMoves.length == 0) {
      return {winner: '', depth: 0, nextBestGameState: gameState};
    }
    return possibleMoves.map(evaluateGameState).reduce(getBestMove)
  }
}

function evaluateGameState(gameState) {
  let evaluatedPosition = computeMove(gameState);
  return {
    winner: evaluatedPosition.winner,
    depth: evaluatedPosition.depth += 1,
    nextBestGameState: gameState,
  };
}

function getBestMove(bestMoveFound, possibleMove) {
  return numericValue(possibleMove) > numericValue(bestMoveFound)
      ? possibleMove : bestMoveFound;
}

function numericValue(evaluatedState) {
  let currentPlayer = determineTurn(evaluatedState.nextBestGameState);
  let otherPlayer = currentPlayer === 'X' ? 'O' : 'X';
  if (evaluatedState.winner == otherPlayer) {
    return 20 - evaluatedState.depth;
  } else if (evaluatedState.winner == currentPlayer) {
    return -10 + evaluatedState.depth;
  } else {
    return evaluatedState.depth;
  }
}

function computePossibleMoves(gameState) {
  let player = determineTurn(gameState);

  let possibleStates = [];
  for(let i = 0;i < gameState.length;i++) {
    if (gameState[i] === '') {
      let possibleState = gameState.slice();
      possibleState[i] = player;
      possibleStates.push(possibleState);
    }
  }
  return possibleStates;
}

function determineTurn(gameState) {
  let numberOfXs = countOccurenceOfElement(gameState, 'X');
  let numberOfOs = countOccurenceOfElement(gameState, 'O');

  return numberOfOs === numberOfXs ? 'X' : 'O';
}

function countOccurenceOfElement(elements, element) {
  return elements.filter(square => square === element).length
}

function determineWinner(gameState) {
  // Check vertical wins
  for (let i = 0;i < 3;i++) {
    if (gameState[i] === gameState[i + 3]
      && gameState[i + 3] === gameState[i + 6]
      && gameState[i + 6] !== '') {
      return gameState[i];
    }
  }

  // Check horizontal wins
  for (let i = 0;i < 9;i += 3) {
    if (gameState[i] === gameState[i + 1]
      && gameState[i + 1] === gameState[i + 2]
      && gameState[i + 2] !== '') {
      return gameState[i];
    }
  }

  // Check cross wins
  if (gameState[0] === gameState[4]
    && gameState[4] === gameState[8]
    && gameState[8] !== '') {
    return gameState[0];
  }
  if (gameState[2] === gameState[4]
    && gameState[4] === gameState[6]
    && gameState[6] !== '') {
    return gameState[2];
  }
}

module.exports = {
   determineTurn,
   computePossibleMoves,
   determineWinner,
   computeMove,
}