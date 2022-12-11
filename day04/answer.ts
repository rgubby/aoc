import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

const answer = input.map(line => {
  const [elf1, elf2] = line.split(',')
  
  const [elf1_value1, elf1_value2] = elf1.split('-')
  const [elf2_value1, elf2_value2] = elf2.split('-')

  const section1 = [...Array(parseInt(elf1_value2) - parseInt(elf1_value1) + 1)].map((_, i) => parseInt(elf1_value1) + i);
  const section2 = [...Array(parseInt(elf2_value2) - parseInt(elf2_value1) + 1)].map((_, i) => parseInt(elf2_value1) + i);
  
  return {
    part1: section1.every(element => section2.includes(element)) || section2.every(element => section1.includes(element)),
    part2: section1.every(element => section2.includes(element)) || section2.some(element => section1.includes(element)),
  }
})

console.log(`part1: ${Object.keys(answer.filter(a => a.part1)).length}`)
console.log(`part2: ${Object.keys(answer.filter(a => a.part2)).length}`)
