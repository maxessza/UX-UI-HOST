const STORAGE_KEY = 'madeby.demo.v3';
const LEGACY_STORAGE_KEY = 'madeby.demo.v2';
const productGrid = document.querySelector('#product-grid');
const searchInput = document.querySelector('#product-search');
const sortSelect = document.querySelector('#sort-products');
const emptyState = document.querySelector('#empty-state');
const categoryButtons = [...document.querySelectorAll('.category-chip')];
const categoryNames = {
  uxui: 'UX/UI DESIGN',
  web: 'WEB DESIGN',
  template: 'TEMPLATES',
  product: 'PRODUCT & STARTUP',
  idea: 'PROJECT IDEAS',
  dev: 'DEV TOOLS',
};
const categoryIcons = { uxui: '▦', web: '◫', template: '▤', product: '◈', idea: '✧', dev: '⌘' };
const categoryClasses = { uxui: 'cat-purple', web: 'cat-terracotta', template: 'cat-green', product: 'cat-orange', idea: 'cat-pink', dev: 'cat-blue' };
const allowedAssetExtensions = new Set(['zip', 'pdf', 'fig', 'figma', 'sketch', 'xd', 'psd', 'svg', 'png', 'jpg', 'jpeg', 'webp', 'json', 'md', 'txt']);
const staticDetails = {
  'Flowkit — Mobile UI System': { description: 'ชุดหน้าจอและคอมโพเนนต์สำหรับเริ่มต้นออกแบบแอปมือถือ พร้อมแนวทางจัดระบบหน้าจอให้ต่อยอดได้ง่าย', files: 'Figma UI kit · 24 หน้าจอตัวอย่าง', tools: 'Figma' },
  'Slow Studio — Portfolio Template': { description: 'แนวทางหน้าเว็บพอร์ตโฟลิโอสำหรับสตูดิโอและนักสร้างสรรค์ เน้นพื้นที่ว่างและการนำเสนอผลงาน', files: 'Web template · Responsive layout', tools: 'Figma · Web' },
  "The Maker's Desk — Notion Planner": { description: 'พื้นที่วางแผนงานสร้างสรรค์ ตั้งแต่เก็บไอเดีย แบ่งงานย่อย ไปจนถึงติดตามสิ่งที่กำลังทำ', files: 'Notion template · 5 boards', tools: 'Notion' },
  'Launchpad — Product Brief Kit': { description: 'ชุดคำถามและเอกสารตั้งต้นสำหรับทำความเข้าใจปัญหา ผู้ใช้ และแนวคิดผลิตภัณฑ์ก่อนเริ่มลงมือ', files: 'Product brief · PDF + worksheet', tools: 'PDF · FigJam' },
  'API Blueprint — Diagram Pack': { description: 'ไดอะแกรมตัวอย่างสำหรับสื่อสารภาพรวม API และการไหลของข้อมูลในทีมพัฒนา', files: 'Diagram pack · 8 patterns', tools: 'FigJam · Miro' },
  'Soft Signals — Interface Icon Set': { description: 'ไอคอนอินเทอร์เฟซลายเส้นนุ่มนวลสำหรับใช้เป็นจุดเริ่มต้นของระบบภาพในผลิตภัณฑ์ดิจิทัล', files: 'Icon set · SVG + PNG', tools: 'Figma · SVG' },
};
const extraProducts = [
  { id: 'demo-fieldnotes', title: 'Fieldnotes — UX Research Kit', category: 'uxui', price: 280, seller: 'Fern Research', files: 'Research kit · 12 templates', tools: 'FigJam · Figma', description: 'ชุดแม่แบบสำหรับวางแผนบทสัมภาษณ์ สังเคราะห์สิ่งที่ค้นพบ และสรุปโอกาสในการออกแบบ', art: 'research', createdAt: 6 },
  { id: 'demo-north', title: 'North — Landing Page Blocks', category: 'web', price: 440, seller: 'North Studio', files: 'Web blocks · 18 sections', tools: 'Figma · Webflow', description: 'บล็อกหน้าเว็บแบบแยกส่วนสำหรับประกอบหน้าแนะนำสินค้าและบริการได้รวดเร็ว', art: 'north', createdAt: 5 },
  { id: 'demo-micro-saas', title: 'Micro SaaS Idea Cards', category: 'idea', price: 120, seller: 'Tiny Launch Club', files: 'Idea cards · 30 prompts', tools: 'PDF · Notion', description: 'การ์ดคำถามและโจทย์สั้น ๆ สำหรับช่วยคิดโอกาสทำโปรเจกต์ซอฟต์แวร์ขนาดเล็ก', art: 'idea', createdAt: 4 },
  { id: 'demo-weekly', title: 'Studio Week — Notion Planner', category: 'template', price: 190, seller: 'Nicha Creates', files: 'Notion template · 4 views', tools: 'Notion', description: 'เทมเพลตจัดสัปดาห์ทำงานสำหรับฟรีแลนซ์และทีมเล็ก ตั้งแต่รายการงานไปถึงสรุปประจำสัปดาห์', art: 'weekly', createdAt: 3 },
  { id: 'demo-devkit', title: 'Tiny Admin — Dashboard Starter', category: 'dev', price: 520, seller: 'Build Mode', files: 'Starter UI · React patterns', tools: 'React · Figma', description: 'ชุดตั้งต้นสำหรับแดชบอร์ดหลังบ้านที่รวมแนวทางเลย์เอาต์ สถานะ และคอมโพเนนต์พื้นฐาน', art: 'dev', createdAt: 2 },
  { id: 'demo-discovery', title: 'AI Product Discovery Map', category: 'idea', price: 230, seller: 'Krit Product Lab', files: 'Workshop board · PDF guide', tools: 'FigJam · Miro', description: 'บอร์ดเวิร์กช็อปสำหรับสำรวจโจทย์ผลิตภัณฑ์และวางแผนการทดลองแนวคิด AI อย่างเป็นขั้นตอน', art: 'ai', createdAt: 1 },
];

function freshState() {
  return { favorites: [], cart: [], orders: [], reports: [], seller: null, products: [], user: null };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return freshState();
    return {
      favorites: Array.isArray(saved.favorites) ? saved.favorites.filter((item) => typeof item === 'string') : [],
      cart: Array.isArray(saved.cart) ? saved.cart.filter((item) => item && typeof item.id === 'string').map((item) => ({ id: item.id, quantity: Math.max(1, Math.min(20, Number(item.quantity) || 1)) })) : [],
      orders: Array.isArray(saved.orders) ? saved.orders.slice(0, 20) : [],
      reports: Array.isArray(saved.reports) ? saved.reports.slice(0, 100).filter((item) => item && typeof item.id === 'string').map((item) => ({ ...item, status: item.status === 'resolved' ? 'resolved' : 'open' })) : [],
      seller: saved.seller && typeof saved.seller === 'object' ? saved.seller : null,
      products: Array.isArray(saved.products) ? saved.products.filter((item) => item && typeof item.id === 'string' && typeof item.title === 'string').map((item) => ({ ...item, status: item.status || 'published', fileAssets: Array.isArray(item.fileAssets) ? item.fileAssets : [] })) : [],
      user: saved.user && typeof saved.user.email === 'string' ? saved.user : null,
    };
  } catch {
    return freshState();
  }
}

let state = loadState();
let selectedCategory = 'all';
let editingProductId = null;
let toastTimer = 0;
let stagedCoverFile = null;
let stagedCoverUrl = '';
let coverRemoved = false;
let assetsRemoved = false;

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast('บันทึกข้อมูลในเบราว์เซอร์ไม่สำเร็จ');
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function slugify(value) {
  return String(value).toLocaleLowerCase('en').trim().replace(/[^a-z0-9ก-๙]+/g, '-').replace(/^-|-$/g, '') || `product-${Date.now()}`;
}

