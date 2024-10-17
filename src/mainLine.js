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

const line = {
	x: width * .5,
	y: height * .5,
	vertices: [],
	friction: .98
}

const countVertices = 10
for( let i = 0; i < countVertices; i++ ) {
	line.vertices.push( { x: line.x, y: line.y } )
}
const friction = .1

function drawMouse() {
	ctx.fillStyle = 'rgba( 255, 255, 255, .9 )'
	ctx.fillRect( 0, 0, width, height )

	const dx = xMouse - line.x
	const dy = yMouse - line.y
	const dist = Math.sqrt( dx * dx + dy * dy )

	line.x += dx * friction
	line.y += dy * friction

	// Update vertices
	let target = line
	for( let vertex of line.vertices ) {
		vertex.x += ( target.x - vertex.x ) * friction
		vertex.y += ( target.y - vertex.y ) * friction

		target = vertex

		// Draw connections
		ctx.fillStyle = 'gray'
		ctx.beginPath()
		ctx.arc( vertex.x, vertex.y, 6, 0, Math.PI * 2 )
		ctx.fill()
		ctx.closePath()
	}

	// Draw line
	ctx.beginPath()
	ctx.strokeStyle = 'red'
	let isStart = true
	for( let vertex of line.vertices ) {
		if( !isStart ) {
			ctx.lineTo( vertex.x, vertex.y )
		} else {
			ctx.moveTo( vertex.x, vertex.y )
		}
		isStart = false
	}
	ctx.stroke()
	ctx.closePath()

	requestAnimationFrame( drawMouse )
}
drawMouse()
