(function () {
  const S = window.SITE || {};
  const $ = (q, el) => (el || document).querySelector(q);
  const $$ = (q, el) => Array.from((el || document).querySelectorAll(q));
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const tl = (n) => new Intl.NumberFormat("tr-TR").format(Math.round(n));
  const waLink = (msg) => "https://wa.me/" + S.whatsapp + (msg ? "?text=" + encodeURIComponent(msg) : "");
  const esc = (s) => String(s == null ? "" : s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* ---------- iletişim bilgileri ---------- */
  $$("[data-need]").forEach((el) => { if (!S[el.dataset.need]) el.remove(); });
  $$("[data-cfg]").forEach((el) => { el.textContent = S[el.dataset.cfg] || ""; });
  $$("[data-wa]").forEach((el) => { el.href = waLink(el.dataset.waMsg || "Merhaba Atakan Bey, "); el.target = "_blank"; el.rel = "noopener"; });
  $$("[data-tel]").forEach((el) => { el.href = "tel:+" + S.whatsapp; });
  $$("[data-ig]").forEach((el) => { el.href = "https://www.instagram.com/" + S.instagram + "/"; if (!el.textContent) el.textContent = "Instagram: @" + S.instagram; });
  $$("[data-mail]").forEach((el) => { el.href = "mailto:" + S.eposta; });
  const yil = $("#yil"); if (yil) yil.textContent = new Date().getFullYear();

  /* ---------- hero: apartman cephesi ---------- */
  const fac = $("#facade");
  if (fac) {
    const floors = 6, bays = 4, fw = 300, x0 = 60, top = 40, fh = 62, groundH = 90;
    const bottom = top + floors * fh;
    let g = "";
    g += `<rect x="${x0 - 8}" y="${top - 14}" width="${fw + 16}" height="14" class="f-line"/>`; // saçak
    g += `<rect x="${x0}" y="${top}" width="${fw}" height="${floors * fh + groundH}" class="f-wall"/>`;
    const bw = fw / bays;
    const lit = [];
    for (let f = 0; f < floors; f++) {
      const y = top + f * fh;
      g += `<line x1="${x0}" y1="${y + fh}" x2="${x0 + fw}" y2="${y + fh}" class="f-thin"/>`;
      for (let b = 0; b < bays; b++) {
        const x = x0 + b * bw;
        const balcony = b === 1 || b === 2;
        const wx = x + 14, wy = y + 12, ww = bw - 28, wh = balcony ? fh - 18 : fh - 30;
        const id = `w${f}${b}`;
        g += `<rect id="${id}" x="${wx}" y="${wy}" width="${ww}" height="${wh}" class="f-win"/>`;
        g += `<line x1="${wx + ww / 2}" y1="${wy}" x2="${wx + ww / 2}" y2="${wy + wh}" class="f-thin"/>`;
        if (balcony) {
          g += `<rect x="${x + 6}" y="${y + fh - 20}" width="${bw - 12}" height="16" class="f-balc"/>`;
          for (let k = 1; k < 7; k++) g += `<line x1="${x + 6 + k * (bw - 12) / 7}" y1="${y + fh - 20}" x2="${x + 6 + k * (bw - 12) / 7}" y2="${y + fh - 4}" class="f-thin"/>`;
        } else {
          g += `<line x1="${wx - 3}" y1="${wy + wh + 2}" x2="${wx + ww + 3}" y2="${wy + wh + 2}" class="f-line-s"/>`;
        }
        lit.push(id);
      }
    }
    // zemin kat: dükkânlar ve giriş
    const gy = bottom;
    g += `<rect x="${x0 + 10}" y="${gy + 18}" width="${bw * 1.5 - 14}" height="${groundH - 18}" class="f-shop"/>`;
    for (let k = 1; k < 9; k++) g += `<line x1="${x0 + 10}" y1="${gy + 18 + k * 8}" x2="${x0 + bw * 1.5 - 4}" y2="${gy + 18 + k * 8}" class="f-thin"/>`;
    g += `<rect x="${x0 + bw * 2.5 + 4}" y="${gy + 18}" width="${bw * 1.5 - 14}" height="${groundH - 18}" class="f-shop f-shop--glass"/>`;
    const dx = x0 + bw * 1.5 + 14, dw = bw - 28;
    g += `<rect x="${dx}" y="${gy + 22}" width="${dw}" height="${groundH - 22}" class="f-door"/>`;
    g += `<line x1="${dx + dw / 2}" y1="${gy + 22}" x2="${dx + dw / 2}" y2="${gy + groundH}" class="f-thin"/>`;
    // kapı numarası
    g += `<g class="f-no"><rect x="${dx + dw + 6}" y="${gy + 26}" width="26" height="20" rx="3"/><rect x="${dx + dw + 8}" y="${gy + 28}" width="22" height="16" rx="2" class="in"/><text x="${dx + dw + 19}" y="${gy + 40}" text-anchor="middle">24</text></g>`;
    g += `<line x1="0" y1="${gy + groundH}" x2="420" y2="${gy + groundH}" class="f-line"/>`;
    // sokak tabelası
    g += `<g class="f-sign"><line x1="372" y1="${gy - 40}" x2="372" y2="${gy + groundH}" class="f-pole"/>
      <rect x="310" y="${gy - 74}" width="116" height="40" rx="5" class="s-out"/>
      <rect x="314" y="${gy - 70}" width="108" height="32" rx="3" class="s-in"/>
      <text x="368" y="${gy - 59}" text-anchor="middle" class="s-sm">Bahçelievler</text>
      <text x="368" y="${gy - 45}" text-anchor="middle" class="s-big">Atakan Öztürk</text></g>`;
    fac.innerHTML = g;

    // pencerelerde ışık yanar
    const chosen = lit.filter((_, i) => (i * 7) % 11 < 5);
    if (reduce) chosen.forEach((id) => $("#" + id).classList.add("on"));
    else chosen.sort(() => Math.random() - 0.5).forEach((id, i) => setTimeout(() => $("#" + id).classList.add("on"), 500 + i * 140));
  }

  /* ---------- ilan yardımcıları ---------- */
  const fiyatYaz = (l) => tl(l.fiyat) + " ₺" + (l.durum === "kiralik" ? " / ay" : "");
  const durumYaz = (l) => (l.durum === "kiralik" ? "Kiralık" : "Satılık");
  const kapak = (l) => l.fotograflar && l.fotograflar.length
    ? `<img src="${esc(l.fotograflar[0])}" alt="${esc(l.baslik)}" loading="lazy">`
    : window.drawPlan(l);

  function getJSON(u) { return fetch(u).then((r) => { if (!r.ok) throw new Error(u); return r.json(); }); }

  /* ---------- portföy ---------- */
  const rail = $("#rail");
  if (rail) {
    getJSON("data/listings.json").then((list) => {
      rail.innerHTML = list.map((l) => `
        <a class="card" href="ilan.html?no=${encodeURIComponent(l.no)}" data-durum="${esc(l.durum)}">
          <div class="card__vis">
            <span class="doorno" aria-label="İlan numarası ${esc(l.no)}"><small>No</small>${esc(l.no)}</span>
            <span class="tag tag--${esc(l.durum)}">${durumYaz(l)}</span>
            ${kapak(l)}
          </div>
          <div class="card__body">
            <p class="card__mah">${esc(l.mahalle)}</p>
            <h3 class="card__title">${esc(l.baslik)}</h3>
            <p class="card__spec"><span>${esc(l.oda)}</span><span>${esc(l.m2)} m²</span><span>${esc(l.kat)}</span></p>
            <p class="card__price">${fiyatYaz(l)}</p>
            ${l.ornek ? '<span class="ornek">Örnek ilan</span>' : ""}
          </div>
        </a>`).join("");
    }).catch(() => { rail.innerHTML = '<p class="small">İlanlar yüklenemedi. Sayfayı yenileyin ya da WhatsApp\'tan yazın.</p>'; });

    $$(".filter button").forEach((b) => b.addEventListener("click", () => {
      $$(".filter button").forEach((x) => x.setAttribute("aria-pressed", x === b));
      const f = b.dataset.f;
      $$(".card", rail).forEach((c) => { c.hidden = f !== "hepsi" && c.dataset.durum !== f; });
      rail.scrollTo({ left: 0, behavior: reduce ? "auto" : "smooth" });
    }));
    $$(".rail-btn").forEach((b) => b.addEventListener("click", () => {
      rail.scrollBy({ left: Number(b.dataset.dir) * rail.clientWidth * 0.8, behavior: reduce ? "auto" : "smooth" });
    }));
  }

  /* ---------- mahalle haritası ---------- */
  const SHAPES = {
    yenibosna:   [[20, 30], [200, 36], [196, 150], [24, 146]],
    zafer:       [[200, 36], [322, 30], [326, 152], [196, 150]],
    kocasinan:   [[322, 30], [472, 38], [468, 148], [326, 152]],
    soganli:     [[472, 38], [618, 28], [622, 156], [468, 148]],
    cobancesme:  [[24, 146], [196, 150], [174, 272], [20, 268]],
    sirinevler:  [[196, 150], [326, 152], [316, 276], [174, 272]],
    hurriyet:    [[326, 152], [468, 148], [454, 270], [316, 276]],
    fevzicakmak: [[468, 148], [622, 156], [620, 266], [454, 270]],
    cumhuriyet:  [[20, 268], [174, 272], [232, 270], [228, 392], [22, 396]],
    bahcelievler:[[232, 270], [316, 276], [454, 270], [438, 398], [228, 392]],
    siyavuspasa: [[454, 270], [620, 266], [616, 392], [438, 398]]
  };
  const map = $("#map");
  if (map) {
    getJSON("data/mahalleler.json").then((mh) => {
      const areas = $("#map-areas"), labels = $("#map-labels"), panel = $("#panel");
      const sel = $("#v-mahalle");
      mh.forEach((m) => {
        if (sel) sel.insertAdjacentHTML("beforeend", `<option>${esc(m.ad)}</option>`);
        $("#chips").insertAdjacentHTML("beforeend", `<button type="button" data-id="${m.id}" aria-pressed="false">${esc(m.ad)}</button>`);
        const pts = SHAPES[m.id]; if (!pts) return;
        const cx = pts.reduce((a, p) => a + p[0], 0) / pts.length;
        const cy = pts.reduce((a, p) => a + p[1], 0) / pts.length;
        areas.insertAdjacentHTML("beforeend", `<polygon points="${pts.map((p) => p.join(",")).join(" ")}" data-id="${m.id}" class="area"/>`);
        const words = m.ad.split(" ");
        labels.insertAdjacentHTML("beforeend", `<g class="lbl" data-id="${m.id}" tabindex="0" role="button" aria-label="${esc(m.ad)}">
          <rect x="${cx - 66}" y="${cy - 36}" width="132" height="72" fill="transparent"/>
          ${words.map((w, i) => `<text x="${cx}" y="${cy + 5 + (i - (words.length - 1) / 2) * 16}" text-anchor="middle">${esc(w)}</text>`).join("")}</g>`);
      });

      function show(id) {
        const m = mh.find((x) => x.id === id); if (!m) return;
        $$(".area", map).forEach((a) => a.classList.toggle("is-on", a.dataset.id === id));
        $$(".lbl", map).forEach((a) => a.classList.toggle("is-on", a.dataset.id === id));
        $$("#chips button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.id === id));
        const row = (t, v) => v ? `<div><dt>${t}</dt><dd>${esc(v)}</dd></div>` : "";
        const any = m.kimlere || m.ulasim || m.not || m.m2Fiyat;
        panel.innerHTML = `
          <div class="plate plate--panel"><span class="plate__small">Bahçelievler</span><span class="plate__big">${esc(m.ad)} Mah.</span></div>
          ${any ? `<dl class="panel__dl">${row("Kimlere uygun", m.kimlere)}${row("Ulaşım", m.ulasim)}${row("Benim notum", m.not)}${row("Ortalama m² fiyatı", m.m2Fiyat)}</dl>`
                : `<p>${esc(m.ad)} için notlarımı yakında ekliyorum. O zamana kadar sorunuz varsa doğrudan sorun; bildiğimi anlatırım.</p>`}
          <a class="btn btn--line" target="_blank" rel="noopener" href="${waLink("Merhaba Atakan Bey, " + m.ad + " Mahallesi hakkında bilgi almak istiyorum.")}">${esc(m.ad)} hakkında sor</a>`;
      }
      $("#chips").addEventListener("click", (e) => { const t = e.target.closest("[data-id]"); if (t) { show(t.dataset.id); if (matchMedia("(max-width: 640px)").matches) panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" }); } });
      map.addEventListener("click", (e) => { const t = e.target.closest("[data-id]"); if (t) show(t.dataset.id); });
      map.addEventListener("keydown", (e) => { if ((e.key === "Enter" || e.key === " ") && e.target.dataset.id) { e.preventDefault(); show(e.target.dataset.id); } });
      $$(".lbl", map).forEach((l) => {
        l.addEventListener("mouseenter", () => $(`.area[data-id="${l.dataset.id}"]`, map).classList.add("is-hover"));
        l.addEventListener("mouseleave", () => $(`.area[data-id="${l.dataset.id}"]`, map).classList.remove("is-hover"));
      });
    });
  }

  /* ---------- kredi hesabı ---------- */
  const kt = $("#k-tutar");
  if (kt) {
    const num = (v) => parseFloat(String(v).replace(/\./g, "").replace(",", ".")) || 0;
    function calc() {
      const P = num(kt.value), n = Number($("#k-vade").value), r = num($("#k-faiz").value) / 100;
      if (!P || !n) { $("#k-taksit").textContent = "—"; $("#k-toplam").textContent = "—"; return; }
      const m = r === 0 ? P / n : (P * r) / (1 - Math.pow(1 + r, -n));
      $("#k-taksit").textContent = tl(m) + " ₺";
      $("#k-toplam").textContent = tl(m * n) + " ₺";
    }
    kt.addEventListener("input", () => {
      const digits = kt.value.replace(/\D/g, "");
      kt.value = digits ? tl(Number(digits)) : "";
      calc();
    });
    ["#k-vade", "#k-faiz"].forEach((q) => $(q).addEventListener("input", calc));
    calc();
  }

  /* ---------- yorumlar ---------- */
  const qs = $("#quotes");
  if (qs) {
    getJSON("data/yorumlar.json").then((y) => {
      if (!y.length) return;
      qs.innerHTML = y.map((q) => `<figure class="quote"><blockquote>${esc(q.metin)}</blockquote><figcaption>${esc(q.kisi)}${q.mahalle ? ", " + esc(q.mahalle) : ""}</figcaption></figure>`).join("");
      $("#yorumlar").hidden = false;
    }).catch(() => {});
  }

  /* ---------- ilan detay sayfası ---------- */
  const det = $("#ilan");
  if (det) {
    const no = new URLSearchParams(location.search).get("no");
    getJSON("data/listings.json").then((list) => {
      const l = list.find((x) => x.no === no);
      if (!l) {
        det.innerHTML = `<div class="notfound"><h1>Bu ilan artık yayında değil.</h1><p>Satılmış ya da kiralanmış olabilir. <a href="./#portfoy">Güncel ilanlara dönün</a> ya da benzerini sorun.</p></div>`;
        return;
      }
      const title = `${l.mahalle} ${durumYaz(l).toLowerCase()} ${l.oda}, ${l.m2} m² | Atakan Öztürk`;
      document.title = title;
      const md = $('meta[name="description"]'); if (md) md.content = `${l.baslik}. ${l.mahalle}, Bahçelievler. ${fiyatYaz(l)}.`;
      const msg = `Merhaba Atakan Bey, ${l.no} numaralı ilan (${l.mahalle}, ${l.oda}, ${l.m2} m²) hakkında bilgi almak istiyorum.`;
      const fotos = l.fotograflar || [];
      const rows = [
        ["Fiyat", fiyatYaz(l)], ["Oda", l.oda], ["Brüt alan", l.m2 + " m²"], ["Kat", l.kat],
        ["Bina yaşı", l.binaYasi != null ? l.binaYasi : ""], ["Aidat", l.aidat ? tl(l.aidat) + " ₺" : ""],
        ["Isınma", l.isinma], ["Eşya", l.durum === "kiralik" ? (l.esyali ? "Eşyalı" : "Eşyasız") : ""], ["Tapu", l.tapu]
      ].filter((r) => r[1] !== "" && r[1] != null);

      det.innerHTML = `
        <nav class="crumb"><a href="./#portfoy">Portföy</a> <span>/</span> ${esc(l.mahalle)}</nav>
        <div class="ilan__grid">
          <aside class="ilan__side">
            <span class="doorno doorno--lg"><small>No</small>${esc(l.no)}</span>
            <p class="card__mah">${esc(l.mahalle)}, Bahçelievler</p>
            <h1 class="ilan__title">${esc(l.baslik)}</h1>
            ${l.ornek ? '<p class="ornek">Örnek ilan</p>' : ""}
            <dl class="facts">${rows.map((r) => `<div><dt>${r[0]}</dt><dd>${esc(r[1])}</dd></div>`).join("")}</dl>
            <a class="btn btn--wa btn--block" target="_blank" rel="noopener" href="${waLink(msg)}">Bu ev için WhatsApp'tan yaz</a>
            <a class="btn btn--line btn--block" href="tel:+${S.whatsapp}">Ara: ${esc(S.telefon)}</a>
          </aside>
          <div class="ilan__main">
            <div class="gallery">
              ${fotos.length
                ? fotos.map((f, i) => `<button type="button" class="g-item${i === 0 ? " g-item--first" : ""}" data-i="${i}"><img src="${esc(f)}" alt="${esc(l.baslik)}, fotoğraf ${i + 1}" ${i ? 'loading="lazy"' : ""}></button>`).join("")
                : `<div class="g-plan">${window.drawPlan(l)}<p class="small">Şematik plan. Fotoğraflar yakında eklenecek.</p></div>`}
            </div>
            <div class="ilan__desc">
              <h2>Ev hakkında</h2>
              <p>${esc(l.aciklama)}</p>
            </div>
            ${fotos.length ? `<div class="ilan__plan"><h2>Kat planı</h2>${window.drawPlan(l)}</div>` : ""}
            <div class="ilan__map">
              <h2>Konum</h2>
              <iframe title="${esc(l.mahalle)} haritası" loading="lazy" src="https://www.google.com/maps?q=${encodeURIComponent(l.mahalle + " Mahallesi, Bahçelievler, İstanbul")}&output=embed"></iframe>
              <p class="small">Mahalle konumu gösterilir. Açık adres gösterimde paylaşılır.</p>
            </div>
          </div>
        </div>`;

      // yapısal veri
      const ld = document.createElement("script");
      ld.type = "application/ld+json";
      ld.textContent = JSON.stringify({
        "@context": "https://schema.org", "@type": "Offer",
        name: l.baslik, price: l.fiyat, priceCurrency: "TRY",
        businessFunction: l.durum === "kiralik" ? "http://purl.org/goodrelations/v1#LeaseOut" : "http://purl.org/goodrelations/v1#Sell",
        seller: { "@type": "RealEstateAgent", name: "Atakan Öztürk", telephone: "+" + S.whatsapp },
        itemOffered: {
          "@type": "Apartment", name: l.baslik, numberOfRooms: l.oda,
          floorSize: { "@type": "QuantitativeValue", value: l.m2, unitCode: "MTK" },
          address: { "@type": "PostalAddress", addressLocality: l.mahalle + ", Bahçelievler", addressRegion: "İstanbul", addressCountry: "TR" }
        }
      });
      document.head.appendChild(ld);

      // tam ekran galeri
      if (fotos.length) {
        const lb = $("#lightbox"), img = $("img", lb);
        let cur = 0;
        const open = (i) => { cur = (i + fotos.length) % fotos.length; img.src = fotos[cur]; img.alt = l.baslik + ", fotoğraf " + (cur + 1); lb.showModal(); };
        $$(".g-item", det).forEach((b) => b.addEventListener("click", () => open(Number(b.dataset.i))));
        $(".lb-prev", lb).onclick = () => open(cur - 1);
        $(".lb-next", lb).onclick = () => open(cur + 1);
        $(".lb-close", lb).onclick = () => lb.close();
        lb.addEventListener("keydown", (e) => { if (e.key === "ArrowLeft") open(cur - 1); if (e.key === "ArrowRight") open(cur + 1); });
      }
      $$(".wa-bar").forEach((a) => { a.href = waLink(msg); a.textContent = "Bu ev için WhatsApp'tan yaz"; });
    }).catch(() => { det.innerHTML = '<p class="notfound">İlan yüklenemedi. Sayfayı yenileyin.</p>'; });
  }
})();
