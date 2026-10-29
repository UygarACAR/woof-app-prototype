/* WOOF app prototype: every screen, in flow order. Example dog and data. */

const SCREENS = [];
const def = (id, group, title, note, render) => SCREENS.push({ id, group, title, note, render });

/* ---------- Example data ---------- */

const D = {
  scoreWeek: [79, 83, 84, 80, 71, 82, 86],
  week: ["F", "S", "S", "M", "T", "W", "T"],
  restWeek: [11.1, 11.5, 10.9, 11.3, 9.25, 11.0, 11.33],
  score30: [78, 80, 82, 79, 81, 83, 80, 82, 84, 81, 72, 68, 71, 77, 80, 82, 83, 81, 84, 78, 76, 79, 81, 79, 83, 84, 80, 71, 82, 86],
  hr30: [61, 62, 60, 63, 62, 61, 64, 62, 61, 63, 66, 67, 65, 63, 62, 61, 62, 60, 61, 63, 64, 63, 62, 61, 62, 63, 61, 64, 62, 62],
  rr30: [16, 15, 16, 16, 17, 15, 16, 16, 15, 16, 17, 18, 17, 16, 16, 15, 16, 16, 15, 16, 17, 16, 16, 15, 16, 16, 15, 17, 16, 16],
  rest30: [10.8, 10.6, 11.0, 10.7, 10.9, 11.2, 10.5, 10.8, 10.9, 10.6, 10.7, 10.9, 10.8, 10.6, 10.9, 11.0, 10.7, 10.8, 10.4, 10.5, 10.6, 10.7, 10.8, 11.1, 11.5, 10.9, 11.3, 9.25, 11.0, 11.33],
  act30: [86, 92, 88, 95, 84, 90, 87, 93, 89, 85, 52, 46, 55, 78, 88, 91, 86, 90, 94, 80, 76, 82, 85, 92, 64, 95, 66, 46, 74, 74],
  rrAlert: [16, 15, 16, 17, 16, 15, 16, 15, 16, 17, 16, 21, 23, 24],
  // [easy, brisk, play] minutes per hour, 06:00 → 22:00
  hours: [[0, 0, 0], [6, 14, 2], [4, 6, 3], [2, 0, 0], [0, 0, 0], [3, 0, 0], [0, 0, 0], [5, 0, 1], [2, 0, 0], [0, 0, 0], [3, 0, 0], [0, 0, 0], [6, 4, 3], [5, 0, 0], [3, 0, 0], [2, 0, 0], [0, 0, 0]],
};

// Vitals with gaps: 8 Nov too loose to read, last night (12–13 Nov) collar off.
D.hrGap = D.hr30.map((v, i) => (i === 24 || i === 29 ? null : v));
D.rrGap = D.rr30.map((v, i) => (i === 24 || i === 29 ? null : v));

const hm = (h) => `${Math.floor(h)} h ${String(Math.round((h % 1) * 60)).padStart(2, "0")} m`;

/* ---------- Shared bits ---------- */

const steps = (n, dark = false) => `<div class="steps">${[1, 2, 3, 4].map((i) =>
  `<i class="${i <= n ? "is-on" : ""}" style="${dark ? `background:${i <= n ? "#fff" : "rgba(255,255,255,.18)"}` : ""}"></i>`).join("")}</div>`;

const header = (eyebrow, title, right = avatar("milo", "av--ring")) => `
  <div class="head">
    <div><p class="lbl">${eyebrow}</p><h1 class="lt" style="margin-top:6px">${title}</h1></div>
    ${right}
  </div>`;

const haloPill = (state = "white") => {
  const s = { white: ["", "All good", "var(--ink)"], blue: ["pill--blue", "Friend nearby", "var(--halo-blue)"], red: ["pill--alert", "Worth a check", "var(--alert)"] }[state];
  return `<span class="pill ${s[0]}"><span class="halo-glyph" style="color:${s[2]};width:18px;height:11px"></span>Halo · ${s[1]}</span>`;
};

const appIcon = (size = 38) => `<span style="width:${size}px;height:${size}px;border-radius:${size * .24}px;background:#0b0b0c;display:grid;place-items:center;flex:none;box-shadow:inset 0 0 0 .5px rgba(255,255,255,.12)">
  <svg width="${size * .56}" height="${size * .34}" viewBox="0 0 56 34"><path d="${capsulePath(56, 34, 3)}" fill="none" stroke="#fff" stroke-width="4"/></svg></span>`;

/* =================================================================
   ONBOARDING
   ================================================================= */

def("welcome", "Onboarding", "Welcome",
  "",
  () => screen({ id: "welcome", dark: true, raw: true, body: `
    <img src="${ASSETS}logo/woof-white.svg" alt="WOOF" style="position:absolute;top:76px;left:50%;transform:translateX(-50%);height:15px">
    <div style="position:absolute;top:118px;left:-60px;right:-60px;height:300px;overflow:hidden;-webkit-mask-image:radial-gradient(60% 62% at 50% 50%,#000 55%,transparent 100%);mask-image:radial-gradient(60% 62% at 50% 50%,#000 55%,transparent 100%)">
      <img src="${A}/product/hero-module.jpg" alt="" style="width:100%;height:100%;object-fit:cover;object-position:55% 45%">
    </div>
    <div style="position:absolute;left:24px;right:24px;bottom:42px">
      <p class="lbl">The wellness wearable for dogs</p>
      <h1 class="h1" style="font-size:36px;margin-top:12px">Know your dog.<br>Every single day.</h1>
      <p class="p" style="margin-top:12px">Woof learns what's normal for your dog and tells you each morning how they're doing.</p>
      <div style="margin-top:30px">
        <button class="btn btn--light" data-go="profile">${icon("apple", 20)}Continue with Apple</button>
        <button class="btn btn--glass" data-go="profile">${icon("google", 18)}Continue with Google</button>
      </div>
      <p style="text-align:center;margin-top:18px"><button class="link" style="color:#fff;font-weight:500" data-go="profile">Sign up with email</button></p>
      <p class="tiny" style="text-align:center;margin-top:16px;color:rgba(255,255,255,.38)">By continuing you agree to the Terms and Privacy Policy.</p>
    </div>` }));

def("profile", "Onboarding", "Add your dog",
  "",
  () => screen({ id: "profile", body: `
    ${navBar({ back: "", title: "" })}
    ${steps(1)}
    <div class="pad" style="margin-top:28px">
      <h1 class="h1">Who are we getting<br>to know?</h1>
      <div style="display:flex;flex-direction:column;align-items:center;margin:36px 0 34px">
        <div style="position:relative">
          ${avatar("milo", "av--xl")}
          <span style="position:absolute;right:-2px;bottom:2px;width:34px;height:34px;border-radius:50%;background:var(--ink);color:var(--on-ink);display:grid;place-items:center;box-shadow:0 0 0 3px var(--paper)">${icon("camera", 17)}</span>
        </div>
        <span class="small" style="margin-top:12px">Change photo</span>
      </div>
      <p class="lbl" style="margin-bottom:8px;padding-left:4px">Name</p>
      <div class="field field--focus"><b style="font-size:20px;font-weight:450">Milo<span class="caret"></span></b></div>
    </div>
    <div class="bottom"><button class="btn" data-go="details">Continue</button></div>` }));

def("details", "Onboarding", "About your dog",
  "",
  () => screen({ id: "details", body: `
    ${navBar({ back: "Back", title: "", backTo: "profile" })}
    ${steps(2)}
    <div class="pad" style="margin-top:28px">
      <h1 class="h1">About Milo</h1>
      <p class="small" style="margin-top:8px;font-size:14px">Size and age set his starting ranges until Woof learns his own.</p>
      <div style="margin-top:26px">
        <div class="field"><span>Breed</span><b>Jack Russell Terrier ${I.chev}</b></div>
        <div class="field"><span>Birthday</span><b>March 2021 <span class="muted" style="font-weight:400">· 5 yrs</span></b></div>
        <div class="field"><span>Weight</span><b>7.2 kg</b></div>
        <div class="field"><span>Sex</span><div class="seg" style="width:170px;background:var(--stone)"><span class="is-on">Male</span><span>Female</span></div></div>
        <div class="field"><span>Neutered</span><span class="tg is-on"></span></div>
      </div>
    </div>
    <div class="bottom"><button class="btn" data-go="health">Continue</button></div>` }));

