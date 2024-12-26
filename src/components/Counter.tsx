import { Grid2 } from "@mui/material";
import { CellType } from "./Cell";
import { FC, useEffect, useState } from "react";

type CounterProps = {
  counter: number;
};
const Counter: FC<CounterProps> = ({ counter }) => {
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      width="20vh"
      height="10vh"
      sx={{ boxShadow: 5, backgroundColor: "#fcf3cf" }}
      borderRadius="1vh"
    >
      {counter}
    </Grid2>
  );
};

export default Counter;
