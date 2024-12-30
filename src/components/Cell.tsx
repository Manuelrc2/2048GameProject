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
  const getCellColor = () => {
    switch (cell.value) {
      case 0:
        return "lightgrey";
      case 2:
        return "#FFFAF0";
      case 4:
        return "#FFF8DC";
      case 8:
        return "#FFCA9E";
      case 16:
        return "#ffac67";
      // return "#D2691E";
      case 32:
        return "#EC8632";
      case 64:
        return "#ff4a22";
      case 128:
        return "#bf2f0f";
    }
  };
  // function getCellColor() {
  //   // Define the start and end colors in RGB
  //   const startColor = [255, 255, 224]; // Light yellow (almost white)
  //   const endColor = [0, 0, 0]; // Black

  //   // Calculate the level of the cell (number of divisions by 2 to get 1)
  //   const level = Math.log2(cell.value);

  //   // Calculate the maximum level (log2(131072))
  //   const maxLevel = Math.log2(131072);

  //   // Interpolate between the start and end colors
  //   const interpolate = (start: number, end: number, factor: number) =>
  //     Math.round(start + (end - start) * factor);
  //   const factor = level / maxLevel;
  //   const r = interpolate(startColor[0], endColor[0], factor);
  //   const g = interpolate(startColor[1], endColor[1], factor);
  //   const b = interpolate(startColor[2], endColor[2], factor);

  //   // Convert RGB to hex
  //   const toHex = (n: number) => n.toString(16).padStart(2, "0");
  //   return cell.value === 0
  //     ? "lightgrey"
  //     : `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  // }
  return (
    <Grid2
      container
      justifyContent="center"
      alignItems="center"
      width="10vh"
      height="10vh"
      borderRadius="1vh"
      sx={{ background: getCellColor() }}
    >
      {cell.value === 0 ? "" : cell.value}
    </Grid2>
  );
};

export default Cell;
