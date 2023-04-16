import { Box, Stack, Container, CircularProgress } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextPrevButtons from "./NextPrevButtons";

function Navigation({ isLoading, currentLocation, navigateTo, children }) {
  const wideScreen = useMediaQuery("(max-width: 815px)");
  return (
    <Box
      id="scriptures"
      sx={{
        width: wideScreen ? 500 : "100%",
        backgroundColor: "secondary.light",
        overflow: "scroll",
      }}
    >
      {isLoading ? (
        <Container
          sx={{
            flexGrow: 1,
            minWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "inherit",
          }}
        >
          <CircularProgress size={60} />
        </Container>
      ) : (
        <Stack m={2}>
          {typeof children === "string" ? (
            <Stack>
              <NextPrevButtons
                currentLocation={currentLocation}
                navigateTo={navigateTo}
                sx={{ mb: "-5px" }}
              />
              <Box dangerouslySetInnerHTML={{ __html: children }}></Box>
              <NextPrevButtons
                currentLocation={currentLocation}
                navigateTo={navigateTo}
                sx={{ mb: "25px", transform: "translateY(-50px)" }}
              />
            </Stack>
          ) : (
            children
          )}
        </Stack>
      )}
    </Box>
  );
}

export default Navigation;
