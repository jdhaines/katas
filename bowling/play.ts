/* Run with 'npx node-ts play' */
import { BowlingGame } from "./code"

// 33
let game1 = [1, 0, 1, 9, 5, 5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
// 39
let game2 = [1, 0, 10, 5, 5, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0]
// 121
let game3 = [9, 0, 7, 2, 6, 2, 10, 7, 1, 8, 2, 4, 5, 9, 0, 10, 3, 7, 7]
// Jenny's Game - 136
let game4 = [10, 6, 4, 7, 2, 6, 3, 5, 5, 9, 0, 1, 9, 10, 6, 3, 5, 0]

let b = new BowlingGame(game4)

console.log("Played a game with rolls: ", game4)
console.log("Score: ", b.score())
