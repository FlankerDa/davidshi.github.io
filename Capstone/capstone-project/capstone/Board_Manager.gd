extends Node3D
@export var tiles_root: NodePath
@export var tile_size: float = 1.0



var selected_tile: Vector2i = Vector2i(-1,-1)

func _ready():
	_assign_grid_positions()
	for n in get_tree().get_nodes_in_group("tiles"):
		if n.has_signal("tile_clicked"):
			n.tile_clicked.connect(_on_tile_clicked)
			
	for tile in get_tree().get_nodes_in_group("tiles"):
		tile.tile_clicked.connect(_on_tile_clicked)

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
		var gx := int(round((t.global_position.x - min)))

func _on_tile_clicked(pos: Vector2i) -> void:
	print("Tile clicked at:", pos)
	
	if selected_tile == Vector2i(-1,-1):
		selected_tile = pos
		print("Selected tile:", pos)
		
	else:
		print("Move from", selected_tile, "to", pos)
		selected_tile = Vector2i(-1,-1)
