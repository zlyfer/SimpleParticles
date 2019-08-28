class Water extends GenericParticle {
	constructor(x, y) {
		super(x, y);
		this.name = "water";
		this.color = "#1E90FF";
		this.density = 1;
	}

	move() {
		super.move();
		let belowParticle = particles.find(p => {
			return p.pos.x == this.pos.x && p.pos.y == this.pos.y + particleSize;
		});
		if (belowParticle)
			if (belowParticle.name == "metal") {
				let index = particles.indexOf(belowParticle);
				particles.splice(index, 1);
				let index2 = particles.indexOf(this);
				particles.splice(index2, 1);
				particles.push(new Rust(this.pos.x, this.pos.y));
			}
	}
}
