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

const points = []
const countPoints = 200
for( let i = 0; i < countPoints; i++ ) {
	const a = Math.random() * Math.PI * 2
	const radCircle = Math.random() * 200
	points.push( { 
		x: Math.random() * width, 
		y: Math.random() * height,
		a: Math.random() * Math.PI * 2,
		speed: .25 + Math.random() * 4,
		xAttractor: width * .5 + Math.cos( a ) * radCircle,
		yAttractor: height * .5 + Math.sin( a ) * radCircle
	} )
}

function update() {
	ctx.fillStyle = 'rgba( 255, 255, 255, .9 )'
	ctx.fillRect( 0, 0, width, height )

	for( let i = 0; i < countPoints; i++ ) {
		const point = points[ i ]

		const speed = point.speed 
		let x = point.x;
		let y = point.y;
		point.x += Math.cos( point.a ) * speed
		point.y += Math.sin( point.a ) * speed

		if( point.x < 0 || point.x > width ) { 
			point.a = Math.PI - point.a
		}

		if( point.y < 0 || point.y > height ) {
			point.a = Math.PI * 2 - point.a
		}
	}

	// for( let i = 0; i < countPoints; i++ ) {

	const connections = []
	for( let i = 0; i < countPoints; i++ ) {
		const pointA = points[ i ]
		for( let j = i + 1; j < countPoints; j++ ) {
			const pointB = points[ j ]
			const dx = pointA.x - pointB.x
			const dy = pointA.y - pointB.y
			const distance = Math.sqrt( dx * dx + dy * dy )
			if( distance < 100 ) {
				connections.push( { pointA, pointB, str: distance / 100 } )
			}
		}
	}

	for( let connection of connections ) {
		ctx.beginPath()
		ctx.strokeStyle = `rgba( 191, 204, 217, ${connection.str} )`
		ctx.moveTo( connection.pointA.x, connection.pointA.y )
		ctx.lineTo( connection.pointB.x, connection.pointB.y )
		ctx.stroke()
		ctx.closePath()
	}

	for( let point of points ) {
		ctx.beginPath()
		ctx.fillStyle = '#1a7ad3'
		ctx.arc( point.x, point.y, 5, 0, Math.PI * 2 )
		ctx.fill()
		ctx.closePath()
	}

	requestAnimationFrame( update )
}
update()
