extends Node
class_name GameState

var board_scene_path := "res://ChesBoard3D.tscn"
var fps_scene_path := "res://FPSDuel.tscn"

var board_state: Dictionary = {}
var current_turn: String = "white"

# capture flow
var pending_capture: Dictionary = {}
var capture_winner: String = ""           

func save_board_state(state: Dictionary) -> void:
	board_state = state.duplicate(true)

func get_board_state() -> Dictionary:
	return board_state

func start_capture(data: Dictionary) -> void:
	pending_capture = data.duplicate(true)
	capture_winner = ""

func has_pending_capture() -> bool:
	return not pending_capture.is_empty()

func set_capture_winner(winner: String) -> void:
	capture_winner = winner

func clear_capture() -> void:
	pending_capture.clear()
	capture_winner = ""
