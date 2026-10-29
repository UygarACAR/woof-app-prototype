/* WOOF app — UI building blocks shared by every screen.
   Each helper returns an HTML string; screens.js composes them. */

// Resolve assets from this script's location so any page (prototype, stubs, board) can load it.
const ASSETS = new URL("../../assets/", document.currentScript.src).href;
const A = ASSETS + "img";

// "light" or "dark". Pages set it before rendering; every screen picks up the matching tokens.
let THEME = "light";

const I = {
  // tab bar
  today: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 6.5h4.2a6.3 6.5 0 0 1 0 13H8.8a6.3 6.5 0 0 1 0-13z"/></svg>',
  todayOn: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 6.5h4.2a6.3 6.5 0 0 1 0 13H8.8a6.3 6.5 0 0 1 0-13z" fill="currentColor" fill-opacity=".12"/><path d="M13 6.5h4.2a6.3 6.5 0 0 1 6.3 6.5" stroke-width="2.4"/></svg>',
  trends: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18.5 9.5 13l4 3 8.5-9"/><path d="M4 22h18"/></svg>',
  map: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M13 22.5s-6.5-6-6.5-11.3a6.5 6.5 0 0 1 13 0C19.5 16.5 13 22.5 13 22.5z"/><circle cx="13" cy="11.2" r="2.4"/></svg>',
  ask: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M5.5 19.5V8.5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v6.5a3 3 0 0 1-3 3H9.2z"/><path d="M10 11.5h6M10 14.5h3.5" stroke-linecap="round"/></svg>',
  woof: '<svg viewBox="0 0 26 26" fill="none" stroke="currentColor" stroke-width="1.7"><ellipse cx="13" cy="15" rx="9" ry="6.5"/><rect x="8.5" y="5.5" width="9" height="6" rx="3" fill="var(--tabbar-fill)"/></svg>',
  // general
  back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 5.5 8 12l6.5 6.5"/></svg>',
  chev: '<svg class="row__chev" viewBox="0 0 8 13" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m1.5 1.5 5 5-5 5"/></svg>',
  close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/></svg>',
  share: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 15V4M8 7.5 12 3.5l4 4"/><path d="M7 10.5H6a1.5 1.5 0 0 0-1.5 1.5v7A1.5 1.5 0 0 0 6 20.5h12a1.5 1.5 0 0 0 1.5-1.5v-7a1.5 1.5 0 0 0-1.5-1.5h-1"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="6" cy="12" r="1.7"/><circle cx="12" cy="12" r="1.7"/><circle cx="18" cy="12" r="1.7"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg>',
  heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 19.5s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"/></svg>',
  breath: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M3.5 9h10.5a2.6 2.6 0 1 0-2.6-2.6"/><path d="M3.5 13h14.5a2.6 2.6 0 1 1-2.6 2.6"/><path d="M3.5 17h6"/></svg>',
  moon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M19 14.5A7.5 7.5 0 0 1 9.5 5a7.5 7.5 0 1 0 9.5 9.5z"/></svg>',
  paw: '<svg viewBox="0 0 24 24" fill="currentColor"><ellipse cx="7" cy="9.5" rx="1.9" ry="2.4"/><ellipse cx="10.6" cy="6.6" rx="1.9" ry="2.5"/><ellipse cx="14.6" cy="6.8" rx="1.9" ry="2.5"/><ellipse cx="17.8" cy="10" rx="1.8" ry="2.3"/><path d="M12.4 11.2c2.6 0 5.3 3.4 5.3 5.6 0 1.6-1.2 2.4-2.6 2.4-1.2 0-1.8-.6-2.7-.6s-1.6.6-2.8.6c-1.4 0-2.5-.8-2.5-2.4 0-2.2 2.7-5.6 5.3-5.6z"/></svg>',
  battery: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="3" y="7.5" width="16" height="9" rx="2.6"/><path d="M21.5 10.5v3" stroke-linecap="round"/><rect x="5.2" y="9.7" width="7.5" height="4.6" rx="1" fill="currentColor" stroke="none"/></svg>',
  sync: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 12a7.5 7.5 0 0 1-13.2 4.9M4.5 12A7.5 7.5 0 0 1 17.7 7.1"/><path d="M18 3.5v3.8h-3.8M6 20.5v-3.8h3.8"/></svg>',
  chip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><rect x="6" y="6" width="12" height="12" rx="2.5"/><path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3" stroke-linecap="round"/></svg>',
  halo: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 7h3.6a5.4 5 0 0 1 0 10H8.4a5.4 5 0 0 1 0-10z"/><path d="M5 4.5l1.2 1.4M19 4.5l-1.2 1.4M12 3v1.8" stroke-linecap="round"/></svg>',
  fit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><ellipse cx="12" cy="12" rx="8.5" ry="5.5"/><path d="M9 6.8V4.5M15 6.8V4.5"/></svg>',
  find: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="6.5"/><circle cx="12" cy="12" r="2.2" fill="currentColor" stroke="none"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3"/></svg>',
  dog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6 9.5 4.5 5l4 1.8h7L19.5 5 18 9.5c.6 1 1 2.2 1 3.5 0 4-3.1 6.5-7 6.5S5 17 5 13c0-1.3.4-2.5 1-3.5z"/><circle cx="9.6" cy="12.2" r=".9" fill="currentColor"/><circle cx="14.4" cy="12.2" r=".9" fill="currentColor"/><path d="M11 15.2h2l-1 1z" fill="currentColor"/></svg>',
  people: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="9" cy="8.5" r="3.2"/><path d="M3.5 19c.8-3.2 3-4.8 5.5-4.8s4.7 1.6 5.5 4.8"/><circle cx="16.5" cy="9.5" r="2.6"/><path d="M15.5 14.3c2.4-.2 4.2 1.2 5 4"/></svg>',
  star: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8-4.3-4.1 5.9-.9z"/></svg>',
  help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M9.6 9.5a2.5 2.5 0 0 1 4.9.6c0 1.7-2.5 2.1-2.5 3.6"/><circle cx="12" cy="16.8" r=".6" fill="currentColor"/></svg>',
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="M6.5 3.5h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.2 6.2l1.3-2 4 1.5v3a2 2 0 0 1-2 2A15.5 15.5 0 0 1 4.5 5.5a2 2 0 0 1 2-2z"/></svg>',
  plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  send: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M6 11l6-6 6 6"/></svg>',
  arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  locate: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.4 3.6 3.9 10.3c-.8.3-.7 1.4.1 1.6l6.6 1.6 1.6 6.6c.2.8 1.3.9 1.6.1z"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M12 4 3.5 8.5 12 13l8.5-4.5z"/><path d="m3.5 12.5 8.5 4.5 8.5-4.5M3.5 16.5 12 21l8.5-4.5"/></svg>',
  bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.5 2h-15z"/><path d="M10 20.5a2 2 0 0 0 4 0"/></svg>',
  bt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="m7 7.5 10 9-5 4.5v-18l5 4.5-10 9"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-6-5.5-6-10.5a6 6 0 0 1 12 0C18 15.5 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/></svg>',
  camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.3l1.5-2h5.4l1.5 2h2.3A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5z"/><circle cx="12" cy="12.5" r="3.4"/></svg>',
  torch: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><path d="M8 3.5h8v3l-2 3v11h-4v-11l-2-3z"/><path d="M8 6.5h8"/><circle cx="12" cy="13" r=".8" fill="currentColor"/></svg>',
  nfc: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"><path d="M8 8.5a5 5 0 0 1 0 7M11.5 6a8.5 8.5 0 0 1 0 12M15 3.5a12 12 0 0 1 0 17"/></svg>',
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linejoin="round"><rect x="3.5" y="5.5" width="17" height="13" rx="2.5"/><path d="m4.5 7 7.5 6 7.5-6"/></svg>',
  spark: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 3c.5 3.9 2.6 6 6.5 6.5v1C14.6 11 12.5 13.1 12 17h-1c-.5-3.9-2.6-6-6.5-6.5v-1C8.4 9 10.5 6.9 11 3z"/><path d="M18.5 15c.2 1.6 1 2.4 2.5 2.6v.6c-1.5.2-2.3 1-2.5 2.6h-.6c-.2-1.6-1-2.4-2.5-2.6v-.6c1.5-.2 2.3-1 2.5-2.6z"/></svg>',
  apple: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.4 12.6c0-2.4 2-3.5 2-3.6-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.8-.8-3-.8-1.5 0-3 .9-3.8 2.3-1.6 2.8-.4 7 1.2 9.3.8 1.1 1.7 2.4 2.9 2.3 1.2 0 1.6-.7 3-.7s1.8.7 3 .7c1.3 0 2.1-1.1 2.8-2.3.9-1.3 1.3-2.6 1.3-2.6s-2.5-1-2.5-3.7zM14.2 5.5c.6-.8 1.1-1.9 1-3-.9 0-2.1.6-2.7 1.4-.6.7-1.1 1.8-1 2.9 1 .1 2.1-.5 2.7-1.3z"/></svg>',
  google: '<svg viewBox="0 0 48 48"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
};

