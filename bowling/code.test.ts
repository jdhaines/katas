import { addTwoNumbers, BowlingGame } from "./code"

describe("Test addTwoNumbers function to validate jest", () => {
  test("checks sum of 1 & 2", () => {
    expect(addTwoNumbers(1, 2)).toBe(3)
  })
})

describe("test BowlingGame", () => {
  test("instantiates new game with partial rolls", () => {
    let b = new BowlingGame([1, 2, 3])
    expect(b.rolls).toStrictEqual([1, 2, 3])
  })

  test("instantiates new empty game", () => {
    let b = new BowlingGame([])
    expect(b.rolls).toStrictEqual([])
    expect(b.score().score).toBe(0)
  })

  test("checks for too many balls thrown", () => {
    const rolls = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10,
    ]
    expect(() => {
      new BowlingGame(rolls)
    }).toThrow("Too many rolls, maximum of 21 balls allowed.")
  })

  test("checks for too too many pins on a single roll", () => {
    const rolls = [1, 2, 9, 10, 11]
    expect(() => {
      new BowlingGame(rolls)
    }).toThrow("Invalid pin count provided")
  })

  test("checks for full game given (21 balls)", () => {
    const rolls = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
    ]
    let b = new BowlingGame(rolls)
    expect(b.score().score).toBe(165)
    expect(b.score().message).toBe("21 balls thrown so far.")
  })

  test("checks score for 3 balls", () => {
    let b = new BowlingGame([1, 1, 1])
    expect(b.score().score).toBe(3)
    expect(b.score().message).toBe("3 balls thrown so far.")
  })

  test("zero game score of 0", () => {
    let b = new BowlingGame([])
    b.rollMany(20, 0)
    expect(b.score().score).toBe(0)
    expect(b.rolls).toStrictEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  })

  test("all 1s game - score of 20", () => {
    let b = new BowlingGame([])
    b.rollMany(20, 1)
    expect(b.score().score).toBe(20)
  })

  test("all 9s game - score of 180", () => {
    let b = new BowlingGame([])
    b.rollMany(20, 9)
    expect(b.score().score).toBe(180)
    expect(b.score().message).toBe("20 balls thrown so far.")
  })
})
