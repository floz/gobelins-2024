const domApp = document.getElementById( 'app' )

const width = window.innerWidth
const height = window.innerHeight

const canvas = document.createElement( 'canvas' )
canvas.width = width
canvas.height = height
const ctx = canvas.getContext( '2d' )
domApp.appendChild( canvas )

//

const points = []
const countPoints = 10
for( let i = 0; i < countPoints; i++ ) {
	points.push( { 
		x: Math.random() * width, 
		y: Math.random() * height,
		a: Math.random() * Math.PI * 2
	} )
}

function update() {
	ctx.fillStyle = 'rgba( 255, 255, 255, .9 )'
	ctx.fillRect( 0, 0, width, height )

	// update les points

	// trouve les connections
	
	// draw les connections
	// draw les points

	requestAnimationFrame( update )
}
update()
