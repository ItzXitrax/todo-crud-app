// js/utils.js

/**
 * Genera un ID único basado en la fecha actual y un número aleatorio.
 * @returns {string} Un ID único.
 */
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}