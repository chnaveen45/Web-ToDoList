
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const errorMessage = document.getElementById("errorMessage");

addButton.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (taskText !== "") {
    errorMessage.style.display = "none";
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <span>${taskText}</span>
      <button class="deleteButton">Delete</button>
      <button class="editButton">Edit</button>
    `;
    taskList.appendChild(listItem);
    taskInput.value = "";

    const deleteButton = listItem.querySelector(".deleteButton");
    deleteButton.addEventListener("click", () => {
      listItem.remove();
    });

    const editButton = listItem.querySelector(".editButton");
    editButton.addEventListener("click", () => {
      const taskTextSpan = listItem.querySelector("span");
      const taskText = taskTextSpan.textContent;
      const editInput = document.createElement("input");
      editInput.value = taskText;
      listItem.replaceChild(editInput, taskTextSpan);
      editButton.style.display = "none";

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.classList.add("saveButton");
      listItem.appendChild(saveButton);

      saveButton.addEventListener("click", () => {
        const newTaskText = editInput.value.trim();
        if (newTaskText !== "") {
          const newTaskTextSpan = document.createElement("span");
          newTaskTextSpan.textContent = newTaskText;
          listItem.replaceChild(newTaskTextSpan, editInput);
          listItem.removeChild(saveButton);
          editButton.style.display = "inline-block";
        } else {
          listItem.replaceChild(taskTextSpan, editInput);
          listItem.removeChild(saveButton);
          editButton.style.display = "inline-block";
        }
      });
    });
  } else {
    errorMessage.style.display = "block";
  }
});