def("health", "Onboarding", "Health background",
  "",
  () => screen({ id: "health", body: `
    ${navBar({ back: "Back", title: "", backTo: "details", act: '<span style="color:var(--muted);font-size:15px">Skip</span>' })}
    ${steps(3)}
    <div class="pad" style="margin-top:28px">
      <h1 class="h1">Anything we<br>should know?</h1>
      <p class="small" style="margin-top:8px;font-size:14px">Optional. It helps Woof read changes in context. You can update it any time.</p>
      <div class="chips" style="margin-top:24px">
        <span class="chip is-on">${I.check}None known</span><span class="chip">Heart condition</span><span class="chip">Breathing condition</span><span class="chip">Joints or mobility</span><span class="chip">Allergies</span><span class="chip">Recent surgery</span><span class="chip">Other</span>
      </div>
      <p class="lbl" style="margin:30px 0 10px 4px">Your vet</p>
      <div class="list">
        <div class="row"><span class="row__ico">${icon("phone", 17)}</span><div class="row__t">Hyde Park Veterinary Clinic<small>020 7946 0321</small></div>${I.chev}</div>
      </div>
      <p class="tiny" style="margin-top:14px;padding:0 4px">Woof is a wellness product, not a medical device. It doesn't diagnose.</p>
    </div>
    <div class="bottom"><button class="btn" data-go="pair">Continue</button></div>` }));

def("pair", "Onboarding", "Pair the module",
  "",
  () => screen({ id: "pair", dark: true, body: `
    ${navBar({ back: "Back", backTo: "health" })}
    ${steps(4, true)}
    <div class="pad" style="margin-top:28px">
      <h1 class="h1">Pair Milo's Woof</h1>
      <p class="small" style="margin-top:8px;font-size:14px">Lift the module off its dock and hold your phone close to it.</p>
    </div>
    <div style="position:relative;height:330px;margin-top:16px;overflow:hidden">
      <img src="${A}/product/dock-black.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:63% 60%;transform:scale(1.15)">
      <div style="position:absolute;inset:0;background:radial-gradient(70% 60% at 50% 55%,transparent 40%,#0a0a0b 100%)"></div>
      <span class="pill pill--dark" style="position:absolute;left:50%;bottom:20px;transform:translateX(-50%)"><span class="halo-glyph halo-glyph--glow" style="width:16px;height:10px"></span>Searching…</span>
    </div>
    <div class="pad" style="margin-top:18px">
      <div class="list" style="background:rgba(255,255,255,.07)">
        <div class="row"><span class="row__ico" style="background:rgba(255,255,255,.1);color:#fff">${icon("nfc", 18)}</span><div class="row__t">Hold your phone near Woof<small style="color:rgba(255,255,255,.55)">Bluetooth pairing starts on its own</small></div></div>
        <div class="row"><span class="row__ico" style="background:rgba(255,255,255,.1);color:#fff">${icon("halo", 18)}</span><div class="row__t">Watch for a white halo<small style="color:rgba(255,255,255,.55)">It breathes while it pairs</small></div></div>
      </div>
    </div>
    <div class="bottom"><button class="btn btn--light" data-go="paired">Pair</button></div>` }));

def("paired", "Onboarding", "Paired",
  "",
  () => screen({ id: "paired", dark: true, body: `
    <div style="position:relative;height:330px;margin-top:-54px;overflow:hidden">
      <img src="${A}/product/halo-white.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 50%">
      <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(10,10,11,.6) 0%,transparent 30%,transparent 60%,#0a0a0b 100%)"></div>
    </div>
    <div class="pad" style="margin-top:6px">
      <span class="pill pill--dark" style="background:rgba(255,255,255,.14)">${icon("check", 14)}Paired</span>
      <h1 class="h1" style="margin-top:14px">Milo's Woof<br>is ready.</h1>
      <div class="list" style="background:rgba(255,255,255,.07);margin-top:24px">
        <div class="row"><div class="row__t">Finish</div><span class="row__v" style="color:#fff;display:flex;align-items:center;gap:8px"><span style="width:14px;height:14px;border-radius:50%;background:radial-gradient(circle at 32% 28%,#fdfcfa,#c9c5be)"></span>White Titanium</span></div>
        <div class="row"><div class="row__t">Band</div><span class="row__v" style="color:#fff">Knit · Olive</span></div>
        <div class="row"><div class="row__t">Battery</div><span class="row__v" style="color:#fff">100%</span></div>
        <div class="row"><div class="row__t">Software</div><span class="row__v" style="color:#fff">1.4.2 · Up to date</span></div>
      </div>
    </div>
    <div class="bottom"><button class="btn btn--light" data-go="fit">Fit the collar</button></div>` }));

def("fit", "Onboarding", "Fit check",
  "",
  () => screen({ id: "fit", body: `
    ${navBar({ back: "Back", backTo: "paired", title: "Fit the collar" })}
    <div class="pad" style="margin-top:8px">
      <div style="position:relative;height:250px;border-radius:24px;overflow:hidden;background:var(--stone)">
        <img src="${A}/product/collar-system-olive.jpg" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 62%">
        <span style="position:absolute;left:192px;top:150px;width:26px;height:26px;border-radius:50%;background:#111;color:#fff;font-size:12.5px;font-weight:600;display:grid;place-items:center;box-shadow:0 0 0 4px rgba(255,255,255,.75)">1</span>
        <span style="position:absolute;left:58px;top:192px;width:26px;height:26px;border-radius:50%;background:#111;color:#fff;font-size:12.5px;font-weight:600;display:grid;place-items:center;box-shadow:0 0 0 4px rgba(255,255,255,.75)">2</span>
      </div>
      <div style="margin-top:18px">
        <div class="driver"><span class="driver__ico flat" style="background:var(--mist);color:var(--ink)">1</span><div><b>Under the neck</b><span>Module resting under Milo's chin, wordmark facing out.</span></div><span></span></div>
        <div class="driver"><span class="driver__ico flat" style="background:var(--mist);color:var(--ink)">2</span><div><b>Snug, not tight</b><span>Two fingers should slide under the band.</span></div><span></span></div>
      </div>
      <div class="card" style="display:flex;align-items:center;gap:16px;margin-top:12px">
        ${capsule({ w: 74, h: 43, value: 100, stroke: 4, halo: true, text: icon("check", 20), size: 16 })}
        <div style="flex:1"><p class="h3">Good signal</p><p class="small" style="margin-top:2px">Woof could read Milo's breathing in 4 of 4 still moments.</p></div>
      </div>
    </div>
    <div class="bottom"><button class="btn" data-go="permissions">Looks good</button></div>` }));

def("permissions", "Onboarding", "Permissions",
  "",
  () => screen({ id: "permissions", body: `
    ${navBar({ back: "Back", backTo: "fit" })}
    <div class="pad" style="margin-top:20px">
      <h1 class="h1">Stay close to Milo</h1>
      <p class="small" style="margin-top:8px;font-size:14px">Three things Woof needs from your phone to work in the background.</p>
      <div class="list" style="margin-top:28px">
        <div class="row" style="min-height:76px"><span class="row__ico">${icon("bell", 18)}</span><div class="row__t">Notifications<small>Morning summary, and alerts if something changes</small></div><span class="tg is-on"></span></div>
        <div class="row" style="min-height:76px"><span class="row__ico">${icon("bt", 18)}</span><div class="row__t">Bluetooth<small>Syncs Milo's Woof whenever you're nearby</small></div><span class="tg is-on"></span></div>
        <div class="row" style="min-height:76px"><span class="row__ico">${icon("pin", 18)}</span><div class="row__t">Location<small>Map and Woof friends</small></div><span class="tg is-on"></span></div>
      </div>
      <p class="tiny" style="margin-top:14px;padding:0 4px">Milo's location is never shared without your say.</p>
    </div>
    <div class="bottom"><button class="btn" data-go="ready">Continue</button></div>` }));

