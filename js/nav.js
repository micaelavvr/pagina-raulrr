document.addEventListener("DOMContentLoaded", () => {
  const navMount = document.getElementById("site-nav");
  if (!navMount) return;

  navMount.innerHTML = `
<nav class="tabs-wrap" aria-label="Navegación de secciones">
  <div class="tabs" id="navTabs">

    <a class="tab" href="/nosotros" data-page="/nosotros">Nosotros</a>
    <a class="tab" href="/" data-page="/">Inicio</a>

    <div class="tab dd" data-dd data-page-group="canales">
      <a class="dd-link" href="/canales" data-page="/canales">Canales y Videos</a>

      <button class="dd-trigger" type="button"
        aria-expanded="false"
        aria-controls="dd-menu-canales"
        aria-label="Abrir menú de canales">
        ▼
      </button>

      <ul id="dd-menu-canales" class="dd-menu dd-menu-canales" hidden>
        <li>
          <a href="/canales" data-go-section="canales-recomendados">
            Canales recomendados
          </a>
        </li>

        <li>
          <a href="/canales" data-go-section="cristonautas">
            Cristonautas
          </a>
        </li>

        <li>
          <a href="/canales" data-go-section="milagros-eucaristicos">
            Milagros eucarísticos
          </a>
        </li>

        <li>
          <a href="/canales" data-go-section="carlo-acutis">
            Carlo Acutis
          </a>
        </li>

        <li>
          <a href="/canales" data-go-section="historia-salvacion">
            Historia de la Salvación
          </a>
        </li>

        <li>
          <a href="/canales" data-go-section="peregrinacion-san-mateo">
            Peregrinación virtual
          </a>
        </li>
      </ul>
    </div>

    <a class="tab" href="/noticias" data-page="/noticias">Noticias</a>
    <a class="tab" href="/biblioteca" data-page="/biblioteca">Biblioteca</a>
    <a class="tab" href="/papa-leon-xiv" data-page="/papa-leon-xiv">Papa León XIV</a>

    <div class="tab dd more" data-dd data-page-group="otros">
      <span class="dd-link">Otros</span>

      <button class="dd-trigger" type="button"
        aria-expanded="false"
        aria-controls="dd-menu-otros"
        aria-label="Abrir menú de otros">
        ▼
      </button>

      <ul id="dd-menu-otros" class="dd-menu dd-menu-otros" hidden>
        <li><a href="/catecismo" data-page="/catecismo">Catecismo</a></li>
        <li><a href="/cuaresma" data-page="/cuaresma">Cuaresma y Semana Santa</a></li>
        <li><a href="/rosario" data-page="/rosario">El Rosario</a></li>
        <li><a href="/coronilla-hora-santa" data-page="/coronilla-hora-santa">Coronilla – Hora Santa – Liturgia de las Horas</a></li>
        <li><a href="/matrimonio" data-page="/matrimonio">Sobre el Matrimonio</a></li>
        <li><a href="/jovenes" data-page="/jovenes">Jóvenes</a></li>
        <li><a href="/retiroepca" data-page="/retiroepca">Retiro</a></li>
      </ul>
    </div>

  </div>
</nav>
  `;

  marcarPaginaActiva();
  activarDropdowns();
});


function getCurrentFile() {
  let file = window.location.pathname.split("/").pop();

  if (!file || file === "/") {
    file = "index.html";
  }

  return file;
}


function marcarPaginaActiva() {
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
    "matrimonio.html",
    "jovenes.html"
  ];

  if (canalesPages.includes(currentFile)) {
    document.querySelector('[data-page-group="canales"]')?.classList.add("is-active");
  }

  if (otrosPages.includes(currentFile)) {
    document.querySelector('[data-page-group="otros"]')?.classList.add("is-active");
  }
}


function activarDropdowns() {
  const dropdowns = document.querySelectorAll("[data-dd]");

  function cerrarTodos(excepto = null) {
    dropdowns.forEach(dd => {
      if (dd === excepto) return;

      const trigger = dd.querySelector(".dd-trigger");
      const menu = dd.querySelector(".dd-menu");

      dd.classList.remove("open");

      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  }

  function setOpen(dd, abierto) {
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