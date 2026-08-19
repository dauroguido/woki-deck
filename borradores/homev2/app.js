(function () {
  'use strict';

  var nf = new Intl.NumberFormat('es-AR');
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Animaciones de entrada ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.setAttribute('data-in', ''); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -5% 0px', threshold: 0.05 });

  function sweep() {
    var h = window.innerHeight || 800;
    $$('[data-reveal]:not([data-in])').forEach(function (el) {
      io.observe(el);
      if (el.getBoundingClientRect().top < h * 0.95) el.setAttribute('data-in', '');
    });
  }
  sweep();
  document.addEventListener('scroll', sweep, { capture: true, passive: true });
  window.addEventListener('resize', sweep);

  /* ---------- Menús del header ---------- */
  var MENU = "position:absolute;top:100%;left:-12px;padding:8px;min-width:240px;background:#fff;border:1px solid #E8E3DD;border-radius:16px;box-shadow:0 14px 34px rgba(19,47,96,0.14);display:";

  function setMenu(name) {
    $$('[data-menu]').forEach(function (el) {
      el.setAttribute('style', MENU + (el.getAttribute('data-menu') === name ? 'block' : 'none'));
    });
  }
  $$('[data-dropdown]').forEach(function (wrap) {
    var name = wrap.getAttribute('data-dropdown');
    wrap.addEventListener('mouseenter', function () { setMenu(name); });
    wrap.addEventListener('mouseleave', function () { setMenu(null); });
  });

  /* ---------- Menú mobile ---------- */
  var drawer = $('[data-drawer]');
  var DRAWER = 'border-top:1px solid #E8E3DD;background:#fff;padding:12px clamp(18px,5vw,32px) 24px;flex-direction:column;display:';
  var open = false;

  function setDrawer(v) {
    open = v;
    drawer.setAttribute('style', DRAWER + (open ? 'flex' : 'none'));
  }
  $$('[data-action="toggle-drawer"]').forEach(function (b) {
    b.addEventListener('click', function () { setDrawer(!open); });
  });
  $$('[data-action="close-drawer"]').forEach(function (a) {
    a.addEventListener('click', function () { setDrawer(false); });
  });
  window.addEventListener('resize', function () { if (window.innerWidth > 1000 && open) setDrawer(false); });

  /* ---------- Formularios (demo, sin backend) ---------- */
  $$('[data-nosubmit]').forEach(function (f) {
    f.addEventListener('submit', function (e) { e.preventDefault(); });
  });

  /* ---------- Casos de clientes ---------- */
  var CASOS = [
    { nombre: 'Trescha · Estrella Michelin',
      texto: 'Sostiene con el Brief Pre-Turno el nivel que sus clientes esperan, y cobra garantías por no-show sin problema.' },
    { nombre: 'Happening y Gardiner',
      texto: 'Un solo envío de mail les generó 22 millones de facturación en la venta de un evento. Lo que antes dependía de unos pocos empleados de toda la vida, hoy está en el sistema.' },
    { nombre: 'Anchoíta',
      texto: 'Toma reservas una sola vez al año y ese día se satura. Eligió Woki por confiabilidad y por no perder su identidad de marca en ningún paso.' },
    { nombre: 'Tony Wu · Cantina China',
      texto: 'Mira el panel todas las semanas —qué turnos se repiten, en qué horarios hay más no-shows, de dónde vienen las reservas— y ajusta la operación con eso.' }
  ];
  var DOT_OFF = "background:none;border:1px solid rgba(255,255,255,0.32);border-radius:999px;padding:13px 18px;font:600 14px 'Mona Sans',sans-serif;cursor:pointer;color:rgba(255,255,255,0.72)";
  var DOT_ON = "background:#fff;border:1px solid #fff;border-radius:999px;padding:13px 18px;font:600 14px 'Mona Sans',sans-serif;cursor:pointer;color:#132F60";

  function setCaso(i) {
    $('[data-out="casoTexto"]').textContent = CASOS[i].texto;
    $('[data-out="casoNombre"]').textContent = CASOS[i].nombre;
    $$('[data-caso]').forEach(function (b) {
      b.setAttribute('style', Number(b.getAttribute('data-caso')) === i ? DOT_ON : DOT_OFF);
    });
  }
  $$('[data-caso]').forEach(function (b) {
    b.addEventListener('click', function () { setCaso(Number(b.getAttribute('data-caso'))); });
  });

  /* ---------- Calculadora ---------- */
  var inNuevos = $('[data-input="nuevos"]');
  var inTicket = $('[data-input="ticket"]');

  function calcular() {
    var n = Number(inNuevos.value);
    var t = Number(inTicket.value);
    var anual = n * 12;
    var visitas = Math.round(anual * 0.1);
    $('[data-out="nuevosLabel"]').textContent = nf.format(n);
    $('[data-out="ticketLabel"]').textContent = '$ ' + nf.format(t);
    $('[data-out="anualLabel"]').textContent = nf.format(anual);
    $('[data-out="visitasLabel"]').textContent = nf.format(visitas) + ' visitas';
    $('[data-out="facturacionLabel"]').textContent = '$ ' + nf.format(visitas * t);
  }
  [inNuevos, inTicket].forEach(function (el) {
    el.addEventListener('input', calcular);
    el.addEventListener('change', calcular);
  });
  calcular();
})();
