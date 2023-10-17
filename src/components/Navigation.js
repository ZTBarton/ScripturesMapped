import { useEffect, useState, useRef } from "react";
import { Box, Stack, Slide, Fade } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

function Navigation({ content, previousContent, animationType }) {
  const wideScreen = useMediaQuery("(max-width: 815px)");
  const containerRef = useRef(null);

  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [idCount, setIdCount] = useState(0);

  useEffect(() => {
    if (animationType !== 'fade') {
      setTriggerAnimation(false);
      setTimeout(() => {
        setTriggerAnimation(true);
      }, 1);
    }
    const newCount = idCount + 1;
    setIdCount(newCount);
  }, [content]);

  return (
    <Box
      id="scriptures"
      sx={{
        width: wideScreen ? 500 : "100%",
        backgroundColor: "secondary.light",
        overflow: "scroll",
      }}
      ref={containerRef}
    >
      {animationType === "fade" ? (
        <>
          {/* <Fade
            key={`transition-prev-${idCount}`}
            appear={false}
            container={containerRef.current}
            in={false}
            timeout={500}
          >
            <Stack m={2} sx={{ position: "absolute" }}>
              {previousContent}
            </Stack>
          </Fade> */}
          <Fade
            key={`transition-current-${idCount}`}
            container={containerRef.current}
            in={true}
            timeout={1000}
          >
            <Stack m={2} sx={{ position: "absolute" }}>
              {content}
            </Stack>
          </Fade>
        </>
      ) : (
        <>
          <Slide
            key={`transition-prev-${idCount}`}
            appear={false}
            container={containerRef.current}
            in={!triggerAnimation}
            timeout={200}
            direction={animationType === "left" ? "right" : "left"}
          >
            <Stack m={2} sx={{ position: "absolute" }}>
              {previousContent}
            </Stack>
          </Slide>
          <Slide
            key={`transition-current-${idCount}`}
            container={containerRef.current}
            in={triggerAnimation}
            timeout={500}
            direction={animationType}
          >
            <Stack m={2} sx={{ position: "absolute" }}>
              {content}
            </Stack>
          </Slide>
        </>
      )}
    </Box>
  );
}

export default Navigation;
