export function summer(x: number, y: number) {
    return x + y
}

function sum(prev: number, next: number) {
    return prev + next
}

export class BowlingGame{
    rolls: number[]

    constructor(rollArray: number[]) {
        if (rollArray.length >20) {
            throw('Too many rolls, maximum of 20 balls allowed.')
        } else {
            this.rolls = rollArray
        }
    }
    score() {
        return this.rolls.reduce(sum)
    }
};