const icon = (name, size = 20) => I[name].replace("<svg ", `<svg width="${size}" height="${size}" `);

/* ---------- Chrome ---------- */

const STATUS_ICONS = `
  <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7.6" width="3.2" height="4.4" rx="1"/><rect x="4.9" y="5.2" width="3.2" height="6.8" rx="1"/><rect x="9.8" y="2.6" width="3.2" height="9.4" rx="1"/><rect x="14.7" y="0" width="3.2" height="12" rx="1"/></svg>
  <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor"><path d="M8 2.4c2.3 0 4.4.9 6 2.4.2.2.5.2.7 0l.9-.9c.2-.2.2-.5 0-.7A11 11 0 0 0 8 .2 11 11 0 0 0 .4 3.2c-.2.2-.2.5 0 .7l.9.9c.2.2.5.2.7 0A8.6 8.6 0 0 1 8 2.4z"/><path d="M8 6c1.3 0 2.5.5 3.4 1.3.2.2.5.2.7 0l.9-.9c.2-.2.2-.5 0-.7A6.6 6.6 0 0 0 8 3.8c-1.9 0-3.7.7-5 1.9-.2.2-.2.5 0 .7l.9.9c.2.2.5.2.7 0C5.5 6.5 6.7 6 8 6z"/><path d="M10.1 9.2c.2-.2.2-.5 0-.7A3 3 0 0 0 8 7.6a3 3 0 0 0-2.1.9c-.2.2-.2.5 0 .7l1.8 1.8c.2.2.4.2.6 0z"/></svg>
  <svg width="27" height="13" viewBox="0 0 27 13" fill="none"><rect x=".6" y=".6" width="23" height="11.8" rx="3.8" stroke="currentColor" opacity=".38"/><rect x="2.2" y="2.2" width="17.4" height="8.6" rx="2.4" fill="currentColor"/><path d="M25.1 4.4v4.2c.8-.3 1.4-1.2 1.4-2.1s-.6-1.8-1.4-2.1z" fill="currentColor" opacity=".45"/></svg>`;

