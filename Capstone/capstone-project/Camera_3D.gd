extends Camera3D


func pick_object():
	var mouse_pos = get_viewport().get_mouse_position()
	var from = project_ray_origin(mouse_pos)
	var to = from + project_ray_normal(mouse_pos) * 1000
	
	var space = get_world_3d().direct_space_state
	
	var query = PhysicsRayQueryParameters3D.new()
	query.from = from
	query.to = to
	
	return space.intersect_ray(query)
