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

let angle = 0
const radius = 200

function drawTrigo() {
	ctx.fillStyle = 'rgba( 255, 255, 255, .9 )'
	ctx.fillRect( 0, 0, width, height )

	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.moveTo( width * .5, 0 )
	ctx.lineTo( width * .5, height )
	ctx.moveTo( 0, height * .5 )
	ctx.lineTo( width, height * .5 )
	ctx.stroke()
	ctx.closePath()

	ctx.save()
	ctx.translate( width * .5, height * .5 )


	ctx.beginPath()
	ctx.strokeStyle = 'black'
	ctx.arc( 0, 0, radius, 0, Math.PI * 2 )
	ctx.stroke()
	ctx.closePath()

	const x = Math.cos( angle ) * radius
	const y = Math.sin( angle ) * radius
	ctx.beginPath()
	ctx.fillStyle = 'red'
	ctx.arc( x, y, 20, 0, Math.PI * 2 )
	ctx.fill()
	ctx.closePath()

	ctx.beginPath()
	ctx.strokeStyle = 'red'
	ctx.moveTo( 0, 0 )
	ctx.lineTo( x, y )
	ctx.stroke()
	ctx.closePath()

	// ctx.font = "48px serif";
	// ctx.fillText( '0 || Math.PI * 2', Math.cos( 0 ) * ( radius - 30 ), Math.sin( 0 ) * ( radius - 30 ) )
	// ctx.fillText( '90 || Math.PI * .5', Math.cos( Math.PI * .5 ) * ( radius + 60), Math.sin( Math.PI * .5 ) * ( radius + 60) )
	// ctx.fillText( '-90 || -Math.PI * .5', Math.cos( -Math.PI * .5 ) * ( radius + 30 ), Math.sin( -Math.PI * .5 ) * ( radius + 30 ) )
	// ctx.fillText( '180 || Math.PI', Math.cos( Math.PI ) * ( radius + 150 ), Math.sin( Math.PI ) * ( radius + 150 ) )

	ctx.restore()

	angle -= Math.PI * .005

	requestAnimationFrame( drawTrigo )
}
drawTrigo()