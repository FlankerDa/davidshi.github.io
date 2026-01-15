extends Node3D

var initialized := false

@onready var player_a: Node3D = get_node_or_null("PlayerA")
@onready var player_b: Node3D = get_node_or_null("PlayerB")

func _ready() -> void:
	if initialized:
		return
	initialized = true

	Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
	print("FPS Duel Started")

	call_deferred("_setup_players")

func _setup_players() -> void:

	if player_a:
		player_a.global_position = Vector3(-3, 1, 0)

	if player_b:
		player_b.global_position = Vector3(3, 1, 0)

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		_finish_duel("draw")

func _on_player_died(winner_color: String) -> void:
	print("Duel finished, winner:", winner_color)
	_finish_duel(winner_color)

func _finish_duel(winner: String) -> void:
	if Engine.has_singleton("GameState"):
		Game_State.set_capture_winner(winner)

	Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
	get_tree().change_scene_to_file(Game_State.board_scene_path)
