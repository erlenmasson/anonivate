//
//------- Custom Cursor -------//
//

console.log("Custom Cursor");

document.addEventListener("DOMContentLoaded", function () {
  initCustomCursor();
  window.addEventListener("resize", initCustomCursor);
});

function addDataAttributesToElements() {
  // Buttons
  document.querySelectorAll("a.button, .button").forEach((btn) => {
    if (!btn.hasAttribute("data-cursor")) {
      // Check if the attribute doesn't exist and set it to "pointer"
      btn.setAttribute("data-cursor", "pointer");
    }
  });

  // Link
  // document.querySelectorAll("a:not(.button)").forEach((link) => {
  //   if (!link.hasAttribute("data-cursor")) {
  //     // Check if the attribute doesn't exist and it's not a button-styled link
  //     link.setAttribute("data-cursor", "pointer");
  //   }
  // });

  // Form inputs
  document.querySelectorAll(".form-input").forEach((input) => {
    if (!input.hasAttribute("data-cursor")) {
      // Check if the attribute doesn't exist
      input.setAttribute("data-cursor", "text");
    }
  });
}

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function initCustomCursor() {
  if (!isTouchDevice() && window.innerWidth >= 991) {
    addDataAttributesToElements();
    customCursor();
    applyCursors();
  }
}

function customCursor() {
  const cursor = document.querySelector(".cursor-custom");
  const cursorInner = document.querySelector(".cursor-release");

  document.addEventListener("mousemove", function (e) {
    cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    cursorInner.style.left = `${e.clientX}px`;
    cursorInner.style.top = `${e.clientY}px`;
  });

  document.addEventListener("mousedown", function () {
    cursorInner.classList.add("cursor-pressed");
  });

  document.addEventListener("mouseup", function () {
    cursorInner.classList.remove("cursor-pressed");
  });
}

function applyCursors() {
  const cursor = document.querySelector(".cursor-custom");
  document.querySelectorAll("[data-cursor]").forEach((item) => {
    item.addEventListener("mouseover", () => {
      const cursorType = item.getAttribute("data-cursor");
      cursor.classList.add("cursor-action", `cursor-${cursorType}`);
    });
    item.addEventListener("mouseleave", () => {
      const cursorType = item.getAttribute("data-cursor");
      cursor.classList.remove("cursor-action", `cursor-${cursorType}`);
    });
  });
}

// Splide Cursors

function splideCursors() {
  const cursor = document.querySelector(".cursor-custom");

  // Add cursor styles for .btn_external within .splide on mouseover
  document
    .querySelectorAll(".splide .btn_external[data-cursor]")
    .forEach((btn) => {
      btn.addEventListener("mouseover", () => {
        const cursorType = btn.getAttribute("data-cursor");
        cursor.classList.add("cursor-action", `cursor-${cursorType}`);
      });

      // Remove cursor styles when the mouse leaves .btn_external
      btn.addEventListener("mouseleave", () => {
        cursor.classList.remove(
          "cursor-action",
          `cursor-${btn.getAttribute("data-cursor")}`
        );
      });
    });
}

// Make sure to call splideCursors() after your page content has loaded
document.addEventListener("DOMContentLoaded", splideCursors);
