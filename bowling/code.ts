import { stringify } from "ts-jest"

export function addTwoNumbers(x: number, y: number) {
  return x + y
}

export class BowlingGame {
  rolls: number[]

  constructor(rollArray: number[]) {
    // invalid rolls
    if (rollArray.length > 21) {
      throw "Too many rolls, maximum of 21 balls allowed."
    }
    // more than 10 pins for a single roll
    if (rollArray.some((el) => el > 10)) {
      throw "Invalid pin count provided."
    }
    this.rolls = rollArray
  }
  score(): {
    score: number
    message: string
  } {
    if (this.rolls.length == 0) {
      return {
        score: 0,
        message: "No balls thrown yet.",
      }
    } else {
      return {
        score: this.rolls.reduce(addTwoNumbers),
        message: String(this.rolls.length) + " balls thrown so far.",
      }
    }
  }
  rollMany(balls: number, pins: number) {
    for (let i = 0; i < balls; i++) {
      this.rolls?.push(pins)
    }
  }
}
