extends StaticBody3D


@export var grid_pos: Vector2i

signal tile_clicked(pos: Vector2i)

func _input_event(_camera, event,_position,_normal,_shape_idx):
	if event is InputEventMouseButton\
	 and event.pressed\
	 and event.button_index == MOUSE_BUTTON_LEFT:
		emit_signal("tile_clicked",grid_pos)
		
