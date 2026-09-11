// ─────────────────────────────────────────────────────────────
// آثار: برای اضافه/ویرایش کردن کافیست همین لیست را تغییر دهید.
// عکس را داخل پوشه images/ بگذارید و مسیرش را بنویسید: "images/اسم-فایل.jpg"
// ─────────────────────────────────────────────────────────────
const works = [
  { title:"Art Deco",         price:"12,000,000 Toman", image:"/images/2.jpg" },
  { title:"Still Life",       price:"4,000,000 Toman",  image:"/images/1.jpg" },
  { title:"Restless Sunset",  price:"[Price]",          image:"/images/01.jpeg" },
  { title:"Blue Silence",     price:"[Price]", image:"/images/01.jpeg" },
  { title:"Soil and Root",    price:"[Price]", image:"/images/02.jpeg" },
  { title:"Quiet Flame",      price:"[Price]", image:"/images/03.jpeg" },
  { title:"Night and Mirror", price:"[Price]", image:"/images/04.jpeg" },
  { title:"Field of Memory",  price:"[Price]", image:"/images/05.jpeg" },
  { title:"Winter Light",     price:"[Price]", image:"/images/06.jpeg" },
  { title:"Ochre Study",      price:"[Price]", image:"/images/07.jpeg" },
  { title:"Coastal Blue",     price:"[Price]", image:"/images/08.jpeg" },
  { title:"Blue Silence",     price:"[Price]", image:"/images/09.jpeg" },
  { title:"Soil and Root",    price:"[Price]", image:"/images/10.jpeg" },
  { title:"Quiet Flame",      price:"[Price]", image:"/images/11.jpeg" },
  { title:"Night and Mirror", price:"[Price]", image:"/images/12.jpeg" },
  { title:"Field of Memory",  price:"[Price]", image:"/images/13.jpeg" },
  { title:"Winter Light",     price:"[Price]", image:"/images/14.jpeg" },
  { title:"Ochre Study",      price:"[Price]", image:"/images/15.jpeg" },
  { title:"Coastal Blue",     price:"[Price]", image:"/images/16.jpeg" },
  { title:"Coastal Blue",     price:"[Price]", image:"/images/17.jpeg" },
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
