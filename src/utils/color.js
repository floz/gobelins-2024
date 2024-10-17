// Origin
//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb

function normalizeHue( hue ) {
	return ((hue = hue % 360) < 0 ? hue + 360 : hue)
}

const differenceHueSaturation = (std, smp) => {
	if (std.h === undefined || smp.h === undefined || !std.s || !smp.s) {
		return 0;
	}
	let std_h = normalizeHue(std.h);
	let smp_h = normalizeHue(smp.h);
	let dH = Math.sin((((smp_h - std_h + 360) / 2) * Math.PI) / 180);
	return 2 * Math.sqrt(std.s * smp.s) * dH;
};

const differenceHueNaive = (std, smp) => {
	if (std.h === undefined || smp.h === undefined) {
		return 0;
	}
	let std_h = normalizeHue(std.h);
	let smp_h = normalizeHue(smp.h);
	if (Math.abs(smp_h - std_h) > 180) {
		// todo should this be normalized once again?
		return std_h - (smp_h - 360 * Math.sign(smp_h - std_h));
	}
	return smp_h - std_h;
};

const differenceHueChroma = (std, smp) => {
	if (std.h === undefined || smp.h === undefined || !std.c || !smp.c) {
		return 0;
	}
	let std_h = normalizeHue(std.h);
	let smp_h = normalizeHue(smp.h);
	let dH = Math.sin((((smp_h - std_h + 360) / 2) * Math.PI) / 180);
	return 2 * Math.sqrt(std.c * smp.c) * dH;
};

// Weigted color difference

// Find nearest color in a list

// rgb between [0..1]
// return hex as number
function RGBToHex(r, g, b) {
	r = parseFloat( r )
	g = parseFloat( g ) 
	b = parseFloat( b )
	return (r*255 << 16) + (g*255 << 8) + b*255
}

// hex as number to RGB
// return rgb between [0..1]
function hexToRGB( color ) {
	const r = ( color >> 16 ) & 0xff
	const g = ( color >> 8 ) & 0xff
	const b = ( color ) & 0xff
	return { r: r/255, g: g/255, b: b/255 }
}

// rgb between [0..1]
// return html ready #00ddff
function RGBtoHexHTML(r, g, b) {
	return "#" + ((1 << 24) + (Math.floor(r*255) << 16) + (Math.floor(g*255) << 8) + Math.floor(b*255)).toString(16).slice(1)
}

// hex as a int
// return html ready #00ddff
function hexToHTML(hex){
	let rgb = hexToRGB(hex)
	return RGBtoHexHTML(rgb.r, rgb.g, rgb.b)
}

//hex as html ready #F00 or #FF0000
//return rgb between [0..1]
function hexHTMLToRGB(hex) {
	var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
	hex = hex.replace(shorthandRegex, function(m, r, g, b) {
			return r + r + g + g + b + b
	})
	var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result ? {
			r: parseInt(result[1], 16)/255,
			g: parseInt(result[2], 16)/255,
			b: parseInt(result[3], 16)/255
	} : null
}

/**
 * ADAPTED FROM : https://gist.github.com/mjackson/5311256
 * Formula adapted from http://en.wikipedia.org/wiki/HSV_color_space.
 * h, s, v between [0..1] 
 * return rgb between [0..1]
 */
function HSVtoRGB(h, s, v) {
  let r, g, b
  let i = Math.floor(h * 6)
  let f = h * 6 - i
  let p = v * (1 - s)
  let q = v * (1 - f * s)
	let t = v * (1 - (1 - f) * s)
	
  switch (i % 6) {
    case 0: r = v, g = t, b = p; break
    case 1: r = q, g = v, b = p; break
    case 2: r = p, g = v, b = t; break
    case 3: r = p, g = q, b = v; break
    case 4: r = t, g = p, b = v; break
    case 5: r = v, g = p, b = q; break
  }

  return {r:r, g:g, b:b}
}

// ADAPTED FROM : https://gist.github.com/mjackson/5311256
// used by hslToRgb
function hue2rgb(p, q, t) {
	if (t < 0) t += 1
	if (t > 1) t -= 1
	if (t < 1/6) return p + (q - p) * 6 * t
	if (t < 1/2) return q
	if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
	return p
}
// h, s, v between [0..1] 
// return rgb between [0..1]
function hslToRgb(h, s, l) {
  let r, g, b
  if (s == 0) {
    r = g = b = l // achromatic
  } else {
    let q = l < 0.5 ? l * (1 + s) : l + s - l * s
    let p = 2 * l - q
    r = hue2rgb(p, q, h + 1/3)
    g = hue2rgb(p, q, h)
    b = hue2rgb(p, q, h - 1/3)
  }
  return {r:r, g:g, b:b}
}

