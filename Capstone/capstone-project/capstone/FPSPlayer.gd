extends CharacterBody3D
class_name FPSPlayer

@export var is_human: bool = true
@export var team_color: String = "white"
@export var move_speed: float = 6.0
@export var jump_velocity: float = 4.5
@export var mouse_sens: float = 0.002
@export var max_hp: int = 100
@export var damage: int = 25
@export var is_local_player: bool = true

var hp: int
var gravity: float = ProjectSettings.get_setting("physics/3d/default_gravity")

@onready var head: Node3D = $Head
@onready var cam: Camera3D = $Head/Camera3D
@onready var gun_ray: RayCast3D = $GunRay
@onready var body_mesh: MeshInstance3D = $BodyMesh

signal died(winner_team: String)

func _ready() -> void:
	hp = max_hp
	if is_human:
		Input.set_mouse_mode(Input.MOUSE_MODE_CAPTURED)
	if is_local_player:
		body_mesh.visible = false

func _exit_tree() -> void:
	if is_human:
		Input.set_mouse_mode(Input.MOUSE_MODE_VISIBLE)

func _unhandled_input(event: InputEvent) -> void:
	if not is_human:
		return

	if event is InputEventMouseMotion:
		rotate_y(-event.relative.x * mouse_sens)
		head.rotate_x(-event.relative.y * mouse_sens)
		head.rotation.x = clamp(head.rotation.x, deg_to_rad(-85), deg_to_rad(85))

	if event.is_action_pressed("fire"):
		_shoot()

func _physics_process(delta: float) -> void:
	if is_human:
		_human_move(delta)

func _human_move(delta: float) -> void:
	# gravity
	if not is_on_floor():
		velocity.y -= gravity * delta

	# jump
	if Input.is_action_just_pressed("jump") and is_on_floor():
		velocity.y = jump_velocity

	# WASD
	var input_dir := Vector2.ZERO
	input_dir.y += 1 if Input.is_action_pressed("move_forward") else 0
	input_dir.y -= 1 if Input.is_action_pressed("move_back") else 0
	input_dir.x += 1 if Input.is_action_pressed("move_right") else 0
	input_dir.x -= 1 if Input.is_action_pressed("move_left") else 0
	input_dir = input_dir.normalized()

	var dir := (global_transform.basis * Vector3(input_dir.x, 0, -input_dir.y)).normalized()
	velocity.x = dir.x * move_speed
	velocity.z = dir.z * move_speed

	move_and_slide()

func ai_look_at(target_pos: Vector3, delta: float) -> void:
	var to_target := (target_pos - global_position)
	to_target.y = 0
	if to_target.length() < 0.001:
		return
	var desired_yaw := atan2(-to_target.x, -to_target.z)
	rotation.y = lerp_angle(rotation.y, desired_yaw, 6.0 * delta)

func ai_try_shoot(target: FPSPlayer) -> void:
	gun_ray.force_raycast_update()
	if gun_ray.is_colliding():
		var hit = gun_ray.get_collider()
		if hit == target:
			_shoot()

func _shoot() -> void:
	gun_ray.force_raycast_update()
	if not gun_ray.is_colliding():
		return

	var hit = gun_ray.get_collider()
	if hit is FPSPlayer:
		hit.take_damage(damage)

func take_damage(amount: int) -> void:
	hp -= amount
	if hp <= 0:
		hp = 0
		emit_signal("died", _opponent_team())

func _opponent_team() -> String:
	return "black" if team_color == "white" else "white"
