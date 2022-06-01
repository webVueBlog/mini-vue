/**
 * 防抖
 * 	原理：事件被触发 wait 毫秒后执行回调 (fn)，如果在 wait 期间再次触发事件，则重新计时
 * @param { Function } fn 事件触发后的回调函数
 * @param { number } wait 延迟时间，wait 毫秒后执行 fn
 * 
 * @returns 返回经过包装后的事件处理函数
 */
function debounce(fn, wait = 50) {
	// 定时器，这里用到了 闭包
	let timer = null

	// 返回经过包装后的事件处理函数
	return function(...args) {
		// 如果 timer 为不为空，则说明在 wait 时间内已经触发过该事件了，而且事件处理函数仍然未被调用，
		// 说明在 wait 时间内事件被重复触发了，则需要进行防抖处理，即清除之前的定时器，这样上一次事件触发后的回调就不会被执行，
		// 定时器也会被重新设置
		if (timer) {
			clearTimeout(timer)
		}

		// 通过定时器来实现事件触发后在 wait 毫秒后执行事件处理函数
		timer = setTimeout(() => {
			// 需要给回调绑定上下文 this，即触发事件的目标对象
			fn.apply(this, args)
			timer = null
		}, wait)
	}
}
