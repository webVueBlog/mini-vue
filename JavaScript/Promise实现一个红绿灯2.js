const timeout = (ms) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
const red = () =>
  timeout(3000).then(() => {
    return "red";
  });
const yellow = () =>
  timeout(1000).then(() => {
    return "yellow";
  });
const green = () =>
  timeout(2000).then(() => {
    return "green";
  });

const light = (arr) => {
  arr
    .reduce(
      (pre, cur) => pre.then(cur).then((data) => console.log(data)),
      Promise.resolve()
    )
    .then(() => light(arr));
};

light([red, green, yellow]);

/**
 * 
async await 写法

function timer(color, delay) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      console.log(color);
      res();
    }, delay);
  });
}

async function light() {
  await timer("red", 3000);
  await timer("green", 2000);
  await timer("yellow", 1000);
  await light();
}

light();

 * 
 */





























