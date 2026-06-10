const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load tasks when page opens
document.addEventListener("DOMContentLoaded", loadTasks);

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    createTaskElement(taskText, false);
    saveTask(taskText, false);

    taskInput.value = "";
}

function createTaskElement(taskText, completed) {
    const li = document.createElement("li");

    if (completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${taskText}</span>
        <button class="delete-btn">Delete</button>
    `;

    const taskSpan = li.querySelector("span");

    taskSpan.addEventListener("click", () => {
        li.classList.toggle("completed");
        updateLocalStorage();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
        li.remove();
        updateLocalStorage();
    });

    taskList.appendChild(li);
}

function saveTask(taskText, completed) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskText,
        completed: completed
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        createTaskElement(task.text, task.completed);
    });
}

function updateLocalStorage() {
    let tasks = [];

    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.querySelector("span").textContent,
            completed: li.classList.contains("completed")
        });
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Add task by pressing Enter
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTask();
    }
});