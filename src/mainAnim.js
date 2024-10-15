import gsap from 'gsap'

// Setup

const domApp = document.getElementById( 'app' )

const width = 800
const height = 800

const canvas = document.createElement( 'canvas' )
canvas.width = width
canvas.height = height
const ctx = canvas.getContext( '2d' )
domApp.appendChild( canvas )

ctx.fillStyle = 'black'
ctx.fillRect( 0, 0, width, height )

// Project

const squareSize = 100
const squares = [ 
	{
		x: ( width - squareSize ) * .5 - 200,
		y: ( height - squareSize ) * .5
	},
	{
		x: ( width - squareSize ) * .5 + 200,
		y: ( height - squareSize ) * .5
	},
]

// https://gsap.com/docs/v3/Eases
const eases = [
	'expo.inOut',
	'power1.inOut',
]

function lookForNewPos( square ) {
	const xTo = Math.random() * width
	const yTo = Math.random() * height

	gsap.to( square, {
		x: xTo,
		y: yTo,
		duration: 2,
		onComplete: lookForNewPos,
		onCompleteParams: [ square ],
		delay: Math.random() * .5,
		ease: eases[ Math.floor( Math.random() * eases.length ) ]	
	} )
}

for( let i = 0; i < squares.length; i++ ) {
	lookForNewPos( squares[ i ] )
}

// Lancement anim
function drawSquares() {
	ctx.fillStyle = 'rgba( 0, 0, 0, .2 )'
	ctx.fillRect( 0, 0, width, height )

	const n = squares.length
	for( let i = 0; i < n; i++ ) {
		const square = squares[ i ]
		ctx.fillStyle = 'white'
		ctx.fillRect( square.x, square.y, squareSize, squareSize )
	}

	requestAnimationFrame( drawSquares )
}
drawSquares()


