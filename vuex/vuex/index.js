// 主文件的作用一般就是整合操作

import { Store, install } from './store';

export default {
    Store,
    install
}

export {
    Store,
    install
}

// 两种方式都可以 可以采用默认导入，也可以采用 解构使用