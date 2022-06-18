借鉴Promise原理实现题目

```js
// https://juejin.cn/post/6865962560363167758
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => console.log("c"))]);

createFlow([
  () => console.log("a"),
  () => console.log("b"),
  subFlow,
  [() => delay(1000).then(() => console.log("d")), () => console.log("e")],
]).run(() => {
  console.log("done");
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印

const createFlow = (list) => {
  const sources = [...list]?.flat();
  const run = async function(callback){
        for(let i = 0 ; i < sources.length ; i++){
           if(sources[i]?.run) { 
               await sources[i].run();
         } else{
              await sources[i]?.();
            }
         }
  	callback?.()
  }
 return {
      sources,
      run
    }
}
```



