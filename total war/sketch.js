// ================================
// p5.js - Total War (Simplified)
// Fixed mouse offset + volley fire
// ================================

// --- Global game state ---
let armies = [];
let projectiles = [];
let selection = [];
let selecting = false;
let selectStart;
let paused = false;
let cam;
let showDebug = false;
let volleyTimer = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  cam = new Camera();
  createTestArmies();
}

function draw() {
  keyIsDownForPan(); // ✅ Keep camera aligned for correct mouse offsets

  if (!paused) {
    updateSimulation();
  }

  background(40, 120, 40);

  push();
  translate(width / 2, height / 2);
  scale(cam.zoom);
  translate(-cam.pos.x, -cam.pos.y);

  drawGround();
  drawArmies();
  drawProjectiles();

  if (selecting) drawSelectionRect();

  pop();

  drawHUD();
}

function updateSimulation() {
  volleyTimer++;
  if (volleyTimer > 120) volleyTimer = 0; // volleys every ~2s

  for (let a of armies) a.update();
  for (let i = projectiles.length - 1; i >= 0; i--) {
    projectiles[i].update();
    if (projectiles[i].dead) projectiles.splice(i, 1);
  }
}

// ---------------- Camera -----------------
class Camera {
  constructor() {
    this.pos = createVector(0, 0);
    this.zoom = 1;
  }
}

// ---------------- Army & Units -----------------
class Army {
  constructor(name, color, isEnemy = false) {
    this.name = name;
    this.color = color;
    this.units = [];
    this.isEnemy = isEnemy;
  }

  addUnit(u) {
    this.units.push(u);
  }

  update() {
    for (let u of this.units) u.update();
    for (let i = this.units.length - 1; i >= 0; i--) {
      if (this.units[i].dead) this.units.splice(i, 1);
    }
  }

  draw() {
    for (let u of this.units) u.draw();
  }
}

class Unit {
  constructor(x, y, army, type = "infantry") {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.army = army;
    this.type = type;
    this.maxHp = this.type == "cavalry" ? 150 : 100;
    this.hp = this.maxHp;
    this.speed = this.type == "cavalry" ? 1.2 : 0.8;
    this.attackRange = this.type == "archer" ? 300 : 20;
    this.attackDamage = this.type == "cavalry" ? 20 : this.type == "archer" ? 12 : 10;
    this.attackCooldown = this.type == "archer" ? 90 : 45;
    this._cd = 0;
    this.target = null;
    this.orderPos = null;
    this.dead = false;
    this.selected = false;
    this.r = 8;
  }

  update() {
    if (this.dead) return;
    if (this._cd > 0) this._cd--;

    let enemy = this.findNearestEnemy(500);
    if (enemy) {
      let d = p5.Vector.dist(this.pos, enemy.pos);
      if (d <= this.attackRange) {
        this.attack(enemy);
        this.moveAwayFromOverlap();
      } else {
        this.moveTowards(enemy.pos);
      }
    } else if (this.orderPos) {
      let d = p5.Vector.dist(this.pos, this.orderPos);
      if (d > 6) this.moveTowards(this.orderPos);
      else this.vel.mult(0);
    } else {
      this.vel.mult(0.8);
    }

    this.pos.add(this.vel);
    this.pos.x = constrain(this.pos.x, -4000, 4000);
    this.pos.y = constrain(this.pos.y, -4000, 4000);

    if (this.hp <= 0) this.dead = true;
  }

  moveTowards(target) {
    let dir = p5.Vector.sub(target, this.pos);
    dir.normalize();
    let avoid = createVector(0, 0);
    for (let other of this.army.units) {
      if (other === this) continue;
      let d = p5.Vector.dist(this.pos, other.pos);
      if (d < 14) {
        let push = p5.Vector.sub(this.pos, other.pos);
        push.normalize();
        push.mult((14 - d) * 0.05);
        avoid.add(push);
      }
    }
    dir.add(avoid);
    dir.normalize();
    this.vel = dir.mult(this.speed);
  }

  moveAwayFromOverlap() {
    this.pos.x += random(-0.2, 0.2);
    this.pos.y += random(-0.2, 0.2);
  }

