document.addEventListener("DOMContentLoaded", () => {
  const dropdowns = document.querySelectorAll("[data-dd]");

  function closeAll(except = null) {
    dropdowns.forEach((dd) => {
      if (dd === except) return;

      const trigger = dd.querySelector(".dd-trigger");
      const menu = dd.querySelector(".dd-menu");

      dd.classList.remove("open");
      if (trigger) trigger.setAttribute("aria-expanded", "false");
      if (menu) menu.hidden = true;
    });
  }

  function setOpen(dd, open) {
    const trigger = dd.querySelector(".dd-trigger");
    const menu = dd.querySelector(".dd-menu");

    if (open) closeAll(dd);

    dd.classList.toggle("open", open);
    if (trigger) trigger.setAttribute("aria-expanded", open ? "true" : "false");
    if (menu) menu.hidden = !open;
  }

  dropdowns.forEach((dd) => {
    const trigger = dd.querySelector(".dd-trigger");
    const menu = dd.querySelector(".dd-menu");

    if (!trigger || !menu) return;

    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const isOpen = dd.classList.contains("open");
      setOpen(dd, !isOpen);
    });

    menu.addEventListener("click", (e) => {
      if (e.target.closest("a")) {
        setOpen(dd, false);
      }
    });
  });

  document.addEventListener("click", () => {
    closeAll();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
    }
  });
});