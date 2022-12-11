import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

const moves = input.filter(i => i.startsWith('move'))
const locations = input.filter(i => !i.startsWith('move'))

const cranes: { [key: string]: { [key: number]: string[] } } = {'9000': {}, '9001': {}}

const keys = locations.pop()?.split(/([0-9])+/).filter(s => s.match(/[0-9]/)).map(s => parseInt(s))

keys?.forEach(k => {
  cranes['9000'][k] = []
  cranes['9001'][k] = []
})

locations.reverse().forEach(c => {
  keys?.forEach(k => {
    const v = c.substring((((k-1)*2)+1)+(2*(k-1)), (((k-1)*2)+1)+(2*(k-1))+1)
    if (v.trim()) {
      cranes['9000'][k].push(v)
      cranes['9001'][k].push(v)
    }
  })
})

moves.forEach(m => {
  const [amount,from,to] = m.split(/move ([0-9]*) from ([0-9]*) to ([0-9]*)/).filter(Boolean).map(s => parseInt(s))
  cranes['9000'][to].push(...cranes['9000'][from].splice((0-amount), amount).reverse())
  cranes['9001'][to].push(...cranes['9001'][from].splice((0-amount), amount))
})

console.log(`part1: ${Object.values(cranes['9000']).map(c => c.pop()).join('')}`)
console.log(`part2: ${Object.values(cranes['9001']).map(c => c.pop()).join('')}`)
