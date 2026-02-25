import { getQuestionAndAnswerArrayOfObjects } from "./common.mjs";
import { getUserIDs } from "./data.mjs";

const state = {
  userId: 0,
};

function populateUserSelect() {
  const userSelect = document.getElementById("user-select");
  const userIdArray = getUserIDs();
  userIdArray.forEach((userId) => {
    const userOption = document.createElement("option");
    userOption.textContent = `User ${userId}`;
    userOption.value = userId;
    userSelect.append(userOption);
  });
}

function addListeners() {
  document.getElementById("user-select").addEventListener("change", (e) => {
    state.userId = parseInt(e.target.value);
    renderReport();
  });
}

function createQuestionAndAnswerCard({ question, answer }) {
  const questionAndAnswerCard = document.createElement("div");

  const questionElement = document.createElement("p");
  questionElement.textContent = question;

  const answerElement = document.createElement("p");
  answerElement.textContent = answer;

  questionAndAnswerCard.append(questionElement, answerElement);

  return questionAndAnswerCard;
}

function renderReport() {
  const reportArea = document.getElementById("report-area");
  reportArea.innerHTML = "";

  const questionAndAnswerArrayOfObjects = getQuestionAndAnswerArrayOfObjects(
    state.userId,
  );

  questionAndAnswerArrayOfObjects.forEach((questionAndAnswerObject) => {
    if (questionAndAnswerObject.answer && questionAndAnswerObject.question) {
      const questionAndAnswerCard = createQuestionAndAnswerCard(
        questionAndAnswerObject,
      );
      reportArea.append(questionAndAnswerCard);
    }
  });

  if (state.userId && reportArea.innerHTML === "") {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "This user didn't listen to any songs.";
    reportArea.append(emptyMessage);
  }
}

window.onload = function () {
  populateUserSelect();
  addListeners();
};