const statusBar = ({ light = false, time = true } = {}) =>
  `<div class="sbar ${light ? "sbar--light" : ""}"><span>${time ? "9:41" : ""}</span><span class="sbar__r">${STATUS_ICONS}</span></div>`;

function tabBar(active) {
  const tabs = [["today", "Today"], ["trends", "Trends"], ["map", "Map"], ["ask", "Ask"], ["woof", "Woof"]];
  const go = { today: "today", trends: "trends", map: "map", ask: "ask", woof: "device" };
  return `<nav class="tabs">${tabs.map(([k, t]) =>
    `<button class="tab ${k === active ? "is-on" : ""}" data-go="${go[k]}">${k === active && k === "today" ? I.todayOn : I[k]}${t}</button>`).join("")}</nav>`;
}

const navBar = ({ back = "", title = "", act = "", backTo = "" } = {}) => `
  <div class="nav">
    ${back ? `<button class="nav__back" ${backTo ? `data-go="${backTo}"` : "data-back"}>${I.back}${back}</button>` : "<span></span>"}
    <span class="nav__title">${title}</span>
    <span class="nav__act">${act}</span>
  </div>`;

const avatar = (dog, cls = "", size = 0) =>
  `<span class="av ${cls}" style="background-image:url(${A}/app/avatar-${dog}.jpg)${size ? `;width:${size}px;height:${size}px;display:block` : ""}"></span>`;

