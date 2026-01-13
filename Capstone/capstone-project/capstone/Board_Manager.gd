extends Node3D

@export var piece_scene: PackedScene #
@export var piece_root: NodePath

@export var white_pawn: PackedScene
@export var white_rook: PackedScene
@export var white_knight: PackedScene
@export var white_bishop: PackedScene
@export var white_queen: PackedScene
@export var white_king: PackedScene

@export var black_pawn: PackedScene
@export var black_rook: PackedScene
@export var black_knight: PackedScene
@export var black_bishop: PackedScene
@export var black_queen: PackedScene
@export var black_king: PackedScene

@export var tiles_root: NodePath
@export var tile_size: float = 1.0

var selected_tile: Vector2i = Vector2i(-1, -1)
var selected_pos: Vector2i = Vector2i(-1, -1)
var current_turn: String = "white" # "white" or "black"


func _ready():
	_assign_grid_positions()

	if Game_State.board_state.is_empty():
		_spawn_starting_position()
		Game_State.save_board_state(_export_board_state())
	else:
		_spawn_from_board_state(Game_State.board_state)
		
	_resolve_pending_capture_if_any()
	
func _spawn_from_board_state(state: Dictionary) -> void:
	for k in pieces.keys():
		if is_instance_valid(pieces[k]):
			pieces[k].queue_free()
	pieces.clear()
	
	for pos in state.keys():
		var data = state[pos]
		_spawn_piece(data["color"], data["kind"], pos)
	

func _assign_grid_positions():
	var tiles := get_tree().get_nodes_in_group("tiles")
	if tiles.is_empty():
		return

	var min_x := INF
	var min_z := INF

	for t in tiles:
		min_x = min(min_x, t.global_position.x)
		min_z = min(min_z, t.global_position.z)

	for t in tiles:
		var gx := int(round((t.global_position.x - min_x) / tile_size))
		var gy := int(round((t.global_position.z - min_z) / tile_size))
		t.grid_pos = Vector2i(gx, gy)

func _on_tile_clicked(pos: Vector2i) -> void:
	print("Tile clicked:", pos)

	if selected_pos == Vector2i(-1, -1):
		if pieces.has(pos):
			var p: Piece = pieces[pos]
			if p.color != current_turn:
				print("Not your turn. Current:", current_turn)
				return
			selected_pos = pos
			print("Selected:", p.kind, p.color, "at", pos)
			_highlight_selected(pos, true)
		return
	if pos == selected_pos:
		_highlight_selected(selected_pos, false)
		selected_pos = Vector2i(-1, -1)
		print("Deselected")
		return

	_try_move(selected_pos, pos)

		
func _get_model(color: String, kind: String) -> PackedScene:
	if color == "white":
		match kind:
			"pawn": return white_pawn
			"rook": return white_rook
			"knight": return white_knight
			"bishop": return white_bishop
			"queen": return white_queen
			"king": return white_king
	else:
		match kind:
			"pawn": return black_pawn
			"rook": return black_rook
			"knight": return black_knight
			"bishop": return black_bishop
			"queen": return black_queen
			"king": return black_king
	return null
	
var pieces := {}

func _spawn_piece(color: String , kind: String, pos: Vector2i) -> void:
	var root: Node3D = get_node(piece_root)
	
	var p: Piece = piece_scene.instantiate()
	root.add_child(p)
	
	var model_scene := _get_model(color, kind)
	p.setup(color, kind, pos, model_scene)
	
	p.global_position = _get_tile_world_pos(pos) + Vector3(0,10,0)
	pieces[pos] = p
	
			
func _get_tile_world_pos(pos: Vector2i) -> Vector3:
	for t in get_tree().get_nodes_in_group("tiles"):
		if t.grid_pos == pos:
			return t.global_position
	
	return Vector3.ZERO

