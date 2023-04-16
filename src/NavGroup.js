import React from "react";
import { Stack, useTheme, Grid, Button, Typography } from "@mui/material";

const NavGroup = ({ headerText, buttons, onNavigate }) => {
  const theme = useTheme();

  const gridButtons = buttons.map((button) => {
    return (
      <Grid key={button.key} item xs={3}>
        <Button
          variant="contained"
          sx={{
            width: 91,
            color: theme.palette.primary.dark,
            fontSize: "12px",
            backgroundColor: "white",
            ":hover": {
              color: "white",
            },
          }}
          onClick={() => onNavigate(button.location)}
        >
          {button.text}
        </Button>
      </Grid>
    );
  });
  return (
    <Stack alignItems="center" spacing={2} m={2}>
      <Typography color={theme.palette.primary.dark} variant="h6">
        {headerText}
      </Typography>
      <Grid container spacing={1}>
        {gridButtons}
      </Grid>
    </Stack>
  );
};

export default NavGroup;
