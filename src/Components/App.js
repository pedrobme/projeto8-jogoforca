import react from "react";
import alphabetObjList from "../utils/Alphabet";
import wordsDatastore from "../utils/words";
import GameAndInput from "./GameAndInput";
import InitialScreen from "./InitialScreen";
import Keyboard from "./Keyboard";
import styled from "styled-components";

export default App;

function App() {
  const [showInitialScreen, setShowInitialScreen] = react.useState(true);

  const [numberOfWrongGuesses, setnumberOfWrongGuesses] = react.useState(0);
  const [rightGuessesIndexs, setRightGuessesIndexs] = react.useState([]);

  const [originalAnswer, setoriginalAnswer] = react.useState("");
  const [splittedNormalizedAnswer, setsplittedNormalizedAnswer] =
    react.useState([]);

  const [lettersObjectList, setlettersObjectList] = react.useState(
    alphabetObjList()
  );

  const [gameWon, setGameWon] = react.useState(false);
  const [gameLost, setGameLost] = react.useState(false);

  const [guessAttemptInputValue, setGuessAttemptInputValue] =
    react.useState("");

  const [hintEnabled, setHintEnabled] = react.useState(false);
  const [hintAvaibled, setHintAvaibled] = react.useState(true);
  const [counter, setCounter] = react.useState("");

  react.useEffect(() => {
    let myInterval = null;

    if (!hintEnabled) {
      myInterval = setInterval(() => {
        setCounter((prevCounter) => prevCounter - 1);
      }, 1000);
    } else {
      clearInterval(myInterval);
    }

    return () => clearInterval(myInterval);
  }, [!hintEnabled]);

  const wrongGuessesImages = [
    "/assets/forca0.png",
    "/assets/forca1.png",
    "/assets/forca2.png",
    "/assets/forca3.png",
    "/assets/forca4.png",
    "/assets/forca5.png",
    "/assets/forca6.png",
  ];

  function firstStartGame() {
    setShowInitialScreen(false);
    startGame();
  }

  function startGame() {
    resetParametersToDefault();
    const APIWord = getRandomAPIWord();

    const normalizedAPIWord = normalizeWord(APIWord);

    const splittedArrayAPIWord = normalizedAPIWord.split("");

    setsplittedNormalizedAnswer(splittedArrayAPIWord);

    enableKeyboard();
  }

  function getRandomAPIWord() {
    const wordsList = wordsDatastore;

    const randomWord = wordsList[Math.floor(Math.random() * wordsList.length)];
    setoriginalAnswer(randomWord);
    return randomWord;
  }

  function normalizeWord(str) {
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

      const isCEspecial = currentLetter === "ç";

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
      } else if (isCEspecial) {
        newStr += "c";
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

  function guessingTurn(choosenLetter) {
    console.log(choosenLetter);
    const newlettersObjectList = [...lettersObjectList];
    newlettersObjectList[choosenLetter.index].clickable = false;
    setlettersObjectList(newlettersObjectList);

    const letterGuessAttempt = choosenLetter.letter.toLowerCase();
    const rightGuess = splittedNormalizedAnswer.includes(letterGuessAttempt);

    if (rightGuess) {
      const newRightIndexs = [];
      splittedNormalizedAnswer.forEach((AnsLetter, index) => {
        if (AnsLetter === letterGuessAttempt) {
          newRightIndexs.push(index);
        }
      });

      const newRightGuessesIndexs = rightGuessesIndexs.concat(newRightIndexs);
      setRightGuessesIndexs(newRightGuessesIndexs);

      const isGameWon =
        newRightGuessesIndexs.length === splittedNormalizedAnswer.length;
      if (isGameWon) {
        setGameWon(true);
      }
    } else {
      const newNumberWrongGuesses = numberOfWrongGuesses + 1;
      setnumberOfWrongGuesses(newNumberWrongGuesses);

      const isGameLost = newNumberWrongGuesses === 6;
      if (isGameLost) {
        setGameLost(true);
      }
    }
  }

  function gameWonScreen() {
    disableKeyboard();
    return <GameWonAnswer>{originalAnswer}</GameWonAnswer>;
  }

  function gameLostScreen() {
    disableKeyboard();
    setnumberOfWrongGuesses(6);
    return <GameLostAnswer>{originalAnswer}</GameLostAnswer>;
  }

  function submitGuessAttempt() {
    const normalizedGuessAttempt = normalizeWord(guessAttemptInputValue);
    const normalizedAnswer = normalizeWord(originalAnswer);

    console.log(normalizedAnswer);
    console.log(normalizedGuessAttempt);
    let allLettersEqual = true;

    if (normalizedGuessAttempt.length === normalizedAnswer.length) {
      for (let i = 0; i < normalizedAnswer.length; i++) {
        if (!(normalizedAnswer[i] === normalizedGuessAttempt[i])) {
          allLettersEqual = false;
          console.log("entrou");
          break;
        }
      }
    } else allLettersEqual = false;

    allLettersEqual ? setGameWon(true) : setGameLost(true);
    setGuessAttemptInputValue("");
  }

  function resetParametersToDefault() {
    setnumberOfWrongGuesses(0);
    setRightGuessesIndexs([]);
    setsplittedNormalizedAnswer([]);
    setGameLost(false);
    setGameWon(false);
    setGuessAttemptInputValue("");
    setHintEnabled(false);
    setHintAvaibled(true);
    setCounter(30);
  }

  function ShowGuess() {
    if (gameLost) {
      return gameLostScreen();
    } else if (gameWon) {
      return gameWonScreen();
    } else {
      return splittedNormalizedAnswer.map((item, i) =>
        rightGuessesIndexs.includes(i) ? (
          <li key={i}>{originalAnswer[i]}</li>
        ) : (
          <li key={i}>{"_"}</li>
        )
      );
    }
  }

  function HintHandler() {
    if (counter === 0) {
      setHintEnabled(true);
    }

    if (gameLost === true || gameWon === true) {
      return <></>;
    }

    if (hintAvaibled === false) {
      return (
        <div onClick={getHint} className="hint disabled-hint">
          <ion-icon class="hint-ionicon" name="bulb-outline"></ion-icon>
          <br></br>
          <p>DICA</p>
        </div>
      );
    }

    return hintEnabled ? (
      <div onClick={getHint} className="hint">
        <ion-icon class="hint-ionicon" name="bulb-outline"></ion-icon>
        <br></br>
        <p>DICA</p>
      </div>
    ) : (
      <p>Dica estará disponível em {counter} segundos.</p>
    );
  }

  function getHint() {
    const remainingLetters = splittedNormalizedAnswer.filter(
      (item, index) => !rightGuessesIndexs.includes(index)
    );
    console.log(remainingLetters);

    const randomRemainingLetter =
      remainingLetters[Math.floor(Math.random() * remainingLetters.length)];

    console.log(randomRemainingLetter);

    const hintLetterObject = lettersObjectList.filter(
      (letterObject) =>
        letterObject.letter.toLocaleLowerCase() === randomRemainingLetter
    );

    guessingTurn(hintLetterObject[0]);
    setHintAvaibled(false);
  }

  return showInitialScreen ? (
    <InitialScreen firstStartGame={firstStartGame} />
  ) : (
    <AppDiv>
      <GameAndInput
        gameWon={gameWon}
        gameLost={gameLost}
        guessAttemptInputValue={guessAttemptInputValue}
        setGuessAttemptInputValue={setGuessAttemptInputValue}
        submitGuessAttempt={submitGuessAttempt}
        wrongGuessesImages={wrongGuessesImages}
        numberOfWrongGuesses={numberOfWrongGuesses}
        startGame={startGame}
      />
      <GuessAndHintDiv>
        <GuessUl data-identifier="word">
          <ShowGuess />
        </GuessUl>
        <HintHandler />
      </GuessAndHintDiv>
      <Keyboard
        guessingTurn={guessingTurn}
        lettersObjectList={lettersObjectList}
      />
    </AppDiv>
  );
}

// Styled Components
const AppDiv = styled.div`
  width: 80vw;
  margin: auto;
`;

const GuessAndHintDiv = styled.div`
  display: flex;

  justify-content: space-around;
  align-items: center;
`;

const GuessUl = styled.ul`
  display: flex;
  margin-block: 30px;

  > * {
    font-size: 30px;
    margin-inline: 5px;
  }
`;

const GameLostAnswer = styled.li`
  font-weight: bold;
  color: red;
`;

const GameWonAnswer = styled.li`
  font-weight: bold;
  color: green;
`;
