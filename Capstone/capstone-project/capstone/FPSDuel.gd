extends Node3D

signal duel_finished(winner_side: String)

@onready var timer: Timer = %Timer

func _ready() -> void:
	timer.timeout.connect(_on_timeout)
	timer.start()



func _on_timeout():
	var winner = "attacker" if randi() %2 == 0 else "defender"
	duel_finished.emit(winner)
