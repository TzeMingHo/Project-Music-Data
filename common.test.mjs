import assert from "node:assert";
import test from "node:test";
import {
  createSongIdOccurrenceMap,
  findEverydayListenedSongs,
  findMostListenedArtistByCount,
  findMostListenedArtistByTime,
  findMostListenedGenres,
  findMostListenedSongStringByCount,
  findMostListenedSongStringByTime,
  findSongListenedMostTimesInARow,
  fridayNightFilter,
} from "./common.mjs";
import { getListenEvents } from "./data.mjs";

test("Most listened song (count), user 1", () => {
  const expect = "The Swell Season - When Your Mind's Made Up";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(getListenEvents(1)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened song (count), user 2", () => {
  const expect = "Frank Turner - I Still Believe";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(getListenEvents(2)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened song (count), user 3", () => {
  const expect = "Frank Turner - Be More Kind";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(getListenEvents(3)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened song (count), user 4", () => {
  const expect = "";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(getListenEvents(4)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened song (time), user 1", () => {
  const expect = "Faithless - Insomnia";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(getListenEvents(1)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened song (time), user 2", () => {
  const expect = "Frank Turner - I Still Believe";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(getListenEvents(2)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened song (time), user 3", () => {
  const expect = "Faithless - Insomnia";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(getListenEvents(3)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened song (time), user 4", () => {
  const expect = "";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(getListenEvents(4)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (count), user 1", () => {
  const expect = "Frank Turner";
  const actual = findMostListenedArtistByCount(
    createSongIdOccurrenceMap(getListenEvents(1)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (count), user 2", () => {
  const expect = "Frank Turner";
  const actual = findMostListenedArtistByCount(
    createSongIdOccurrenceMap(getListenEvents(2)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (count), user 3", () => {
  const expect = "Frank Turner";
  const actual = findMostListenedArtistByCount(
    createSongIdOccurrenceMap(getListenEvents(3)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (count), user 4", () => {
  const expect = "";
  const actual = findMostListenedArtistByCount(
    createSongIdOccurrenceMap(getListenEvents(4)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (time), user 1", () => {
  const expect = "Frank Turner";
  const actual = findMostListenedArtistByTime(
    createSongIdOccurrenceMap(getListenEvents(1)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (time), user 2", () => {
  const expect = "Frank Turner";
  const actual = findMostListenedArtistByTime(
    createSongIdOccurrenceMap(getListenEvents(2)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (time), user 3", () => {
  const expect = "Frank Turner";
  const actual = findMostListenedArtistByTime(
    createSongIdOccurrenceMap(getListenEvents(3)),
  );
  assert.strictEqual(expect, actual);
});

test("Most listened artist (time), user 4", () => {
  const expect = "";
  const actual = findMostListenedArtistByTime(
    createSongIdOccurrenceMap(getListenEvents(4)),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (count), user 1", () => {
  const expect = "The Swell Season - When Your Mind's Made Up";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(1))),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (count), user 2", () => {
  const expect = "Frank Turner - I Still Believe";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(2))),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (count), user 3", () => {
  const expect = "";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(3))),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (count), user 4", () => {
  const expect = "";
  const actual = findMostListenedSongStringByCount(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(4))),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (time), user 1", () => {
  const expect = "The Swell Season - When Your Mind's Made Up";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(1))),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (time), user 2", () => {
  const expect = "Frank Turner - Photosynthesis";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(2))),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (time), user 3", () => {
  const expect = "";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(3))),
  );
  assert.strictEqual(expect, actual);
});

test("Friday night song (time), user 4", () => {
  const expect = "";
  const actual = findMostListenedSongStringByTime(
    createSongIdOccurrenceMap(fridayNightFilter(getListenEvents(4))),
  );
  assert.strictEqual(expect, actual);
});

test("Longest streak song, user 1", () => {
  const expect = "The King Blues - I Got Love (length: 34)";
  const actual = findSongListenedMostTimesInARow(getListenEvents(1));
  assert.strictEqual(expect, actual);
});

test("Longest streak song, user 2", () => {
  const expect = "Frank Turner - I Still Believe (length: 44)";
  const actual = findSongListenedMostTimesInARow(getListenEvents(2));
  assert.strictEqual(expect, actual);
});

test("Longest streak song, user 3", () => {
  const expect = "The Divine Comedy - Tonight We Fly (length: 42)";
  const actual = findSongListenedMostTimesInARow(getListenEvents(3));
  assert.strictEqual(expect, actual);
});

test("Longest streak song, user 4", () => {
  const expect = "";
  const actual = findSongListenedMostTimesInARow(getListenEvents(4));
  assert.strictEqual(expect, actual);
});

test("Every day songs, user 1", () => {
  const expect = "The Swell Season - When Your Mind's Made Up";
  const actual = findEverydayListenedSongs(getListenEvents(1));
  assert.strictEqual(expect, actual);
});

test("Every day songs, user 2", () => {
  const expect =
    "Frank Turner - Photosynthesis, The Divine Comedy - Tonight We Fly";
  const actual = findEverydayListenedSongs(getListenEvents(2));
  assert.strictEqual(expect, actual);
});

test("Every day songs, user 3", () => {
  const expect = "";
  const actual = findEverydayListenedSongs(getListenEvents(3));
  assert.strictEqual(expect, actual);
});

test("Every day songs, user 4", () => {
  const expect = "";
  const actual = findEverydayListenedSongs(getListenEvents(4));
  assert.strictEqual(expect, actual);
});

test("Top three genres, user 1", () => {
  const expect = "Pop, Folk, Punk";
  const actual = findMostListenedGenres(
    createSongIdOccurrenceMap(getListenEvents(1)),
  ).join(", ");
  assert.strictEqual(expect, actual);
});

test("Top genre, user 2", () => {
  const expect = "Pop";
  const actual = findMostListenedGenres(
    createSongIdOccurrenceMap(getListenEvents(2)),
  ).join(", ");
  assert.strictEqual(expect, actual);
});

test("Top three genres, user 3", () => {
  const expect = "Pop, Folk, House";
  const actual = findMostListenedGenres(
    createSongIdOccurrenceMap(getListenEvents(3)),
  ).join(", ");
  assert.strictEqual(expect, actual);
});

test("Top genre, user 4", () => {
  const expect = "";
  const actual = findMostListenedGenres(
    createSongIdOccurrenceMap(getListenEvents(4)),
  ).join(", ");
  assert.strictEqual(expect, actual);
});
