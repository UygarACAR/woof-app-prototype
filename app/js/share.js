/* Share link: the app prototype for people outside the team.
   Computer: phone frame, step list and captions. Phone: the bare app screen, fitted to the
   viewport, with previous/next and swipe. Tapping inside the app moves between screens. */
(function () {
  const order = SCREENS.map((s) => s.id);
  const total = order.length;
  const pos = (id) => order.indexOf(id) + 1;
  const pad = (n) => String(n).padStart(2, "0");
  const $ = (id) => document.getElementById(id);
  const isPhone = () => innerWidth < 900;
  const VIDEO = document.body.dataset.video || "";
  let mode = null;
  let current = null;

  const groups = [...new Set(SCREENS.map((s) => s.group))];
  $("side").innerHTML = `
    <img src="${ASSETS}logo/woof.svg" alt="WOOF">
    <h1>The Woof app</h1>
    <p class="intro">A click-through of the app, from first launch to everyday use. Tap inside the phone, or use the arrow keys.</p>
    ${groups.map((g) => `<div class="grp"><p>${g}</p>${SCREENS.filter((s) => s.group === g).map((s) =>
      `<a href="#${s.id}" data-id="${s.id}"><span>${pad(pos(s.id))}</span>${s.title}</a>`).join("")}</div>`).join("")}
    <p class="fine">Prototype. The dog, people and numbers are examples.</p>`;

  function fit() {
    const scaler = $("scaler");
    if (isPhone()) {
      const barH = $("bar").offsetHeight;
      const s = Math.min((innerWidth - 24) / 393, (innerHeight - barH - 24) / 852);
      scaler.style.transform = `translate(-50%, -50%) scale(${s})`;
    } else {
      const s = Math.min(1, (innerHeight - 56) / 880, (innerWidth - 300 - 380 - 48) / 421);
      scaler.style.transform = `translate(-50%, -50%) scale(${s})`;
    }
  }

  function show(id) {
    const s = SCREENS.find((x) => x.id === id) || SCREENS[0];
    const n = pos(s.id);
    const caption = CAPTIONS[s.id] || "";
    const next = SCREENS[n] ? SCREENS[n].title : "";
    current = s.id;
    mode = isPhone();
    $("scaler").innerHTML = mode ? `<div class="bare">${s.render()}</div>` : device(s.render(), "device--shadow");
    document.querySelectorAll(".grp a").forEach((a) => a.classList.toggle("is-on", a.dataset.id === s.id));
    document.querySelector(".grp a.is-on")?.scrollIntoView({ block: "nearest" });
    $("info").innerHTML = `
      <div class="count">${pad(n)}<span> / ${total}</span></div>
      <span class="lbl">${s.group}</span>
      <h2>${s.title}</h2>
      <p class="cap">${caption}</p>
      ${next ? `<p class="hint">Next: ${next}</p>` : ""}
      <div class="btns"><button data-step="-1">← Previous</button><button data-step="1">${n === total ? "Start again" : "Next →"}</button></div>
      <a class="video" href="${VIDEO}" target="_blank" ${VIDEO ? "" : "hidden"}><i></i>Watch the walkthrough video</a>
      <p class="fine">Woof is a wellness product, not a medical device. Prototype: the dog, people and numbers are examples.</p>`;
    $("bar").innerHTML = `
      <button data-step="-1" aria-label="Previous">${I.back}</button>
      <div class="bar__t"><b><span>${n}/${total}</span>${s.title}</b><p>${caption}</p></div>
      <button data-step="1" aria-label="Next">${I.back.replace("<svg ", '<svg style="transform:scaleX(-1)" ')}</button>`;
    document.title = `${s.title} · WOOF app prototype`;
    fit();
  }

  const route = () => show(location.hash.slice(1) || order[0]);
  const step = (d) => {
    const i = order.indexOf(current || order[0]);
    location.hash = order[(i + d + total) % total];
  };

  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-go],[data-back],[data-step]");
    if (!t) return;
    if (t.dataset.go) location.hash = t.dataset.go;
    else if (t.dataset.step) step(Number(t.dataset.step));
    else history.back();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") step(1);
    if (e.key === "ArrowLeft") step(-1);
  });
  // Horizontal swipe on phones; vertical drags still scroll the screen.
  let sx = 0, sy = 0;
  addEventListener("touchstart", (e) => { sx = e.touches[0].clientX; sy = e.touches[0].clientY; }, { passive: true });
  addEventListener("touchend", (e) => {
    const dx = e.changedTouches[0].clientX - sx, dy = e.changedTouches[0].clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) step(dx < 0 ? 1 : -1);
  }, { passive: true });
  addEventListener("hashchange", route);
  addEventListener("resize", () => (isPhone() !== mode ? show(current) : fit()));
  route();
})();
