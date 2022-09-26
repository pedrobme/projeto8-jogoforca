import styled from "styled-components";
export default Keyboard;

function Keyboard(props) {
  const { lettersObjectList, guessingTurn } = props;

  return (
    <KeyboardUl>
      {lettersObjectList.map((item, index) =>
        item.clickable ? (
          <LetterLi key={index}onClick={() => guessingTurn(item)}>
            {item.letter}
          </LetterLi>
        ) : (
          <LetterLi key={index} className="disabled-div">{item.letter}</LetterLi>
        )
      )}
    </KeyboardUl>
  );
}

const KeyboardUl = styled.ul`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 15px;

  width: 550px;
  margin: auto;
`;
const LetterLi = styled.li`
  width: 32px;
  height: 32px;

  background-color: rgb(133, 178, 216);

  font-weight: bold;
  color: rgb(11, 113, 197);

  display: flex;
  justify-content: center;
  align-items: center;

  margin: 5px;

  cursor: pointer;

  border-radius: 10px;

  &:hover{
    filter: brightness(120%);
  }
`;
