// Shared pencil-sketch helpers for the README drawings
import rough from 'roughjs';
import fs from 'fs';

export const gen = rough.generator();
let seed = 501;
export const o = (x = {}) => ({ seed: (seed += 17), roughness: 1.1, bowing: 1, ...x });
export const C = {
  paper: '#F4EDDA',
  graphite: '#35322D',
  soft: '#5B564D',
  red: '#C8423A',
  redDeep: '#8E2A24',
  blue: '#2C5B9C',
  blueDeep: '#1D3C68',
  note: '#FCF8EA',
  gold: '#E9C45E',
  pink: '#E8A79C',
  sky: '#9FC3D6',
  grass: '#8CBF6C',
  chalk: '#FFFCF1',
};
export const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
export const draw = (d, a = '') =>
  gen
    .toPaths(d)
    .filter((p) => p.stroke !== 'none' || (p.fill && p.fill !== 'none'))
    .map(
      (p) =>
        `<path d="${p.d.replace(/-?\d+\.\d+/g, (m) => (+m).toFixed(1).replace(/\.0$/, ''))}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${
          p.fill && p.fill !== 'none' ? p.fill : 'none'
        }" stroke-linecap="round" stroke-linejoin="round" ${a}/>`
    )
    .join('');
export const text = (x, y, s, { font = 'Hand', size = 24, fill = C.graphite, anchor = 'start', rotate = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${font === 'Hand' ? 700 : 400}" fill="${fill}" text-anchor="${anchor}"${
    rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : ''
  }>${esc(s)}</text>`;

// greedy word wrap using an average glyph width for the handwriting font
export function wrap(str, size, maxW, k = 0.44) {
  const words = str.split(' ');
  const lines = [];
  let cur = '';
  for (const w of words) {
    const t = cur ? cur + ' ' + w : w;
    if (t.length * size * k > maxW && cur) {
      lines.push(cur);
      cur = w;
    } else cur = t;
  }
  if (cur) lines.push(cur);
  return lines;
}

const hand = fs.readFileSync('caveat700.b64', 'utf8');
const marker = fs.readFileSync('marker.b64', 'utf8');
export const head = (w, h, title) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img"><title>${esc(title)}</title>
<defs><style>@font-face{font-family:'Hand';src:url(data:font/woff2;base64,${hand}) format('woff2');font-weight:700;}@font-face{font-family:'Marker';src:url(data:font/woff2;base64,${marker}) format('woff2');}</style>
<filter id="pencil" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="2" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.55" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="g"/><feDisplacementMap in="g" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.30  0 0 0 0 0.22  0 0 0 0.22 -0.02"/></filter>
<clipPath id="clip"><rect width="${w}" height="${h}" rx="6"/></clipPath>
</defs>
<g clip-path="url(#clip)"><rect width="${w}" height="${h}" fill="${C.paper}"/><rect width="${w}" height="${h}" filter="url(#paper)"/></g>`;

export const hatch = (drawable) => `<g filter="url(#pencil)">${draw(drawable)}</g>`;
export const OUT = '../../assets/';
export const save = (file, s) => fs.writeFileSync(OUT + file, s + '</svg>');