// Function to convert HSL to RGB
function hsl360ToRgb(h, s, l) {
	h = h % 360 / 360;
	let r, g, b;
	if (s == 0) {
			r = g = b = l;
	} else {
			const hue2rgb = (p, q, t) => {
					t = (t + 1) % 1;
					if (t < 1/6) return p + (q - p) * 6 * t;
					if (t < 1/2) return q;
					if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
					return p;
			};
			let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
			let p = 2 * l - q;
			r = hue2rgb(p, q, h + 1/3);
			g = hue2rgb(p, q, h);
			b = hue2rgb(p, q, h - 1/3);
	}
	return [r * 255, g * 255, b * 255];
}

// helper
function hslToHex(h, s, l) {
	let {r,g,b} = hslToRgb(h,s,l)
	return RGBToHex(r,g,b)
}

//------------------------------------------------------------------------------------ OLDIES

function toStringRGB( rgb ) {
	return "rgb( " + rgb.r + ", " + rgb.g + ", " + rgb.b + ")"
}

function toStringRGBA( rgb, a ) {
	return "rgba( " + rgb.r + ", " + rgb.g + ", " + rgb.b + ", " + a + ")"
}

function rgbToHsl(r, g, b, format = 'array' ){
		// r /= 255, g /= 255, b /= 255;
		var max = Math.max(r, g, b), min = Math.min(r, g, b);
		var h, s, l = (max + min) / 2;

		if(max == min){
				h = s = 0; // achromatic
		}else{
				var d = max - min;
				s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
				switch(max){
						case r: h = (g - b) / d + (g < b ? 6 : 0); break;
						case g: h = (b - r) / d + 2; break;
						case b: h = (r - g) / d + 4; break;
				}
				h /= 6;
		}

		if( format === 'array' ) {
			return [h, s, l];
		} else if( format === 'rgb' ) {
			return { r: h, g: s, b: l }
		} else {
			return { h, s, l }
		}
}

function hexToHSL( hex, { format = 'hsl', toString = true } = {} ) {
	const rgb = hexToRGB( hex )
	const hsl = rgbToHsl( rgb.r, rgb.g, rgb.b, format )
if( !toString ) {
		return hsl
	} else {
		hsl[ 0 ] *= 360
		hsl[ 1 ] *= 100
		hsl[ 2 ] *= 100
		return `hsl( ${hsl[0]}, ${hsl[1]}%, ${hsl[2]}% )`
	}
}

const getHSLFromHex = function( hex ) {
	const hslArray = hexToHSL( hex, false )
	return {
		h: hslArray[ 0 ] * 360,
		s: hslArray[ 1 ] * 100,
		l: hslArray[ 2 ] * 100
	}
}

function hslDistance(hsl1, hsl2) {
	let dh = Math.min(Math.abs(hsl1[0] - hsl2[0]), 360 - Math.abs(hsl1[0] - hsl2[0])) / 180;
	let ds = hsl1[1] - hsl2[1];
	let dl = hsl1[2] - hsl2[2];
	return Math.sqrt(dh * dh + ds * ds + dl * dl);
}


const colors = {
	rgbToHsl:rgbToHsl,
	hslToRgb:hslToRgb,
	hsl360ToRgb,
	hue2rgb:hue2rgb,
	toStringRGBA:toStringRGBA,
	toStringRGB:toStringRGB,
	RGBToHex:RGBToHex,
	hexToRGB:hexToRGB,
	RGBtoHexHTML:RGBtoHexHTML,
	hexHTMLToRGB:hexHTMLToRGB,
	hslToHex:hslToHex,
	hexToHSL: hexToHSL,
	differenceHueChroma,
	differenceHueSaturation,
	differenceHueNaive,
	getHSLFromHex,
	hslDistance
}

export default colors
export { hsl360ToRgb, hslDistance, RGBToHex,hslToHex,hexToRGB,RGBtoHexHTML,hexHTMLToRGB,rgbToHsl,hslToRgb,hue2rgb,toStringRGBA,toStringRGB, hexToHTML, hexToHSL, getHSLFromHex }
