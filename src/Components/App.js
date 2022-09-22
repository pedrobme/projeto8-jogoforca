import react from "react";
import alphabetObjList from "../utils/Alphabet";

export default App;

function App() {
  const [numberOfWrongGuesses, setnumberOfWrongGuesses] = react.useState(0);
  const [rightGuessesIndexs, setRightGuessesIndexs] = react.useState([]);
  const [wordAnswer, setWordAnswer] = react.useState([]);
  const [lettersList, setLettersList] = react.useState(alphabetObjList());

  let currentWord;

  const wrongGuesses = [
    "/assets/forca0.png",
    "/assets/forca1.png",
    "/assets/forca2.png",
    "/assets/forca3.png",
    "/assets/forca4.png",
    "/assets/forca5.png",
    "/assets/forca6.png",
  ];

  function getRandomAPIWord() {
    currentWord = "StringTêsté";
  }

  function startGame() {
    getRandomAPIWord();
    const APIWord = currentWord;

    const normalizedAPIWord = normalizeAPIWord(APIWord);

    const splittedArrayAPIWord = normalizedAPIWord.split("");

    setWordAnswer(splittedArrayAPIWord);
    console.log(splittedArrayAPIWord);

    enableKeyboard();
  }

  function normalizeAPIWord(str) {
    str = str.toLowerCase();
    let newStr = "";

    for (let i = 0; i < str.length; i++) {
      let currentLetter = str[i];

      const isAEspecial =
        currentLetter === "á" ||
        currentLetter === "à" ||
        currentLetter === "â" ||
        currentLetter === "ã";

      const isEEspecial = currentLetter === "é" || currentLetter === "ê";

      const isIEspecial = currentLetter === "í";

      const isOEspecial = currentLetter === "ó" || currentLetter === "ô";

      const isUEspecial = currentLetter === "ú";

      console.log(isEEspecial);
      if (isAEspecial) {
        newStr += "a";
      } else if (isEEspecial) {
        newStr += "e";
      } else if (isIEspecial) {
        newStr += "i";
      } else if (isOEspecial) {
        newStr += "o";
      } else if (isUEspecial) {
        newStr += "u";
      } else {
        newStr += currentLetter;
      }
    }
    return newStr;
  }

  function enableKeyboard() {
    lettersList.forEach((letter) => (letter.clickable = true));
  }

  function disableKeyboard() {
    lettersList.forEach((letter) => (letter.clickable = false));
  }

  function Keyboard() {
    return (
      <ul className="keyboard">
        {lettersList.map((item) => (
          <Letter
            key={item.key}
            index={item.key}
            letter={item.letter}
            clickable={item.clickable}
          />
        ))}
      </ul>
    );
  }

  function Letter(props) {
    const [isCLickable, setClickable] = react.useState(props.clickable);

    function checkLetter() {
      const newLettersList = [...lettersList];
      newLettersList[props.index].clickable = false;
      setLettersList(newLettersList);

      console.log(lettersList);
      const rightGuess = wordAnswer.includes(props.letter.toLowerCase());

      if (rightGuess) {
        const newRightIndexs = [];
        wordAnswer.forEach((item, index) => {
          if (item === props.letter.toLowerCase()) {
            newRightIndexs.push(index);
          }
        });
        setRightGuessesIndexs(rightGuessesIndexs.concat(newRightIndexs));
      }

      console.log(rightGuessesIndexs);
      setClickable(false);
    }

    return isCLickable ? (
      <li className="letter" onClick={checkLetter}>
        {props.letter}
      </li>
    ) : (
      <li className="letter disabled-letter">{props.letter}</li>
    );
  }

  return (
    <>
      <div className="main-content">
        <img src={wrongGuesses[numberOfWrongGuesses]} />
        <div className="guessing-board">
          <button onClick={startGame}>Escolher Palavra</button>
          <ul className="guess">
            {wordAnswer.map((item, i) =>
              rightGuessesIndexs.includes(i) ? (
                <li>{wordAnswer[i]}</li>
              ) : (
                <li>{"_"}</li>
              )
            )}
          </ul>
        </div>
      </div>
      <Keyboard />
    </>
  );
}
