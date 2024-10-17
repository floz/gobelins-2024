import SimplexNoise from '../utils/noise';

export default class CircleNoise {

	constructor( x, y, noise, hsl ) {
		this.x = x;
		this.y = y;
		this.hsl = hsl;
		this.hsl.h += Math.random() * 100 - 50

		this.noise = new SimplexNoise();
	}

	draw( ctx, data ) {
		ctx.beginPath()
		ctx.strokeStyle = `hsl( ${ this.hsl.h >> 0 }, ${ this.hsl.s * 100 }%, ${ ( this.hsl.l - .4 ) * 100 }% )`
		ctx.fillStyle = `hsl( ${ this.hsl.h >> 0 }, ${ this.hsl.s * 100 }%, ${ this.hsl.l * 100 }% )`
		const countPoints = data.countPointsPerCircles
		const angle = Math.PI * 2 / countPoints

		for( let i = 0; i < countPoints; i++ ) {
			const a = angle * i
			const x = this.x + Math.cos( a ) * data.radius
			const y = this.y + Math.sin( a ) * data.radius
			const noise = this.noise.noise2D( x * data.noiseRatio, y * data.noiseRatio )
			const radius = data.radius + noise * data.noiseStr
			ctx.beginPath()
			ctx.arc( x, y, radius, 0, Math.PI * 2 )
			ctx.closePath()
			ctx.save()
			ctx.globalAlpha = data.alpha
			ctx.fill()
			ctx.restore()
			ctx.stroke()
		}
	}

}