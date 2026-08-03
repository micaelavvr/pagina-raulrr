document.addEventListener("DOMContentLoaded", () => {
  const navMount = document.getElementById("site-nav");
  if (!navMount) return;

  navMount.innerHTML = `
<nav class="mc-nav" aria-label="Navegación principal">
  <div class="mc-nav-inner">

    <a class="mc-brand" href="/" aria-label="Ir al inicio de Mundo Católico">
      <img src="img/LOGO-OFICIAL.png" alt="Mundo Católico">
    </a>

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
          <li><a href="/canales" data-go-section="canales-recomendados">Canales recomendados</a></li>
          <li><a href="/canales" data-go-section="cristonautas">Cristonautas</a></li>
          <li><a href="/canales" data-go-section="milagros-eucaristicos">Milagros eucarísticos</a></li>
          <li><a href="/canales" data-go-section="carlo-acutis">Carlo Acutis</a></li>
          <li><a href="/canales" data-go-section="historia-salvacion">Historia de la Salvación</a></li>
          <li><a href="/canales" data-go-section="peregrinacion-san-mateo">Peregrinación virtual</a></li>
          <li><a href="/canales" data-go-section="concilio-vaticano-ii">A la luz del Concilio Vaticano II</a></li>
        </ul>
      </div>

      <a class="tab" href="/noticias" data-page="/noticias">Noticias</a>
      <a class="tab" href="/biblioteca" data-page="/biblioteca">Biblioteca</a>
      <a class="tab" href="/papa-leon-xiv-nuevo" data-page="/papa-leon-xiv-nuevo">Papa León XIV</a>

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
  </div>
</nav>
  `;

  activarDropdowns();
  marcarNavActivo();
  activarScrollSecciones();
});


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

    if (trigger) trigger.setAttribute("aria-expanded", abierto ? "true" : "false");
    if (menu) menu.hidden = !abierto;
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

  document.addEventListener("click", () => cerrarTodos());

  document.addEventListener("keydown", e => {
    if (e.key === "Escape") cerrarTodos();
  });
}


function marcarNavActivo() {
  const currentPath = cleanNavPath(window.location.pathname);

  document.querySelectorAll(".tab, .dd").forEach(item => {
    item.classList.remove("is-active", "active");
    item.removeAttribute("aria-current");
  });

  const navMap = [
    { path: "/", selector: 'a[href="/"]' },
    { path: "/nosotros", selector: 'a[href="/nosotros"]' },
    { path: "/canales", selector: '[data-page-group="canales"]' },
    { path: "/noticias", selector: 'a[href="/noticias"]' },
    { path: "/biblioteca", selector: 'a[href="/biblioteca"]' },
    { path: "/papa-leon-xiv-nuevo", selector: 'a[href="/papa-leon-xiv-nuevo"]' },
    { path: "/papa-leon-xiv", selector: 'a[href="/papa-leon-xiv-nuevo"]' },
    { path: "/catecismo", selector: '[data-page-group="otros"]' },
    { path: "/cuaresma", selector: '[data-page-group="otros"]' },
    { path: "/rosario", selector: '[data-page-group="otros"]' },
    { path: "/coronilla-hora-santa", selector: '[data-page-group="otros"]' },
    { path: "/matrimonio", selector: '[data-page-group="otros"]' },
    { path: "/jovenes", selector: '[data-page-group="otros"]' },
    { path: "/retiroepca", selector: '[data-page-group="otros"]' }
  ];

  const found = navMap.find(item => item.path === currentPath);
  if (!found) return;

  const activeItem = document.querySelector(found.selector);
  if (!activeItem) return;

  activeItem.classList.add("is-active");

  if (activeItem.tagName === "A") {
    activeItem.setAttribute("aria-current", "page");
  }
}


function activarScrollSecciones() {
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-go-section]");
    if (!link) return;

    e.preventDefault();

    const sectionId = link.dataset.goSection;
    const targetUrl = new URL(link.getAttribute("href"), window.location.origin);

    sessionStorage.setItem("goToSection", sectionId);

    const cleanCurrentPath = cleanPath(window.location.pathname);
    const cleanTargetPath = cleanPath(targetUrl.pathname);

    if (cleanCurrentPath === cleanTargetPath) {
      sessionStorage.removeItem("goToSection");
      scrollToSection(sectionId);
      cleanUrl();
      return;
    }

    window.location.href = targetUrl.pathname;
  });

  const sectionId = sessionStorage.getItem("goToSection");
  if (!sectionId) return;

  sessionStorage.removeItem("goToSection");

  setTimeout(() => {
    scrollToSection(sectionId);
    cleanUrl();
  }, 450);
}


function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  section.scrollIntoView({
    behavior: "smooth",
    block: "start"
  });
}


function cleanUrl() {
  history.replaceState(
    null,
    "",
    window.location.pathname + window.location.search
  );
}


function cleanPath(path) {
  return path
    .replace("/index.html", "/")
    .replace(".html", "")
    .replace(/\/$/, "") || "/";
}


function cleanNavPath(path) {
  let clean = path
    .replace("/index.html", "/")
    .replace(".html", "")
    .replace(/\/$/, "");

  if (clean === "") clean = "/";

  if (clean === "/temasfe") clean = "/biblioteca";
  if (clean === "/coronillayhorasanta") clean = "/coronilla-hora-santa";
  if (clean === "/papa-leon-xiv.html") clean = "/papa-leon-xiv-nuevo";

  return clean;
}