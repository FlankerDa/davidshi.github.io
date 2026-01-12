extends Node3D

signal duel_finished(winner: String)

func _ready() -> void:
	print("FPS Duel started")
	print("Pending capture data:")
	print(Game_State.pending_capture)

	Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)

func _exit_tree() -> void:
	Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)

func _input(event: InputEvent) -> void:
	if event.is_action_pressed("fire"):
		_finish_duel("attacker")

	if event.is_action_pressed("alt_fire"):
		_finish_duel("defender")

	if event.is_action_pressed("ui_cancel"):
		_finish_duel("defender")

func _finish_duel(winner: String) -> void:
	print("Duel finished, winner:", winner)

	Game_State.set_capture_winner(winner)

	Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
	get_tree().change_scene_to_file(Game_State.board_scene_path)
