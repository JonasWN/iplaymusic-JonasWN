const details = document.querySelectorAll("details");
const summaryItem = document.querySelectorAll(".summary__item");

details.forEach(detail => {
  detail.addEventListener("click", () => {
    if (detail.hasAttribute("open")) {
      summaryItem.forEach(item => {
        item.classList.remove("slide-in-bck-center");
      });
    } else {
      summaryItem.forEach(item => {
        item.classList.add("slide-in-bck-center");
      });
    }
  });
});
