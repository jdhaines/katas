package bowling

import (
	"fmt"
	"testing"
)

func TestInvalidRoll(t *testing.T) {
	game := NewGame()
	error := game.Roll(11)
	rollMany(game, 19, 0)
	if error == nil {
		t.Errorf("Expected error after invalid roll.")
	}
}

func TestInvalidRollMany(t *testing.T) {
	game := NewGame()
	game.Roll(1)
	error := rollMany(game, 19, 11)
	if error == nil {
		t.Errorf("Expected error after invalid roll.")
	}
}

func TestRollZeroScoresZero(t *testing.T) {
	game := NewGame()
	game.safeRoll(0)
	rollMany(game, 19, 0) // fill out the rest of the rolls
	if game.Score() != 0 {
		t.Errorf("expected score 0, got %d", game.Score())
	}
}

func TestRollOneScoresOne(t *testing.T) {
	game := NewGame()
	game.safeRoll(1)
	rollMany(game, 19, 0) // fill out the rest of the rolls
	if game.Score() != 1 {
		t.Errorf("expected score 1, got %d", game.Score())
	}
}

func TestTwoRolls(t *testing.T) {
	game := NewGame()
	game.safeRoll(3)
	game.safeRoll(4)
	rollMany(game, 18, 0) // fill out the rest of the rolls
	if game.Score() != 7 {
		t.Errorf("expected score 7, got %d", game.Score())
	}
}

func TestSpareScoresBonusNextRoll(t *testing.T) {
	game := NewGame()
	game.safeRoll(5)
	game.safeRoll(5) // spare
	game.safeRoll(3)
	rollMany(game, 17, 0) // fill out the rest of the rolls

	expectedScore := 16 // 10 + 3 (bonus) + 3
	if game.Score() != expectedScore {
		t.Errorf("expected score %d, got %d", expectedScore, game.Score())
	}
}

func TestStrikeScoresNextTwoRollsAsBonus(t *testing.T) {
	game := NewGame()
	game.safeRoll(10) // strike
	game.safeRoll(3)
	game.safeRoll(4)
	rollMany(game, 16, 0)
	expectedScore := 24 // 10 + 3 + 4 (bonus) + 3 + 4
	if game.Score() != expectedScore {
		t.Errorf("expected score %d, got %d", expectedScore, game.Score())
	}
}

func TestPerfectGameScoresThreeHundred(t *testing.T) {
	game := NewGame()
	rollMany(game, 12, 10)
	expectedScore := 300 // perfect game
	if game.Score() != expectedScore {
		t.Errorf("expected score %d, got %d", expectedScore, game.Score())
	}
}

func TestTenthFrameSpareGetsOneBonusRoll(t *testing.T) {
	game := NewGame()

	// 9 frames of zeroes
	rollMany(game, 18, 0)

	// 10th frame: 7 + 3 (spare), then bonus roll: 5
	game.Roll(7)
	game.Roll(3) // spare
	game.Roll(5)

	expectedScore := 15 // 10 + 5
	if game.Score() != expectedScore {
		t.Errorf("expected score %d, got %d", expectedScore, game.Score())
	}
}

func (g *Game) safeRoll(pins int) error {
	error := g.Roll(pins)
	if error != nil {
		return fmt.Errorf("Invalid Roll: %d", pins)
	}
	return nil
}

func rollMany(g *Game, rolls int, pins int) error {
	for range rolls {
		if err := g.Roll(pins); err != nil {
			return fmt.Errorf("rollMany failed: %v", err)
		}
	}
	return nil
}
