import styled from "styled-components";

export default InitialScreen;


function InitialScreen(props) {
  return (
    <>
      <GameTittle>HANGMAN GAME</GameTittle>
      <NewGameDiv data-identifier="choose-word" onClick={() => props.firstStartGame()}>
        {[
          <u key="n">N</u>,
          <u key="e1">E</u>,
          <u key="w">W</u>,
          <u key="space"></u>,
          <u key="g">G</u>,
          <u key="a">A</u>,
          <u key="m">M</u>,
          <u key="e2">E</u>,
        ].map((item) => item)}
      </NewGameDiv>
    </>
  );
}

const GameTittle = styled.h1`
  padding-top: 100px;
  font-size: 100px;
  font-family: "Nabla", cursive;

  text-align: center;
`;

const NewGameDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  margin: auto;

  margin-top: 200px;

  > *{
    font-size: 30px;
    margin-inline:5px;
  }

  &:hover{
    color:gray;
  }
`;
