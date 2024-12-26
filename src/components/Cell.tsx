import { Grid2 } from "@mui/material";
import { FC } from "react";

type Position = {
  row: number;
  column: number;
};

export type CellType = {
  value: number;
  position: Position;
  hasBeenAdded: boolean;
};

const Cell: FC<{ cell: CellType }> = ({ cell }) => {
  const getCellColour = () => {
    switch (cell.value) {
      case 0:
        return "lightgrey";
      case 2:
        return "#FFFAF0";
      case 4:
        return "#FFF8DC";
      case 8:
        return "#F4A460";
      case 16:
        return "#D2691E";
      case 32:
        return "#A52A2A";
      case 64:
        return "#B22222";
    }
  };
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      width="10vh"
      height="10vh"
      borderRadius="1vh"
      sx={{ background: getCellColour() }}
    >
      {cell.value === 0 ? "" : cell.value}
    </Grid2>
  );
};

export default Cell;
