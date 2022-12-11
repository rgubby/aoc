import { readFileSync } from 'fs-extra'
const monkeys = readFileSync('input.txt').toString('ascii').split(`

`).filter(Boolean)

let inspecting: { [key: number]: number } = {}
let holding: { [key: number]: { worryLevel: number }[] } = {}

const parts: { relief: number; rounds: number }[] = [
    { relief: 3, rounds: 20 },
    { relief: 1, rounds: 10000 },
]

Object.values(parts).forEach((p, index) => {
    inspecting = {}
    holding = {}
    let lcm: number[] = []

    monkeys.some(m => {
        const input = m.split('\n').filter(Boolean)
        const [,monkey] = input[0].split(' ').map(i => parseInt(i))
        const startingItems = input[1].split(':').filter(i => !i.includes('Starting')).map(i => i.trim()).join('').split(',').map(i => parseInt(i.trim()))
        const [,,test] = input[3].split(':').filter(i => !i.includes('Test')).join('').trim().split(/divisible by (.*?)/).map(i => parseInt(i))
        lcm.push(test)
        holding[monkey] = startingItems.map(i => { return {worryLevel: i} })
    })

    for (let r = 1; r <= p.rounds; r++) {
        monkeys.some(m => {
            const input = m.split('\n').filter(Boolean)
            const [,monkey] = input[0].split(' ').map(i => parseInt(i))
            const [,operator,,value] = input[2].split(':').filter(i => !i.includes('Operation')).join('').trim().split(/new = old (.*?) (.*?)/)
            const [,,test] = input[3].split(':').filter(i => !i.includes('Test')).join('').trim().split(/divisible by (.*?)/).map(i => parseInt(i))
            const [,,ifTrue] = input[4].split(':').filter(i => !i.includes('If')).join('').trim().split(/throw to monkey (.*?)/).map(i => parseInt(i))
            const [,,ifFalse] = input[5].split(':').filter(i => !i.includes('If')).join('').trim().split(/throw to monkey (.*?)/).map(i => parseInt(i))

            
            inspecting[monkey] = inspecting[monkey] ?? 0
            holding[monkey].forEach(item => {            
                let worryLevelCheck = 0
                switch(operator) {
                    case '+':
                        worryLevelCheck = item.worryLevel + (value === 'old' ? item.worryLevel : parseInt(value))
                        break
                    case '*':
                        worryLevelCheck = item.worryLevel * (value === 'old' ? item.worryLevel : parseInt(value))
                        break
                }
                
                const lowest = lcm.reduce((current, total) => total * current, 1)
                const bored = Math.floor(worryLevelCheck / p.relief) % lowest
                const holdingMonkey = ((bored % test) === 0) ? ifTrue : ifFalse
                
                holding[holdingMonkey] = holding[holdingMonkey] ?? []
                holding[monkey] = holding[monkey].slice(1)
                holding[holdingMonkey].push({ worryLevel: bored })
                inspecting[monkey]++
            })
        })
    }

    const [first, second] = Object.values(inspecting).sort((a, b) => b - a).slice(0, 2)
    console.log(`part${index + 1}: ${first * second}`)
})

// 57838
// 15050382231
