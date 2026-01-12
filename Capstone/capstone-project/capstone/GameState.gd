extends Node
@export var board_scene_path: String = "res://ChesBoard3D.tscn"
@export var fps_scene_path: String = "res://FPSDuel.tscn"

var board_state: Dictionary = {}

# }
var pending_capture: Dictionary = {}

var current_turn: String = "white"


func start_capture(data: Dictionary) -> void:

	pending_capture = data.duplicate(true)

	if pending_capture.has("winner_side"):
		pending_capture.erase("winner_side")


func set_capture_winner(side: String) -> void:
	# side should be: "attacker" or "defender"
	if pending_capture.is_empty():
		return
	pending_capture["winner_side"] = side


func has_capture_winner() -> bool:
	return !pending_capture.is_empty() and pending_capture.has("winner_side")


func clear_capture() -> void:
	pending_capture.clear()


func clear_board_state() -> void:
	board_state.clear()


func set_piece_at(pos: Vector2i, color: String, kind: String) -> void:
	board_state[pos] = {"color": color, "kind": kind}


func remove_piece_at(pos: Vector2i) -> void:
	if board_state.has(pos):
		board_state.erase(pos)


func get_piece_at(pos: Vector2i) -> Dictionary:
	if board_state.has(pos):
		return board_state[pos]
	return {}
