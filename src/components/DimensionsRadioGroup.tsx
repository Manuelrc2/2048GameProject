import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { FC } from "react";
import { DimensionsType } from "./MainPage";

type DimensionsRadioGroupProps = {
  dimensionsState: [
    DimensionsType,
    React.Dispatch<React.SetStateAction<DimensionsType>>
  ];
};

const DimensionsRadioGroup: FC<DimensionsRadioGroupProps> = ({
  dimensionsState: [dimensions, setDimensions],
}) => {
  return (
    <FormControl>
      <FormLabel id="dimensionsradio-buttons-group-label">Dimensions</FormLabel>
      <RadioGroup
        row
        value={dimensions}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setDimensions(Number(event.target.value) as DimensionsType)
        }
      >
        <FormControlLabel
          value="4"
          control={<Radio color="default" />}
          label="4"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="5"
          control={<Radio color="default" />}
          label="5"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="6"
          control={<Radio color="default" />}
          label="6"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default DimensionsRadioGroup;
