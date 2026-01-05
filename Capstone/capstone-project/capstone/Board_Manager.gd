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
			
			
			
			
			
			
			
			
			
			
			
			
