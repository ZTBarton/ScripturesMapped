import React from "react";
import { Stack, Box } from "@mui/material";
import NextPrevButtons from "./NextPrevButtons";

const ChapterStack = ({
  chapterHTML,
  currentLocation,
  navigateTo,
  setAnimationDirection,
}) => {
  return (
    <>
      <NextPrevButtons
        currentLocation={currentLocation}
        navigateTo={navigateTo}
        setAnimationDirection={setAnimationDirection}
        sx={{ mb: "-5px" }}
      />
      <Box dangerouslySetInnerHTML={{ __html: chapterHTML }}></Box>
      <NextPrevButtons
        currentLocation={currentLocation}
        navigateTo={navigateTo}
        setAnimationDirection={setAnimationDirection}
        sx={{ mb: "25px", transform: "translateY(-50px)" }}
      />
    </>
  );
};

export default ChapterStack;
