/* ============================================
   HULAM - Shared Logic
   (auth, layout injection, modals, scroll)
   ============================================ */

// ─── AUTH ──────────────────────────────────────────────────────────────────

function getUser() {
  return localStorage.getItem('hulam_user');
}

function checkAuth() {
  const user = getUser();
  const loggedOut = document.getElementById('auth-logged-out');
  const loggedIn  = document.getElementById('auth-logged-in');
  const displayName = document.getElementById('user-display-name');
  const dashName    = document.getElementById('dashboard-user-name');

  if (user) {
    loggedOut?.classList.add('hidden');
    loggedOut?.classList.remove('flex');
    loggedIn?.classList.remove('hidden');
    loggedIn?.classList.add('flex');
    const name = user.split('@')[0];
    if (displayName) displayName.textContent = name;
    if (dashName)    dashName.textContent    = name;
  } else {
    loggedIn?.classList.add('hidden');
    loggedIn?.classList.remove('flex');
    loggedOut?.classList.remove('hidden');
    loggedOut?.classList.add('flex');
  }
  handleScroll();
}

function handleLogin(e) {
  e.preventDefault();
  const email = document.getElementById('login-email').value;
  localStorage.setItem('hulam_user', email);
  toggleModal('login-modal', false);
  checkAuth();
  // Redirect to dashboard after login
  window.location.href = 'dashboard.html';
}

function handleLogout() {
  localStorage.removeItem('hulam_user');
  window.location.href = 'index.html';
}

function requireAuth(actionFunction) {
  if (getUser()) {
    actionFunction();
  } else {
    toggleModal('login-modal', true);
  }
}

// ─── MODALS ────────────────────────────────────────────────────────────────

function toggleModal(modalId, show) {
  const modal   = document.getElementById(modalId);
  const content = document.getElementById(`${modalId}-content`);
  if (!modal || !content) return;

  if (modalId === 'checkout-modal' && show) {
    document.getElementById('checkout-form')?.classList.remove('hidden');
    document.getElementById('checkout-success')?.classList.add('hidden');
  }

  if (show) {
    modal.classList.remove('hidden');
    setTimeout(() => {
      modal.classList.remove('opacity-0', 'pointer-events-none');
      content.classList.remove('translate-y-8');
    }, 10);
  } else {
    modal.classList.add('opacity-0', 'pointer-events-none');
    content.classList.add('translate-y-8');
    setTimeout(() => modal.classList.add('hidden'), 300);
  }
}

// Close modals on backdrop click
document.addEventListener('click', (e) => {
  ['login-modal', 'listing-modal', 'checkout-modal'].forEach(id => {
    const modal = document.getElementById(id);
    if (modal && e.target === modal) toggleModal(id, false);
  });
});

// ─── LISTING MODAL (AI auto-fill) ─────────────────────────────────────────

function publishListing() {
  toggleModal('listing-modal', false);
  alert('Your item has been successfully published!');
  window.location.href = 'dashboard.html';
}

async function generateListingDetails() {
  const title = document.getElementById('listing-title')?.value;
  if (!title?.trim()) { alert('Please enter a title first.'); return; }

  const btnIcon = document.getElementById('ai-icon');
  const btnText = document.getElementById('ai-btn-text');

  btnIcon?.setAttribute('data-lucide', 'loader-2');
  btnIcon?.classList.add('animate-spin');
  if (btnText) btnText.textContent = 'Analyzing market data…';
  lucide.createIcons();

  // Simulate AI fill
  setTimeout(() => {
    const desc = document.getElementById('listing-description');
    const price = document.getElementById('listing-price');
    const deposit = document.getElementById('listing-deposit');
    if (desc)    desc.value    = `A high quality ${title} in excellent condition. Perfect for student projects. Must be returned with all original accessories.`;
    if (price)   price.value   = 150;
    if (deposit) deposit.value = 500;

    btnIcon?.setAttribute('data-lucide', 'sparkles');
    btnIcon?.classList.remove('animate-spin');
    if (btnText) btnText.textContent = '✨ Auto-Fill Details with AI';
    lucide.createIcons();
  }, 1500);
}

// ─── HEADER SCROLL EFFECT ──────────────────────────────────────────────────

