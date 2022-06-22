## 实现一个calculate

```js
class Calculate {
  constructor(value) {
 
  }
  add(value) {

  }
  subtract(value) {
   
  }
  result() {
   
  }
}

const cal = new Calculate(50);
console.log(cal.add(1).subtract(5).add(1000).subtract(5000).result()); 
结果是-3954

```

1. 加一  状态变为 Calculate { value: 51, state: 'pending' }
2. 减5  Calculate { value: 46, state: 'pending' }
3. 加1000 Calculate { value: 1046, state: 'pending' }
4. 减5000  Calculate { value: -3954, state: 'pending' }
5. -3954

答案：
```js
class Calculate {
  constructor(value) {
    this.value = value;
    this.state = "pending";
  }
  add(value) {
    if (this.state === "pending") {
      return new Calculate(value + this.value);
    } else {
      throw "error";
    }
  }
  subtract(value) {
    if (this.state === "pending") {
      return new Calculate(this.value - value);
    } else {
      throw "error";
    }
  }
  result() {
    this.state = "success";
    return this.value;
  }
}

const cal = new Calculate(50);
console.log(cal.add(1).subtract(5).add(1000).subtract(5000).result());

```

```js

class Calculate {
    constructor(value) {
        this.value = value
        this.state = 'pending'
    }
    add(value) {
        if (this.state === 'pending') {
            this.value += value
            return this
        } else {
            throw error
        }
    }
    substract(value) {
        if (this.state === 'pending') {
            this.value -= value
            return this
        } else {
            throw error
        }
    }
    result() {
        this.state = 'success'
        return this.value
    }
}

const cal = new Calculate(50);
let sum = cal.add(1).substract(5).add(1000).substract(5000).result()
console.log(sum);
```


```js
class Calculate {
    static PENDING = 'pending';
    static FULFILLED = 'success';
    constructor(value) {
        this.value = value;
        this.state = Calculate.PENDING
    }
    add(value) {
        if(this.state === Calculate.PENDING) {
           return new Calculate(this.value + value) 
        }else{
            throw new Error('state error')
        }
    }
    substract(value) {
        if(this.state === Calculate.PENDING) {
            return new Calculate(this.value - value) 
         }else{
             throw new Error('state error')
         }
    }
    result() {
        this.state = Calculate.FULFILLED
        return this.value
    }
  }
  
  const cal = new Calculate(50);
  console.log(cal.add(1).substract(5).add(1000).substract(5000).result()); 
//   结果是-3954
```


