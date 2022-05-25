Object

在ECMAScript中，Object是一个特殊的对象。它本身是一个顶级对象，同时还是一个构造函数，可以通过它（如：new Object()） 来创建一个对象。我们可以认为JavaScript中所有的对象都是Object的一个实例，对象可以用字面量的方法 const obj = {} 即可声明。

Map

Map是Object的一个子类，可以有序保存任意类型的数据，使用键值对去存储，其中键可以存储任意类型，通过 const m = new Map(); 即可得到一个 map 实例。

访问：

map: 通过 map.get(key) 方法获取属性，不存在则返回 undefined

object：通过 obj.a 或者 obj['a'] 去访问一个属性，不存在则返回 undefined

赋值：

map: 通过 map.set 去设置一个值，key可以是任意类型

object: 通过 object.a = 1 或者 object['a'] = 1，去赋值，key只能是字符串，数字或symbol

删除：

map: 通过 map.delete 去删除一个值，试图删除一个不存在的属性会返回 false

object: 通过 delete 操作法才能删除对象的一个属性，即使不再存在该属性，删除也返回 true，当然可以通过 Reflect.deleteProperty(target, prop) 删除不存在的属性还是会返回 true。

var obj = {}; // undefined
delete obj.a // true

大小：

map: 通过 map.size 即可快速获取到内部元素的总个数

object: 需要通过 Object.keys 的转换才能将其转换为数组，再通过数组的 length 方法去获取或者使用 Reflect.ownKeys(obj) 也可以获取到 keys 的集合

迭代

map: 拥有迭代器，可以通过 for-of forEach 去直接迭代元素，且遍历顺序是确定的

object: 并没有实现迭代器，需要自行实现，不实现 只能通过for-in循环去迭代，遍历顺序是不确定的

使用场景：

1. 如果只需要简单的存储key-value的数据，并且key不需要存储复杂类型的，直接用对象
2. 如果该对象必须通过JSON转换的，则只能用对象，目前暂不支持Map
3. map的阅读性更好，所有操作都是通过api形式去调用，更有编程体验