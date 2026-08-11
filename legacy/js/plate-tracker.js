import Glide from "@glidejs/glide";

var glide = new Glide("#glide-carousel", {
  type: "carousel",
  focusAt: "center",
  perView: 4,
  breakpoints: {
    1000: { perView: 1 },
    1200: { perView: 2 },
    1600: { perView: 3 },
    2400: { perView: 4 },
  },
});

glide.mount();
