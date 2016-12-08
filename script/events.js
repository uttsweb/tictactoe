function initGame() {
    ticTacToe.getUserInfo();
    ticTacToe.generateGameBoard();
    ticTacToe.selectSquare();
    ticTacToe.nextRound();
    ticTacToe.getFirstPlayer();
    ticTacToe.resetGame();
    ticTacToe.checkGameState();
}

document.getElementById("playbutton").addEventListener('click', initGame);
