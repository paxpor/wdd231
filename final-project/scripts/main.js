// ===== Footer =====
document.getElementById('year')?.textContent = new Date().getFullYear();
document.getElementById('lastModified')?.textContent = document.lastModified;

// ===== NAV =====
const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('site-nav');

menuBtn?.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
});

// ===== LOCAL STORAGE =====
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

let cart = loadCart();

// ===== FETCH PRODUCTS =====
async function loadProducts() {
  try {
    const response = await fetch('data/products.json');
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

// ===== DOM =====
const productsGrid = document.getElementById('products-grid');
const cartCount = document.getElementById('cart-count');

// ===== RENDER =====
function renderProducts(products) {
  if (!productsGrid) return;

  productsGrid.innerHTML = products.map(p => `
    <article class="temple-card">
      <img src="${p.image}" alt="${p.title}" class="product-image" loading="lazy">
      <h4>${p.title}</h4>
      <p>${p.description}</p>
      <p><strong>$${p.price.toFixed(2)}</strong></p>
      <button class="btn add-btn" data-id="${p.id}">Add</button>
      <button class="btn view-btn" data-id="${p.id}">View</button>
    </article>
  `).join('');

  document.querySelectorAll('.add-btn').forEach(btn =>
    btn.addEventListener('click', () => addToCart(btn.dataset.id, products))
  );

  document.querySelectorAll('.view-btn').forEach(btn =>
    btn.addEventListener('click', () => openModal(products.find(p => p.id === btn.dataset.id)))
  );
}

// ===== CART =====
function addToCart(id, products) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart(cart);
  updateCartUI();
}

function updateCartUI() {
  if (!cartCount) return;
  cartCount.textContent = cart.reduce((sum, item) => sum + item.qty, 0);
}

// ===== MODAL =====
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');

function openModal(product) {
  modalBody.innerHTML = `
    <h3>${product.title}</h3>
    <img src="${product.image}" style="width:100%">
    <p>${product.description}</p>
    <p><strong>$${product.price}</strong></p>
  `;
  modal.classList.remove('hidden');
}

document.getElementById('close-modal')?.addEventListener('click', () => {
  modal.classList.add('hidden');
});

// ===== INIT =====
loadProducts();
updateCartUI();
