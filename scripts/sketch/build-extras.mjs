// Sketch section headers + kit bag for the README (same pencil language as the hero)
import rough from 'roughjs';
import fs from 'fs';

const gen = rough.generator();
let seed = 101;
const o = (x = {}) => ({ seed: (seed += 17), roughness: 1.1, bowing: 1, ...x });
const C = { paper: '#F4EDDA', graphite: '#35322D', soft: '#5B564D', red: '#C8423A', blue: '#2C5B9C', note: '#FCF8EA' };
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
const draw = (d, a = '') =>
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
const text = (x, y, s, { font = 'Hand', size = 24, fill = C.graphite, anchor = 'start', rotate = 0 } = {}) =>
  `<text x="${x}" y="${y}" font-family="${font}" font-size="${size}" font-weight="${font === 'Hand' ? 700 : 400}" fill="${fill}" text-anchor="${anchor}"${
    rotate ? ` transform="rotate(${rotate} ${x} ${y})"` : ''
  }>${esc(s)}</text>`;

const hand = fs.readFileSync('caveat700.b64', 'utf8');
const marker = fs.readFileSync('marker.b64', 'utf8');
const head = (w, h, title, fonts) => `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img"><title>${esc(title)}</title>
<defs><style>${fonts.includes('Hand') ? `@font-face{font-family:'Hand';src:url(data:font/woff2;base64,${hand}) format('woff2');font-weight:700;}` : ''}${
  fonts.includes('Marker') ? `@font-face{font-family:'Marker';src:url(data:font/woff2;base64,${marker}) format('woff2');}` : ''
}</style>
<filter id="pencil" x="-5%" y="-10%" width="110%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="1.1" numOctaves="2" seed="2" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  2.6 0 0 0 -0.55" result="m"/><feComposite in="SourceGraphic" in2="m" operator="in" result="g"/><feDisplacementMap in="g" in2="n" scale="1.4" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="paper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" seed="4" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0.36  0 0 0 0 0.30  0 0 0 0 0.22  0 0 0 0.22 -0.02"/></filter>
<clipPath id="clip"><rect width="${w}" height="${h}" rx="6"/></clipPath>
</defs>
<g clip-path="url(#clip)"><rect width="${w}" height="${h}" fill="${C.paper}"/><rect width="${w}" height="${h}" filter="url(#paper)"/></g>`;

fs.mkdirSync('../../assets', { recursive: true });

// ---- section headers: a torn paper strip with a marker title, red underline and a pencil doodle ----
function header(file, title, note, doodle) {
  const W = 900,
    H = 84;
  let s = head(W, H, title, ['Hand', 'Marker']);
  s += text(28, 54, title, { font: 'Marker', size: 34 });
  const tw = title.length * 22.5;
  s += `<g filter="url(#pencil)">${draw(gen.curve([[26, 66], [tw * 0.45, 70], [tw + 34, 63]], o({ stroke: C.red, strokeWidth: 2.4 })))}</g>`;
  s += text(W - 28, 52, note, { size: 26, fill: C.blue, anchor: 'end', rotate: -1.5 });
  s += doodle ? doodle(tw + 70) : '';
  s += `</svg>`;
  fs.writeFileSync(`../../assets/${file}`, s);
}
const ballDoodle = (x) =>
  `<g transform="translate(${x} 42)">${draw(gen.circle(0, 0, 34, o({ stroke: C.graphite, strokeWidth: 1.6, fill: '#FFFCF1', fillStyle: 'solid' })))}<path d="M0 -5 L4.8 -1.5 L3 4.2 L-3 4.2 L-4.8 -1.5 Z" fill="${C.graphite}"/>${draw(
    gen.curve([[-40, 10], [-28, 16], [-20, 12]], o({ stroke: C.soft, strokeWidth: 1.2 }))
  )}${draw(gen.curve([[-44, -2], [-32, 2], [-22, 0]], o({ stroke: C.soft, strokeWidth: 1.2 })))}</g>`;
