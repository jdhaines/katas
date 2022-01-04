import { BowlingGame } from "./code"

// 33
let game1 = [1, 0, 1, 9, 5, 5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
// 39
let game2 = [1, 0, 10, 5, 5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
// 121
let game3 = [9, 0, 7, 2, 6, 2, 10, 7, 1, 8, 2, 4, 5, 9, 0, 10, 3, 7, 7]

let b = new BowlingGame(game3)

console.log("Played a game with rolls: ", game3)
console.log("Score: ", b.score())
