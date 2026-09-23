// Sketch versions of every README section so the whole profile is drawn, not GitHub text.
import { gen, o, C, draw, text, wrap, head, hatch, save } from './lib.mjs';

// ---------- scouting report: a ruled notebook page ----------
{
  const W = 900,
    H = 330;
  let s = head(W, H, "Scouting report: I'm a Mathematics + Computer Science student at UIUC building AI systems, full-stack products, and research tools.");
  // ruled lines + red margin
  for (let y = 58; y < H - 10; y += 34) s += `<g opacity="0.35">${draw(gen.line(12, y, W - 12, y + 1, o({ stroke: '#7FA6C9', strokeWidth: 1, roughness: 0.6 })))}</g>`;
  s += `<g opacity="0.7">${draw(gen.line(70, 10, 71, H - 10, o({ stroke: C.red, strokeWidth: 1.4, roughness: 0.7 })))}</g>`;
  // hole punches
  [70, 165, 260].forEach((y) => (s += `<circle cx="34" cy="${y}" r="9" fill="#D9CFB6"/>`));

  const intro = "I'm a Math + CS student at UIUC building AI systems, full-stack products and research tools.";
  wrap(intro, 27, 640).forEach((l, i) => (s += text(90, 52 + i * 34, l, { size: 27 })));
  s += text(90, 120, 'I turn messy real-world problems into software people actually use.', { size: 25, fill: C.soft });

  const rows = [
    ['Plays as:', 'creative attacking mid. Builds the agent, wires the backend, ships it.'],
    ['Academy:', "UIUC, B.S. Mathematics + Computer Science, Dean's List"],
    ['Training on:', 'voice + chat agents, RAG and tool-calling, sports analytics'],
  ];
  rows.forEach(([k, v], i) => {
    const y = 190 + i * 40;
    s += draw(gen.rectangle(92, y - 20, 22, 22, o({ stroke: C.graphite, strokeWidth: 1.4 })));
    s += draw(gen.linearPath([[95, y - 9], [102, y - 1], [118, y - 26]], o({ stroke: C.red, strokeWidth: 2.4, roughness: 0.8 })));
    s += text(126, y, k, { size: 25, fill: C.blue });
    s += text(252, y, v, { size: 24 });
  });
  // coach's stamp
  s += `<g transform="rotate(-12 812 104)">`;
  s += draw(gen.circle(812, 104, 118, o({ stroke: C.red, strokeWidth: 2.2, roughness: 1.4 })));
  s += draw(gen.circle(812, 104, 102, o({ stroke: C.red, strokeWidth: 1.2, roughness: 1.6 })));
  s += text(812, 88, "COACH'S", { font: 'Marker', size: 16, fill: C.red, anchor: 'middle' });
  s += text(812, 115, 'SIGN HIM', { font: 'Marker', size: 18, fill: C.red, anchor: 'middle' });
  s += text(812, 138, '★ ★ ★ ★ ★', { size: 18, fill: C.red, anchor: 'middle' });
  s += `</g>`;
  save('scouting-report.svg', s);
}

