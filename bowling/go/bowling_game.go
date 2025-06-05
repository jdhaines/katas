// Bowling Game Kata, implemented in Go but in the canonical style.
package bowling

import "fmt"

// Game is a struct that represents a bowling game.
type Game struct {
	rolls []int
	Help  int
}

// NewGame creates a new Game instance.
func NewGame() *Game {
	g := Game{}
	return &g
}

func (g *Game) Roll(pins int) error {
	if pins < 0 || pins > 10 {
		return fmt.Errorf("invalid pin count: %d", pins)
	}
	g.rolls = append(g.rolls, pins) // add all rolls for the game
	return nil
}

func (g *Game) Score() int {
	score := 0
	rollIndex := 0
	for frameIndex := 0; frameIndex < 10; frameIndex++ { //each frame
		if g.rolls[rollIndex] == 10 { // strike
			score += g.rolls[rollIndex] + g.rolls[rollIndex+1] + g.rolls[rollIndex+2]
			rollIndex += 1
		} else if (g.rolls[rollIndex] + g.rolls[rollIndex+1]) == 10 { // spare
			score += g.rolls[rollIndex] + g.rolls[rollIndex+1] + g.rolls[rollIndex+2]
			rollIndex += 2
		} else { // open frame
			score += g.rolls[rollIndex] + g.rolls[rollIndex+1]
			rollIndex += 2
		}
	}
	return score
}
