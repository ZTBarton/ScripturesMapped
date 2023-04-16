import { Box, Stack, Typography, useTheme } from "@mui/material";
import BreadCrumbNav from "./BreadCrumbNav";

function Header({ currentLocation, navigateTo }) {
    const theme = useTheme();
  return (
    <Box id="header" sx={{
        p: 1,
        backgroundColor: theme.palette.primary.dark,
        height: '10vh'
      }}>
        <Stack direction="row" px={2} sx={{ height: '10vh', alignItems: 'center', justifyContent: 'space-between' }} >
            <BreadCrumbNav currentLocation={currentLocation} navigateTo={navigateTo} />
            <Stack alignItems="center" sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>
                <Typography variant="h4" sx={{color: 'secondary.light'}}>
                The Scriptures Mapped
                </Typography>
                <Typography variant="subtitle1" sx={{color: 'secondary.light'}}>
                By Zachary Barton
                </Typography>
            </Stack>
            <Typography variant="button"  sx={{color: theme.palette.primary.light}} >React Edition</Typography>
        </Stack>
    </Box>
  );
}

export default Header;
