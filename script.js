document.documentElement.classList.add('js');

/* ---- 1. YouTube：クリックしてから読み込む（ページを軽く保つため） ---- */
document.querySelectorAll('.video').forEach((box) => {
  const id = (box.dataset.youtubeId || '').trim();
  const title = box.dataset.title || '作品の動画';

  // IDが未設定（YOUTUBE_ID_ で始まる）ときは準備中の表示にする
  if (!id || id.startsWith('YOUTUBE_ID')) {
    const empty = document.createElement('div');
    empty.className = 'video-empty';
    empty.textContent = '動画は準備中です';
    box.appendChild(empty);
    return;
  }

  const btn = document.createElement('button');
  btn.type = 'button';
  btn.className = 'video-btn';
  btn.textContent = '動画を再生';
  btn.setAttribute('aria-label', title + 'を再生');

  btn.addEventListener('click', () => {
    const iframe = document.createElement('iframe');
    iframe.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(id) + '?autoplay=1&rel=0';
    iframe.title = title;
    iframe.allow = 'accelerometer; autoplay; encrypted-media; picture-in-picture';
    iframe.allowFullscreen = true;
    box.replaceChildren(iframe);
  });

  box.appendChild(btn);
});

/* ---- 2. スキルバー：画面に入ったらゲージが伸びる ---- */
const skills = document.querySelectorAll('.skill');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skills.forEach((el) => io.observe(el));
} else {
  skills.forEach((el) => el.classList.add('is-visible'));
}

/* ---- 3. 画像が見つからないときも、レイアウトを崩さない ---- */
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => img.classList.add('no-image'));
});
