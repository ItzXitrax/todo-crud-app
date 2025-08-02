// js/api.js

const TASKS_STORAGE_KEY = 'todo-app-tasks';

/**
 * Obtiene todas las tareas desde localStorage.
 * @returns {Array} Un array de objetos de tarea.
 */
function getTasks() {
    const tasks = localStorage.getItem(TASKS_STORAGE_KEY);
    return tasks ? JSON.parse(tasks) : [];
}

/**
 * Guarda el array de tareas en localStorage.
 * @param {Array} tasks - El array de tareas a guardar.
 */
function saveTasks(tasks) {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
}

/**
 * Agrega una nueva tarea.
 * @param {string} text - El texto de la nueva tarea.
 * @returns {Object} La tarea recién creada.
 */
function addTask(text) {
    const tasks = getTasks();
    const newTask = {
        id: generateId(),
        text: text,
        completed: false,
        createdAt: new Date().toISOString()
    };
    tasks.push(newTask);
    saveTasks(tasks);
    return newTask;
}

/**
 * Actualiza una tarea existente.
 * @param {string} taskId - El ID de la tarea a actualizar.
 * @param {Object} updates - Un objeto con las propiedades a actualizar (e.g., { text: 'nuevo texto', completed: true }).
 */
function updateTask(taskId, updates) {
    let tasks = getTasks();
    tasks = tasks.map(task => 
        task.id === taskId ? { ...task, ...updates } : task
    );
    saveTasks(tasks);
}

/**
 * Elimina una tarea por su ID.
 * @param {string} taskId - El ID de la tarea a eliminar.
 */
function deleteTask(taskId) {
    let tasks = getTasks();
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
}