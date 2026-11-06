
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskSubject = document.getElementById("taskSubject");
const taskDeadline = document.getElementById("taskDeadline");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");

const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = [];
let currentFilter = "all";

function renderTasks() {
    taskList.innerHTML = "";

    const filteredTasks = tasks.filter(task => {
        if (currentFilter === "pending") {
            return !task.completed;
        }

        if (currentFilter === "completed") {
            return task.completed;
        }

        return true;
    });

    emptyMessage.style.display =
        filteredTasks.length === 0 ? "block" : "none";

    filteredTasks.forEach(task => {
        const card = document.createElement("div");
        card.className = "task-card";

        if (task.completed) {
            card.classList.add("completed");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        checkbox.addEventListener("change", () => {
            task.completed = checkbox.checked;
            renderTasks();
        });

        const info = document.createElement("div");
        info.className = "task-info";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + (task.subject || "General");

        const deadline = document.createElement("p");
        deadline.textContent = task.deadline
            ? "Deadline: " + task.deadline
            : "No deadline";

        info.appendChild(title);
        info.appendChild(subject);
        info.appendChild(deadline);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            tasks = tasks.filter(item => item.id !== task.id);
            renderTasks();
        });

        card.appendChild(checkbox);
        card.appendChild(info);
        card.appendChild(deleteButton);

        taskList.appendChild(card);
    });

    totalTasks.textContent = tasks.length;

    completedTasks.textContent =
        tasks.filter(task => task.completed).length;

    pendingTasks.textContent =
        tasks.filter(task => !task.completed).length;
}

taskForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = taskTitle.value.trim();

    if (title === "") {
        return;
    }

    const task = {
        id: Date.now(),
        title: title,
        subject: taskSubject.value.trim(),
        deadline: taskDeadline.value,
        completed: false
    };

    tasks.push(task);

    taskForm.reset();
    renderTasks();
});

document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
        renderTasks();
    });
});

renderTasks();
