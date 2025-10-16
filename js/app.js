const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const STORAGE_KEY = 'todoListTasks';

function saveTasks() {
    const tasks = [];
    taskList.querySelectorAll('li').forEach(li => {
        const text = li.textContent.trim();
        const isCompleted = li.classList.contains('completed');

        tasks.push(`${text}::${isCompleted ? 'true' : 'false'}`);
    });
    
    const dataString = tasks.join('||');
    localStorage.setItem(STORAGE_KEY, dataString);
}
function loadTasks() {
    const dataString = localStorage.getItem(STORAGE_KEY);
    if (!dataString) return;

    taskList.innerHTML = '';

    const taskStrings = dataString.split('||').filter(s => s.trim() !== '');

    taskStrings.forEach(taskString => {
        const parts = taskString.split('::');
        if (parts.length === 2) {
            const [text, status] = parts;
            const isCompleted = status === 'true';
            createTaskElement(text, isCompleted);
        }
    });
}

function createTaskElement(text, isCompleted = false) {
    const li = document.createElement('li');
    li.textContent = text;
    
    if (isCompleted) {
        li.classList.add('completed');
    }

    li.addEventListener('click', () => {
        li.classList.toggle('completed');
        saveTasks(); 
    });

    taskList.appendChild(li);
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("¡No puedes agregar una tarea vacía!");
        return;
    }

    createTaskElement(taskText, false); // Crea el elemento como no completado
    saveTasks(); // Guarda la nueva lista
    
    taskInput.value = ''
    taskInput.focus(); 
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        addTask();
    }
});

document.addEventListener('DOMContentLoaded', loadTasks);