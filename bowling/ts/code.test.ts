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

  test("verify error for too many balls thrown", () => {
    const rolls = [
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
      10,
    ]
    expect(() => {
      new BowlingGame(rolls)
    }).toThrow("Too many rolls, maximum of 21 balls allowed.")
  })

  test("verify error for too many pins on a single roll", () => {
    const rolls = [1, 2, 9, 10, 11]
    expect(() => {
      new BowlingGame(rolls)
    }).toThrow("Invalid pin count provided")
  })

  test("verify scoring for full game (21 balls, 190)", () => {
    const rolls = [1, 2, 3, 4, 5, 5, 6, 4, 7, 3, 8, 2, 9, 1, 10, 10, 10, 10, 10]
    let b = new BowlingGame(rolls)
    expect(b.score().score).toBe(190)
    expect(b.score().message).toBe("19 balls thrown.")
  })

  test("verify correct score for 3 balls (3)", () => {
    let b = new BowlingGame([1, 1, 1])
    expect(b.score().score).toBe(3)
    expect(b.score().message).toBe("3 balls thrown.")
  })

  test("verify correct score of all zeros (0)", () => {
    let b = new BowlingGame([])
    b.rollMany(20, 0)
    expect(b.score().score).toBe(0)
    expect(b.rolls).toStrictEqual([
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    ])
  })

  test("verify score in all 1s game - score of 20", () => {
    let b = new BowlingGame([])
    b.rollMany(20, 1)
    expect(b.score().score).toBe(20)
  })

  test("verify score in all 9s game - score of 90", () => {
    const rolls = [9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0, 9, 0]
    let b = new BowlingGame(rolls)

    expect(b.score().score).toBe(90)
    expect(b.score().message).toBe("20 balls thrown.")
  })
  test("throw one spare - score 12", () => {
    let b = new BowlingGame([5, 5, 1])
    b.rollMany(17, 0)
    expect(b.score().score).toBe(12)
  })
})
