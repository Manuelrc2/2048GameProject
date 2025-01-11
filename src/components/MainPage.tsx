import { Button, Grid2 } from "@mui/material";
import { FC, useCallback, useEffect, useState } from "react";
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
import SettingsIcon from "@mui/icons-material/Settings";
import SettingsDialog from "./SettingsDialog";
import UndoIcon from "@mui/icons-material/Undo";
import AbilitiesBox from "./AbilitiesBox";
import { Ability } from "./AbilityCell";

export enum Key {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}
export type DimensionsType = 4 | 5 | 6;
type BoardHistory = {
  board: string;
  score: number;
};
export type RegisterNewHistoryEntryFunction = (
  newBoard: CellType[][],
  newCount?: number
) => void;

const MainPage: FC = () => {
  const [dimensions, setDimensions] = useState<DimensionsType>(4);
  const [board, setBoard] = useState<CellType[][]>([]);
  const [boardHistory, setBoardHistory] = useState<BoardHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const [keyPressed, setKeyPressed] = useState<Key>();
  const [counter, setCounter] = useState<number>(0);
  const [boardCounter, setBoardCounter] = useState<number>(0);
  const [resetClicked, setResetClicked] = useState<boolean>(true);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [settingsDialogOpened, setSettingsDialogOpened] =
    useState<boolean>(false);
  const [undosCount, setUndosCount] = useState<number>(0);
  const [selectedAbilities, setSelectedAbilities] = useState<Ability[]>();
  const [abilitiesUsedCount, setAbilitiesUsedCount] = useState<number>(0);

  const registerNewHistoryEntry = useCallback(
    (newBoard: CellType[][], newCount: number = boardCounter) => {
      const newHistoryEntry = {
        board: JSON.stringify(newBoard),
        score: newCount,
      };
      setHistoryIndex((prevHistoryIndex) => {
        setBoardHistory((prevBoardHistory) => [
          ...prevBoardHistory.slice(0, prevHistoryIndex + 1),
          newHistoryEntry,
        ]);
        return prevHistoryIndex + 1;
      });
    },
    [boardCounter]
  );
  useEffect(() => {
    const initiateBoard = () => {
      const structureArray = Array.from({ length: dimensions }, () =>
        Array(dimensions).fill(0)
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
        .forEach((e) => addRandomCell(initialBoard, dimensions));
      setBoard(initialBoard);
      setCounter(0);
      setBoardCounter(0);
      setBoardHistory([{ board: JSON.stringify(initialBoard), score: 0 }]);
      setHistoryIndex(0);
      setUndosCount(0);
      setGameOver(false);
      setResetClicked(false);
    };
    (resetClicked || dimensions) && initiateBoard();
  }, [resetClicked, dimensions]);
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
      if (hasBoardChanged(prevBoard, newBoard)) {
        addRandomCell(newBoard, dimensions);
        setBoardCounter((prevCount) => {
          const newCount = prevCount + totalScoreIncrement;
          registerNewHistoryEntry(newBoard, newCount);
          return newCount;
        });
      }
      return newBoard;
    };
    keyPressed && setBoard((prevState) => moveBoard(prevState));
    setKeyPressed(undefined);
  }, [keyPressed, dimensions, registerNewHistoryEntry]);

  useEffect(() => {
    board.length > 0 && checkIfGameIsOver(board) && setGameOver(true);
  }, [board]);
  useEffect(() => {
    setCounter(boardCounter - undosCount * 100 - abilitiesUsedCount);
  }, [boardCounter, undosCount, abilitiesUsedCount]);

  return (
    <Grid2
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      spacing={4}
    >
      <Grid2
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        spacing={2}
      >
        <Button onClick={() => setSettingsDialogOpened(true)}>
          <SettingsIcon sx={{ color: "#454545" }} />
        </Button>
        <SettingsDialog
          open={settingsDialogOpened}
          onClose={() => setSettingsDialogOpened(false)}
          dimensionsState={[dimensions, setDimensions]}
        />
      </Grid2>
      <Grid2
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        spacing={2}
      >
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
      <Grid2
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        spacing={2}
      >
        <Button
          disabled={historyIndex === 0}
          onClick={() => {
            setHistoryIndex((prevHistoryIndex) => {
              const previousBoard = boardHistory[prevHistoryIndex - 1];
              setBoard(JSON.parse(previousBoard.board));
              setBoardCounter(previousBoard.score);
              return prevHistoryIndex - 1;
            });
            setUndosCount((prevState) => prevState + 1);
          }}
          sx={{ height: "10vh" }}
        >
          <UndoIcon sx={{ color: "#454545" }} />
        </Button>
        <AbilitiesBox
          boardState={[board, setBoard]}
          registerNewHistoryEntry={registerNewHistoryEntry}
          setAbilitiesUsedCount={setAbilitiesUsedCount}
        />
        <Button>MORE</Button>
      </Grid2>
    </Grid2>
  );
};

export default MainPage;
