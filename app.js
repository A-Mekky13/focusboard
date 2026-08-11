const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");

const savedTasks = localStorage.getItem("focusboard.tasks");

if (savedTasks) {
    taskList.innerHTML = savedTasks;
}

updateTaskCount();

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const taskName = input.value.trim();

    if (!taskName) {
        return;
    }

    const taskItem = document.createElement("li");
    taskItem.textContent = taskName;
    taskList.appendChild(taskItem);

    input.value = "";
    updateTaskCount();
    saveTasks();
});

taskList.addEventListener("click", (event) => {
    const taskItem = event.target.closest("li");

    if (!taskItem) {
        return;
    }

    taskItem.classList.toggle("completed");
    updateTaskCount();
    saveTasks();
});

function updateTaskCount() {
    const count = taskList.querySelectorAll("li:not(.completed)").length;
    const label = count === 1 ? "task" : "tasks";
    taskCount.textContent = `${count} ${label} remaining`;
}

function saveTasks() {
    localStorage.setItem("focusboard.tasks", taskList.innerHTML);
}