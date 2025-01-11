import { Ability, BoardStateType } from "./components/AbilityCell";
import { RegisterNewHistoryEntryFunction } from "./components/MainPage";

export type AbilityActionParamsType = {
  boardState: BoardStateType;
  registerNewHistoryEntry: RegisterNewHistoryEntryFunction;
};

const shuffle = ({
  boardState: [board, setBoard],
  registerNewHistoryEntry,
}: AbilityActionParamsType) => {
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
  registerNewHistoryEntry(boardCopy);
};

export const abilities: Ability[] = [
  {
    imageUrl: "./AbilitiesLogos/shuffle.png",
    info: "With the use of this ability you will shuffle the whole board randomly",
    cost: 100,
    action: shuffle,
  },
];
