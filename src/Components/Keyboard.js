export default Keyboard;

function Keyboard(props) {
  const { lettersObjectList, guessingTurn } = props;

  return (
    <ul className="keyboard">
      {lettersObjectList.map((item) =>
        item.clickable ? (
          <li className="letter" onClick={() => guessingTurn(item)}>
            {item.letter}
          </li>
        ) : (
          <li className="letter disabled-div">{item.letter}</li>
        )
      )}
    </ul>
  );
}
