extends Node3D

var duel_over := false
var initialized := false

@onready var spawn_a: Marker3D = $AttackerSpawn
@onready var spawn_b: Marker3D = $DefenderSpawn
@onready var player_a: FPSPlayer = $PlayerA
@onready var player_b: FPSPlayer = $PlayerB
@onready var info_label: Label = get_node_or_null("CanvasLayer/InfoLabel")

func _ready() -> void:
	Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
	_setup_duel()
	
	if initialized:
		return
	initialized = true

	if Game_State.pending_capture.is_empty():
		if info_label:
			info_label.text = "No pending capture. Returning to board."
		get_tree().change_scene_to_file(Game_State.board_scene_path)
		return

	call_deferred("_setup_duel")

func _setup_duel() -> void:
	var data := Game_State.pending_capture
	var attacker_color: String = data["attacker_color"]
	var defender_color: String = data["defender_color"]

	player_a.is_local_player = true
	player_a.team_color = attacker_color
	player_a.hp = player_a.max_hp
	player_a.global_position = spawn_a.global_position

	player_b.is_local_player = false
	player_b.team_color = defender_color
	player_b.hp = player_b.max_hp
	player_b.global_position = spawn_b.global_position

	if not player_a.died.is_connected(_on_player_died):
		player_a.died.connect(_on_player_died)
	if not player_b.died.is_connected(_on_player_died):
		player_b.died.connect(_on_player_died)

	if info_label:
		info_label.text = "Duel started: LMB shoot | ESC release mouse"

func _physics_process(delta: float) -> void:
	if duel_over:
		return

	player_b.ai_face_target(player_a.global_position, delta)
	player_b.ai_try_shoot_target(player_a)

	if info_label:
		info_label.text = "A(%s) HP:%d   B(%s) HP:%d" % [
			player_a.team_color, player_a.hp,
			player_b.team_color, player_b.hp
		]

func _on_player_died(loser_team: String) -> void:
	if duel_over:
		return
	duel_over = true

	var winner_team := "black" if loser_team == "white" else "white"

	Game_State.set_capture_winner(winner_team)

	Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)
	get_tree().change_scene_to_file(Game_State.board_scene_path)

func _unhandled_input(event: InputEvent) -> void:
	if event.is_action_pressed("ui_cancel"):
		_exit_to_board()

func _exit_to_board() -> void:

	Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)


	if "set_capture_winner" in GameState:
		Game_State.set_capture_winner("")

	get_tree().change_scene_to_file(Game_State.board_scene_path)
