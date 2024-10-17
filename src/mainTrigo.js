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

const countBalls = 10
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

	// ctx.beginPath()
	// ctx.strokeStyle = 'black'
	// ctx.moveTo( width * .5, 0 )
	// ctx.lineTo( width * .5, height )
	// ctx.moveTo( 0, height * .5 )
	// ctx.lineTo( width, height * .5 )
	// ctx.stroke()
	// ctx.closePath()

	ctx.save()
	ctx.translate( width * .5, height * .5 )


	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.arc( 0, 0, radius, 0, Math.PI * 2 )
	ctx.stroke()
	ctx.closePath()

	ctx.save()
	// ctx.translate( width * .5, height * .5 )

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

		ctx.fillStyle = 'red'
		ctx.arc( ball.x, ball.y, 10, 0, Math.PI * 2 )
		ctx.fill()

		if( ball.x > width * .5 || ball.x < -width * .5 || ball.y < -height * .5 || ball.y > height * .5 ) {
			ball.x = 0
			ball.y = 0
		}
	}
	

	ctx.restore()

	// const x = Math.cos( angle ) * radius
	// const y = Math.sin( angle ) * radius
	// ctx.beginPath()
	// ctx.fillStyle = 'red'
	// ctx.arc( x, y, 20, 0, Math.PI * 2 )
	// ctx.fill()
	// ctx.closePath()

	// ctx.beginPath()
	// ctx.strokeStyle = 'red'
	// ctx.moveTo( 0, 0 )
	// ctx.lineTo( x, y )
	// ctx.stroke()
	// ctx.closePath()

	// // ctx.font = "48px serif";
	// // ctx.fillText( '0 || Math.PI * 2', Math.cos( 0 ) * ( radius - 30 ), Math.sin( 0 ) * ( radius - 30 ) )
	// // ctx.fillText( '90 || Math.PI * .5', Math.cos( Math.PI * .5 ) * ( radius + 60), Math.sin( Math.PI * .5 ) * ( radius + 60) )
	// // ctx.fillText( '-90 || -Math.PI * .5', Math.cos( -Math.PI * .5 ) * ( radius + 30 ), Math.sin( -Math.PI * .5 ) * ( radius + 30 ) )
	// // ctx.fillText( '180 || Math.PI', Math.cos( Math.PI ) * ( radius + 150 ), Math.sin( Math.PI ) * ( radius + 150 ) )

	ctx.restore()

	angle -= Math.PI * .005

	requestAnimationFrame( drawTrigo )
}
drawTrigo()