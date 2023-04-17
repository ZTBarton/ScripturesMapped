import React, { useContext, useEffect, useState } from "react";
import { CircularProgress, Stack, Container, Box } from "@mui/material";
import { AppContext } from "./Providers";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "./Header";
import Navigation from "./Navigation";
import Map from "./Map";
import NavGroup from "./NavGroup";
import requestChapterText from "./Api";
import "./css/styles.css";

function App() {
  const { isFetchingData, volumes, books } = useContext(AppContext);
  const wideScreen = useMediaQuery("(max-width: 815px)");

  const [currentLocation, setCurrentLocation] = useState({
    volume: null,
    book: null,
    chapter: null,
  });
  const [navContent, setNavContent] = useState(<Box></Box>);
  const [markers, setMarkers] = useState([]);
  const [prevNavContent, setPrevNavContent] = useState(<Box></Box>);
  const [animationDirection, setAnimationDirection] = useState('left');

  useEffect(() => {
    const getContent = () => {
      if (!isFetchingData) {
        getNavigatorContent(currentLocation);
      }
    };
    getContent();
  }, [volumes, currentLocation]);

  const getNavigatorContent = (location) => {
    setPrevNavContent(navContent);
    let content = volumes.map((volume) => {
      const volumeBooks = Object.entries(books)
        .filter((book) => {
          return book[0] >= volume.minBookId && book[0] <= volume.maxBookId;
        })
        .map((bookArray) => {
          return {
            key: bookArray[1].id,
            text: bookArray[1].gridName,
            location: {
              volume: volume,
              book: bookArray[1],
              chapter: null,
            },
          };
        });
      return (
        <NavGroup
          id={volume.id}
          headerText={volume.fullName}
          buttons={volumeBooks}
          onNavigate={setCurrentLocation}
        />
      );
    });
    if (location.chapter !== null) {
      // get chapter html
      requestChapterText(
        location.book.id,
        location.chapter,
        setNavContent,
        setMarkers,
        currentLocation,
        setCurrentLocation,
        setAnimationDirection
      );
    } else if (location.book !== null) {
      const chapterButtons = Array(location.book.numChapters)
        .fill({})
        .map((chapter, i) => {
          return {
            key: i,
            text: i + 1,
            location: {
              volume: location.volume,
              book: location.book,
              chapter: i + 1,
            },
          };
        });
      content = (
        <NavGroup
          id={location.book.id}
          headerText={location.book.fullName}
          buttons={chapterButtons}
          onNavigate={setCurrentLocation}
        />
      );
      setNavContent(content);
    } else if (location.volume !== null) {
      content = content[location.volume.id - 1];
      setNavContent(content);
    } else {
      setNavContent(content);
    }
  };

  return (
    <Stack sx={{ height: "100vh" }}>
      <Header
        currentLocation={currentLocation}
        navigateTo={setCurrentLocation}
      />
      {isFetchingData ? (
        <Container
          sx={{
            flexGrow: 1,
            minWidth: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={60} />
        </Container>
      ) : (
        <Stack
          direction={wideScreen ? "column-reverse" : "row"}
          sx={{ height: "90vh" }}
        >
          <Navigation
            currentLocation={currentLocation}
            navigateTo={setCurrentLocation}
            previousContent={prevNavContent}
            content={navContent}
            animationDirection={animationDirection}
          />
          <Map markers={markers} />
        </Stack>
      )}
    </Stack>
  );
}

export default App;
