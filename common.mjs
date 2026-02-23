import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

function createSongIdOccurrenceMap(userId) {
  const userListenEvents = getListenEvents(userId);
  const songIdOccurrenceMap = new Map();
  userListenEvents.forEach(({ song_id }) => {
    const occurrenceNumber = songIdOccurrenceMap.get(song_id) || 0;
    songIdOccurrenceMap.set(song_id, occurrenceNumber + 1);
  });
  return songIdOccurrenceMap;
}

function findMostListenedSongByCount(songIdOccurrenceMap) {
  const sortedSongIdOccurrenceArray = Array.from(songIdOccurrenceMap).sort(
    (a, b) => b[1] - a[1],
  );
  const mostListenedSongIdByCount = sortedSongIdOccurrenceArray[0][0];
  const { artist, title } = getSong(mostListenedSongIdByCount);
  return `${artist} - ${title}`;
}

function convertOccurrenceMapToTotalListenedTimeArray(songIdOccurrenceMap) {
  return Array.from(songIdOccurrenceMap).map(([song_id, occurrence]) => {
    const { duration_seconds } = getSong(song_id);
    return [song_id, occurrence * duration_seconds];
  });
}

function findMostListenedSongByTime(songIdOccurrenceMap) {
  const songIdTotalListenedTimeArray =
    convertOccurrenceMapToTotalListenedTimeArray(songIdOccurrenceMap);

  const sortedSongIdTotalListenedTimeArray = songIdTotalListenedTimeArray.sort(
    (a, b) => b[1] - a[1],
  );

  const mostListenedSongIdByTime = sortedSongIdTotalListenedTimeArray[0][0];
  const { artist, title } = getSong(mostListenedSongIdByTime);
  return `${artist} - ${title}`;
}

function findMostListenedArtistByCount(songIdOccurrenceMap) {
  const artistNameOccurrenceMap = new Map();
  Array.from(songIdOccurrenceMap).forEach(([song_id, occurrence]) => {
    const artistName = getSong(song_id).artist;
    const artistNameOccurrence = artistNameOccurrenceMap.get(artistName) || 0;
    artistNameOccurrenceMap.set(artistName, artistNameOccurrence + occurrence);
  });
  return Array.from(artistNameOccurrenceMap).sort((a, b) => b[1] - a[1])[0][0];
}

// find most listened artist by time

export function getQuestionAndAnswerArrayOfObjects(userId) {
  const songIdOccurrenceMap = createSongIdOccurrenceMap(userId);

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
    },
  ];

  return questionAndAnswerArrayOfObjects;
}

// console.log(createSongIdOccurrenceMap(1));

console.log(getQuestionAndAnswerArrayOfObjects(3));