// ---------- squad cards (one image per player so each can be its own link) ----------
const squad = [
  ['squad-gnani', 9, 'Gnani.ai', 'Striker', 'Voice and chat agent backends with streaming speech-to-text and TTS.', ['FastAPI', 'PydanticAI', 'MCP', 'Postgres'], true],
  ['squad-zapp', 11, 'Zapp', 'Winger', 'Spending intelligence: scores what your subscriptions are actually worth.', ['Django', 'React', 'Supabase', 'ML'], true],
  ['squad-astrognani', 10, 'AstroGnani', 'Playmaker', 'Live B2C AI astrology platform with streaming voice and chat agents.', ['Python', 'FastAPI', 'PydanticAI'], true],
  ['squad-ncsa', 8, 'NCSA + IML', 'Box-to-box', 'LLM architecture, RAG + tool-calling workflows, and sports analytics research.', ['Python', 'LLMs', 'RAG'], true],
  ['squad-clayhr', 6, 'ClayHR', 'Holding mid', 'HR chatbot and community applications.', ['Flask', 'OpenAI', 'Firebase'], true],
  ['squad-skillvsluck', 4, 'Skill vs Luck', 'Centre-back', 'Modeling 20+ years of European soccer outcomes: how much is skill?', ['Python', 'R'], true],
  ['squad-chatbot', 5, 'Chatbot App', 'Centre-back', 'HR-focused chatbot with persistent conversations and RAG document upload.', ['Flask', 'OpenAI API'], true],
  ['squad-uiuc', 1, 'UIUC', 'Keeper · the foundation', "B.S. Mathematics + Computer Science. Dean's List.", ['Math', 'CS'], false],
];
const tagColors = [C.gold, C.pink, C.sky, C.grass];
squad.forEach(([file, n, name, pos, desc, tags, linked], idx) => {
  const W = 440,
    H = 220;
  let s = head(W, H, `#${n} ${name}, ${pos}: ${desc} Stack: ${tags.join(', ')}`);
  // sticky card
  s += draw(gen.rectangle(14, 16, W - 28, H - 30, o({ stroke: C.graphite, strokeWidth: 1.6, fill: C.note, fillStyle: 'solid', roughness: 1.2 })));
  // tape
  s += `<g transform="rotate(${idx % 2 ? 4 : -4} ${W / 2} 18)" opacity="0.75"><rect x="${W / 2 - 40}" y="6" width="80" height="22" fill="${idx % 2 ? '#A9CBD8' : '#E9B9B0'}"/></g>`;
  // number disc
  const disc = n === 1 ? C.blue : C.red;
  s += `<circle cx="58" cy="66" r="24" fill="${disc}" opacity="0.55"/>`;
  s += hatch(gen.circle(58, 66, 50, o({ stroke: 'none', fill: disc, fillStyle: 'hachure', hachureGap: 2.2, fillWeight: 1.8 })));
  s += draw(gen.circle(58, 66, 50, o({ stroke: n === 1 ? C.blueDeep : C.redDeep, strokeWidth: 1.8 })));
  s += text(58, 75, String(n), { size: 26, anchor: 'middle', fill: C.chalk });
  // name + position
  s += text(96, 66, name, { font: 'Marker', size: 27 });
  s += text(97, 92, pos, { size: 23, fill: C.blue });
  if (linked) s += text(W - 32, 56, 'open ↗', { size: 21, fill: C.blue, anchor: 'end', rotate: -3 });
  // description
  wrap(desc, 22, 370).slice(0, 2).forEach((l, i) => (s += text(34, 128 + i * 25, l, { size: 22, fill: C.graphite })));
  // stack tags
  let x = 34;
  tags.forEach((t, i) => {
    const w = t.length * 8.6 + 20;
    s += hatch(gen.rectangle(x, 166, w, 26, o({ stroke: 'none', fill: tagColors[i % 4], fillStyle: 'hachure', hachureGap: 2.6, fillWeight: 1.5 })));
    s += draw(gen.rectangle(x, 166, w, 26, o({ stroke: C.graphite, strokeWidth: 1.1 })));
    s += text(x + w / 2, 185, t, { size: 18, anchor: 'middle' });
    x += w + 8;
  });
  save(`${file}.svg`, s);
});

// ---------- touchline buttons ----------
[
  ['contact-linkedin', 'LinkedIn', 'say hi →', C.sky],
  ['contact-github', 'GitHub', 'see the code →', C.gold],
].forEach(([file, label, note, color]) => {
  const W = 300,
    H = 96;
  let s = head(W, H, label);
  s += hatch(gen.rectangle(18, 18, W - 36, H - 36, o({ stroke: 'none', fill: color, fillStyle: 'hachure', hachureGap: 2.6, fillWeight: 1.6 })));
  s += draw(gen.rectangle(18, 18, W - 36, H - 36, o({ stroke: C.graphite, strokeWidth: 1.8, roughness: 1.3 })));
  s += text(40, 58, label, { font: 'Marker', size: 24 });
  s += text(W - 36, 58, note, { size: 22, fill: C.blue, anchor: 'end' });
  save(`${file}.svg`, s);
});

// ---------- full-time footer ----------
{
  const W = 900,
    H = 70;
  let s = head(W, H, 'Full time. Thanks for scouting.');
  s += text(W / 2, 42, 'FULL TIME', { font: 'Marker', size: 24, anchor: 'middle' });
  s += draw(gen.line(150, 34, 380, 35, o({ stroke: C.soft, strokeWidth: 1.2 })));
  s += draw(gen.line(520, 35, 750, 34, o({ stroke: C.soft, strokeWidth: 1.2 })));
  s += text(W - 28, 60, 'drawn in code with rough.js', { size: 17, fill: C.soft, anchor: 'end' });
  s += text(28, 60, 'thanks for scouting', { size: 17, fill: C.soft });
  save('full-time.svg', s);
}
console.log('readme sketches ok');
