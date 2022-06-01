const EventBus = require('./index')

/**
 * 示例
 */
const eventBus = new EventBus()

eventBus.$on('test', function () {
    console.log('trigger test')
})

// 后输出 trigger test
eventBus.$emit('test')