def("ready", "Onboarding", "Learning period",
  "",
  () => screen({ id: "ready", body: `
    <div class="pad" style="margin-top:30px">
      <div style="display:flex;justify-content:center">${capsule({ w: 172, h: 100, value: 7, stroke: 5, halo: true, logo: 7, text: "14", size: 30, label: "days" })}</div>
      <h1 class="h1" style="margin-top:26px;text-align:center">Now we get<br>to know Milo.</h1>
      <p class="small" style="margin-top:10px;font-size:14px;text-align:center;padding:0 12px">Every dog has their own normal. Woof needs about two weeks of wear to learn his.</p>
      <div style="margin-top:26px;position:relative;padding-left:30px">
        <span style="position:absolute;left:8px;top:10px;bottom:22px;width:2px;background:var(--track);border-radius:2px"></span>
        ${[["Today", "Activity and rest, against typical ranges for his size and age", true],
          ["Around day 7", "His daily score", false],
          ["Days 7 to 10", "Resting heart rate and sleeping breathing rate", false],
          ["Day 14", "Alerts switch on, once his baseline is steady", false]].map(([d, t, on]) => `
          <div style="position:relative;padding:0 0 16px">
            <span style="position:absolute;left:-27px;top:4px;width:12px;height:12px;border-radius:50%;background:${on ? "var(--ink)" : "var(--paper)"};box-shadow:inset 0 0 0 2px var(--ink)"></span>
            <p class="lbl" style="color:${on ? "var(--ink)" : "var(--faint)"}">${d}</p><p style="font-size:15px;margin-top:3px">${t}</p>
          </div>`).join("")}
      </div>
    </div>
    <div class="bottom"><button class="btn" data-go="today-learning">Go to Today</button></div>` }));

/* =================================================================
   TODAY
   ================================================================= */

def("today-learning", "Today", "Today · learning",
  "",
  () => screen({ id: "today-learning", tabs: "today", body: `
    ${header("Monday 19 October", "Milo")}
    <div style="display:flex;flex-direction:column;align-items:center;margin-top:22px">
      ${capsule({ w: 236, h: 137, value: 43, stroke: 7, halo: true, logo: 8, unit: "%", size: 42, label: "Day 6 of 14" })}
      <p class="small" style="margin-top:14px">Getting to know Milo</p>
    </div>
    <div class="pad" style="margin-top:20px">
      <div class="card">
        <p class="lbl">What we've learned</p>
        <p class="p" style="margin-top:8px">Milo naps in short bouts after lunch and sleeps most soundly after 1 am. He's most active between 7 and 9 am.</p>
      </div>
      <div class="grid2" style="margin-top:10px">
        <div class="card"><p class="lbl">Rest · 24 h</p><p class="mid" style="margin-top:10px">11<small>h</small> 05<small>m</small></p><p class="tiny" style="margin-top:8px">Typical for his size and age: 10–13 h</p></div>
        <div class="card"><p class="lbl">Activity</p><p class="mid" style="margin-top:10px">68<small>min</small></p><p class="tiny" style="margin-top:8px">Typical for his size and age: 60–120 min</p></div>
      </div>
      <div class="sec"><span class="lbl">Unlocking</span>
        <div class="list">
          <div class="row"><div class="row__t">Rest and activity</div><span class="pill pill--ok" style="height:26px">${icon("check", 13)}Ready</span></div>
          <div class="row"><div class="row__t">Daily score</div><span class="row__v">Tomorrow</span></div>
          <div class="row"><div class="row__t">Sleeping breathing rate</div><span class="row__v">In 3 days</span></div>
          <div class="row"><div class="row__t">Resting heart rate</div><span class="row__v">In 5 days</span></div>
          <div class="row"><div class="row__t">Alerts</div><span class="row__v">Day 14</span></div>
        </div>
      </div>
    </div>` }));

def("today", "Today", "Today",
  "",
  () => screen({ id: "today", tabs: "today", body: `
    ${header("Thursday 12 November", "Milo")}
    <div style="display:flex;flex-direction:column;align-items:center;margin-top:20px" data-go="score">
      ${capsule({ w: 236, h: 137, value: 86, stroke: 7, halo: true, logo: 8, unit: "%", size: 42, label: "Daily score" })}
      <p class="small" style="margin-top:14px"><span class="up" style="font-weight:600">↑ 5</span> above his 7-day average</p>
    </div>
    <div style="display:flex;justify-content:center;gap:8px;margin-top:14px">
      ${haloPill("white")}<span class="pill">${icon("sync", 15)}Synced 2 min ago</span>
    </div>
    <div class="pad" style="margin-top:20px">
      <div class="card" data-go="score">
        <p class="lbl">This morning</p>
        <p class="p" style="margin-top:8px">Milo rested 11 h 20 m, 35 minutes more than usual, and had a calm night. His heart and breathing rates sat in his normal range. He's been under his activity target most of this week, so a longer walk today would help.</p>
        <p style="margin-top:12px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:6px">Why 86 ${icon("arrow", 15)}</p>
      </div>
      <div class="grid2" style="margin-top:10px">
        <div class="card" data-go="rest"><p class="lbl">Rest · 24 h</p><p class="mid" style="margin-top:10px">11<small>h</small> 20<small>m</small></p><div style="margin-top:12px">${haloMeter(88)}</div><p class="tiny" style="margin-top:8px">Above his usual</p></div>
        <div class="card" data-go="activity"><p class="lbl">Activity · Wed</p><p class="mid" style="margin-top:10px">74<small>min</small></p><div style="margin-top:12px">${haloMeter(82)}</div><p class="tiny" style="margin-top:8px">16 min under target</p></div>
      </div>
      <div class="card" data-go="vitals">
        <p class="lbl">Vitals · Last night</p>
        <div style="display:grid;grid-template-columns:auto 1fr;gap:14px 14px;align-items:center;margin-top:14px">
          <span style="color:var(--muted)">${icon("heart", 20)}</span>
          <div><div style="display:flex;justify-content:space-between;font-size:14px"><span>Resting heart rate</span><b style="font-weight:600" class="num">62 <span class="muted" style="font-weight:400">bpm</span></b></div>${rangeBar(62, 56, 70, 45, 85)}</div>
          <span style="color:var(--muted)">${icon("breath", 20)}</span>
          <div><div style="display:flex;justify-content:space-between;font-size:14px"><span>Sleeping breathing rate</span><b style="font-weight:600" class="num">16 <span class="muted" style="font-weight:400">/min</span></b></div>${rangeBar(16, 13, 19, 8, 28)}</div>
        </div>
      </div>
    </div>` }));

def("score", "Today", "Why this score",
  "",
  () => screen({ id: "score", body: `
    ${navBar({ back: "Today", backTo: "today", title: "Daily score" })}
    <div style="display:flex;flex-direction:column;align-items:center;margin-top:12px">
      ${capsule({ w: 176, h: 102, value: 86, stroke: 6, halo: true, logo: 7, unit: "%", size: 32 })}
      <p class="small" style="margin-top:12px">Thursday 12 November · above his usual</p>
    </div>
    <div class="pad">
      <div class="sec"><span class="lbl">What moved it</span>
        <div class="card">
          <div class="driver"><span class="driver__ico up">↑</span><div><b>More rest than usual</b><span>11 h 20 m, 35 min above his average, and a calm night.</span></div><span class="small up num" style="font-weight:600">+6</span></div>
          <div class="driver"><span class="driver__ico flat">–</span><div><b>Resting vitals steady</b><span>Heart rate 62 and breathing rate 16, both in his normal range.</span></div><span class="small num">0</span></div>
          <div class="driver"><span class="driver__ico down">↓</span><div><b>Activity under target</b><span>Below 90 minutes on 5 of the last 7 days.</span></div><span class="small down num" style="font-weight:600">−3</span></div>
        </div>
      </div>
      <div class="sec"><span class="lbl">Last 7 days</span>
        <div class="card" style="padding:18px 16px 14px">${bars({ values: D.scoreWeek, labels: D.week, w: 321, h: 124, max: 100, showVal: true })}</div>
      </div>
      <div class="sec"><span class="lbl">How it works</span>
        <p class="small" style="padding:0 4px 20px">Built from last night's rest, his resting heart rate and breathing rate against his own baseline, and whether recent activity sits in his usual range. It compares Milo with Milo, not with other dogs.</p>
      </div>
    </div>` }));

