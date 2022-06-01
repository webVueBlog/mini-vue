const concurrentRequest = require('./index')

/**
 * 任务
 * @param { Number } timeout 每个任务的执行时间
 * @returns 
 */
const task = (timeout) =>
  new Promise((resolve) => {
    console.log('start', timeout);
    return setTimeout(() => {
      resolve(timeout);
      console.log('end', timeout);
    }, timeout);
  });

// 每个任务的执行时间
const taskList = [1000, 2000, 3000, 4000, 5000, 6000, 7000];

// 构建任务数组
const tasks = taskList.map((v) => () => task(v));

// 并发请求
const reqRet = concurrentRequest(tasks, 3)

// 并发请求的结果
reqRet.then((res) => {
    console.log('并发请求的执行结果 = ', res)
})