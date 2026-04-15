// ===== Footer =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const lastModEl = document.getElementById('lastModified');
if (lastModEl) lastModEl.textContent = document.lastModified;

// ===== NAV =====
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('site-nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open');
  });
}

// ===== PRODUCTS =====
const productsGrid = document.getElementById('products-grid');

async function loadProducts() {
  if (!productsGrid) return;

  try {
    const response = await fetch('data/products.json');
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function renderProducts(products) {
  productsGrid.innerHTML = products.map(p => `
    <article class="product-card">
      <img src="${p.image}" alt="${p.title}" loading="lazy">
      <h4>${p.title}</h4>
      <p>${p.description}</p>
      <p><strong>$${p.price.toFixed(2)}</strong></p>
      <button class="view-btn" data-id="${p.id}">View</button>
    </article>
  `).join('');

  document.querySelectorAll('.view-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const product = products.find(p => p.id === btn.dataset.id);
      openModal(product);
    });
  });
}

// ===== MODAL =====
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
function openModal(product) {
  if (!modal || !modalBody || !product) return;

  modalBody.innerHTML = `
    <h3>${product.title}</h3>
    <img src="${product.image}" alt="${product.title}">
    <p>${product.description}</p>
    <p><strong>$${product.price.toFixed(2)}</strong></p>
  `;

  modal.classList.remove('hidden');
}

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) {
      modal.classList.add('hidden');
    }
  });

const closeBtn = document.getElementById('close-modal');
if (closeBtn && modal) {
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}

// ===== INIT =====
loadProducts();