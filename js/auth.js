// js/auth.js

const AUTH_STORAGE_KEY = 'todo-app-isLoggedIn';

/**
 * Simula el inicio de sesión de un usuario.
 * @param {string} username - El nombre de usuario.
 * @param {string} password - La contraseña.
 * @returns {boolean} `true` si las credenciales son correctas, `false` en caso contrario.
 */
function login(username, password) {
    // En una app real, esto sería una llamada a una API.
    // Aquí, usamos credenciales hardcodeadas por simplicidad.
    if (username === 'user' && password === 'pass123') {
        localStorage.setItem(AUTH_STORAGE_KEY, 'true');
        return true;
    }
    return false;
}

/**
 * Cierra la sesión del usuario.
 */
function logout() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Verifica si el usuario ha iniciado sesión.
 * @returns {boolean} `true` si el usuario está logueado.
 */
function isLoggedIn() {
    return localStorage.getItem(AUTH_STORAGE_KEY) === 'true';
}