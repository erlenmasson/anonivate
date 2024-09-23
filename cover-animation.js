//
//------- Cover Animation -------//
//

function coverAnimations() {
  const cover = document.querySelector(".cover");
  const coverBackground = document.querySelector(".cover_background");

  const coverContent = document.querySelector(".cover_content");
  const coverContentContainer = document.querySelector(
    ".cover_content-container"
  );

  const coverHeading = document.querySelector(".cover_heading");
  const bgCoverVideo = document.querySelector(".bg_cover-video");

  const split = new SplitText(coverHeading, { type: "words" });

  gsap.set(split.words, {
    opacity: 0,
    // filter: "blur(1px)"
  });

  const fadeInTimeline = gsap.timeline();

  fadeInTimeline.to(split.words, {
    opacity: 1,
    ease: "power1.inOut",
    stagger: 0.2,
    duration: 1.4,
    delay: 1.5,
  });

  const coverHeightStart = window.innerWidth < 768 ? "100svh" : "100vh";
  const coverHeightEnd = window.innerWidth < 768 ? "50svh" : "100vh";

  gsap.set([cover, coverBackground, coverContent], {
    height: coverHeightStart,
  });
  gsap.set(bgCoverVideo, { height: "130%" });
  gsap.set(coverContent, {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: cover,
      start: "top top",
      end: "bottom -50%",
      scrub: true,
      pin: cover,
    },
  });

  tl.to(coverContentContainer, { opacity: 0, scale: 0.9, duration: 1 }, 0)
    .to(coverContent, { backgroundColor: "rgba(0, 0, 0, 0)", duration: 0.5 }, 0)
    .to(bgCoverVideo, { height: "100%", duration: 2 }, "<")
    .to(
      [cover, coverBackground, coverContent],
      {
        height: coverHeightEnd,
        duration: 2,
      },
      "<"
    );
}
