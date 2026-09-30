const slides = [...document.querySelectorAll(".slide")];
const count = document.querySelector(".slide-count");
const progress = document.querySelector(".progress");
let current = Math.max(0, Math.min(slides.length - 1, Number(location.hash.slice(1) || 1) - 1));
let performanceTimers = [];

function show(index, updateHash = true) {
  current = Math.max(0, Math.min(slides.length - 1, index));
  slides.forEach((slide, position) => {
    const active = position === current;
    slide.classList.toggle("active", active);
    slide.setAttribute("aria-hidden", String(!active));
  });
  if (count) count.textContent = `${current + 1} / ${slides.length}`;
  if (progress) progress.style.width = `${((current + 1) / slides.length) * 100}%`;
  if (updateHash) history.replaceState(null, "", `#${current + 1}`);
  document.title = `${slides[current].dataset.title || slides[current].querySelector("h1,h2")?.textContent || "Talk"} · ${document.body.dataset.deckTitle}`;
}

function next() { show(current + 1); }
function previous() { show(current - 1); }

document.querySelector("[data-next]")?.addEventListener("click", next);
document.querySelector("[data-previous]")?.addEventListener("click", previous);

window.addEventListener("keydown", (event) => {
  if (document.body.classList.contains("performance-running")) return;
  if (["ArrowRight", "PageDown", " "].includes(event.key)) { event.preventDefault(); next(); }
  if (["ArrowLeft", "PageUp", "Backspace"].includes(event.key)) { event.preventDefault(); previous(); }
  if (event.key === "Home") show(0);
  if (event.key === "End") show(slides.length - 1);
});

let touchStart = 0;
window.addEventListener("touchstart", (event) => { touchStart = event.changedTouches[0].clientX; }, { passive: true });
window.addEventListener("touchend", (event) => {
  const distance = event.changedTouches[0].clientX - touchStart;
  if (Math.abs(distance) > 60) distance < 0 ? next() : previous();
}, { passive: true });

document.querySelector("[data-performance]")?.addEventListener("click", async () => {
  const durations = (document.body.dataset.durations || "").split(",").map(Number).filter(Boolean);
  if (durations.length !== slides.length) return;
  show(0);
  document.body.classList.add("performance-running");
  try { await document.documentElement.requestFullscreen?.(); } catch (_) {}
  let elapsed = 0;
  durations.forEach((duration, index) => {
    elapsed += duration;
    performanceTimers.push(setTimeout(() => {
      if (index + 1 < slides.length) show(index + 1, false);
      else document.body.classList.add("performance-ended");
    }, elapsed));
  });
});

show(current, false);
