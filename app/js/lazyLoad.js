const lazyLoad = target => {
  const io = new IntersectionObserver((entires, observer) => {
    entires.forEach(entry => {
      if (entry.isIntersecting) {
        console.log("LazyLoaded!");

        const img = entry.target;
        const src = img.getAttribute("data-lazy");

        img.setAttribute("src", src);
        if (img.classList.contains("main__thumb")) {
          img.parentElement.classList.add("scale-up-center");
        }

        observer.disconnect();
      }
    });
  });

  io.observe(target);
};

export default lazyLoad;
