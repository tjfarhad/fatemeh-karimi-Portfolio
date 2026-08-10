// Placeholder artwork data — swap "swatch" for a real image URL per piece when ready.
const works = [
  { title:"Restless Sunset", price:"[Price]", image:"https://raw.githubusercontent.com/tjfarhad/fatemeh-karimi-Portfolio/refs/heads/main/Restless%20Sunset.jpg" },
  { title:"Blue Silence",    price:"[Price]", swatch:"linear-gradient(135deg,#2f4c81,#3f7a6e)" },
  { title:"Soil and Root",   price:"[Price]", swatch:"linear-gradient(135deg,#5c7a4e,#c7b23a)" },
  { title:"Quiet Flame",     price:"[Price]", swatch:"linear-gradient(135deg,#c77a2e,#6e2e5e)" },
  { title:"Night and Mirror",price:"[Price]", swatch:"linear-gradient(135deg,#4a3e81,#2f6b81)" },
  { title:"Field of Memory", price:"[Price]", swatch:"linear-gradient(135deg,#8fa43e,#b14a3a)" },
  { title:"Winter Light",    price:"[Price]", swatch:"linear-gradient(135deg,#9fb0c2,#e7e4da)" },
  { title:"Ochre Study",     price:"[Price]", swatch:"linear-gradient(135deg,#d6a24a,#7a5230)" },
  { title:"Coastal Blue",    price:"[Price]", swatch:"linear-gradient(135deg,#274a6e,#7fb0b8)" }
];

const accents = ['#9B2C3F', '#2F4C81', '#D98F2B', '#5C7A4E'];
const grid = document.getElementById('grid');
works.forEach((w, i) => {
  const tile = document.createElement('div');
  tile.className = 'tile';
  const tilt = (i % 2 === 0 ? 1 : -1) * (1 + (i % 3));
  tile.style.setProperty('--tilt', tilt + 'deg');
  tile.style.setProperty('--accent', accents[i % accents.length]);
  tile.innerHTML = `
    <div class="tile-img"><div class="swatch" style="background:${w.swatch}"></div></div>
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
  lbImgWrap.innerHTML = `<div class="swatch lb-swatch" style="background:${w.swatch}"></div>`;
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