/* ---------- The capsule: the O of the wordmark, used for every score ---------- */

function capsulePath(W, H, inset) {
  const x = inset, y = inset, w = W - inset * 2, h = H - inset * 2;
  const rx = w * 0.354, ry = h / 2;
  const f = (n) => n.toFixed(2);
  return `M${f(x + w / 2)} ${f(y)}H${f(x + w - rx)}A${f(rx)} ${f(ry)} 0 0 1 ${f(x + w)} ${f(y + ry)}A${f(rx)} ${f(ry)} 0 0 1 ${f(x + w - rx)} ${f(y + h)}H${f(x + rx)}A${f(rx)} ${f(ry)} 0 0 1 ${f(x)} ${f(y + ry)}A${f(rx)} ${f(ry)} 0 0 1 ${f(x + rx)} ${f(y)}Z`;
}

/* ---------- Halo blue: the one accent ----------
   Progress glows halo blue, like the light on the module. Red is kept for alerts. */
const HALO = "var(--halo-blue)";

// A meter filled in halo blue.
const haloMeter = (pct) => `<div class="meter"><b style="width:${pct}%;background:${HALO}"></b></div>`;

/* The capsule. halo: the progress glows halo blue, like the light on the module.
   logo: the WOOF wordmark sits inside, as it does on the module. unit: a small suffix such as "%". */
function capsule({ w = 240, h = 139, value = 0, stroke = 7, color = "var(--ink)", track = "var(--track)", label = "", text = null, size = 64, glow = false, halo = false, logo = 0, unit = "", sub = "" } = {}) {
  const d = capsulePath(w, h, stroke / 2 + 1);
  const id = `g${Math.random().toString(36).slice(2, 7)}`;
  // A full capsule is drawn closed, so there is no join where the ends meet.
  const arc = (c, width) => value >= 100
    ? `<path d="${d}" fill="none" stroke="${c}" stroke-width="${width}"/>`
    : `<path d="${d}" fill="none" stroke="${c}" stroke-width="${width}" pathLength="100" stroke-dasharray="${value} 100" stroke-linecap="round"/>`;
  const progress = halo
    ? `<g filter="url(#${id})" opacity=".55">${arc(HALO, stroke + 4)}</g>${arc(HALO, stroke)}`
    : `${glow ? `<g filter="url(#${id})" opacity=".85">${arc(color, stroke + 2)}</g>` : ""}${arc(color, stroke)}`;
  return `
  <div class="cap" style="width:${w}px;height:${h}px">
    <svg viewBox="0 0 ${w} ${h}">
      ${halo || glow ? `<defs><filter id="${id}" x="-25%" y="-40%" width="150%" height="180%"><feGaussianBlur stdDeviation="${halo ? stroke * .75 : 4}"/></filter></defs>` : ""}
      <path d="${d}" fill="none" stroke="${track}" stroke-width="${stroke}"/>
      ${value > 0 ? progress : ""}
    </svg>
    <div class="cap__in">
      ${logo ? `<img class="cap__logo" src="${ASSETS}logo/${THEME === "dark" ? "woof-white" : "woof"}.svg" alt="WOOF" style="height:${logo}px">` : ""}
      <div class="cap__v" style="font-size:${size}px">${text ?? value}${unit ? `<span class="cap__u">${unit}</span>` : ""}</div>
      ${label ? `<div class="cap__l">${label}</div>` : ""}
      ${sub}
    </div>
  </div>`;
}

