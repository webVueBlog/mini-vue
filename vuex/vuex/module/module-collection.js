import { forEach } from "../util";
import Module from "./modules";

export default class ModuleCollection {
    constructor(options) {
        // 注册模块 递归模块 根模块
        // console.log(options)；
        this.register([], options);
    }
    register(path, rootModule) {
        // ast语法树解析一样
        let newModule = new Module();

        // {
        //     _raw: rootModule,
        //     _children: {},
        //     state: rootModule.state
        // }

        if (path.length == 0) {
            this.root = newModule
        } else {
            let parent = path.slice(0, -1).reduce((memo, current) => { // memo 当前 root
                // return memo._children[current]

                return memo.getChild(current)
            }, this.root);

            parent.addChild(path[path.length - 1], newModule);

            // parent._children[path[path.length - 1]] = newModule
        }
        if (rootModule.modules) {
            // 如果有modules 说明有子模块
            forEach(rootModule.modules, (module, moduleName) => {
                this.register([...path, moduleName], module);
            });
        }
    }
}

// 格式化树结构

// this.root = {
//     _raw: xxx,
//     _children: {
//         a: {
//             _raw: xxx,
//             state: a.state
//         },
//         b: {
//             _raw: xxx,
//             _children: {

//             },
//             state: b.state
//         }
//     },
//     state: xxx.state
// }