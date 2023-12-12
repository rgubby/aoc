import { readFileSync } from 'fs-extra'
const input = readFileSync('input-short.txt').toString('ascii').split('\n').filter(Boolean)
import { AStarFinder } from 'astar-typescript'

const grid: number[][] = []

const paths: { [key: string]: boolean } = {}

input.forEach((i, row) => {
  grid[row] = grid[row] ?? []
  grid[row] = i.split('').map(i => getCode(i))
})
const start = [0][0]
const end = [5][2]

console.log(grid)

function getCode(char: string) {
  return (char === 'S' ? 'a' : char === 'E' ? 'z': char).charCodeAt(0) - 96
}

// const aStarInstance = new AStarFinder({
//   grid: {
//     matrix: grid,
//   },
// })

// let startPos = { x: 0, y: 0 }
// let goalPos = { x: 5, y: 2 }

// let myPathway = aStarInstance.findPath(startPos, goalPos)
// console.log(myPathway)

/*
function* traverse (x: number, y: number, currentPath = '', from = ''): Generator<string> {
  let ableToTraverse = false
  currentPath += grid[x][y]
  console.log(`currentPath:${currentPath}`)
  
  if (grid[x][y] === 'E') {
    ableToTraverse = false
  } else {
    // right - up by one 
    if (grid?.[x]?.[y+1] && from !== 'R') {
      if (getCode(grid[x][y]) + 1 === getCode(grid[x][y+1])) { // CAN TRAVERSE RIGHT
        ableToTraverse = true
        yield* traverse(x, y+1, currentPath, 'L')
      }
    }

    // down - up by one
    if (grid?.[x+1]?.[y] && from !== 'D') {
      if (getCode(grid[x][y]) + 1 === getCode(grid[x+1][y])) { // CAN TRAVERSE DOWN
        ableToTraverse = true
        yield* traverse(x+1, y, currentPath, 'U')
      }
    }

    // left - up by one
    if (grid?.[x]?.[y-1] && from !== 'L') {
      if (getCode(grid[x][y]) + 1 === getCode(grid[x][y-1])) { // CAN TRAVERSE LEFT
        ableToTraverse = true
        yield* traverse(x, y-1, currentPath, 'R')
      }
    }

    // up - up by one
    if (grid?.[x-1]?.[y] && from !== 'U') {
      if (getCode(grid[x][y]) + 1 === getCode(grid[x-1][y])) { // CAN TRAVERSE UP
        ableToTraverse = true
        yield* traverse(x-1, y, currentPath, 'D')
      }
    }



    // right - stay same height
    if (grid?.[x]?.[y+1] && from !== 'R') {
      if (getCode(grid[x][y]) === getCode(grid[x][y+1])) { // CAN TRAVERSE RIGHT
        ableToTraverse = true
        yield* traverse(x, y+1, currentPath, 'L')
      }
    }

    // down - stay same height
    if (grid?.[x+1]?.[y] && from !== 'D') {
      if (getCode(grid[x][y]) === getCode(grid[x+1][y])) { // CAN TRAVERSE DOWN
        ableToTraverse = true
        yield* traverse(x+1, y, currentPath, 'U')
      }
    }

    // left - stay same height
    if (grid?.[x]?.[y-1] && from !== 'L') {
      if (getCode(grid[x][y]) === getCode(grid[x][y-1])) { // CAN TRAVERSE LEFT
        ableToTraverse = true
        yield* traverse(x, y-1, currentPath, 'R')
      }
    }

    // up - stay same height
    if (grid?.[x-1]?.[y] && from !== 'U') {
      if (getCode(grid[x][y]) === getCode(grid[x-1][y])) { // CAN TRAVERSE UP
        ableToTraverse = true
        yield* traverse(x-1, y, currentPath, 'D')
      }
    }



    // right
    if (grid?.[x]?.[y+1] && from !== 'R') {
      if (getCode(grid[x][y]) + 1 >= getCode(grid[x][y+1])) { // CAN TRAVERSE RIGHT
        ableToTraverse = true
        yield* traverse(x, y+1, currentPath, 'L')
      }
    }

    // down
    if (grid?.[x+1]?.[y] && from !== 'D') {
      if (getCode(grid[x][y]) + 1 >= getCode(grid[x+1][y])) { // CAN TRAVERSE DOWN
        ableToTraverse = true
        yield* traverse(x+1, y, currentPath, 'U')
      }
    }

    // left
    if (grid?.[x]?.[y-1] && from !== 'L') {
      if (getCode(grid[x][y]) + 1 >= getCode(grid[x][y-1])) { // CAN TRAVERSE LEFT
        ableToTraverse = true
        yield* traverse(x, y-1, currentPath, 'R')
      }
    }

    // up
    if (grid?.[x-1]?.[y] && from !== 'U') {
      if (getCode(grid[x][y]) + 1 >= getCode(grid[x-1][y])) { // CAN TRAVERSE UP
        ableToTraverse = true
        yield* traverse(x-1, y, currentPath, 'D')
      }
    }
  }

  if (!ableToTraverse) {
    console.log('---NOT ABLE TO TRAVERSE ANY MORE---')
    // paths[currentPath] = true
    // currentPath = ''
    return yield currentPath
  }
  
  // down
  // left
  // up
}

console.log(`path: ${traverse(0, 0).next().value}`)
// console.log(`path: ${(path?.length ?? 0) - 1}`)
// console.log(Object.values(paths).map(i => i.join('')))
*/
/*
Sb
dE

12
43
*/

// -> 
/*
123
14
*/
