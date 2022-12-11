import {readFileSync} from 'fs-extra'
const elves = readFileSync('input.txt').toString('ascii').split("\n\n").filter(Boolean).map(elf => elf.split('\n').map(elf => parseInt(elf)).reduce((value, total) => total += value))
console.log(`part 1: ${Math.max(...elves)}`)
console.log(`part 2: ${elves.sort((n1, n2) => n2 - n1).slice(0, 3).reduce((value, current) => current + value)}`)
