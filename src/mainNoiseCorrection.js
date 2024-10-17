import { Pane } from "tweakpane"
import * as EssentialsPlugin from "@tweakpane/plugin-essentials"
import CircleNoise from "./elements/CircleNoise"
import MultiCircleNoise from "./elements/MultiCircleNoise"
import { SimplexNoise } from "./utils/noise"
import { hexToHSL } from "./utils/color"

const domApp = document.getElementById( 'app' )

const width = window.innerWidth
const height = window.innerHeight

const canvas = document.createElement( 'canvas' )
canvas.width = width
canvas.height = height
const ctx = canvas.getContext( '2d' )
domApp.appendChild( canvas )

//

const data = {
	cols: 3,
	lines: 82,
	radius: 99,
	countPointsPerCircles: 80,
	noiseRatio: .004,
	noiseStr: 50,
	noisePosRatio: .006,
	noisePosStr: 6,
	color: '#0d00ff',
	alpha: .5,
	activateBlendMode: true
}
const pane = new Pane()
pane.registerPlugin( EssentialsPlugin )
pane.addBinding( data, 'cols', { min: 1, max: 20, step: 1 } ).on( 'change', initAndDraw )
pane.addBinding( data, 'lines', { min: 1, max: 100, step: 1 } ).on( 'change', initAndDraw )
pane.addBinding( data, 'radius', { min: 1, max: 1000, step: 1 } ).on( 'change', draw )
pane.addBinding( data, 'countPointsPerCircles', { min: 3, max: 400, step: 1 } ).on( 'change', draw )
pane.addBlade({ view: 'separator'})
pane.addBinding( data, 'noiseRatio', { min: 0, max: .04, step: .001 } ).on( 'change', draw )
pane.addBinding( data, 'noiseStr', { min: 0, max: 50, step: .1 } ).on( 'change', draw )
pane.addBinding( data, 'color', { view: 'color' } ).on( 'change', initAndDraw )

let circles = null
const noise = new SimplexNoise()

function initAndDraw() {
	init()
	draw()
}

function init() {

	circles = []
	const cellWidth = width / data.cols
	const cellHeight = height / data.lines
	for( let ix = 0; ix < data.cols; ix++ ) {
		for( let iy = 0; iy < data.lines; iy++ ) {
			const x = ix / data.cols * width + cellWidth * .5
			const y = iy / data.lines * height + cellHeight * .5
			circles.push( new CircleNoise( x, y ) )
		}
	}
}

function draw() {
	ctx.fillStyle = 'rgba( 255, 255, 255, 1 )'
	ctx.fillRect( 0, 0, width, height )

	for( let circle of circles ) {
		circle.draw( ctx, data )
	}
}
initAndDraw()
