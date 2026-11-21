import type { Teen } from '../camp/content';

const cache = new Map<string, string>();
function art(key: string, width: number, height: number, draw: (ctx: CanvasRenderingContext2D) => void) {
  const existing = cache.get(key);
  if (existing) return existing;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  draw(ctx);
  const url = canvas.toDataURL();
  cache.set(key, url);
  return url;
}
function oval(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, color: string) {
  ctx.beginPath(); ctx.ellipse(x, y, w, h, 0, 0, Math.PI * 2); ctx.fillStyle = color; ctx.fill();
}
function shape(ctx: CanvasRenderingContext2D, points: [number, number][], color: string) {
  ctx.beginPath();
  points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath(); ctx.fillStyle = color; ctx.fill();
}
function round(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, radius: number, color: string) {
  ctx.beginPath(); ctx.roundRect(x, y, w, h, radius); ctx.fillStyle = color; ctx.fill();
}

export function portrait(teen: Teen) {
  return art('teen-' + teen.id, 144, 144, ctx => {
    ctx.fillStyle = teen.color; ctx.fillRect(0, 0, 144, 144);
    oval(ctx, 74, 66, 52, 50, '#f5e3b63b');
    for (const [x, y, r] of [[24, 39, 3], [118, 45, 4], [19, 89, 2], [121, 97, 3], [104, 21, 2]])
      oval(ctx, x, y, r, r, '#fff2d67a');
    const hair = teen.hair;
    const skin = teen.skin;
    if (teen.style === 'pony') oval(ctx, 100, 73, 17, 35, hair);
    if (teen.style === 'bob') oval(ctx, 71, 75, 39, 38, hair);
    if (teen.style === 'bun') oval(ctx, 88, 29, 18, 15, hair);
    oval(ctx, 73, 144, 52, 41, '#31534b');
    shape(ctx, [[28,144],[49,113],[67,104],[84,103],[102,116],[121,144]], '#3f6254');
    if (teen.style === 'crop') shape(ctx, [[46,118],[63,110],[74,136],[81,110],[101,118],[93,144],[48,144]], '#675843');
    round(ctx, 63, 87, 22, 28, 7, skin);
    oval(ctx, 73, 66, 34, 38, hair);
    oval(ctx, 73, 72, 29, 34, skin);
    oval(ctx, 43, 75, 6, 8, skin);
    oval(ctx, 102, 74, 6, 8, skin);
    shape(ctx, [[44,64],[42,54],[47,41],[60,33],[78,32],[95,38],[105,52],[103,68],[94,53],[85,49],[68,58],[54,53],[49,68]], hair);
    if (teen.style === 'bob') {
      oval(ctx, 43, 75, 7, 20, hair); oval(ctx, 102, 75, 7, 18, hair);
    }
    oval(ctx, 61, 74, 2.3, 3.1, '#332a28');
    oval(ctx, 84, 73, 2.3, 3.1, '#332a28');
    oval(ctx, 54, 84, 4.7, 2.6, '#b871655b');
    oval(ctx, 92, 83, 4.7, 2.6, '#b871655b');
    ctx.beginPath(); ctx.moveTo(68, 89); ctx.quadraticCurveTo(73, 94, 79, 88); ctx.strokeStyle = '#85594b'; ctx.lineWidth = 2; ctx.stroke();
    if (teen.style === 'bun' || teen.style === 'pony') oval(ctx, 103, 85, 2.8, 3.2, '#ffe3a9');
  });
}

