/* Fotoğrafı henüz olmayan ilanlar için oda sayısından şematik kat planı çizer. */
(function () {
  function seedFrom(str) {
    let h = 0;
    for (const c of String(str)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
    return h;
  }

  function roomCount(oda) {
    const n = parseInt(String(oda).split("+")[0], 10);
    return isNaN(n) ? 2 : Math.max(1, Math.min(n, 5));
  }

  window.drawPlan = function (listing, opts) {
    opts = opts || {};
    const W = 400, H = 300, P = 26;
    const s = seedFrom(listing.no);
    const flip = s % 2 === 1;
    const n = roomCount(listing.oda);
    const iw = W - P * 2, ih = H - P * 2;
    const leftW = Math.round(iw * (0.5 + (s % 7) / 70));
    const salonH = Math.round(ih * (0.6 + (s % 5) / 50));
    const rooms = [];

    // sol kolon: salon + mutfak
    rooms.push({ x: 0, y: 0, w: leftW, h: salonH, ad: "Salon" });
    rooms.push({ x: 0, y: salonH, w: Math.round(leftW * 0.62), h: ih - salonH, ad: "Mutfak" });
    rooms.push({ x: Math.round(leftW * 0.62), y: salonH, w: leftW - Math.round(leftW * 0.62), h: ih - salonH, ad: "Antre" });

    // sağ kolon: yatak odaları + banyo
    const rw = iw - leftW;
    const bathH = Math.round(ih * 0.22);
    const bedH = (ih - bathH) / n;
    for (let i = 0; i < n; i++) {
      rooms.push({ x: leftW, y: Math.round(i * bedH), w: rw, h: Math.round(bedH), ad: n === 1 ? "Yatak odası" : "Oda " + (i + 1) });
    }
    rooms.push({ x: leftW, y: ih - bathH, w: Math.round(rw * 0.55), h: bathH, ad: "Banyo" });
    rooms.push({ x: leftW + Math.round(rw * 0.55), y: ih - bathH, w: rw - Math.round(rw * 0.55), h: bathH, ad: "WC" });

    const X = (r) => (flip ? P + iw - r.x - r.w : P + r.x);
    const ink = opts.ink || "currentColor";
    let g = "";

    // balkon (kesikli)
    const bx = flip ? P + iw - leftW * 0.6 : P;
    g += `<rect x="${bx}" y="${P - 18}" width="${leftW * 0.6}" height="18" fill="none" stroke="${ink}" stroke-width="1" stroke-dasharray="3 3"/>`;
    g += `<text x="${bx + 6}" y="${P - 6}" class="pl-lbl pl-sm pl-bal">Balkon</text>`;

    rooms.forEach((r) => {
      const x = X(r), y = P + r.y;
      g += `<rect x="${x}" y="${y}" width="${r.w}" height="${r.h}" fill="none" stroke="${ink}" stroke-width="2"/>`;
      if (r.w > 44 && r.h > 26) {
        g += `<text x="${x + 8}" y="${y + 17}" class="pl-lbl">${r.ad}</text>`;
      }
      // kapı yayı
      if (r.ad !== "Salon" && r.h > 34) {
        const dx = flip ? x + r.w : x;
        const dir = flip ? -1 : 1;
        const dy = y + r.h - 6;
        g += `<path d="M${dx} ${dy} l${dir * 18} 0 A18 18 0 0 ${flip ? 1 : 0} ${dx} ${dy - 18}" fill="none" stroke="${ink}" stroke-width="0.8" opacity=".7"/>`;
      }
    });

    // dış duvar
    g += `<rect x="${P}" y="${P}" width="${iw}" height="${ih}" fill="none" stroke="${ink}" stroke-width="4"/>`;
    // ölçü çizgisi
    g += `<line x1="${P}" y1="${H - 8}" x2="${P + iw}" y2="${H - 8}" stroke="${ink}" stroke-width=".8"/>`;
    g += `<line x1="${P}" y1="${H - 12}" x2="${P}" y2="${H - 4}" stroke="${ink}" stroke-width=".8"/>`;
    g += `<line x1="${P + iw}" y1="${H - 12}" x2="${P + iw}" y2="${H - 4}" stroke="${ink}" stroke-width=".8"/>`;
    g += `<text x="${W / 2}" y="${H - 11}" text-anchor="middle" class="pl-lbl pl-sm" style="paint-order:stroke" stroke="var(--plan-bg, #fff)" stroke-width="6">${listing.m2} m²</text>`;

    return `<svg viewBox="0 0 ${W} ${H}" class="plan" role="img" aria-label="${listing.oda}, ${listing.m2} m² şematik kat planı">${g}</svg>`;
  };
})();
