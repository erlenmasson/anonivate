/**
 * Script Purpose: GSAP Text Animations
 * Author: Erlen Masson
 * Version: 1
 * Started: 16th September 2024
 */

console.log("Script - Text Animations");

// Array to store SplitText instances
var splitTextInstances = [];

document.addEventListener("DOMContentLoaded", () => {
  fadeAnimations();
});

// Function for fade animations
function fadeAnimations() {
  var fadeStart = gsap.utils.clamp(
    0,
    window.innerHeight,
    window.innerWidth < 768 ? "top 100%" : "top 85%"
  ); // Clamped fadeStart value
  var fadeEnd = window.innerWidth < 768 ? "top 60%" : "bottom 75%"; // Mobile : Desktop
  var fadeEnd2 = window.innerWidth < 768 ? "top 50%" : "bottom 75%"; // Mobile : Desktop

  // Clear previous instances
  splitTextInstances.forEach((instance) => instance.revert());
  splitTextInstances = [];

  // Fade-In Text by Characters
  gsap.utils.toArray("[data-fade='chars']").forEach((element) => {
    const split = new SplitText(element, { type: "chars" });
    splitTextInstances.push(split); // Store instance
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
  gsap.utils.toArray("[data-fade='words']").forEach((element) => {
    const split = new SplitText(element, { type: "words" });
    splitTextInstances.push(split); // Store instance
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
  gsap.utils.toArray("[data-fade='lines']").forEach((element) => {
    const split = new SplitText(element, { type: "lines" });
    splitTextInstances.push(split); // Store instance
    gsap.set(split.lines, { opacity: 0 });
    gsap
      .timeline({
        scrollTrigger: {
          trigger: element,
          start: fadeStart,
          end: fadeEnd,
          scrub: true,
          // markers: true,
        },
      })
      .to(split.lines, {
        opacity: 1,
        ease: "power1.inOut",
        stagger: 0.15,
      });
  });

  // Fade-In Rich Text by Lines
  gsap.utils.toArray("[data-fade='rich-text']").forEach((richTextElement) => {
    gsap.utils
      .toArray(
        richTextElement.querySelectorAll(
          "h1, h2, h3, h4, h5, h6, p, li, li::marker, blockquote"
        )
      )
      .forEach((element) => {
        const split = new SplitText(element, { type: "lines" });
        splitTextInstances.push(split); // Store instance
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
  gsap.utils.toArray("[data-fade='element']").forEach((element) => {
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
  gsap.utils.toArray("[data-fade='list']").forEach((list) => {
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
}

// Ensure fonts are loaded before running animations
document.fonts.ready
  .then(function () {
    console.log("Fonts loaded successfully");
    fadeAnimations();
  })
  .catch(function () {
    console.error("Font loading error");
  });
