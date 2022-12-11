import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

const visible: boolean[][] = []
const scenicScore: number[][] = []

input.forEach((i, rowIndex) => {
  visible[rowIndex] = []
  scenicScore[rowIndex] = []
  const [...row] = i.split('').map(r => parseInt(r))
  row.forEach((r: number, colIndex) => {
    const directions = [
      row.slice(0, colIndex).reverse(),
      row.slice(colIndex + 1),
      input.slice(rowIndex + 1).map(i => parseInt(i[colIndex])),
      input.slice(0, rowIndex).map(i => parseInt(i[colIndex])).reverse(),
    ]
    const trees: number[][] = []

    directions.forEach((d, directionIndex) => {
      trees[directionIndex] = []
      d.every(v => {
        if (v < r) {
          trees[directionIndex].push(v)
          return true
        } else if (v >= r) {
          trees[directionIndex].push(v)
          return false
        }
        return false
      })
    })
    scenicScore[rowIndex][colIndex] = trees.map(t => t.length).reduce((current, total) => total * current)

    if (
      (
        rowIndex === 0 || colIndex === 0 || rowIndex === (input.length - 1) || (colIndex === row.length - 1)
      ) || 
      (
        row.slice(0, colIndex).every(c => c < r) ||
        row.slice(colIndex + 1).every(c => c < r) ||
        input.slice(rowIndex + 1).map(i => parseInt(i[colIndex])).every(c => c < r) ||
        input.slice(0, rowIndex).map(i => parseInt(i[colIndex])).every(c => c < r)
      )
    ) {
      visible[rowIndex][colIndex] = true
    } else {
      visible[rowIndex][colIndex] = false
    }
  })
})

console.log(`part1: ${visible.map(v => v.filter(Boolean).length).reduce((current, total) => total += current)}`)
console.log(`part2: ${Math.max(...scenicScore.map(v => Math.max(...v)))}`)