import { stringify } from "ts-jest"

export interface ResultType {
  score: number
  message: string
}

export function addTwoNumbers(x: number, y: number): number {
  /**
   * Simply add two provided numbers
   * */
  return x + y
}

export function calculateScore(passedBalls: number[]): ResultType {
  /**
   * Pass in an array of numbers (number[]) containing the values
   * all the rolls in a game of bowling.
   *
   * Return an object containing two fields:
   *   score: numerical score according to the rules of
   *   message: helpful message containing the number of balls thrown
   *            in the game
   */
  let balls = [...passedBalls]
  let score = 0

  // no balls
  if (balls.length == 0) {
    return {
      score: 0,
      message: "No balls provided for scoring",
    }
  }
  for (let frame = 1; frame < 11; frame++) {
    let frameScore = 0

    // strike
    if (balls[0] == 10) {
      frameScore = 10 + (balls[1] || 0) + (balls[2] || 0)
      score = score + frameScore
      try {
        balls.shift()
      } catch {
        continue
      }
      continue
    }

    // spare
    if (balls[0] + balls[1] == 10) {
      frameScore = 10 + (balls[2] || 0)
      score = score + frameScore
      try {
        balls.shift()
        balls.shift()
      } catch {
        continue
      }
      continue
    }

    // open frame
    frameScore = (balls[0] || 0) + (balls[1] || 0)
    score = score + frameScore

    try {
      balls.shift()
      balls.shift()
    } catch {
      continue
    }
    // console.log("Frame: ", frame, ", Score: ", score, ", Balls: ", balls)
  }

  return {
    score: score,
    message: String(passedBalls.length) + " balls thrown.",
  }
}

export class BowlingGame {
  /**
   * Class representing a game of bowling
   * pass in a number array containing some rolls.  If no rolls
   * are passed, it defaults to an empty game so far.
   *
   * method: score
   *   call the score() method to find out the score for the game
   *   in the class instance
   *
   * method: rollMany
   *   method to allow many rolls to be entered easily.
   *
   *   pass in two parameters:
   *     number: how many rolls
   *     number: how many pins
   */
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
  score(): ResultType {
    if (this.rolls.length == 0) {
      return {
        score: 0,
        message: "No balls thrown yet.",
      }
    } else {
      let result: ResultType = calculateScore(this.rolls)
      return {
        score: result.score,
        message: result.message,
      }
    }
  }
  rollMany(balls: number, pins: number) {
    for (let i = 0; i < balls; i++) {
      this.rolls?.push(pins)
    }
  }
}
