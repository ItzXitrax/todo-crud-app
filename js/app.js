// js/app.js

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('app-container');

    // --- FUNCIONES DE RENDERIZADO DE VISTAS ---

    /**
     * Carga y muestra la vista de login.
     */
    async function renderLoginView() {
        const response = await fetch('components/login.html');
        appContainer.innerHTML = await response.text();
        
        // Agregar manejador de eventos para el formulario de login
        const loginForm = document.getElementById('login-form');
        loginForm.addEventListener('submit', handleLogin);
    }

    /**
     * Carga y muestra la vista del dashboard.
     */
    async function renderDashboardView() {
        const response = await fetch('components/dashboard.html');
        appContainer.innerHTML = await response.text();

        // Agregar manejadores de eventos para el dashboard
        const logoutBtn = document.getElementById('logout-btn');
        logoutBtn.addEventListener('click', handleLogout);

        const addTaskForm = document.getElementById('add-task-form');
        addTaskForm.addEventListener('submit', handleAddTask);
        
        const taskList = document.getElementById('task-list');
        taskList.addEventListener('click', handleTaskListClick);

        // Renderizar las tareas existentes
        renderTasks();
    }

    /**
     * Renderiza la lista de tareas en el DOM.
     */
    function renderTasks() {
        const taskList = document.getElementById('task-list');
        if (!taskList) return;

        const tasks = getTasks();
        taskList.innerHTML = ''; // Limpiar la lista antes de renderizar

        if (tasks.length === 0) {
            taskList.innerHTML = '<p>¡No hay tareas! Añade una para empezar.</p>';
            return;
        }

        tasks.forEach(task => {
            const taskElement = document.createElement('li');
            taskElement.className = `task-item ${task.completed ? 'completed' : ''}`;
            taskElement.dataset.id = task.id;

            taskElement.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="btn btn-danger btn-sm delete-btn">Eliminar</button>
                </div>
            `;
            taskList.appendChild(taskElement);
        });
    }

    // --- MANEJADORES DE EVENTOS ---

    /**
     * Maneja el envío del formulario de login.
     */
    function handleLogin(event) {
        event.preventDefault();
        const username = event.target.username.value;
        const password = event.target.password.value;
        const errorElement = document.getElementById('login-error');

        if (login(username, password)) {
            renderDashboardView();
        } else {
            errorElement.textContent = 'Usuario o contraseña incorrectos.';
        }
    }

    /**
     * Maneja el clic en el botón de logout.
     */
    function handleLogout() {
        logout();
        renderLoginView();
    }

    /**
     * Maneja el envío del formulario para agregar una nueva tarea.
     */
    function handleAddTask(event) {
        event.preventDefault();
        const taskInput = document.getElementById('new-task-input');
        const taskText = taskInput.value.trim();

        if (taskText) {
            addTask(taskText);
            taskInput.value = '';
            renderTasks();
        }
    }
    
    /**
     * Maneja los clics dentro de la lista de tareas (delegación de eventos).
     */
    function handleTaskListClick(event) {
        const target = event.target;
        const taskItem = target.closest('.task-item');
        if (!taskItem) return;
        
        const taskId = taskItem.dataset.id;
        
        // Si se hace clic en el botón de eliminar
        if (target.classList.contains('delete-btn')) {
            deleteTask(taskId);
            renderTasks();
        }
        // Si se hace clic en el texto de la tarea (para completarla/descompletarla)
        else if (target.classList.contains('task-text')) {
            const task = getTasks().find(t => t.id === taskId);
            if (task) {
                updateTask(taskId, { completed: !task.completed });
                renderTasks();
            }
        }
    }

    // --- INICIALIZACIÓN DE LA APP ---

    /**
     * Función principal que inicia la aplicación.
     */
    function init() {
        if (isLoggedIn()) {
            renderDashboardView();
        } else {
            renderLoginView();
        }
    }

    // Iniciar la aplicación
    init();
});