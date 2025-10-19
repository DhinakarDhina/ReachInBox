export function startTimer(callback: () => void, delay: number) {
    const timerId = setTimeout(() => {
        callback();
        clearTimeout(timerId);
    }, delay);
}

export function startInterval(callback: () => void, interval: number) {
    return setInterval(callback, interval);
}

export function stopInterval(timerId: NodeJS.Timeout) {
    clearInterval(timerId);
}