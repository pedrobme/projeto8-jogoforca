import react from "react";
import alphabetObjList from "../utils/Alphabet";
import wordsDatastore from "../utils/words";

export default App;

function App() {
  console.log("passou aqui");
  const [numberOfWrongGuesses, setnumberOfWrongGuesses] = react.useState(0);
  const [rightGuessesIndexs, setRightGuessesIndexs] = react.useState([]);
  const [wordAnswer, setWordAnswer] = react.useState([]);
  const [lettersObjectList, setlettersObjectList] = react.useState(
    alphabetObjList()
  );

  const [answerDisplayScreen, setAnswerDisplayScreen] = react.useState("");

  const wrongGuessesImages = [
    "/assets/forca0.png",
    "/assets/forca1.png",
    "/assets/forca2.png",
    "/assets/forca3.png",
    "/assets/forca4.png",
    "/assets/forca5.png",
    "/assets/forca6.png",
  ];

  function getRandomAPIWord() {
    const wordsList = wordsDatastore;

    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setAnswerDisplayScreen(randomWord);
    return randomWord;
  }

  function startGame() {
    resetParametersToDefault();
    const APIWord = getRandomAPIWord();

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
    lettersObjectList.forEach((letter) => (letter.clickable = true));
  }

  function disableKeyboard() {
    lettersObjectList.forEach((letter) => (letter.clickable = false));
  }

  function Keyboard() {
    return (
      <ul className="keyboard">
        {lettersObjectList.map((item) => (
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
    const [isClickable, setClickable] = react.useState(props.clickable);

    function guessingTurn() {
      const newlettersObjectList = [...lettersObjectList];
      newlettersObjectList[props.index].clickable = false;
      setlettersObjectList(newlettersObjectList);
      setClickable(false);

      const rightGuess = wordAnswer.includes(props.letter.toLowerCase());

      if (rightGuess) {
        const newRightIndexs = [];
        wordAnswer.forEach((item, index) => {
          if (item === props.letter.toLowerCase()) {
            newRightIndexs.push(index);
          }
        });

        const newRightGuessesIndexs = rightGuessesIndexs.concat(newRightIndexs);
        setRightGuessesIndexs(newRightGuessesIndexs);

        const gameWon = newRightGuessesIndexs.length === wordAnswer.length;
        if (gameWon) {
          disableKeyboard();
        }
      } else {
        const newNumberWrongGuesses = numberOfWrongGuesses + 1;
        setnumberOfWrongGuesses(newNumberWrongGuesses);

        const gameLost = newNumberWrongGuesses === 6;
        if (gameLost) {
          disableKeyboard();
        }
      }
    }

    return isClickable ? (
      <li className="letter" onClick={guessingTurn}>
        {props.letter}
      </li>
    ) : (
      <li className="letter disabled-letter">{props.letter}</li>
    );
  }

  function ShowGuess() {
    if (numberOfWrongGuesses === 6) {
      return <li className="redFont">{answerDisplayScreen}</li>;
    } else if (rightGuessesIndexs.length === wordAnswer.length) {
      return <li className="greenFont">{answerDisplayScreen}</li>;
    } else {
      return wordAnswer.map((item, i) =>
        rightGuessesIndexs.includes(i) ? (
          <li>{answerDisplayScreen[i]}</li>
        ) : (
          <li>{"_"}</li>
        )
      );
    }
  }

  function resetParametersToDefault() {
    setnumberOfWrongGuesses(0);
    setRightGuessesIndexs([]);
    setWordAnswer([]);
  }

  return (
    <>
      <div className="main-content">
          <img src={wrongGuessesImages[numberOfWrongGuesses]} />
          <button onClick={startGame}>Escolher Palavra</button>
      </div>
      <ul className="guess">
        <ShowGuess />
      </ul>
      <Keyboard />
    </>
  );
}
