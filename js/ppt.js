const folders = [
    {
      name: { vi: 'Dự án trong lớp', en: 'Project in class' },
      images: [
        {
          src: 'https://www.canva.com/design/DAF5WCEV5gU/WouSJdbI-Ds0HJGuKuU_-g/view?embed',
          short: 'Đối ',
          desc: 'Bài thuyết trình bằng Canva',
          type: 'iframe'
        },
        {
          src: 'https://www.canva.com/design/DAGQ7lR-Qik/ZLRm0hK8zChGBDIKsw8bIw/view?embed',
          short: 'Tiếng thu',
          desc: 'Bài thuyết trình bằng Canva',
          type: 'iframe'
        },
        {
          src: 'https://www.canva.com/design/DAGn5FycCiI/og5ULvJVwvYlLV7yz6gAcw/view?embed',
          short: 'Eva',
          desc: 'Bài thuyết trình bằng Canva',
          type: 'iframe'
        },
        {
          src: 'https://www.canva.com/design/DAGn5Z0x8fk/n4ei6hcFYPF5xl7RzLDKzA/view?embed',
          short: 'Game',
          desc: 'Bài thuyết trình bằng Canva',
          type: 'iframe'
        },
        {
            src: 'https://www.canva.com/design/DAGn5cLgicI/vR9JLeLhArmICem_E6ATDw/view?embed',
            short: 'Hoá 11',
            desc: 'Bài thuyết trình bằng Canva',
            type: 'iframe'
          }
      ]
    }
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
  
      if (imgObj.type === 'video') {
        const video = document.createElement('video');
        video.src = imgObj.src;
        video.controls = true;
        video.width = 300;
        video.onclick = () => desc.textContent = imgObj.desc;
        box.appendChild(video);
      } else if (['ppt', 'doc', 'pdf'].includes(imgObj.type)) {
        const link = document.createElement('a');
        link.href = imgObj.src;
        link.target = '_blank';
        link.style.display = 'flex';
        link.style.flexDirection = 'column';
        link.style.alignItems = 'center';
        link.style.justifyContent = 'center';
        link.style.width = '100%';
        link.style.height = '180px';
        link.style.textDecoration = 'none';
        link.style.backgroundColor = '#fff';
        link.style.borderRadius = '10px';
        link.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
        link.onclick = () => desc.textContent = imgObj.desc;
  
        const icon = document.createElement('div');
        icon.innerHTML = {
          ppt: '📊',
          doc: '📝',
          pdf: '📄'
        }[imgObj.type] || '📁';
        icon.style.fontSize = '50px';
  
        const label = document.createElement('div');
        label.textContent = imgObj.short;
        label.style.color = '#FF94AB';
        label.style.fontWeight = 'bold';
        label.style.marginTop = '10px';
  
        link.appendChild(icon);
        link.appendChild(label);
        box.appendChild(link);
      } else if (imgObj.type === 'iframe') {
        const iframe = document.createElement('iframe');
        iframe.src = imgObj.src;
        iframe.width = '400';
        iframe.height = '250';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '10px';
        iframe.allowFullscreen = true;
  
        iframe.onclick = () => desc.textContent = imgObj.desc;
  
        const label = document.createElement('div');
        label.className = 'overlay';
        label.textContent = imgObj.short;
  
        box.appendChild(iframe);
        box.appendChild(label);
      } else {
        const img = document.createElement('img');
        img.src = imgObj.src;
        img.alt = imgObj.short;
        img.onclick = () => desc.textContent = imgObj.desc;
  
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = imgObj.short;
  
        box.appendChild(img);
        box.appendChild(overlay);
      }
  
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