def("rest", "Today", "Rest",
  "",
  () => screen({ id: "rest", body: `
    ${navBar({ back: "Today", backTo: "today", title: "Rest" })}
    <div class="pad" style="margin-top:14px">
      <p class="lbl">Last 24 hours</p>
      <p class="big" style="margin-top:8px">11<small>h</small> 20<small>m</small></p>
      <p class="small" style="margin-top:6px"><span class="up" style="font-weight:600">35 min</span> above his average of 10 h 45 m</p>
      <div class="card" style="margin-top:18px;padding:18px 16px 12px">
        ${timeline24([[3.33, 4.5, "nap"], [6.08, 6.67, "nap"], [11.67, 21.25, "night"], [15.83, 15.83, "wake"], [18.58, 18.58, "wake"]], { start: 10 })}
        <div style="display:flex;gap:16px;margin-top:6px;font-size:12px;color:var(--muted)">
          <span style="display:flex;align-items:center;gap:6px"><i style="width:10px;height:10px;border-radius:3px;background:var(--ink)"></i>Night</span>
          <span style="display:flex;align-items:center;gap:6px"><i style="width:10px;height:10px;border-radius:3px;background:var(--nap)"></i>Naps</span>
          <span style="display:flex;align-items:center;gap:6px"><i style="width:10px;height:10px;border-radius:3px;background:var(--track)"></i>Awake</span>
        </div>
      </div>
      <div class="card" style="margin-top:10px">
        <div class="kv">
          <div><span>Night rest</span><b>9 h 35 m</b><span>21:40 – 07:15</span></div>
          <div><span>Naps</span><b>2 · 1 h 45 m</b><span>After lunch</span></div>
          <div><span>Wake-ups</span><b>2</b><span>Usual 2–4</span></div>
          <div><span>Restlessness</span><b>Low</b><span>Usual low</span></div>
        </div>
      </div>
      <div class="sec" style="margin-top:22px"><span class="lbl">This week · his normal range shaded</span>
        <div class="card" style="padding:18px 16px 14px">${bars({ values: D.restWeek, labels: D.week, w: 321, h: 120, max: 12.5, lo: 10.08, hi: 11.42, low: [4] })}</div>
      </div>
      <p class="tiny" style="padding:12px 4px 24px">Woof reads rest from stillness and head position. It doesn't measure sleep stages.</p>
    </div>` }));

def("activity", "Today", "Activity",
  "",
  () => screen({ id: "activity", body: `
    ${navBar({ back: "Today", backTo: "today", title: "Activity" })}
    <div class="pad" style="margin-top:6px">
      <div style="display:flex;align-items:center;gap:18px">
        ${capsule({ w: 132, h: 77, value: 82, stroke: 6, halo: true, size: 28, text: "74", label: "min" })}
        <div><p class="lbl">Yesterday · Wed 11 Nov</p><p style="font-size:18px;font-weight:500;margin-top:6px;letter-spacing:-.02em">16 min under target</p><p class="small" style="margin-top:2px">His daily target is 90 min</p></div>
      </div>
      <div class="card" style="margin-top:18px">
        <p class="lbl">By intensity</p>
        <div style="display:flex;height:12px;border-radius:12px;overflow:hidden;margin-top:12px;gap:2px">
          <span style="flex:41;background:var(--bar-3)"></span><span style="flex:24;background:var(--nap)"></span><span style="flex:9;background:var(--ink)"></span>
        </div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);margin-top:12px">
          <div><b class="num" style="font-size:17px;font-weight:450">41 min</b><p class="tiny" style="margin-top:2px">Easy</p></div>
          <div><b class="num" style="font-size:17px;font-weight:450">24 min</b><p class="tiny" style="margin-top:2px">Brisk</p></div>
          <div><b class="num" style="font-size:17px;font-weight:450">9 min</b><p class="tiny" style="margin-top:2px">Play</p></div>
        </div>
      </div>
      <div class="card" style="padding:16px 16px 12px"><p class="lbl" style="margin-bottom:12px">Through the day</p>${hourly(D.hours)}</div>
      <div class="grid2">
        <div class="card"><p class="lbl">Steps</p><p class="mid" style="margin-top:8px;font-size:22px">≈ 9,100</p><p class="tiny" style="margin-top:6px">Estimate</p></div>
        <div class="card"><p class="lbl">Distance</p><p class="mid" style="margin-top:8px;font-size:22px">≈ 3.8<small>km</small></p><p class="tiny" style="margin-top:6px">Estimate</p></div>
      </div>
      <div class="list" style="margin-top:10px;margin-bottom:24px">
        <div class="row"><div class="row__t">Daily target · 90 min<small>Set from his size, age and recent weeks</small></div><span class="row__v" style="color:var(--ink);font-weight:500">Adjust</span>${I.chev}</div>
      </div>
    </div>` }));

def("vitals", "Today", "Vitals",
  "",
  () => screen({ id: "vitals", body: `
    ${navBar({ back: "Today", backTo: "today", title: "Vitals" })}
    <div class="pad" style="margin-top:6px">
      <div class="seg"><span>14 nights</span><span class="is-on">30 nights</span><span>3 months</span></div>
      <div class="card" style="margin-top:14px">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><p class="lbl" style="display:flex;align-items:center;gap:6px">${icon("heart", 13)}Resting heart rate</p><p class="big" style="margin-top:10px">62<small>bpm</small></p></div>
          <span class="pill" style="background:var(--raised)">Steady</span>
        </div>
        <p class="small" style="margin-top:4px">Last night · his normal 56–70</p>
        <div style="margin-top:14px">${lineBand({ values: D.hr30, lo: 56, hi: 70, w: 321, h: 84, min: 50, max: 76 })}</div>
        <div class="legend"><span>14 Oct</span><span>12 Nov</span></div>
      </div>
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><p class="lbl" style="display:flex;align-items:center;gap:6px">${icon("breath", 13)}Sleeping breathing rate</p><p class="big" style="margin-top:10px">16<small>breaths / min</small></p></div>
          <span class="pill" style="background:var(--raised)">Steady</span>
        </div>
        <p class="small" style="margin-top:4px">Last night · his normal 13–19</p>
        <div style="margin-top:14px">${lineBand({ values: D.rr30, lo: 13, hi: 19, w: 321, h: 84, min: 10, max: 22 })}</div>
        <div class="legend"><span>14 Oct</span><span>12 Nov</span></div>
      </div>
      <p class="tiny" style="padding:12px 4px 24px">Measured while Milo is still or asleep, and shown only when the signal is clear. Last night: 19 clear readings out of 23.</p>
    </div>` }));

