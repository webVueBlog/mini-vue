## 2293

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var minMaxGame = function(nums) {
    const n = nums.length;
    if (n === 1) return nums[0];
    
    const newNums = nums.reduce((arr, _, i) => {
        const isEven = i % 2 === 0;
        if (i < n / 2) {
            const [curr, next] = [nums[i * 2], nums[i * 2 + 1]]
            const num = isEven ? Math.min(curr, next) : Math.max(curr, next);
            arr[i] = num;
        }
        
        return arr;
    }, []);
    
    return minMaxGame(newNums);
};
```

## 2294

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var partitionArray = function(nums, k) {
    nums.sort((a, b) => a - b);
    let prev = nums.shift();
    
    return nums.reduce((cnt, num) => {
        if (num - prev > k) {
            cnt++;
            prev = num;
        }
        
        return cnt;
    }, 1)
};
```

## 2295

```js
/**
 * @param {number[]} nums
 * @param {number[][]} operations
 * @return {number[]}
 */
var arrayChange = function(nums, operations) {
    const map = {};
    
    nums.forEach((num, i) => map[num] = i);
    
    for (const [a, b] of operations) {
        const pos = map[a];
        nums[pos] = b;
        map[nums[pos]] = pos;
    }
    
    return nums;
};
```

## 2299

```js
/**
 * @param {string} password
 * @return {boolean}
 */
var strongPasswordCheckerII = function(password) {
    let [lower, upper, digit, special] = new Array(4).fill(false);
    
    for (let i = 0; i < password.length; i++) {
        if (password[i] === password[i - 1]) return false;
        
        const curr = password[i];
        if (curr >= 'a' && curr <= 'z') lower = true;
        if (curr >= 'A' && curr <= 'Z') upper = true;
        if (curr >= '0' && curr <= '9') digit = true;
        if ('!@#$%^&*()-+'.includes(curr)) special = true;
    }
    
    return password.length >= 8 && lower && upper && digit && special;
};
```

## 2300

```js
/**
 * @param {number[]} spells
 * @param {number[]} potions
 * @param {number} success
 * @return {number[]}
 */
var successfulPairs = function(spells, potions, success) {
    potions.sort((a, b) => a - b);
    
    return spells.map(spell => spell = numberOfSuccess(spell, success, potions))
};

const numberOfSuccess = (num, target, arr = []) => {
    let [left, right] = [0, arr.length - 1];
    
    while (left <= right) {
        const mid = (left + right) >>> 1;
        if (arr[mid] * num >= target) right = mid - 1;
        else left = mid + 1;
    }
    
    return arr.length - left;
}
```

## 2302

```js
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countSubarrays = function(nums, k) {
    let [left, right, sum, res] = new Array(4).fill(0);
    
    while (right < nums.length) {
        sum += nums[right];
        while (sum * (right - left + 1) >= k) sum -= nums[left++];
        
        res += (right - left + 1);
        right++;
    }
    
    return res;
};
```

## 2303

```js
/**
 * @param {number[][]} brackets
 * @param {number} income
 * @return {number}
 */
var calculateTax = function(brackets, income) {
    let sum = 0;
    
    for (let i = 0; i < brackets.length; i++) {
        const prevUpper = brackets[i - 1]?.[0];
        let [upper, percent] = brackets[i];
        upper = upper > income ? income : upper;
        if (upper < prevUpper) break;
        
        sum += (upper - (prevUpper || 0)) * percent / 100;
    }
    
    return !income ? 0 : sum;
};
```

## 2304

```js
/**
 * @param {number[][]} grid
 * @param {number[][]} moveCost
 * @return {number}
 */
var minPathCost = function(grid, moveCost) {
    const [m, n] = [grid.length, grid[0].length];
    const visited = Array.from({ length: m }, () => new Array(n).fill(Number.MAX_VALUE));
    const pq = new MinPriorityQueue({ priority: x => x[0] });
    
    for (let j = 0; j < n; j++)
        pq.enqueue([grid[0][j], 0, j]);
    
    while (!pq.isEmpty()) {
        const [cost, x, y] = pq.dequeue().element;
        if (x === m - 1) return cost;
        
        for (let dy = 0; x + 1 < m && dy < n; dy++) {
            const dx = grid[x][y];
            const newCost = cost + moveCost[dx][dy] + grid[x + 1][dy];
            if (newCost < visited[x + 1][dy]) {
                visited[x + 1][dy] = newCost;
                pq.enqueue([newCost, x + 1, dy]);
            }
        }
    }
    
    return -1;
};
```

## 2305

```js
/**
 * @param {number[]} cookies
 * @param {number} k
 * @return {number}
 */
var distributeCookies = function(cookies, k) {
    const children = new Array(k).fill(0);
    let ans = Number.MAX_VALUE;
    
    const backtrack = (cookies, k, start = 0) => {
        if (start === cookies.length) return ans = Math.min(ans, Math.max(...children));
        
        for (let i = 0; i < k; i++) {
            children[i] += cookies[start];
            backtrack(cookies, k, start + 1);
            children[i] -= cookies[start];
            
            if (!children[i]) break;
        }
    }
    
    backtrack(cookies, k, 0);
    
    return ans;
};
```

## 2309

```js
/**
 * @param {string} s
 * @return {string}
 */
var greatestLetter = function(s) {
    const set = new Set(s);
    
    for (let i = 90; i >= 65; --i) {
        const upper = String.fromCharCode(i);
        const lower = String.fromCharCode(i + 32);
        if (set.has(upper) && set.has(lower)) return upper;
    }
    
    return '';
};
```

## 2310

```js
/**
 * @param {number} num
 * @param {number} k
 * @return {number}
 */
var minimumNumbers = function(num, k) {
    if (!num) return 0;
    
    for (let i = 1; i <= 10 && i * k <= num; i++) {
        if (i * k % 10 === num % 10) return i;
    }
    
    return -1;
};
```

## 2311

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var longestSubsequence = function(s, k) {
    let [cnt, val, pow] = [0, 0, 1];
    
    for (let i = s.length - 1; i >= 0 && val + pow <= k; i--) {
        if (s[i] === '1') {
            cnt++;
            val += pow;
        }
        
        pow <<= 1;
    }
    
    return s.replace(/1/g, '').length + cnt;
};
```