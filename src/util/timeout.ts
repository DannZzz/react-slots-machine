export function createTimeout(cb: (...args: any[]) => any, ms: number = 2000) {
  const timeout = setTimeout(() => {
    cb();
    clearTimeout(timeout);
  }, ms);
}
