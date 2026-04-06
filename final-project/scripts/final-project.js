document.getElementById('year').textContent = new Date().getFullYear();
document.getElementById('lastModified').textContent = document.lastModified;

const menuBtn = document.getElementById('menu-btn');
const nav = document.getElementById('site-nav');

menuBtn?.addEventListener('click', () => {
  const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
  menuBtn.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('open');
});

const products = [
  {
    id: 'pen-01',
    title: 'Hand-turned Walnut Pen',
    description: 'Smooth-writing rollerball pen, hand-finished.',
    price: 48.00,
    image: 'scripts/images/walnut_pen.png'
  },
  {
    id: 'bowl-01',
    title: 'Cherry Wood Bowl (Small)',
    description: 'Delicately finished bowl, food-safe finish.',
    price: 65.00,
    image: 'scripts/images/cherry_wood_bowl.jpg'
  },
  {
    id: 'jbox-01',
    title: 'Jewelry Box with Inlay',
    description: 'Keepsakes fit perfectly, soft velvet interior.',
    price: 120.00,
    image: 'scripts/images/small_jewelery_box.jpg'
  },
  {
    id: 'pen-02',
    title: 'Maple Slim Pen',
    description: 'Lightweight slim pen with polished finish.',
    price: 42.00,
    image: 'scripts/images/maple_pen.jpg'
  },
  {
    id: 'bowl-02',
    title: 'Large Oak Serving Bowl',
    description: 'Big and sturdy — great for salads or bread.',
    price: 140.00,
    image: 'scripts/images/large_oak_bowl.jpg'
  }
];

const productsGrid = document.getElementById('products-grid');
const cartBtn = document.getElementById('cart-btn');
const cartPane = document.getElementById('cart');
const closeCartBtn = document.getElementById('close-cart');
const cartCount = document.getElementById('cart-count');
const cartItemsList = document.getElementById('cart-items');
const cartTotalEl = document.getElementById('cart-total');

let cart = [];

function renderProducts() {
  if(!productsGrid) return;
  productsGrid.innerHTML = '';
  products.forEach(p => {
    const card = document.createElement('article');
    card.className = 'temple-card product-card';

    card.innerHTML = `
      <img class="product-image" src="${p.image}" alt="${p.title}" loading="lazy">
      <div class="product-info">
        <h4>${p.title}</h4>
        <p>${p.description}</p>
        <div class="product-actions">
          <span style="font-weight:700;color:var(--accent)">$${p.price.toFixed(2)}</span>
          <button class="btn add-btn" data-id="${p.id}" aria-label="Add ${p.title} to cart">Add</button>
        </div>
      </div>
    `;
    productsGrid.appendChild(card);
  });

  document.querySelectorAll('.add-btn').forEach(btn => {
    btn.addEventListener('click', () => addToCart(btn.dataset.id));
  });
}

function addToCart(id) {
  const prod = products.find(p => p.id === id);
  if(!prod) return;
  const existing = cart.find(item => item.id === id);
  if(existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: prod.id, title: prod.title, price: prod.price, qty: 1 });
  }
  updateCartUI();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartUI();
}

function updateCartUI() {
  cartCount.textContent = cart.reduce((s,i) => s + i.qty, 0);
  cartItemsList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${item.title} x ${item.qty}</span>
      <span>
        $${(item.price * item.qty).toFixed(2)}
        <button class="btn remove-item" data-id="${item.id}" aria-label="Remove ${item.title}">Remove</button>
      </span>
    `;
    cartItemsList.appendChild(li);
  });

  document.querySelectorAll('.remove-item').forEach(b => {
    b.addEventListener('click', () => removeFromCart(b.dataset.id));
  });

  cartTotalEl.textContent = '$' + total.toFixed(2);
}

function openCart(){ cartPane.classList.add('open'); cartPane.setAttribute('aria-hidden','false'); }
function closeCart(){ cartPane.classList.remove('open'); cartPane.setAttribute('aria-hidden','true'); }

cartBtn?.addEventListener('click', () => openCart());
closeCartBtn?.addEventListener('click', () => closeCart());

document.getElementById('checkout-btn')?.addEventListener('click', () => {
  alert('Checkout is not implemented in this demo. Please contact us to complete your order.');
});

const contactForm = document.getElementById('contact-form');
contactForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = contactForm.querySelector('#name').value.trim();
  const email = contactForm.querySelector('#email').value.trim();
  const message = contactForm.querySelector('#message').value.trim();
  if(name && email && message) {
    alert(`Thanks ${name}! We received your message and will respond shortly.`);
    contactForm.reset();
  }
});

renderProducts();
updateCartUI();
