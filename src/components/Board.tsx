import { Grid2 } from "@mui/material";
import { FC, useEffect, useState } from "react";
import Cell, { CellType } from "./Cell";
import { Key } from "./MainPage";

type BoardProps = {
  board: CellType[][];
};

const Board: FC<BoardProps> = ({ board }) => {
  return (
    <Grid2
      container
      direction="column"
      spacing={1}
      borderRadius="1vh"
      padding={1}
      sx={{ background: "grey" }}
    >
      {board.map((row, i) => (
        <Grid2 key={i} container spacing={1}>
          {row.map((cell, j) => (
            <Cell key={j} cell={cell} />
          ))}
        </Grid2>
      ))}
    </Grid2>
  );
};

export default Board;