  findNearestEnemy(radius) {
    let best = null;
    let bestD = radius + 1;
    for (let a of armies) {
      if (a === this.army) continue;
      for (let u of a.units) {
        if (u.dead) continue;
        let d = p5.Vector.dist(this.pos, u.pos);
        if (d < bestD) {
          bestD = d;
          best = u;
        }
      }
    }
    return best;
  }

  attack(enemy) {
    if (this._cd > 0) return;

    // --- Volley logic for ranged units ---
    if (this.attackRange > 30) {
      // all archers fire together on synchronized volleyTimer ticks
      if (volleyTimer % 120 !== 0) return; // fire every 2 seconds
    }

    this._cd = this.attackCooldown;

    if (this.attackRange > 30) {
      // ranged projectile
      let p = new Projectile(this.pos.x, this.pos.y, enemy, this.attackDamage, this);
      projectiles.push(p);
    } else {
      // melee
      let d = p5.Vector.dist(this.pos, enemy.pos);
      if (d <= 24) {
        enemy.hp -= this.attackDamage * (1 + random(-0.15, 0.15));
      }
    }
  }

  draw() {
    if (this.dead) return;
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(this.army.color);
    ellipse(0, 0, this.r * 2);

    // HP bar
    stroke(0);
    strokeWeight(1 / cam.zoom);
    let w = 18,
      h = 4;
    fill(0);
    rect(-w / 2, -this.r - 10, w, h);
    fill(lerpColor(color(255, 0, 0), color(0, 255, 0), constrain(this.hp / this.maxHp, 0, 1)));
    rect(-w / 2, -this.r - 10, w * constrain(this.hp / this.maxHp, 0, 1), h);

    if (this.selected) {
      noFill();
      stroke(255, 255, 0);
      strokeWeight(2 / cam.zoom);
      ellipse(0, 0, this.r * 2.8);
    }
    pop();
  }
}

class Projectile {
  constructor(x, y, target, damage, owner) {
    this.pos = createVector(x, y);
    this.target = target;
    this.speed = 6;
    this.damage = damage;
    this.owner = owner;
    this.dead = false;
  }
  update() {
    if (this.dead) return;
    if (!this.target || this.target.dead) {
      this.dead = true;
      return;
    }
    let dir = p5.Vector.sub(this.target.pos, this.pos).normalize();
    this.pos.add(dir.mult(this.speed));
    if (p5.Vector.dist(this.pos, this.target.pos) < 8) {
      this.target.hp -= this.damage * (1 + random(-0.1, 0.1));
      this.dead = true;
    }
  }
  draw() {
    if (this.dead) return;
    push();
    translate(this.pos.x, this.pos.y);
    noStroke();
    fill(200, 100, 50);
    ellipse(0, 0, 6);
    pop();
  }
}

// ---------------- INPUT ----------------
function mousePressed() {
  if (mouseButton === LEFT) {
    selecting = true;
    selectStart = screenToWorld(createVector(mouseX, mouseY));
  }
}

function mouseReleased() {
  if (mouseButton === LEFT) {
    selecting = false;
    let selEnd = screenToWorld(createVector(mouseX, mouseY));
    let r = {
      x1: min(selectStart.x, selEnd.x),
      y1: min(selectStart.y, selEnd.y),
      x2: max(selectStart.x, selEnd.x),
      y2: max(selectStart.y, selEnd.y),
    };
    selection = [];
    for (let a of armies) {
      for (let u of a.units) {
        if (u.pos.x >= r.x1 && u.pos.x <= r.x2 && u.pos.y >= r.y1 && u.pos.y <= r.y2) {
          u.selected = true;
          selection.push(u);
        } else u.selected = false;
      }
    }
  }
}

function mouseClicked() {
  if (mouseButton === RIGHT) {
    let world = screenToWorld(createVector(mouseX, mouseY));
    for (let u of selection) u.orderPos = world.copy();
  } else if (mouseButton === LEFT && !selecting) {
    let world = screenToWorld(createVector(mouseX, mouseY));
    let clicked = false;
    for (let a of armies) {
      for (let u of a.units) {
        if (p5.Vector.dist(u.pos, world) < 10) {
          clearSelection();
          u.selected = true;
          selection = [u];
          clicked = true;
          break;
        }
      }
      if (clicked) break;
    }
    if (!clicked) clearSelection();
  }
}

