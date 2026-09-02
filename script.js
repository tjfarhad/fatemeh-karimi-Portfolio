// ─────────────────────────────────────────────────────────────
// آثار: برای اضافه/ویرایش کردن کافیست همین لیست را تغییر دهید.
// عکس را داخل پوشه images/ بگذارید و مسیرش را بنویسید: "images/اسم-فایل.jpg"
// ─────────────────────────────────────────────────────────────
const works = [
  { title:"Art Deco",         price:"12,000,000 Toman", image:"/images/2.jpg" },
  { title:"Still Life",       price:"4,000,000 Toman",  image:"/images/1.jpg" },
  { title:"Restless Sunset",  price:"[Price]",          image:"/images/restless-sunset.jpg" },
  // — نمونه‌های موقت (placeholder) — با عکس‌های واقعی جایگزین شوند —
  { title:"Blue Silence",     price:"[Price]", image:"https://images.unsplash.com/photo-1597773150796-e5c14ebecbf5?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  { title:"Soil and Root",    price:"[Price]", image:"https://images.unsplash.com/photo-1553949345-eb786bb3f7ba?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  { title:"Quiet Flame",      price:"[Price]", image:"https://images.unsplash.com/photo-1561835476-95863b52c53f?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  { title:"Night and Mirror", price:"[Price]", image:"https://images.unsplash.com/photo-1604871000636-074fa5117945?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  { title:"Field of Memory",  price:"[Price]", image:"https://images.unsplash.com/photo-1553356009-50faee7aa84c?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  { title:"Winter Light",     price:"[Price]", image:"https://images.unsplash.com/photo-1628432436663-9e588806592a?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  { title:"Ochre Study",      price:"[Price]", image:"https://images.unsplash.com/photo-1608501902687-d3beed3ca1f3?fm=jpg&q=80&w=1200&auto=format&fit=crop" },
  { title:"Coastal Blue",     price:"[Price]", image:"https://images.unsplash.com/photo-1555448259-8da74c6c6b01?fm=jpg&q=80&w=1200&auto=format&fit=crop" }
];

function pieceMedia(w){
  return w.image
    ? `<img src="${w.image}" alt="${w.title}" loading="lazy" decoding="async">`
    : `<div class="swatch" style="background:${w.swatch}"></div>`;
}

const accents = ['#9B2C3F', '#2F4C81', '#D98F2B', '#5C7A4E'];
const grid = document.getElementById('grid');
works.forEach((w, i) => {
  const tile = document.createElement('div');
  tile.className = 'tile';
  const tilt = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3));
  tile.style.setProperty('--tilt', tilt + 'deg');
  tile.style.setProperty('--accent', accents[i % accents.length]);
  tile.innerHTML = `
    <div class="tile-img">${pieceMedia(w)}</div>
    <div class="tile-cap">
      <div class="tile-title">${w.title}</div>
      <div class="tile-price">${w.price}</div>
    </div>`;
  tile.addEventListener('click', () => openLightbox(i));
  grid.appendChild(tile);
});

const lightbox = document.getElementById('lightbox');
const lbImgWrap = document.getElementById('lbImgWrap');
const lbTitle = document.getElementById('lbTitle');
const lbPrice = document.getElementById('lbPrice');
const lbCounter = document.getElementById('lbCounter');
let current = 0;

function renderLightbox(){
  const w = works[current];
  lbImgWrap.innerHTML = w.image
    ? `<img src="${w.image}" alt="${w.title}">`
    : `<div class="swatch lb-swatch" style="background:${w.swatch}"></div>`;
  lbTitle.textContent = w.title;
  lbPrice.textContent = w.price;
  lbCounter.textContent = (current + 1) + ' / ' + works.length;
}

function openLightbox(i){
  current = i;
  renderLightbox();
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox(){
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}
function next(){ current = (current + 1) % works.length; renderLightbox(); }
function prev(){ current = (current - 1 + works.length) % works.length; renderLightbox(); }

document.getElementById('lbClose').addEventListener('click', closeLightbox);
document.getElementById('lbNext').addEventListener('click', next);
document.getElementById('lbPrev').addEventListener('click', prev);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox || e.target.classList.contains('lb-stage')) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowRight') next();
  if (e.key === 'ArrowLeft') prev();
});