def("trends", "Today", "Trends",
  "",
  () => screen({ id: "trends", tabs: "trends", body: `
    ${header("Last 30 days", "Trends", `<span style="width:40px;height:40px;border-radius:50%;background:var(--mist);display:grid;place-items:center">${icon("plus", 20)}</span>`)}
    <div class="pad" style="margin-top:16px">
      <div class="seg"><span>Week</span><span class="is-on">Month</span><span>3 months</span></div>
      <div class="card" style="margin-top:14px;padding:16px 16px 12px">
        <div style="display:flex;justify-content:space-between;align-items:baseline"><p class="lbl">Daily score</p><p class="small"><b class="ink num" style="font-weight:600">80</b> avg</p></div>
        <div style="margin-top:14px">${trendLine({ values: D.score30, tags: [[10, 12, "Boarding"], [19, 19, "Moved"]], labels: [[0, "14 Oct"], [15, "29 Oct"], [29, "12 Nov"]] })}</div>
      </div>
      <div class="grid2" style="margin-top:10px">
        ${[["Rest", "10 h 45 m", D.rest30, 10.08, 11.42], ["Activity", "79 min", D.act30, 60, 100], ["Heart rate", "62 bpm", D.hr30, 56, 70], ["Breathing", "16 /min", D.rr30, 13, 19]].map(([t, v, s, lo, hi]) => `
          <div class="card" style="padding:14px 14px 12px"><p class="lbl">${t}</p><p style="font-size:17px;font-weight:450;letter-spacing:-.02em;margin:6px 0 10px" class="num">${v}<span class="tiny"> avg</span></p>${spark(s, { w: 132, h: 34, lo, hi })}</div>`).join("")}
      </div>
      <div class="sec" style="margin-top:22px"><span class="lbl">Context you added</span>
        <div class="list">
          <div class="row"><span class="row__ico">${icon("dog", 18)}</span><div class="row__t">Boarding<small>24–26 Oct · activity down 38%, rest steady</small></div>${I.chev}</div>
          <div class="row"><span class="row__ico">${icon("pin", 18)}</span><div class="row__t">Moved home<small>2 Nov · rest steady, slightly more wake-ups</small></div>${I.chev}</div>
        </div>
      </div>
    </div>` }));

/* =================================================================
   ALERTS
   ================================================================= */

def("lock", "Alerts", "Lock screen",
  "",
  () => screen({ id: "lock", raw: true, lightStatus: true, statusTime: false, body: `
    <img src="${A}/life/wimbledon.jpg" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:28% 50%">
    <div style="position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.72) 0%,rgba(0,0,0,.5) 22%,rgba(0,0,0,.08) 40%,rgba(0,0,0,.08) 52%,rgba(0,0,0,.62) 100%)"></div>
    <div style="position:absolute;top:66px;left:0;right:0;text-align:center;color:#fff;text-shadow:0 2px 24px rgba(0,0,0,.35)">
      <p style="font-size:18px;font-weight:550;letter-spacing:-.01em;opacity:.92">Saturday 21 November</p>
      <p style="font-size:100px;font-weight:300;letter-spacing:-.04em;line-height:1;margin-top:2px">9:41</p>
    </div>
    <div style="position:absolute;left:10px;right:10px;bottom:120px;display:grid;gap:8px">
      ${[["Worth a check", "2h ago", "Milo's sleeping breathing rate has been above his normal for 3 nights. See what changed."],
        ["Milo's morning · 72", "2h ago", "He rested close to his usual, but his breathing rate was higher overnight."]].map(([t, time, b], i) => `
        <div ${i === 0 ? 'data-go="alert"' : ""} style="display:flex;gap:11px;padding:13px 14px;border-radius:22px;background:var(--notif-bg);backdrop-filter:blur(26px) saturate(1.6);-webkit-backdrop-filter:blur(26px) saturate(1.6);color:var(--ink);${i ? "transform:scale(.96);opacity:.92" : ""}">
          ${appIcon(38)}
          <div style="flex:1;min-width:0"><div style="display:flex;justify-content:space-between;font-size:15px;font-weight:600;letter-spacing:-.02em"><span>${t}</span><span style="font-weight:400;font-size:13px;color:var(--notif-time)">${time}</span></div>
          <p style="font-size:14.5px;line-height:1.35;margin-top:2px;letter-spacing:-.015em">${b}</p></div>
        </div>`).join("")}
    </div>
    <div style="position:absolute;left:46px;right:46px;bottom:46px;display:flex;justify-content:space-between">
      ${["torch", "camera"].map((k) => `<span style="width:50px;height:50px;border-radius:50%;background:rgba(0,0,0,.35);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);display:grid;place-items:center;color:#fff">${icon(k, 22)}</span>`).join("")}
    </div>` }));

const alertBody = () => `
    ${navBar({ back: "Today", backTo: "today", title: "", act: icon("share", 22) })}
    <div class="pad" style="margin-top:6px">
      <div style="display:flex;justify-content:space-between;align-items:center">${haloPill("red")}<span class="tiny">Today, 07:02</span></div>
      <h1 class="h2" style="margin-top:16px">Milo's sleeping breathing rate has been above his normal for 3 nights.</h1>
      <div class="card card--alert" style="margin-top:18px">
        <div style="display:flex;justify-content:space-between;align-items:flex-end">
          <div><p class="lbl">Last night</p><p class="big" style="margin-top:8px;color:var(--alert)">24<small>/min</small></p></div>
          <p class="small" style="text-align:right">His normal<br><b class="ink num" style="font-weight:600">13–19</b></p>
        </div>
        <div style="margin-top:14px">${lineBand({ values: D.rrAlert, lo: 13, hi: 19, w: 319, h: 86, min: 10, max: 27, flagHigh: true })}</div>
        <div class="legend"><span>8 Nov</span><span>Since Thursday</span><span>21 Nov</span></div>
      </div>
      <div class="card" style="margin-top:10px">
        <p class="lbl">Often it's something simple</p>
        <p class="p" style="margin-top:8px;font-size:14.5px">A warm room, a busy or exciting day, or a change in routine can all raise it. If it stays high, or Milo seems unwell, it's worth a call to your vet.</p>
      </div>
      <div style="margin-top:16px">
        <button class="btn">${icon("phone", 19)}Call Hyde Park Vets</button>
        <button class="btn btn--ghost" data-go="context">Add context</button>
      </div>
      <p class="tiny" style="margin:14px 4px 24px">Woof is a wellness product, not a medical device. It doesn't diagnose. Shared with Sam.</p>
    </div>`;

def("alert", "Alerts", "Alert",
  "",
  () => screen({ id: "alert", body: alertBody() }));

def("context", "Alerts", "Add context",
  "",
  () => screen({ id: "context", raw: true, body: `
    <div class="scr__body">${alertBody()}</div>`,
    overlay: `<div class="dim" data-go="alert"></div>
    <div class="sheet">
      <div class="sheet__grab"></div>
      <h2 class="h2">What's been different?</h2>
      <p class="small" style="margin-top:6px">Context helps Woof read the change. Alerts it explains are paused.</p>
      <div class="chips" style="margin-top:18px">
        <span class="chip is-on">${I.check}Warm room</span><span class="chip">Busy day</span><span class="chip">Travelling</span><span class="chip">Boarding</span><span class="chip">New food</span><span class="chip">New medication</span><span class="chip">Vet visit</span><span class="chip">Stressful day</span>
      </div>
      <div class="field" style="margin-top:16px;align-items:flex-start;padding:14px 16px;min-height:76px;font-size:15px">Heating was turned up on Thursday.</div>
      <button class="btn" style="margin-top:18px" data-go="alert">Save</button>
    </div>` }));

/* =================================================================
   ASK
   ================================================================= */

def("ask", "Ask", "Ask",
  "",
  () => screen({ id: "ask", tabs: "ask", body: `
    ${header("About Milo's data", "Ask")}
    <div class="pad" style="margin-top:22px">
      <p class="lbl" style="padding:0 4px 10px">Try asking</p>
      <div class="list">
        ${["Why was his score lower on Tuesday?", "How did boarding affect him?", "Is he resting well since we moved?", "What's normal for his breathing rate?"].map((q, i) => `
          <div class="row" ${i === 0 ? 'data-go="chat"' : ""}><span class="row__ico">${icon("spark", 16)}</span><div class="row__t" style="font-size:15px">${q}</div>${I.chev}</div>`).join("")}
      </div>
      <div class="sec"><span class="lbl">Recent</span>
        <div class="list">
          <div class="row"><div class="row__t">Rest after the move<small>3 Nov</small></div>${I.chev}</div>
          <div class="row"><div class="row__t">Boarding week<small>27 Oct</small></div>${I.chev}</div>
        </div>
      </div>
      <p class="tiny" style="padding:14px 4px">Answers come from Milo's own records. Woof isn't a vet and doesn't diagnose.</p>
      <div style="height:70px"></div>
    </div>`,
    overlay: `<div class="composer" data-go="chat">Ask anything about Milo<i>${icon("send", 18)}</i></div>` }));

