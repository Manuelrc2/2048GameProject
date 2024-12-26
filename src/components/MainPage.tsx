import { Button, Grid2, Typography } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Board from "./Board";
import Counter from "./Counter";
import { CellType } from "./Cell";
import {
  addRandomCell,
  getColumns,
  hasBoardChanged,
  getMovedRowAndScoreIncrement,
  checkIfGameIsOver,
} from "../utils";
import GameOverScreen from "./GameOverScreen";

export enum Key {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

const DIMENSIONS = 3;
const MainPage: FC = () => {
  const [board, setBoard] = useState<CellType[][]>([]);
  const [keyPressed, setKeyPressed] = useState<Key>();
  const [counter, setCounter] = useState<number>(0);
  const [resetClicked, setResetClicked] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  useEffect(() => {
    const initiateBoard = () => {
      const structureArray = Array.from({ length: DIMENSIONS }, () =>
        Array(DIMENSIONS).fill(0)
      );
      const initialBoard = structureArray.map((row, rowIndex) =>
        row.map((cell, columnIndex) => ({
          value: 0,
          position: { row: rowIndex, column: columnIndex },
          hasBeenAdded: false,
        }))
      );
      new Array(2)
        .fill(0)
        .forEach((e) => addRandomCell(initialBoard, DIMENSIONS));
      setBoard(initialBoard);
      setCounter(0);
      setGameOver(false);
      setResetClicked(false);
    };
    resetClicked && initiateBoard();
  }, [resetClicked]);
  useEffect(() => {
    function handleKeyPressed(this: Window, event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowUp":
        case "w":
          setKeyPressed(Key.UP);
          break;
        case "ArrowDown":
        case "s":
          setKeyPressed(Key.DOWN);
          break;
        case "ArrowLeft":
        case "a":
          setKeyPressed(Key.LEFT);
          break;
        case "ArrowRight":
        case "d":
          setKeyPressed(Key.RIGHT);
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", handleKeyPressed);
    return () => {
      window.removeEventListener("keydown", handleKeyPressed);
    };
  }, []);

  useEffect(() => {
    const moveBoard = (prevBoard: CellType[][]) => {
      let newBoard: CellType[][] = [];
      let totalScoreIncrement = 0;
      if (keyPressed === Key.UP) {
        const invertedBoard = getColumns(prevBoard);
        const movedInvertedBoard = invertedBoard.map((row) => {
          const { movedRow, scoreIncrement } =
            getMovedRowAndScoreIncrement(row);
          totalScoreIncrement += scoreIncrement;
          return row.map((cell, index) => ({
            ...cell,
            value: movedRow[index],
          }));
        });
        newBoard = getColumns(movedInvertedBoard);
      } else if (keyPressed === Key.RIGHT) {
        newBoard = prevBoard.map((row) => {
          const { movedRow, scoreIncrement } = getMovedRowAndScoreIncrement(
            row,
            true
          );
          totalScoreIncrement += scoreIncrement;
          return row.map((cell, index) => ({
            ...cell,
            value: movedRow[index],
          }));
        });
      } else if (keyPressed === Key.DOWN) {
        const invertedBoard = getColumns(prevBoard);
        const movedInvertedBoard = invertedBoard.map((row) => {
          const { movedRow, scoreIncrement } = getMovedRowAndScoreIncrement(
            row,
            true
          );
          totalScoreIncrement += scoreIncrement;
          return row.map((cell, index) => ({
            ...cell,
            value: movedRow[index],
          }));
        });
        newBoard = getColumns(movedInvertedBoard);
      } else if (keyPressed === Key.LEFT) {
        newBoard = prevBoard.map((row) => {
          const { movedRow, scoreIncrement } =
            getMovedRowAndScoreIncrement(row);
          totalScoreIncrement += scoreIncrement;
          return row.map((cell, index) => ({
            ...cell,
            value: movedRow[index],
          }));
        });
      }
      hasBoardChanged(prevBoard, newBoard) &&
        addRandomCell(newBoard, DIMENSIONS);
      setCounter((prevState) => prevState + totalScoreIncrement);
      return newBoard;
    };
    keyPressed && setBoard((prevState) => moveBoard(prevState));
    setKeyPressed(undefined);
  }, [keyPressed]);

  useEffect(() => {
    board.length > 0 && checkIfGameIsOver(board) && setGameOver(true);
  }, [board]);

  return (
    <Grid2
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      spacing={2}
    >
      <Typography>{gameOver && "GAME OVER"}</Typography>
      <Counter counter={counter} />
      <Board board={board} />
      {gameOver && <GameOverScreen />}
      <Button
        sx={{
          boxShadow: 5,
          width: "20vh",
          color: "white",
          backgroundColor: "#cd6155",
        }}
        onClick={() => setResetClicked(true)}
      >
        RESET
      </Button>
    </Grid2>
  );
};

export default MainPage;
