/**
 * Script Purpose: Custom Code for Black Shift
 * Author: Erlen Masson
 * Version: 6
 * Created: 16th September 2024
 */

console.log("Script - Custom v6");

//
//------- Initialize on DOMContentLoaded -------//
//

document.addEventListener("DOMContentLoaded", () => {
  setupScrollSmoother();
  coverAnimations();
  stickyCards();
  logoSlider();
  portfolioSlider();
  stackSlider();
  displayDateTime();
});

//
//------- General Setup -------//
//

// Function to check if the device is a touch device
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

//
//------- Scroll Smoother -------//
//

function setupScrollSmoother() {
  if (!isTouchDevice()) {
    ScrollSmoother.create({
      smooth: 1.1,
      effects: true,
      smoothTouch: 0, // This value is for non-touch devices
    });
    ScrollTrigger.normalizeScroll(true); // Optional
  }
}

//
//------- Cover Animation -------//
//

function coverAnimations() {
  const sectionCover = document.querySelector(".section-cover");
  const cover = document.querySelector(".cover");

  const coverBackground = document.querySelector(".cover_background");
  const coverContent = document.querySelector(".cover_content");
  const coverContainer = document.querySelector(".cover_container");

  const coverHeading = document.querySelector(".cover_heading");
  const bgCoverVideo = document.querySelector(".bg_cover-video");

  // Split text animation
  const split = new SplitText(coverHeading, { type: "words" });

  gsap.set(split.words, { opacity: 0 });

  const fadeInTimeline = gsap.timeline();

  fadeInTimeline.to(split.words, {
    opacity: 1,
    ease: "power1.inOut",
    stagger: 0.2,
    duration: 1.4,
    delay: 1.5,
  });

  // Pin the coverBackground as you scroll inside sectionCover
  gsap.timeline({
    scrollTrigger: {
      trigger: sectionCover, // The trigger is the entire section
      start: "top top", // Pinning starts when sectionCover hits the top
      end: "bottom top", // Pinning duration: scroll for 100% of the viewport height
      scrub: true,
      pin: coverBackground, // Pin the coverBackground element
    },
  });
}

//
//------- Sticky Cards -------//
//

function stickyCards() {
  gsap.utils.toArray(".sticky-card").forEach((card, i, cards) => {
    const isLastCard = i === cards.length - 1;

    var stickyFadeStart = window.innerWidth < 768 ? "bottom 40%" : "bottom 60%";

    gsap.timeline({
      scrollTrigger: {
        trigger: card,
        start: stickyFadeStart,
        pin: true,
        end: () => `+=${window.innerHeight * 1}`,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const opacity = 1 - progress;
          const scale = 1 - progress;
          gsap.to(card, { opacity: opacity, scale: scale });
        },
      },
    });
  });
}

//
//------- Splide Sliders -------//
//

function logoSlider() {
  let logoSplides = document.querySelectorAll(".logo-slider");
  for (let splide of logoSplides) {
    new Splide(splide, {
      type: "loop",
      autoWidth: true,
      arrows: false,
      pagination: false,
      gap: "4rem",
      drag: false,
      autoScroll: { autoStart: true, speed: 1, pauseOnHover: false },
      breakpoints: { 600: { gap: "3rem", autoScroll: { speed: 0.5 } } },
    }).mount(window.splide.Extensions);
  }
}

function portfolioSlider() {
  let splides = document.querySelectorAll(".portfolio-slider");
  for (let splide of splides) {
    new Splide(splide, {
      autoWidth: true,
      arrows: false,
      pagination: false,
      focus: "center",
      gap: "2rem",
      type: "loop",
      drag: "free",
      autoScroll: { autoStart: true, speed: 1.5 },
      intersection: {
        inView: { autoScroll: true },
        outView: { autoScroll: false },
      },
      breakpoints: { 600: { autoScroll: { speed: 1 }, gap: "1rem" } },
    }).mount(window.splide.Extensions);
  }
}

function stackSlider() {
  let splides = document.querySelectorAll(".stack");
  for (let splide of splides) {
    new Splide(splide, {
      autoWidth: true,
      arrows: true,
      pagination: true,
      focus: "center",
      gap: "2rem",
      drag: true,
      snap: true,
      speed: 500,
      type: "loop",
      easing: "ease-out",
      autoScroll: { autoStart: true, speed: 1.5 },
      intersection: {
        inView: { autoScroll: true },
        outView: { autoScroll: false },
      },
      breakpoints: { 600: { gap: "1rem" } },
    }).mount(window.splide.Extensions);
  }
}

//
//------- Display Date -------//
//

function displayDateTime() {
  const dateOptions = { weekday: "short" };
  const timeOptions = { hour: "numeric", minute: "numeric", hour12: true };

  const currentDate = new Date();
  document.querySelector(".cover-date").textContent =
    currentDate.toLocaleDateString("en-US", dateOptions);
  document.querySelector(".cover-time").textContent =
    currentDate.toLocaleTimeString("en-US", timeOptions);
}
