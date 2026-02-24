import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

function getTopWinnerFrom(arrayOfArrays) {
  return arrayOfArrays.length !== 0
    ? arrayOfArrays.sort((a, b) => b[1] - a[1])[0][0]
    : "";
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
  if (mostListenedSongIdByCount) {
    const { artist, title } = getSong(mostListenedSongIdByCount);
    return `${artist} - ${title}`;
  } else {
    return "";
  }
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
  if (mostListenedSongIdByTime) {
    const { artist, title } = getSong(mostListenedSongIdByTime);
    return `${artist} - ${title}`;
  } else {
    return "";
  }
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

function fridayNightFilter(userListenEventsArray) {
  return userListenEventsArray.filter(({ timestamp }) => {
    const dateObject = new Date(timestamp);
    const dayIndex = dateObject.getDay();
    const hourNumber = dateObject.getHours();
    return (
      (dayIndex === 5 && hourNumber >= 17) || (dayIndex === 6 && hourNumber < 4)
    );
  });
}

export function getQuestionAndAnswerArrayOfObjects(userId) {
  const userListenEventsArray = getListenEvents(userId);
  const songIdOccurrenceMap = createSongIdOccurrenceMap(userListenEventsArray);

  const fridayNightEventsArray = fridayNightFilter(userListenEventsArray);

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
    {
      question:
        "What was the user's most often listened to song on Friday nights (between 5pm and 4am)? (By count)",
      answer: findMostListenedSongByCount(
        createSongIdOccurrenceMap(fridayNightEventsArray),
      ),
    },
    {
      question:
        "What was the user's most often listened to song on Friday nights (between 5pm and 4am)? (By time)",
      answer: findMostListenedSongByTime(
        createSongIdOccurrenceMap(fridayNightEventsArray),
      ),
    },
  ];

  return questionAndAnswerArrayOfObjects;
}
