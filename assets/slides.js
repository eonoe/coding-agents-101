// Navegacion del deck, compartida por las cuatro noches.
// Se saco de slides.html al aparecer el segundo deck. No sabe nada del
// contenido: arma el indice del DOM y lee data-t de cada lamina, asi que
// una lamina nueva no obliga a tocar este archivo.
var slides = document.querySelectorAll('.slide');
var ov = document.getElementById('ov');
var i = 0;

// El índice se arma del DOM, así que agregar una lámina no obliga a tocarlo.
(function () {
  var ol = document.getElementById('ovl');
  slides.forEach(function (s, k) {
    var h = s.querySelector('h1, h2');
    var li = document.createElement('li');
    li.innerHTML = '<span class="i">' + (k + 1) + '</span>' +
                   '<span>' + (h ? h.textContent.replace(/\s+/g, ' ').trim() : '') + '</span>' +
                   '<span class="tt">' + (s.dataset.t || '') + '</span>';
    li.addEventListener('click', function () { show(k); toggleOv(false); });
    ol.appendChild(li);
  });
})();

function toggleOv(force) {
  var open = force === undefined ? !ov.classList.contains('on') : force;
  ov.classList.toggle('on', open);
  if (open) {
    var items = ov.querySelectorAll('li');
    for (var k = 0; k < items.length; k++) items[k].className = k === i ? 'cur' : '';
  }
}

function show(n){
  i = Math.max(0, Math.min(slides.length - 1, n));
  slides.forEach(function(s, k){ s.classList.toggle('on', k === i); });
  document.getElementById('bar').style.width = ((i + 1) / slides.length * 100) + '%';
  document.getElementById('num').textContent = (i + 1) + ' / ' + slides.length;
  document.getElementById('tmark').textContent = slides[i].dataset.t || '';
  // El contador vive fuera de la slide, así que el contraste se ajusta a mano.
  var oscura = slides[i].classList.contains('dark') || slides[i].classList.contains('blue');
  var c = oscura ? 'rgba(255,255,255,.7)' : '';
  document.getElementById('num').style.color = c;
  document.getElementById('tmark').style.color = c;
  if (location.hash !== '#' + (i + 1)) history.replaceState(null, '', '#' + (i + 1));
}

document.addEventListener('keydown', function(e){
  if (e.key === 'Escape') { toggleOv(false); return; }
  if (e.key === 'o' || e.key === 'O') { e.preventDefault(); toggleOv(); return; }
  if (ov.classList.contains('on')) return;
  if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown' || e.key === 'ArrowDown') { e.preventDefault(); show(i + 1); }
  if (e.key === 'ArrowLeft' || e.key === 'PageUp' || e.key === 'ArrowUp') { e.preventDefault(); show(i - 1); }
  if (e.key === 'Home') { e.preventDefault(); show(0); }
  if (e.key === 'End') { e.preventDefault(); show(slides.length - 1); }
  if (e.key === 'f' || e.key === 'F') {
    if (document.fullscreenElement) document.exitFullscreen();
    else document.documentElement.requestFullscreen();
  }
});

document.addEventListener('click', function(e){
  if (e.target.closest('a') || e.target.closest('#ov')) return;
  show(e.clientX < window.innerWidth * 0.25 ? i - 1 : i + 1);
});

show(parseInt((location.hash || '#1').slice(1), 10) - 1 || 0);
