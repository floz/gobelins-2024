console.log( 'hello trigo' )

const domApp = document.getElementById( 'app' )

const width = 800
const height = 800

const canvas = document.createElement( 'canvas' )
canvas.width = width
canvas.height = height
const ctx = canvas.getContext( '2d' )
domApp.appendChild( canvas )

//

const radius = 200

const countPoints = 360
const aStep = Math.PI * 2 / countPoints
let a = Math.random() * Math.PI * 2
const points = []
for( let i = 0; i < countPoints; i++ ) {
	points.push( {
		x: width * .5 + Math.cos( a ) * radius,
		y: height * .5 + Math.sin( a ) * radius,
		a
	} )
	a += aStep
}

function drawTrigo() {
	ctx.fillStyle = 'rgba( 255, 255, 255, .6 )'
	ctx.fillRect( 0, 0, width, height )

	ctx.beginPath()
	ctx.strokeStyle = 'black'
	let isStart = true
	for( let point of points ) {
		const rad = Math.random() * 30
		const x = point.x + Math.cos( point.a ) * rad
		const y = point.y + Math.sin( point.a ) * rad
		if( !isStart ) {
			ctx.lineTo( x, y )
		} else {
			ctx.moveTo( x, y )
		}
		isStart = false
	}
	ctx.stroke()
	ctx.closePath()


	requestAnimationFrame( drawTrigo )
}
drawTrigo()