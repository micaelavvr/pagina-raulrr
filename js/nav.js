document.addEventListener("DOMContentLoaded", () => {
  const navMount = document.getElementById("site-nav");
  if (!navMount) return;

  navMount.innerHTML = `
    <nav class="tabs-wrap" aria-label="Navegación de secciones">
      <div class="tabs" id="navTabs">

        <a class="tab" href="nosotros.html" data-page="nosotros.html">Nosotros</a>
        <a class="tab" href="index.html" data-page="index.html">Inicio</a>

        <div class="tab dd" data-dd data-page-group="canales">
          <a class="dd-link" href="canales.html">Canales y Videos Católicos</a>

          <button class="dd-trigger" type="button"
            aria-expanded="false"
            aria-controls="dd-menu-canales"
            aria-label="Abrir menú de canales">
            ▼
          </button>

          <ul id="dd-menu-canales" class="dd-menu dd-menu-canales" hidden>
            <li><a href="canales.html#canales-recomendados">Canales recomendados</a></li>
            <li><a href="canales.html#milagros-eucaristicos">Milagros eucarísticos</a></li>
            <li><a href="canales.html#carlo-acutis">Carlo Acutis</a></li>
            <li><a href="canales.html#historia-salvacion">Historia de la Salvación</a></li>
            <li><a href="canales.html#peregrinacion-san-mateo">Peregrinación virtual</a></li>
          </ul>
        </div>

        <a class="tab" href="noticias.html" data-page="noticias.html">Noticias</a>
        <a class="tab" href="temasfe.html" data-page="temasfe.html">Biblioteca</a>
        <a class="tab" href="catecismo.html" data-page="catecismo.html">Catecismo</a>

        <div class="tab dd more" data-dd data-page-group="otros">
          <span class="dd-link">Otros</span>

          <button class="dd-trigger" type="button"
            aria-expanded="false"
            aria-controls="dd-menu-otros"
            aria-label="Abrir menú de otros">
            ▼
          </button>

          <ul id="dd-menu-otros" class="dd-menu dd-menu-otros" hidden>
            <li><a href="papa-leon-xiv.html">Papa León XIV</a></li>
            <li><a href="cuaresma.html">Cuaresma y Semana Santa</a></li>
            <li><a href="rosario.html">El Rosario</a></li>
            <li><a href="coronillayhorasanta.html">Coronilla – Hora Santa – Liturgia de las Horas</a></li>
            <li><a href="apps.html">Apps Católicas</a></li>
            <li><a href="biblia.html">Biblia</a></li>
            <li><a href="matrimonio.html">Sobre el Matrimonio</a></li>
            <li><a href="jovenes.html">Jóvenes</a></li>
            <li><a href="retiroepca.html">Retiro EPCA</a></li>
          </ul>
        </div>

      </div>
    </nav>
  `;

  marcarPaginaActiva();
  activarDropdowns();
});


function getCurrentFile(){
  let file = window.location.pathname.split("/").pop();

  if (!file || file === "/") {
    file = "index.html";
  }

  return file;
}


function marcarPaginaActiva(){
  const currentFile = getCurrentFile();

  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("is-active");
  });

  const directLink = document.querySelector(`.tab[data-page="${currentFile}"]`);

  if (directLink) {
    directLink.classList.add("is-active");
    return;
  }

  const canalesPages = [
    "canales.html"
  ];

  const otrosPages = [
    "papa-leon-xiv.html",
    "cuaresma.html",
    "rosario.html",
    "coronillayhorasanta.html",
    "apps.html",
    "biblia.html",
    "matrimonio.html",
    "jovenes.html",
    "retiroepca.html"
  ];

  if (canalesPages.includes(currentFile)) {
    document.querySelector('[data-page-group="canales"]')?.classList.add("is-active");
  }

  if (otrosPages.includes(currentFile)) {
    document.querySelector('[data-page-group="otros"]')?.classList.add("is-active");
  }
}


function activarDropdowns(){
  const dropdowns = document.querySelectorAll("[data-dd]");

  function cerrarTodos(excepto = null){
    dropdowns.forEach(dd => {
      if (dd === excepto) return;

      const trigger = dd.querySelector(".dd-trigger");
      const menu = dd.querySelector(".dd-menu");

      dd.classList.remove("open");

      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  }

  function setOpen(dd, abierto){
    const trigger = dd.querySelector(".dd-trigger");
    const menu = dd.querySelector(".dd-menu");

    if (abierto) cerrarTodos(dd);

    dd.classList.toggle("open", abierto);

    if (trigger) {
      trigger.setAttribute("aria-expanded", abierto ? "true" : "false");
    }

    if (menu) {
      menu.hidden = !abierto;
    }
  }

  dropdowns.forEach(dd => {
    const trigger = dd.querySelector(".dd-trigger");
    const menu = dd.querySelector(".dd-menu");

    if (!trigger || !menu) return;

    trigger.addEventListener("click", e => {
      e.preventDefault();
      e.stopPropagation();

      const abierto = dd.classList.contains("open");
      setOpen(dd, !abierto);
    });

    menu.addEventListener("click", e => {
      if (e.target.closest("a")) {
        setOpen(dd, false);
      }
    });
  });

  document.addEventListener("click", () => {
    cerrarTodos();
  });

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      cerrarTodos();
    }
  });
}