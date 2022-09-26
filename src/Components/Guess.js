import styled from "styled-components";
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
    return <EndGameMsgWIN>PARABENS!! VOCE ACERTOU!</EndGameMsgWIN>;
  } else if (gameLost) {
    return <EndGameMsgLoss>VOCE ERROU!! TENTE NOVAMENTE!</EndGameMsgLoss>;
  } else {
    return (
      <GuessAttemptDivStyled>
        <InputStyled
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
        ></InputStyled>
        <ion-icon
          class="send-ionicon"
          name="send"
          onClick={submitGuessAttempt}
        ></ion-icon>
      </GuessAttemptDivStyled>
    );
  }
}

// Styled Components

const EndGameMsgWIN = styled.p`
  font-weight: bold;
  color: green;
`;

const EndGameMsgLoss = styled.p`
  font-weight: bold;
  color: red;
`;

const GuessAttemptDivStyled = styled.div`
  display: flex;

  align-items: center;
`;

const InputStyled = styled.input`
  border-radius: 6px;
  width: 250px;
  height: 40px;

  margin-right: 10px;
`;

