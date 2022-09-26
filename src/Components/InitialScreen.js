export default InitialScreen;

function InitialScreen(props) {
  return (
    <>
      <h1 className="game-title">HANGMAN GAME</h1>
      <div onClick={() => props.firstStartGame()} className="newgame">
        {[
          <u>N</u>,
          <u>E</u>,
          <u>W</u>,
          <u></u>,
          <u>G</u>,
          <u>A</u>,
          <u>M</u>,
          <u>E</u>,
        ].map((item) => item)}
      </div>
    </>
  );
}
