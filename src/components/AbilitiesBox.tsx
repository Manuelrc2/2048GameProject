import { Grid2 } from "@mui/material";
import { FC } from "react";
import AbilityCell, { BoardStateType } from "./AbilityCell";
import { abilities } from "../Abilities";
import { RegisterNewHistoryEntryFunction } from "./MainPage";

type AbilitiesBoxProps = {
  boardState: BoardStateType;
  registerNewHistoryEntry: RegisterNewHistoryEntryFunction;
  setAbilitiesUsedCount: React.Dispatch<React.SetStateAction<number>>;
};

const AbilitiesBox: FC<AbilitiesBoxProps> = ({
  boardState,
  registerNewHistoryEntry,
  setAbilitiesUsedCount,
}) => {
  return (
    <Grid2
      container
      justifyContent="center"
      height="45vh"
      width="12vh"
      borderRadius="1vh"
      padding={1}
      sx={{ backgroundColor: "lightgrey" }}
    >
      {abilities.map((ability) => (
        <AbilityCell
          ability={ability}
          boardState={boardState}
          registerNewHistoryEntry={registerNewHistoryEntry}
          setAbilitiesUsedCount={setAbilitiesUsedCount}
        />
      ))}
    </Grid2>
  );
};

export default AbilitiesBox;
