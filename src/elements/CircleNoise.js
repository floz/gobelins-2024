import SimplexNoise from '../utils/noise';

export default class CircleNoise {

	constructor( x, y ) {
		this.x = x;
		this.y = y;

		this.noise = new SimplexNoise();
	}

	draw( ctx, data ) {
		ctx.beginPath()
		ctx.strokeStyle = data.color
		ctx.arc( this.x, this.y, data.radius, 0, Math.PI * 2 )
		ctx.stroke()
	}

}