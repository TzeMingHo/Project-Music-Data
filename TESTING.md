# Rubric

## All of the below requirements must be met for the project to be considered complete:

### The website must contain a drop-down which lists four users.

    - Open the page, confirm there is a drop-down (select a user), and verify it contains 4 users.

### Selecting a user must display answers relevant to that user.

    - Unit tests in common.test.mjs

### The code written to calculate the answers to the questions must seem like it could handle different data if it were supplied, including the following edge-cases:

#### User 4 has no data, so no questions apply to the user. Some intelligible statement should be shown to the user (e.g. "This user didn't listen to any songs.").

    - Go to the page, select user 4 from the drop-down, confirm a message is shown as "This user didn't listen to any songs"

#### If a question doesn't apply (e.g. if no songs were ever listened to on a Friday night), the interface should completely hide the question and answer. Displaying the question and an empty result, or any kind of error, is not acceptable.

    - Go to the page, select user 3, confirm there is no question and answer about Friday night, and everyday song.
    - User 3 did not listen songs on Friday night.
    - User 3 did not have any songs listened everyday.

#### If fewer than three (but more than zero) genres were listened to the site should list the top genres listened to. It must not display text like "Top 3 genres", but may say "Top genres" or "Top 2 genres" or similar.

    - Go to the page, select user 1, confirm the genre question displaying term like "top 3 genres"
    - Go to the page, select user 2, confirm the genre question displaying term like "top genre"
    - Go to the page, select user 3, confirm the genre question displaying term like "top 3 genres"

### Unit tests must be written for at least one non-trivial function.

    - Unit tests in common.test.mjs

### The website must score 100 for accessibility in Lighthouse

    - Go to the page, go to inspect (F12), navigate to lighthouse section, select Snapshot, confirm accessibility score 100.
