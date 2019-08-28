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


/* Beispiel Aufruf:
 *                       constructor( x,  y,                                  style,                     appendingHtmlNode,                 eventListenerFunction,       event)
 * let meineMatritze = New svgMatrix(40, 20, {particleSpacing: 10, particleSize: 8}, document.getElementByID("HtmlNodeID"), wasDerEventListenerHaltAuslösenSoll(), "mousedown")
 */

class svgMatrix {
    constructor(x, y, style, appendingHtmlNode, eventListenerFunction, event) {
        /** @namespace x */
        if (x === undefined) {
            x = 25;
        }
        /** @namespace y */
        if (y === undefined) {
            y = 25;
        }
        /** @namespace style.Size */
        if (style.Size === undefined) {
            style.Size = 5;
        }
        /** @namespace style.Spacing */
        if (style.Spacing === undefined) {
            style.Spacing = 5;
        }
        /** @namespace style.color */
        if (style.color === undefined) {
            style.color = 0xff0000;
        }
        /** @namespace style.stroke */
        if (style.stroke === undefined) {
            style.stroke = 0x000000;
        }
        /** @namespace style.strokeWidth */
        if (style.strokeWidth === undefined) {
            style.strokeWidth = "0px";
        }
        /** @namespace style.opacity */
        if (style.opacity === undefined) {
            style.opacity = 1;
        }
        /** @namespace style.corner */
        if (style.corner === undefined) {
            style.corner = 0;
        }
        /** @namespace appendingHtmlNode */
        if (appendingHtmlNode === undefined) {
            appendingHtmlNode = document.getElementsByTagName("body")[0];
        }
        /** @namespace eventListenerFunction */
        if (eventListenerFunction === undefined){
            eventListenerFunction = function () {
                alert("Du hast vergessen eine Function in den EventListener zu übergeben!")
            }
        }
        /** @namespace event */
        if (event === undefined){
            event = "mousedown"
        }

        this.matrice = [[]];
        let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        appendingHtmlNode.appendChild(svg);
        svg.style.width = "100%";
        svg.style.height = "100%";
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                this.matrice[i] = [];
                this.matrice[i][j] = document.createElementNS("http://www.w3.org/2000/svg", "rect");
                svg.appendChild(this.matrice[i][j]);
                this.matrice[i][j].setAttribute("x", i * style.Spacing);
                this.matrice[i][j].setAttribute("y", j * style.Spacing);
                this.matrice[i][j].setAttribute("height", style.Size);
                this.matrice[i][j].setAttribute("width", style.Size);
                this.matrice[i][j].setAttribute("rx", style.corner);
                this.matrice[i][j].setAttribute("ry", style.corner);
                this.matrice[i][j].style.fill = style.color;
                this.matrice[i][j].style.stroke = style.stroke;
                this.matrice[i][j].style.strokeWidth = style.strokeWidth;
                this.matrice[i][j].style.opacity = style.opacity;
                this.matrice[i][j].addEventListener( event, eventListenerFunction);
            }
        }

    }
}
console.log("bla");
let meineMatritze = new svgMatrix(window.innerWidth/4.8, window.innerHeight/4.8, {Spacing: 4.80}, undefined, function () {console.log("klapt")}, "mouseover");