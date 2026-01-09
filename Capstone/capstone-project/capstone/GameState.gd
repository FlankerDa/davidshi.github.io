extends Node
class_name GameState

var pending_capture := {}
var board_scene_path: String = "res://ChessBoard3D.tscn"
var fps_scene_path: String = "res://FPSDuel.tscn"

func start_capture(payload: Dictionary) -> void:
	pending_capture = payload
	
func clear_capture() -> void:
	pending_capture = {}


# Called when the node enters the scene tree for the first time.
func _ready() -> void:
	pass # Replace with function body.


# Called every frame. 'delta' is the elapsed time since the previous frame.
func _process(delta: float) -> void:
	pass
