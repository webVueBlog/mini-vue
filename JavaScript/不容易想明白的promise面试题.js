Promise.resolve()
 .then(() => {
  console.log(0);
  return Promise.resolve(4);
  // return Promise.resolve(4).then(res => res)
  // return 4 // 0 1 (第一轮) 4 2 3 5 6 // Promise.resolve(4)
 })
 .then(res => {
  console.log(res);
 });
// .then同步 回调函数才是异步的

Promise.resolve()
 .then(() => {
  console.log(1);
  // return undefined // Promise.resolve(undefined)
 })
 .then(() => {
  console.log(2);
 })
 .then(() => {
  console.log(3);
 })
 .then(() => {
  console.log(5);
 })
 .then(() => {
  console.log(6);
 })

// 0
// 1  //return Promise.resolve(4)
// 2
// 3
// 4
// 5
// 6