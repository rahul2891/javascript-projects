document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addTaskBtn = document.getElementById('add-task-btn');
    const todoList = document.getElementById('todo-list');
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');
    const progressBar = document.getElementById('progress-bar');

    let tasks = JSON.parse(localStorage.getItem('task')) || [];

    tasks.forEach(task => renderTask(task));

    addTaskBtn.addEventListener('click', () => {
        const taskText = todoInput.value.trim();
        if (!taskText) return;

        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };

        if (taskText.length > 0) {
            tasks.push(newTask);
            saveTasks();
            renderTask(newTask);
            todoInput.value = '';
            showNotification('Task added successfully');
        }
    });

    function renderTask(task) {
        const li = document.createElement('li');
        li.setAttribute('data-id', task.id);
        if (task.completed) li.classList.add('completed');
        li.innerHTML = `
            <span class="task-text">${task.text}</span>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">Delete</button>
        `;
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.completed = !task.completed;
            li.classList.toggle('completed');
            saveTasks();
        });

        li.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            saveTasks();
            renderTasks();
            showNotification('Task deleted successfully');
        });

        li.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const taskTextElement = li.querySelector('.task-text');
            const currentText = taskTextElement.textContent;
            const input = document.createElement('input');
            input.type = 'text';
            input.value = currentText;
            li.replaceChild(input, taskTextElement);

            input.addEventListener('blur', () => {
                task.text = input.value.trim();
                if (task.text.length > 0) {
                    taskTextElement.textContent = task.text;
                    li.replaceChild(taskTextElement, input);
                    saveTasks();
                } else {
                    tasks = tasks.filter(t => t.id !== task.id);
                    li.remove();
                    saveTasks();
                    renderTasks();
                }
            });

            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    input.blur();
                }
            });

            input.focus();
        });

        todoList.appendChild(li);
    }

    function renderTasks() {
        todoList.innerHTML = ''; // Clear the list
        tasks.forEach(task => renderTask(task)); // Render all tasks
    }

    function saveTasks() {
        localStorage.setItem('task', JSON.stringify(tasks));
    }

    function showNotification(message) {
        notificationText.textContent = message;
        notification.classList.add('show');
        progressBar.classList.remove('progress'); // Reset progress bar
        setTimeout(() => {
            progressBar.classList.add('progress'); // Start progress bar
        }, 10); // Slight delay to trigger the transition

        setTimeout(() => {
            notification.classList.remove('show');
            progressBar.classList.remove('progress');
        }, 1010); // Ensure this timeout is slightly longer than the progress bar duration
    }
});