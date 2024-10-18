
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

		const noisePos = this.noise.noise2D( this.x * data.noisePosRatio, this.y * data.noisePosRatio ) * Math.PI * 2
		const dx = this.x + Math.cos( noisePos ) * data.noisePosStr * 6
		const dy = this.y + Math.sin( noisePos ) * data.noisePosStr * 6

		let startX, startY
		for( let i = 0; i < countPoints; i++ ) {
			const a = angle * i
			const x = dx + Math.cos( a ) * data.radius
			const y = dy + Math.sin( a ) * data.radius
			const noise = this.noise.noise2D( x * data.noiseRatio, y * data.noiseRatio )
			const radius = data.radius + noise * data.noiseStr
			
			const px = dx + Math.cos( a ) * radius
			const py = dy + Math.sin( a ) * radius
			if( i == 0 ) {
				ctx.moveTo( px, py )
				startX = px
				startY = py
			} else {
				ctx.lineTo( px, py )
			}
		}
		ctx.lineTo( startX, startY)
		ctx.save()
		ctx.stroke()
		ctx.globalCompositeOperation = 'lighten'
		// let's add additive blend
		ctx.globalAlpha = data.alpha
		ctx.fill()
		ctx.restore()
		ctx.closePath()
	}

}
