import { Box, Stack, Typography, useTheme } from "@mui/material";

function Header() {
    const theme = useTheme();
  return (
    <Box id="header" sx={{
        p: 1,
        backgroundColor: theme.palette.primary.dark,
        height: '10vh'
      }}>
        <Stack alignItems="center">
            <Typography variant="h4" sx={{color: 'secondary.light'}}>
            The Scriptures Mapped
            </Typography>
            <Typography variant="subtitle1" sx={{color: 'secondary.light'}}>
            By Zachary Barton
            </Typography>
        </Stack>
    </Box>
  );
}

export default Header;
