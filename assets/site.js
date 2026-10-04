/* TheTitansClan — shared prototype script.
   Injects icons, header, footer; runs live-status widgets, copy buttons, tabs,
   filters, forms, lightbox, mobile menu and the shared cart count.
   Add ?state=offline | loading | error | live to any page URL to preview widget states. */
(function () {
  "use strict";

  /* ---------- Icons (inline sprite so it works from file://) ---------- */
  const I = {
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    cart: '<circle cx="9" cy="20" r="1.4"/><circle cx="18" cy="20" r="1.4"/><path d="M2 3h3l2.6 12.2a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.8L21 7H6"/>',
    copy: '<rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    chat: '<path d="M21 12a8.5 8.5 0 0 1-12.3 7.6L3 21l1.5-5.2A8.5 8.5 0 1 1 21 12z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    down: '<path d="m6 9 6 6 6-6"/>',
    left: '<path d="m15 18-6-6 6-6"/>',
    right: '<path d="m9 18 6-6-6-6"/>',
    users: '<circle cx="9" cy="8" r="4"/><path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1M16 3.2a4 4 0 0 1 0 7.6M22 21v-1a5 5 0 0 0-3.5-4.8"/>',
    cube: '<path d="M12 2 3 7v10l9 5 9-5V7z"/><path d="m3 7 9 5 9-5M12 12v10"/>',
    crosshair: '<circle cx="12" cy="12" r="8"/><path d="M12 2v5M12 17v5M2 12h5M17 12h5"/>',
    sword: '<path d="M14.5 17.5 3 6V3h3l11.5 11.5M13 19l6-6M16 16l4 4M19 21l2-2"/>',
    bed: '<path d="M2 20v-8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v8M2 16h20M6 10V8a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>',
    castle: '<path d="M3 21V9h3V5h3v4h2V3h2v6h2V5h3v4h3v12z"/><path d="M10 21v-4a2 2 0 0 1 4 0v4"/>',
    sparkle: '<path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8zM19 15l.7 1.8 1.8.7-1.8.7L19 20l-.7-1.8-1.8-.7 1.8-.7z"/>',
    flame: '<path d="M12 22c4 0 7-2.8 7-7 0-4.5-4-6.5-4.5-12C11.5 5 10 8 10 10.5 9 9.8 8.2 8.8 8 7.5 6 9.5 5 12 5 15c0 4.2 3 7 7 7z"/><path d="M12 22c-1.7 0-3-1.3-3-3 0-2 1.5-3 3-5 1.5 2 3 3 3 5 0 1.7-1.3 3-3 3z"/>',
    crown: '<path d="M3 18h18M3 18 2 7l5.5 4L12 4l4.5 7L22 7l-1 11"/>',
    shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>',
    shieldcheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
    trophy: '<path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM17 5h3v2a3 3 0 0 1-3 3M7 5H4v2a3 3 0 0 0 3 3"/>',
    calendar: '<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    play: '<path d="M7 4v16l13-8z"/>',
    lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
    refund: '<path d="M3 12a9 9 0 1 0 2.6-6.4L3 8M3 3v5h5"/>',
    truck: '<path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
    zap: '<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
    alert: '<circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/>',
    power: '<path d="M18.4 6.6a9 9 0 1 1-12.8 0M12 2v10"/>',
    refresh: '<path d="M21 12a9 9 0 1 1-2.6-6.4L21 8M21 3v5h-5"/>',
    external: '<path d="M14 3h7v7M10 14 21 3M19 14v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    trash: '<path d="M3 6h18M8 6V4h8v2M6 6l1 14h10l1-14"/>',
    star: '<path d="m12 2 3 6.9 7 .4-5.5 4.7 1.7 7L12 17.3 5.8 21l1.7-7L2 9.3l7-.4z"/>',
    flag: '<path d="M4 22V4M4 4h13l-2.5 4L17 12H4"/>',
    mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 6-10 7L2 6"/>',
    book: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V2H6.5A2.5 2.5 0 0 0 4 4.5zM4 19.5A2.5 2.5 0 0 0 6.5 22H20v-5"/>',
    vote: '<path d="M7 10v12M15 5.9 14 10h5.8a2 2 0 0 1 2 2.3l-1.4 8a2 2 0 0 1-2 1.7H7V10l4-8a3 3 0 0 1 4 3.9z"/>',
    gift: '<rect x="3" y="8" width="18" height="4"/><path d="M12 8v13M19 12v9H5v-9M7.5 8a2.5 2.5 0 0 1 0-5C11 3 12 8 12 8s1-5 4.5-5a2.5 2.5 0 0 1 0 5"/>',
    key: '<circle cx="7.5" cy="15.5" r="5"/><path d="m11 12 10-10M16 7l3 3M19 4l2 2"/>',
    shirt: '<path d="M20.4 7.4 16 4a4 4 0 0 1-8 0L3.6 7.4 6 11l2-1v11h8V10l2 1z"/>',
    ticket: '<path d="M3 9a3 3 0 0 0 0 6v3h18v-3a3 3 0 0 0 0-6V6H3z"/><path d="M14 6v2M14 11v2M14 16v2"/>',
    server: '<rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/>',
    search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
    image: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    film: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m10 9 5 3-5 3z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
    headset: '<path d="M3 18v-6a9 9 0 0 1 18 0v6"/><path d="M21 19a2 2 0 0 1-2 2h-1v-6h3zM3 19a2 2 0 0 0 2 2h1v-6H3z"/>',
    link: '<path d="M10 13a5 5 0 0 0 7.5.5l3-3a5 5 0 0 0-7-7L11.8 5.2M14 11a5 5 0 0 0-7.5-.5l-3 3a5 5 0 0 0 7 7l1.7-1.7"/>',
    code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
    bracket: '<path d="M3 5h5v6h5M3 19h5v-6M13 12h8"/>',
    home: '<path d="M3 10 12 3l9 7v11H3z"/>',
    gavel: '<path d="m14 13-7.5 7.5a2.1 2.1 0 0 1-3-3L11 10M16 16l6-6M8 8l6-6M9 7l8 8M21 11l-8-8"/>',
    pin: '<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
    silhouette: '<circle cx="12" cy="8" r="4.6"/><path d="M1.5 24c0-6.6 4.6-10.4 10.5-10.4S22.5 17.4 22.5 24z"/>',
    sliders: '<path d="M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6"/>'
  };
  window.TT_ICON = function (name, cls) {
    return '<svg class="icon ' + (cls || "") + '" viewBox="0 0 24 24" aria-hidden="true"><use href="#i-' + name + '"/></svg>';
  };
  const sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display:none">' +
    Object.keys(I).map(k => '<symbol id="i-' + k + '" viewBox="0 0 24 24">' + I[k] + "</symbol>").join("") + "</svg>";
  document.body.insertAdjacentHTML("afterbegin", sprite);
  const ic = window.TT_ICON;

  /* ---------- Citadel skyline (generated, decorative) ---------- */
  function skyline(towers, wall, H, W) {
    const m = 9;
    const battl = (x1, x2, y) => { let s = ""; for (let p = x1; p < x2; p += 22) { const a = Math.min(p + 11, x2), b = Math.min(p + 22, x2); s += ` L${p} ${y - m} L${a} ${y - m} L${a} ${y} L${b} ${y}`; } return s; };
    let d = `M0 ${H} L0 ${wall}`, x = 0;
    towers.forEach(([tx, w, top, spire]) => {
      d += battl(x, tx, wall) + ` L${tx} ${wall} L${tx} ${top}`;
      d += spire ? ` L${tx + w / 2} ${top - w * 0.75} L${tx + w} ${top}` : battl(tx, tx + w, top);
      d += ` L${tx + w} ${top} L${tx + w} ${wall}`; x = tx + w;
    });
    return d + battl(x, W, wall) + ` L${W} ${wall} L${W} ${H} Z`;
  }
  document.querySelectorAll("svg.skyline").forEach(svg => {
    const back = skyline([[120, 50, 110, 1], [400, 60, 90, 0], [700, 50, 60, 1], [930, 60, 85, 0], [1180, 54, 100, 1]], 150, 240, 1440);
    const front = skyline([[40, 56, 120, 0], [250, 70, 95, 1], [560, 90, 80, 0], [650, 140, 50, 1], [790, 90, 80, 0], [1020, 76, 100, 1], [1250, 56, 122, 0], [1384, 40, 140, 0]], 190, 240, 1440);
    svg.setAttribute("viewBox", "0 0 1440 240");
    svg.setAttribute("preserveAspectRatio", "xMidYMax slice");
    svg.innerHTML = `<path d="${back}" fill="#E7D9B9"/><path d="${front}" fill="currentColor"/>`;
  });

  /* ---------- Shared data ---------- */
  const MC_ADDR = "mc.thetitansclan.com";
    // Real Discord invite goes here once it exists; until then Discord buttons open the Community page.
  const DISCORD_URL = "community.html#discord";
  const L = {
    home: "index.html", mc: "minecraft.html", cs: "cs2.html", store: "store.html", news: "news.html",
    events: "events.html", community: "community.html", media: "media.html",
    support: "support.html", owners: "server-owners.html", terms: "terms.html",
    privacy: "privacy.html", refunds: "refunds.html", discord: DISCORD_URL
  };
  window.TT_LINKS = L;

  /* ---------- Header ---------- */
  const hdr = document.querySelector("[data-site-header]");
  const active = document.body.dataset.page || "";
  const cur = k => (k === active ? ' aria-current="page"' : "");
  if (hdr) {
    hdr.className = "site-header";
    hdr.innerHTML = `
<div class="wrap">
  <a class="brand" href="${L.home}" aria-label="TheTitansClan home"><img src="assets/ttc-icon.svg" alt="" width="32" height="40"><span class="brand-word">The<b>Titans</b>Clan</span></a>
  <nav class="nav" aria-label="Main">
    <a href="${L.mc}"${cur("mc")}><i class="area-dot" style="background:var(--mc)"></i>Minecraft</a>
    <a href="${L.cs}"${cur("cs")}><i class="area-dot" style="background:var(--cs)"></i>CS2</a>
    <a href="${L.events}"${cur("events")}>Events</a>
    <a href="${L.news}"${cur("news")}>News</a>
    <a href="${L.community}"${cur("community")}>Community</a>
    <div class="nav-more">
      <button type="button" aria-expanded="false" aria-haspopup="true">More ${ic("down")}</button>
      <div class="nav-menu" role="menu">
        <a href="${L.media}" role="menuitem">Media<small>Builds, screenshots, clips</small></a>
        <a href="${L.support}" role="menuitem">Rules &amp; Support<small>Rules, appeals, reports, FAQ</small></a>
        <a href="${L.owners}" role="menuitem">For Server Owners<small>CustomEnchants, TitansBans</small></a>
      </div>
    </div>
  </nav>
  <div class="header-actions">
    <span class="status header-live" data-live="mc" data-live-variant="pill"></span>
    <a class="btn btn-ghost header-discord" href="${L.discord}">${ic("chat")} Discord</a>
    <a class="btn btn-primary btn-sm header-store" href="${L.store}">Store</a>
    <button class="btn-icon" type="button" data-open-cart aria-label="Open cart">${ic("cart")}<span class="cart-count" data-n="0"></span></button>
    <button class="btn-icon menu-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="mobile-menu">${ic("menu")}</button>
  </div>
</div>`;
    document.body.insertAdjacentHTML("beforeend", `
<div class="mobile-menu" id="mobile-menu" aria-modal="true" role="dialog" aria-label="Menu">
  <div class="scrim" data-close-menu></div>
  <div class="panel">
    <div class="panel-head">
      <a class="brand" href="${L.home}"><img src="assets/ttc-icon.svg" alt="" width="32" height="40"><span class="brand-word">The<b>Titans</b>Clan</span></a>
      <button class="btn-icon" type="button" data-close-menu aria-label="Close menu">${ic("x")}</button>
    </div>
    <div class="panel-body">
      <div class="row" style="gap:var(--s4)">
        <span class="status" data-live="mc" data-live-variant="pill"></span>
        <span class="status" data-live="cs" data-live-variant="pill"></span>
      </div>
      <div class="mm-group"><h6>Play</h6>
        <a class="mm-link" href="${L.mc}"${cur("mc")}>${ic("cube")} Minecraft <small>Join the network</small></a>
        <a class="mm-link" href="${L.cs}"${cur("cs")}>${ic("crosshair")} CS2 <small>Team &amp; server</small></a>
        <a class="mm-link" href="${L.events}"${cur("events")}>${ic("trophy")} Events &amp; Tournaments</a>
      </div>
      <div class="mm-group"><h6>Shop</h6>
        <a class="mm-link" href="${L.store}"${cur("store")}>${ic("cart")} Store <small>Minecraft · CS2</small></a>
        <a class="mm-link" href="${L.owners}"${cur("owners")}>${ic("code")} For Server Owners</a>
      </div>
      <div class="mm-group"><h6>Clan</h6>
        <a class="mm-link" href="${L.news}"${cur("news")}>${ic("book")} News</a>
        <a class="mm-link" href="${L.community}"${cur("community")}>${ic("users")} Community</a>
        <a class="mm-link" href="${L.media}"${cur("media")}>${ic("image")} Media</a>
      </div>
      <div class="mm-group"><h6>Help</h6>
        <a class="mm-link" href="${L.support}"${cur("support")}>${ic("shield")} Rules &amp; Support</a>
      </div>
      <a class="btn btn-secondary btn-block" href="${L.discord}">${ic("chat")} Join our Discord</a>
      <div class="mm-legal"><a href="${L.terms}">Terms</a><a href="${L.privacy}">Privacy</a><a href="${L.refunds}">Refund policy</a></div>
    </div>
  </div>
</div>`);
  }

  /* ---------- Footer ---------- */
  const ftr = document.querySelector("[data-site-footer]");
  if (ftr) {
    ftr.className = "site-footer";
    ftr.innerHTML = `
<div class="wrap">
  <div class="footer-top">
    <div class="footer-brand">
      <a class="footer-logo" href="${L.home}" aria-label="TheTitansClan home"><img src="assets/ttc-logo.webp" alt="TheTitansClan" width="132" height="166"></a>
      <p>One clan, two battlegrounds. A Minecraft network and a CS2 team, run by players for players.</p>
      <div class="row mt-4"><a class="btn btn-secondary btn-sm" href="${L.discord}">${ic("chat", "icon-sm")} Discord</a><a class="btn btn-outline btn-sm" href="${L.store}">Store</a></div>
    </div>
    <div class="footer-cols">
      <div><h6>Play</h6><a href="${L.mc}">Minecraft</a><a href="${L.cs}">CS2</a><a href="${L.events}">Events &amp; Tournaments</a></div>
      <div><h6>Clan</h6><a href="${L.news}">News</a><a href="${L.community}">Community</a><a href="${L.media}">Media</a></div>
      <div><h6>Shop</h6><a href="${L.store}">Store</a><a href="${L.owners}">For Server Owners</a><a href="${L.owners}">CustomEnchants</a><a href="${L.owners}">TitansBans</a></div>
      <div><h6>Help</h6><a href="${L.support}">Rules &amp; Support</a><a href="${L.support}#appeal">Ban appeal</a><a href="${L.support}#report">Report a player</a><a href="${L.support}#contact">Contact</a></div>
    </div>
  </div>
  <div class="footer-bottom">
    <div>© 2026 TheTitansClan. Not affiliated with Mojang Studios, Microsoft or Valve. Minecraft and Counter-Strike are trademarks of their respective owners.</div>
    <div class="footer-legal"><a href="${L.terms}">Terms</a><a href="${L.privacy}">Privacy</a><a href="${L.refunds}">Refund policy</a></div>
  </div>
</div>`;
  }

  /* ---------- Menus ---------- */
  const mm = document.getElementById("mobile-menu");
  const toggle = document.querySelector(".menu-toggle");
  function setMenu(open) {
    if (!mm) return;
    mm.classList.toggle("is-open", open);
    document.body.classList.toggle("no-scroll", open);
    if (toggle) toggle.setAttribute("aria-expanded", String(open));
  }
  if (toggle) toggle.addEventListener("click", () => setMenu(true));
  // Design-review shortcuts: ?menu=open opens the phone menu, ?more=open opens the desktop "More" dropdown
  const q = new URLSearchParams(location.search);
  if (q.get("menu") === "open") setMenu(true);
  if (q.get("more") === "open") { const n = document.querySelector(".nav-more"); if (n) n.classList.add("is-open"); }
  document.addEventListener("click", e => {
    if (e.target.closest("[data-close-menu]")) setMenu(false);
    const more = e.target.closest(".nav-more > button");
    document.querySelectorAll(".nav-more").forEach(n => {
      const open = more && n.contains(more) ? !n.classList.contains("is-open") : false;
      n.classList.toggle("is-open", open);
      n.querySelector("button").setAttribute("aria-expanded", String(open));
    });
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { setMenu(false); closeOverlays(); }
  });

  /* ---------- Toast ---------- */
  let toastT;
  window.TT_TOAST = function (msg) {
    document.querySelectorAll(".toast").forEach(t => t.remove());
    document.body.insertAdjacentHTML("beforeend", `<div class="toast" role="status">${ic("check")} ${msg}</div>`);
    clearTimeout(toastT);
    toastT = setTimeout(() => document.querySelectorAll(".toast").forEach(t => t.remove()), 2200);
  };

  /* ---------- Copy buttons ---------- */
  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    const ta = document.createElement("textarea");
    ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    try { document.execCommand("copy"); } catch (e) { /* ignore */ }
    ta.remove();
    return Promise.resolve();
  }
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-copy]");
    if (!b) return;
    copyText(b.dataset.copy).then(() => {
      const old = b.innerHTML;
      b.classList.add("is-done");
      b.innerHTML = ic("check", "icon-sm") + " Copied";
      window.TT_TOAST("Copied " + b.dataset.copy);
      setTimeout(() => { b.classList.remove("is-done"); b.innerHTML = old; }, 1600);
    });
  });

  /* ---------- Tabs (role=tablist) ---------- */
  document.addEventListener("click", e => {
    const t = e.target.closest('[role="tab"]');
    if (!t) return;
    const list = t.closest('[role="tablist"]');
    list.querySelectorAll('[role="tab"]').forEach(x => {
      const on = x === t;
      x.setAttribute("aria-selected", String(on));
      const p = document.getElementById(x.getAttribute("aria-controls"));
      if (p) p.hidden = !on;
    });
    list.dispatchEvent(new CustomEvent("tabchange", { detail: t, bubbles: true }));
  });

  /* ---------- Filter chips ---------- */
  document.addEventListener("click", e => {
    const f = e.target.closest("[data-filter]");
    if (!f) return;
    const group = f.closest("[data-filter-group]");
    group.querySelectorAll("[data-filter]").forEach(x => x.setAttribute("aria-pressed", String(x === f)));
    const target = document.getElementById(group.dataset.filterGroup);
    if (!target) return;
    const v = f.dataset.filter;
    let shown = 0;
    target.querySelectorAll("[data-cat]").forEach(el => {
      const ok = v === "all" || el.dataset.cat.split(" ").includes(v);
      el.hidden = !ok; if (ok) shown++;
    });
    const empty = target.parentElement.querySelector("[data-empty]");
    if (empty) empty.hidden = shown > 0;
  });

  /* ---------- Forms (demo validation) ---------- */
  document.querySelectorAll("form[data-validate]").forEach(form => {
    form.setAttribute("novalidate", "");
    form.addEventListener("input", e => {
      const f = e.target.closest(".field");
      if (f && e.target.value.trim()) f.classList.remove("is-invalid");
    });
    form.addEventListener("submit", e => {
      e.preventDefault();
      let first = null;
      form.querySelectorAll("[required]").forEach(inp => {
        const f = inp.closest(".field") || inp.closest(".check");
        const bad = inp.type === "checkbox" ? !inp.checked : !inp.value.trim();
        if (f) f.classList.toggle("is-invalid", bad);
        if (bad && !first) first = inp;
      });
      if (first) { first.focus(); return; }
      // No backend on a static site: copy the answers so the player can paste them into a Discord ticket.
      const lines = [form.dataset.title || document.title];
      const fieldName = inp => {
        const fs = inp.closest("fieldset");
        if ((inp.type === "checkbox" || inp.type === "radio") && fs && fs.querySelector("legend")) return fs.querySelector("legend").textContent;
        const lab = (inp.id && form.querySelector('label[for="' + inp.id + '"]')) || inp.closest("label");
        return lab ? lab.textContent : inp.name;
      };
      form.querySelectorAll("input, select, textarea").forEach(inp => {
        if (inp.type === "submit" || inp.type === "button" || inp.type === "hidden") return;
        if ((inp.type === "checkbox" || inp.type === "radio") && !inp.checked) return;
        const name = fieldName(inp).replace(/optional/i, "").replace(/\s+/g, " ").trim();
        let val = inp.value.trim();
        if (inp.type === "checkbox" || inp.type === "radio") {
          const own = inp.closest("label") || (inp.id && form.querySelector('label[for="' + inp.id + '"]'));
          val = own ? own.textContent.replace(/\s+/g, " ").trim() : "yes";
        }
        if (!val) return;
        const prev = lines.findIndex(l => l.startsWith(name + ": "));
        if (prev > 0 && (inp.type === "checkbox" || inp.type === "radio")) lines[prev] += ", " + val;
        else lines.push(name === val ? val : name + ": " + val);
      });
      const text = lines.join("\n");
      const btn = form.querySelector('[type="submit"]');
      if (btn) btn.classList.add("is-busy");
      // Never hang: give the clipboard 1.5s, and if it fails show the text to copy by hand.
      const timeout = new Promise((_, rej) => setTimeout(() => rej(new Error("timeout")), 1500));
      Promise.race([copyText(text), timeout]).then(() => true, () => false).then(ok => {
        if (btn) btn.classList.remove("is-busy");
        const box = form.querySelector(".form-success");
        if (!ok && box) {
          box.insertAdjacentHTML("beforeend", '<div class="field mt-4"><label class="label">Copy this by hand</label><textarea class="textarea" readonly></textarea></div>');
          const ta = box.querySelector("textarea[readonly]"); ta.value = text; setTimeout(() => ta.select(), 50);
        }
        form.classList.add("is-sent");
      });
    });
  });

  /* ---------- Overlays (generic) ---------- */
  function closeOverlays() {
    document.querySelectorAll(".overlay.is-open").forEach(o => o.classList.remove("is-open"));
    document.querySelectorAll(".overlay[data-temp]").forEach(o => o.remove());
    document.body.classList.remove("no-scroll");
  }
  window.TT_CLOSE = closeOverlays;
  window.TT_OPEN = function (id) {
    const o = document.getElementById(id);
    if (!o) return;
    o.classList.add("is-open");
    document.body.classList.add("no-scroll");
    const f = o.querySelector("[autofocus], button, a, input");
    if (f) setTimeout(() => f.focus(), 50);
  };
  document.addEventListener("click", e => {
    if (e.target.closest("[data-close]")) closeOverlays();
    const o = e.target.closest("[data-open]");
    if (o) { e.preventDefault(); closeOverlays(); window.TT_OPEN(o.dataset.open); }
  });

  /* ---------- Lightbox ---------- */
  document.addEventListener("click", e => {
    const item = e.target.closest("[data-lightbox]");
    if (!item) return;
    e.preventDefault();
    const gallery = [...(item.closest("[data-gallery]") || document).querySelectorAll("[data-lightbox]")];
    let i = gallery.indexOf(item);
    const show = () => {
      const g = gallery[i];
      const isVid = g.dataset.kind === "video";
      lb.querySelector(".lb-media").innerHTML = `<div class="ph ${g.dataset.tone || ""}">${ic(isVid ? "play" : "image")}<span class="ph-label">${isVid ? "video player" : "full-size image"}</span></div>
        <div class="lb-cap"><span><strong style="color:var(--text)">${g.dataset.lightbox}</strong>${g.dataset.by ? " · " + g.dataset.by : ""}</span><span class="tnum">${i + 1} / ${gallery.length}</span></div>`;
    };
    document.body.insertAdjacentHTML("beforeend", `<div class="overlay is-open" data-temp role="dialog" aria-modal="true" aria-label="Media viewer">
      <div class="scrim" data-close></div>
      <div class="lightbox"><div class="lb-media"></div>
      <button class="btn-icon lb-nav" style="left:12px" data-lb="-1" aria-label="Previous">${ic("left")}</button>
      <button class="btn-icon lb-nav" style="right:12px" data-lb="1" aria-label="Next">${ic("right")}</button>
      <button class="btn-icon close-x" data-close aria-label="Close" style="background:rgba(0,0,0,.6)">${ic("x")}</button></div></div>`);
    const lb = document.querySelector(".overlay[data-temp] .lightbox");
    lb.addEventListener("click", ev => {
      const n = ev.target.closest("[data-lb]");
      if (n) { i = (i + +n.dataset.lb + gallery.length) % gallery.length; show(); }
      else if (ev.target === lb) closeOverlays();
    });
    document.body.classList.add("no-scroll");
    show();
  });

  /* ---------- Cart (shared count; store.html owns the drawer) ---------- */
  window.TT_CART = {
    get() { try { return JSON.parse(localStorage.getItem("tt-cart") || "[]"); } catch (e) { return []; } },
    set(c) { try { localStorage.setItem("tt-cart", JSON.stringify(c)); } catch (e) { /* private mode */ } this.badge(c); },
    badge(c) {
      const n = (c || this.get()).reduce((a, x) => a + x.qty, 0);
      document.querySelectorAll(".cart-count").forEach(b => { b.textContent = n || ""; b.dataset.n = n; });
    }
  };
  window.TT_CART.badge();
  document.addEventListener("click", e => {
    if (e.target.closest("[data-open-cart]") && !document.getElementById("cart")) location.href = L.store + "#cart";
  });

  /* ---------- Live status widgets ----------
     Minecraft: real numbers from the public mcsrvstat.us API (allows browser requests), refreshed every 60s.
     CS2: no public server yet, so its widgets show "coming soon".
     ?state=loading|offline|error on any page URL forces a state, for testing. */
  const params = new URLSearchParams(location.search);
  const forced = params.get("state");
  const STATUS_API = "https://api.mcsrvstat.us/3/" + MC_ADDR;
  let mc = null; // { online, max, motd }
  const pill = text => `<i class="status-dot"></i><span class="status-label">${text}</span>`;
  const esc = t => String(t).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  function render(el, state) {
    const game = el.dataset.live, v = el.dataset.liveVariant || "card";
    if (game === "cs") state = "soon";
    if (v === "pill") {
      el.classList.remove("is-live", "is-offline", "is-error", "is-loading", "is-soon");
      el.classList.add("is-" + (state === "soon" ? "offline" : state));
      el.innerHTML = game === "cs" ? pill("CS2 servers soon")
        : state === "live" ? pill(`<span class="tnum">${mc.online}</span> playing`)
        : state === "loading" ? pill('<span class="faint">Checking…</span>')
        : state === "offline" ? pill("Server offline") : pill("Status unavailable");
      return;
    }
    el.dataset.state = state;
    const isMc = game === "mc";
    const label = { live: "Online", offline: "Offline", error: "Unknown", soon: "Coming soon" }[state];
    const head = `<div class="sc-top"><span class="sc-game">${ic(isMc ? "cube" : "crosshair", "icon-sm")} ${isMc ? "Minecraft" : "CS2 community servers"}</span>
      <span class="status is-${state === "soon" ? "offline" : state}">${state === "loading" ? pill('<span class="faint">Checking…</span>') : pill(label)}</span></div>`;
    const copy = `<div class="copy-row"><code>${MC_ADDR}</code><button type="button" class="copy-btn" data-copy="${MC_ADDR}">${ic("copy", "icon-sm")} Copy</button></div>`;
    let body;
    if (state === "soon") {
      body = `<div class="sc-big">Coming soon</div>
        <div class="sc-meta">Our CS2 community servers aren't open yet. Join the Discord to hear the moment they are.</div>
        <a class="btn btn-secondary btn-sm" href="${L.discord}">${ic("chat", "icon-sm")} Join the Discord</a>`;
    } else if (state === "loading") {
      body = `<span class="skel" style="height:36px;width:60%"></span><span class="skel" style="height:4px"></span><span class="skel" style="height:44px"></span>`;
    } else if (state === "live") {
      const pct = mc.max ? Math.round(mc.online / mc.max * 100) : 0;
      body = `<div class="sc-big tnum">${mc.online}<small>/ ${mc.max} playing</small></div>
        <div class="sc-meter"><i style="--fill:${Math.max(pct, 2)}%"></i></div>${copy}
        <div class="sc-meta">Java 1.21 – 26.3 · Bedrock${mc.motd ? ` · <i>${esc(mc.motd)}</i>` : ""}</div>`;
    } else if (state === "offline") {
      body = `<div class="sc-big">Server offline</div>
        <div class="alert alert-offline">${ic("power", "icon-sm")}<div><strong>Back soon</strong>The server is offline right now, usually for a restart or an update. Updates go in #status on Discord.</div></div>${copy}`;
    } else {
      body = `<div class="sc-big">Status unavailable</div>
        <div class="alert alert-error">${ic("alert", "icon-sm")}<div><strong>We couldn't check the server</strong>It may still be up. Try joining, or check again.</div></div>
        ${copy}<button type="button" class="btn btn-secondary btn-sm" data-retry>${ic("refresh", "icon-sm")} Check again</button>`;
    }
    el.innerHTML = head + body;
  }
  const els = () => document.querySelectorAll("[data-live]");
  function fetchStatus() {
    const ctl = "AbortController" in window ? new AbortController() : null;
    const t = setTimeout(() => ctl && ctl.abort(), 8000);
    return fetch(STATUS_API, ctl ? { signal: ctl.signal } : {})
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); })
      .then(d => {
        clearTimeout(t);
        if (!d.online) return "offline";
        mc = { online: (d.players && d.players.online) || 0, max: (d.players && d.players.max) || 0,
               motd: d.motd && d.motd.clean ? d.motd.clean.join(" ").replace(/\s+/g, " ").trim() : "" };
        return "live";
      })
      .catch(() => { clearTimeout(t); return "error"; });
  }
  function refresh(showLoading) {
    if (showLoading) els().forEach(el => render(el, "loading"));
    if (forced) { if (forced === "live") mc = { online: 2, max: 200, motd: "" }; if (forced !== "loading") els().forEach(el => render(el, forced)); return; }
    fetchStatus().then(st => els().forEach(el => render(el, st)));
  }
  refresh(true);
  if (!forced) setInterval(() => { if (!document.hidden) refresh(false); }, 60000);
  document.addEventListener("click", e => { if (e.target.closest("[data-retry]")) refresh(true); });
  window.TT_STATE = forced || "live";
})();