const bootsDoodle = (x) =>
  `<g transform="translate(${x} 40)" filter="url(#pencil)">${draw(
    gen.path('M-22 -10 L-4 -10 L-2 0 L22 4 Q28 8 22 12 L-22 12 Z', o({ stroke: C.graphite, strokeWidth: 1.6, fill: C.red, fillStyle: 'hachure', hachureGap: 2.4 }))
  )}</g>${draw(gen.path(`M${x - 22} 50 L${x - 4} 30 L${x - 2} 40 L${x + 22} 44 Q${x + 28} 48 ${x + 22} 52 L${x - 22} 52 Z`, o({ stroke: C.graphite, strokeWidth: 1.6 })))}`;
const whistleDoodle = (x) =>
  draw(gen.circle(x, 44, 26, o({ stroke: C.graphite, strokeWidth: 1.6, fill: '#9FB7D6', fillStyle: 'hachure', hachureGap: 2.6 }))) +
  draw(gen.rectangle(x, 31, 30, 10, o({ stroke: C.graphite, strokeWidth: 1.6 }))) +
  draw(gen.curve([[x - 10, 30], [x - 20, 16], [x - 34, 20]], o({ stroke: C.soft, strokeWidth: 1.2 })));
const clipboardDoodle = (x) =>
  draw(gen.rectangle(x - 16, 20, 32, 42, o({ stroke: C.graphite, strokeWidth: 1.6, fill: '#E9C45E', fillStyle: 'hachure', hachureGap: 3 }))) +
  draw(gen.rectangle(x - 7, 15, 14, 8, o({ stroke: C.graphite, strokeWidth: 1.4, fill: '#FFFCF1', fillStyle: 'solid' }))) +
  draw(gen.line(x - 9, 34, x + 9, 34, o({ stroke: C.graphite, strokeWidth: 1.2 }))) +
  draw(gen.line(x - 9, 44, x + 7, 44, o({ stroke: C.graphite, strokeWidth: 1.2 })));

header('h-scouting-report.svg', 'SCOUTING REPORT', 'who is this player?', clipboardDoodle);
header('h-the-squad.svg', 'THE SQUAD', 'current lineup + selected work', ballDoodle);
header('h-kit-bag.svg', 'KIT BAG', 'what I train with', bootsDoodle);
header('h-touchline.svg', 'TOUCHLINE', 'come say hi', whistleDoodle);

// ---- kit bag: hand-drawn name tags in colored pencil ----
{
  const groups = [
    ['languages', ['Python', 'JavaScript', 'Java', 'R'], '#E9C45E'],
    ['backend + AI', ['FastAPI', 'Django', 'PydanticAI', 'MCP', 'OpenAI API', 'RAG'], '#E8A79C'],
    ['web + data', ['React', 'Flask', 'PostgreSQL', 'Supabase', 'Firebase'], '#9FC3D6'],
  ];
  const W = 900, tagH = 36, lineH = 48, x0 = 196, xMax = W - 24;
  // layout pass (wrap tags that would run off the paper)
  const layout = [];
  let y = 26;
  groups.forEach(([label, tags, color], gi) => {
    let x = x0;
    const rowY = y;
    const items = [];
    tags.forEach((t) => {
      const w = t.length * 10 + 26;
      if (x + w > xMax) { x = x0; y += lineH; }
      items.push({ t, x, y, w });
      x += w + 12;
    });
    layout.push({ label, color, gi, rowY, items });
    y += lineH + 14;
  });
  const H = y + 4;
  let s = head(W, H, 'Kit bag: tools and languages', ['Hand']);
  layout.forEach(({ label, color, gi, rowY, items }) => {
    s += text(28, rowY + 30, label, { size: 24, fill: C.soft });
    items.forEach(({ t, x, y, w }) => {
      s += `<g filter="url(#pencil)">${draw(gen.rectangle(x, y + 6, w, tagH, o({ stroke: 'none', fill: color, fillStyle: 'hachure', hachureGap: 2.6, fillWeight: 1.6, hachureAngle: -40 + gi * 25 })))}</g>`;
      s += draw(gen.rectangle(x, y + 6, w, tagH, o({ stroke: C.graphite, strokeWidth: 1.4, roughness: 1.2 })));
      s += text(x + w / 2, y + 32, t, { size: 23, anchor: 'middle' });
    });
  });
  s += `</svg>`;
  fs.writeFileSync('../../assets/kit-bag.svg', s);
}
console.log('extras ok');