const palette: Record<string, [string, string, string]> = {
  sprout: ['#d2d899', '#476949', '#ede4af'], robot: ['#e6b884', '#805b44', '#f1d7a9'],
  team: ['#e8b0a0', '#8f5045', '#f9d2a9'], code: ['#add0c6', '#3f665c', '#e2e6bf'],
  paint: ['#c4afcf', '#735573', '#ecd5c5'], bird: ['#a8c3a0', '#466451', '#efe0ab'],
  gear: ['#e6b884', '#805b44', '#f1d7a9'], chart: ['#b2cbd9', '#4a6370', '#e8dcb5'],
  film: ['#c8afd8', '#715970', '#eadcc9'], music: ['#b9b5d2', '#5e5574', '#efd1c1'],
};
export function picture(name: string) {
  return art('picture-' + name, 400, 240, ctx => {
    const [bg, ink, cream] = palette[name] ?? palette.sprout;
    ctx.fillStyle = bg; ctx.fillRect(0, 0, 400, 240);
    oval(ctx, 202, 119, 108, 91, cream + '81');
    oval(ctx, 201, 205, 110, 12, ink + '24');
    for (const [x, y] of [[51,64],[319,56],[342,149],[76,151],[299,104],[117,44]]) {
      shape(ctx, [[x,y-7],[x+2,y-2],[x+9,y],[x+2,y+2],[x,y+7],[x-2,y+2],[x-9,y],[x-2,y-2]], cream);
    }
    const line = (points: [number, number][], width = 6, color = ink) => {
      ctx.beginPath();
      points.forEach(([x, y], i) => i ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
      ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.stroke();
    };
    switch (name) {
      case 'sprout':
        shape(ctx, [[146,139],[254,139],[232,205],[166,205]], '#a7634b');
        round(ctx, 140, 135, 120, 19, 6, '#c37f5d');
        line([[197,143],[202,115],[199,77]], 7);
        oval(ctx, 218, 81, 23, 12, '#72914d'); oval(ctx, 178, 104, 25, 13, '#5d794b'); oval(ctx, 197, 66, 15, 23, ink);
        break;
      case 'robot':
        line([[197,56],[197,38],[211,30]], 6); oval(ctx, 213, 30, 7, 7, ink);
        round(ctx, 147, 65, 106, 70, 12, ink);
        round(ctx, 153, 71, 94, 56, 9, cream);
        oval(ctx, 179, 95, 7, 8, ink); oval(ctx, 221, 95, 7, 8, ink);
        round(ctx, 170, 111, 60, 5, 2, bg);
        round(ctx, 162, 140, 75, 57, 12, '#71948c');
        line([[157,148],[138,159],[132,181]], 12); line([[240,148],[260,158],[267,177]], 12);
        oval(ctx, 195, 165, 8, 8, cream);
        break;
      case 'team':
        for (const [x, y, shade] of [[140,119,'#b77067'],[258,119,'#b77067'],[198,107,ink]] as const) {
          round(ctx, x-32, y+21, 64, 56, 16, shade);
          oval(ctx, x, y, 21, 21, shade);
          oval(ctx, x, y+2, 15, 15, cream);
        }
        round(ctx, 156, 29, 84, 45, 14, '#faf0cb');
        shape(ctx, [[195,70],[206,70],[194,85]], '#faf0cb');
        for (const x of [181,198,215]) oval(ctx, x, 52, 3.5, 3.5, ink);
        break;
      case 'code':
      case 'chart':
        round(ctx, 121, 55, 158, 132, 12, ink);
        round(ctx, 132, 69, 136, 94, 5, '#f5ead1');
        if (name === 'code') {
          line([[178,93],[159,114],[177,134]], 7); line([[222,93],[241,114],[222,134]], 7); line([[207,88],[191,141]], 6, '#86a471');
        } else {
          [29,49,35,65].forEach((height, i) => round(ctx, 152 + i * 25, 148 - height, 16, height, 4, i % 2 ? '#d8966c' : '#72999a'));
        }
        line([[104,194],[296,194]], 11);
        break;
      case 'paint':
        oval(ctx, 192, 127, 63, 49, '#ebd2ac'); oval(ctx, 227, 146, 13, 13, cream);
        for (const [x,y,c] of [[158,112,'#ca7d69'],[184,96,'#e5ae65'],[216,103,'#819e81'],[150,140,'#8e759b']] as const) oval(ctx,x,y,10,10,c);
        line([[218,185],[268,61]], 11, ink); shape(ctx,[[263,72],[277,38],[279,65]],'#d79272');
        break;
      case 'bird':
        oval(ctx, 195, 128, 55, 34, '#759368'); oval(ctx, 236, 98, 27, 27, ink);
        oval(ctx, 250, 93, 4, 4, cream); shape(ctx, [[258,95],[283,105],[258,112]], '#d6a861');
        shape(ctx, [[156,124],[111,108],[144,148],[172,140]], ink);
        oval(ctx, 191, 124, 28, 12, cream); line([[156,181],[249,171]], 8, '#a97a54');
        line([[185,151],[183,176]], 5); line([[209,151],[207,174]], 5);
        break;
      case 'gear':
        for (let i=0;i<8;i++) {
          const a = i * Math.PI / 4;
          oval(ctx, 197 + Math.cos(a)*56, 119 + Math.sin(a)*56, 17, 17, ink);
        }
        oval(ctx, 197, 119, 54, 54, ink); oval(ctx, 197, 119, 27, 27, cream); oval(ctx, 197, 119, 12, 12, bg);
        break;
      case 'film':
        round(ctx, 127, 94, 146, 100, 8, ink);
        shape(ctx, [[125,91],[268,58],[272,78],[130,111]], '#9b7896');
        for (const x of [152,183,214,245]) line([[x,105-(x-152)*0.21],[x-9,87-(x-152)*0.21]], 7, cream);
        shape(ctx, [[191,125],[191,173],[230,149]], cream);
        break;
      default:
        oval(ctx, 164, 164, 26, 18, ink); oval(ctx, 235, 145, 26, 18, ink);
        line([[185,163],[185,80],[256,56],[256,145]], 9);
        line([[185,91],[256,67]], 18);
    }
  });
}
