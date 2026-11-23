/* Visor de lagunas de Magallanes. Sin dependencias salvo Leaflet. */
(function () {
  'use strict';
  var D = window.DATOS;
  var TEMP = D.temporadas;                       // ['2017-2018', ...]
  var CORTO = TEMP.map(function (t) { return t.slice(2, 4) + '-' + t.slice(7, 9); });
  var ARCH = TEMP.map(function (t) { return t.replace('-', '_'); });
  var NS = 'http://www.w3.org/2000/svg';
  var tip = document.getElementById('tooltip');

  var CAPAS = {
    suelo: {
      nombre: 'Agua y suelo',
      rampa: 'linear-gradient(90deg,#1a6634,#78c679,#ffffb2,#d9a02b,#8c4a00)',
      rotulos: ['Plantas', 'Suelo desnudo'],
      agua: true
    },
    vegetacion: {
      nombre: 'Vegetación',
      rampa: 'linear-gradient(90deg,#ece7f2,#fcd163,#74a901,#056201,#011301)',
      rotulos: ['Sin plantas', 'Muy verde'],
      agua: false
    }
  };

  /* ---------- utilidades ---------- */
  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    if (html != null) e.innerHTML = html;
    return e;
  }
  function sv(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
    return e;
  }
  function fmt(v, unidad) {
    if (v == null || isNaN(v)) return 'sin dato';
    var d = unidad === 'NDVI' ? 2 : (unidad === 'ha' && v < 100 ? 1 : 0);
    if (unidad === 'mm' || unidad === 'días' || unidad === '% del área') d = 0;
    return v.toLocaleString('es-CL', { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function conUnidad(v, unidad) {
    var s = fmt(v, unidad);
    if (s === 'sin dato') return s;
    if (unidad === 'NDVI') return 'NDVI ' + s;
    if (unidad === '% del área') return s + '% del área';
    return s + ' ' + unidad;
  }
  function mostrarTip(evt, html) {
    tip.innerHTML = html; tip.hidden = false;
    var r = tip.getBoundingClientRect();
    var x = evt.clientX + 14, y = evt.clientY - r.height - 10;
    if (x + r.width > window.innerWidth - 8) x = evt.clientX - r.width - 14;
    if (y < 8) y = evt.clientY + 16;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  }
  function ocultarTip() { tip.hidden = true; }
  function colorVar(nombre) { return 'var(--' + nombre + ')'; }

  /* Barra con esquinas superiores redondeadas (4 px), anclada a la base */
  function rutaBarra(x, y, w, h) {
    var r = Math.min(4, w / 2, h);
    if (h <= 0) return '';
    return 'M' + x + ',' + (y + h) + 'V' + (y + r) + 'Q' + x + ',' + y + ' ' + (x + r) + ',' + y +
      'H' + (x + w - r) + 'Q' + (x + w) + ',' + y + ' ' + (x + w) + ',' + (y + r) + 'V' + (y + h) + 'Z';
  }

  /* ---------- gráfico de barras (una o dos series) ---------- */
  function grafico(cont, cfg) {
    // cfg: {series:[{nombre, valores, color, unidad}], alSeleccionar}
    var W = cfg.ancho || 440, H = cfg.alto || 150, mt = 20, mb = 22, ml = 2, mr = 2;
    var n = TEMP.length, ancho = (W - ml - mr) / n;
    var todos = []; cfg.series.forEach(function (s) { todos = todos.concat(s.valores); });
    var max = Math.max.apply(null, todos.filter(function (v) { return v != null; })) * 1.08 || 1;
    var y = function (v) { return mt + (H - mt - mb) * (1 - v / max); };
    var svg = sv('svg', { viewBox: '0 0 ' + W + ' ' + H, role: 'img', 'aria-label': cfg.etiqueta || '' });
    var base = sv('g', { 'class': 'eje' });
    base.appendChild(sv('line', { x1: ml, x2: W - mr, y1: H - mb + 0.5, y2: H - mb + 0.5 }));
    svg.appendChild(base);
    var cols = [];
    for (var i = 0; i < n; i++) {
      var g = sv('g', { 'class': 'columna', tabindex: '0', 'data-i': i });
      g.appendChild(sv('rect', { 'class': 'fondo-col', x: ml + i * ancho, y: 0, width: ancho, height: H - mb, rx: 4 }));
      var k = cfg.series.length, gap = 2, bw = Math.min(30, (ancho * 0.62 - gap * (k - 1)) / k);
      var x0 = ml + i * ancho + (ancho - (bw * k + gap * (k - 1))) / 2;
      cfg.series.forEach(function (s, j) {
        var v = s.valores[i];
        if (v == null) return;
        var yy = y(v), h = (H - mb) - yy;
        g.appendChild(sv('path', { 'class': 'barra', d: rutaBarra(x0 + j * (bw + gap), yy, bw, Math.max(h, 0.5)), fill: colorVar(s.color) }));
      });
      var lbl = sv('text', { x: ml + i * ancho + ancho / 2, y: H - 6, 'text-anchor': 'middle' });
      lbl.textContent = CORTO[i];
      var eje = sv('g', { 'class': 'eje' }); eje.appendChild(lbl); g.appendChild(eje);
      // etiqueta de valor (solo visible en la temporada seleccionada, una serie)
      if (k === 1) {
        var v1 = cfg.series[0].valores[i];
        var t = sv('text', { 'class': 'valor-etiqueta', x: ml + i * ancho + ancho / 2, y: y(v1 || 0) - 6, 'text-anchor': 'middle', visibility: 'hidden' });
        t.textContent = fmt(v1, cfg.series[0].unidad);
        g.appendChild(t);
      }
      (function (i, g) {
        g.addEventListener('mousemove', function (e) {
          var html = '<div class="t-tit">Temporada ' + TEMP[i] + '</div>' + cfg.series.map(function (s) {
            return (cfg.series.length > 1 ? '<span class="muestra" style="background:' + colorVar(s.color) + '"></span>' + s.nombre + ': ' : '') + conUnidad(s.valores[i], s.unidad);
          }).join('<br>');
          if (i === 0) html += '<br><span class="t-tit">Temporada con datos incompletos</span>';
          mostrarTip(e, html);
        });
        g.addEventListener('mouseleave', ocultarTip);
        g.addEventListener('click', function () { cfg.alSeleccionar(i); });
        g.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); cfg.alSeleccionar(i); } });
      })(i, g);
      svg.appendChild(g); cols.push(g);
    }
    cont.appendChild(svg);
    return {
      marcar: function (i) {
        cols.forEach(function (g, j) {
          g.classList.toggle('sel', j === i);
          var t = g.querySelector('.valor-etiqueta'); if (t) t.setAttribute('visibility', j === i ? 'visible' : 'hidden');
        });
      }
    };
  }

  function tabla(series) {
    var d = el('details', { 'class': 'tabla' });
    d.appendChild(el('summary', null, 'Ver tabla'));
    var h = '<table><thead><tr><th>Temporada</th>' + series.map(function (s) { return '<th>' + s.nombre + ' (' + s.unidad + ')</th>'; }).join('') + '</tr></thead><tbody>';
    TEMP.forEach(function (t, i) {
      h += '<tr><td>' + t + '</td>' + series.map(function (s) { return '<td>' + fmt(s.valores[i], s.unidad) + '</td>'; }).join('') + '</tr>';
    });
    d.insertAdjacentHTML('beforeend', h + '</tbody></table>');
    return d;
  }

  /* ---------- un caso ---------- */
  function montarCaso(caso) {
    var sec = document.getElementById(caso.id);
    var bloque = sec.querySelector('.visor-bloque');
    var estado = { i: 2, capa: 'suelo', timer: null };
    var marcadores = [];

    /* panel del mapa */
    var pm = el('div', { 'class': 'panel' });
    pm.appendChild(el('h3', null, 'Mapa por temporada'));
    pm.appendChild(el('p', { 'class': 'nota' }, caso.mapa === 'imagen'
      ? 'Mapas del informe para toda la cuenca. La estrella roja marca la zona de plantación.'
      : 'Capa satelital sobre imagen de fondo. Usa la rueda del mouse o los botones para acercar.'));
    var ctr = el('div', { 'class': 'controles' });
    var seg = el('div', { 'class': 'segmentado', role: 'group', 'aria-label': 'Capa del mapa' });
    Object.keys(CAPAS).forEach(function (k) {
      var b = el('button', { type: 'button', 'aria-pressed': k === estado.capa ? 'true' : 'false', 'data-capa': k }, CAPAS[k].nombre);
      b.addEventListener('click', function () { estado.capa = k; actualizar(); });
      seg.appendChild(b);
    });
    var play = el('button', { type: 'button', 'class': 'boton-play' });
    var actual = el('span', { 'class': 'temporada-actual', 'aria-live': 'polite' });
    ctr.appendChild(seg); ctr.appendChild(play); ctr.appendChild(actual);
    pm.appendChild(ctr);
    var mapaDiv = el('div', { 'class': 'mapa' + (caso.mapa === 'imagen' ? ' imagen' : ''), id: 'mapa-' + caso.id });
    pm.appendChild(mapaDiv);
    var desl = el('div', { 'class': 'deslizador' });
    var rango = el('input', { type: 'range', min: '0', max: String(TEMP.length - 1), step: '1', value: String(estado.i), 'aria-label': 'Temporada' });
    rango.addEventListener('input', function () { estado.i = +rango.value; actualizar(); });
    var marcas = el('div', { 'class': 'marcas' });
    CORTO.forEach(function (c, i) {
      var s = el('span', null, c); s.addEventListener('click', function () { seleccionar(i); }); marcas.appendChild(s);
    });
    desl.appendChild(rango); desl.appendChild(marcas); pm.appendChild(desl);
    var ley = el('div', { 'class': 'leyenda' }); pm.appendChild(ley);
    var aviso = el('p', { 'class': 'aviso', hidden: '' }); pm.appendChild(aviso);
    bloque.appendChild(pm);

    /* mapa */
    var img, overlay, lmap;
    if (caso.mapa === 'imagen') {
      img = el('img', { alt: '' }); mapaDiv.appendChild(img);
    } else {
      lmap = L.map(mapaDiv, { scrollWheelZoom: false, attributionControl: true, zoomSnap: 0.25 });
      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 18, attribution: 'Imagen: Esri, Maxar, Earthstar Geographics'
      }).addTo(lmap);
      lmap.fitBounds(caso.bounds.suelo, { padding: [8, 8] });
      mapaDiv.addEventListener('click', function () { lmap.scrollWheelZoom.enable(); });
      mapaDiv.addEventListener('mouseleave', function () { lmap.scrollWheelZoom.disable(); });
      if (caso.marcador) {
        L.circleMarker(caso.marcador, { radius: 6, color: '#ffffff', weight: 2, fillColor: '#e34948', fillOpacity: 1 })
          .bindTooltip('Zona de plantación (2024)', { direction: 'top', offset: [0, -6] }).addTo(lmap);
      }
      // precarga
      ['suelo', 'vegetacion'].forEach(function (c) { ARCH.forEach(function (a) { new Image().src = 'img/' + caso.id + '_' + c + '_' + a + '.png'; }); });
    }

    /* panel de gráficos */
    var pg = el('div', { 'class': 'panel graficos' });
    caso.series.forEach(function (s) {
      var g = el('div', { 'class': 'grafico' });
      g.appendChild(el('h3', null, s.titulo));
      g.appendChild(el('p', { 'class': 'nota' }, s.nota));
      var ser = [{ nombre: s.titulo, valores: s.valores, color: s.color, unidad: s.unidad }];
      marcadores.push(grafico(g, { series: ser, alto: 120, ancho: 430, etiqueta: s.titulo + ' por temporada', alSeleccionar: seleccionar }));
      g.appendChild(tabla(ser));
      pg.appendChild(g);
    });
    bloque.appendChild(pg);

    /* clima */
    var pc = el('div', { 'class': 'panel clima' });
    pc.appendChild(el('h3', null, 'Clima de cada verano'));
    pc.appendChild(el('p', { 'class': 'nota' }, 'Lluvia y evaporación potencial de noviembre a marzo (mm). Cuando la evaporación supera por mucho a la lluvia, el balance de agua es más negativo y las lagunas tienden a bajar. Fuente: ERA5-Land.'));
    var grid = el('div', { style: 'display:grid;grid-template-columns:minmax(0,1.6fr) minmax(0,1fr);gap:20px' });
    var g1 = el('div', { 'class': 'grafico' });
    g1.appendChild(el('div', { 'class': 'grafico-leyenda' },
      '<span><span class="muestra" style="background:var(--agua)"></span>Lluvia</span><span><span class="muestra" style="background:var(--sedimento)"></span>Evaporación potencial</span>'));
    var serC = [
      { nombre: 'Lluvia', valores: caso.clima.lluvia, color: 'agua', unidad: 'mm' },
      { nombre: 'Evaporación potencial', valores: caso.clima.evaporacion, color: 'sedimento', unidad: 'mm' }
    ];
    marcadores.push(grafico(g1, { series: serC, alto: 150, ancho: 650, etiqueta: 'Lluvia y evaporación por temporada', alSeleccionar: seleccionar }));
    g1.appendChild(tabla(serC));
    var g2 = el('div', { 'class': 'grafico' });
    g2.appendChild(el('div', { 'class': 'grafico-leyenda' }, '<span>Días con viento fuerte (sobre 8 m/s)</span>'));
    var serV = [{ nombre: 'Días con viento fuerte', valores: caso.clima.viento, color: 'texto-3', unidad: 'días' }];
    marcadores.push(grafico(g2, { series: serV, alto: 150, ancho: 420, etiqueta: 'Días con viento fuerte por temporada', alSeleccionar: seleccionar }));
    g2.appendChild(tabla(serV));
    grid.appendChild(g1); grid.appendChild(g2); pc.appendChild(grid);
    bloque.appendChild(pc);

    function seleccionar(i) { estado.i = i; rango.value = String(i); actualizar(); }

    function actualizar() {
      var i = estado.i, capa = CAPAS[estado.capa];
      actual.textContent = TEMP[i];
      seg.querySelectorAll('button').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.capa === estado.capa ? 'true' : 'false'); });
      marcas.querySelectorAll('span').forEach(function (s, j) { s.classList.toggle('activa', j === i); });
      var url = 'img/' + caso.id + '_' + estado.capa + '_' + ARCH[i] + '.png';
      if (img) {
        img.src = url;
        img.alt = capa.nombre + ', ' + caso.nombre + ', temporada ' + TEMP[i];
      } else {
        if (!overlay) overlay = L.imageOverlay(url, caso.bounds[estado.capa], { opacity: 1, alt: '' }).addTo(lmap);
        else { overlay.setUrl(url); overlay.setBounds(L.latLngBounds(caso.bounds[estado.capa])); }
      }
      ley.innerHTML = '<span><div class="rampa" style="background:' + capa.rampa + '"></div><div class="rampa-rotulos"><span>' +
        capa.rotulos[0] + '</span><span>' + capa.rotulos[1] + '</span></div></span>' +
        (capa.agua ? '<span><span class="muestra" style="background:#2b6cb0"></span>Agua</span>' : '');
      if (i === 0) {
        aviso.hidden = false;
        aviso.textContent = 'En 2017-2018 solo hay datos para cerca del ' + caso.cobertura_parcial + '% del área, por eso parte del mapa aparece vacía y sus valores no se comparan directamente con el resto.';
      } else { aviso.hidden = true; }
      marcadores.forEach(function (m) { m.marcar(i); });
    }

    function pintarPlay() {
      play.innerHTML = estado.timer
        ? '<svg viewBox="0 0 12 12" aria-hidden="true"><rect x="2" y="1" width="3" height="10"/><rect x="7" y="1" width="3" height="10"/></svg>Pausar'
        : '<svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z"/></svg>Reproducir';
    }
    play.addEventListener('click', function () {
      if (estado.timer) { clearInterval(estado.timer); estado.timer = null; }
      else {
        estado.timer = setInterval(function () { seleccionar((estado.i + 1) % TEMP.length); }, 1300);
      }
      pintarPlay();
    });
    pintarPlay();
    actualizar();
  }

  D.casos.forEach(montarCaso);
})();
