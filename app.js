const form = document.querySelector("#task-form");
const input = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");
const taskCount = document.querySelector("#task-count");

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
});

function updateTaskCount() {
    const count = taskList.children.length;
    const label = count === 1 ? "task" : "tasks";
    taskCount.textContent = `${count} ${label} remaining`;
}