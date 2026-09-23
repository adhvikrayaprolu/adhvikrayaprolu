// Sketchbook football hero for github.com/adhvikrayaprolu
// Generates assets/hero-sketch.svg using rough.js (hand-drawn strokes + hachure "colored pencil" fills)
import rough from 'roughjs';
import fs from 'fs';

const gen = rough.generator();
let seedCounter = 7;
const nextSeed = () => (seedCounter += 13);

const C = {
  paper: '#F4EDDA',
  graphite: '#35322D',
  graphiteSoft: '#5B564D',
  gold: '#D9A836',
  goldLight: '#EFCB63',
  goldDeep: '#9C6F17',
  grassLight: '#8CBF6C',
  grassDark: '#5A9A4B',
  chalk: '#FFFCF1',
  red: '#C8423A',
  redDeep: '#8E2A24',
  blue: '#2C5B9C',
  note: '#FCF8EA',
};

// ---------- helpers ----------
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function draw(drawable, attrs = '') {
  return gen
    .toPaths(drawable)
    .filter((p) => p.stroke !== 'none' || (p.fill && p.fill !== 'none'))
    .map((p) => {
      const fill = p.fill && p.fill !== 'none' ? p.fill : 'none';
      return `<path d="${p.d.replace(/-?\d+\.\d+/g,(m)=>(+m).toFixed(1).replace(/\.0$/,''))}" stroke="${p.stroke}" stroke-width="${p.strokeWidth}" fill="${fill}" stroke-linecap="round" stroke-linejoin="round" ${attrs}/>`;
    })
    .join('\n');
}
const o = (extra = {}) => ({ seed: nextSeed(), roughness: 1.1, bowing: 1, ...extra });
const text = (x, y, s, { font = 'Hand', size = 24, fill = C.graphite, anchor = 'start', rotate = 0, weight = 700, extra = '' } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}"${
    rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : ''
  } ${extra}>${esc(s)}</text>`;

// ---------- canvas ----------
const W = 1200,
  H = 680;

const font700 = fs.readFileSync('caveat700.b64', 'utf8');
const fontMarker = fs.readFileSync('marker.b64', 'utf8');

let svg = [];
svg.push(`<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="t d">
<title id="t">Adhvik Rayaprolu — sketchbook scouting report</title>
<desc id="d">A colored-pencil sketch of a football pitch and a FIFA-style player card. Adhvik's projects are drawn as players in a 1-2-3-2 formation, and a ball passes from UIUC through research and AI products into the goal.</desc>
<defs>
<style>
@font-face{font-family:'Hand';src:url(data:font/woff2;base64,${font700}) format('woff2');font-weight:700;}
@font-face{font-family:'Marker';src:url(data:font/woff2;base64,${fontMarker}) format('woff2');}
.draw{animation:draw 1.1s ease-out both;}
@keyframes draw{from{stroke-dasharray:1;stroke-dashoffset:1}to{stroke-dasharray:1;stroke-dashoffset:0}}
.pop{animation:pop .5s ease-out both;transform-box:fill-box;transform-origin:center;}
@keyframes pop{from{opacity:0;transform:scale(.6)}to{opacity:1;transform:scale(1)}}
@media (prefers-reduced-motion: reduce){.draw,.pop{animation:none}}
</style>
<filter id="paperGrain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.30  0 0 0 0 0.22  0 0 0 0.22 -0.02"/>
</filter>
<filter id="paperFibers" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.012 0.18" numOctaves="2" seed="9" result="f"/>
  <feColorMatrix in="f" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.28  0 0 0 0.16 -0.04"/>
</filter>
<filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="2" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.55" result="mask"/>
  <feComposite in="SourceGraphic" in2="mask" operator="in" result="grainy"/>
  <feDisplacementMap in="grainy" in2="n" scale="1.6" xChannelSelector="R" yChannelSelector="G"/>