function money(amount) {
  return `฿${Number(amount || 0).toLocaleString('th-TH')}`;
}

function formatBytes(bytes) {
  const value = Number(bytes) || 0;
  if (value < 1024) return `${value} B`;
  if (value < 1024 * 1024) return `${(value / 1024).toFixed(0)} KB`;
  return `${(value / (1024 * 1024)).toFixed(1)} MB`;
}

function compressCover(file) {
  if (!file) return Promise.resolve('');
  if (file.size > 8 * 1024 * 1024) return Promise.reject(new Error('ภาพปกต้องมีขนาดไม่เกิน 8 MB'));
  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) return Promise.reject(new Error('รองรับเฉพาะภาพ PNG, JPG หรือ WebP'));
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      const scale = Math.min(1, 900 / Math.max(image.naturalWidth, image.naturalHeight));
      const canvas = document.createElement('canvas');
      canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
      const context = canvas.getContext('2d');
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const data = canvas.toDataURL('image/jpeg', 0.66);
      URL.revokeObjectURL(url);
      if (data.length <= 320000) resolve(data);
      else {
        canvas.width = Math.max(1, Math.round(canvas.width * 0.72));
        canvas.height = Math.max(1, Math.round(canvas.height * 0.72));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        const smaller = canvas.toDataURL('image/jpeg', 0.52);
        if (smaller.length > 360000) reject(new Error('ภาพปกยังมีขนาดใหญ่เกินไป ลองเลือกภาพที่เล็กลง'));
        else resolve(smaller);
      }
    };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('เปิดไฟล์ภาพไม่สำเร็จ')); };
    image.src = url;
  });
}

