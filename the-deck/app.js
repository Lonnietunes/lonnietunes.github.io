/* ── State ── */
const state = {
  currentCategory: null,
  queue: [],           // question objects for this session, ordered
  seen: new Set(),     // IDs that have been shown (answered or skipped)
  skippedTags: new Set()
};

/* ── DOM refs ── */
const screens = {
  landing:   document.getElementById('screen-landing'),
  questions: document.getElementById('screen-questions'),
  done:      document.getElementById('screen-done')
};

const categoryGrid  = document.getElementById('category-grid');
const questionCard  = document.getElementById('question-card');
const questionText  = document.getElementById('question-text');
const progressBar   = document.getElementById('progress-bar');
const pillIcon      = document.getElementById('pill-icon');
const pillName      = document.getElementById('pill-name');
const hintSkip      = document.getElementById('hint-skip');
const hintAnswer    = document.getElementById('hint-answer');
const doneIcon      = document.getElementById('done-icon');

/* ── Screen transitions ── */
function showScreen(id) {
  Object.values(screens).forEach(s => s.classList.remove('active'));
  screens[id].classList.add('active');
}

/* ── Build category grid ── */
function initCategoryGrid() {
  const { categories } = window.QUESTIONS_DATA;

  categories.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.category = cat.id;
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', cat.name);

    card.innerHTML = `
      <div class="card-inner">
        <div class="card-face card-front">
          <div class="card-icon">${cat.icon}</div>
          <span class="card-name">${cat.name}</span>
          <span class="card-desc">${cat.description}</span>
        </div>
        <div class="card-face card-back"></div>
      </div>
    `;

    card.addEventListener('click', () => enterCategory(card, cat.id));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') enterCategory(card, cat.id);
    });

    categoryGrid.appendChild(card);
  });
}

/* ── Enter a category ── */
function enterCategory(cardEl, categoryId) {
  if (cardEl.classList.contains('is-flipping')) return;

  cardEl.classList.add('is-flipping');

  setTimeout(() => {
    setupCategory(categoryId);
    showScreen('questions');
    cardEl.classList.remove('is-flipping');
  }, 460);
}

/* ── Set up question queue for a category ── */
function setupCategory(categoryId) {
  const cat = window.QUESTIONS_DATA.categories.find(c => c.id === categoryId);
  state.currentCategory = cat;
  state.seen.clear();
  state.skippedTags.clear();

  let questions;
  if (categoryId === 'lucky') {
    // Equal representation from each real category, interleaved then shuffled
    const realIds = ['spark', 'drive', 'world', 'core'];
    const pools = realIds.map(id =>
      shuffle(window.QUESTIONS_DATA.questions.filter(q => q.category === id))
    );
    const take = Math.min(...pools.map(p => p.length));
    // Interleave so each category appears at roughly equal intervals
    const interleaved = [];
    for (let i = 0; i < take; i++) {
      pools.forEach(pool => interleaved.push(pool[i]));
    }
    questions = shuffle(interleaved);
  } else {
    questions = window.QUESTIONS_DATA.questions.filter(q => q.category === categoryId);
  }

  state.queue = shuffle([...questions]);

  // Update header
  pillIcon.innerHTML = cat.icon;
  pillName.textContent = cat.name;
  document.body.dataset.category = categoryId;

  showNextQuestion();
}

/* ── Get next question, deprioritizing skipped tags ── */
function getNextQuestion() {
  const unseen = state.queue.filter(q => !state.seen.has(q.id));
  if (unseen.length === 0) return null;

  // Prefer questions with no overlap with skippedTags
  const preferred = unseen.filter(q =>
    !q.tags.some(t => state.skippedTags.has(t))
  );

  return preferred.length > 0 ? preferred[0] : unseen[0];
}

/* ── Show the next question ── */
function showNextQuestion() {
  const q = getNextQuestion();

  if (!q) {
    showDone();
    return;
  }

  updateProgress();
  questionText.textContent = q.text;

  // Reset card position and trigger enter animation
  questionCard.style.transition = 'none';
  questionCard.style.transform = '';
  questionCard.style.opacity = '';
  questionCard.style.boxShadow = '';

  questionCard.classList.remove('is-entering');
  void questionCard.offsetWidth; // reflow
  questionCard.classList.add('is-entering');

  questionCard.dataset.currentId = q.id;
}

/* ── Handle answer (✓) ── */
function handleAnswer() {
  const id = parseInt(questionCard.dataset.currentId, 10);
  if (!id || state.seen.has(id)) return;

  state.seen.add(id);
  animateOut('right', showNextQuestion);
}

/* ── Handle skip (×) ── */
function handleSkip() {
  const id = parseInt(questionCard.dataset.currentId, 10);
  if (!id || state.seen.has(id)) return;

  state.seen.add(id);

  // Add the question's tags to skippedTags
  const q = window.QUESTIONS_DATA.questions.find(q => q.id === id);
  if (q) q.tags.forEach(t => state.skippedTags.add(t));

  animateOut('left', showNextQuestion);
}

/* ── Animate card out, then callback ── */
function animateOut(direction, callback) {
  const x = direction === 'right' ? '120%' : '-120%';
  const rot = direction === 'right' ? '12deg' : '-12deg';
  questionCard.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 1, 1), opacity 0.3s ease';
  questionCard.style.transform = `translateX(${x}) rotate(${rot})`;
  questionCard.style.opacity = '0';
  setTimeout(callback, 310);
}

