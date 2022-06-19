/*
 * @lc app=leetcode.cn id=2306 lang=javascript
 *
 * [2306] 公司命名
 */

// @lc code=start
/**
 * @param {string[]} ideas
 * @return {number}
 */
const acode = 'a'.charCodeAt()
const distinctNames = ideas => {
    
    const ideaTails = Array.from(
        {length: 26}, 
        () => new Set()
    )
    ideas.forEach( idea => 
      ideaTails[ idea[0].charCodeAt() - acode ]
        .add( idea.slice(1) ) 
     )
    
    let tot = 0
    for ( let i = 0; i < 26; i++ ) {
        for ( let j = i+1; j < 26; j++ ) {
            let common = 0
            
            ideaTails[i].forEach( tail => 
                ideaTails[j].has( tail ) 
                && common++ 
            )

            tot +=
                ( ideaTails[i].size - common )
                * ( ideaTails[j].size - common )
        }
    }

    return tot * 2

}
// @lc code=end

