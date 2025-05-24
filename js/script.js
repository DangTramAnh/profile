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

// responsive
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
// Cuộn về đầu trang
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Popup functionality
document.addEventListener('DOMContentLoaded', () => {
  const popupOverlay = document.getElementById('popupOverlay');
  const popupClose = document.getElementById('popupClose');
  const timelineItems = document.querySelectorAll('.timeline-item');

  console.log('Found timeline items:', timelineItems.length);

  // Popup data
  const popupData = {
    edu1: {
      image: "/image/about_image/thptmdc.jpg",
      titleVi: 'THPT Mạc Đĩnh Chi',
      titleEn: 'Mac Dinh Chi High School',
      descriptionVi: 'THPT Mạc Đĩnh Chi là nơi em trưởng thành, học được cách suy nghĩ độc lập và phát triển bản thân toàn diện.',
      descriptionEn: 'Mac Dinh Chi High School is where I matured, learned to think independently, and grew as a person.'
    },
    edu2: {
      image: '/image/about_image/ththsaigon.jpeg',
      titleVi: 'THTH Sài Gòn',
      titleEn: 'Sài Gòn Secondary School',
      descriptionVi: 'Những năm học tại Trung học Thực hành Sài Gòn là khoảng thời gian em bắt đầu khám phá bản thân và hình thành những ước mơ đầu tiên.',
      descriptionEn: 'My years at Saigon Experimental Secondary School were when I began discovering myself and forming my earliest dreams.'
    },
    edu3: {
      image: '/image/about_image/khaiminh.jpg',
      titleVi: 'Tiểu học KhaiMinh',
      titleEn: 'KhaiMinh Primary School',
      descriptionVi: 'Khi còn học ở tiểu học KhaiMinh, em đã có nhiều kỷ niệm đẹp và những bài học đầu đời quý giá.',
      descriptionEn: 'When I was studying at KhaiMinh Primary School, I had many beautiful memories and learned valuable lessons in my early years. '
    },
    exp1: {
      image: '/image/about_image/ielts.png',
      titleVi: 'IELTS',
      titleEn: 'IELTS',
      descriptionVi: 'Việc đạt được bằng IELTS không chỉ là một thành tích học thuật mà còn mở ra cho em nhiều cơ hội vươn ra thế giới.',
      descriptionEn: 'Earning the IELTS certificate was not just an academic milestone, but also a gateway to global opportunities.'
    },
    exp2: {
      image: '/image/about_image/mindx.jpeg',
      titleVi: 'MindX',
      titleEn: 'MindX',
      descriptionVi: 'Lớp học hội họa tại MindX giúp em thể hiện cảm xúc qua từng nét vẽ và nuôi dưỡng niềm đam mê nghệ thuật.',
      descriptionEn: 'The art class at MindX allowed me to express emotions through every stroke and nurtured my passion for creativity.'
    },
    exp3: {
      image: '/image/about_image/design.png',
      titleVi: 'Thiết kế',
      titleEn: 'Design',
      descriptionVi: 'Khóa học thiết kế giúp em hiểu rằng sáng tạo không chỉ là cảm hứng, mà còn là kỹ năng có thể rèn luyện mỗi ngày.',
      descriptionEn: 'The design course taught me that creativity isn’t just inspiration — it’s a skill that can be trained every day.'
    }
  };

  function showPopup(popupId) {
    console.log('Showing popup for:', popupId);
    const data = popupData[popupId];
    if (!data) {
      console.log('No data found for:', popupId);
      return;
    }

    // Update popup content
    const titleVi = popupOverlay.querySelector('.popup-title .lang.vi');
    const titleEn = popupOverlay.querySelector('.popup-title .lang.en');
    const descVi = popupOverlay.querySelector('.popup-description .lang.vi');
    const descEn = popupOverlay.querySelector('.popup-description .lang.en');
    const image = popupOverlay.querySelector('.popup-image img');
    const date = popupOverlay.querySelector('.popup-date');

    titleVi.textContent = data.titleVi;
    titleEn.textContent = data.titleEn;
    descVi.textContent = data.descriptionVi;
    descEn.textContent = data.descriptionEn;
    image.src = data.image;
    date.textContent = document.querySelector(`[data-popup="${popupId}"] .date`).textContent;

    // Show popup with animation
    popupOverlay.style.display = 'flex';
    setTimeout(() => {
      popupOverlay.classList.add('active');
    }, 10);

    // Prevent body scrolling
    document.body.style.overflow = 'hidden';
  }

  function hidePopup() {
    console.log('Hiding popup');
    popupOverlay.classList.remove('active');
    setTimeout(() => {
      popupOverlay.style.display = 'none';
    }, 300);

    // Restore body scrolling
    document.body.style.overflow = '';
  }

  // Add click event listeners
  timelineItems.forEach(item => {
    console.log('Adding click listener to:', item.getAttribute('data-popup'));
    item.style.cursor = 'pointer';
    item.addEventListener('click', () => {
      const popupId = item.getAttribute('data-popup');
      console.log('Timeline item clicked:', popupId);
      showPopup(popupId);
    });
  });

  popupClose.addEventListener('click', hidePopup);
  popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
      hidePopup();
    }
  });

  // Close popup on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hidePopup();
    }
  });
});

