import { useEffect, useState, useRef } from "react";
import { Box, Stack, Slide } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import NextPrevButtons from "./NextPrevButtons";

function Navigation({currentLocation, navigateTo, content, previousContent, animationDirection }) {
  const wideScreen = useMediaQuery("(max-width: 815px)");
  const containerRef = useRef(null);

  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [navContent, setNavContent] = useState(null);
//   const [animationDirection, setAnimationDirection] = useState('left');

  useEffect(() => {
    setTriggerAnimation(true);
  });

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
        <Slide appear={false} container={containerRef.current} in={!triggerAnimation} direction={animationDirection === 'left' ? 'right' : 'left'}>
            <Stack m={2} sx={{position: 'absolute'}}>
                {previousContent}
            </Stack>
        </Slide>
        <Slide container={containerRef.current} in={triggerAnimation} direction={animationDirection}>
            <Stack m={2} sx={{position: 'absolute'}}>
                {content}
            </Stack>
        </Slide>

            {/* {typeof children === "string" ? (
                <><Slide appear={false} container={containerRef.current} in={!triggerAnimation} direction={animationDirection === 'left' ? 'right' : 'left'}>
                      
                  </Slide>
                  <Slide container={containerRef.current} in={triggerAnimation} direction={animationDirection}>
                          <Stack m={2} sx={{position: 'absolute'}}>
                              <NextPrevButtons
                                  currentLocation={currentLocation}
                                  navigateTo={navigateTo}
                                  setAnimationDirection={setAnimationDirection}
                                  sx={{ mb: "-5px" }} />
                              <Box dangerouslySetInnerHTML={{ __html: children }}></Box>
                              <NextPrevButtons
                                  currentLocation={currentLocation}
                                  navigateTo={navigateTo}
                                  setAnimationDirection={setAnimationDirection}
                                  sx={{ mb: "25px", transform: "translateY(-50px)" }} />
                          </Stack>
                      </Slide></>
            ) : (
                <Stack mt={2}>
                    {children}
                </Stack>
            )} */}
    </Box>
  );
}

export default Navigation;
