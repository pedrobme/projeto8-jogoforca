import GuessAttemptDiv from "./Guess";
import styled from "styled-components";

export default GameAndInput;

function GameAndInput(props) {
  const {
    gameWon,
    gameLost,
    guessAttemptInputValue,
    setGuessAttemptInputValue,
    submitGuessAttempt,
    wrongGuessesImages,
    numberOfWrongGuesses,
    startGame,
  } = props;

  return (
    <MainContentDiv>
      <ImgStyled data-identifier="game-image" src={wrongGuessesImages[numberOfWrongGuesses]} />
      <SidebarDiv>
        <ButtonStyled data-identifier="choose-word" onClick={startGame}>Nova Palavra</ButtonStyled>
        <GuessAttemptDiv
          gameWon={gameWon}
          gameLost={gameLost}
          guessAttemptInputValue={guessAttemptInputValue}
          setGuessAttemptInputValue={setGuessAttemptInputValue}
          submitGuessAttempt={submitGuessAttempt}
        />
      </SidebarDiv>
    </MainContentDiv>
  );
}

// Styled Components
const MainContentDiv = styled.div`
  display: flex;
  justify-content: space-around;
`;

const ImgStyled = styled.img`
  width: 350px;
`;

const SidebarDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

const ButtonStyled = styled.button`
  margin-top: 50px;

  width: 200px;
  height: 50px;

  color: white;
  background-color: black;
  font-weight: bold;

  font-size: 16px;

  border-radius: 5px;
  border: none;

  cursor: pointer;

  &:hover{
    background-color: rgba(0, 0, 0, 0.418);
  }
`;
