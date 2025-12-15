extends Node3D

var selected_tile: Vector2i = Vector2i(-1,-1)

func _ready():
	for tile in get_tree().get_nodes_in_group("tiles"):
		tile.tile_clicked.connect(_on_tile_clicked)

func _on_tile_clicked(pos: Vector2i) -> void:
	print("Tile clicked at:", pos)
	
	if selected_tile == Vector2i(-1,-1):
		selected_tile = pos
		print("Selected tile:", pos)
		
	else:
		print("Move from", selected_tile, "to", pos)
		selected_tile = Vector2i(-1,-1)