func _spawn_starting_position() -> void:

	for k in pieces.keys():
		var old = pieces[k]
		if is_instance_valid(old):
			old.queue_free()
	pieces.clear()

	for x in range(8):
		_spawn_piece("white", "pawn", Vector2i(x, 1))
		_spawn_piece("black", "pawn", Vector2i(x, 6))
	# Rooks
	_spawn_piece("white", "rook", Vector2i(0, 0))
	_spawn_piece("white", "rook", Vector2i(7, 0))
	_spawn_piece("black", "rook", Vector2i(0, 7))
	_spawn_piece("black", "rook", Vector2i(7, 7))
	# Knights
	_spawn_piece("white", "knight", Vector2i(1, 0))
	_spawn_piece("white", "knight", Vector2i(6, 0))
	_spawn_piece("black", "knight", Vector2i(1, 7))
	_spawn_piece("black", "knight", Vector2i(6, 7))
	# Bishops
	_spawn_piece("white", "bishop", Vector2i(2, 0))
	_spawn_piece("white", "bishop", Vector2i(5, 0))
	_spawn_piece("black", "bishop", Vector2i(2, 7))
	_spawn_piece("black", "bishop", Vector2i(5, 7))
	# Queens
	_spawn_piece("white", "queen", Vector2i(3, 0))
	_spawn_piece("black", "queen", Vector2i(3, 7))
	# Kings
	_spawn_piece("white", "king", Vector2i(4, 0))
	_spawn_piece("black", "king", Vector2i(4, 7))


func _try_move(from: Vector2i, to: Vector2i) -> void:
	if !pieces.has(from):
		selected_pos = Vector2i(-1, -1)
		return

	var mover: Piece = pieces[from]

	if pieces.has(to) and pieces[to].color == mover.color:
		print("Blocked: own piece on", to)
		return

	_highlight_selected(from, false)

	if pieces.has(to):
		var defender: Piece = pieces[to]
		print("CAPTURE attempt", mover.kind, mover.color, "->", defender.kind, defender.color, "at", to)
		_start_fps_duel(from, to)
		return

	pieces.erase(from)
	pieces[to] = mover
	mover.grid_pos = to
	mover.global_position = _get_tile_world_pos(to) + Vector3(0, 1.0, 0)

	selected_pos = Vector2i(-1, -1)
	current_turn = "black" if current_turn == "white" else "white"
	print("Turn:", current_turn)


func _highlight_selected(pos: Vector2i, on: bool) -> void:
	for t in get_tree().get_nodes_in_group("tiles"):
		if t.grid_pos == pos:
			if on:
				t.scale = Vector3(1.05, 1.05, 1.05)
			else:
				t.scale = Vector3(1.0, 1.0, 1.0)
			return

func _start_fps_duel(from: Vector2i, to: Vector2i) -> void:
	var attacker: Piece = pieces[from]
	var defender: Piece = pieces[to]
	
	set_process_input(false)
	
	Game_State.start_capture({
		"from": from,
		"to": to,
		"attacker_color": attacker.color,
		"attacker_kind": attacker.kind,
		"defender_color": defender.color,
		"defender_kind": defender.kind,
	})
	
	Game_State.save_board_state(_export_board_state())
	get_tree().change_scene_to_file(Game_State.fps_scene_path)
			
func _export_board_state() -> Dictionary:
	var state := {}
	for pos in pieces.keys():
		var p = pieces[pos]
		if is_instance_valid(p):
			state[pos] = {"color": p.color, "kind": p.kind}
	return state
			
			
			
func _resolve_pending_capture_if_any() -> void:
	if not Game_State.has_pending_capture():
		return

	var result = Game_State.consume_pending_capture()
	var data = result["pending_capture"]
	var winner = result["duel_winner"]

	var from: Vector2i = data["from"]
	var to: Vector2i = data["to"]

	if winner == "attacker":
		if pieces.has(to) and is_instance_valid(pieces[to]):
			pieces[to].queue_free()
			pieces.erase(to)

		if pieces.has(from):
			var mover: Piece = pieces[from]
			pieces.erase(from)
			pieces[to] = mover
			mover.grid_pos = to
			mover.global_position = _get_tile_world_pos(to) + Vector3(0, 1.0, 0)

	elif winner == "defender":
		if pieces.has(from) and is_instance_valid(pieces[from]):
			pieces[from].queue_free()
			pieces.erase(from)

	Game_State.save_board_state(_export_board_state())
