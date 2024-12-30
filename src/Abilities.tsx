import { AbilityActionParam, Ability } from "./components/AbilityCell";
import { CellType } from "./components/Cell";

const shuffle = ([board, setBoard]: AbilityActionParam) => {
  const boardCopy = board.map((row) => row.map((cell) => ({ ...cell })));
  const boardValues: number[] = [];
  boardCopy.forEach((row) =>
    row.forEach((cell) => boardValues.push(cell.value))
  );
  boardValues.sort(() => Math.random() - 0.5);
  boardValues.forEach(
    (value, index) =>
      (boardCopy[Math.floor(index / board.length)][index % board.length].value =
        value)
  );
  setBoard(boardCopy);
};
export const abilities: Ability[] = [
  {
    imageUrl: "./AbilitiesLogos/shuffle.png",
    altText: "shuffle",
    action: shuffle,
  },
];
