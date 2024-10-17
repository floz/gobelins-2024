console.log( 'hello trigo' )

const domApp = document.getElementById( 'app' )

const width = window.innerWidth
const height = window.innerHeight

const canvas = document.createElement( 'canvas' )
canvas.width = width
canvas.height = height
const ctx = canvas.getContext( '2d' )
domApp.appendChild( canvas )

//

let xMouse = width * .5
let yMouse = height * .5

function onMouseMove( e ) {
	xMouse = e.clientX
	yMouse = e.clientY
}
document.body.addEventListener( 'mousemove', onMouseMove, false )

const ball = {
	x: width * .5,
	y: height * .5,
	radius: 20
}
const friction = .8

function drawMouse() {
	ctx.fillStyle = 'rgba( 255, 255, 255, .9 )'
	ctx.fillRect( 0, 0, width, height )

	const dx = xMouse - ball.x
	const dy = yMouse - ball.y
	const dist = Math.sqrt( dx * dx + dy * dy )

	ball.x += dx * friction
	ball.y += dy * friction

	ball.radius = 20 + 40 * dist / width

	ctx.beginPath()
	ctx.fillStyle = 'red'
	ctx.arc( ball.x, ball.y, ball.radius, 0, Math.PI * 2 )
	ctx.fill()
	ctx.closePath()

	requestAnimationFrame( drawMouse )
}
drawMouse()
