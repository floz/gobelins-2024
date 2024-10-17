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

const countBalls = 100
let angle = 0
const radius = 200

const balls = []
let a = 0
for( let i = 0; i < countBalls; i++ ) {
	balls.push( { 
		x: 0,
		y: 0,
		a: a
	} )
	a += Math.PI * 2 / countBalls
}

function drawTrigo() {
	ctx.fillStyle = 'rgba( 255, 255, 255, .9 )'
	ctx.fillRect( 0, 0, width, height )

	ctx.save()
	ctx.translate( width * .5, height * .5 )

	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.arc( 0, 0, radius, 0, Math.PI * 2 )
	ctx.stroke()
	ctx.closePath()

	ctx.save()

	let a = 0
	for( let i = 0; i < countBalls; i++ ) {
		const ball = balls[ i ]
		ball.x += Math.cos( ball.a ) * 6
		ball.y += Math.sin( ball.a ) * 6

		ctx.beginPath()
		ctx.moveTo( 0, 0 )
		ctx.lineTo( Math.cos( ball.a ) * radius, Math.sin( ball.a ) * radius )
		ctx.stroke()
		ctx.closePath()

		ctx.beginPath()
		ctx.fillStyle = 'red'
		ctx.arc( ball.x, ball.y, 10, 0, Math.PI * 2 )
		ctx.fill()
		ctx.closePath()

		if( ball.x > width * .5 || ball.x < -width * .5 || ball.y < -height * .5 || ball.y > height * .5 ) {
			ball.x = 0
			ball.y = 0
		}
	}
	
	ctx.restore()
	ctx.restore()

	angle -= Math.PI * .005

	requestAnimationFrame( drawTrigo )
}
drawTrigo()