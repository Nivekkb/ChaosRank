const trending = [
  'Certified Unhinged',
  'Office Slack Sabotage',
  'Cursed Meme Drop',
  'Dangerous Dating Bio',
  'Impromptu Startup Idea',
  'Midnight Confession',
  'AI-terrorized Bio',
  'Micro-dose Rant'
];

const list = document.getElementById('rankList');

const mutateTitle = (title) => {
  const reactions = ['WTF', 'Certified', 'Public Menace', 'Glow Up', 'Exposed'];
  const reaction = reactions[Math.floor(Math.random() * reactions.length)];
  return `${reaction} ${title.split(' ')[0] || title}`;
};

const shuffle = () => {
  for (let i = trending.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [trending[i], trending[j]] = [trending[j], trending[i]];
  }
};

const refresh = () => {
  shuffle();
  list.innerHTML = '';
  trending.slice(0, 6).forEach((item, index) => {
    const li = document.createElement('li');
    const label = document.createElement('span');
    label.className = 'rank-label';
    label.textContent = `#${index + 1}`;
    const title = document.createElement('span');
    title.className = 'rank-title';
    title.textContent = mutateTitle(item);
    li.append(label, title);
    list.appendChild(li);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  refresh();
  setInterval(refresh, 1800);
});
