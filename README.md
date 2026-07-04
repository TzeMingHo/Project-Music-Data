# 🎵 Music Data Dashboard

An individual data-analysis application built to parse, process, and extract meaningful consumer insights from structured behavioral JSON logs. The application dynamically generates user listening profiles, tracking metrics like favorite artists, overall listening counts, and specific time-based behavioral habits.

*   **Live Demo:** [View Live Application](https://music-data-reports.netlify.app/)

---

## 💡 Project Background & Motivation

Having already completed projects centered around standard API data fetching, I wanted to challenge myself with something different. I chose this project to move beyond basic data rendering and focus heavily on data manipulation—taking formatted event log files and mapping them into meaningful, human-readable insights for an end user.

### The Problem It Solves
Raw event log structures (such as arrays of user timestamps and associated identifiers) are difficult to interpret visually. This dashboard reads localized listening event data, processes the relationships between track metadata, timestamps, and frequencies, and dynamically answers analytical questions for individual user profiles without relying on hard-coded results.

---

## 🛠️ Project Requirements & Technical Specifications

Engineered around data integrity and clean functional workflows, the application satisfies the following constraints:

*   **Dynamic Data Pipelines:** Utilizes native JavaScript array methods and structural mapping to filter and look up values from localized functions (`getListenEvents`, `getSong`) dynamically upon every user selection.
*   **Flexible Data-Driven UI:** Built entirely with semantic HTML. The interface adapts dynamically; if an analytical insight does not apply to a specific user (e.g., a user has no data records or zero Friday night streams), the UI completely hides the question rather than rendering empty or broken fields.
*   **Edge-Case Handling:** Programmed to handle dynamic boundaries (e.g., cleanly listing a summary based on available elements if data is limited, or handling empty state accounts gracefully).
*   **100% Lighthouse Accessibility:** Achieved a perfect 100% score on Lighthouse Snapshot mode through strict adherence to accessible HTML layouts.

---

## 🚀 Engineering Highlights

*   **Algorithmic Frequency Mapping:** Engineered a reusable system using JavaScript objects to track song and artist frequencies. This structure counts song and artist metrics by both discrete occurrence counts and cumulative listening time.
*   **Clean Key-Value Mapping:** Mapped processing results directly to frontend display components via unified data objects, making it incredibly simple to scale, add new report questions, or maintain the interface.
*   **Time-Window Extraction:** Formulated custom time-filtering logic to isolate specific behavioral trends, such as identifying a user's top track exclusively during designated windows (e.g., filtering matching events between 5 PM and 4 AM local time).
*   **Automated Verification:** Supported by a robust unit testing suite via `Node:Test` to verify that calculations perfectly match targeted user benchmark datasets.

---

## 🧠 What I Learned & Growth Reflections

### 1. Designing Reusable Code Functions
The most critical part of this project was avoiding the temptation to write repetitive code for similar questions. Figuring out how to extract the frequency-counting logic into a single, highly reusable function that could calculate data by both *listen count* and *total duration* was a major breakthrough for my understanding of clean code design.

### 2. Practical Experience with Data Relationships
Building this dashboard provided hands-on experience handling lookups between user logs and song profile data structures. It highlighted the practical impact of choosing the right algorithmic paths when cross-referencing arrays and collections, making it an excellent foundation for studying code efficiency and complexity analysis in more advanced applications.

---

## ⚙️ Local Setup & Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/TzeMingHo/Project-Music-Data.git](https://github.com/TzeMingHo/Project-Music-Data.git)
   ```
2. Navigate to the directory:

  ```Bash
  cd Project-Music-Data
  ```
3. Install dependencies:

  ```Bash
  npm install
  ```
4. Run the test suite:

  ```Bash
  npm test
  ```
