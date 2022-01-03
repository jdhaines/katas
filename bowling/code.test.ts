import { summer, BowlingGame } from './code'

describe("Test summer function to validate jest", () => {
    it('checks sum of 1 & 2', () => {
      expect(summer(1, 2)).toBe(3);
    })
});

describe("test BowlingGame", () => {
    it ('instantiates new class', () => {
       let b = new BowlingGame([1,2,3])
       expect(b.rolls).toStrictEqual([1,2,3])
    })
    it('checks for too many balls thrown', () => {
        const rolls = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21]
        expect(BowlingGame(rolls)).toThrow('Too Many rolls, maximum of 20 balls allowed.')
    })
    it('checks score for 3 balls', () => {
        let b = new BowlingGame([1,1,1])
        expect(b.score()).toBe(3)
    })
})
