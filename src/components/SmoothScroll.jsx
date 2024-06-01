import { useEffect } from "react";
import SmoothScroll from "smooth-scroll";

const ScrollTopBtn = () => {
  useEffect(() => {
    // Initialize SmoothScroll
    // eslint-disable-next-line no-unused-vars
    const scroll = new SmoothScroll('a[href*="#"]', {
      speed: 800,
      easing: "easeInOutCubic",
    });

    // Show/Hide Scroll to Top button based on scroll position
    const scrollFunction = () => {
      const btn = document.getElementById("myBtn");
      if (btn) {
        if (
          document.body.scrollTop > 20 ||
          document.documentElement.scrollTop > 20
        ) {
          btn.style.display = "block";
        } else {
          btn.style.display = "none";
        }
      }
    };

    window.addEventListener("scroll", scrollFunction);

    return () => {
      // Cleanup event listener
      window.removeEventListener("scroll", scrollFunction);
    };
  }, []);

  // Scroll to Top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <button
      onClick={scrollToTop}
      id="myBtn"
      title="Go to top"
      style={{ display: "none" }}
    >
      <i className="fa-solid fa-arrow-up"></i>
    </button>
  );
};

export default ScrollTopBtn;