/* ── Progress bar ── */
function updateProgress() {
  const total = state.queue.length;
  const done = state.seen.size;
  progressBar.style.width = total > 0 ? `${(done / total) * 100}%` : '0%';
}

/* ── Done screen ── */
function showDone() {
  const cat = state.currentCategory;
  doneIcon.innerHTML = cat ? cat.icon : '';
  if (cat) doneIcon.style.color = cat.color;
  showScreen('done');
}

/* ── Button events ── */
document.getElementById('skip-btn').addEventListener('click', handleSkip);
document.getElementById('answer-btn').addEventListener('click', handleAnswer);

document.getElementById('back-btn').addEventListener('click', goBack);
document.getElementById('done-back-btn').addEventListener('click', goBack);

function goBack() {
  document.body.removeAttribute('data-category');
  showScreen('landing');
}

/* ── Keyboard navigation ── */
document.addEventListener('keydown', e => {
  if (!screens.questions.classList.contains('active')) return;
  if (e.key === 'ArrowRight' || e.key === 'Enter') handleAnswer();
  if (e.key === 'ArrowLeft'  || e.key === 'Escape') handleSkip();
});

/* ── Touch / swipe ── */
let touchStartX = 0;
let touchStartY = 0;
let isDragging  = false;
const SWIPE_THRESHOLD = 70;
const HINT_THRESHOLD  = 30;

questionCard.addEventListener('touchstart', e => {
  if (!screens.questions.classList.contains('active')) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
  isDragging  = true;
  questionCard.style.transition = 'none';
}, { passive: true });

questionCard.addEventListener('touchmove', e => {
  if (!isDragging) return;
  const dx = e.touches[0].clientX - touchStartX;
  const dy = e.touches[0].clientY - touchStartY;

  // Only intercept horizontal swipes
  if (Math.abs(dy) > Math.abs(dx) + 10) return;

  const rot = dx * 0.04;
  questionCard.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;

  // Tint shadow
  if (dx > HINT_THRESHOLD) {
    questionCard.style.boxShadow = `0 8px 32px rgba(122, 158, 130, 0.25)`;
    hintAnswer.style.opacity = Math.min(1, (dx - HINT_THRESHOLD) / 60).toString();
    hintSkip.style.opacity = '0';
  } else if (dx < -HINT_THRESHOLD) {
    questionCard.style.boxShadow = `0 8px 32px rgba(196, 117, 106, 0.25)`;
    hintSkip.style.opacity = Math.min(1, (-dx - HINT_THRESHOLD) / 60).toString();
    hintAnswer.style.opacity = '0';
  } else {
    questionCard.style.boxShadow = '';
    hintSkip.style.opacity = '0';
    hintAnswer.style.opacity = '0';
  }
}, { passive: true });

questionCard.addEventListener('touchend', e => {
  if (!isDragging) return;
  isDragging = false;
  hintSkip.style.opacity = '0';
  hintAnswer.style.opacity = '0';

  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > SWIPE_THRESHOLD) {
    dx > 0 ? handleAnswer() : handleSkip();
  } else {
    // Snap back
    questionCard.style.transition = 'transform 0.35s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.2s ease';
    questionCard.style.transform = '';
    questionCard.style.boxShadow = '';
  }
});

/* ── Mouse drag (desktop preview of swipe) ── */
let mouseDown = false;
let mouseStartX = 0;

questionCard.addEventListener('mousedown', e => {
  mouseDown = true;
  mouseStartX = e.clientX;
  questionCard.style.transition = 'none';
  questionCard.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', e => {
  if (!mouseDown || !screens.questions.classList.contains('active')) return;
  const dx = e.clientX - mouseStartX;
  const rot = dx * 0.04;
  questionCard.style.transform = `translateX(${dx}px) rotate(${rot}deg)`;

  if (dx > HINT_THRESHOLD) {
    questionCard.style.boxShadow = `0 8px 32px rgba(122, 158, 130, 0.25)`;
    hintAnswer.style.opacity = Math.min(1, (dx - HINT_THRESHOLD) / 60).toString();
    hintSkip.style.opacity = '0';
  } else if (dx < -HINT_THRESHOLD) {
    questionCard.style.boxShadow = `0 8px 32px rgba(196, 117, 106, 0.25)`;
    hintSkip.style.opacity = Math.min(1, (-dx - HINT_THRESHOLD) / 60).toString();
    hintAnswer.style.opacity = '0';
  } else {
    questionCard.style.boxShadow = '';
    hintSkip.style.opacity = '0';
    hintAnswer.style.opacity = '0';
  }
});

document.addEventListener('mouseup', e => {
  if (!mouseDown) return;
  mouseDown = false;
  questionCard.style.cursor = '';
  hintSkip.style.opacity = '0';
  hintAnswer.style.opacity = '0';

  if (!screens.questions.classList.contains('active')) return;
  const dx = e.clientX - mouseStartX;

  if (Math.abs(dx) > SWIPE_THRESHOLD) {
    dx > 0 ? handleAnswer() : handleSkip();
  } else {
    questionCard.style.transition = 'transform 0.35s cubic-bezier(0.2, 0, 0.2, 1), box-shadow 0.2s ease';
    questionCard.style.transform = '';
    questionCard.style.boxShadow = '';
  }
});

/* ── Utility: Fisher-Yates shuffle ── */
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/* ── Init ── */
initCategoryGrid();
