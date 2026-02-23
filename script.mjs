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
    // add rendering function here
  });
}

window.onload = function () {
  populateUserSelect();
  addListeners();
};
