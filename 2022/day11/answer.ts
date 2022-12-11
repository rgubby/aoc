import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