// Showcase Section Functionality
document.addEventListener('DOMContentLoaded', () => {
  const mainArtwork = document.querySelector('.main-artwork .artwork-image');
  const artworkCard = document.querySelector('.artwork-card');
  const previewItems = document.querySelectorAll('.preview-item');
  const prevButton = document.querySelector('.nav-arrow.prev');
  const nextButton = document.querySelector('.nav-arrow.next');
  const detailsPanel = document.querySelector('.artwork-details');
  const detailsClose = document.querySelector('.details-close');

  // Add 3D tilt effect for main artwork
  artworkCard.addEventListener('mousemove', (e) => {
    const rect = artworkCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -15;
    const rotateY = ((x - centerX) / centerX) * 15;
    
    artworkCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
  });

  artworkCard.addEventListener('mouseleave', () => {
    artworkCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
  });

  let currentIndex = 0;
  const artworks = [
    {
      image: './image/image_web/Art/before_mindx/1.1.jpg',
      preview: './image/image_web/Art/before_mindx/1.1.jpg',
      title: { vi: 'Sắc Màu Cảm Xúc', en: 'Colors of Emotion' },
      size: { vi: 'Kích thước: 80x100 cm', en: 'Size: 80x100 cm' },
      medium: { vi: 'Chất liệu: Acrylic trên canvas', en: 'Medium: Acrylic on canvas' },
      year: { vi: 'Năm sáng tác: 2024', en: 'Year: 2024' },
      concept: {
        vi: 'Ý tưởng: Tác phẩm thể hiện sự giao thoa giữa những cảm xúc mãnh liệt thông qua việc sử dụng các mảng màu tương phản và những đường nét tự do, phóng khoáng.',
        en: 'Concept: The artwork represents the interplay of intense emotions through the use of contrasting color fields and free, expressive lines.'
      }
    },
    {
      image: '/image/image_web/Art/while_mindx/2.13.jpg',
      preview: '/image/image_web/Art/while_mindx/2.13.jpg',
      title: { vi: 'Vũ Điệu Của Màu Sắc', en: 'Dance of Colors' },
      size: { vi: 'Kích thước: 90x120 cm', en: 'Size: 90x120 cm' },
      medium: { vi: 'Chất liệu: Dầu trên canvas', en: 'Medium: Oil on canvas' },
      year: { vi: 'Năm sáng tác: 2024', en: 'Year: 2024' },
      concept: {
        vi: 'Ý tưởng: Một tác phẩm về sự chuyển động và nhịp điệu, nơi các màu sắc tương tác và nhảy múa với nhau tạo nên một bản hòa tấu thị giác.',
        en: 'Concept: A piece about movement and rhythm, where colors interact and dance together creating a visual symphony.'
      }
    },
    {
      image: '/image/image_web/Art/after_mindx/3.1.jpg',
      preview: '/image/image_web/Art/after_mindx/3.1.jpg',
      title: { vi: 'Không Gian Trừu Tượng', en: 'Abstract Space' },
      size: { vi: 'Kích thước: 100x100 cm', en: 'Size: 100x100 cm' },
      medium: { vi: 'Chất liệu: Mixed media', en: 'Medium: Mixed media' },
      year: { vi: 'Năm sáng tác: 2024', en: 'Year: 2024' },
      concept: {
        vi: 'Ý tưởng: Khám phá mối quan hệ giữa không gian và hình dạng thông qua việc sử dụng các kỹ thuật hỗn hợp và lớp chồng lớp.',
        en: 'Concept: Exploring the relationship between space and form through mixed media techniques and layering.'
      }
    },
    {
      image: '/image/image_web/Art/after_mindx/3.2.jpg',
      preview: '/image/image_web/Art/after_mindx/3.2.jpg',
      title: { vi: 'Hòa Quyện', en: 'Fusion' },
      size: { vi: 'Kích thước: 70x90 cm', en: 'Size: 70x90 cm' },
      medium: { vi: 'Chất liệu: Acrylic và mực', en: 'Medium: Acrylic and ink' },
      year: { vi: 'Năm sáng tác: 2024', en: 'Year: 2024' },
      concept: {
        vi: 'Ý tưởng: Sự kết hợp giữa các yếu tố tự nhiên và hình học, tạo nên một thế giới trừu tượng nơi ranh giới giữa hữu cơ và vô cơ trở nên mờ nhạt.',
        en: 'Concept: A fusion of natural and geometric elements, creating an abstract world where the boundaries between organic and inorganic become blurred.'
      }
    }
  ];

  function showArtworkDetails(index) {
    const artwork = artworks[index];
    const currentLang = document.documentElement.lang || 'vi';
    
    const detailsContent = detailsPanel.querySelector('.details-content');
    detailsContent.innerHTML = `
      <h3>${artwork.title[currentLang]}</h3>
      <p>${artwork.size[currentLang]}</p>
      <p>${artwork.medium[currentLang]}</p>
      <p>${artwork.year[currentLang]}</p>
      <p>${artwork.concept[currentLang]}</p>
    `;
    
    detailsPanel.classList.remove('hidden');
    // Trigger reflow
    detailsPanel.offsetHeight;
    detailsPanel.classList.add('active');
  }

  function hideArtworkDetails() {
    detailsPanel.classList.remove('active');
    // Wait for transition to complete before hiding
    setTimeout(() => {
      detailsPanel.classList.add('hidden');
    }, 500);
  }

  function updateMainArtwork(index) {
    const artwork = artworks[index];
    
    // Add fade out effect
    mainArtwork.style.opacity = '0';
    artworkCard.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    
    setTimeout(() => {
      mainArtwork.src = artwork.image;
      mainArtwork.style.opacity = '1';
      currentIndex = index;

      // Update preview states
      previewItems.forEach((item, i) => {
        if (i === index) {
          item.classList.add('active');
        } else {
          item.classList.remove('active');
        }
      });
    }, 300);
  }

  // Add click event to main artwork
  artworkCard.addEventListener('click', () => {
    showArtworkDetails(currentIndex);
  });

  // Initialize preview images
  previewItems.forEach((item, index) => {
    const img = item.querySelector('img');
    img.src = artworks[index].preview;
    
    item.addEventListener('click', () => {
      if (index !== currentIndex) {
        hideArtworkDetails();
        updateMainArtwork(index);
      }
    });
  });

  // Navigation buttons
  prevButton.addEventListener('click', () => {
    hideArtworkDetails();
    const newIndex = (currentIndex - 1 + artworks.length) % artworks.length;
    updateMainArtwork(newIndex);
  });

  nextButton.addEventListener('click', () => {
    hideArtworkDetails();
    const newIndex = (currentIndex + 1) % artworks.length;
    updateMainArtwork(newIndex);
  });

  // Close details panel
  detailsClose.addEventListener('click', hideArtworkDetails);

  // Close details when clicking outside
  detailsPanel.addEventListener('click', (e) => {
    if (e.target === detailsPanel) {
      hideArtworkDetails();
    }
  });

  // Initialize first artwork
  updateMainArtwork(0);
  // Ensure details panel is hidden initially
  detailsPanel.classList.add('hidden');

  // Update details content when language changes
  document.addEventListener('languageChanged', () => {
    if (detailsPanel.classList.contains('active')) {
      showArtworkDetails(currentIndex);
    }
  });
});

