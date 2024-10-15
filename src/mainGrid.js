import { Pane } from "tweakpane"

const domApp = document.getElementById( 'app' )

const width = 800
const height = 800

const canvas = document.createElement( 'canvas' )
canvas.width = width
canvas.height = height
const ctx = canvas.getContext( '2d' )
domApp.appendChild( canvas )

//

const data = {
	cols: 10,
	lines: 10,
	margins: 100,
	angleImpact: .4
}

const pane = new Pane()
pane.addBinding( data, 'cols', { min: 1, max: 20, step: 1 } )
pane.addBinding( data, 'lines', { min: 1, max: 20, step: 1 } )
pane.addBinding( data, 'margins', { min: 0, max: 200, step: 10 } )
pane.addBinding( data, 'angleImpact', { min: 0, max: 1, step: .1 } )
pane.on( 'change', () => {
	drawGrid()
} )

//

const hueRef = Math.random() * 360

const typesDivisions = [
	'divided',
	'triangled',
	'circle'
]

function drawGrid() {
	ctx.fillStyle = 'white'
	ctx.fillRect( 0, 0, width, height )

	const widthGrid = width - data.margins * 2
	const heightGrid = height - data.margins * 2

	// Pour le fun on ajoute des margins
	const xStart = data.margins
	const yStart = data.margins

	const wCell = widthGrid / data.cols
	const hCell = heightGrid / data.lines

	for( let iy = 0; iy < data.lines; iy++ ) {
		for( let ix = 0; ix < data.cols; ix++ ) {
			const x = ix * wCell
			const y = iy * hCell

			const percent = iy / data.lines

			drawCell( x + xStart, y + yStart, wCell, hCell, percent )
		}
	}
}

function drawCell( xCell, yCell, wCell, hCell, percent ) {
	ctx.save()

	// On translate au x/y de base
	ctx.translate( xCell, yCell )

	// On ajoute une translation random en fonction du percent
	const angle = Math.random() * Math.PI * 2
	const strength = Math.random() * 50 * percent
	const direction = {
		x: Math.cos( angle ) * strength,
		y: Math.sin( angle ) * strength
	}
	ctx.translate( direction.x, direction.y )

	// On applique la rotation en translatant au centre du rectangle
	const angleRotation = ( Math.random() * data.angleImpact - data.angleImpact * .5 ) * Math.PI
	ctx.translate( wCell * .5, hCell * .5 )
	ctx.rotate( angleRotation * percent )
	ctx.translate( -wCell * .5, -hCell * .5 )

	// On peut aussi choisir de diviser en 2 couleurs
	let hueDivRef = hueRef
	if( Math.random() < .1 ) {
		hueDivRef = hueRef + 180
	}
	const sat = 75 + Math.random() * 25 >> 0
	const hsl = { h: hueDivRef, s: sat, l: getLum() }

	const type = typesDivisions[ typesDivisions.length * Math.random() >> 0 ]
	if( type === 'divided' ) {
		drawDividedCell( wCell, hCell, hsl )
	} else if( type === 'triangled' ) {
		drawTriangledCell( wCell, hCell, hsl )
	} else {
		drawCircledCell( wCell, hCell, hsl )
	}

	ctx.restore()
}

function drawDividedCell( wCell, hCell, hsl ) {
	const divisions = 2 + Math.random() * 8 >> 0

	// Comme la grille peut etre un rectangle, on cherche le plus petit cote
	const baseStep = Math.min( wCell, hCell )
	// Cela nous sert maintenant de base pour la taille des divisions
	const step = baseStep / divisions

	let w = wCell
	let h = hCell
	for( let i = 0; i < divisions; i++ ) {
		const x = ( wCell - w ) * .5
		const y = ( hCell - h ) * .5

		const hue = getHue( hsl.h )
		const lum = getLum()
		ctx.beginPath()
		ctx.fillStyle = `hsl(${hue}, ${hsl.s}%, ${lum}%)`
		ctx.rect( x, y, w, h )
		ctx.fill()
		ctx.closePath()

		w -= step
		h -= step
	}
}

function drawTriangledCell( wCell, hCell, hsl ) {
	ctx.fillStyle = `hsl(${getHue( hsl.l )}, ${hsl.s}%, ${hsl.l}%)`
	ctx.fillRect( 0, 0, wCell, hCell )

	ctx.beginPath()
	ctx.fillStyle = `hsl(${getHue( hsl.l + 90 )}, ${hsl.s}%, ${hsl.l}%)`
	ctx.moveTo( 0, 0 )
	ctx.lineTo( wCell, 0 )
	ctx.lineTo( 0, hCell )
	ctx.fill()
	ctx.closePath()
}

function drawCircledCell( wCell, hCell, hsl ) {
	ctx.fillStyle = `hsl(${getHue( hsl.l )}, ${hsl.s}%, ${hsl.l}%)`
	ctx.fillRect( 0, 0, wCell, hCell )

	const divisions = 2 + Math.random() * 8 >> 0

	// Comme la grille peut etre un rectangle, on cherche le plus petit cote
	const baseStep = Math.min( wCell, hCell )
	// Cela nous sert maintenant de base pour la taille des divisions
	const step = baseStep / divisions

	let w = wCell
	let h = hCell
	for( let i = 0; i < divisions; i++ ) {
		const x = ( wCell - w ) * .5
		const y = ( hCell - h ) * .5

		const hue = getHue( hsl.h )
		const lum = getLum()
		ctx.beginPath()
		ctx.fillStyle = `hsl(${getHue(hsl.h)}, ${hsl.s}%, ${lum}%)`
		ctx.arc(x + w / 2, y + h / 2, Math.min(w, h) / 2, 0, Math.PI * 2)
		ctx.fill()
		ctx.closePath()

		w -= step
		h -= step
	}
}

//

function getHue( hue ) {
	return hue + Math.floor( Math.random() * 3 ) * 120
}

function getLum() {
	return 25 + Math.random() * 50 >> 0
}

drawGrid()