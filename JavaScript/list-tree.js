const data = [
 // 注意这里，专门把pid为1的元素放一个在前面
 { id: 2, name: '部门2', pid: 1 },
 { id: 1, name: '部门1', pid: 0 },
 { id: 3, name: '部门3', pid: 1 },
 { id: 4, name: '部门4', pid: 3 },
 { id: 5, name: '部门5', pid: 4 },
 { id: 7, name: '部门7', pid: 6 },
]

const arrayToTree = (list) => {
 const tree = []
 for(const node of list) {
  
 }
}

console.log(arrayToTree(data))