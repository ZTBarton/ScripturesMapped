import { useContext } from "react";
import { AppContext } from "./Providers";
import { Button, ButtonGroup, useTheme } from "@mui/material";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

function NextPrevButtons({ currentLocation, navigateTo, sx }) {
  const theme = useTheme();
  const { volumes, books } = useContext(AppContext);

  const getPreviousChapter = (currentLocation) => {
    if (currentLocation.chapter === 1) {
      if (currentLocation.volume.id === 1 && currentLocation.book.id === 101) {
        // if we are in the first chapter of the first volume...
        return { volume: null, book: null, chapter: null };
      } else if (currentLocation.volume.minBookId === currentLocation.book.id) {
        // if we are in the first chapter of any volume...
        const newVolume = volumes[currentLocation.volume.id - 2];
        const newBook = books[newVolume.maxBookId];
        return {
          volume: newVolume,
          book: newBook,
          chapter: newBook.numChapters,
        };
      } else {
        // if we are in the first chapter of a book
        const newBook = books[currentLocation.book.id - 1];
        return {
          volume: currentLocation.volume,
          book: newBook,
          chapter: newBook.numChapters,
        };
      }
    } else {
      return { ...currentLocation, chapter: currentLocation.chapter - 1 };
    }
  };

  const getNextChapter = (currentLocation) => {
    if (currentLocation.chapter === currentLocation.book.numChapters) {
      if (currentLocation.volume.id === 5 && currentLocation.book.id === 406) {
        // if we are in the last chapter of the last volume...
        return { volume: null, book: null, chapter: null };
      } else if (currentLocation.volume.maxBookId === currentLocation.book.id) {
        // if we are in the last chapter of any volume...
        const newVolume = volumes[currentLocation.volume.id];
        const newBook = books[currentLocation.book.id + 1];
        return { volume: newVolume, book: newBook, chapter: 1 };
      } else {
        // if we are in the last chapter of a book
        const newBook = books[currentLocation.book.id + 1];
        return { volume: currentLocation.volume, book: newBook, chapter: 1 };
      }
    } else {
      return { ...currentLocation, chapter: currentLocation.chapter + 1 };
    }
  };

  return (
    <ButtonGroup
      size="small"
      sx={{ alignSelf: "flex-end", color: theme.palette.primary.main, ...sx }}
    >
      <Button onClick={() => navigateTo(getPreviousChapter(currentLocation))}>
        <NavigateBeforeIcon />
      </Button>
      <Button onClick={() => navigateTo(getNextChapter(currentLocation))}>
        <NavigateNextIcon />
      </Button>
    </ButtonGroup>
  );
}

export default NextPrevButtons;
