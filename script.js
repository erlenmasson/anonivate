/**
 * Script Purpose: Custom Code
 * Author: Erlen Masson
 * Version: 5
 * Last Updated: 6th April 2024
 */

console.log("Custom JS anonivate v5");

//
//------- GSAP Animations -------//
//

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Function to check if the device is a touch device
function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

// Initialize ScrollSmoother only on non-touch devices
if (!isTouchDevice()) {
  ScrollSmoother.create({
    smooth: 1.1,
    effects: true,
    smoothTouch: 0, // This value is for non-touch devices
  });
  //  ScrollTrigger.normalizeScroll(true);
}

//
//------- Fade Animations-------//
//
function fadeAnimations() {
  var fadeStart = window.innerWidth < 768 ? "top 100%" : "top 85%"; // Mobile : Desktop
  var fadeEnd = window.innerWidth < 768 ? "bottom 60%" : "bottom 75%"; // Mobile : Desktop

  // Fade-In Text by Characters
  gsap.utils.toArray(".fade-in-chars").forEach((element) => {
    const split = new SplitText(element, { type: "chars" });
    gsap.set(split.chars, { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
        },
      })
      .to(split.chars, {
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.05,
      });
  });

  // Fade-In Text by Words
  gsap.utils.toArray(".fade-in-words").forEach((element) => {
    const split = new SplitText(element, { type: "words" });
    gsap.set(split.words, { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
        },
      })
      .to(split.words, {
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.1,
      });
  });

  // Fade-In Text by Lines
  gsap.utils.toArray(".fade-in-lines").forEach((element) => {
    const split = new SplitText(element, { type: "lines" });
    gsap.set(split.lines, { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
        },
      })
      .to(split.lines, {
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.15,
      });
  });

  // Fade-In Rich Text by Lines
  gsap.utils.toArray(".fade-in-rich-text").forEach((richTextElement) => {
    gsap.utils
      .toArray(
        richTextElement.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, li, li::marker, blockquote"
        )
      )
      .forEach((element) => {
        const split = new SplitText(element, { type: "lines" });
        gsap.set(split.lines, { opacity: 0 });
        gsap
          .timeline({
            scrollTrigger: {
              trigger: element,
              start: fadeStart,
              end: fadeEnd,
              scrub: true,
            },
          })
          .to(split.lines, {
            opacity: 1,
            ease: "power1.inOut",
            stagger: 0.15,
          });
      });
  });

  // Fade-In Elements
  gsap.utils.toArray(".fade-in-element").forEach((element) => {
    gsap.set(element, { opacity: 0, y: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "top 60%",
          scrub: true,
        },
      })
      .to(element, {
        opacity: 1,
        ease: "power2.inOut",
        y: 0,
      });
  });

  // Fade-In List
  gsap.utils.toArray(".fade-in-list").forEach((list) => {
    // Convert the HTMLCollection of children to an array for easier manipulation
    const items = gsap.utils.toArray(list.children); // Now targets all direct children as an array

    items.forEach((item) => {
      gsap.set(item, { opacity: 0 }); // Initial state for each item

      gsap.to(item, {
        opacity: 1,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: item,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
          //markers: true, // Uncomment for debugging
        },
      });
    });
  });

  // Fade-In Buttons
  var fadeBtnStart = window.innerWidth < 768 ? "top 90%" : "top 95%"; // Mobile : Desktop
  var fadeBtnEnd = window.innerWidth < 768 ? "top 80%" : "top 90%"; // Adjusted for demonstration

  gsap.utils.toArray(".product-link").forEach((btn) => {
    gsap.set(btn, { opacity: 0, y: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: btn,
          start: fadeBtnStart,
          end: fadeBtnEnd,
          scrub: true,
        },
      })
      .to(btn, {
        opacity: 1,
        ease: "power2.inOut",
        y: 0,
      });
  });
}

//
//------- Cover Animation -------//
//

