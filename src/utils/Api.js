import {
  URL_SCRIPTURES,
  LAT_LON_PARSER,
  INDEX_PLACENAME,
  INDEX_LONGITUDE,
  INDEX_LATITUDE,
  INDEX_ID,
} from "./constants";
import ChapterStack from "../components/ChapterStack";

const encodedScripturesUrlParameters = function (
  bookId,
  chapter,
  verses,
  isJst
) {
  if (bookId !== undefined && chapter !== undefined) {
    let options = "";

    if (verses !== undefined) {
      options += verses;
    }

    if (isJst !== undefined) {
      options += "&jst=JST";
    }

    return `${URL_SCRIPTURES}?book=${bookId}&chap=${chapter}&verses${options}`;
  }
};

const requestChapterText = (
  bookId,
  chapter,
  setContent,
  setMarkers,
  currentLocation,
  navigateTo,
  setAnimationDirection
) => {
  fetch(encodedScripturesUrlParameters(bookId, chapter))
    .then(function (response) {
      if (response.ok) {
        response.text().then(function (chapterHtml) {
          if (typeof setContent === "function") {
            const doc = new DOMParser().parseFromString(
              chapterHtml,
              "text/html"
            );
            const markers = [];
            doc
              .querySelectorAll('a[onclick^="showLocation("]')
              .forEach((element) => {
                const match = LAT_LON_PARSER.exec(
                  element.getAttribute("onclick")
                );
                if (
                  !markers.map((marker) => marker.id).includes(match[INDEX_ID])
                ) {
                  markers.push({
                    id: match[INDEX_ID],
                    placename: match[INDEX_PLACENAME],
                    position: {
                      lat: parseFloat(match[INDEX_LATITUDE]),
                      lng: parseFloat(match[INDEX_LONGITUDE]),
                    },
                  });
                }
              });
            setMarkers(markers);
            setContent(
              <ChapterStack
                chapterHTML={chapterHtml}
                currentLocation={currentLocation}
                navigateTo={navigateTo}
                setAnimationDirection={setAnimationDirection}
              />
            );
          }
        });
      } else {
        if (typeof setContent === "function") {
          setContent(`Network failure: ${response.statusText}`);
        }
      }
    })
    .catch(function (error) {
      if (typeof setContent === "function") {
        setContent(`Error: ${error}`);
      }
    });
};

export default requestChapterText;
