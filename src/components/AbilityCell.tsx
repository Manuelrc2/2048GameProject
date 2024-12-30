import { Button, Grid2 } from "@mui/material";
import { FC } from "react";
import { CellType } from "./Cell";

export type AbilityActionParam = [
  board: CellType[][],
  setBoard: React.Dispatch<React.SetStateAction<CellType[][]>>
];
export type Ability = {
  imageUrl: string;
  altText: string;
  action: (boardState: AbilityActionParam) => void;
};
type AbilityCellProp = {
  ability: Ability;
  boardState: AbilityActionParam;
};

const AbilityCell: FC<AbilityCellProp> = ({
  ability: { action, imageUrl, altText },
  boardState,
}) => {
  return (
    <Button
      sx={{
        width: "10vh",
        height: "10vh",
        borderRadius: "1vh",
        backgroundColor: "white",
        backgroundImage: `url('${imageUrl}')`,
        backgroundPosition: "center",
        backgroundSize: "5vh",
        backgroundRepeat: "no-repeat",
        boxShadow: 2,
      }}
      onClick={() => action(boardState)}
    ></Button>
  );
};

export default AbilityCell;
