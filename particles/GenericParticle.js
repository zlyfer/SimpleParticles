class GenericParticle {
	constructor(x, y) {
		this.pos = createVector(x, y);
		this.name = "genericparticle";
		this.color = "#000000";
		this.density = 0;
		this.doesWiggle = true;
	}

	update() {
		this.move();
		if (this.doesWiggle) this.wiggle();
		if (showParticles) this.draw();
	}

	move() {
		if (this.density > 0) {
			let belowParticle = particles.find(p => {
				return p.pos.x == this.pos.x && p.pos.y == this.pos.y + particleSize;
			});
			if (belowParticle === undefined) {
				if (this.pos.y + particleSize < height) this.pos.y += particleSize;
			} else if (belowParticle.density < this.density && belowParticle.density != 0) {
				belowParticle.pos.y = this.pos.y;
				this.pos.y += particleSize;
			}
		}
		if (this.density < 0) {
			let aboveParticle = particles.find(p => {
				return p.pos.x == this.pos.x && p.pos.y == this.pos.y - particleSize;
			});
			if (aboveParticle === undefined) {
				if (this.pos.y - particleSize > 0) this.pos.y -= particleSize;
			} else if (aboveParticle.density > this.density && aboveParticle.density != 0) {
				aboveParticle.pos.y = this.pos.y;
				this.pos.y -= particleSize;
			}
		}
	}

	wiggle() {
		// TODO: Not only if "particle ===undefined" but also if not the same (density);
		let rn = Math.floor(Math.random() * 2) == 0 ? true : false;
		if (rn) {
			if (this.pos.x - particleSize > 0)
				if (
					particles.find(p => {
						return p.pos.y == this.pos.y && p.pos.x == this.pos.x - particleSize;
					}) === undefined
				)
					this.pos.x -= particleSize;
		} else {
			if (this.pos.x + particleSize < width)
				if (
					particles.find(p => {
						return p.pos.y == this.pos.y && p.pos.x == this.pos.x + particleSize;
					}) === undefined
				)
					this.pos.x += particleSize;
		}
	}

	draw() {
		push();
		if (!particleBorder) stroke(this.color);
		fill(this.color);
		rect(this.pos.x, this.pos.y, particleSize, particleSize);
		pop();
	}
}
