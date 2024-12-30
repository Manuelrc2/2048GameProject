import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import { FC } from "react";
import DimensionsRadioGroup from "./DimensionsRadioGroup";
import { DimensionsType } from "./MainPage";

type SettingsDialogProps = {
  open: boolean;
  onClose: () => void;
  dimensionsState: [
    DimensionsType,
    React.Dispatch<React.SetStateAction<DimensionsType>>
  ];
};

const SettingsDialog: FC<SettingsDialogProps> = ({
  open,
  onClose,
  dimensionsState,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography>Settings</Typography>
      </DialogTitle>
      <DialogContent>
        <DimensionsRadioGroup dimensionsState={dimensionsState} />
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
