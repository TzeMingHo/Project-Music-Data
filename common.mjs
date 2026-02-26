import { getListenEvents, getSong } from "./data.mjs";

function getTopWinnerFrom(arrayOfArrays) {
  return arrayOfArrays.length !== 0
    ? arrayOfArrays.sort((a, b) => b[1] - a[1])[0][0]
    : "";
}

export function createSongIdOccurrenceMap(userListenEventsArray) {
  const songIdOccurrenceMap = new Map();
  userListenEventsArray?.forEach(({ song_id }) => {
    const occurrenceNumber = songIdOccurrenceMap.get(song_id) || 0;
    songIdOccurrenceMap.set(song_id, occurrenceNumber + 1);
  });
  return songIdOccurrenceMap;
}

export function findMostListenedSongStringByCount(songIdOccurrenceMap) {
  const mostListenedSongIdStringByCount = getTopWinnerFrom(
    Array.from(songIdOccurrenceMap),
  );
  if (mostListenedSongIdStringByCount) {
    const { artist, title } = getSong(mostListenedSongIdStringByCount);
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

export function findMostListenedSongStringByTime(songIdOccurrenceMap) {
  const songIdTotalListenedSecondsArray =
    convertOccurrenceMapToTotalListenedSecondsArray(songIdOccurrenceMap);

  const mostListenedSongIdStringByTime = getTopWinnerFrom(
    songIdTotalListenedSecondsArray,
  );
  if (mostListenedSongIdStringByTime) {
    const { artist, title } = getSong(mostListenedSongIdStringByTime);
    return `${artist} - ${title}`;
  } else {
    return "";
  }
}

function accumulateNumberGroupedByArtistsMap(arrayOfArrays) {
  const artistNameStringNumberMap = new Map();
  arrayOfArrays.forEach(([song_id, number]) => {
    const artistNameString = getSong(song_id).artist;
    const currentNumber = artistNameStringNumberMap.get(artistNameString) || 0;
    artistNameStringNumberMap.set(artistNameString, currentNumber + number);
  });
  return artistNameStringNumberMap;
}

export function findMostListenedArtistByCount(songIdOccurrenceMap) {
  const artistNameOccurrenceMap = accumulateNumberGroupedByArtistsMap(
    Array.from(songIdOccurrenceMap),
  );
  return getTopWinnerFrom(Array.from(artistNameOccurrenceMap));
}

export function findMostListenedArtistByTime(songIdOccurrenceMap) {
  const songIdTotalListenedSecondsArray =
    convertOccurrenceMapToTotalListenedSecondsArray(songIdOccurrenceMap);

  const artistNameTotalSecondsMap = accumulateNumberGroupedByArtistsMap(
    songIdTotalListenedSecondsArray,
  );
  return getTopWinnerFrom(Array.from(artistNameTotalSecondsMap));
}

export function fridayNightFilter(userListenEventsArray) {
  return userListenEventsArray?.filter(({ timestamp }) => {
    const dateObject = new Date(timestamp);
    const dayIndex = dateObject.getDay();
    const hourNumber = dateObject.getHours();
    return (
      (dayIndex === 5 && hourNumber >= 17) || (dayIndex === 6 && hourNumber < 4)
    );
  });
}

export function findSongListenedMostTimesInARow(userListenEventsArray) {
  if (!userListenEventsArray || userListenEventsArray.length === 0) return "";

  let mostListenedSongId = "";
  let maxCount = 1;
  let count = 1;

  for (let index = 1; index < userListenEventsArray.length; index++) {
    const currentSongId = userListenEventsArray[index].song_id;
    const previousSongId = userListenEventsArray[index - 1].song_id;

    if (currentSongId === previousSongId) {
      count++;
    } else {
      count = 1;
    }

    if (count > maxCount) {
      maxCount = count;
      mostListenedSongId = currentSongId;
    }
  }

  if (mostListenedSongId) {
    const { artist, title } = getSong(mostListenedSongId);
    return `${artist} - ${title} (length: ${maxCount})`;
  }
  return "";
}

export function findEverydayListenedSongs(userListenEventsArray) {
  const everydaySet = new Set();
  const songIdDatesSetMap = new Map();
  userListenEventsArray?.forEach(({ timestamp, song_id }) => {
    const dateString = timestamp.split("T")[0];
    everydaySet.add(dateString);

    const datesSet = songIdDatesSetMap.get(song_id) || new Set();

    songIdDatesSetMap.set(song_id, datesSet.add(dateString));
  });

  const everydayListenedSongIdsAndDatesSetArray = Array.from(
    songIdDatesSetMap,
  ).filter((pair) => {
    return pair[1].size === everydaySet.size;
  });

  return everydayListenedSongIdsAndDatesSetArray.length !== 0
    ? everydayListenedSongIdsAndDatesSetArray
        .map((songIdAndDates) => {
          const { artist, title } = getSong(songIdAndDates[0]);
          return `${artist} - ${title}`;
        })
        .join(", ")
    : "";
}

function convertSongIdOccurrenceMapToGenreOccurrenceArray(songIdOccurrenceMap) {
  return Array.from(songIdOccurrenceMap).map(([song_id, occurrence]) => {
    const { genre } = getSong(song_id);
    return [genre, occurrence];
  });
}

function createGroupByGenreMap(genreOccurrenceArray) {
  const groupByGenreMap = new Map();
  genreOccurrenceArray?.forEach(([genre, occurrence]) => {
    const currentOccurrence = groupByGenreMap.get(genre) || 0;
    groupByGenreMap.set(genre, currentOccurrence + occurrence);
  });
  return groupByGenreMap;
}

export function findMostListenedGenres(songIdOccurrenceMap) {
  const genreOccurrenceArray =
    convertSongIdOccurrenceMapToGenreOccurrenceArray(songIdOccurrenceMap);

  const groupByGenreMap = createGroupByGenreMap(genreOccurrenceArray);

  const sortedGenreOccurrenceArray = Array.from(groupByGenreMap).sort(
    (a, b) => b[1] - a[1],
  );

  return sortedGenreOccurrenceArray
    .slice(0, 3)
    .map((genreOccurrencePair) => genreOccurrencePair[0]);
}

function createTopGenresQuestion(topGenresArray) {
  if (topGenresArray.length === 0) return "";
  return topGenresArray.length === 1
    ? "What was the user's top genre to listen to by number of listens?"
    : `What were the user's top ${topGenresArray.length} genres to listen to by number of listens?`;
}

export function getQuestionAndAnswerArrayOfObjects(userId) {
  const userListenEventsArray = getListenEvents(userId);
  const songIdOccurrenceMap = createSongIdOccurrenceMap(userListenEventsArray);

  const fridayNightEventsArray = fridayNightFilter(userListenEventsArray);

  const topGenresArray = findMostListenedGenres(songIdOccurrenceMap);

  const questionAndAnswerArrayOfObjects = [
    {
      question:
        "What was the user's most often listened to song according to the data? (By count)",
      answer: findMostListenedSongStringByCount(songIdOccurrenceMap),
    },
    {
      question:
        "What was the user's most often listened to song according to the data? (By time)",
      answer: findMostListenedSongStringByTime(songIdOccurrenceMap),
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
      answer: findMostListenedSongStringByCount(
        createSongIdOccurrenceMap(fridayNightEventsArray),
      ),
    },
    {
      question:
        "What was the user's most often listened to song on Friday nights (between 5pm and 4am)? (By time)",
      answer: findMostListenedSongStringByTime(
        createSongIdOccurrenceMap(fridayNightEventsArray),
      ),
    },
    {
      question:
        "What song did the user listen to the most times in a row (i.e. without any other song being listened to in between)? How many times was it listened to?",
      answer: findSongListenedMostTimesInARow(userListenEventsArray),
    },
    {
      question:
        "Are there any songs that, on each day the user listened to music, they listened to every day?",
      answer: findEverydayListenedSongs(userListenEventsArray),
    },
    {
      question: createTopGenresQuestion(topGenresArray),
      answer: topGenresArray.join(", "),
    },
  ];

  return questionAndAnswerArrayOfObjects;
}