function showToast(message) {
  let toast = document.querySelector('#toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    document.body.append(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove('visible'), 2600);
}

function staticCardDefaults(card) {
  const title = card.querySelector('.product-title')?.textContent.trim() || 'Untitled';
  const creator = card.querySelector('.creator-row')?.textContent.trim() || '';
  const priceText = card.querySelector('.product-price')?.textContent || '0';
  const price = Number(priceText.replace(/[^0-9.]/g, '')) || 0;
  const details = staticDetails[title] || { description: 'ตัวอย่างผลงานดิจิทัลจากครีเอเตอร์บน Madeby', files: 'รายละเอียดไฟล์ตัวอย่าง', tools: 'ระบุโดยผู้ขาย' };
  const seller = creator.replace(/^โดย\s*/, '').replace(/฿[\d,.]+/g, '').trim();
  card.dataset.id = card.dataset.id || slugify(title);
  card.dataset.title = title;
  card.dataset.price = String(price);
  card.dataset.seller = seller || 'ครีเอเตอร์ตัวอย่าง';
  card.dataset.files = details.files;
  card.dataset.tools = details.tools;
  card.dataset.description = details.description;
  card.dataset.createdAt = '0';
  card.dataset.status = 'published';
  const saveButton = card.querySelector('.save-button');
  if (saveButton) saveButton.setAttribute('aria-pressed', String(state.favorites.includes(card.dataset.id)));
}

function extraProductCard(product) {
  const card = document.createElement('article');
  card.className = 'product-card';
  card.dataset.id = product.id;
  card.dataset.category = product.category;
  card.dataset.title = product.title;
  card.dataset.price = String(product.price);
  card.dataset.seller = product.seller;
  card.dataset.files = product.files;
  card.dataset.tools = product.tools;
  card.dataset.description = product.description;
  card.dataset.createdAt = String(product.createdAt || 0);
  card.dataset.status = product.status || 'published';
  card.dataset.assets = JSON.stringify(Array.isArray(product.fileAssets) ? product.fileAssets : []);
  card.dataset.search = `${product.title} ${product.seller} ${product.files} ${product.tools} ${product.description}`;
  const safeTitle = escapeHtml(product.title);
  const safeSeller = escapeHtml(product.seller);
  const safeDescription = escapeHtml(product.description);
  const safeCategory = escapeHtml(categoryNames[product.category] || 'DIGITAL GOODS');
  const visual = ['research', 'north', 'idea', 'weekly', 'dev', 'ai'].includes(product.art) ? product.art : product.category;
  const icon = categoryIcons[product.category] || '✳';
  const avatarLetter = escapeHtml((product.seller || 'M').trim().charAt(0).toUpperCase());
  const coverMarkup = product.coverImage ? `<img class="product-cover-image" src="${escapeHtml(product.coverImage)}" alt="" />` : '';
  card.innerHTML = `
    <button class="product-visual extra-visual extra-${visual} ${product.coverImage ? 'has-cover' : ''}" type="button" data-product="${escapeHtml(product.id)}" aria-label="ดูรายละเอียด ${safeTitle}">
      ${coverMarkup}
      <span class="extra-kicker">${safeCategory} <i>· MADEBY SELECT</i></span>
      <span class="extra-art-icon" aria-hidden="true">${icon}</span>
      <span class="extra-art-title">${safeTitle}</span>
      <span class="extra-art-lines" aria-hidden="true"><i></i><i></i><i></i></span>
      <span class="visual-corner">+${String(product.createdAt || 1).padStart(2, '0')}</span>
    </button>
    <div class="product-info">
      <div class="product-meta"><span class="product-category ${categoryClasses[product.category] || 'cat-purple'}">${safeCategory}</span><button class="save-button" type="button" aria-label="บันทึก ${safeTitle}" aria-pressed="${state.favorites.includes(product.id)}">♡</button></div>
      <button class="product-title" type="button" data-product="${escapeHtml(product.id)}">${safeTitle}</button>
      <div class="creator-row"><span class="creator-avatar avatar-lilac">${avatarLetter}</span><span>โดย ${safeSeller}</span><span class="product-price">${money(product.price)}</span></div>
    </div>`;
  return card;
}

function renderCatalog() {
  productGrid.querySelectorAll('[data-extra="true"], [data-own="true"]').forEach((card) => card.remove());
  const staticCards = [...productGrid.querySelectorAll('.product-card')];
  staticCards.forEach(staticCardDefaults);
  const existingIds = new Set(staticCards.map((card) => card.dataset.id));

  const publicSellerProducts = state.products.filter((product) => product.status === 'published');
  const extras = [...extraProducts, ...publicSellerProducts].filter((product, index, list) => list.findIndex((candidate) => candidate.id === product.id) === index && !existingIds.has(product.id));
  extras.forEach((product) => {
    const card = extraProductCard(product);
    if (state.products.some((saved) => saved.id === product.id)) card.dataset.own = 'true';
    else card.dataset.extra = 'true';
    productGrid.append(card);
  });
  productGrid.querySelectorAll('.save-button').forEach((button) => {
    const card = button.closest('.product-card');
    button.setAttribute('aria-pressed', String(state.favorites.includes(card?.dataset.id)));
    button.textContent = state.favorites.includes(card?.dataset.id) ? '♥' : '♡';
  });
  renderProducts();
}

function renderProducts() {
  const cards = [...productGrid.querySelectorAll('.product-card')];
  const query = searchInput.value.trim().toLocaleLowerCase('th');
  const sort = sortSelect.value;
  let visible = [];

  cards.forEach((card) => {
    const categoryMatches = selectedCategory === 'all'
      || (selectedCategory === 'saved' ? state.favorites.includes(card.dataset.id) : card.dataset.category === selectedCategory);
    const searchable = `${card.dataset.search || ''} ${card.dataset.title || ''} ${card.dataset.seller || ''} ${card.dataset.files || ''} ${card.dataset.tools || ''} ${card.textContent}`.toLocaleLowerCase('th');
    const searchMatches = !query || searchable.includes(query);
    const shouldShow = categoryMatches && searchMatches;
    card.hidden = !shouldShow;
    if (shouldShow) visible.push(card);
  });

  visible.sort((left, right) => {
    if (sort === 'price-low') return Number(left.dataset.price) - Number(right.dataset.price);
    if (sort === 'price-high') return Number(right.dataset.price) - Number(left.dataset.price);
    if (sort === 'newest') return Number(right.dataset.createdAt) - Number(left.dataset.createdAt);
    return Number(left.dataset.createdAt) - Number(right.dataset.createdAt) || left.dataset.title.localeCompare(right.dataset.title, 'th');
  });
  visible.forEach((card) => productGrid.append(card));
  emptyState.hidden = visible.length > 0;
  document.querySelector('#result-count').textContent = `แสดง ${visible.length} จาก ${cards.length} รายการ`;
}

function currentCard(id) {
  return [...productGrid.querySelectorAll('.product-card')].find((card) => card.dataset.id === id);
}

function openDialog(dialog) {
  document.querySelectorAll('dialog[open]').forEach((openDialogElement) => {
    if (openDialogElement !== dialog) openDialogElement.close();
  });
  if (!dialog.open) dialog.showModal();
}

function productFromCard(card) {
  let assets = [];
  try { assets = JSON.parse(card.dataset.assets || '[]'); } catch { assets = []; }
  return {
    id: card.dataset.id,
    title: card.dataset.title,
    category: card.dataset.category,
    price: Number(card.dataset.price) || 0,
    seller: card.dataset.seller || 'ครีเอเตอร์ตัวอย่าง',
    files: card.dataset.files || 'รายละเอียดไฟล์ตัวอย่าง',
    tools: card.dataset.tools || 'ระบุโดยผู้ขาย',
    description: card.dataset.description || 'ตัวอย่างผลงานดิจิทัลจากครีเอเตอร์บน Madeby',
    assets: Array.isArray(assets) ? assets : [],
  };
}

function openProduct(id) {
  const card = currentCard(id);
  if (!card) return;
  const product = productFromCard(card);
  const art = document.querySelector('#detail-art');
  art.className = `detail-art detail-${product.category}`;
  const sourceVisual = card.querySelector('.product-visual');
  const preview = document.createElement('div');
  preview.className = `detail-visual-preview ${sourceVisual.className.replace('product-visual', '')}`;
  preview.innerHTML = sourceVisual.innerHTML;
  art.replaceChildren(preview);
  document.querySelector('#detail-category').textContent = categoryNames[product.category] || 'DIGITAL GOODS';
  document.querySelector('#detail-category').className = `product-category ${categoryClasses[product.category] || 'cat-purple'}`;
  document.querySelector('#dialog-title').textContent = product.title;
  document.querySelector('#dialog-description').textContent = product.description;
  document.querySelector('#detail-specs').innerHTML = `
    <div><span>ครีเอเตอร์</span><strong>${escapeHtml(product.seller)}</strong></div>
    <div><span>ไฟล์ที่ได้รับ</span><strong>${escapeHtml(product.files)}</strong></div>
    <div><span>ไฟล์ตัวอย่าง</span><strong>${product.assets.length ? escapeHtml(product.assets.map((file) => file.name).join(', ')) : 'ไฟล์ดิจิทัล'}</strong></div>
    <div><span>เครื่องมือ</span><strong>${escapeHtml(product.tools)}</strong></div>`;
  document.querySelector('#detail-price').textContent = money(product.price);
  document.querySelector('#add-to-cart').dataset.productId = product.id;
  document.querySelector('#toggle-report-form').dataset.productId = product.id;
  document.querySelector('#toggle-report-form').setAttribute('aria-expanded', 'false');
  document.querySelector('#report-form').hidden = true;
  document.querySelector('#report-form').reset();
  openDialog(document.querySelector('#product-dialog'));
}

function toggleFavorite(id, button) {
  if (!id) return;
  const index = state.favorites.indexOf(id);
  if (index >= 0) state.favorites.splice(index, 1);
  else state.favorites.push(id);
  persistState();
  button.setAttribute('aria-pressed', String(index < 0));
  button.textContent = index < 0 ? '♥' : '♡';
  if (selectedCategory === 'saved') renderProducts();
  updateAccount();
  showToast(index < 0 ? 'บันทึกรายการนี้แล้ว' : 'นำออกจากรายการที่บันทึกแล้ว');
}

function cartQuantity() {
  return state.cart.reduce((total, item) => total + item.quantity, 0);
}

function cartTotal() {
  return state.cart.reduce((total, item) => total + (Number(currentCard(item.id)?.dataset.price) || 0) * item.quantity, 0);
}

function addToCart(id) {
  const card = currentCard(id);
  if (!card) return;
  const item = state.cart.find((line) => line.id === id);
  if (item) item.quantity = Math.min(20, item.quantity + 1);
  else state.cart.push({ id, quantity: 1 });
  persistState();
  renderCart();
  updateAccount();
  showToast('เพิ่มลงตะกร้าแล้ว');
}

function renderCart() {
  const list = document.querySelector('#cart-items');
  const activeLines = state.cart.filter((item) => currentCard(item.id));
  if (activeLines.length !== state.cart.length) {
    state.cart = activeLines;
    persistState();
  }
  document.querySelector('#cart-count').textContent = String(cartQuantity());
  document.querySelector('#cart-button').setAttribute('aria-label', `เปิดตะกร้า มี ${cartQuantity()} รายการ`);
  document.querySelector('#cart-total').textContent = money(cartTotal());
  document.querySelector('#checkout-button').disabled = cartQuantity() === 0;

  if (!state.cart.length) {
    list.innerHTML = '<div class="cart-empty"><span aria-hidden="true">▱</span><strong>ตะกร้ายังว่างอยู่</strong><p>เลือกผลงานที่สนใจ แล้วกลับมาดูได้ที่นี่</p><button class="text-button" type="button" data-close-dialog="cart-dialog">กลับไปเลือกผลงาน</button></div>';
    return;
  }
  list.innerHTML = state.cart.map((item) => {
    const card = currentCard(item.id);
    if (!card) return '';
    const product = productFromCard(card);
    return `<article class="cart-line"><div class="cart-line-art detail-${escapeHtml(product.category)}">${categoryIcons[product.category] || '✳'}</div><div class="cart-line-info"><strong>${escapeHtml(product.title)}</strong><span>${escapeHtml(product.seller)}</span><b>${money(product.price)}</b><div class="quantity-control"><button type="button" data-cart-change="-1" data-cart-id="${escapeHtml(item.id)}" aria-label="ลดจำนวน">−</button><span>${item.quantity}</span><button type="button" data-cart-change="1" data-cart-id="${escapeHtml(item.id)}" aria-label="เพิ่มจำนวน">＋</button><button class="remove-cart" type="button" data-remove-cart="${escapeHtml(item.id)}">นำออก</button></div></div></article>`;
  }).join('');
  persistState();
}

function renderCheckout() {
  const summary = document.querySelector('#checkout-summary');
  summary.innerHTML = `<div class="checkout-lines">${state.cart.map((item) => {
    const card = currentCard(item.id);
    if (!card) return '';
    return `<div><span>${escapeHtml(card.dataset.title)} × ${item.quantity}</span><strong>${money(Number(card.dataset.price) * item.quantity)}</strong></div>`;
  }).join('')}</div><div class="cart-summary"><span>ยอดรวมตัวอย่าง</span><strong>${money(cartTotal())}</strong></div>`;
}

function updateAccount() {
  const user = state.user || { displayName: 'ผู้เยี่ยมชม', email: 'guest@madeby.demo' };
  document.querySelector('#account-title').textContent = `สวัสดี, ${user.displayName || 'ผู้ใช้ Madeby'}`;
  document.querySelector('#account-email').textContent = user.email || '';
  document.querySelector('#account-avatar').textContent = String(user.displayName || 'M').trim().charAt(0).toUpperCase();
  document.querySelector('#account-button .account-full').textContent = state.user ? user.displayName : 'เข้าสู่ระบบ';
  document.querySelector('#account-button .account-short').textContent = state.user ? String(user.displayName).slice(0, 7) : 'บัญชี';
  document.querySelector('#account-profile-form').elements.displayName.value = user.displayName || '';
  document.querySelector('#account-profile-form').elements.email.value = user.email || '';
  document.querySelector('#account-saved-count').textContent = String(state.favorites.length);
  document.querySelector('#account-order-count').textContent = String(state.orders.length);
  const downloadCount = state.orders.reduce((count, order) => count + (Array.isArray(order.items) ? order.items.reduce((lineCount, item) => lineCount + (Number(item.quantity) || 1), 0) : 0), 0);
  document.querySelector('#account-download-count').textContent = String(downloadCount);
  document.querySelector('#account-seller-action').innerHTML = state.seller
    ? 'จัดการหน้าร้าน <span aria-hidden="true">↗</span>'
    : 'สมัครเป็นผู้ขาย <span aria-hidden="true">↗</span>';
  const history = document.querySelector('#account-history');
  if (!state.orders.length) {
    history.innerHTML = '<div class="history-empty">คำสั่งซื้อจำลองที่ยืนยันแล้วจะแสดงที่นี่</div>';
  } else {
    history.innerHTML = `<h3>คำสั่งซื้อล่าสุด</h3>${state.orders.slice(0, 3).map((order) => `<div class="history-row"><span>${escapeHtml(order.date || 'รายการล่าสุด')} · ${Number(order.count) || 0} รายการ</span><strong>${money(order.total)}</strong></div>`).join('')}`;
  }
  renderAccountOrders();
  renderAccountDownloads();
  renderAccountSaved();
}

function renderAccountOrders() {
  const target = document.querySelector('#account-orders-list');
  if (!state.orders.length) {
    target.innerHTML = '<div class="history-empty">ยังไม่มีคำสั่งซื้อจำลอง</div>';
    return;
  }
  target.innerHTML = state.orders.map((order) => {
    const lines = Array.isArray(order.items) ? order.items.map((item) => {
      const current = currentCard(item.id);
      const title = item.title || current?.dataset.title || 'รายการตัวอย่าง';
      return `<li>${escapeHtml(title)} × ${Number(item.quantity) || 1}</li>`;
    }).join('') : '';
    return `<details class="order-card"><summary><span><b>${escapeHtml(order.id || 'คำสั่งซื้อ')}</b><small>${escapeHtml(order.date || 'รายการล่าสุด')}</small></span><strong>${money(order.total)}</strong></summary><ul>${lines || '<li>รายละเอียดสินค้าจำลอง</li>'}</ul><span class="order-status">สำเร็จ · จำลอง</span></details>`;
  }).join('');
}

function renderAccountDownloads() {
  const target = document.querySelector('#account-downloads-list');
  const bought = [];
  state.orders.forEach((order) => (Array.isArray(order.items) ? order.items : []).forEach((item) => {
    const id = item.id || item.productId;
    const card = currentCard(id);
    bought.push({ ...item, id, title: item.title || card?.dataset.title || 'สินค้าดิจิทัล', files: item.files || card?.dataset.files || 'ไฟล์ตัวอย่าง' });
  }));
  if (!bought.length) {
    target.innerHTML = '<div class="history-empty">หลังสั่งซื้อแล้ว รายการดาวน์โหลดจะแสดงที่นี่</div>';
    return;
  }
  target.innerHTML = bought.map((item) => `<div class="download-row"><span class="download-icon">↓</span><div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.files)}</small></div><button type="button" data-demo-download="${escapeHtml(item.id)}">ดูไฟล์</button></div>`).join('');
}

function renderAccountSaved() {
  const target = document.querySelector('#account-saved-list');
  const cards = state.favorites.map((id) => currentCard(id)).filter(Boolean);
  if (!cards.length) {
    target.innerHTML = '<div class="history-empty">รายการที่กดบันทึกจะปรากฏที่นี่</div>';
    return;
  }
  target.innerHTML = cards.map((card) => `<div class="saved-row"><button type="button" data-product="${escapeHtml(card.dataset.id)}">${escapeHtml(card.dataset.title)}</button><strong>${money(card.dataset.price)}</strong><button class="remove-saved" type="button" data-saved-remove="${escapeHtml(card.dataset.id)}" aria-label="นำออกจากรายการที่บันทึก">×</button></div>`).join('');
}

function setAccountTab(name) {
  document.querySelectorAll('[data-account-tab]').forEach((button) => {
    const active = button.dataset.accountTab === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-selected', String(active));
  });
  document.querySelectorAll('.account-pane').forEach((pane) => { pane.hidden = pane.id !== `account-pane-${name}`; });
}

function setAuthMode(mode) {
  const panel = ({ login: 'auth-login-panel', register: 'auth-register-panel', reset: 'auth-reset-panel' })[mode] || 'auth-login-panel';
  document.querySelectorAll('.auth-panel').forEach((item) => { item.hidden = item.id !== panel; });
  document.querySelector('#auth-title').textContent = mode === 'register' ? 'สร้างบัญชี Madeby' : mode === 'reset' ? 'ตั้งรหัสผ่านใหม่' : 'ยินดีต้อนรับกลับ';
}

function beginDemoSession(displayName, email) {
  state.user = { displayName: String(displayName || 'ผู้ใช้ Madeby').trim(), email: String(email || '').trim().toLowerCase() };
  persistState();
  updateAccount();
  document.querySelector('#auth-dialog').close();
  setAccountTab('overview');
  openDialog(document.querySelector('#account-dialog'));
  showToast('เข้าสู่ระบบจำลองแล้ว');
}

function openAccount() {
  if (!state.user) {
    setAuthMode('login');
    openDialog(document.querySelector('#auth-dialog'));
    return;
  }
  updateAccount();
  setAccountTab('overview');
  openDialog(document.querySelector('#account-dialog'));
}

function renderAdmin() {
  const pending = state.products.filter((product) => product.status === 'pending');
  const published = state.products.filter((product) => product.status === 'published');
  const openReports = state.reports.filter((report) => report.status !== 'resolved');
  document.querySelector('#admin-pending-count').textContent = String(pending.length);
  document.querySelector('#admin-published-count').textContent = String(published.length);
  document.querySelector('#admin-report-count').textContent = String(openReports.length);
  const queue = document.querySelector('#admin-product-queue');
  queue.innerHTML = pending.length ? pending.map((product) => `
    <article class="moderation-card"><div class="moderation-info"><span class="product-category ${categoryClasses[product.category] || 'cat-purple'}">${escapeHtml(categoryNames[product.category] || 'DIGITAL GOODS')}</span><h3>${escapeHtml(product.title)}</h3><p>${escapeHtml(product.description)}</p><small>ผู้ขาย ${escapeHtml(product.seller)} · ${money(product.price)} · ${escapeHtml(product.files)}</small></div><div class="moderation-actions"><button class="button button-primary" type="button" data-admin-decision="published" data-product-id="${escapeHtml(product.id)}">อนุมัติ</button><button class="button button-outline" type="button" data-admin-decision="rejected" data-product-id="${escapeHtml(product.id)}">ส่งกลับแก้ไข</button></div></article>`).join('') : '<div class="history-empty">ไม่มีสินค้ารอตรวจในตอนนี้</div>';
  const reasonLabels = { copyright: 'ปัญหาลิขสิทธิ์', misleading: 'รายละเอียดไม่ตรง', quality: 'ไฟล์หรือผลงานมีปัญหา', other: 'อื่น ๆ' };
  const reports = [...state.reports].sort((left, right) => Number(left.status === 'resolved') - Number(right.status === 'resolved'));
  const reportQueue = document.querySelector('#admin-report-queue');
  reportQueue.innerHTML = reports.length ? reports.map((report) => `
    <article class="report-card ${report.status === 'resolved' ? 'is-resolved' : ''}">
      <div><div class="report-card-heading"><strong>${escapeHtml(report.productTitle || 'ผลงานที่ถูกรายงาน')}</strong><span class="report-status">${report.status === 'resolved' ? 'ปิดเรื่องแล้ว' : 'รอตรวจสอบ'}</span></div>
      <p>${escapeHtml(reasonLabels[report.reason] || 'ไม่ระบุเหตุผล')} · ผู้ขาย ${escapeHtml(report.seller || 'ไม่ระบุ')}</p>
      <p class="report-message">${escapeHtml(report.message || 'ไม่มีรายละเอียดเพิ่มเติม')}</p>
      <small>${escapeHtml(report.date || 'รายงานตัวอย่าง')}</small></div>
      <button class="button ${report.status === 'resolved' ? 'button-outline' : 'button-primary'}" type="button" data-report-decision="${report.status === 'resolved' ? 'open' : 'resolved'}" data-report-id="${escapeHtml(report.id)}">${report.status === 'resolved' ? 'เปิดเรื่องอีกครั้ง' : 'ทำเครื่องหมายว่าจัดการแล้ว'}</button>
    </article>`).join('') : '<div class="history-empty">ยังไม่มีรายงานปัญหา</div>';
}

function setAdminTab(name) {
  document.querySelectorAll('[data-admin-tab]').forEach((button) => {
    const active = button.dataset.adminTab === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.admin-pane').forEach((pane) => { pane.hidden = pane.id !== `admin-pane-${name}`; });
}

const helpCopy = {
  buying: ['วิธีซื้อสินค้า', 'เลือกผลงานเพื่อดูรายละเอียดและรูปแบบไฟล์ จากนั้นเพิ่มลงตะกร้าและตรวจสอบรายการ ในตัวอย่างนี้การยืนยันคำสั่งซื้อไม่เรียกเก็บเงินและไม่มีการส่งไฟล์'],
  terms: ['ข้อกำหนดการใช้แพลตฟอร์ม', 'เวอร์ชันจริงควรอธิบายบทบาทของแพลตฟอร์ม ผู้ขายและผู้ซื้อ การระงับบัญชี สินค้าต้องห้าม ค่าธรรมเนียม และช่องทางอุทธรณ์ ข้อความนี้เป็นโครงร่างสำหรับต้นแบบเท่านั้น'],
  license: ['สิทธิ์การใช้งาน', 'ผู้ขายควรระบุสิทธิ์การใช้งาน ข้อจำกัดการแก้ไข การใช้งานเชิงพาณิชย์ และเงื่อนไขการแจกจ่ายซ้ำให้ชัดเจนก่อนเปิดขาย ข้อความนี้เป็นเพียงโครงร่างสำหรับต้นแบบ'],
  privacy: ['ความเป็นส่วนตัวในโหมด Demo', 'ข้อมูลบัญชี ร้านค้า รายการโปรด และคำสั่งซื้อจำลองถูกเก็บใน localStorage ของเบราว์เซอร์นี้ ไม่มีการส่งไปยังเซิร์ฟเวอร์ ใช้ปุ่ม “ล้างข้อมูลตัวอย่าง” ในหน้าบัญชีเพื่อลบข้อมูลในเครื่อง'],
  refund: ['การคืนเงินและการช่วยเหลือ', 'นโยบายคืนเงินจริงยังไม่ได้กำหนด เพราะต้นแบบไม่มีการชำระเงิน เมื่อเปิดใช้งานควรระบุช่องทางติดต่อ ระยะเวลาดำเนินการ และแนวทางจัดการไฟล์ที่เสียหายหรือไม่ตรงคำอธิบาย'],
};

function setHelpPage(page) {
  document.querySelectorAll('.help-tabs [data-help-page]').forEach((button) => {
    const active = button.dataset.helpPage === page;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  const content = document.querySelector('#help-content');
  if (page === 'contact') {
    content.innerHTML = `<h3>ติดต่อทีมงาน</h3><p>ฟอร์มนี้เป็นตัวอย่างและจะไม่ส่งข้อความออกจากเบราว์เซอร์</p><form id="contact-form" class="form-grid single-column"><label>ชื่อ<input name="name" required maxlength="50" placeholder="ชื่อที่ใช้ติดต่อ" /></label><label>อีเมล<input name="email" type="email" required maxlength="100" placeholder="you@example.com" /></label><label>ข้อความ<textarea name="message" required maxlength="500" rows="4" placeholder="เล่าให้เราฟังว่าต้องการความช่วยเหลือเรื่องใด"></textarea></label><button class="button button-primary form-full" type="submit">ส่งข้อความตัวอย่าง</button></form>`;
    return;
  }
  const [title, text] = helpCopy[page] || helpCopy.buying;
  content.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><div class="help-disclaimer">ข้อความในหน้านี้เป็นเนื้อหาตัวอย่างสำหรับออกแบบ หน้าข้อกำหนดจริงควรผ่านการตรวจสอบก่อนเปิดให้บริการ</div>`;
}

function showSellerForm(editing = false) {
  document.querySelector('#seller-dashboard').hidden = true;
  document.querySelector('#seller-onboarding').hidden = false;
  document.querySelector('#seller-dialog-title').textContent = editing ? 'แก้ไขข้อมูลร้าน' : 'สร้างหน้าร้านตัวอย่าง';
  const form = document.querySelector('#seller-form');
  form.elements.displayName.value = editing ? state.seller?.displayName || '' : '';
  form.elements.storeName.value = editing ? state.seller?.storeName || '' : '';
  form.elements.email.value = editing ? state.seller?.email || '' : '';
  form.elements.portfolio.value = editing ? state.seller?.portfolio || '' : '';
  form.elements.category.value = editing ? state.seller?.category || 'uxui' : 'uxui';
  form.elements.agree.checked = editing;
  const submit = form.querySelector('button[type="submit"]');
  submit.innerHTML = editing ? 'บันทึกข้อมูลร้าน <span aria-hidden="true">✓</span>' : 'สร้างหน้าร้านตัวอย่าง <span aria-hidden="true">↗</span>';
}

function renderSellerDashboard() {
  if (!state.seller) return;
  document.querySelector('#seller-onboarding').hidden = true;
  document.querySelector('#seller-dashboard').hidden = false;
  document.querySelector('#seller-store-title').textContent = state.seller.storeName;
  const own = state.products;
  document.querySelector('#seller-product-count').textContent = String(own.length);
  document.querySelector('#seller-profile-name').textContent = `${state.seller.displayName} · ${state.seller.storeName}`;
  document.querySelector('#seller-profile-email').textContent = state.seller.email;
  const portfolioLink = document.querySelector('#seller-profile-link');
  if (String(state.seller.portfolio || '').startsWith('https://')) {
    portfolioLink.href = state.seller.portfolio;
    portfolioLink.hidden = false;
  } else portfolioLink.hidden = true;
  const list = document.querySelector('#seller-product-list');
  list.innerHTML = own.length ? own.map((product) => `
    <article class="seller-listing"><div class="listing-avatar">${categoryIcons[product.category] || '✳'}</div><div class="listing-info"><strong>${escapeHtml(product.title)}</strong><span>${escapeHtml(categoryNames[product.category] || 'DIGITAL GOODS')} · ${money(product.price)} · <i class="status-${escapeHtml(product.status || 'pending')}">${statusLabel(product.status)}</i></span></div><div class="listing-actions"><button type="button" data-edit-product="${escapeHtml(product.id)}">แก้ไข</button><button type="button" data-delete-product="${escapeHtml(product.id)}">ลบ</button></div></article>`).join('') : '<div class="history-empty">ยังไม่มีผลงาน เพิ่มรายการแรกของร้านได้เลย</div>';

  const sales = state.orders.flatMap((order) => (Array.isArray(order.items) ? order.items : []).map((item) => ({ ...item, date: order.date, orderId: order.id }))).filter((item) => item.seller === state.seller.storeName);
  const salesTotal = sales.reduce((total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 1), 0);
  document.querySelector('#seller-sales-total').textContent = money(salesTotal);
  document.querySelector('#seller-payout-total').textContent = money(salesTotal);
  document.querySelector('#seller-order-count').textContent = String(new Set(sales.map((item) => item.orderId)).size);
  const orderList = document.querySelector('#seller-order-list');
  orderList.innerHTML = sales.length ? sales.map((item) => `<div class="seller-order-row"><span><b>${escapeHtml(item.title || 'สินค้าดิจิทัล')}</b><small>${escapeHtml(item.date || 'รายการล่าสุด')} · ${Number(item.quantity) || 1} ชิ้น</small></span><strong>${money((Number(item.price) || 0) * (Number(item.quantity) || 1))}</strong></div>`).join('') : '<div class="history-empty">เมื่อมีคำสั่งซื้อสินค้าของร้าน รายการจะปรากฏที่นี่</div>';
  setSellerTab('products');
}

function statusLabel(status) {
  return ({ pending: 'รอตรวจ', published: 'เผยแพร่', rejected: 'ต้องแก้ไข' })[status] || 'รอตรวจ';
}

function setSellerTab(name) {
  document.querySelectorAll('[data-seller-tab]').forEach((button) => {
    const active = button.dataset.sellerTab === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.seller-pane').forEach((pane) => { pane.hidden = pane.id !== `seller-pane-${name}`; });
}

function openSeller() {
  if (state.seller) renderSellerDashboard();
  else showSellerForm(false);
  openDialog(document.querySelector('#seller-dialog'));
}

function startProductForm(product = null) {
  editingProductId = product?.id || null;
  stagedCoverFile = null;
  coverRemoved = false;
  assetsRemoved = false;
  if (stagedCoverUrl) URL.revokeObjectURL(stagedCoverUrl);
  stagedCoverUrl = '';
  const form = document.querySelector('#product-form');
  form.reset();
  document.querySelector('#cover-preview').hidden = true;
  document.querySelector('#selected-assets span').textContent = 'ยังไม่ได้เลือกไฟล์';
  if (product) {
    form.elements.title.value = product.title;
    form.elements.category.value = product.category;
    form.elements.price.value = String(product.price);
    form.elements.fileType.value = product.files;
    form.elements.tools.value = product.tools;
    form.elements.description.value = product.description;
    if (product.coverImage) {
      document.querySelector('#cover-preview-image').src = product.coverImage;
      document.querySelector('#cover-preview').hidden = false;
    }
    if (product.fileAssets?.length) document.querySelector('#selected-assets span').textContent = product.fileAssets.map((file) => `${file.name} (${formatBytes(file.size)})`).join(' · ');
  }
  document.querySelector('#product-form-title').textContent = product ? 'แก้ไขผลงาน' : 'เพิ่มผลงาน';
  form.querySelector('button[type="submit"]').innerHTML = product ? 'บันทึกการแก้ไข <span aria-hidden="true">✓</span>' : 'บันทึกรายการตัวอย่าง <span aria-hidden="true">✓</span>';
  openDialog(document.querySelector('#product-form-dialog'));
}

function resetFilters() {
  searchInput.value = '';
  sortSelect.value = 'featured';
  selectedCategory = 'all';
  categoryButtons.forEach((button) => {
    const active = button.dataset.filter === 'all';
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  renderProducts();
}

// Prepare product details and the six additional sample listings.
renderCatalog();
renderCart();
updateAccount();
renderAdmin();
setHelpPage('buying');

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    selectedCategory = button.dataset.filter;
    categoryButtons.forEach((candidate) => {
      const active = candidate === button;
      candidate.classList.toggle('active', active);
      candidate.setAttribute('aria-pressed', String(active));
    });
    renderProducts();
  });
});
searchInput.addEventListener('input', renderProducts);
sortSelect.addEventListener('change', renderProducts);
document.querySelector('#show-more').addEventListener('click', resetFilters);

productGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.product-card');
  if (!card) return;
  const favorite = event.target.closest('.save-button');
  if (favorite) {
    toggleFavorite(card.dataset.id, favorite);
    return;
  }
  if (event.target.closest('[data-product]')) openProduct(card.dataset.id);
});

document.querySelectorAll('[data-open-seller]').forEach((button) => button.addEventListener('click', openSeller));
document.querySelector('#account-button').addEventListener('click', openAccount);
document.querySelectorAll('[data-auth-mode]').forEach((button) => button.addEventListener('click', () => setAuthMode(button.dataset.authMode)));
document.querySelector('#auth-login-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const email = String(new FormData(event.currentTarget).get('email') || '').trim();
  beginDemoSession(email.split('@')[0].replace(/[._-]+/g, ' ') || 'ผู้ใช้ Madeby', email);
});
document.querySelector('#auth-register-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (form.elements.password.value !== form.elements.confirmPassword.value) {
    showToast('รหัสผ่านทั้งสองช่องไม่ตรงกัน');
    form.elements.confirmPassword.focus();
    return;
  }
  const formData = new FormData(form);
  beginDemoSession(String(formData.get('name') || '').trim(), String(formData.get('email') || '').trim());
  form.reset();
});
document.querySelector('#auth-reset-form').addEventListener('submit', (event) => {
  event.preventDefault();
  event.currentTarget.reset();
  showToast('แสดงตัวอย่างแล้ว: ไม่มีอีเมลถูกส่ง');
});
document.querySelector('#demo-login').addEventListener('click', () => beginDemoSession('Demo Buyer', 'buyer@madeby.demo'));
document.querySelector('#sign-out-button').addEventListener('click', () => {
  state.user = null;
  persistState();
  updateAccount();
  document.querySelector('#account-dialog').close();
  setAuthMode('login');
  openDialog(document.querySelector('#auth-dialog'));
});
document.querySelector('#account-profile-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const previousEmail = state.user?.email;
  state.user = {
    displayName: String(formData.get('displayName') || '').trim(),
    email: String(formData.get('email') || '').trim().toLowerCase(),
  };
  if (state.seller && state.seller.email.toLowerCase() === previousEmail) {
    state.seller.displayName = state.user.displayName;
    state.seller.email = state.user.email;
  }
  persistState();
  updateAccount();
  showToast('อัปเดตโปรไฟล์ตัวอย่างแล้ว');
});
document.querySelectorAll('[data-account-tab]').forEach((button) => button.addEventListener('click', () => setAccountTab(button.dataset.accountTab)));
document.querySelector('#account-seller-action').addEventListener('click', () => {
  document.querySelector('#account-dialog').close();
  if (state.seller) renderSellerDashboard();
  else showSellerForm(false);
  openDialog(document.querySelector('#seller-dialog'));
});
document.querySelector('#open-admin-demo').addEventListener('click', () => {
  renderAdmin();
  setAdminTab('moderation');
  openDialog(document.querySelector('#admin-dialog'));
});
document.querySelector('#clear-demo-data').addEventListener('click', () => {
  if (!window.confirm('ล้างบัญชี รายการที่บันทึก ตะกร้า คำสั่งซื้อ และข้อมูลร้านตัวอย่างจากเบราว์เซอร์นี้หรือไม่?')) return;
  state = freshState();
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  persistState();
  resetFilters();
  renderCatalog();
  renderCart();
  renderAdmin();
  updateAccount();
  document.querySelector('#account-dialog').close();
  setAuthMode('login');
  openDialog(document.querySelector('#auth-dialog'));
  showToast('ล้างข้อมูลตัวอย่างแล้ว');
});
document.querySelectorAll('[data-seller-tab]').forEach((button) => button.addEventListener('click', () => setSellerTab(button.dataset.sellerTab)));
document.querySelectorAll('[data-admin-tab]').forEach((button) => button.addEventListener('click', () => setAdminTab(button.dataset.adminTab)));
document.querySelectorAll('[data-help-page]').forEach((button) => button.addEventListener('click', () => {
  setHelpPage(button.dataset.helpPage);
  openDialog(document.querySelector('#help-dialog'));
}));
document.querySelector('#help-content').addEventListener('submit', (event) => {
  if (event.target.id !== 'contact-form') return;
  event.preventDefault();
  event.target.reset();
  showToast('ข้อความตัวอย่างแล้ว · ยังไม่มีการส่งออกจากเครื่อง');
});
document.querySelector('#account-saved-list').addEventListener('click', (event) => {
  const openButton = event.target.closest('[data-product]');
  const removeButton = event.target.closest('[data-saved-remove]');
  if (openButton) openProduct(openButton.dataset.product);
  if (removeButton) {
    state.favorites = state.favorites.filter((id) => id !== removeButton.dataset.savedRemove);
    persistState();
    renderCatalog();
    updateAccount();
  }
});
document.querySelector('#account-downloads-list').addEventListener('click', (event) => {
  if (event.target.closest('[data-demo-download]')) showToast('ไฟล์ตัวอย่างยังไม่ได้จัดเก็บสำหรับดาวน์โหลด');
});
document.querySelector('#admin-product-queue').addEventListener('click', (event) => {
  const action = event.target.closest('[data-admin-decision]');
  if (!action) return;
  const product = state.products.find((item) => item.id === action.dataset.productId);
  if (!product) return;
  product.status = action.dataset.adminDecision;
  persistState();
  renderAdmin();
  renderCatalog();
  renderCart();
  renderSellerDashboard();
  updateAccount();
  showToast(product.status === 'published' ? 'อนุมัติรายการตัวอย่างแล้ว' : 'ส่งรายการกลับไปแก้ไขแล้ว');
});
document.querySelector('#admin-report-queue').addEventListener('click', (event) => {
  const action = event.target.closest('[data-report-decision]');
  if (!action) return;
  const report = state.reports.find((item) => item.id === action.dataset.reportId);
  if (!report) return;
  report.status = action.dataset.reportDecision === 'resolved' ? 'resolved' : 'open';
  persistState();
  renderAdmin();
  showToast(report.status === 'resolved' ? 'ทำเครื่องหมายว่าจัดการรายงานแล้ว' : 'เปิดรายงานให้ตรวจสอบอีกครั้ง');
});
document.querySelector('#cart-button').addEventListener('click', () => {
  renderCart();
  openDialog(document.querySelector('#cart-dialog'));
});

document.querySelector('#add-to-cart').addEventListener('click', (event) => {
  addToCart(event.currentTarget.dataset.productId);
  document.querySelector('#product-dialog').close();
  renderCart();
  openDialog(document.querySelector('#cart-dialog'));
});

document.querySelector('#toggle-report-form').addEventListener('click', (event) => {
  const form = document.querySelector('#report-form');
  const expanded = event.currentTarget.getAttribute('aria-expanded') === 'true';
  event.currentTarget.setAttribute('aria-expanded', String(!expanded));
  form.hidden = expanded;
  if (!expanded) form.elements.reason.focus();
});

document.querySelector('#report-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const product = currentCard(document.querySelector('#toggle-report-form').dataset.productId);
  if (!product) {
    showToast('ไม่พบผลงานที่ต้องการรายงาน');
    return;
  }
  const formData = new FormData(form);
  state.reports.unshift({
    id: `report-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    productId: product.dataset.id,
    productTitle: product.dataset.title,
    seller: product.dataset.seller,
    reason: String(formData.get('reason') || ''),
    message: String(formData.get('message') || '').trim(),
    date: new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
    status: 'open',
  });
  persistState();
  renderAdmin();
  form.reset();
  form.hidden = true;
  document.querySelector('#toggle-report-form').setAttribute('aria-expanded', 'false');
  showToast('ส่งรายงานตัวอย่างแล้ว');
});

document.querySelector('#cart-items').addEventListener('click', (event) => {
  const removeButton = event.target.closest('[data-remove-cart]');
  if (removeButton) {
    state.cart = state.cart.filter((item) => item.id !== removeButton.dataset.removeCart);
    persistState();
    renderCart();
    updateAccount();
    return;
  }
  const changeButton = event.target.closest('[data-cart-change]');
  if (!changeButton) return;
  const line = state.cart.find((item) => item.id === changeButton.dataset.cartId);
  if (!line) return;
  line.quantity += Number(changeButton.dataset.cartChange);
  if (line.quantity <= 0) state.cart = state.cart.filter((item) => item.id !== line.id);
  line.quantity = Math.min(20, Math.max(1, line.quantity));
  persistState();
  renderCart();
});

document.querySelector('#checkout-button').addEventListener('click', () => {
  if (!state.cart.length) return;
  renderCheckout();
  document.querySelector('#cart-dialog').close();
  openDialog(document.querySelector('#checkout-dialog'));
});

document.querySelector('#confirm-order').addEventListener('click', () => {
  if (!state.cart.length) return;
  const count = cartQuantity();
  const total = cartTotal();
  const order = {
    id: `demo-${Date.now().toString(36)}`,
    count,
    total,
    date: new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium' }).format(new Date()),
    items: state.cart.map((item) => {
      const card = currentCard(item.id);
      const product = card ? productFromCard(card) : { id: item.id, title: 'สินค้าดิจิทัล', seller: '', price: 0, files: 'ไฟล์ตัวอย่าง' };
      return { id: item.id, title: product.title, seller: product.seller, price: product.price, files: product.files, quantity: item.quantity };
    }),
  };
  state.orders.unshift(order);
  state.cart = [];
  persistState();
  renderCart();
  updateAccount();
  if (state.seller) renderSellerDashboard();
  document.querySelector('#success-message').textContent = `บันทึก ${count} รายการ รวม ${money(total)} ไว้เป็นคำสั่งซื้อจำลองในเบราว์เซอร์นี้`;
  document.querySelector('#checkout-dialog').close();
  openDialog(document.querySelector('#success-dialog'));
});

document.querySelector('#seller-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const previousSeller = state.seller;
  const portfolio = String(formData.get('portfolio') || '').trim();
  if (portfolio && !portfolio.startsWith('https://')) {
    showToast('ลิงก์ผลงานควรเริ่มด้วย https://');
    form.elements.portfolio.focus();
    return;
  }
  state.seller = {
    displayName: String(formData.get('displayName') || '').trim(),
    storeName: String(formData.get('storeName') || '').trim(),
    email: String(formData.get('email') || '').trim().toLowerCase(),
    portfolio,
    category: String(formData.get('category') || 'uxui'),
  };
  if (previousSeller && previousSeller.storeName !== state.seller.storeName) {
    state.products = state.products.map((product) => product.seller === previousSeller.storeName ? { ...product, seller: state.seller.storeName } : product);
    state.orders = state.orders.map((order) => ({
      ...order,
      items: Array.isArray(order.items) ? order.items.map((item) => item.seller === previousSeller.storeName ? { ...item, seller: state.seller.storeName } : item) : order.items,
    }));
  }
  if (!state.user || state.user.email.toLowerCase() === String(previousSeller?.email || '').toLowerCase()) {
    state.user = { displayName: state.seller.displayName, email: state.seller.email.toLowerCase() };
  }
  persistState();
  renderSellerDashboard();
  updateAccount();
  showToast('สร้างหน้าร้านตัวอย่างแล้ว');
});

document.querySelector('#add-product-button').addEventListener('click', () => startProductForm());
document.querySelector('#edit-seller-profile').addEventListener('click', () => showSellerForm(true));
document.querySelector('#seller-product-list').addEventListener('click', (event) => {
  const editButton = event.target.closest('[data-edit-product]');
  const deleteButton = event.target.closest('[data-delete-product]');
  if (editButton) {
    const product = state.products.find((item) => item.id === editButton.dataset.editProduct);
    if (product) startProductForm(product);
  }
  if (deleteButton) {
    const product = state.products.find((item) => item.id === deleteButton.dataset.deleteProduct);
    if (!product || !window.confirm(`ลบรายการ “${product.title}” จากตัวอย่างร้านนี้หรือไม่?`)) return;
    state.products = state.products.filter((item) => item.id !== product.id);
    state.cart = state.cart.filter((item) => item.id !== product.id);
    state.favorites = state.favorites.filter((id) => id !== product.id);
    persistState();
    renderCatalog();
    renderSellerDashboard();
    renderAdmin();
    renderCart();
    updateAccount();
    showToast('ลบรายการตัวอย่างแล้ว');
  }
});

document.querySelector('#product-cover').addEventListener('change', (event) => {
  const file = event.currentTarget.files?.[0];
  if (!file) return;
  if (file.size > 8 * 1024 * 1024 || !['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    showToast('เลือกภาพ PNG, JPG หรือ WebP ขนาดไม่เกิน 8 MB');
    event.currentTarget.value = '';
    return;
  }
  stagedCoverFile = file;
  coverRemoved = false;
  if (stagedCoverUrl) URL.revokeObjectURL(stagedCoverUrl);
  stagedCoverUrl = URL.createObjectURL(file);
  document.querySelector('#cover-preview-image').src = stagedCoverUrl;
  document.querySelector('#cover-preview').hidden = false;
});
document.querySelector('#remove-cover').addEventListener('click', () => {
  stagedCoverFile = null;
  coverRemoved = true;
  document.querySelector('#product-cover').value = '';
  document.querySelector('#cover-preview').hidden = true;
  if (stagedCoverUrl) URL.revokeObjectURL(stagedCoverUrl);
  stagedCoverUrl = '';
});
document.querySelector('#product-assets').addEventListener('change', (event) => {
  const files = [...event.currentTarget.files];
  assetsRemoved = false;
  const unsupportedFile = files.find((file) => !allowedAssetExtensions.has(file.name.split('.').pop().toLowerCase()));
  if (unsupportedFile) {
    event.currentTarget.value = '';
    document.querySelector('#selected-assets span').textContent = 'รองรับ ZIP, PDF, Figma, Sketch, XD, PSD, SVG, ภาพ, JSON, MD และ TXT';
    showToast(`ยังไม่รองรับไฟล์ ${unsupportedFile.name}`);
    return;
  }
  const totalSize = files.reduce((total, file) => total + file.size, 0);
  if (totalSize > 50 * 1024 * 1024) {
    event.currentTarget.value = '';
    document.querySelector('#selected-assets span').textContent = 'เลือกไฟล์รวมกันได้ไม่เกิน 50 MB';
    showToast('ไฟล์ตัวอย่างรวมกันมีขนาดเกิน 50 MB');
    return;
  }
  document.querySelector('#selected-assets span').textContent = files.length ? files.map((file) => `${file.name} (${formatBytes(file.size)})`).join(' · ') : 'ยังไม่ได้เลือกไฟล์';
});
document.querySelector('#clear-assets').addEventListener('click', () => {
  assetsRemoved = true;
  document.querySelector('#product-assets').value = '';
  document.querySelector('#selected-assets span').textContent = 'ไฟล์ตัวอย่างถูกล้าง';
});

document.querySelector('#product-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!state.seller) return;
  const form = event.currentTarget;
  const submit = form.querySelector('button[type="submit"]');
  const selectedFiles = [...form.elements.assets.files];
  if (selectedFiles.some((file) => !allowedAssetExtensions.has(file.name.split('.').pop().toLowerCase()))) {
    showToast('มีไฟล์ตัวอย่างที่ยังไม่รองรับ');
    return;
  }
  if (selectedFiles.reduce((total, file) => total + file.size, 0) > 50 * 1024 * 1024) {
    showToast('ไฟล์ตัวอย่างรวมกันมีขนาดเกิน 50 MB');
    return;
  }
  submit.disabled = true;
  submit.textContent = 'กำลังบันทึกตัวอย่าง…';
  try {
    const formData = new FormData(form);
    const previous = state.products.find((item) => item.id === editingProductId);
    const coverImage = stagedCoverFile ? await compressCover(stagedCoverFile) : coverRemoved ? '' : previous?.coverImage || '';
    const fileAssets = selectedFiles.length ? selectedFiles.map((file) => ({ name: file.name, size: file.size, type: file.type })) : assetsRemoved ? [] : previous?.fileAssets || [];
    const product = {
      id: previous?.id || `seller-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      title: String(formData.get('title') || '').trim(),
      category: String(formData.get('category') || 'uxui'),
      price: Number(formData.get('price')) || 0,
      files: String(formData.get('fileType') || '').trim(),
      fileAssets,
      tools: String(formData.get('tools') || '').trim() || 'ยังไม่ระบุ',
      description: String(formData.get('description') || '').trim(),
      seller: state.seller.storeName,
      art: String(formData.get('category') || 'uxui'),
      coverImage,
      status: 'pending',
      createdAt: Date.now(),
    };
    if (previous) state.products = state.products.map((item) => item.id === previous.id ? product : item);
    else state.products.unshift(product);
    persistState();
    renderCatalog();
    renderSellerDashboard();
    renderAdmin();
    renderCart();
    updateAccount();
    document.querySelector('#product-form-dialog').close();
    openDialog(document.querySelector('#seller-dialog'));
    showToast(previous ? 'ส่งการแก้ไขเข้าตรวจแล้ว' : 'ส่งผลงานเข้าคิวตรวจแล้ว');
  } catch (error) {
    showToast(error?.message || 'บันทึกตัวอย่างไม่สำเร็จ');
  } finally {
    submit.disabled = false;
    submit.innerHTML = editingProductId ? 'บันทึกการแก้ไข <span aria-hidden="true">✓</span>' : 'บันทึกรายการตัวอย่าง <span aria-hidden="true">✓</span>';
  }
});

document.addEventListener('click', (event) => {
  const closeButton = event.target.closest('[data-close-dialog]');
  if (closeButton) document.querySelector(`#${closeButton.dataset.closeDialog}`)?.close();
});
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const menuToggle = document.querySelector('.menu-toggle');
const mainNav = document.querySelector('.main-nav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});