function keyPressed() {
  if (key === " ") paused = !paused;
  if (key === "1") spawnArmy(false);
  if (key === "2") spawnArmy(true);
  if (key === "F" || key === "f") toggleFormation();
  if (key === "D" || key === "d") showDebug = !showDebug;
}

function toggleFormation() {
  if (selection.length == 0) return;
  let avg = createVector(0, 0);
  for (let u of selection) avg.add(u.pos);
  avg.div(selection.length);
  let cols = ceil(sqrt(selection.length));
  let spacing = 16;
  for (let i = 0; i < selection.length; ++i) {
    let col = i % cols;
    let row = floor(i / cols);
    let target = createVector(avg.x + (col - cols / 2) * spacing, avg.y + (row - cols / 2) * spacing);
    selection[i].orderPos = target;
  }
}

function clearSelection() {
  for (let a of armies) for (let u of a.units) u.selected = false;
  selection = [];
}

function drawSelectionRect() {
  let sx = selectStart.x,
    sy = selectStart.y;
  let cur = screenToWorld(createVector(mouseX, mouseY));
  let a = worldToScreen(selectStart);
  noFill();
  stroke(255, 255, 0);
  strokeWeight(1);
  rectMode(CORNERS);
  rect(a.x, a.y, mouseX, mouseY);
}

function screenToWorld(v) {
  let x = (v.x - width / 2) / cam.zoom + cam.pos.x;
  let y = (v.y - height / 2) / cam.zoom + cam.pos.y;
  return createVector(x, y);
}

function worldToScreen(v) {
  let x = (v.x - cam.pos.x) * cam.zoom + width / 2;
  let y = (v.y - cam.pos.y) * cam.zoom + height / 2;
  return createVector(x, y);
}

function mouseWheel(event) {
  cam.zoom *= event.delta > 0 ? 0.95 : 1.05;
  cam.zoom = constrain(cam.zoom, 0.3, 2.5);
  return false;
}

function keyIsDownForPan() {
  let speed = 10 / cam.zoom;
  if (keyIsDown(87)) cam.pos.y -= speed;
  if (keyIsDown(83)) cam.pos.y += speed;
  if (keyIsDown(65)) cam.pos.x -= speed;
  if (keyIsDown(68)) cam.pos.x += speed;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ---------------- Utility ----------------
function drawGround() {
  stroke(30, 80, 30);
  strokeWeight(1 / cam.zoom);
  for (let x = -2000; x <= 2000; x += 100) line(x, -2000, x, 2000);
  for (let y = -2000; y <= 2000; y += 100) line(-2000, y, 2000, y);
}

function drawHUD() {
  fill(255);
  noStroke();
  textSize(14);
  textAlign(LEFT, TOP);
  text("1: Spawn Friendly | 2: Spawn Enemy | Drag: Select | Right-click: Move/Attack", 10, 10);
  text(`Armies: ${armies.length} Units: ${totalUnitCount()}`, 10, 30);
  text(`Paused: ${paused}`, 10, 50);
}

function totalUnitCount() {
  let c = 0;
  for (let a of armies) c += a.units.length;
  return c;
}

// ---------------- Spawning ----------------
function spawnArmy(isEnemy) {
  let a = new Army(isEnemy ? "Red" : "Blue", isEnemy ? color(200, 50, 50) : color(70, 130, 230), isEnemy);
  let cx = random(-600, 600) + (isEnemy ? 400 : -400);
  let cy = random(-200, 200);
  let types = ["infantry", "infantry", "archer", "archer", "cavalry"];
  for (let i = 0; i < 60; i++) {
    let t = random(types);
    let u = new Unit(cx + random(-60, 60), cy + random(-60, 60), a, t);
    a.addUnit(u);
  }
  armies.push(a);
}

function createTestArmies() {
  spawnArmy(false);
  spawnArmy(true);
}

// prevent context menu on right-click
window.addEventListener("contextmenu", (e) => e.preventDefault());
