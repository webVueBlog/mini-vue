


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
