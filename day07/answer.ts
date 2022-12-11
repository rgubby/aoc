import { readFileSync } from 'fs-extra'
import { deepmerge } from 'deepmerge-ts'
const input = readFileSync('input.txt').toString('ascii').split('\n').filter(Boolean)

let system: any = {}

let pwd = '/'

input.every(i => {
  if (i.startsWith('$ cd')) {
    const [,,dir] = i.split(' ')
    if (dir === '/') {
      pwd = `${pwd}`
    } else if (dir === '..') {
      pwd = pwd.replace(/\/+$/, '')
      pwd = `${pwd.substring(0, pwd.lastIndexOf('/'))}/`
    } else {
      pwd = `${pwd}${dir}/`
    }
  } else if (i.startsWith('$ ls')) {
  } else if (i.startsWith('dir')) {
  } else {
    const [size,name] = i.split(' ')
    const newObj: any = pwd.replace(/^\/+/, '').replace(/\/+$/,'').split('/').reduceRight((obj, next) => {
      if (!next) {
        return { [name]: parseInt(size) }
      } else {
        if (Object.keys(obj).length > 0) {
          return { [next]: obj }
        }
        return { [next]: { [name]: parseInt(size) } }
      }
    }, { })
    system = deepmerge(system, newObj)
  }
  return true
})

const allFiles: { [key: string]: number[] } = {'/': []}

function flatten(obj: any, currentKey = '') {
  const objs: any = []
  Object.keys(obj).forEach(k => {
    if (typeof obj[k] === 'object') {
      if (!allFiles[`${currentKey}/${k}`]) {
        allFiles[`${currentKey}/${k}`] = []
      }
      const flat = flatten(obj[k], `${currentKey}/${k}`)
      objs.push(...flat)
      allFiles[`${currentKey}/${k}`].push(...flat)
    } else {
      objs.push(obj[k])
    }
  })
  return objs
}

allFiles['/'].push(...flatten(system))

const part1: number = Object.keys(allFiles).map(i => {
  return {
    [i]: allFiles[i].reduce((current, total) => total += current, 0),
  }
})
.filter(i => Object.values(i)[0] <= 100000)
.map(i => Object.values(i)[0])
.reduce((current, total) => total += current)

console.log(`part1: ${part1}`)

const needed = 30000000 - (70000000 - allFiles['/'].reduce((current, total) => total += current))
const sizes = Object.keys(allFiles).map(i => {
  return {
    [i]: { name: i, size: allFiles[i].reduce((current, total) => total += current, 0) },
  }
})
.map(s => Object.values(s)[0])
.sort((a, b) => a.size - b.size)
.filter(i => i.size > needed)

console.log(`part2: ${sizes[0].size}`)