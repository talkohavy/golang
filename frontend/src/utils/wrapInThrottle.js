function wrapInThrottle(fnToRun, milliseconds = 300) {
  let alreadyExecuting = false;

  return (...args) => {
    if (alreadyExecuting) return;

    fnToRun(...args); // execute the first one...

    alreadyExecuting = true;
    setTimeout(() => (alreadyExecuting = false), milliseconds);
  };
}

export { wrapInThrottle };
