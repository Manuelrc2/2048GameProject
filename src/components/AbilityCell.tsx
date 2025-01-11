import { Button, Tooltip, Typography } from "@mui/material";
import { FC } from "react";
import { CellType } from "./Cell";
import { AbilityActionParamsType } from "../Abilities";

export type BoardStateType = [
  board: CellType[][],
  setBoard: React.Dispatch<React.SetStateAction<CellType[][]>>
];
export type Ability = {
  imageUrl: string;
  info: string;
  cost: number;
  action: (params: AbilityActionParamsType) => void;
};
type AbilityCellProp = {
  ability: Ability;
  setAbilitiesUsedCount: React.Dispatch<React.SetStateAction<number>>;
} & AbilityActionParamsType;

const AbilityCell: FC<AbilityCellProp> = ({
  ability: { action, imageUrl, info, cost },
  boardState,
  registerNewHistoryEntry,
  setAbilitiesUsedCount,
}) => {
  return (
    <Tooltip
      title={
        <>
          <Typography>{info}</Typography>
          <Typography>Cost: {cost}</Typography>
        </>
      }
      placement="right"
    >
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
        onClick={() => {
          action({
            boardState,
            registerNewHistoryEntry,
          });
          setAbilitiesUsedCount((prevState) => prevState + cost);
        }}
      ></Button>
    </Tooltip>
  );
};

export default AbilityCell;
