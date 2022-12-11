import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

let cycles: { during: number, after: number }[] = []
let spritePosition = Array.from(Array(3).keys(), n => n + 1)
let buffer: { [key: number]: string[] } = []
let row = 0, bufferCount = 1

input.forEach(i => {
  const [operation, amount] = i.split(' ')

  let previous = { during: cycles[cycles.length - 1]?.after ?? 1, after: cycles[cycles.length - 1]?.after ?? 1 }
  cycles.push(previous)
  
  buffer[row] = buffer[row] ?? []
  buffer[row].push(spritePosition.includes(bufferCount++) ? '#' : '.')

  if (buffer[row].length === 40) {
    bufferCount = 1
    buffer[++row] = buffer[row] ?? []
  }

  if (operation === 'addx') {
    cycles.push({ ...previous, after: cycles[cycles.length - 1].after + parseInt(amount) })
    buffer[row].push(spritePosition.includes(bufferCount++) ? '#' : '.')
    spritePosition = Array.from(Array(3).keys(), n => n + cycles[cycles.length - 1]?.after)
  }

  if (buffer[row].length === 40) {
    row++
    bufferCount = 1
  }
})

const part1 = Array(6).fill(20).map((x, y) => x + y * 40)
  .map(v => v * cycles[v - 1].during)
  .reduce((current, total) => total += current)

console.log(`part1: ${part1}`)
console.log('part2')
Object.values(buffer).filter(b => b.length).some(b => {
  console.log(b.join(''))
})

// part1: 15680
// part2: ZFBFHGUP