</filter>
<filter id="softPencil" x="-5%" y="-5%" width="110%" height="110%">
  <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="5" result="n"/>
  <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.6 0 0 0 0.05" result="mask"/>
  <feComposite in="SourceGraphic" in2="mask" operator="in"/>
</filter>
<filter id="shadow" x="-5%" y="-5%" width="110%" height="115%">
  <feDropShadow dx="0" dy="6" stdDeviation="8" flood-color="#000" flood-opacity="0.28"/>
</filter>
<radialGradient id="age" cx="50%" cy="45%" r="75%">
  <stop offset="0.6" stop-color="#B89A62" stop-opacity="0"/>
  <stop offset="1" stop-color="#9C7B45" stop-opacity="0.28"/>
</radialGradient>
<clipPath id="paperClip"><rect x="16" y="14" width="1168" height="650" rx="6"/></clipPath>
</defs>`);

// ---------- paper ----------
svg.push(`<g filter="url(#shadow)"><rect x="16" y="14" width="1168" height="650" rx="6" fill="${C.paper}"/></g>`);
svg.push(`<g clip-path="url(#paperClip)">
<rect x="0" y="0" width="${W}" height="${H}" filter="url(#paperFibers)"/>
<rect x="0" y="0" width="${W}" height="${H}" filter="url(#paperGrain)"/>
<rect x="16" y="14" width="1168" height="650" fill="url(#age)"/>
</g>`);
// faint erased construction lines (sketchbook feel)
svg.push(`<g opacity="0.16">${draw(gen.line(440, 62, 1180, 60, o({ stroke: C.graphiteSoft, strokeWidth: 0.8, roughness: 2 })))}${draw(
  gen.line(34, 646, 460, 648, o({ stroke: C.graphiteSoft, strokeWidth: 0.8, roughness: 2 }))
)}</g>`);

// ---------- FIFA card ----------
const card = [
  [100, 70],
  [350, 70],
  [400, 120],
  [400, 540],
  [225, 622],
  [50, 540],
  [50, 120],
];
const cardInner = [
  [106, 84],
  [344, 84],
  [386, 126],
  [386, 531],
  [225, 606],
  [64, 531],
  [64, 126],
];
svg.push(`<g id="card">`);
svg.push(`<g filter="url(#pencil)">`);
svg.push(draw(gen.polygon(card, o({ stroke: 'none', fill: C.goldLight, fillStyle: 'hachure', hachureAngle: -48, hachureGap: 3.2, fillWeight: 1.6, roughness: 1.4 }))));
svg.push(draw(gen.polygon(card, o({ stroke: 'none', fill: C.gold, fillStyle: 'hachure', hachureAngle: 38, hachureGap: 5, fillWeight: 1.3, roughness: 1.6 }))));
// deeper shading on the lower-right edge
svg.push(
  draw(
    gen.polygon(
      [
        [300, 70],
        [350, 70],
        [400, 120],
        [400, 540],
        [225, 622],
        [300, 540],
      ],
      o({ stroke: 'none', fill: C.goldDeep, fillStyle: 'hachure', hachureAngle: -60, hachureGap: 6, fillWeight: 1.1, roughness: 1.8 })
    )
  )
);
svg.push(`</g>`);
svg.push(draw(gen.polygon(card, o({ stroke: C.graphite, strokeWidth: 2.2, roughness: 1.3 }))));
svg.push(`<g opacity="0.8">${draw(gen.polygon(cardInner, o({ stroke: C.goldDeep, strokeWidth: 1.2, roughness: 1.6 })))}</g>`);

// rating + position
svg.push(text(86, 166, '89', { font: 'Marker', size: 62, fill: C.graphite, weight: 400 }));
svg.push(text(91, 200, 'CAM', { size: 32 }));
svg.push(`<g filter="url(#softPencil)">${draw(gen.line(88, 214, 150, 212, o({ stroke: C.graphite, strokeWidth: 1.6 })))}</g>`);
// club badge doodle
svg.push(draw(gen.circle(119, 250, 50, o({ stroke: C.graphite, strokeWidth: 1.5, fill: C.chalk, fillStyle: 'solid' }))));
svg.push(text(119, 256, 'UIUC', { size: 18, anchor: 'middle' }));
// portrait: sketched head & shoulders inside a frame
svg.push(`<g filter="url(#pencil)">`);
svg.push(draw(gen.ellipse(262, 180, 160, 168, o({ stroke: 'none', fill: '#F7E7B0', fillStyle: 'hachure', hachureAngle: 20, hachureGap: 4, fillWeight: 1.2 }))));
svg.push(draw(gen.circle(262, 152, 66, o({ stroke: 'none', fill: C.graphiteSoft, fillStyle: 'hachure', hachureAngle: -40, hachureGap: 3, fillWeight: 1.3 }))));
svg.push(
  draw(
    gen.path('M198 258 C200 214 226 196 262 196 C298 196 324 214 326 258 Z', o({ stroke: 'none', fill: C.graphiteSoft, fillStyle: 'hachure', hachureAngle: -40, hachureGap: 3.2, fillWeight: 1.3 }))
  )
);
svg.push(`</g>`);
svg.push(draw(gen.circle(262, 152, 66, o({ stroke: C.graphite, strokeWidth: 1.8 }))));
svg.push(draw(gen.path('M198 258 C200 214 226 196 262 196 C298 196 324 214 326 258', o({ stroke: C.graphite, strokeWidth: 1.8 }))));
// jersey number on the shirt
svg.push(text(262, 246, '10', { size: 26, anchor: 'middle', fill: C.chalk }));
svg.push(`<g opacity="0.7">${draw(gen.ellipse(262, 180, 160, 168, o({ stroke: C.goldDeep, strokeWidth: 1.1, roughness: 1.8 })))}</g>`);

// name
svg.push(text(225, 330, 'ADHVIK RAYAPROLU', { font: 'Marker', size: 27, anchor: 'middle', weight: 400 }));
svg.push(`<g filter="url(#softPencil)">${draw(gen.curve([[86, 344], [160, 340], [250, 346], [364, 339]], o({ stroke: C.red, strokeWidth: 2.2, roughness: 1.4 })))}</g>`);
svg.push(text(225, 372, 'Math + CS @ UIUC', { size: 25, anchor: 'middle' }));
svg.push(text(225, 397, 'AI agents · full-stack · research', { size: 21, anchor: 'middle', fill: C.graphiteSoft }));

// stats
svg.push(draw(gen.line(84, 412, 366, 410, o({ stroke: C.graphite, strokeWidth: 1.3 }))));
svg.push(draw(gen.line(225, 420, 226, 528, o({ stroke: C.graphite, strokeWidth: 1.3 }))));
const stats = [
  ['91', 'AI', '89', 'API'],
  ['90', 'MTH', '87', 'RES'],
  ['86', 'WEB', '92', 'SHP'],
];
stats.forEach(([a, al, b, bl], i) => {
  const y = 450 + i * 36;
  svg.push(text(98, y, a, { size: 32 }));
  svg.push(text(140, y, al, { size: 26, fill: C.graphiteSoft }));
  svg.push(text(250, y, b, { size: 32 }));
  svg.push(text(292, y, bl, { size: 26, fill: C.graphiteSoft }));
});
svg.push(text(225, 566, 'python · fastapi · react · postgres', { size: 18, anchor: 'middle', fill: C.graphite }));
svg.push(`</g>`);

// washi tape holding the card on the page
function tape(cx, cy, angle, color, stripe) {
  const w = 92,
    h = 28;
  const pts = [
    [cx - w / 2, cy - h / 2],
    [cx + w / 2, cy - h / 2 + 1],
    [cx + w / 2 - 2, cy + h / 2],
    [cx - w / 2 + 1, cy + h / 2 - 1],
  ];
  return `<g transform="rotate(${angle} ${cx} ${cy})" opacity="0.78">
  <polygon points="${pts.map((p) => p.join(',')).join(' ')}" fill="${color}"/>
  <g opacity="0.55">${draw(gen.polygon(pts, o({ stroke: 'none', fill: stripe, fillStyle: 'hachure', hachureAngle: 90, hachureGap: 9, fillWeight: 3, roughness: 0.4 })))}</g>
  </g>`;
}
svg.push(tape(96, 82, -38, '#E9B9B0', '#F7E3DC'));
svg.push(tape(356, 84, 36, '#A9CBD8', '#DCEBF0'));

// note next to card
svg.push(text(318, 650, '← scouted 2026', { size: 22, fill: C.blue, rotate: -3 }));

// ---------- pitch ----------
const G = { x0: 444, y0: 96, x1: 1176, y1: 604 }; // grass
const P = { x0: 466, y0: 112, x1: 1154, y1: 588 }; // touchlines
const cy = (P.y0 + P.y1) / 2;
const midX = (P.x0 + P.x1) / 2;
const sx = (P.x1 - P.x0) / 105,
  sy = (P.y1 - P.y0) / 68;

svg.push(`<g id="pitch">`);
svg.push(`<g filter="url(#pencil)">`);
svg.push(
  draw(
    gen.rectangle(G.x0, G.y0, G.x1 - G.x0, G.y1 - G.y0, o({ stroke: 'none', fill: C.grassLight, fillStyle: 'hachure', hachureAngle: -52, hachureGap: 3, fillWeight: 1.5, roughness: 1.3 }))
  )
);
const stripes = 10;
const sw = (G.x1 - G.x0) / stripes;
for (let i = 0; i < stripes; i += 2) {
  svg.push(
    draw(
      gen.rectangle(
        G.x0 + i * sw + 2,
        G.y0 + 2,
        sw - 3,
        G.y1 - G.y0 - 4,
        o({ stroke: 'none', fill: C.grassDark, fillStyle: 'hachure', hachureAngle: -30 + (i % 4) * 4, hachureGap: 3.6, fillWeight: 1.4, roughness: 1.5 })
      )
    )
  );
}
svg.push(`</g>`);
svg.push(draw(gen.rectangle(G.x0, G.y0, G.x1 - G.x0, G.y1 - G.y0, o({ stroke: C.graphite, strokeWidth: 1.8, roughness: 1.4 }))));

// chalk markings
const chalk = (d) => draw(d, 'opacity="0.95"');
const L = { stroke: C.chalk, strokeWidth: 2.6, roughness: 0.9 };
const mk = [];
mk.push(gen.rectangle(P.x0, P.y0, P.x1 - P.x0, P.y1 - P.y0, o(L)));
mk.push(gen.line(midX, P.y0, midX, P.y1, o(L)));
mk.push(gen.circle(midX, cy, 18.3 * sx, o(L)));
mk.push(gen.circle(midX, cy, 5, o({ ...L, fill: C.chalk, fillStyle: 'solid' })));
for (const side of [0, 1]) {
  const dir = side === 0 ? 1 : -1;
  const gx = side === 0 ? P.x0 : P.x1;
  const boxD = 16.5 * sx,
    boxH = 40.3 * sy,
    sixD = 5.5 * sx,
    sixH = 18.3 * sy;
  const bx = side === 0 ? gx : gx - boxD;
  mk.push(gen.rectangle(bx, cy - boxH / 2, boxD, boxH, o(L)));
  const sxX = side === 0 ? gx : gx - sixD;
  mk.push(gen.rectangle(sxX, cy - sixH / 2, sixD, sixH, o(L)));
  const spot = gx + dir * 11 * sx;
  mk.push(gen.circle(spot, cy, 4.5, o({ ...L, fill: C.chalk, fillStyle: 'solid' })));
  // penalty arc (only outside the box)
  const r = 9.15 * sx;
  const t = Math.acos((boxD - 11 * sx) / r);
  if (side === 0) mk.push(gen.arc(spot, cy, 2 * r, 2 * r, -t, t, false, o(L)));
  else mk.push(gen.arc(spot, cy, 2 * r, 2 * r, Math.PI - t, Math.PI + t, false, o(L)));
  // goals with cross-hatched nets
  const gw = 7.32 * sy * 1.25,
    depth = 14;
  const nx = side === 0 ? gx - depth : gx;
  svg.push(`<g filter="url(#softPencil)">${draw(
    gen.rectangle(nx, cy - gw / 2, depth, gw, o({ stroke: C.graphite, strokeWidth: 1.6, fill: C.graphiteSoft, fillStyle: 'cross-hatch', hachureGap: 4, fillWeight: 0.7 }))
  )}</g>`);
}
// corner arcs
[
  [P.x0, P.y0, 0, Math.PI / 2],
  [P.x1, P.y0, Math.PI / 2, Math.PI],
  [P.x1, P.y1, Math.PI, 1.5 * Math.PI],
  [P.x0, P.y1, 1.5 * Math.PI, 2 * Math.PI],
].forEach(([x, y, a, b]) => mk.push(gen.arc(x, y, 18, 18, a, b, false, o(L))));
svg.push(`<g>${mk.map(chalk).join('\n')}</g>`);
svg.push(`</g>`);

// ---------- players / lineup ----------
const players = [
  { id: 'uiuc', n: 1, label: 'UIUC', x: 520, y: cy },
  { id: 'svl', n: 4, label: 'Skill vs Luck', x: 628, y: 232 },
  { id: 'chat', n: 5, label: 'Chatbot App', x: 628, y: 468 },
  { id: 'ncsa', n: 8, label: 'NCSA + IML', x: 772, y: 184 },
  { id: 'astro', n: 10, label: 'AstroGnani', x: 810, y: cy },
  { id: 'clay', n: 6, label: 'ClayHR', x: 772, y: 516 },
  { id: 'gnani', n: 9, label: 'Gnani.ai', x: 1000, y: 262 },
  { id: 'zapp', n: 11, label: 'Zapp', x: 1000, y: 452 },
];
const byId = Object.fromEntries(players.map((p) => [p.id, p]));

// passing move: UIUC -> Skill vs Luck -> NCSA -> AstroGnani -> Gnani.ai -> goal
const goal = { x: P.x1 + 6, y: cy - 6 };
const route = ['uiuc', 'svl', 'ncsa', 'astro', 'gnani'].map((k) => byId[k]).concat([goal]);
const legs = [];
for (let i = 0; i < route.length - 1; i++) {
  const a = route[i],
    b = route[i + 1];
  const mx = (a.x + b.x) / 2,
    my = (a.y + b.y) / 2;
  const dx = b.x - a.x,
    dy = b.y - a.y,
    len = Math.hypot(dx, dy);
  const bend = (i % 2 ? -1 : 1) * Math.min(26, len * 0.12);
  const cx = mx - (dy / len) * bend,
    cyy = my + (dx / len) * bend;
  legs.push({ a, b, cx, cy: cyy, len });
}
const q = (l, t) => {
  const u = 1 - t;
  return [u * u * l.a.x + 2 * u * t * l.cx + t * t * l.b.x, u * u * l.a.y + 2 * u * t * l.cy + t * t * l.b.y];
};

// pass arrows (graphite, drawn on in sequence)
svg.push(`<g id="passes" filter="url(#softPencil)">`);
legs.forEach((l, i) => {
  const t0 = 24 / l.len,
    t1 = 1 - (i === legs.length - 1 ? 8 : 26) / l.len;
  const pts = [];
  for (let k = 0; k <= 16; k++) pts.push(q(l, t0 + ((t1 - t0) * k) / 16));
  const d = 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L');
  const delay = (0.4 + i * 0.55).toFixed(2);
  svg.push(`<path class="draw" style="animation-delay:${delay}s" pathLength="1" d="${d}" stroke="${C.graphite}" stroke-width="2" fill="none" stroke-linecap="round"/>`);
  // arrowhead
  const [ex, ey] = pts[pts.length - 1],
    [px, py] = pts[pts.length - 3];
  const ang = Math.atan2(ey - py, ex - px);
  const h1 = [ex - 12 * Math.cos(ang - 0.45), ey - 12 * Math.sin(ang - 0.45)];
  const h2 = [ex - 12 * Math.cos(ang + 0.45), ey - 12 * Math.sin(ang + 0.45)];
  svg.push(
    `<path class="pop" style="animation-delay:${(+delay + 0.9).toFixed(2)}s" d="M${h1.map((v) => v.toFixed(1)).join(' ')} L${ex.toFixed(1)} ${ey.toFixed(1)} L${h2
      .map((v) => v.toFixed(1))
      .join(' ')}" stroke="${C.graphite}" stroke-width="2.2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`
  );
});
// off-ball runs (wavy blue pencil)
const wavy = (x0, y0, x1, y1, amp = 5, waves = 5) => {
  const pts = [];
  const dx = x1 - x0,
    dy = y1 - y0,
    len = Math.hypot(dx, dy);
  const nx = -dy / len,
    ny = dx / len;
  for (let k = 0; k <= 60; k++) {
    const t = k / 60,
      s = Math.sin(t * Math.PI * 2 * waves) * amp;
    pts.push([x0 + dx * t + nx * s, y0 + dy * t + ny * s]);
  }
  return { d: 'M' + pts.map((p) => p.map((v) => v.toFixed(1)).join(' ')).join(' L'), end: pts[60], prev: pts[57] };
};
[
  [byId.zapp.x + 22, byId.zapp.y - 10, 1100, 392],
  [byId.clay.x + 24, byId.clay.y - 6, 900, 488],
].forEach(([a, b, c, d], i) => {
  const w = wavy(a, b, c, d);
  const delay = (3.4 + i * 0.4).toFixed(2);
  svg.push(`<path class="draw" style="animation-delay:${delay}s" pathLength="1" d="${w.d}" stroke="${C.blue}" stroke-width="1.8" fill="none" stroke-linecap="round"/>`);
  const ang = Math.atan2(w.end[1] - w.prev[1], w.end[0] - w.prev[0]);
  const [ex, ey] = w.end;
  svg.push(
    `<path class="pop" style="animation-delay:${(+delay + 0.9).toFixed(2)}s" d="M${(ex - 10 * Math.cos(ang - 0.5)).toFixed(1)} ${(ey - 10 * Math.sin(ang - 0.5)).toFixed(1)} L${ex.toFixed(1)} ${ey.toFixed(
      1
    )} L${(ex - 10 * Math.cos(ang + 0.5)).toFixed(1)} ${(ey - 10 * Math.sin(ang + 0.5)).toFixed(1)}" stroke="${C.blue}" stroke-width="2" fill="none" stroke-linecap="round"/>`
  );
});
svg.push(`</g>`);

