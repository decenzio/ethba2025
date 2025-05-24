const beAlive = () => {
  let track = document.getElementById("emoji-walk-track");
  if (!track) {
    track = document.createElement("div");
    track.id = "emoji-walk-track";
    track.className = "pointer-events-none fixed top-0 left-0 w-full h-full z-50";
    document.body.appendChild(track);
  }

  let angle = 0;
  let x = 30;
  let y = window.innerHeight / 2;
  let direction = Math.random() * 2 * Math.PI;

  const steps = ["🐾", "🐾", "🐾", "🐾"];
  const offsets = [
    { x: -10, y: -10 }, // left front
    { x: 10, y: -10 }, // right front
    { x: -10, y: 10 }, // left back
    { x: 10, y: 10 }, // right back
  ];
  let stepIndex = 0;

  const walk = () => {
    // 10% šanca, že mačička si dá pauzu
    if (Math.random() < 0.1) {
      setTimeout(walk, 800);
      return;
    }

    const step = document.createElement("div");
    step.textContent = steps[stepIndex];
    step.style.position = "absolute";
    const offset = offsets[stepIndex];
    const rotatedX = offset.x * Math.cos((angle * Math.PI) / 180) - offset.y * Math.sin((angle * Math.PI) / 180);
    const rotatedY = offset.x * Math.sin((angle * Math.PI) / 180) + offset.y * Math.cos((angle * Math.PI) / 180);
    step.style.left = `${x + rotatedX}px`;
    step.style.top = `${y + rotatedY}px`;
    step.style.fontSize = "24px";
    step.style.transition = "opacity 1.5s ease, transform 0.5s ease";

    // náhodné zrýchlenie a smer
    const speed = 50 + Math.random() * 20;
    direction += (Math.random() - 0.5) * 0.5;
    const dx = Math.cos(direction) * speed;
    const dy = Math.sin(direction) * speed;

    const newAngle = Math.atan2(dy, dx) * (180 / Math.PI);
    angle = angle * 0.7 + newAngle * 0.3;
    step.style.transform = `rotate(${angle}deg)`;
    stepIndex = (stepIndex + 1) % steps.length;

    track.appendChild(step);

    setTimeout(() => {
      step.style.opacity = "0";
      setTimeout(() => track.removeChild(step), 1500);
    }, 1500);

    x = Math.max(0, Math.min(window.innerWidth - 40, x + dx));
    y = Math.max(0, Math.min(window.innerHeight - 40, y + dy));

    requestAnimationFrame(() => setTimeout(walk, 400));
  };

  walk();
};

export const importantLivingBeing = {
  beAlive,
};
