export default alphabetObjList;

function alphabetObjList() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  const alphabetObjList = alphabet.map((item,i) => {
    return { key:i, index:i, letter: item , clickable: false };
  });
  return alphabetObjList;
}
