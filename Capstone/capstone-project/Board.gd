extends Node3D

func _input(event):
	if event.is_action_pressed("click"):  # Make sure 'click' is left mouse button in Input Map
		var result = $"../Camera3D".pick_object()
		if not result:
			print("Nothing clicked")
			return

		var obj = result.collider
		print("You clicked:", obj.name)
