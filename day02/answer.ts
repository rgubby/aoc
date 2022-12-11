import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

const scores: { [key: string]: number } = { A: 1, B: 2, C: 3, X: 1, Y: 2, Z: 3 }
const results: { [key: string]: { [key: string]: number }} = { X: { A: 3, C: 6 }, Y: { A: 6, B: 3 }, Z: { B: 6, C: 3 } }

const part1 = input.map(i => { const [ opponent, me ] = i.split(' '); return scores[me] + (results[me][opponent] ?? 0) }).reduce((current, total) => total += current)
console.log(`part 1: ${part1}`)

const outcome: { [key: string]: { [key: string]: string }} = { X: { A: 'C', B: 'A', C: 'B' }, Y: { A: 'A', B: 'B', C: 'C' }, Z: { A: 'B', B: 'C', C: 'A' } }

const part2 = input.map(i => {const [ opponent, me ] = i.split(' '); return scores[outcome[me][opponent]] + (me === 'Z' ? 6 : me === 'Y' ? 3 : 0) }).reduce((current, total) => total += current)
console.log(`part2: ${part2}`)
