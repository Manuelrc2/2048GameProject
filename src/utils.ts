import { match } from "assert";
import { CellType } from "./components/Cell";

export const addRandomCell = (newBoard: CellType[][], DIMENSIONS: number) => {
  let randomCellAdded = false;
  while (!randomCellAdded) {
    let randomCell =
      newBoard[Math.floor(Math.random() * DIMENSIONS)][
        Math.floor(Math.random() * DIMENSIONS)
      ];
    if (randomCell.value === 0) {
      randomCell.value = Math.random() < 0.5 ? 2 : 4;
      randomCellAdded = true;
    }
  }
};

export const pairAndGetScoreIncrement = (rowValues: number[]) => {
  let rowScoreIncrement = 0;
  rowValues.forEach((cell, index) => {
    if (index !== rowValues.length - 1 && cell === rowValues[index + 1]) {
      const newCellValue = rowValues[index] * 2;
      rowValues[index] = newCellValue;
      rowScoreIncrement += newCellValue;
      rowValues.splice(index + 1, 1);
    }
  });
  return rowScoreIncrement;
};

export const getMovedRowAndScoreIncrement = (
  row: CellType[],
  reverse?: boolean
) => {
  const rowValues: number[] = [];
  row.forEach((cell) => cell.value !== 0 && rowValues.push(cell.value));
  const scoreIncrement = pairAndGetScoreIncrement(
    reverse ? rowValues.reverse() : rowValues
  );
  const zeroFilledArray = new Array(row.length - rowValues.length).fill(0);
  const movedRow: number[] = rowValues.concat(zeroFilledArray);
  return { movedRow: reverse ? movedRow.reverse() : movedRow, scoreIncrement };
};

export const getColumns = (board: CellType[][]) => {
  const invertedBoard: CellType[][] = Array.from(
    { length: board[0].length },
    () => new Array(board.length)
  );
  board.forEach((row, i) =>
    row.forEach((cell, j) => (invertedBoard[j][i] = { ...cell }))
  );
  return invertedBoard;
};

export const hasBoardChanged = (
  oldBoard: CellType[][],
  newBoard: CellType[][]
) => {
  const getBoardString = (board: CellType[][]) => {
    let boardString = "";
    board.forEach((row) => row.forEach((cell) => (boardString += cell.value)));
    return boardString;
  };
  let oldBoardString = getBoardString(oldBoard);
  let newBoardString = getBoardString(newBoard);
  return oldBoardString !== newBoardString;
};

export const checkIfGameIsOver = (board: CellType[][]) => {
  let matchesCount = 0;
  let zerosCount = 0;
  board.forEach((row, i) =>
    row.forEach((cell, j) => {
      if (j !== board.length - 1 && row[j + 1].value === cell.value) {
        matchesCount++;
      }
      if (i !== board.length - 1 && board[i + 1][j].value === cell.value) {
        matchesCount++;
      }
      cell.value === 0 && zerosCount++;
    })
  );
  return matchesCount === 0 && zerosCount === 0;
};
