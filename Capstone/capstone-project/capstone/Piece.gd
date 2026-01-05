extends Node3D
class_name Piece

var color: String
var kind:String
var grid_pos: Vector2i

@onready var visual: Node3D = $Visual

# Called when the node enters the scene tree for the first time.
func setup(p_color: String , p_kind: String, p_pos: Vector2i, model_scene: PackedScene):
	color = p_color
	kind = p_kind
	grid_pos = p_pos
	
	for c in visual.get_children():
		c.queue_free()
	
	if model_scene:
		var model = model_scene.instantiate()
		visual.add_child(model)
