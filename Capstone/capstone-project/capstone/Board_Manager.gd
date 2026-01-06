extends Node3D

@export var piece_scene: PackedScene
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

func _ready():
	_assign_grid_positions()
	_spawn_starting_position()

	for n in get_tree().get_nodes_in_group("tiles"):
		if n.has_signal("tile_clicked"):
			n.tile_clicked.connect(_on_tile_clicked)

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
	print("Tile clicked at:", pos)

	if selected_tile == Vector2i(-1, -1):
		selected_tile = pos
		print("Selected tile:", pos)
	else:
		print("Move from", selected_tile, "to", pos)
		selected_tile = Vector2i(-1, -1)
		
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
			"pawn": return white_pawn
			"rook": return white_rook
			"knight": return white_knight
			"bishop": return white_bishop
			"queen": return white_queen
			"king": return white_king
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
	# Clear old pieces if any
	for k in pieces.keys():
		var old = pieces[k]
		if is_instance_valid(old):
			old.queue_free()
	pieces.clear()
	# Pawns
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


			
			
			
			
			
			
			
