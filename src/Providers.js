import React, { createContext, useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Wrapper as GoogleApiWrapper } from '@googlemaps/react-wrapper';
import { URL_VOLUMES, URL_BOOKS } from './constants.js';
import GOOGLE_API_KEY from './keys.js';

const AppContext = createContext(null);

const AppProviders = ({ children }) => {
  let theme = createTheme({
    palette: {
      primary: {
        main: '#003057',
        light: '#4580b0',
        dark: '#01111f',
      },
      secondary: {
        main: '#f5f5dc',
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
    }
  });

  const [isFetchingData, setIsFetchingData] = useState(true);
  const [volumes, setVolumes] = useState([]);
  const [books, setBooks] = useState([]);

  const getJSON = function (url) {
    return fetch(url).then(function (response) {
        if (response.ok) {
            return response.json();
        }
    });
  };

  useEffect(() => {
    const fetchData = async () => {
        Promise.all([getJSON(URL_VOLUMES), getJSON(URL_BOOKS)])
            .then(function (jsonResults) {
                const [volumesJson, booksJson] = jsonResults;
                setVolumes(volumesJson);
                setBooks(booksJson);
            });
        setIsFetchingData(false);
    };
    if (volumes.length === 0 || books.length === 0) {
      fetchData();
    }
  })
  
  return (
    <GoogleApiWrapper apiKey={GOOGLE_API_KEY}>
      <ThemeProvider theme={theme}>
        <AppContext.Provider value={{isFetchingData, volumes, books}}>
          {children}
        </AppContext.Provider>
      </ThemeProvider>
    </GoogleApiWrapper>
  );
}

export { AppContext, AppProviders };
