document.addEventListener("DOMContentLoaded", function(){
  const isPlainObject = obj =>
	Object.prototype.toString.call(obj) === '[object Object]';

  const isNullOrUndefined = value =>
    value === null || typeof value === 'undefined';

  const getDeepProperty = (sourceObject, path) => {
    if (!sourceObject) {
      throw new Error(`Provided object is not an object: ${JSON.stringify(sourceObject)}`);
    }
    if (!path) {
      throw new Error(`Provided path is empty: ${path}`);
    }
    const pathEntries = path.split('.');
    if (!isPlainObject(sourceObject) && pathEntries.length) {
      throw new Error(`cannot get property ${pathEntries[0]}, source is not an object: ${JSON.stringify(sourceObject)}`);
    }
    if (pathEntries.length === 1) {
      return sourceObject[pathEntries[0]];
    }
    const nextPathEntry = pathEntries.shift();
    const newPath = pathEntries.join('.');
    if (isNullOrUndefined(sourceObject[nextPathEntry])) {
      throw new Error(`field ${nextPathEntry} not found in object ${JSON.stringify(sourceObject)}}`);
    }
    return getDeepProperty(sourceObject[nextPathEntry], newPath);
  }

  const button = document.getElementById('run');
  button.addEventListener('click', () => {
    const inputPath = document.getElementById('path').value;
    const inputObject = document.getElementById('object').value.replace(/\n/g, "");
    const errorContainer = document.getElementById('error');
    const resultContainer = document.getElementById('result');
    try {
      const result = getDeepProperty(JSON.parse(inputObject), inputPath);
      resultContainer.innerHTML = JSON.stringify(result);
      errorContainer.innerHTML = '';
    } catch(error) {
      errorContainer.innerHTML = error;
      resultContainer.innerHTML = '';
    }
  });
});