/* ---------- Charts (monochrome: halo blue is kept for progress and friends, red for alerts) ---------- */

function lineBand({ values, lo, hi, w = 321, h = 92, min, max, flagHigh = false, dots = true, color = "var(--ink)" }) {
  const real = values.filter((v) => v != null);
  min = min ?? Math.min(lo, ...real) - 2;
  max = max ?? Math.max(hi, ...real) + 2;
  const pad = 6;
  const x = (i) => pad + (i / (values.length - 1)) * (w - pad * 2);
  const y = (v) => pad + (1 - (v - min) / (max - min)) * (h - pad * 2);
  // A night without a clear reading (null) breaks the line and is marked, never filled in.
  let pen = false;
  const line = values.map((v, i) => {
    if (v == null) { pen = false; return ""; }
    const seg = `${pen ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`;
    pen = true;
    return seg;
  }).join("");
  const gaps = values.map((v, i) => v == null
    ? `<line x1="${x(i).toFixed(1)}" x2="${x(i).toFixed(1)}" y1="${pad}" y2="${h - pad}" stroke="var(--faint)" stroke-width="1.2" stroke-dasharray="2 3"/>` : "").join("");
  const out = (v) => flagHigh && v > hi;
  const pts = values.map((v, i) => {
    if (v == null) return "";
    const c = out(v) ? "var(--alert)" : color;
    if (i === values.length - 1) return `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="5" fill="${c}" stroke="var(--dot-ring)" stroke-width="2.5"/>`;
    return dots ? `<circle cx="${x(i).toFixed(1)}" cy="${y(v).toFixed(1)}" r="${out(v) ? 3.4 : 2.2}" fill="${c}"/>` : "";
  }).join("");
  const firstOut = flagHigh ? values.findIndex((v) => v != null && v > hi) : -1;
  const redTail = firstOut > 0 ? `<path d="${values.slice(firstOut - 1).map((v, j) => `${j ? "L" : "M"}${x(firstOut - 1 + j).toFixed(1)} ${y(v).toFixed(1)}`).join("")}" fill="none" stroke="var(--alert)" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/>` : "";
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible">
    <rect x="0" y="${y(hi).toFixed(1)}" width="${w}" height="${(y(lo) - y(hi)).toFixed(1)}" rx="6" fill="var(--band)"/>
    ${gaps}
    <path d="${line}" fill="none" stroke="${color}" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round" opacity="${flagHigh ? .9 : 1}"/>
    ${redTail}${pts}
  </svg>`;
}

function bars({ values, labels = [], w = 321, h = 120, max, lo, hi, hl = values.length - 1, fmt = (v) => v, showVal = false, low = [] }) {
  max = max ?? Math.max(...values, hi ?? 0) * 1.08;
  const n = values.length, gap = n > 10 ? 4 : 10, bw = (w - gap * (n - 1)) / n, top = showVal ? 18 : 4, bottom = labels.length ? 20 : 0, ch = h - top - bottom;
  const y = (v) => top + ch - (v / max) * ch;
  const band = lo != null ? `<rect x="-4" y="${y(hi).toFixed(1)}" width="${w + 8}" height="${(y(lo) - y(hi)).toFixed(1)}" rx="5" fill="var(--band)" opacity=".75"/>` : "";
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible">${band}
    ${values.map((v, i) => {
      const x = i * (bw + gap), bh = Math.max(3, (v / max) * ch);
      const fill = i === hl ? "var(--ink)" : low.includes(i) ? "var(--bar-2)" : "var(--bar)";
      return `<rect x="${x.toFixed(1)}" y="${(top + ch - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="${Math.min(6, bw / 2).toFixed(1)}" fill="${fill}"/>`
        + (showVal ? `<text x="${(x + bw / 2).toFixed(1)}" y="${(top + ch - bh - 6).toFixed(1)}" text-anchor="middle" font-size="11" font-weight="${i === hl ? 600 : 450}" fill="${i === hl ? "var(--ink)" : "var(--muted)"}">${fmt(v)}</text>` : "")
        + (labels[i] ? `<text x="${(x + bw / 2).toFixed(1)}" y="${h - 4}" text-anchor="middle" font-size="11" fill="${i === hl ? "var(--ink)" : "var(--faint)"}" font-weight="${i === hl ? 600 : 450}">${labels[i]}</text>` : "");
    }).join("")}
  </svg>`;
}

// 24-hour rest timeline. Segments are [from, to, kind] in hours since `start` (24 h clock).
function timeline24(segs, { w = 321, start = 18 } = {}) {
  const x = (t) => (t / 24) * w;
  const ticks = [0, 6, 12, 18, 24].map((t) => [t, `${String((start + t) % 24).padStart(2, "0")}:00`]);
  return `<svg width="${w}" height="64" viewBox="0 0 ${w} 64" style="overflow:visible">
    <rect x="0" y="10" width="${w}" height="30" rx="9" fill="var(--track)"/>
    ${segs.map(([a, b, kind]) => `<rect x="${x(a).toFixed(1)}" y="${kind === "nap" ? 16 : 10}" width="${(x(b) - x(a)).toFixed(1)}" height="${kind === "nap" ? 18 : 30}" rx="${kind === "nap" ? 5 : 8}" fill="${kind === "nap" ? "var(--nap)" : "var(--ink)"}"/>`).join("")}
    ${segs.filter((s) => s[2] === "wake").map(([a]) => `<rect x="${(x(a) - 1).toFixed(1)}" y="10" width="2" height="30" fill="var(--dot-ring)" opacity=".9"/>`).join("")}
    ${ticks.map(([t, l], i) => `<text x="${x(t).toFixed(1)}" y="58" font-size="10.5" fill="var(--faint)" text-anchor="${i === 0 ? "start" : i === ticks.length - 1 ? "end" : "middle"}">${l}</text>`).join("")}
  </svg>`;
}

// Stacked hourly activity: rows of [easy, brisk, play] minutes, 06:00 → 22:00.
function hourly(rows, { w = 321, h = 96 } = {}) {
  const n = rows.length, gap = 4, bw = (w - gap * (n - 1)) / n, max = 40, ch = h - 18;
  const cols = ["var(--bar-3)", "var(--nap)", "var(--ink)"];
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    ${rows.map((r, i) => {
      let yb = ch;
      return r.map((m, k) => {
        if (!m) return "";
        const bh = (m / max) * ch; yb -= bh;
        return `<rect x="${(i * (bw + gap)).toFixed(1)}" y="${yb.toFixed(1)}" width="${bw.toFixed(1)}" height="${(bh - (yb > 0 ? .8 : 0)).toFixed(1)}" rx="2" fill="${cols[k]}"/>`;
      }).join("");
    }).join("")}
    ${[[0, "06"], [6, "12"], [12, "18"], [16, "22"]].map(([i, l]) => `<text x="${(i * (bw + gap) + bw / 2).toFixed(1)}" y="${h - 2}" font-size="10.5" fill="var(--faint)" text-anchor="middle">${l}</text>`).join("")}
  </svg>`;
}

