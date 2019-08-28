p5.disableFriendlyErrors = true;

// Debug
var showFPS = false;
var showParticleCount = false;
var showParticles = true;
// Constants
const particleSize = 10;
const drawSize = 1; // TODO: Unused so far.

// Game Variables
var particlePalette = [Water, Dirt, Cloud, Gas, Metal];
var currentParticle = 0;
var particleBorder = false;
var particles = [];

function preload() {}

function setup() {
	createCanvas(particleSize * 60, particleSize * 30);
	rectMode(CENTER);
}

function keyPressed() {
	switch (keyCode) {
		case 87:
			currentParticle += 1;
			if (currentParticle == particlePalette.length) currentParticle = 0;
			break;
	}
	// Debug
	switch (keyCode) {
		case 49:
			showFPS = !showFPS;
			break;
		case 50:
			showParticleCount = !showParticleCount;
			break;
		case 51:
			showParticles = !showParticles;
			break;
		default:
			console.log(keyCode);
			break;
	}
}

function createParticle(mouseX, mouseY) {
	let x = (mouseX -= mouseX % particleSize);
	let y = (mouseY -= mouseY % particleSize);
	if (x >= 0 && x <= width && y >= 0 && y <= height) {
		let p = particles.find(p => {
			return p.pos.x == x && p.pos.y == y;
		});
		if (p === undefined) particles.push(new particlePalette[currentParticle](x, y));
	}
}

function draw() {
	background(220);
	if (mouseIsPressed) createParticle(mouseX, mouseY);
	particles.forEach(p => p.update());

	// Debug
	if (showFPS) text(Math.floor(frameRate()), 0, 10);
	if (showParticleCount) text(particles.length, 0, 20);
}
