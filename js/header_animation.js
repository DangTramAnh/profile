const header = document.getElementById('header');
const scrollBtn = document.getElementById('scrollTopBtn');
const langToggle = document.getElementById('langToggle');
const flagIcon = document.getElementById('flagIcon');
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

let currentLang = 'vi';
let isShrunk = false;
let isExpanded = true;

// Ngôn ngữ
langToggle.addEventListener('click', () => {
  const viTexts = document.querySelectorAll('.lang.vi');
  const enTexts = document.querySelectorAll('.lang.en');

  if (currentLang === 'vi') {
    viTexts.forEach(el => el.style.display = 'none');
    enTexts.forEach(el => el.style.display = 'inline');
    flagIcon.src = 'https://flagcdn.com/w40/us.png';
    currentLang = 'en';
  } else {
    viTexts.forEach(el => el.style.display = 'inline');
    enTexts.forEach(el => el.style.display = 'none');
    flagIcon.src = 'https://flagcdn.com/w40/vn.png';
    currentLang = 'vi';
  }
});

// Chuyển theme sáng/tối
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeIcon.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

// Hiệu ứng header thu nhỏ
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    scrollBtn.style.display = 'block';
    if (isExpanded) {
      header.classList.add('shrink');
      isShrunk = true;
      isExpanded = false;
    }
  } else {
    scrollBtn.style.display = 'none';
    header.classList.remove('shrink');
    isShrunk = false;
    isExpanded = true;
  }
});

// Mở lại header khi click
header.addEventListener('click', () => {
  if (isShrunk) {
    header.classList.remove('shrink');
    isShrunk = false;
    isExpanded = true;
  }
});

// Cuộn về đầu trang
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
function checkResize() {
    if (window.innerWidth < 990) {
      header.classList.add('shrink');
      header.classList.remove('expand');
      isExpanded = false;
    } else {
      header.classList.remove('shrink');
      header.classList.remove('expand');
      isExpanded = false;
    }
  }

  window.addEventListener('load', checkResize);
  window.addEventListener('resize', checkResize);

  header.addEventListener('click', () => {
    if (window.innerWidth < 990) {
      isExpanded = !isExpanded;
      header.classList.toggle('expand', isExpanded);
    }
  });

  const scrollTopBtn = document.getElementById('scrollTopBtn');
  window.addEventListener('scroll', () => {
    scrollTopBtn.style.display = window.scrollY > 200 ? 'block' : 'none';
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });