import { Grid2 } from "@mui/material";
import { FC } from "react";
import AbilityCell, { AbilityActionParam } from "./AbilityCell";
import { CellType } from "./Cell";
import { abilities } from "../Abilities";

type AbilitiesBoxProps = {
  boardState: AbilityActionParam;
};

const AbilitiesBox: FC<AbilitiesBoxProps> = ({ boardState }) => {
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
        <AbilityCell ability={ability} boardState={boardState} />
      ))}
    </Grid2>
  );
};

export default AbilitiesBox;
