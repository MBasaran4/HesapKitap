/**
 * Simulates an async delay for smooth UI feedback
 * @param {number} ms
 * @returns {Promise<void>}
 */
export const pause = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms));
