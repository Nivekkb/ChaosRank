const messages = [
  'We define backlash, then soften it.',
  'Chaos, curated.',
  'Culture isn’t calm—controller needed.',
  'Serenix Digital seats the riot.'
];

const pulse = document.getElementById('pulseLine');

let idx = 0;

const cycleMessage = () => {
  pulse.textContent = messages[idx];
  idx = (idx + 1) % messages.length;
};

document.addEventListener('DOMContentLoaded', () => {
  if (!pulse) return;
  cycleMessage();
  setInterval(cycleMessage, 2500);
});
