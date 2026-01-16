extends CharacterBody3D
class_name FPSPlayer

@export var is_local_player: bool = false
@export var team_color: String = "white"
@export var max_hp: int = 100


@export var speed: float = 6.0
@export var jump_velocity: float = 4.5
@export var mouse_sens: float = 0.002


@export var damage: int = 10
@export var fire_cooldown: float = 0.5


@export var ai_turn_speed: float = 3.0
@export var ai_fire_range: float = 20.0
@export var ai_shoots: bool = true

@onready var head: Node3D = $Head
@onready var cam: Camera3D = $Head/Camera3D
@onready var gun_ray: RayCast3D = $GunRay
@onready var body_mesh: Node = get_node_or_null("BodyMesh")
@onready var tracer: MeshInstance3D = $Tracer
@onready var muzzle: Marker3D = $Muzzle

var tracer_time := 0.0

var hp: int
var gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity")
var _cooldown_left: float = 0.0

signal died(loser_team: String)

func _ready() -> void:
	
	tracer.visible = false
	hp = max_hp

	if is_local_player:
		Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
		if body_mesh:
			body_mesh.visible = false

		if cam:
			cam.current = true
	else:
		if cam:
			cam.current = false
		if body_mesh:
			body_mesh.visible = true

func _unhandled_input(event: InputEvent) -> void:
	if not is_local_player:
		return

	# mouse look
	if event is InputEventMouseMotion:
		rotate_y(-event.relative.x * mouse_sens)
		head.rotate_x(-event.relative.y * mouse_sens)
		head.rotation.x = clamp(head.rotation.x, deg_to_rad(-85), deg_to_rad(85))

	if event.is_action_pressed("fire"):
		try_shoot()

	if event.is_action_pressed("ui_cancel"):
		Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)

func _physics_process(delta: float) -> void:
	_cooldown_left = max(0.0, _cooldown_left - delta)

	if is_local_player:
		_human_move(delta)
	if tracer.visible:
		tracer_time -= delta
		if tracer_time <=0.0:
			tracer.visible = false

func _human_move(delta: float) -> void:
	if not is_on_floor():
		velocity.y -= gravity * delta

	# jump
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = jump_velocity

	var input_vec := Vector2(
		Input.get_action_strength("move_right") - Input.get_action_strength("move_left"),
		Input.get_action_strength("move_back") - Input.get_action_strength("move_forward")
	).normalized()

	var dir := (transform.basis * Vector3(input_vec.x, 0, input_vec.y)).normalized()

	velocity.x = dir.x * speed
	velocity.z = dir.z * speed

	move_and_slide()

func try_shoot() -> void:
	if _cooldown_left > 0.0:
		return
	_cooldown_left = fire_cooldown

	gun_ray.force_raycast_update()

	var start := muzzle.global_position
	var end := start + (-gun_ray.global_transform.basis.z) * 50.0

	if gun_ray.is_colliding():
		end = gun_ray.get_collision_point()

	show_tracer(start, end)

	if gun_ray.is_colliding():
		var hit = gun_ray.get_collider()
		if hit is FPSPlayer and hit.team_color != team_color:
			hit.take_damage(damage)


func take_damage(amount: int) -> void:
	hp -= amount
	if hp <= 0:
		hp = 0
		emit_signal("died", team_color)

func ai_face_target(target_pos: Vector3, delta: float) -> void:
	var to_target := target_pos - global_position
	to_target.y = 0
	if to_target.length() < 0.001:
		return
	var desired_yaw := atan2(-to_target.x, -to_target.z)
	rotation.y = lerp_angle(rotation.y, desired_yaw, ai_turn_speed * delta)

func ai_try_shoot_target(target: FPSPlayer) -> void:
	if not ai_shoots:
		return
	if _cooldown_left > 0.0:
		return

	if global_position.distance_to(target.global_position) > ai_fire_range:
		return

	gun_ray.force_raycast_update()
	if gun_ray.is_colliding() and gun_ray.get_collider() == target:
		try_shoot()

func show_tracer(from: Vector3, to: Vector3) -> void:
	var mesh := ImmediateMesh.new()
	var mat := StandardMaterial3D.new()
	mat.shading_mode = BaseMaterial3D.SHADING_MODE_UNSHADED
	mat.albedo_color = Color(1, 1, 0)

	mesh.surface_begin(Mesh.PRIMITIVE_LINES, mat)
	mesh.surface_add_vertex(from)
	mesh.surface_add_vertex(to)
	mesh.surface_end()

	tracer.mesh = mesh
	tracer.visible = true
	tracer_time = 1
