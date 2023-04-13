import React, { useContext, useEffect, useState } from 'react';
import { CircularProgress, Stack, Container } from "@mui/material";
import { AppContext } from './Providers';
import Header from './Header';
import Navigation from './Navigation';
import Map from './Map';
import NavGroup from './NavGroup';
import requestChapterText from './Api';
import './css/styles.css';

function App() {
  const {isFetchingData, volumes, books} = useContext(AppContext);

  const [isLoadingContent, setIsLoadingContent] = useState(true);
  const [currentLocation, setCurrentLocation] = useState({volume: null, book: null, chapter: null});
  const [navContent, setNavContent] = useState(null);

  useEffect(() => {
    const getContent = async () => {
      if (!isFetchingData) {
        setIsLoadingContent(true);
        const newNavContent = await getNavigatorContent(currentLocation);
        setNavContent(newNavContent);
        setIsLoadingContent(false);
      }
    };
    getContent();
  }, [volumes, currentLocation]);
  
  const getNavigatorContent = (location) => {
    setIsLoadingContent(true);
    let content = volumes.map((volume) => {
      const volumeBooks = Object.entries(books).filter((book) => {
        return book[0] >= volume.minBookId && book[0] <= volume.maxBookId
      }).map((bookArray) => {
        return {
          key: bookArray[1].id,
          text: bookArray[1].gridName,
          location: {
            volume: volume,
            book: bookArray[1],
            chapter: null
          }
        }
      });
      return <NavGroup headerText={volume.fullName} buttons={volumeBooks} onNavigate={setCurrentLocation} />
    });
    console.log('getting content');
    if (location.chapter !== null) {
      // get chapter html
      requestChapterText(location.book.id, location.chapter, setNavContent);
    } else if (location.book !== null) {
      const chapterButtons = Array(location.book.numChapters).fill({}).map((chapter, i) => {
        return {
          key: i,
          text: i,
          location: {
            volume: location.volume,
            book: location.book,
            chapter: i
          }
        }
      });
      content = <NavGroup headerText={location.book.fullName} buttons={chapterButtons} onNavigate={setCurrentLocation} />;
    } else if (location.volume !== null) {
      content = content[location.volume.id - 1];
    }
    return content;
  };

  return (
    <Stack sx={{height: '100vh'}}>
      <Header />
      {isFetchingData ?
        <Container sx={{
          flexGrow: 1, 
          minWidth: '100%', 
          display: 'flex', 
          alignItems: 'center' , 
          justifyContent: 'center'}}
          >
          <CircularProgress size={60} />
        </Container> : 
        <Stack direction='row' sx={{height: '90vh'}}>
          <Navigation>
            {navContent}
          </Navigation>
          <Map />
        </Stack>}
    </Stack>
  );
}

export default App;
