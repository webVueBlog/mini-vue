/**
 * 节流
 * 	原理：事件被频繁触发时，事件回调函数会按照固定频率执行，比如 1s 执行一次，只有上个事件回调被执行之后下一个事件回调才会执行
 * 
 * @param {*} fn 事件回调函数
 * @param {*} wait 事件回调的执行频率，每 wait 毫秒执行一次
 */
function throttle(fn, wait = 500) {
	let timer = null

	// 经过包装的事件处理函数
	return function(...args) {
		// 如果 timer 不为空，说明事件被触发了，但是回调还没有执行
		if (timer) return

		timer = setTimeout(() => {
			// 需要给回调绑定上下文 this，即触发事件的目标对象
			fn.apply(this, args)
			timer = null
		}, wait)
	}
}