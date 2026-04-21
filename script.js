class Progress {
  constructor(container) {
    this.value = 60;
    this.animated = true;
    this.hidden = false;

    this.container = container;

    this.render();
    this.update();
  }

  render() {
    this.wrapper = document.createElement("div");
    this.wrapper.className = "progress";

    this.wrapper.innerHTML = `
      <svg viewBox="0 0 200 200">
        <circle
          cx="100"
          cy="100"
          r="72"
          stroke="#dfe5eb"
          stroke-width="16"
          fill="none"
        />
        <circle
          id="bar"
          cx="100"
          cy="100"
          r="72"
          stroke="#005cff"
          stroke-width="16"
          fill="none"
          stroke-linecap="butt"
          transform="rotate(-90 100 100)"
        />
      </svg>
    `;

    this.container.appendChild(this.wrapper);

    this.bar = this.wrapper.querySelector("#bar");

    this.radius = 72;
    this.length = 2 * Math.PI * this.radius;

    this.bar.style.strokeDasharray = this.length;
  }

  setValue(value) {
    this.value = Math.max(0, Math.min(100, value));
    this.update();
  }

  setAnimated(state) {
    this.animated = state;
    this.update();
  }

  setHidden(state) {
    this.hidden = state;
    this.update();
  }

  update() {
    const progress = this.value / 100;
    const offset = this.length * (1 - progress);

    this.bar.style.strokeDashoffset = offset;

    this.wrapper.classList.toggle("rotate", this.animated);
    this.wrapper.classList.toggle("hidden", this.hidden);
  }
}

const progress = new Progress(
  document.getElementById("progress-container")
);

const valueInput = document.getElementById("valueInput");
const animateToggle = document.getElementById("animateToggle");
const hideToggle = document.getElementById("hideToggle");

animateToggle.checked = true;

valueInput.addEventListener("input", (e) => {
  let value = parseInt(e.target.value, 10);

  if (isNaN(value)) value = 0;

  if (value < 0) value = 0;
  if (value > 100) value = 100;

  e.target.value = value;

  progress.setValue(value);
});

animateToggle.addEventListener("change", (e) => {
  progress.setAnimated(e.target.checked);
});

hideToggle.addEventListener("change", (e) => {
  progress.setHidden(e.target.checked);
});