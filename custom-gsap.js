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
    smooth: 1,
    effects: true,
    smoothTouch: 0, // This value is for non-touch devices
  });
  ScrollTrigger.normalizeScroll(true);
}

// Function to set the minimum height of .content for larger devices
function setMinHeightForContent() {
  const tabletWidth = 844;
  if (window.innerWidth > tabletWidth) {
    const lastPricingItem = document.querySelector(".pricing_item:last-child");
    const content = document.querySelector(".content");

    if (lastPricingItem && content) {
      const lastItemHeight = lastPricingItem.getBoundingClientRect().height;
      content.style.minHeight = `${lastItemHeight}px`;

      // Reinitialize ScrollTrigger for .content after setting min-height
      createContentScrollTrigger();
    }
  }
}

// Function to create ScrollTrigger for .content
function createContentScrollTrigger() {
  // Check if the ScrollTrigger already exists and kill it before recreating
  if (window.contentScrollTrigger) {
    window.contentScrollTrigger.kill();
  }

  window.contentScrollTrigger = ScrollTrigger.create({
    trigger: ".content",
    start: "top-=100 top",
    end: () => {
      const content = document.querySelector(".content");
      const contentLeft = document.querySelector(".content-left");
      const endPosition =
        contentLeft.offsetHeight - (content.offsetHeight + 100);
      return `top+=${endPosition}px`;
    },
    pin: true,
    pinSpacing: false,
    markers: false, // Set to true for debugging
  });
}

// Run the function after the window has fully loaded
window.onload = setMinHeightForContent;

// Update the minimum height and reinitialize ScrollTrigger on window resize
window.addEventListener("resize", setMinHeightForContent);

// ScrollTrigger for each .pricing_item
const marginSizePixels = 30; // Margin size in pixels
const pricingItems = document.querySelectorAll(".pricing_item");

pricingItems.forEach((pricingItem, index) => {
  const triggerSettings = {
    trigger: pricingItem,
    start: "bottom 50%",
    end:
      index === pricingItems.length - 1
        ? "bottom bottom"
        : `bottom-=${30 - marginSizePixels} top`,
    pin: true,
    anticipatePin: 1,
    scrub: true,
    markers: false,
  };

  if (index !== pricingItems.length - 1) {
    gsap.fromTo(
      pricingItem,
      { scale: 1, autoAlpha: 1 },
      { scale: 0.8, autoAlpha: 0, ease: "none", scrollTrigger: triggerSettings }
    );
  } else {
    ScrollTrigger.create(triggerSettings);
  }
});

// Animation for each .heading-style-huge element
const headings = document.querySelectorAll(".heading-style-huge");
headings.forEach((heading) => {
  const split = new SplitText(heading, { type: "chars" });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: heading,
        start: "top 90%",
        end: "bottom 50%",
        scrub: true,
      },
    })
    .from(split.chars, {
      duration: 0.6,
      autoAlpha: 0,
      ease: "power1.inOut",
      stagger: 0.05,
    });
});

// Select all elements with the class '.animated-text' for the animation
const animatedText = document.querySelectorAll(".animated-text");
animatedText.forEach((textElement) => {
  const split = new SplitText(textElement, { type: "lines" });
  gsap.set(split.lines, { opacity: 0 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: textElement,
        start: "top bottom",
        end: "bottom 75%",
        scrub: true,
      },
    })
    .to(
      split.lines,
      {
        opacity: 1,
        stagger: 0.1,
        ease: "power2.inOut",
      },
      0
    );
});

// Select all elements with the class '.animated-element' for the fade-in animation
const animatedElements = document.querySelectorAll(".animated-element");
animatedElements.forEach((animatedElement) => {
  gsap.set(animatedElement, { autoAlpha: 0 });
  gsap
    .timeline({
      scrollTrigger: {
        trigger: animatedElement,
        start: "top 90%",
        end: "top 65%",
        scrub: true,
        // markers: true // Uncomment for debugging
      },
    })
    .to(animatedElement, {
      autoAlpha: 1,
      ease: "power2.inOut",
    });
});

// Pin the navigation for the entire scroll length of the site
ScrollTrigger.create({
  trigger: ".main-wrapper",
  start: "top top",
  end: "bottom bottom",
  pin: ".navigation",
  pinSpacing: false,
});

// Create a timeline for the navigation height animation with .main-wrapper as the trigger
gsap
  .timeline({
    scrollTrigger: {
      trigger: ".main-wrapper",
      start: "top top",
      end: "top+=120vh",
      scrub: true,
    },
  })
  .set(".navigation", { height: "200px", maxHeight: "none" })
  .to(".navigation", { height: "80px", ease: "none" });

//

// GSAP ScrollTrigger for horizontal scrolling of .steps within .steps-container
let steps = document.querySelector(".steps");
let stepsContainer = document.querySelector(".steps-container");

let totalStepsWidth = 0;
document.querySelectorAll(".step").forEach((step) => {
  totalStepsWidth += step.offsetWidth;
});

let horizontalMoveDistance = totalStepsWidth - stepsContainer.offsetWidth;

let scrollTween = gsap.to(steps, {
  x: () => -horizontalMoveDistance,
  ease: "none",
  scrollTrigger: {
    trigger: stepsContainer,
    start: "top top",
    end: "bottom bottom",
    scrub: true,
    pin: steps,
    anticipatePin: 1,
    invalidateOnRefresh: true,
  },
});

// Function to set up text split and horizontal fade-in animation for each .step-heading
function setupTextSplitAnimation(step) {
  const headings = step.querySelectorAll(".step-heading");
  headings.forEach((heading) => {
    const split = new SplitText(heading, { type: "words" }); // Changed to "words"
    gsap.from(split.words, {
      // Changed to "words"
      duration: 0.6,
      //y: 20,
      opacity: 0,
      stagger: 0.05,
      ease: "power2.out",
      scrollTrigger: {
        trigger: headings,
        containerAnimation: scrollTween,
        start: "left 70%", // Adjust as needed
        end: "right 70%", // Adjust as needed
        scrub: true,
        markers: true, // Enable markers for debugging
      },
    });
  });
}

// Apply the text split animation to each .step
document.querySelectorAll(".step").forEach(setupTextSplitAnimation);