// 30-day trend with shaded context tags.
function trendLine({ values, w = 321, h = 120, min = 60, max = 95, tags = [], labels = [] }) {
  const pad = 4, ch = h - 22;
  const x = (i) => pad + (i / (values.length - 1)) * (w - pad * 2);
  const y = (v) => 6 + (1 - (v - min) / (max - min)) * (ch - 12);
  const d = values.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join("");
  const area = `${d}L${x(values.length - 1).toFixed(1)} ${ch}L${x(0).toFixed(1)} ${ch}Z`;
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="overflow:visible">
    <defs><linearGradient id="tl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--ink)" stop-opacity=".1"/><stop offset="1" stop-color="var(--ink)" stop-opacity="0"/></linearGradient></defs>
    ${tags.map(([a, b, l]) => `<rect x="${(x(a) - 3).toFixed(1)}" y="0" width="${(x(b) - x(a) + 6).toFixed(1)}" height="${ch}" rx="5" fill="var(--tag-bg)"/><line x1="${(x(a) - 3).toFixed(1)}" x2="${(x(a) - 3).toFixed(1)}" y1="0" y2="${ch}" stroke="var(--tag-line)" stroke-dasharray="2 3"/><text x="${(x(a) + 2).toFixed(1)}" y="12" font-size="10.5" font-weight="600" fill="var(--tag-text)">${l}</text>`).join("")}
    <path d="${area}" fill="url(#tl)"/>
    <path d="${d}" fill="none" stroke="var(--ink)" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"/>
    <circle cx="${x(values.length - 1).toFixed(1)}" cy="${y(values[values.length - 1]).toFixed(1)}" r="4.5" fill="var(--ink)" stroke="var(--dot-ring)" stroke-width="2.5"/>
    <line x1="0" x2="${w}" y1="${ch}" y2="${ch}" stroke="var(--line)"/>
    ${labels.map(([i, l]) => `<text x="${x(i).toFixed(1)}" y="${h - 4}" font-size="10.5" fill="var(--faint)" text-anchor="${i === 0 ? "start" : i === values.length - 1 ? "end" : "middle"}">${l}</text>`).join("")}
  </svg>`;
}

const spark = (values, { w = 132, h = 34, lo, hi }) => lineBand({ values, lo, hi, w, h, dots: false });

function rangeBar(value, lo, hi, min, max) {
  const p = (v) => ((v - min) / (max - min)) * 100;
  return `<div class="range"><div class="range__track"></div><div class="range__band" style="left:${p(lo)}%;width:${p(hi) - p(lo)}%"></div><div class="range__dot" style="left:${p(value)}%"></div></div>`;
}

/* ---------- Map (stylised Hyde Park, London) ---------- */

function mapSvg({ w = 393, h = 852, route = true } = {}) {
  const trees = [[40, 140, 16], [92, 120, 11], [262, 128, 14], [300, 170, 10], [70, 420, 15], [250, 420, 12], [300, 470, 16], [40, 520, 12], [180, 470, 10], [320, 330, 11], [140, 200, 9], [210, 175, 12]];
  return `<svg class="map-svg" width="${w}" height="${h}" viewBox="0 0 393 852" preserveAspectRatio="xMidYMid slice">
    <rect width="393" height="852" fill="#f1f0ec"/>
    ${[[0, 0, 70, 58], [78, 0, 96, 58], [182, 0, 64, 58], [254, 0, 92, 58], [354, 0, 60, 58], [388, 90, 20, 120], [388, 220, 20, 150], [388, 380, 20, 160], [0, 668, 80, 90], [88, 668, 110, 90], [206, 668, 130, 90], [344, 668, 60, 90], [0, 766, 120, 90], [128, 766, 140, 90], [276, 766, 130, 90]].map(([x, y, bw, bh]) => `<rect x="${x}" y="${y}" width="${bw}" height="${bh}" rx="4" fill="#e7e5df"/>`).join("")}
    <rect x="-10" y="80" width="372" height="572" rx="10" fill="#e1e8da"/>
    ${trees.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#d3ddcb" opacity=".8"/>`).join("")}
    <path d="M-10 74 C 120 70, 260 68, 403 72" stroke="#dcdad4" stroke-width="20" fill="none"/>
    <path d="M-10 74 C 120 70, 260 68, 403 72" stroke="#fff" stroke-width="16" fill="none"/>
    <path d="M370 40 C 368 300, 374 560, 380 900" stroke="#dcdad4" stroke-width="22" fill="none"/>
    <path d="M370 40 C 368 300, 374 560, 380 900" stroke="#fff" stroke-width="18" fill="none"/>
    <path d="M-10 660 C 120 656, 260 658, 403 662" stroke="#dcdad4" stroke-width="20" fill="none"/>
    <path d="M-10 660 C 120 656, 260 658, 403 662" stroke="#fff" stroke-width="16" fill="none"/>
    <g stroke="#f9f9f7" stroke-width="4" fill="none" stroke-linecap="round">
      <path d="M58 82 C 66 190, 88 262, 98 316 C 108 400, 118 520, 128 652"/>
      <path d="M-10 196 C 100 190, 210 166, 356 150"/>
      <path d="M200 82 C 204 120, 214 160, 232 196"/>
      <path d="M356 168 C 300 200, 262 214, 240 236"/>
      <path d="M30 356 C 120 342, 214 318, 336 262"/>
      <path d="M-10 562 C 120 558, 250 554, 356 548"/>
      <path d="M160 360 C 150 420, 168 500, 200 556"/>
      <path d="M262 290 C 280 360, 300 440, 330 548"/>
    </g>
    <path d="M8 336 C 60 316, 120 300, 186 282 C 236 268, 286 246, 326 220 C 342 210, 356 226, 344 240 C 304 274, 244 298, 192 316 C 130 338, 70 360, 20 374 C 2 378, -6 346, 8 336 Z" fill="#d2dfe8"/>
    <path d="M8 336 C -2 306, -8 270, -12 236 L -12 330 C -8 346, -2 358, 12 366 Z" fill="#d2dfe8"/>
    <text x="34" y="352" font-size="10" fill="#6f8ba0" font-weight="500" transform="rotate(-17 34 352)" letter-spacing=".5">The Serpentine</text>
    <text x="70" y="470" font-size="10.5" fill="#86977c" font-weight="600" letter-spacing="3">HYDE PARK</text>
    <text x="378" y="420" font-size="9" fill="#a3a29d" font-weight="500" transform="rotate(90 378 420)" letter-spacing=".3">Park Lane</text>
    <text x="120" y="77" font-size="9" fill="#a3a29d" font-weight="500" letter-spacing=".3">Bayswater Road</text>
    <text x="150" y="663" font-size="9" fill="#a3a29d" font-weight="500" letter-spacing=".3">Knightsbridge</text>
    ${route ? `
    <path d="M366 640 C 362 600, 356 570, 352 552 C 300 552, 250 556, 200 556 C 170 510, 152 430, 160 372 C 164 344, 172 324, 186 312" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M366 640 C 362 600, 356 570, 352 552 C 300 552, 250 556, 200 556 C 170 510, 152 430, 160 372 C 164 344, 172 324, 186 312" fill="none" stroke="#111" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="366" cy="640" r="6" fill="#fff" stroke="#111" stroke-width="3"/>` : ""}
  </svg>`;
}

/* ---------- Screen + device ---------- */

function screen({ id, body = "", dark = false, tabs = null, raw = false, overlay = "", lightStatus = false, statusTime = true, cls = "" }) {
  return `
  <div class="scr ${dark ? "scr--dark" : ""} ${THEME === "dark" ? "theme-dark" : ""} ${tabs ? "scr--tabs" : ""} ${cls}" data-screen="${id}">
    ${raw ? body : `<div class="scr__body">${body}</div>`}
    ${tabs ? tabBar(tabs) : ""}
    ${overlay}
    ${statusBar({ light: lightStatus || dark, time: statusTime })}
    <div class="home-ind ${lightStatus ? "home-ind--light" : ""}"></div>
  </div>`;
}

const device = (inner, cls = "") => `
  <div class="device ${cls}">
    <i class="device__btn device__btn--action"></i><i class="device__btn device__btn--up"></i><i class="device__btn device__btn--down"></i><i class="device__btn device__btn--power"></i>
    <div class="device__screen">${inner}<div class="device__island"></div></div>
  </div>`;
