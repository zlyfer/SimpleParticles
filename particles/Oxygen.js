class Oxygen extends GenericParticle {
	constructor(x, y) {
		super(x, y);
		this.name = "oxygen";
		this.color = "#46abef";
		this.density = -3;
	}

	move() {
		super.move();
		let belowParticle = particles.find(p => {
			return p.pos.x == this.pos.x && p.pos.y == this.pos.y + particleSize;
		});
		if (belowParticle)
			if (belowParticle.name == "hydrogen") {
				let index = particles.indexOf(belowParticle);
				particles.splice(index, 1);
				let index2 = particles.indexOf(this);
				particles.splice(index2, 1);
				particles.push(new Water(this.pos.x, this.pos.y));
			}
	}
}
