/* =========================================================
   JDM CAR - INTERACTIVE SCRIPT (JAVASCRIPT)
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Header Effect on Scroll
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id], footer[id]');
  
  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Scroll Spy for Nav Links (only for hash links on the current page)
    let currentSection = '';
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    if (currentSection) {
      const matchingHashLink = Array.from(navLinks).find(link => link.getAttribute('href') === `#${currentSection}`);
      if (matchingHashLink) {
        navLinks.forEach(link => {
          if (link.getAttribute('href') && link.getAttribute('href').startsWith('#')) {
            link.classList.remove('active');
          }
        });
        matchingHashLink.classList.add('active');
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  // 2. Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = menuToggle.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    // Close mobile menu when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('open')) {
        navMenu.classList.remove('open');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      }
    });
  }

  // 3. Search Form Handler with Toast Notification
  const searchForm = document.getElementById('search-form');
  const searchName = document.getElementById('search-name');
  const searchBrand = document.getElementById('search-brand');
  const searchType = document.getElementById('search-type');

  const showToast = (message) => {
    let toast = document.querySelector('.toast-notification');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast-notification';
      toast.innerHTML = `<i class="fas fa-circle-check"></i> <span class="toast-text"></span>`;
      document.body.appendChild(toast);
    }

    toast.querySelector('.toast-text').textContent = message;
    toast.classList.add('show');

    setTimeout(() => {
      toast.classList.remove('show');
    }, 3500);
  };

  if (searchForm) {
    searchForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const carName = searchName ? searchName.value.trim() : '';
      const carBrand = searchBrand && searchBrand.value ? searchBrand.options[searchBrand.selectedIndex].text : '';
      const carType = searchType && searchType.value ? searchType.options[searchType.selectedIndex].text : '';

      let searchSummary = [];
      if (carName) searchSummary.push(`Tên: "${carName}"`);
      if (carBrand && searchBrand.value) searchSummary.push(`Hãng: ${carBrand}`);
      if (carType && searchType.value) searchSummary.push(`Loại: ${carType}`);

      if (searchSummary.length > 0) {
        showToast(`Đang tìm kiếm: ${searchSummary.join(' | ')}`);
      } else {
        showToast('Vui lòng nhập tên xe hoặc chọn hãng xe để tìm kiếm.');
      }
    });
  }

  // 4. Smooth Card Reveal Animation on Scroll
  const cards = document.querySelectorAll('.service-card, .car-box');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  };

  const cardObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(25px)';
    card.style.transition = `opacity 0.5s ease ${(index % 6) * 0.1}s, transform 0.5s ease ${(index % 6) * 0.1}s`;
    cardObserver.observe(card);
  });

  // 5. Brand Page (Hãng xe.html) Filtering & Live Search
  const filterButtons = document.querySelectorAll('.brand-filter-btn');
  const carBoxes = document.querySelectorAll('.car-box');
  const liveSearchInput = document.getElementById('brand-live-search-input');
  const carsCountDisplay = document.getElementById('cars-count');
  const noResultBox = document.getElementById('cars-no-result');

  let currentActiveBrand = 'all';
  let currentSearchQuery = '';

  const updateCarFiltering = () => {
    if (!carBoxes.length) return;

    let visibleCount = 0;

    carBoxes.forEach(box => {
      const brand = box.getAttribute('data-brand') || '';
      const carTitle = (box.querySelector('.car-box-title')?.textContent || '').toLowerCase();
      const carBrandName = (box.querySelector('.car-brand-tag')?.textContent || '').toLowerCase();
      const carSubtitle = (box.querySelector('.car-box-subtitle')?.textContent || '').toLowerCase();

      const matchesBrand = currentActiveBrand === 'all' || brand.toLowerCase() === currentActiveBrand.toLowerCase();
      const matchesSearch = !currentSearchQuery || 
        carTitle.includes(currentSearchQuery) || 
        carBrandName.includes(currentSearchQuery) || 
        carSubtitle.includes(currentSearchQuery);

      if (matchesBrand && matchesSearch) {
        box.style.display = 'flex';
        visibleCount++;
      } else {
        box.style.display = 'none';
      }
    });

    if (carsCountDisplay) {
      carsCountDisplay.textContent = visibleCount;
    }

    if (noResultBox) {
      noResultBox.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  };

  if (filterButtons.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentActiveBrand = btn.getAttribute('data-filter') || 'all';
        updateCarFiltering();
      });
    });
  }

  if (liveSearchInput) {
    liveSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      updateCarFiltering();
    });
  }

  // 6. Car Detail Modal Trigger
  const modalBackdrop = document.getElementById('car-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const viewCarButtons = document.querySelectorAll('.btn-view-car');

  if (modalBackdrop) {
    const modalImage = document.getElementById('modal-img');
    const modalBrand = document.getElementById('modal-brand');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalEngine = document.getElementById('modal-engine');
    const modalPower = document.getElementById('modal-power');
    const modalTorque = document.getElementById('modal-torque');
    const modalDrive = document.getElementById('modal-drive');
    const modalTransmission = document.getElementById('modal-transmission');
    const modalYear = document.getElementById('modal-year');

    viewCarButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const box = e.target.closest('.car-box');
        if (!box) return;

        const img = box.querySelector('.car-box-image')?.getAttribute('src') || '';
        const brand = box.getAttribute('data-brand') || '';
        const title = box.querySelector('.car-box-title')?.textContent || '';
        const desc = box.getAttribute('data-description') || 'Mẫu xe JDM huyền thoại với thiết kế thể thao vượt thời gian và khả năng nâng cấp công suất vượt trội.';
        const engine = box.getAttribute('data-engine') || 'DOHC Turbo';
        const power = box.getAttribute('data-power') || '300+ HP';
        const torque = box.getAttribute('data-torque') || '400 Nm';
        const drive = box.getAttribute('data-drive') || 'RWD / AWD';
        const trans = box.getAttribute('data-transmission') || '6-Speed Manual';
        const year = box.getAttribute('data-year') || 'JDM Legend';

        if (modalImage) modalImage.src = img;
        if (modalBrand) modalBrand.textContent = brand.toUpperCase();
        if (modalTitle) modalTitle.textContent = title;
        if (modalDesc) modalDesc.textContent = desc;
        if (modalEngine) modalEngine.textContent = engine;
        if (modalPower) modalPower.textContent = power;
        if (modalTorque) modalTorque.textContent = torque;
        if (modalDrive) modalDrive.textContent = drive;
        if (modalTransmission) modalTransmission.textContent = trans;
        if (modalYear) modalYear.textContent = year;

        modalBackdrop.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });

    const closeModal = () => {
      modalBackdrop.classList.remove('active');
      document.body.style.overflow = '';
    };

    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', closeModal);
    }

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalBackdrop.classList.contains('active')) {
        closeModal();
      }
    });
  }
});