// players: red-pencil discs + sticky-note name tags
players.forEach((p, i) => {
  svg.push(`<g class="pop" style="animation-delay:${(0.1 + i * 0.07).toFixed(2)}s">`);
  svg.push(`<circle cx="${p.x}" cy="${p.y}" r="17" fill="${p.n === 1 ? C.blue : C.red}" opacity="0.55"/>`);
  svg.push(`<g filter="url(#pencil)">${draw(gen.circle(p.x, p.y, 36, o({ stroke: 'none', fill: p.n === 1 ? C.blue : C.red, fillStyle: 'hachure', hachureGap: 2.2, fillWeight: 1.8, hachureAngle: -45 })))}</g>`);
  svg.push(draw(gen.circle(p.x, p.y, 36, o({ stroke: p.n === 1 ? '#1D3C68' : C.redDeep, strokeWidth: 1.8 }))));
  svg.push(text(p.x, p.y + 7, String(p.n), { size: 22, anchor: 'middle', fill: C.chalk }));
  const tw = p.label.length * 9.6 + 20,
    th = 27,
    tx = p.x - tw / 2,
    ty = p.y + 24;
  svg.push(draw(gen.rectangle(tx, ty, tw, th, o({ stroke: C.graphite, strokeWidth: 1.2, fill: C.note, fillStyle: 'solid', roughness: 0.9 }))));
  svg.push(text(p.x, ty + 20, p.label, { size: 21, anchor: 'middle' }));
  svg.push(`</g>`);
});