def("chat", "Ask", "Conversation",
  "",
  () => screen({ id: "chat", tabs: "ask", body: `
    ${navBar({ back: "Ask", backTo: "ask", title: "Tuesday's score" })}
    <div class="pad" style="margin-top:10px">
      <div class="msg msg--me">Why was his score lower on Tuesday?</div>
      <div class="msg" style="margin-top:10px">Tuesday's score was <b>71</b>. Two things moved it: he rested <b>1 h 30 m less</b> than usual after a late evening, and he was <b>40% less active</b> than his normal. His heart and breathing rates stayed in range.
        <div style="margin-top:12px;background:var(--raised);border-radius:14px;padding:12px 10px 8px">${bars({ values: D.scoreWeek, labels: D.week, w: 252, h: 92, max: 100, hl: 4, showVal: true })}</div>
      </div>
      <span class="src">${icon("check", 12)}From Milo's data · 6–12 Nov</span>
      <div class="msg msg--me">Should I walk him more?</div>
      <div class="msg" style="margin-top:10px">His activity was under his target on <b>5 of the last 7 days</b>, averaging <b>75 min</b> against 90. A longer walk on most days would bring him back to his usual.</div>
      <span class="src">${icon("check", 12)}From Milo's data</span>
      <div class="msg">Many owners split exercise into two or three shorter walks, which can be easier to fit in.</div>
      <span class="src">${icon("spark", 12)}General tip</span>
      <div style="height:70px"></div>
    </div>`,
    overlay: `<div class="composer" data-go="emergency">Ask a follow-up<i>${icon("send", 18)}</i></div>` }));

def("emergency", "Ask", "Emergency safeguard",
  "",
  () => screen({ id: "emergency", tabs: "ask", body: `
    ${navBar({ back: "Ask", backTo: "ask", title: "New question" })}
    <div class="pad" style="margin-top:10px">
      <div class="msg msg--me">Milo collapsed on our walk and he's breathing really fast</div>
      <div class="card card--alert" style="margin-top:14px;padding:18px">
        <span class="pill pill--alert">${icon("phone", 14)}Contact a vet now</span>
        <h2 class="h2" style="margin-top:12px">This could be an emergency.</h2>
        <p class="p" style="margin-top:8px;font-size:14.5px">Please call an emergency vet straight away. Woof can't assess emergencies.</p>
        <button class="btn btn--alert" style="margin-top:16px">${icon("phone", 19)}Call Hyde Park Vets</button>
        <button class="btn btn--ghost">Find an open emergency vet</button>
      </div>
      <p class="tiny" style="padding:12px 4px">Woof is a wellness product, not a medical device. It doesn't diagnose or give medical advice.</p>
    </div>` }));

/* =================================================================
   MAP & FRIENDS
   ================================================================= */

const mapScene = (extra = "") => `
  <div style="position:absolute;inset:0">${mapSvg()}</div>
  <div style="position:absolute;left:186px;top:312px;width:68px;height:68px;margin:-34px 0 0 -34px;border-radius:50%;background:rgba(17,17,17,.08);box-shadow:inset 0 0 0 1px rgba(17,17,17,.12)"></div>
  <div style="position:absolute;left:186px;top:312px;margin:-23px 0 0 -23px">${avatar("milo", "av--ring", 46)}</div>
  <div style="position:absolute;left:236px;top:258px;margin:-18px 0 0 -18px">${avatar("bella", "av--blue", 36)}</div>
  <div style="position:absolute;top:60px;left:16px;right:16px;display:flex;justify-content:space-between;align-items:center">
    <span class="pill" style="background:var(--raised);box-shadow:0 4px 16px rgba(0,0,0,.08);height:36px;padding:0 14px"><span style="width:8px;height:8px;border-radius:50%;background:var(--ink);box-shadow:0 0 0 3px rgba(17,17,17,.15)"></span>Live · GPS</span>
    <span style="display:flex;flex-direction:column;border-radius:14px;background:var(--raised);box-shadow:0 4px 16px rgba(0,0,0,.08)">
      <span style="width:44px;height:44px;display:grid;place-items:center">${icon("layers", 20)}</span><span style="height:1px;background:var(--line);margin:0 8px"></span><span style="width:44px;height:44px;display:grid;place-items:center">${icon("locate", 18)}</span>
    </span>
  </div>${extra}`;

def("map", "Map & friends", "Map",
  "",
  () => screen({ id: "map", tabs: "map", raw: true, body: mapScene(), overlay: `
    <div class="sheet" style="bottom:86px;padding-bottom:18px;border-radius:28px 28px 0 0;box-shadow:0 -6px 30px rgba(0,0,0,.1)">
      <div class="sheet__grab" style="margin-bottom:14px"></div>
      <div style="display:flex;align-items:center;gap:12px">
        ${avatar("milo")}
        <div style="flex:1"><p class="h3">Milo</p><p class="small">Hyde Park, by the Serpentine · 1 min ago</p></div>
      </div>
      <div style="display:flex;gap:8px;margin-top:14px">
        <button class="btn btn--sm" style="flex:1">${icon("locate", 16)}Directions</button>
        <button class="btn btn--sm btn--ghost" style="flex:1">${icon("halo", 18)}Light up halo</button>
      </div>
      <div class="hr" style="margin:16px 0 4px"></div>
      <div class="row" style="border:0;min-height:58px" data-go="friend">${avatar("bella", "av--blue")}<div class="row__t" style="padding-left:4px">Bella<small>Cavapoo · 40 m away</small></div><span class="pill pill--blue" style="height:26px">Together 18 min</span></div>
      <div class="row" style="border:0;min-height:52px;padding-top:0">${avatar("otto")}<div class="row__t" style="padding-left:4px">Otto<small>Whippet · met 4 times</small></div><span class="row__v">Sunday</span></div>
    </div>` }));

def("friend", "Map & friends", "Woof friends",
  "",
  () => screen({ id: "friend", tabs: "map", raw: true, body: mapScene(), overlay: `
    <div class="dim" data-go="map"></div>
    <div class="sheet" style="text-align:center;padding-top:10px">
      <div class="sheet__grab"></div>
      <div style="display:flex;justify-content:center;margin-top:8px">
        <span class="av av--lg av--blue" style="background-image:url(${A}/app/avatar-milo.jpg)"></span>
        <span class="av av--lg av--blue" style="margin-left:-14px;background-image:url(${A}/app/avatar-bella.jpg)"></span>
      </div>
      <p class="lbl" style="margin-top:20px;color:var(--blue-text)">Better together</p>
      <h2 class="h1" style="margin-top:8px;font-size:28px">Milo met Bella</h2>
      <p class="p" style="margin-top:8px;padding:0 10px">They spent 18 minutes side by side in Hyde Park, and both halos turned blue.</p>
      <p class="small" style="margin-top:10px;padding:0 16px">Connect with Bella's family to see when they're nearby and how often they meet.</p>
      <div style="margin-top:22px"><button class="btn" data-go="map">Connect</button><button class="btn btn--ghost" data-go="map">Not now</button></div>
      <p class="tiny" style="margin-top:14px">Friends see Milo's name and photo, never your exact location.</p>
    </div>` }));

/* =================================================================
   WOOF (device, halo, membership)
   ================================================================= */

