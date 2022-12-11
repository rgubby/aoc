import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)[0]

;[4, 14].every((p, part) => {
  const answer = input.split('').map((_s, i) => {
    if (i >= p && 
      [...input]
        .slice(i-(p-1), i+1)
        .reverse()
        .filter((value, index, self) => self.indexOf(value) === index).length === p)
    {
      return i+1
    }
    return false
  }).filter(Boolean).shift()
  
  console.log(`part${part+1}: ${answer}`)
  return true
})
