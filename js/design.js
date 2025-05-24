const folders = [
    {
      name: { vi: 'Dự án trong lớp', en: 'project in class' },
      images: [
        { src: 'https://drive.google.com/file/d/1rejxd7BB5C3UCNP8WYtC_hiN1U7t1-fb/view?usp=sharing', short: 'Sketch', desc: 'This is a sketch project' ,type:'drive'},
        { src: 'https://drive.google.com/file/d/1_rRhhDPIRFPf_OFRsuXN4riRFVpEYNHn/view?usp=sharing', short: 'Logo', desc: 'This is a logo design' ,type:'drive'},
        { src: 'https://drive.google.com/file/d/1MYMyJh1y_TUGt2LI-Hia-IossbMWb2FO/view?usp=sharing', short: 'UX Flow', desc: 'User experience workflow' ,type:'drive'},
      ]
    },
    {
        name: { vi: 'Newjeans', en: 'Newjeans' },
        images: [
     
          { src: 'https://drive.google.com/file/d/1PQUBy2RsbfCD3w-y69roWjtZG9wUIkj6/view?usp=sharing', short: 'Sketch', desc: 'This is a sketch project' ,type:'drive'},
          { src: 'https://drive.google.com/file/d/17H9JstmcENelNUKWZcyqnWLXmJgdk9fB/view?usp=sharing', short: 'Logo', desc: 'This is a logo design' ,type:'drive'},
          { src: 'https://drive.google.com/file/d/1nfvX3IGu6VzZf8tOKblv_KRq-7hbtoIO/view?usp=sharing', short: 'UX Flow', desc: 'User experience workflow' ,type:'drive'},
        ]
      },
  ];

  let currentOpen = null;
  let currentFolder = null;

  function createGallery(folderData) {
    const images = folderData.images || [];
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-wrapper';
  
    const gallery = document.createElement('div');
    gallery.className = 'gallery';
  
    const leftArrow = document.createElement('span');
    leftArrow.className = 'arrow';
    leftArrow.innerHTML = '&#9664;';
  
    const rightArrow = document.createElement('span');
    rightArrow.className = 'arrow';
    rightArrow.innerHTML = '&#9654;';
  
    const viewer = document.createElement('div');
    viewer.className = 'image-viewer';
  
    const desc = document.createElement('div');
    desc.className = 'description';
  
    leftArrow.onclick = () => scrollImages(-1, viewer);
    rightArrow.onclick = () => scrollImages(1, viewer);
  
    images.forEach((imgObj) => {
      const box = document.createElement('div');
      box.className = 'image-box';
  
      let media;
  
      if (imgObj.type === 'video') {
        media = document.createElement('video');
        media.src = imgObj.src;
        media.controls = true;
        media.onclick = () => desc.textContent = imgObj.desc;
        box.appendChild(media);
      } 
      else if (imgObj.type === 'drive') {
        const previewLink = imgObj.src.replace('/view?usp=sharing', '/preview');
        const iframeWrapper = document.createElement('div');
        iframeWrapper.className = 'drive-portrait-wrapper';
  
        media = document.createElement('iframe');
        media.src = previewLink;
        media.allow = 'autoplay';
        media.frameBorder = 0;
        media.allowFullscreen = true;
  
        iframeWrapper.appendChild(media);
        iframeWrapper.onclick = () => desc.textContent = imgObj.desc;
  
        box.appendChild(iframeWrapper);
      } else if (imgObj.type === 'card3d') {
        const cardScene = document.createElement('div');
        cardScene.className = 'scene';
      
        const card = document.createElement('div');
        card.className = 'card';
      
        const front = document.createElement('div');
        front.className = 'face front';
        const imgFront = document.createElement('img');
        imgFront.src = `https://drive.google.com/uc?id=${imgObj.front}`;
        front.appendChild(imgFront);
      
        const back = document.createElement('div');
        back.className = 'face back';
        const imgBack = document.createElement('img');
        imgBack.src = `https://drive.google.com/uc?id=${imgObj.back}`;
        back.appendChild(imgBack);
      
        card.appendChild(front);
        card.appendChild(back);
        cardScene.appendChild(card);
        box.appendChild(cardScene);
      
        box.onclick = () => desc.textContent = imgObj.desc;
      
        // 3D rotation logic
        let isDragging = false;
        let startX = 0, startY = 0;
        let rotationX = 0, rotationY = 0;
      
        function rotateCard(dx, dy) {
          rotationY += dx * 0.5;
          rotationX -= dy * 0.5;
          rotationX = Math.max(-90, Math.min(90, rotationX));
          card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
        }
      
        card.addEventListener('mousedown', (e) => {
          isDragging = true;
          startX = e.clientX;
          startY = e.clientY;
        });
      
        document.addEventListener('mousemove', (e) => {
          if (!isDragging) return;
          const dx = e.clientX - startX;
          const dy = e.clientY - startY;
          startX = e.clientX;
          startY = e.clientY;
          rotateCard(dx, dy);
        });
      
        document.addEventListener('mouseup', () => isDragging = false);
      
        card.addEventListener('touchstart', (e) => {
          isDragging = true;
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
        });
      
        card.addEventListener('touchmove', (e) => {
          if (!isDragging) return;
          const dx = e.touches[0].clientX - startX;
          const dy = e.touches[0].clientY - startY;
          startX = e.touches[0].clientX;
          startY = e.touches[0].clientY;
          rotateCard(dx, dy);
        });
      
        card.addEventListener('touchend', () => isDragging = false);
      }
      else {
        media = document.createElement('img');
        media.src = imgObj.src;
        media.alt = imgObj.short;
        media.onclick = () => desc.textContent = imgObj.desc;
        box.appendChild(media);
      }
  
      const overlay = document.createElement('div');
      overlay.className = 'overlay';
      overlay.textContent = imgObj.short;
  
      box.appendChild(overlay);
      viewer.appendChild(box);
    });
  
    gallery.appendChild(leftArrow);
    gallery.appendChild(viewer);
    gallery.appendChild(rightArrow);
    wrapper.appendChild(gallery);
    wrapper.appendChild(desc);
  
    return wrapper;
  }

  function scrollImages(direction, viewer) {
    const scrollAmount = viewer.querySelector('.image-box')?.offsetWidth + 10 || 190;
    viewer.scrollBy({ left: direction * scrollAmount, behavior: 'smooth' });
  }

  function loadFolders() {
    const folderList = document.getElementById('folder-list');
    folderList.innerHTML = '';
    currentOpen = null;
    currentFolder = null;

    folders.forEach(folderData => {
      const folder = document.createElement('div');
      folder.className = 'folder';
      folder.innerHTML = `
        <span class="lang vi">${folderData.name.vi}</span>
        <span class="lang en" style="display:none">${folderData.name.en}</span>
      `;

      folder.onclick = () => {
        if (currentFolder === folder) {
          currentOpen.classList.remove('open');
          const toRemove = currentOpen;
          currentOpen = null;
          currentFolder = null;
          setTimeout(() => folderList.removeChild(toRemove), 500);
          return;
        }

        if (currentOpen) {
          currentOpen.classList.remove('open');
          const toRemove = currentOpen;
          currentOpen = null;
          currentFolder = null;
          setTimeout(() => folderList.removeChild(toRemove), 500);
        }

        const galleryWrapper = createGallery(folderData);
        folderList.insertBefore(galleryWrapper, folder.nextSibling);
        setTimeout(() => galleryWrapper.classList.add('open'), 10);
        currentOpen = galleryWrapper;
        currentFolder = folder;
      };

      folderList.appendChild(folder);
    });
  }

  function toggleLanguage() {
    const htmlLang = document.documentElement.lang;
    const newLang = htmlLang === 'vi' ? 'en' : 'vi';
    document.documentElement.lang = newLang;

    document.querySelectorAll('.lang.vi').forEach(el => el.style.display = newLang === 'vi' ? 'inline' : 'none');
    document.querySelectorAll('.lang.en').forEach(el => el.style.display = newLang === 'en' ? 'inline' : 'none');

    const flag = document.getElementById('flagIcon');
    if (flag) {
      flag.src = newLang === 'vi'
        ? 'https://flagcdn.com/w40/vn.png'
        : 'https://flagcdn.com/w40/us.png';
    }
  }

  document.getElementById('langToggle').onclick = toggleLanguage;
  loadFolders();

  document.querySelectorAll('.card3D').forEach(card => {
    let rotationX = 0;
    let rotationY = 0;
    let autoRotate = true;
    let lastManualTime = 0;
    let isDragging = false;
    let startX = 0, startY = 0;
  
    function updateRotation() {
      card.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    }
  
    // Auto rotation loop cho từng card riêng
    setInterval(() => {
      const now = Date.now();
      if (autoRotate && now - lastManualTime > 3000) {
        rotationY += 0.5;
        updateRotation();
      }
    }, 30);
  
    function startDrag(x, y) {
      isDragging = true;
      startX = x;
      startY = y;
      autoRotate = false;
      lastManualTime = Date.now();
    }
  
    function drag(x, y) {
      if (!isDragging) return;
      const deltaX = x - startX;
      const deltaY = y - startY;
      startX = x;
      startY = y;
      rotationY += deltaX * 0.5;
      rotationX -= deltaY * 0.5;
      rotationX = Math.max(-90, Math.min(90, rotationX));
      updateRotation();
      lastManualTime = Date.now();
    }
  
    function stopDrag() {
      isDragging = false;
      lastManualTime = Date.now();  // Cập nhật thời gian dừng kéo
      autoRotate = true;  
    }

  
    card.addEventListener('mousedown', e => startDrag(e.clientX, e.clientY));
    document.addEventListener('mousemove', e => drag(e.clientX, e.clientY));
    document.addEventListener('mouseup', stopDrag);
  
    card.addEventListener('touchstart', e => {
      const touch = e.touches[0];
      startDrag(touch.clientX, touch.clientY);
    });
    card.addEventListener('touchmove', e => {
      const touch = e.touches[0];
      drag(touch.clientX, touch.clientY);
    });
    card.addEventListener('touchend', stopDrag);
  });