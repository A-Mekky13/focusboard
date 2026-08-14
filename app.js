const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");
const taskFilters = document.querySelector("#task-filters");
const clearCompletedButton = document.querySelector("#clear-completed");

let currentFilter = "all";

const savedTasks = localStorage.getItem("focusboard.tasks");

if (savedTasks) {
    taskList.innerHTML = savedTasks;
}

updateTaskCount();

taskFilters.querySelector('[data-filter="all"]').classList.add("active");
filterTasks();

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

    filterTasks();
});

taskList.addEventListener("click", (event) => {
    const taskItem = event.target.closest("li");

    if (!taskItem) {
        return;
    }

    taskItem.classList.toggle("completed");
    updateTaskCount();
    saveTasks();

    filterTasks();
});

taskFilters.addEventListener("click", (event) => {
    const filterButton = event.target.closest("[data-filter]");

    if (!filterButton) {
        return;
    }

    currentFilter = filterButton.dataset.filter;

    taskFilters.querySelectorAll("[data-filter]").forEach((button) => {
        button.classList.toggle("active", button === filterButton);
    });

    filterTasks();
});

clearCompletedButton.addEventListener("click", () => {
    taskList.querySelectorAll("li.completed").forEach((taskItem) => {
        taskItem.remove();
    });

    updateTaskCount();
    saveTasks();
    filterTasks();
});

function filterTasks() {
    taskList.querySelectorAll("li").forEach((taskItem) => {
        const isCompleted = taskItem.classList.contains("completed");

        taskItem.hidden =
            (currentFilter === "active" && isCompleted) ||
            (currentFilter === "completed" && !isCompleted);
    });
}

function updateTaskCount() {
    const count = taskList.querySelectorAll("li:not(.completed)").length;
    const label = count === 1 ? "task" : "tasks";
    taskCount.textContent = `${count} ${label} remaining`;
}

function saveTasks() {
    localStorage.setItem("focusboard.tasks", taskList.innerHTML);
}

input.focus();