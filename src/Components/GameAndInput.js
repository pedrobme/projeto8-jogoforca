import GuessAttemptDiv from "./Guess";

export default GameAndInput

function GameAndInput(props) {
    const {
        gameWon,
        gameLost,
        guessAttemptInputValue,
        setGuessAttemptInputValue,
        submitGuessAttempt,
        wrongGuessesImages,
        numberOfWrongGuesses,
        startGame
      } = props;
      
  return (
    <div className="main-content">
      <img src={wrongGuessesImages[numberOfWrongGuesses]} />
      <div className="sidebar">
        <button onClick={startGame}>Nova Palavra</button>
        <GuessAttemptDiv
          gameWon={gameWon}
          gameLost={gameLost}
          guessAttemptInputValue={guessAttemptInputValue}
          setGuessAttemptInputValue={setGuessAttemptInputValue}
          submitGuessAttempt={submitGuessAttempt}
        />
      </div>
    </div>
  );
}
