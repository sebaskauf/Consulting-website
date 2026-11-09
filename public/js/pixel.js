/* Pixel-Ebene der Seite: Porträt, Claude-Tamagotchis, Pixel-Schriftzug, Lektionspixel.
   Alles wird in Kunst-Pixeln auf Canvas gezeichnet und per CSS ganzzahlig vergrößert.
   Farben kommen aus tokens.css, nichts ist hier fest verdrahtet außer Werkzeug-Farben. */
(function () {
  "use strict";
  document.documentElement.classList.add("js");
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cssVar = (name, el) => getComputedStyle(el || document.documentElement).getPropertyValue(name).trim();
  const colors = () => ({
    body: cssVar("--accent"), light: cssVar("--accent-light"), dark: cssVar("--accent-dark"),
    ink: "#191714", line: cssVar("--line-strong"),
    metal: "#9b9184", metalDark: "#6d655a", wood: "#8a5a34", box: "#c9a26b", boxDark: "#a07c4a", screen: "#fbe3d6",
  });

  /* ---------- Claude-Tamagotchi (gleiche Maske wie in den Reels, 16 x 11) ---------- */
  const MASK = [
    "................",
    "................",
    "..XXXXXXXXXXXX..",
    "..XXXXXXXXXXXX..",
    "..XXXEXXXXEXXX..",
    "XXXXXEXXXXEXXXXX",
    "XXXXXXXXXXXXXXXX",
    "..XXXXXXXXXXXX..",
    "..XXXXXXXXXXXX..",
    "...X..X..X..X...",
    "...X..X..X..X...",
  ];

  // Zubehör als Pixel-Listen [x, y, farbschlüssel], relativ zum 16er-Raster
  const ACC = {
    hammer: () => {
      const p = [];
      [[16, 7], [17, 6], [18, 5], [19, 4]].forEach(([x, y]) => p.push([x, y, "wood"]));
      for (let x = 17; x <= 21; x++) p.push([x, 2, "metal"], [x, 3, "metalDark"]);
      return p;
    },
    pointer: () => [[-1, 6, "wood"], [-2, 5, "wood"], [-3, 4, "wood"], [-4, 3, "wood"], [-5, 2, "body"]],
    glasses: () => [[4, 4, "ink"], [5, 3, "ink"], [6, 4, "ink"], [7, 4, "ink"], [8, 4, "ink"], [9, 4, "ink"], [10, 3, "ink"], [11, 4, "ink"]],
    box: () => {
      const p = [];
      for (let x = 4; x <= 11; x++) for (let y = -4; y <= 1; y++) p.push([x, y, y === -4 ? "boxDark" : "box"]);
      for (let y = -3; y <= 1; y++) p.push([7, y, "boxDark"], [8, y, "boxDark"]);
      return p;
    },
    wave: () => [[16, 4, "body"], [16, 3, "body"], [17, 2, "body"], [17, 1, "light"]],
    camera: () => {
      const p = [];
      for (let x = 17; x <= 23; x++) for (let y = 4; y <= 8; y++) p.push([x, y, "ink"]);
      p.push([18, 3, "ink"], [19, 3, "ink"]);
      for (let x = 19; x <= 21; x++) for (let y = 5; y <= 7; y++) p.push([x, y, "metal"]);
      p.push([20, 6, "screen"], [22, 5, "body"]);
      return p;
    },
    server: () => {
      const p = [];
      for (let x = 18; x <= 23; x++) for (let y = 0; y <= 10; y++) p.push([x, y, (x === 18 || x === 23 || y === 0 || y === 10) ? "ink" : "metalDark"]);
      [3, 6, 9].forEach((y) => { for (let x = 19; x <= 22; x++) p.push([x, y, "ink"]); });
      [1, 4, 7].forEach((y) => p.push([21, y, "body"], [22, y, "light"]));
      return p;
    },
    mask: () => {
      const p = [];
      for (let x = 2; x <= 13; x++) p.push([x, 4, "ink"], [x, 5, "ink"]);
      p.push([0, 3, "ink"], [1, 4, "ink"], [0, 6, "ink"]);
      [[5, 4], [5, 5], [10, 4], [10, 5]].forEach(([x, y]) => p.push([x, y, "screen"]));
      return p;
    },
    laptop: () => {
      const p = [];
      for (let x = 17; x <= 23; x++) for (let y = 4; y <= 8; y++) p.push([x, y, (x === 17 || x === 23 || y === 4 || y === 8) ? "ink" : "screen"]);
      for (let x = 16; x <= 25; x++) p.push([x, 9, "metalDark"], [x, 10, "ink"]);
      return p;
    },
  };

  // Liefert {w, h, ox, oy, px:[[x,y,farbe]]}; eyes: open | closed | happy
  function clawd(opt) {
    const o = opt || {};
    const c = colors();
    const eyes = o.eyes || "open";
    const raw = [];
    MASK.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === "X") raw.push([x, y, y === 2 ? "light" : y >= 8 ? "dark" : "body"]);
      if (ch === "E") {
        if (eyes === "open") raw.push([x, y, "ink"]);
        else if (eyes === "closed") raw.push([x, y, y === 5 ? "ink" : "body"]);
        else if (eyes === "happy") raw.push([x, y, y === 4 ? "ink" : "body"]);
      }
    }));
    if (eyes === "happy") raw.push([4, 5, "ink"], [6, 5, "ink"], [9, 5, "ink"], [11, 5, "ink"]);
    (o.acc || []).forEach((a) => ACC[a]().forEach((p) => raw.push(p)));
    let minX = 0, maxX = 15, minY = 0, maxY = 10;
    raw.forEach(([x, y]) => { minX = Math.min(minX, x); maxX = Math.max(maxX, x); minY = Math.min(minY, y); maxY = Math.max(maxY, y); });
    // Zeilen 0-1 der Maske sind Hut-Platz; leere Kopfzeilen abschneiden
    const usedTop = Math.min(...raw.map((p) => p[1]));
    minY = usedTop;
    return {
      w: maxX - minX + 1, h: maxY - minY + 1, ox: -minX, oy: -minY,
      px: raw.map(([x, y, k]) => [x - minX, y - minY, c[k] || k]),
    };
  }

  function drawSprite(ctx, s, x, y) {
    s.px.forEach(([px, py, col]) => { ctx.fillStyle = col; ctx.fillRect(x + px, y + py, 1, 1); });
  }
  // mx = linke Kante des Körpers, footY = Zeile, auf der die Füße stehen
  function drawAt(ctx, s, mx, footY) { drawSprite(ctx, s, mx - s.ox, footY - 10 - s.oy); }
  /* ---------- Pixel-Schrift für den Schriftzug ---------- */
  const GLYPH = {
    S: [".####", "#....", "#....", ".###.", "....#", "....#", "####."],
    K: ["#...#", "#..#.", "#.#..", "##...", "#.#..", "#..#.", "#...#"],
    A: [".###.", "#...#", "#...#", "#####", "#...#", "#...#", "#...#"],
    I: ["###", ".#.", ".#.", ".#.", ".#.", ".#.", "###"],
    L: ["#....", "#....", "#....", "#....", "#....", "#....", "#####"],
    E: ["#####", "#....", "#....", "####.", "#....", "#....", "#####"],
  };
  function wordCells(word) {
    const cells = [];
    let x = 0;
    const starts = {};
    [...word].forEach((ch, i) => {
      const g = GLYPH[ch];
      starts[i] = x;
      g.forEach((row, y) => [...row].forEach((v, gx) => { if (v === "#") cells.push([x + gx, y]); }));
      x += g[0].length + 1;
    });
    return { cells, w: x - 1, h: 7, starts };
  }

  function paintWord(cv) {
    const word = cv.dataset.word || "SKAILE";
    const big = cv.dataset.fit === "1";
    const cell = big ? 4 : Number(cv.dataset.cell || 1);
    const depth = big ? 2 : 1;
    const { cells, w, h, starts } = wordCells(word);
    const W = w * cell + depth, H = h * cell + depth;
    const c = colors();
    const ctx = cv.getContext("2d");
    cv.width = W; cv.height = H;
    ctx.clearRect(0, 0, W, H);
    const face = c.body;
    const side = c.dark;
    for (let d = depth; d >= 1; d--) {
      ctx.fillStyle = side;
      cells.forEach(([x, y]) => ctx.fillRect(x * cell + d, y * cell + d, cell, cell));
    }
    ctx.fillStyle = face;
    cells.forEach(([x, y]) => ctx.fillRect(x * cell, y * cell, cell, cell));
    if (cell > 1) {
      ctx.fillStyle = c.light; // Lichtkante oben an jeder Zelle
      cells.forEach(([x, y]) => { if (!cells.some(([a, b]) => a === x && b === y - 1)) ctx.fillRect(x * cell, y * cell, cell, 1); });
    }
    // Tamagotchi wohnt im L: steht auf dem Fuß des Buchstabens
    if (cv.dataset.buddy === "1" && word.includes("L")) {
      const lx = starts[word.indexOf("L")] * cell + cell;
      const blink = cv._blink ? "closed" : "open";
      const s = clawd({ eyes: blink });
      drawAt(ctx, s, lx, 6 * cell - 1);
    }
    const px = big ? Math.max(2, Math.floor(cv.parentElement.clientWidth / W)) : Number(cv.dataset.px || 3);
    cv.style.width = W * px + "px";
    cv.style.height = H * px + "px";
  }

  /* ---------- Einzelne Sprites (Angebot, Leistungen) ---------- */
  const SPRITES = {
    welcome: { acc: ["wave"], eyes: "happy" },
    teacher: { acc: ["glasses", "pointer"] },
    builder: { acc: ["hammer"] },
    loop: { acc: ["box"] },
    os: { acc: ["laptop"] },
    content: { acc: ["camera"] },
    hermes: { acc: ["server"] },
    faceless: { acc: ["mask"] },
  };
  function paintSprite(cv, hover) {
    const def = SPRITES[cv.dataset.sprite];
    const s = clawd({ acc: def.acc, eyes: hover ? "happy" : def.eyes });
    const px = Number(cv.dataset.px || 4);
    // gemeinsamer Rahmen, damit alle Sprites auf derselben Bodenlinie stehen
    const W = 28, H = 16;
    cv.width = W; cv.height = H;
    const ctx = cv.getContext("2d");
    ctx.clearRect(0, 0, W, H);
    // mittig, aber so, dass Zubehör links oder rechts nicht abgeschnitten wird
    drawAt(ctx, s, Math.max(s.ox, Math.min(Math.round(W / 2 - 8), W - 1 - (s.w - 1 - s.ox))), H - 1);
    cv.style.width = W * px + "px";
    cv.style.height = H * px + "px";
  }

  /* ---------- Hero: Porträt, gebaut von Claude ---------- */
  function hero() {
    const fig = document.querySelector(".stage");
    const P = window.PORTRAIT;
    if (!fig || !P) return;
    const cv = fig.querySelector(".stage-canvas");
    const ctx = cv.getContext("2d");
    const BW = P.w, BH = P.h;
    const LEFT = 28, TOP = 14, FLOOR = 3;
    const COLS = LEFT + BW + 4, ROWS = TOP + BH + FLOOR;
    const bx = LEFT, by = TOP;
    cv.width = COLS; cv.height = ROWS;

    // Porträt-Pixel und fertiges Bild als Offscreen
    const alpha = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const pix = [];
    const off = document.createElement("canvas");
    off.width = BW; off.height = BH;
    const octx = off.getContext("2d");
    const topRow = new Array(BW).fill(BH);
    P.rows.forEach((row, y) => [...row].forEach((ch, x) => {
      if (ch === ".") return;
      const col = P.pal[alpha.indexOf(ch)];
      octx.fillStyle = col; octx.fillRect(x, y, 1, 1);
      if (y < topRow[x]) topRow[x] = y;
      pix.push({ x, y, col, t: 0 });
    }));
    const rowSpan = P.rows.map((r) => { const a = r.search(/[^.]/), b = r.length - 1 - [...r].reverse().join("").search(/[^.]/); return [a, b]; });

    // Zeitplan: von unten nach oben, mit etwas Zufall pro Pixel
    const BUILD = 1250, JITTER = 220, GLOW = 120;
    let seed = 7;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    const rowStart = (y) => ((BH - 1 - y) / (BH - 1)) * BUILD;
    pix.forEach((p) => { p.t = rowStart(p.y) + rnd() * JITTER; });
    const byRow = Array.from({ length: BH }, () => []);
    pix.forEach((p) => byRow[p.y].push(p));

    // Ruheplatz des Bauers: auf der rechten Schulter
    // Ruheplatz auf der rechten Schulter: steht gerade, leicht versetzt, alle Beine reichen bis auf den Stoff
    const lumHex = (h) => 0.299 * parseInt(h.slice(1, 3), 16) + 0.587 * parseInt(h.slice(3, 5), 16) + 0.114 * parseInt(h.slice(5, 7), 16);
    const isShirt = (x, y) => { const ch = (P.rows[y] || "")[x]; return !ch || ch === "." || lumHex(P.pal[alpha.indexOf(ch)]) < 60; };
    const LEGS = [3, 6, 9, 12];
    let restX = BW - 17, restFoot = BH - 12, best = 1e9;
    for (let x = Math.round(BW * 0.55); x <= BW - 16; x++) {
      const tops = LEGS.map((d) => topRow[x + d]);
      if (tops.some((v) => v >= BH)) continue;
      const sink = Math.max(...tops) - Math.min(...tops);
      const foot = Math.max(...tops) - 1 - Math.min(2, Math.floor(sink / 2));   // etwas eingesunken, kurze versetzte Beine
      let hitsFace = false;
      for (let yy = Math.max(0, foot - 9); yy <= foot && !hitsFace; yy++) {
        for (let xx = x; xx < x + 16; xx++) if (!isShirt(xx, yy)) { hitsFace = true; break; }
      }
      if (hitsFace) continue;
      const score = sink * 2 + Math.abs(x - BW * 0.72) * 0.25;
      if (score < best) { best = score; restX = x; restFoot = foot; }
    }
    const legReach = LEGS.map((d) => Math.max(0, topRow[restX + d] - 1 - restFoot));
    // Laptop-Claude steht auf Höhe der alten Unterkante, dort wo der Pixel-Auslauf beginnt
    const solidBH = BH - (P.fade || 0);
    const helperX = 2, helperFoot = TOP + solidBH - 1;

    let blinkA = false, blinkB = false;
    const c = colors();
    // Desktop: Porträt groß, Körper endet auf der Linie zur Academy, der Auslauf fällt in die nächste Sektion
    const desk = window.matchMedia("(min-width: 901px)");
    const SHOULDER = Math.min(...P.rows.map((r) => r.search(/[^.]/)).filter((i) => i >= 0));

    let onLine = false;   // Desktop: Körper endet genau auf der Linie zur nächsten Sektion
    function floor() {
      if (onLine) return;   // dann steht der Laptop-Claude auf dieser Linie
      ctx.fillStyle = cssVar("--line-strong");
      for (let x = 0; x < bx - 3; x += 3) ctx.fillRect(x, helperFoot + 1, 2, 1);
    }

    function frame(t) {
      ctx.clearRect(0, 0, COLS, ROWS);
      floor();
      // Helfer am Laptop, tippt während des Baus
      const typing = t < BUILD + JITTER;
      drawAt(ctx, clawd({ acc: ["laptop"], eyes: typing ? "happy" : blinkA ? "closed" : "open" }), helperX, helperFoot);
      if (typing) { ctx.fillStyle = c.body; ctx.fillRect(helperX + 19, helperFoot - 4, 1 + (Math.floor(t / 70) % 3), 1); }

      {
        if (t >= BUILD + JITTER + GLOW) {
          ctx.drawImage(off, bx, by);
        } else {
          // fertige Zeilen am Stück, aktive Zeilen pixelweise
          let done = BH;
          while (done > 0 && rowStart(done - 1) + JITTER + GLOW < t) done--;
          if (done < BH) ctx.drawImage(off, 0, done, BW, BH - done, bx, by + done, BW, BH - done);
          for (let y = done - 1; y >= 0 && rowStart(y) <= t; y--) {
            byRow[y].forEach((p) => {
              if (p.t > t) return;
              ctx.fillStyle = t - p.t < GLOW ? c.body : p.col;
              ctx.fillRect(bx + p.x, by + p.y, 1, 1);
            });
          }
        }
      }

      // Bauer: reitet auf der Baukante, hüpft am Ende auf die Schulter
      let eyes = blinkB ? "closed" : "open";
      const acc = ["hammer"];
      const front = Math.max(0, Math.min(BH - 1, Math.round(BH - 1 - (t / BUILD) * (BH - 1))));
      if (t < BUILD + 80) {
        const [a, b] = rowSpan[front][0] >= 0 ? rowSpan[front] : [0, BW - 1];
        const mid = (a + b) / 2, half = Math.max(0, (b - a) / 2 - 9);
        drawAt(ctx, clawd({ acc, eyes: "happy" }), bx + Math.round(mid - 8 + Math.sin(t / 150) * half), by + front - 1);
      } else {
        const k = Math.min(1, (t - BUILD - 80) / 520);
        const [a, b] = rowSpan[0][0] >= 0 ? rowSpan[0] : [0, BW - 1];
        const x0 = bx + Math.round((a + b) / 2 - 8), y0 = by + Math.min(...topRow) - 1;
        const x1 = bx + restX, y1 = by + restFoot;
        if (k < 1) eyes = "happy";
        const sx = Math.round(x0 + (x1 - x0) * k), sy = Math.round(y0 + (y1 - y0) * k - Math.sin(k * Math.PI) * 18);
        drawAt(ctx, clawd({ acc, eyes }), sx, sy);
        if (k >= 1) {
          ctx.fillStyle = c.dark;
          LEGS.forEach((d, i) => { if (legReach[i] > 0) ctx.fillRect(sx + d, sy + 1, 1, legReach[i]); });
        }
      }
    }

    const grid = fig.parentElement, bar = fig.querySelector(".stage-bar");
    function size(px) {
      cv.style.width = COLS * px + "px";
      cv.style.height = ROWS * px + "px";
      fig.querySelector(".stage-box").style.width = COLS * px + "px";
    }
    function layout() {
      const hero = grid.closest(".hero"), next = hero.nextElementSibling;
      if (next) next.style.paddingTop = "";
      onLine = false;
      if (!desk.matches) {
        fig.style.left = fig.style.top = bar.style.right = bar.style.top = grid.style.minHeight = "";
        const avail = fig.clientWidth;
        // ganzzahlig, solange es passt; auf schmalen Schirmen stufenlos (hohe Pixeldichte hält es scharf)
        let px = Math.floor(avail / COLS);
        if (px < 2) px = avail / COLS;
        size(px);
        return;
      }
      // so groß, dass die Schultern neben den Text passen und der Körper ganz im ersten Bildschirm steht;
      // halbe Stufen nur bei hoher Pixeldichte
      const dpr = window.devicePixelRatio || 1;
      const gr = grid.getBoundingClientRect(), y0 = gr.top + window.scrollY;
      const gut = parseFloat(getComputedStyle(grid).paddingRight) || 24;
      const parts = [".hero-head", ".hero-body"].map((s) => grid.querySelector(s).getBoundingClientRect());
      const A = Math.max(...parts.map((r) => r.right)) + 24;     // ab hier dürfen die Schultern anfangen
      const B = document.documentElement.clientWidth - gut;       // weiter rechts nicht
      const reach = COLS - LEFT - SHOULDER;
      let px = Math.min((B - A) / reach, (window.innerHeight - 24 - y0) / solidBH, 6);
      px = Math.max(2, Math.floor(px * dpr) / dpr);
      size(px);
      // Haare auf Höhe der Überschrift. Ist der Text kürzer als der Körper, endet der Körper genau
      // auf der Linie zur nächsten Sektion, sonst steht er auf seinem eigenen Boden
      const pb = parseFloat(getComputedStyle(hero).paddingBottom) || 0;
      const textBottom = Math.max(...parts.map((r) => r.bottom)) + window.scrollY;
      const bodyBottom = y0 + solidBH * px;
      onLine = bodyBottom >= textBottom + pb;
      grid.style.minHeight = onLine ? bodyBottom - pb - y0 + "px" : "";
      const right = Math.min(B, Math.max(A + reach * px, gr.right - gut + 96));   // gern etwas über den Inhaltsrand hinaus
      fig.style.left = right - COLS * px - gr.left + "px";
      fig.style.top = bodyBottom - (TOP + solidBH) * px - y0 + "px";
      // der Pixel-Auslauf fällt in die nächste Sektion, deren Inhalt bleibt frei
      const over = ((P.fade || 0) + FLOOR) * px;
      const heroBottom = Math.max(bodyBottom, textBottom + pb), spill = bodyBottom + over + 40 - heroBottom;
      if (next && parseFloat(getComputedStyle(next).paddingTop) < spill + 48) next.style.paddingTop = spill + 48 + "px";
      // Bildunterschrift unter dem Auslauf, rechtsbündig mit dem Porträt
      bar.style.right = (COLS - LEFT - BW) * px + "px";
      bar.style.top = "calc(100% + 12px)";
    }
    layout();
    window.addEventListener("resize", () => { layout(); if (finished) frame(1e9); }, { passive: true });

    const END = BUILD + 80 + 520;
    let finished = reduce;
    if (reduce) frame(1e9);
    else {
      const t0 = performance.now();
      const tick = (now) => {
        const t = now - t0;
        frame(t);
        if (t < END + 50) requestAnimationFrame(tick);
        else { finished = true; frame(1e9); }
      };
      // erst bauen, wenn die Bühne sichtbar ist
      const io = new IntersectionObserver((es) => {
        if (es.some((e) => e.isIntersecting)) { io.disconnect(); requestAnimationFrame(tick); }
      }, { threshold: 0.25 });
      io.observe(cv);
      // Ruhe: ab und zu blinzeln
      setInterval(() => {
        if (!finished || document.hidden) return;
        blinkB = true; frame(1e9);
        setTimeout(() => { blinkB = false; frame(1e9); }, 140);
      }, 4700);
      setInterval(() => {
        if (!finished || document.hidden) return;
        blinkA = true; frame(1e9);
        setTimeout(() => { blinkA = false; frame(1e9); }, 140);
      }, 6100);
    }

  }

  /* ---------- Lektionspixel: drucken, sobald sichtbar ---------- */
  function lessons() {
    document.querySelectorAll(".ph-px[data-n]").forEach((el, p) => {
      const n = Number(el.dataset.n);
      for (let i = 0; i < n; i++) {
        const sq = document.createElement("i");
        sq.style.setProperty("--k", i + p * 3);
        el.appendChild(sq);
      }
    });
    const box = document.querySelector(".path");
    if (!box) return;
    if (reduce || !("IntersectionObserver" in window)) { box.classList.add("is-on"); return; }
    const io = new IntersectionObserver((es) => {
      if (es.some((e) => e.isIntersecting)) { box.classList.add("is-on"); io.disconnect(); }
    }, { threshold: 0.2 });
    io.observe(box);
  }

  /* ---------- Academy: jedes Kästchen ein Mitglied, das orange ist der freie Platz ---------- */
  function crowd() {
    const cv = document.querySelector(".crowd-grid");
    if (!cv) return;
    const n = Number(cv.dataset.n);
    const ctx = cv.getContext("2d");
    let cols = 1, s = 9, g = 3, shown = reduce ? n : 0, seat = true;
    // Reihenfolge, in der die Kästchen erscheinen: grob von links nach rechts, mit Zufall
    let seed = 11;
    const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
    let order = [];
    function layout() {
      const w = cv.parentElement.clientWidth;
      s = w < 600 ? 6 : 9; g = w < 600 ? 2 : 3;
      cols = Math.max(10, Math.floor((w + g) / (s + g)));
      const rows = Math.ceil((n + 1) / cols);
      const W = cols * (s + g) - g, H = rows * (s + g) - g, dpr = window.devicePixelRatio || 1;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr);
      cv.style.width = W + "px"; cv.style.height = H + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed = 11;
      order = Array.from({ length: n }, (_, i) => ({ i, k: (i % cols) / cols + rnd() * 0.35 })).sort((a, b) => a.k - b.k).map((o) => o.i);
      draw();
    }
    function cell(i) { return [(i % cols) * (s + g), Math.floor(i / cols) * (s + g)]; }
    function draw() {
      ctx.clearRect(0, 0, cv.width, cv.height);
      ctx.fillStyle = cssVar("--ink");
      for (let k = 0; k < shown; k++) { const [x, y] = cell(order[k]); ctx.fillRect(x, y, s, s); }
      if (shown >= n && seat) { const [x, y] = cell(n); ctx.fillStyle = cssVar("--accent"); ctx.fillRect(x, y, s, s); }
    }
    layout();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(layout, 120); }, { passive: true });
    if (reduce || !("IntersectionObserver" in window)) { shown = n; draw(); return; }
    const io = new IntersectionObserver((es) => {
      if (!es.some((e) => e.isIntersecting)) return;
      io.disconnect();
      const t0 = performance.now(), DUR = 1600;
      const tick = (now) => {
        const u = Math.min(1, (now - t0) / DUR);
        shown = Math.round(n * (1 - Math.pow(1 - u, 2)));
        draw();
        if (u < 1) requestAnimationFrame(tick);
        else setInterval(() => {   // der freie Platz blinkt kurz, wie ein Cursor
          if (document.hidden) return;
          seat = false; draw();
          setTimeout(() => { seat = true; draw(); }, 380);
        }, 1500);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    io.observe(cv);
  }

  function init() {
    hero();
    crowd();
    document.querySelectorAll(".px-word").forEach(paintWord);
    document.querySelectorAll(".px-sprite").forEach((cv) => {
      paintSprite(cv, false);
      const host = cv.closest("li, .offer-side") || cv;
      host.addEventListener("mouseenter", () => paintSprite(cv, true));
      host.addEventListener("mouseleave", () => paintSprite(cv, false));
    });
    lessons();
    let rt;
    window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => document.querySelectorAll(".px-word-big").forEach(paintWord), 120); }, { passive: true });
    // Footer-Tamagotchi blinzelt selten
    if (!reduce) setInterval(() => {
      document.querySelectorAll(".px-word-big").forEach((cv) => {
        cv._blink = true; paintWord(cv);
        setTimeout(() => { cv._blink = false; paintWord(cv); }, 140);
      });
    }, 5300);
  }

  if (document.fonts && document.fonts.ready) document.fonts.ready.then(init); else window.addEventListener("load", init);
})();
