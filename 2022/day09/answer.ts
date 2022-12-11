import { readFileSync } from 'fs-extra'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

;[1, 9].some((numberOfKnots, part) => {
  let visited: { [key: number]: {[key: string]: boolean } } = { }
  let previousPositions: { [key: number]: number[] } = { }
  let positions: { [key: number]: number[] } = { }
  
  input.some(i => {
    const [direction, amount] = i.split(' ')
    let moves = parseInt(amount)
    
    while (moves > 0) {
      positions[0] = positions[0] ?? [0,0]
      previousPositions[0] = positions[0]
  
      positions[0] = [
        positions[0][0] + (direction === 'R' ? 1 : direction === 'L' ? -1 : 0),
        positions[0][1] + (direction === 'U' ? 1 : direction === 'D' ? -1 : 0)
      ]
  
      visited[0] = visited[0] ?? { '0:0': true }
      visited[0][`${positions[0][0]}:${positions[0][1]}`] = true
  
      for (let k = 1 ; k < (numberOfKnots + 1); k++) {
        positions[k] = positions[k] ?? [0,0]
        if (!isWithinOne(k, positions)) {
          previousPositions[k] = positions[k] ?? [0,0]
          positions[k] = moveTail(k, positions, previousPositions)
        }
        visited[k] = visited[k] ?? { '0:0': true }
        visited[k][`${positions[k][0]}:${positions[k][1]}`] = true
      }
      moves--
    }
  })
  console.log(`part${part + 1}: ${Object.keys(visited[numberOfKnots]).length}`)
})

function moveTail(k: number, positions: { [key: number]: number[] }, previousPositions: { [key: number]: number[] }): number[] {
  const [xT, yT] = positions[k]
  const [xH, yH] = positions[k - 1] ?? [0,0]
  
  if (yT === yH && xT < xH) {
    return [xT + 1, yT]
  }
  if (yT === yH && xT > xH) {
    return [xT - 1, yT]
  }
  if (xT === xH && yT < yH) {
    return [xT, yT + 1]
  }
  if (xT === xH && yT > yH) {
    return [xT, yT - 1]
  }
  if (xT < xH && yT < yH) {
    return [xT + 1, yT + 1]
  }
  if (xT > xH && yT < yH) {
    return [xT - 1, yT + 1]
  }
  if (xT < xH && yT > yH) {
    return [xT + 1, yT - 1]
  }
  if (xT > xH && yT > yH) {
    return [xT - 1, yT - 1]
  }
  return previousPositions[k - 1]
}

function isWithinOne(k: number, positions: { [key: number]: number[] }) {
  const [xT, yT] = positions[k]
  const [xH, yH] = positions[k - 1] ?? [0,0]

  if (Math.abs(xT - xH) > 1 || Math.abs(yT - yH) > 1) {
    return false
  }

  if (
    (xT === xH && yT === yH) || 
    (yT === yH && xT >= (xH - 1)) || 
    (xT === xH && yT >= (yH - 1)) ||
    ((yT + 1) === yH && (xT + 1) === xH) ||
    ((yT + 1) === yH && (xT - 1) === xH) || 
    ((yT - 1) === yH && (xT + 1) === xH) ||
    ((yT - 1) === yH && (xT - 1) === xH)
  ) {
    return true
  }
  return false
}

// 6011
// 2419