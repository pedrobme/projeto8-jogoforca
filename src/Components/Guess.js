export default GuessAttemptDiv;

function GuessAttemptDiv(props) {
  const {
    gameWon,
    gameLost,
    guessAttemptInputValue,
    setGuessAttemptInputValue,
    submitGuessAttempt,
  } = props;

  if (gameWon) {
    return <p className="endGameMsg greenFont">PARABENS!! VOCE ACERTOU!</p>;
  } else if (gameLost) {
    return <p className="endGameMsg redFont">VOCE ERROU!! TENTE NOVAMENTE!</p>;
  } else {
    return (
      <div className="guess-attempt-div">
        <input
          autoFocus
          value={guessAttemptInputValue}
          name="guess-attempt"
          placeholder="Insira seu palpite"
          onChange={(event) => setGuessAttemptInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              submitGuessAttempt();
            }
          }}
        ></input>
        <ion-icon class="send-ionicon" name="send" onClick={submitGuessAttempt}></ion-icon>
      </div>
    );
  }
}
