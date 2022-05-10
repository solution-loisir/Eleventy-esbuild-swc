function debounce(callback, delay = 250) {
  let debounceTimer;

  return function(...args) {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => callback.apply(null, args), delay);
  }
}

export {
  debounce
}