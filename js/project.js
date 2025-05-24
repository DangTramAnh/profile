const folders = [
    {
      name: { vi: 'Dự án trong lớp', en: 'project in class' },
      images: [
        { src: '../image/image_web/Design/project_in_class/ninhbinh.png', short: 'Sketch', desc: 'This is a sketch project' },
        { src: '../image/image_web/Design/project_in_class/tienggatrua.png', short: 'Logo', desc: 'This is a logo design' },
        { src: '../image/image_web/Design/project_in_class/tetdoanvien.png', short: 'UX Flow', desc: 'User experience workflow' },
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
          media.width = 300;
        } else {
          media = document.createElement('img');
          media.src = imgObj.src;
          media.alt = imgObj.short;
        }
      
        media.onclick = () => desc.textContent = imgObj.desc;
      
        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.textContent = imgObj.short;
      
        box.appendChild(media);
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