def("device", "Woof", "Woof",
  "",
  () => screen({ id: "device", tabs: "woof", body: `
    ${header("Milo's collar", "Woof", "")}
    <div class="pad" style="margin-top:18px">
      <div style="position:relative;height:196px;border-radius:24px;overflow:hidden;background:var(--stone)">
        <img src="${A}/collars/white-titanium-knit-olive-detail.jpg" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 58%">
        <span class="pill" style="position:absolute;left:12px;top:12px;background:var(--glass)"><span style="width:7px;height:7px;border-radius:50%;background:var(--ok)"></span>Connected</span>
        <span style="position:absolute;left:14px;bottom:12px;color:#fff;font-size:13px;font-weight:550;text-shadow:0 1px 10px rgba(0,0,0,.35)">White Titanium · Knit Olive</span>
      </div>
      <div class="grid2" style="margin-top:10px">
        <div class="card"><p class="lbl">Battery</p><p class="mid" style="margin-top:8px">64<small>%</small></p><p class="tiny" style="margin-top:6px">About 9 days left</p></div>
        <div class="card"><p class="lbl">Last sync</p><p class="mid" style="margin-top:8px;font-size:22px">2 min ago</p><p class="tiny" style="margin-top:6px">Software 1.4.2 · Up to date</p></div>
      </div>
      <div class="list" style="margin-top:10px">
        <div class="row" data-go="halo"><span class="row__ico">${icon("halo", 18)}</span><div class="row__t">Halo</div><span class="row__v">All good</span>${I.chev}</div>
        <div class="row" data-go="fit"><span class="row__ico">${icon("fit", 18)}</span><div class="row__t">Fit check</div><span class="row__v">Good</span>${I.chev}</div>
        <div class="row"><span class="row__ico">${icon("find", 18)}</span><div class="row__t">Find Milo's Woof</div>${I.chev}</div>
      </div>
      <div class="list" style="margin-top:10px;margin-bottom:20px">
        <div class="row"><span class="row__ico">${icon("dog", 18)}</span><div class="row__t">Milo's profile</div>${I.chev}</div>
        <div class="row"><span class="row__ico">${icon("people", 18)}</span><div class="row__t">Household</div><span class="row__v">You and Sam</span>${I.chev}</div>
        <div class="row" data-go="membership"><span class="row__ico">${icon("star", 18)}</span><div class="row__t">Membership</div><span class="row__v">Active</span>${I.chev}</div>
        <div class="row"><span class="row__ico">${icon("help", 18)}</span><div class="row__t">Help and support</div>${I.chev}</div>
      </div>
    </div>` }));

def("halo", "Woof", "Halo settings",
  "",
  () => screen({ id: "halo", body: `
    ${navBar({ back: "Woof", backTo: "device", title: "Halo" })}
    <div class="pad" style="margin-top:6px">
      <div style="height:170px;border-radius:24px;overflow:hidden;background:#000;position:relative">
        <img src="${A}/product/halo-white.jpg" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 48%">
        <span class="pill pill--dark" style="position:absolute;left:12px;bottom:12px;background:rgba(0,0,0,.45)"><span class="halo-glyph halo-glyph--glow" style="width:16px;height:10px"></span>Now: All good</span>
      </div>
      <div class="sec" style="margin-top:22px"><span class="lbl">Light states</span>
        <div class="list">
          ${[["var(--ink)", "White", "All good", ""], ["var(--halo-blue)", "Blue", "A Woof friend is nearby", ""], ["var(--halo-red)", "Red", "Something is worth a check", "Recommended"]].map(([c, t, s]) => `
            <div class="row"><span class="halo-glyph" style="color:${c};width:24px;height:14px;${c !== "var(--ink)" ? `box-shadow:0 0 8px ${c}` : ""}"></span><div class="row__t">${t}<small>${s}</small></div><span class="tg is-on"></span></div>`).join("")}
        </div>
      </div>
      <div class="sec" style="margin-top:22px"><span class="lbl">Brightness</span><div class="seg"><span>Low</span><span class="is-on">Auto</span><span>High</span></div></div>
      <div class="list" style="margin-top:12px">
        <div class="row"><div class="row__t">Quiet hours<small>Halo off 22:00–07:00 while Milo sleeps</small></div><span class="tg is-on"></span></div>
      </div>
      <button class="btn btn--ghost" style="margin-top:14px">${icon("halo", 20)}Light up the halo now</button>
      <p class="tiny" style="padding:12px 4px 24px">More light states can arrive later through software updates.</p>
    </div>` }));

def("membership", "Woof", "Membership",
  "",
  () => screen({ id: "membership", body: `
    ${navBar({ back: "Woof", backTo: "device", title: "Membership" })}
    <div class="pad" style="margin-top:6px">
      <div style="position:relative;border-radius:24px;background:#0b0b0c;color:#fff;padding:22px 20px;overflow:hidden;box-shadow:inset 0 0 0 1px var(--card-edge)">
        <svg width="260" height="150" viewBox="0 0 260 150" style="position:absolute;right:-70px;top:-30px;opacity:.16"><path d="${capsulePath(260, 150, 6)}" fill="none" stroke="#fff" stroke-width="2"/></svg>
        <img src="${ASSETS}logo/woof-white.svg" alt="" style="height:12px">
        <p class="h2" style="margin-top:26px;color:#fff">Woof Membership</p>
        <div style="display:flex;align-items:center;gap:10px;margin-top:10px"><span class="pill pill--dark" style="background:rgba(31,122,70,.3);color:#9be3b6">Active</span><span style="font-size:13.5px;color:rgba(255,255,255,.65)">First year included with Milo's Woof</span></div>
        <div class="hr" style="background:rgba(255,255,255,.14);margin:18px 0 12px"></div>
        <div style="display:flex;justify-content:space-between;font-size:14px"><span style="color:rgba(255,255,255,.6)">Renews</span><span>14 October 2027</span></div>
      </div>
      <div class="sec"><span class="lbl">Included</span>
        <div class="list">
          ${["Daily score and morning summary", "Rest, activity and vitals trends", "Alerts when something changes", "Ask, answered from Milo's data", "Live location", "Software updates"].map((t) => `
            <div class="row" style="min-height:48px"><span style="color:var(--ok)">${icon("check", 18)}</span><div class="row__t">${t}</div></div>`).join("")}
        </div>
      </div>
      <div class="card" style="margin-top:10px;display:flex;gap:14px;align-items:center">
        <span class="halo-glyph" style="color:var(--halo-blue);width:28px;height:17px;box-shadow:0 0 10px var(--halo-blue)"></span>
        <div style="flex:1"><p style="font-size:15px;font-weight:550">Better Together</p><p class="small">Woof friends and the blue halo.</p></div><span class="pill" style="background:var(--raised)">Coming soon</span>
      </div>
      <p style="text-align:center;margin:20px 0 28px"><span class="link" style="font-size:14.5px">Manage on woof.com</span></p>
    </div>` }));

/* =================================================================
   STATES (when something is missing or the collar needs attention)
   ================================================================= */

def("today-nodata", "States", "Today · no score",
  "",
  () => screen({ id: "today-nodata", tabs: "today", body: `
    ${header("Friday 13 November", "Milo")}
    <div style="display:flex;flex-direction:column;align-items:center;margin-top:20px">
      ${capsule({ w: 236, h: 137, value: 0, stroke: 7, halo: true, logo: 8, text: "–", size: 42, label: "No score today" })}
      <p class="small" style="margin-top:14px">Not enough data from last night</p>
    </div>
    <div style="display:flex;justify-content:center;gap:8px;margin-top:14px">
      <span class="pill">${icon("moon", 15)}Off 22:10 – 07:30</span><span class="pill">${icon("sync", 15)}Synced 2 min ago</span>
    </div>
    <div class="pad" style="margin-top:20px">
      <div class="card">
        <p class="lbl">Why there's no score</p>
        <p class="p" style="margin-top:8px">Milo's Woof was off from 22:10 to 07:30, so it missed most of his night. Rather than guess, Woof skips today's score. His activity still counts.</p>
        <div class="row" style="border:0;min-height:0;padding:14px 0 2px"><span class="row__ico">${icon("bell", 17)}</span><div class="row__t" style="font-size:14.5px">Bedtime reminder<small>A nudge at 21:30 if Woof isn't on</small></div><span class="tg"></span></div>
      </div>
      <div class="grid2" style="margin-top:10px">
        <div class="card"><p class="lbl">Rest · 24 h</p><p class="mid" style="margin-top:10px">–</p><p class="tiny" style="margin-top:12px">2 h 10 m recorded, not enough for a total</p></div>
        <div class="card"><p class="lbl">Activity · today</p><p class="mid" style="margin-top:10px">22<small>min</small></p><div style="margin-top:12px">${haloMeter(24)}</div><p class="tiny" style="margin-top:8px">Since 07:30</p></div>
      </div>
      <div class="card" data-go="vitals-gap">
        <p class="lbl">Vitals · last night</p>
        <p class="p" style="margin-top:8px;font-size:14.5px">No readings while the collar was off.</p>
        <p style="margin-top:10px;font-size:14px;font-weight:600;display:flex;align-items:center;gap:6px">See vitals ${icon("arrow", 15)}</p>
      </div>
    </div>` }));