function coverAnimations() {
  // Select the element and create a SplitText instance
  const coverHeadline = document.querySelector(".cover_headline");
  const split = new SplitText(coverHeadline, { type: "words" });

  // Set each word to be fully transparent
  gsap.set(split.words, { opacity: 0, filter: "blur(1px)" });

  // Create a timeline for the fade-in animation
  const fadeInTimeline = gsap.timeline();

  // Add the fade-in animation for each word to the timeline
  fadeInTimeline.to(split.words, {
    opacity: 1,
    filter: "blur(0px)",
    ease: "power1.inOut",
    stagger: 0.2,
    duration: 1.4,
    delay: 1.5,
  });

  // Set innitial states
  var coverHeightStart = window.innerWidth < 768 ? "100svh" : "100vh"; // Mobile : Desktop
  var coverHeightEnd = window.innerWidth < 768 ? "50svh" : "100vh"; // Mobile : Desktop
  gsap.set(".cover_wrapper, .cover_background, .cover_content-wrapper", {
    height: coverHeightStart,
  });
  gsap.set(".bg_cover-video", { height: "130%" });
  gsap.set(".cover_content-wrapper", {
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  });

  // Create a timeline
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".cover",
      start: "top top",
      end: "bottom -50%",
      scrub: true,
      pin: ".cover_wrapper",
      //markers: true,
    },
  });

  // End states
  tl.to(
    ".cover_content",
    {
      opacity: 0,
      scale: 0.9,
      duration: 1,
    },
    0
  )
    .to(
      ".cover_content-wrapper",
      {
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        duration: 0.5,
      },
      0
    )
    .to(
      ".bg_cover-video",
      {
        height: "100%",
        duration: 2,
      },
      "<"
    )
    .to(
      ".cover_wrapper, .cover_background, .cover_content-wrapper",
      {
        // Adjust the height of cover_wrapper as the last step
        height: coverHeightEnd,
        duration: 2,
      },
      "<"
    );
}

//
//------- Load animations after fonts loaded -------//
//

document.fonts.ready
  .then(function () {
    console.log("Fonts loaded");
    fadeAnimations();
    coverAnimations();
  })
  .catch(function () {
    console.error("Font loading error");
    // Fallback or additional error handling
  });

//
//------- Sticky Cards-------//
//
gsap.utils.toArray(".sticky-card").forEach((card, i, cards) => {
  const isLastCard = i === cards.length - 1;

  var stickyFadeStart = window.innerWidth < 768 ? "bottom 40%" : "bottom 60%"; // Mobile : Desktop Start value

  gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: stickyFadeStart,
      pin: true,
      end: () => `+=${window.innerHeight * 1}`,
      scrub: true,
      //markers: true,
      onUpdate: (self) => {
        const progress = self.progress;
        const opacity = 1 - progress;
        const scale = 1 - progress;
        gsap.to(card, { opacity: opacity, scale: scale });
      },
    },
  });
});

//
//------- Spline -------//
//
console.log("Custom Spline");

// Logo Carousel
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
      autoScroll: {
        autoStart: true,
        speed: 1,
        pauseOnHover: false,
      },
      breakpoints: {
        600: {
          gap: "3rem",
          autoScroll: { speed: 0.5 },
        },
      },
    }).mount(window.splide.Extensions);
  }
}
logoSlider();

// Portfolio Slider
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
portfolioSlider();

// Stack Slider
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
stackSlider();

//
//------- Display Date -------//
//

// Display current date and time
document.addEventListener("DOMContentLoaded", function () {
  const dateOptions = {
    weekday: "short",
    //year: "numeric",
    //month: "long",
    //day: "2-digit",
  };
  const timeOptions = {
    hour: "numeric",
    minute: "numeric",
    //second: "2-digit",
    hour12: true, // Use `true` for AM/PM format
  };

  const currentDate = new Date();

  document.querySelector(".cover-date").textContent =
    currentDate.toLocaleDateString("en-US", dateOptions);
  document.querySelector(".cover-time").textContent =
    currentDate.toLocaleTimeString("en-US", timeOptions);
});
