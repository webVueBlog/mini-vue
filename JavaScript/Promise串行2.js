
const arr = [
  () => new Promise((resolve) => setTimeout(() => resolve(1), 3000)),
  () => new Promise((resolve) => setTimeout(() => resolve(2), 2000)),
  () => new Promise((resolve) => setTimeout(() => resolve(3), 1000)),
];

function mergePromise(ajaxArray) {
  let result = [];
  return new Promise((resolve) => {
    ajaxArray
      .reduce(
        (pre, cur) =>
          pre.then(cur).then((data) => {
            result.push(data);
          }),
        Promise.resolve()
      )
      .then(() => {
        resolve(result);
      });
  });
}

mergePromise(arr).then((data) => console.log(data));