const vitalsGapCard = (ic, title, v, lo, hi, min, max) => `
      <div class="card">
        <div style="display:flex;justify-content:space-between;align-items:flex-start">
          <div><p class="lbl" style="display:flex;align-items:center;gap:6px">${icon(ic, 13)}${title}</p><p class="big" style="margin-top:10px" aria-label="No reading">—</p></div>
          <span class="pill" style="background:var(--raised)">No reading</span>
        </div>
        <p class="small" style="margin-top:4px">Last night · collar off</p>
        <div style="margin-top:14px">${lineBand({ values: v, lo, hi, w: 321, h: 84, min, max })}</div>
        <div class="legend"><span>15 Oct</span><span>13 Nov</span></div>
      </div>`;

def("vitals-gap", "States", "Vitals · gaps",
  "",
  () => screen({ id: "vitals-gap", body: `
    ${navBar({ back: "Today", backTo: "today-nodata", title: "Vitals" })}
    <div class="pad" style="margin-top:6px">
      <div class="seg"><span>14 nights</span><span class="is-on">30 nights</span><span>3 months</span></div>
      <div style="margin-top:14px">${vitalsGapCard("heart", "Resting heart rate", D.hrGap, 56, 70, 50, 76)}</div>
      ${vitalsGapCard("breath", "Sleeping breathing rate", D.rrGap, 13, 19, 10, 22)}
      <div class="card card--white" style="margin-top:10px">
        <div style="display:flex;gap:12px">
          <span class="row__ico" style="background:var(--mist)">${icon("fit", 18)}</span>
          <div style="flex:1"><p class="h3">8 Nov: too loose to read</p><p class="small" style="margin-top:4px">Woof reads vitals while Milo is still. When the collar sits loose, readings get noisy, so Woof leaves the night blank rather than guess.</p></div>
        </div>
        <button class="btn btn--sm btn--ghost" style="margin-top:14px;width:100%" data-go="fit">Check the fit</button>
      </div>
    </div>` }));

def("sync", "States", "Couldn't sync",
  "",
  () => screen({ id: "sync", tabs: "today", body: `
    ${header("Friday 13 November", "Milo")}
    <div style="display:flex;flex-direction:column;align-items:center;margin-top:20px">
      ${capsule({ w: 236, h: 137, value: 86, stroke: 7, halo: true, logo: 8, unit: "%", size: 42, label: "Yesterday" })}
      <p class="small" style="margin-top:14px">Waiting for last night's data</p>
    </div>
    <div style="display:flex;justify-content:center;gap:8px;margin-top:14px">
      <span class="pill">${icon("sync", 15)}Last synced 9 h ago</span>
    </div>`,
    overlay: `<div class="dim" data-go="today"></div>
    <div class="sheet">
      <div class="sheet__grab"></div>
      <h2 class="h2">Couldn't reach Milo's Woof</h2>
      <p class="small" style="margin-top:6px;font-size:14px">It last synced 9 hours ago. Woof keeps recording in the meantime, so nothing is lost.</p>
      <div class="list" style="margin-top:16px">
        <div class="row"><span class="row__ico">${icon("pin", 18)}</span><div class="row__t">Bring your phone close to Milo<small>Within a few metres</small></div></div>
        <div class="row"><span class="row__ico">${icon("bt", 18)}</span><div class="row__t">Check Bluetooth is on<small>Settings › Bluetooth</small></div></div>
        <div class="row"><span class="row__ico">${icon("battery", 18)}</span><div class="row__t">Check Woof has battery<small>Last seen at 64%</small></div></div>
      </div>
      <button class="btn" style="margin-top:18px" data-go="today">Try again</button>
    </div>` }));

def("battery-low", "States", "Low battery",
  "",
  () => screen({ id: "battery-low", tabs: "woof", body: `
    ${header("Milo's collar", "Woof", "")}
    <div class="pad" style="margin-top:18px">
      <div style="position:relative;height:196px;border-radius:24px;overflow:hidden;background:var(--stone)">
        <img src="${A}/collars/white-titanium-knit-olive-detail.jpg" alt="" style="width:100%;height:100%;object-fit:cover;object-position:50% 58%">
        <span class="pill" style="position:absolute;left:12px;top:12px;background:var(--glass)">${icon("battery", 15)}Low battery</span>
      </div>
      <div class="grid2" style="margin-top:10px">
        <div class="card" data-go="charging"><p class="lbl">Battery</p><p class="mid" style="margin-top:8px">12<small>%</small></p><div style="margin-top:10px">${haloMeter(12)}</div><p class="tiny" style="margin-top:8px">About a day left</p></div>
        <div class="card"><p class="lbl">Last sync</p><p class="mid" style="margin-top:8px;font-size:22px">2 min ago</p><p class="tiny" style="margin-top:8px">Software 1.4.2</p></div>
      </div>
      <div class="card card--white" style="margin-top:10px">
        <p class="h3">Charge it this afternoon</p>
        <p class="small" style="margin-top:4px">Charged now, it's back on Milo before bedtime, and Woof can still read his sleep tonight.</p>
        <button class="btn btn--sm" style="margin-top:14px;width:100%" data-go="charging">${icon("bell", 16)}Remind me at 15:00</button>
      </div>
    </div>` }));

def("charging", "States", "Charging",
  "",
  () => screen({ id: "charging", body: `
    ${navBar({ back: "Woof", backTo: "device", title: "Charging" })}
    <div class="pad" style="margin-top:6px">
      <div style="position:relative;height:210px;border-radius:24px;overflow:hidden;background:var(--stone)">
        <img src="${A}/product/dock-white-side.jpg" alt="Milo's Woof on its wireless dock" style="width:100%;height:100%;object-fit:cover;object-position:50% 62%">
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;margin-top:22px">
        ${capsule({ w: 200, h: 116, value: 64, stroke: 6, halo: true, logo: 7, unit: "%", size: 36, label: "Charging" })}
        <p class="small" style="margin-top:14px;text-align:center;padding:0 24px">Put it back on Milo before bedtime, so Woof can read his sleep tonight.</p>
      </div>
      <div class="list" style="margin-top:20px">
        <div class="row"><span class="row__ico">${icon("bell", 18)}</span><div class="row__t">Tell me when it's full</div><span class="tg is-on"></span></div>
        <div class="row" data-go="update"><span class="row__ico">${icon("chip", 18)}</span><div class="row__t">Software 1.5.0 is ready<small>Installs while it charges</small></div><span class="row__v" style="color:var(--ink);font-weight:500">Install</span>${I.chev}</div>
      </div>
    </div>` }));

def("update", "States", "Software update",
  "",
  () => screen({ id: "update", body: `
    ${navBar({ back: "Woof", backTo: "device", title: "Software update" })}
    <div class="pad" style="margin-top:26px">
      <div style="display:flex;flex-direction:column;align-items:center">
        ${capsule({ w: 236, h: 137, value: 58, stroke: 7, halo: true, logo: 8, unit: "%", size: 42, label: "Installing" })}
        <p class="h3" style="margin-top:18px">Version 1.5.0</p>
        <p class="small" style="margin-top:2px">About 2 minutes left</p>
      </div>
      <div class="card" style="margin-top:22px;display:flex;gap:12px;align-items:center">
        <span class="row__ico">${icon("bt", 18)}</span>
        <p class="small" style="flex:1;color:var(--ink-2)">Keep your phone close to Milo's Woof until it finishes. His data stays safe on the collar.</p>
      </div>
      <div class="sec"><span class="lbl">What's new</span>
        <div class="list">
          ${["Clearer breathing readings for small dogs", "Battery lasts longer between charges", "Faster sync in the morning"].map((t) =>
            `<div class="row"><span style="color:var(--ink)">${icon("check", 18)}</span><div class="row__t">${t}</div></div>`).join("")}
        </div>
      </div>
    </div>` }));

