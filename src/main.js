console.log( 'hello world' )

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

const squareSize = 100
ctx.fillStyle = 'white'
ctx.fillRect( ( width - squareSize ) * .5, ( height - squareSize ) * .5, squareSize, squareSize )

