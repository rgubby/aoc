import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

const part1 = input.map(line => {
  const intersection = [
    ...new Set(new Set(line.substring(0, line.length / 2).split('')))
  ].filter(x => new Set(line.substring(line.length / 2, line.length).split('')).has(x))[0]

  return intersection.charCodeAt(0) - (intersection == intersection.toUpperCase() ? 38 : 96)
}).reduce((current, total) => total += current)

console.log(`part1: ${part1}`)

function* chunk<T>(arr: T[], n: number): Generator<T[], void> {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
}

const rucksacks = [...chunk(input, 3)]
const part2 = rucksacks.map(rucksack => {
  const intersection = [
    ...new Set(new Set(rucksack[0].split('')))
  ].filter(x => new Set(rucksack[1].split('')).has(x) && new Set(rucksack[2].split('')).has(x))[0]
  return intersection.charCodeAt(0) - (intersection == intersection.toUpperCase() ? 38 : 96)
}).reduce((current, total) => total += current)

console.log(`part2: ${part2}`)