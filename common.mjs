import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

function getTopWinnerFrom(arrayOfArrays) {
  return arrayOfArrays.sort((a, b) => b[1] - a[1])[0][0];
}

function createSongIdOccurrenceMap(userListenEventsArray) {
  const songIdOccurrenceMap = new Map();
  userListenEventsArray.forEach(({ song_id }) => {
    const occurrenceNumber = songIdOccurrenceMap.get(song_id) || 0;
    songIdOccurrenceMap.set(song_id, occurrenceNumber + 1);
  });
  return songIdOccurrenceMap;
}

function findMostListenedSongByCount(songIdOccurrenceMap) {
  const mostListenedSongIdByCount = getTopWinnerFrom(
    Array.from(songIdOccurrenceMap),
  );
  const { artist, title } = getSong(mostListenedSongIdByCount);
  return `${artist} - ${title}`;
}

function convertOccurrenceMapToTotalListenedSecondsArray(songIdOccurrenceMap) {
  return Array.from(songIdOccurrenceMap).map(([song_id, occurrence]) => {
    const { duration_seconds } = getSong(song_id);
    return [song_id, occurrence * duration_seconds];
  });
}

function findMostListenedSongByTime(songIdOccurrenceMap) {
  const songIdTotalListenedSecondsArray =
    convertOccurrenceMapToTotalListenedSecondsArray(songIdOccurrenceMap);

  const mostListenedSongIdByTime = getTopWinnerFrom(
    songIdTotalListenedSecondsArray,
  );
  const { artist, title } = getSong(mostListenedSongIdByTime);
  return `${artist} - ${title}`;
}

function accumulateNumberGroupedByArtistNameMap(arrayOfArrays) {
  const artistStringNumberMap = new Map();
  arrayOfArrays.forEach(([song_id, number]) => {
    const artistNameString = getSong(song_id).artist;
    const currentNumber = artistStringNumberMap.get(artistNameString) || 0;
    artistStringNumberMap.set(artistNameString, currentNumber + number);
  });
  return artistStringNumberMap;
}

function findMostListenedArtistByCount(songIdOccurrenceMap) {
  const artistNameOccurrenceMap = accumulateNumberGroupedByArtistNameMap(
    Array.from(songIdOccurrenceMap),
  );
  return getTopWinnerFrom(Array.from(artistNameOccurrenceMap));
}

function findMostListenedArtistByTime(songIdOccurrenceMap) {
  const songIdTotalListenedSecondsArray =
    convertOccurrenceMapToTotalListenedSecondsArray(songIdOccurrenceMap);

  const artistNameTotalSecondsMap = accumulateNumberGroupedByArtistNameMap(
    songIdTotalListenedSecondsArray,
  );
  return getTopWinnerFrom(Array.from(artistNameTotalSecondsMap));
}

export function getQuestionAndAnswerArrayOfObjects(userId) {
  const userListenEventsArray = getListenEvents(userId);
  const songIdOccurrenceMap = createSongIdOccurrenceMap(userListenEventsArray);

  const questionAndAnswerArrayOfObjects = [
    {
      question:
        "What was the user's most often listened to song according to the data? (By count)",
      answer: findMostListenedSongByCount(songIdOccurrenceMap),
    },
    {
      question:
        "What was the user's most often listened to song according to the data? (By time)",
      answer: findMostListenedSongByTime(songIdOccurrenceMap),
    },
    {
      question:
        "What was the user's most often listened to artist according to the data? (By count)",
      answer: findMostListenedArtistByCount(songIdOccurrenceMap),
    },
    {
      question:
        "What was the user's most often listened to artist according to the data? (By time)",
      answer: findMostListenedArtistByTime(songIdOccurrenceMap),
    },
  ];

  return questionAndAnswerArrayOfObjects;
}

// console.log(createSongIdOccurrenceMap(1));

console.log(getQuestionAndAnswerArrayOfObjects(3));
