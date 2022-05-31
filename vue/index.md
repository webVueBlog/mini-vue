文件结构分析
src目录：
compiler： 编译相关模块，也就是template模板转换为render函数的地方；

core： 核心模块，vue的初始化、整个生命周期都在这里实现；

platforms： 平台化模块，分为web和weex，而我们只需要关注web即可；

server： 服务端渲染模块，我们可以无需关注；

sfc： 对单文件组件的处理模块。同样，无需关注；

shared： 一些公用的工具方法。

总结来说，在上述的文件中，我们需要重点关注的只有：compiler、core、platforms、shared。

compiler文件
整个compiler的核心作用就是生成render函数。而在该模块中的重点逻辑为 HTMLParser、parse、optimization、generate。在该文件中，会存在大量的高阶函数，在阅读该模块代码的时候也是以充分学习到函数式编程的思想。以下是对几个核心文件的简单介绍：

codengen： 主要功能是用AST生成render函数字符串；

directives： 存放一些指令的处理逻辑，如v-bind、v-model、v-on等；

parser： 主要功能是将template模板编译为AST；

index： compiler的入口文件；

optimizer： 用来对AST做一些剪枝操作的标记处理，会在codengen和vnode的patch中用到；

to-function： 将codengen生成的render函数字符串用new Function的方式最终生成render函数。

core文件
core模块为整个vue的核心模块，其中几乎包含了vue的所有核心内容。如vue实例化的选项合并，data、computed等属性的初始化，Watcher、Observer的实现、vue实例的挂载等等。内容很多，因此我们需要重点分析该模块：

components： 名称取的比较让人迷惑，但其实他并不是组件创建或更新相关的模块，在其内部只存在一个keep-alive；

glodbal-api： 存在一些全局api，如extend、mixin等等，也包括assets属性（component、directive）的初始化逻辑；

instance： core模块中的核心，也是整个vue初始化的地方。包括了各种属性、事件的初始化，以及钩子函数的调用。其中的index文件，就是vue构造函数所在。而其他的文件，就像是一个个工厂，对vue进行层层加工，即初始化参数、初始化属性和方法等等；

observer： 响应式的实现所在，也就是数据劫持、依赖添加的具体逻辑实现。在我之前的博客中经常说到的Watcher、Dep、Observer都存放在这个文件中；

util： 工具文件。各种工具函数的所在。其中nextTick函数就存放在这儿；

vdom： 也就是虚拟DOM（vonde）相关内容模块。包括普通节点vnode、component vnode、functional component等的初始化、patch函数等等。

paltforms文件和shared文件
paltforms文件的逻辑不多，也不复杂。其中最主要的就是改写mount函数、合并一些初始化选项、做一些差异化的处理，如属性和指令等。大家可以只关注web相关的内容即可。

shared文件用来存放一些共享的工具函数（我个人最喜欢cache函数就放在这里）。