// 测试
const data = [
 {
   "id": 1,
   "name": "部门1",
   "pid": 0,
   "children": [
     {
       "id": 2,
       "name": "部门2",
       "pid": 1,
       "children": []
     },
     {
       "id": 3,
       "name": "部门3",
       "pid": 1,
       "children": [
         {
           "id": 4,
           "name": "部门4",
           "pid": 3,
           "children": [
             {
               "id": 5,
               "name": "部门5",
               "pid": 4,
               "children": []
             }
           ]
         }
       ]
     }
   ]
 }
]


/*
[ 
 { id: 1, name: '部门1', pid: 0 },
 { id: 2, name: '部门2', pid: 1 },
 { id: 3, name: '部门3', pid: 1 },
 { id: 4, name: '部门4', pid: 3 },
 { id: 5, name: '部门5', pid: 4 } 
]
*/

// 广度遍历
// const tree2list = (data) => {
//  const ans = [];
//  const queue = [...data]
//  while(queue.length) {
//   const node = queue.shift()
//   const children = node.children
//   if(children) {
//    queue.push(...children)
//   }
//   delete node.children
//   ans.push(node)
//  }
//  console.log(ans, 'ans')
//  return ans
// }

const tree2list = (tree) => {
 const list = []
 const stack = [...tree]
 while(stack.length) {
  const node = stack.pop()
  const children = node.children
  if(children) {
   stack.push(...children)
  }
  delete node.children
  list.push(node)
 }
 console.log('list', list)
 return list
}

tree2list(data)