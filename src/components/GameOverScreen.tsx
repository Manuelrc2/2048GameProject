import { Box, Card, CardContent, Grid2, Typography } from "@mui/material";
import { FC } from "react";

const GameOverScreen: FC = () => {
  return (
    <Card
      sx={{
        top: "33.5vh",
        width: "43.5vh",
        height: "43.5vh",
        position: "absolute",
        zIndex: 1,
        backgroundColor: "rgb(236, 112, 99, 0.9)",
        borderRadius: "1vh",
      }}
    >
      <CardContent>
        <Grid2
          container
          justifyContent="center"
          alignItems="center"
          height="35vh"
        >
          <Typography>GAME OVER</Typography>
        </Grid2>
      </CardContent>
    </Card>
  );
};

export default GameOverScreen;
