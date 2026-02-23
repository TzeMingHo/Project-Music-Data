import { getUserIDs, getListenEvents, getSong } from "./data.mjs";

function createSongIdOccurrenceMap(userId) {
  const userListenEvents = getListenEvents(userId);
  const songIdOccurrenceMap = new Map();
  userListenEvents.forEach(({ song_id }) => {
    const occurrenceNumber = songIdOccurrenceMap.get(song_id);
    if (occurrenceNumber) {
      songIdOccurrenceMap.set(song_id, occurrenceNumber + 1);
    } else {
      songIdOccurrenceMap.set(song_id, 1);
    }
  });
  return songIdOccurrenceMap;
}

function findMostListenedSongByCount(songIdOccurrenceMap) {
  const sortedSongIdOccurrenceArray = Array.from(songIdOccurrenceMap).sort(
    (a, b) => b[1] - a[1],
  );
  const mostListenedSongIdByCount = sortedSongIdOccurrenceArray[0][0];
  const mostListenedSongObjectByCount = getSong(mostListenedSongIdByCount);
  return mostListenedSongObjectByCount;
}

function findMostListenedSongByTime(songIdOccurrenceMap) {
  const eachSongTotalListenedTimeArray = Array.from(songIdOccurrenceMap).map(
    ([song_id, occurrence]) => {
      const { duration_seconds } = getSong(song_id);
      return [song_id, occurrence * duration_seconds];
    },
  );
  const sortedEachSongTotalListenedTimeArray =
    eachSongTotalListenedTimeArray.sort((a, b) => b[1] - a[1]);

  const mostListenedSongIdByTime = sortedEachSongTotalListenedTimeArray[0][0];
  const mostListenedSongObjectByTime = getSong(mostListenedSongIdByTime);
  return mostListenedSongObjectByTime;
}

export function answerToQuestionOne(userId) {
  const songIdOccurrenceMap = createSongIdOccurrenceMap(userId);

  const mostListenedSongObjectByCount =
    findMostListenedSongByCount(songIdOccurrenceMap);

  // calculate total time of each song
  const mostListenedSongObjectByTime =
    findMostListenedSongByTime(songIdOccurrenceMap);

  return { mostListenedSongObjectByCount, mostListenedSongObjectByTime };
}

console.log(answerToQuestionOne(1));
