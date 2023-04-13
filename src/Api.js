import { URL_SCRIPTURES } from "./constants";

const encodedScripturesUrlParameters = function (bookId, chapter, verses, isJst) {
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

const requestChapterText = (bookId, chapter, setContent) => {
    fetch(encodedScripturesUrlParameters(bookId, chapter))
        .then(function (response) {
            if (response.ok) {
                response.text()
                    .then(function (chapterHtml) {
                        if (typeof setContent === "function") {
                            setContent(chapterHtml);
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