// ---------- the ball (SMIL: follows the passing move, pauses at each player, scores, resets) ----------
let ballPath = `M${route[0].x} ${route[0].y}`;
legs.forEach((l) => (ballPath += ` Q${l.cx.toFixed(1)} ${l.cy.toFixed(1)} ${l.b.x} ${l.b.y}`));
const total = legs.reduce((s, l) => s + l.len, 0);
const DUR = 10; // seconds per loop
const hold = 0.45; // s pause at each player
const travel = DUR - 2.4 - hold * legs.length; // time spent moving
let tCur = 0,
  pCur = 0;
const kt = [0],
  kp = [0];
legs.forEach((l, i) => {
  tCur += hold;
  kt.push(tCur / DUR);
  kp.push(pCur);
  tCur += (l.len / total) * travel;
  pCur += l.len / total;
  kt.push(tCur / DUR);
  kp.push(Math.min(1, pCur));
});
kt.push(1);
kp.push(1);
const goalT = tCur / DUR;
const f = (v) => v.toFixed(4);
svg.push(`<g id="ball">
<g>
  <animateMotion dur="${DUR}s" repeatCount="indefinite" calcMode="linear" keyTimes="${kt.map(f).join(';')}" keyPoints="${kp.map(f).join(';')}" path="${ballPath}"/>
  <animate attributeName="opacity" dur="${DUR}s" repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.02;${f(goalT + 0.12)};${f(goalT + 0.16)};1"/>
  <g transform="translate(9 -12)">
    <circle r="9" fill="${C.chalk}" stroke="${C.graphite}" stroke-width="1.6"/>
    <path d="M0 -3.4 L3.2 -1 L2 2.8 L-2 2.8 L-3.2 -1 Z" fill="${C.graphite}"/>
    <path d="M0 -3.4 L0 -8.6 M3.2 -1 L8.2 -2.4 M2 2.8 L5 7 M-2 2.8 L-5 7 M-3.2 -1 L-8.2 -2.4" stroke="${C.graphite}" stroke-width="1.1"/>
  </g>
</g>
</g>`);
// GOAL! scribble flashes when the ball hits the net
svg.push(`<g opacity="0">
<animate attributeName="opacity" dur="${DUR}s" repeatCount="indefinite" values="0;0;1;1;0;0" keyTimes="0;${f(goalT)};${f(goalT + 0.01)};${f(goalT + 0.16)};${f(goalT + 0.2)};1"/>
${text(1058, 206, 'GOAL!', { font: 'Marker', size: 38, fill: C.red, weight: 400, rotate: -10 })}
</g>`);

// ---------- headings / coach scribbles ----------
svg.push(text(470, 76, 'the game plan', { font: 'Marker', size: 34, weight: 400, rotate: -1.5 }));
svg.push(`<g filter="url(#softPencil)">${draw(gen.curve([[472, 86], [560, 90], [690, 84]], o({ stroke: C.red, strokeWidth: 2, roughness: 1.2 })))}</g>`);
svg.push(text(1170, 72, 'projects linked below ↓', { size: 25, fill: C.blue, anchor: 'end', rotate: 1.5 }));
svg.push(text(466, 640, 'formation 1-2-3-2 · every player is a real project', { size: 23, fill: C.graphiteSoft, rotate: -0.6 }));

svg.push(`</svg>`);
fs.mkdirSync('../../assets', { recursive: true });
fs.writeFileSync('../../assets/hero-sketch.svg', svg.join('\n'));
console.log('ok', (fs.statSync('../../assets/hero-sketch.svg').size / 1024).toFixed(1) + 'KB', 'goalT', goalT.toFixed(3));
