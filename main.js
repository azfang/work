/* ------------------- */
/* Lenis */
/* ------------------- */

const lenis = new Lenis({
  duration: 1,
  smoothWheel: true
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

/* ------------------- */
/* Scroll Scaling */
/* ------------------- */

const panels =
  document.querySelectorAll(".panel");

function updatePanels() {

  const viewportCenter =
    window.innerHeight / 2;

  panels.forEach(panel => {

    const rect =
      panel.getBoundingClientRect();

    const center =
      rect.top + rect.height / 2;

    const distance =
      Math.abs(viewportCenter - center);

    const normalized =
      Math.min(
        distance / (window.innerHeight * 0.8),
        1
      );

    const scale =
      0.95 + ((1 - normalized) * 0.15);

    panel.style.transform =
      `scale(${scale})`;

  });

}

function animate() {
  updatePanels();
  requestAnimationFrame(animate);
}

animate();

/* ------------------- */
/* Clock */
/* ------------------- */

function showDateTime() {
        let showDate = document.getElementById("showDate");
        let hrs = document.getElementById("hrs");
        let min = document.getElementById("min");
        let sec = document.getElementById("sec");

        const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
        ];

        // create a JavaScript Date object
        let date = new Date();
        // getDate() - date
        // getMonth() - month in number (0-11)
        // getFullYear() - 4 digit year 
        // getHours()
        // getMinutes()
        // getSeconds()

        let dispDate = date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
        showDate.innerHTML = dispDate;

        let dispHrs = date.getHours();
        let dispMin = date.getMinutes();
        let dispSec = date.getSeconds();

        // if values are < 10 prefix 0
        dispHrs = (dispHrs < 10 ? "0" : "") + dispHrs; 
        dispMin = (dispMin < 10 ? "0" : "") + dispMin; 
        dispSec = (dispSec < 10 ? "0" : "") + dispSec; 

        hrs.innerHTML = dispHrs;
        min.innerHTML = dispMin;
        sec.innerHTML = dispSec;
    }

setInterval(showDateTime, 0);

/* ------------------- */
/* Cursor */
/* ------------------- */

const cursor =
  document.getElementById("cursor");

const cursorDirection =
  document.querySelector(".cursor-direction");

const cursorCount =
  document.querySelector(".cursor-count");

document.addEventListener(
  "mousemove",
  e => {

    cursor.style.left =
      e.clientX + "px";

    cursor.style.top =
      e.clientY + "px";
  }
);

/* ------------------- */
/* Carousels */
/* ------------------- */

document
  .querySelectorAll(".carousel")
  .forEach(carousel => {

    const images =
      carousel.querySelectorAll("img");

    const imageCount =
      images.length;

    /* ---------- Single image ---------- */

    if (imageCount <= 1) {

      carousel.classList.remove("multi-image");

      carousel.addEventListener(
        "mouseenter",
        () => {
          cursor.style.opacity = 0;
        }
      );

      return;
    }

    /* ---------- Multi image ---------- */

    carousel.classList.add("multi-image");

    let current = 0;

    function updateImages() {

      images.forEach(img =>
        img.classList.remove("active")
      );

      images[current]
        .classList.add("active");

      cursorCount.textContent =
        `${current + 1} / ${imageCount}`;

    }

    updateImages();

    carousel.addEventListener(
      "mouseenter",
      () => {

        cursor.style.opacity = 1;

        cursorCount.textContent =
          `${current + 1} / ${imageCount}`;
      }
    );

    carousel.addEventListener(
      "mouseleave",
      () => {

        cursor.style.opacity = 0;
      }
    );

    carousel.addEventListener(
      "mousemove",
      e => {

        const bounds =
          carousel.getBoundingClientRect();

        const x =
          e.clientX - bounds.left;

        if (x < bounds.width / 2) {

          cursorDirection.textContent =
            "Previous";

        } else {

          cursorDirection.textContent =
            "Next";
        }
      }
    );

    carousel.addEventListener(
      "click",
      e => {

        const bounds =
          carousel.getBoundingClientRect();

        const x =
          e.clientX - bounds.left;

        if (x < bounds.width / 2) {

          current =
            (current - 1 + imageCount)
            % imageCount;

        } else {

          current =
            (current + 1)
            % imageCount;
        }

        updateImages();
      }
    );

  });

/* ------------------- */
/* Caption Positioning */
/* ------------------- */

function classifyImages() {

  document
    .querySelectorAll(".carousel img")
    .forEach(img => {

      if (!img.complete) return;

      const ratio =
        img.naturalWidth /
        img.naturalHeight;

      if (ratio < 1) {

        img.classList.add("portrait");

      } else {

        img.classList.remove("portrait");
      }

    });

}

window.addEventListener(
  "load",
  classifyImages
);