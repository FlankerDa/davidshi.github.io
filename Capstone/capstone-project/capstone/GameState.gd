extends Node
class_name GameState

var board_scene_path: String = "res://ChessBoard3D.tscn"
var fps_scene_path: String = "res://FPSDuel.tscn"

var board_state: Dictionary = {}


var pending_capture: Dictionary = {}
var duel_winner: String = ""

func save_board_state(new_state: Dictionary) -> void:
	board_state = new_state.duplicate(true)

func start_capture(data: Dictionary) -> void:
	pending_capture = data.duplicate(true)
	duel_winner = ""

func set_capture_winner(winner: String) -> void:
	duel_winner = winner

func has_pending_capture() -> bool:
	return not pending_capture.is_empty() and duel_winner != ""

func consume_pending_capture() -> Dictionary:
	var out := {
		"pending_capture": pending_capture.duplicate(true),
		"duel_winner": duel_winner
	}
	pending_capture.clear()
	duel_winner = ""
	return out