function handleScroll() {
  const header   = document.getElementById('main-header');
  const logoText = document.getElementById('header-logo-text');
  const nav      = document.getElementById('header-nav');
  if (!header) return;

  // On non-home pages always use scrolled style
  const isHomePage  = document.body.dataset.page === 'home';
  const isScrolled  = window.scrollY > 20 || !isHomePage;

  const btnList  = document.getElementById('header-btn-list');
  const btnLogin = document.getElementById('header-btn-login');

  if (isScrolled) {
    header.className = header.className
      .replace('bg-transparent', '')
      .replace('py-4', '');
    header.classList.add('bg-white/90', 'backdrop-blur-lg', 'border-b', 'border-gray-200/50', 'shadow-sm', 'py-2');
    logoText?.classList.replace('text-white', 'text-[#1a5b6e]');
    nav?.classList.replace('text-white/90', 'text-gray-600');
    btnList?.classList.replace('text-white', 'text-[#1a5b6e]');
    if (btnLogin) {
      btnLogin.classList.replace('bg-white/20', 'bg-gray-100');
      btnLogin.classList.replace('text-white', 'text-[#1a5b6e]');
    }
  } else {
    header.classList.remove('bg-white/90', 'backdrop-blur-lg', 'border-b', 'border-gray-200/50', 'shadow-sm', 'py-2');
    header.classList.add('bg-transparent', 'py-4');
    logoText?.classList.replace('text-[#1a5b6e]', 'text-white');
    nav?.classList.replace('text-gray-600', 'text-white/90');
    btnList?.classList.replace('text-[#1a5b6e]', 'text-white');
    if (btnLogin) {
      btnLogin.classList.replace('bg-gray-100', 'bg-white/20');
      btnLogin.classList.replace('text-[#1a5b6e]', 'text-white');
    }
  }
}

window.addEventListener('scroll', handleScroll);

// ─── SCROLL REVEAL ─────────────────────────────────────────────────────────

function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-up, .reveal-right, .reveal-none');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  elements.forEach(el => observer.observe(el));
}

// ─── ITEM CARD RENDERER (shared by home + browse) ─────────────────────────

function renderItemCards(items, containerId, detailBasePath = '') {
  const grid       = document.getElementById(containerId);
  const emptyState = document.getElementById('browse-empty');
  if (!grid) return;

  if (items.length === 0) {
    grid.innerHTML = '';
    emptyState?.classList.remove('hidden');
    return;
  }
  emptyState?.classList.add('hidden');

  grid.innerHTML = items.map((item, i) => `
    <a href="${detailBasePath}item-detail.html?id=${item.id}"
       class="reveal-up bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.12)] hover:-translate-y-2 transition-all duration-500 group flex flex-col h-full"
       style="transition-delay:${i * 50}ms">
      <div class="relative h-56 bg-gray-50/50 p-6 overflow-hidden">
        <img src="${item.image}" class="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 transition-transform duration-700 ease-out" alt="${item.title}"/>
        <div class="absolute top-4 left-4 bg-white/90 backdrop-blur text-xs font-bold px-3 py-1 rounded-full shadow-sm text-gray-700">${item.category}</div>
      </div>
      <div class="p-6 flex flex-col flex-grow">
        <h4 class="font-bold text-gray-900 text-xl leading-tight line-clamp-1 mb-2">${item.title}</h4>
        <div class="flex items-center text-sm text-gray-500 mb-6 font-medium">
          <i data-lucide="map-pin" class="w-3.5 h-3.5 mr-1 text-[#1a5b6e]"></i> ${item.distance}
        </div>
        <div class="mt-auto flex items-end justify-between pt-4 border-t border-gray-100">
          <div>
            <p class="text-xs text-gray-400 font-semibold uppercase mb-1">Daily</p>
            <p class="text-2xl font-black text-[#1a5b6e]">₱${item.pricePerDay}</p>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-400 font-semibold uppercase mb-1">Deposit</p>
            <p class="text-sm font-bold text-gray-600">₱${item.deposit}</p>
          </div>
        </div>
      </div>
    </a>`).join('');
  lucide.createIcons();
  initScrollReveal();
}

// ─── SHARED INIT ───────────────────────────────────────────────────────────

document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  checkAuth();
  lucide.createIcons();
  handleScroll();
  initScrollReveal();
});
