const STORAGE_KEY = 'madeby.freelance.v1';
const LEGACY_STORAGE_KEY = 'madeby.demo.v3';
const productGrid = document.querySelector('#product-grid');
const searchInput = document.querySelector('#product-search');
const sortSelect = document.querySelector('#sort-products');
const emptyState = document.querySelector('#empty-state');
const categoryButtons = [...document.querySelectorAll('.category-chip')];
const categoryNames = {
  uxui: 'UX/UI DESIGN',
  web: 'WEB & APP DESIGN',
  template: 'BRANDING & GRAPHIC',
  product: 'PRODUCT CONSULTING',
  idea: 'IT & STARTUP IDEAS',
  dev: 'DEVELOPMENT',
};
const categoryIcons = { uxui: '▦', web: '◫', template: '✳', product: '◈', idea: '✧', dev: '⌘' };
const categoryClasses = { uxui: 'cat-purple', web: 'cat-terracotta', template: 'cat-green', product: 'cat-orange', idea: 'cat-pink', dev: 'cat-blue' };
const staticServices = {
  'Flowkit — Mobile UI System': { title: 'ออกแบบ UX/UI Application / Website / Web Admin', category: 'uxui', price: 1500, seller: 'Benjamas B.', rating: '4.9', reviews: 19, completed: 38, response: '5 นาที', duration: '7–14 วัน', deliverables: 'UX Flow · Wireframe · UI Design', tools: 'Figma · FigJam', description: 'ออกแบบประสบการณ์และหน้าตาผลิตภัณฑ์ดิจิทัล ตั้งแต่แอป เว็บไซต์ ไปจนถึงระบบหลังบ้าน พร้อมวางโครงสร้างหน้าจอให้ใช้งานง่ายและพร้อมส่งต่อทีมพัฒนา' },
  'Slow Studio — Portfolio Template': { title: 'ออกแบบเว็บไซต์และ Landing Page', category: 'web', price: 2500, seller: 'Somchai Makes', rating: '5.0', reviews: 26, completed: 52, response: '1 ชม.', duration: '5–10 วัน', deliverables: 'Responsive Website · 5 Sections', tools: 'Figma · Webflow', description: 'ออกแบบเว็บไซต์บริษัท พอร์ตโฟลิโอ และ Landing Page ให้เข้ากับแบรนด์ วางโครงสร้างเนื้อหาและรองรับมือถือ' },
  "The Maker's Desk — Notion Planner": { title: 'จัดระบบ Notion สำหรับทีมและธุรกิจ', category: 'product', price: 1200, seller: 'Noon Creates', rating: '4.9', reviews: 14, completed: 24, response: '30 นาที', duration: '3–5 วัน', deliverables: 'Workspace · Dashboard · คู่มือใช้งาน', tools: 'Notion · FigJam', description: 'ช่วยออกแบบ workspace และระบบจัดการงานบน Notion ให้เหมาะกับวิธีทำงานของทีม พร้อมสอนวิธีใช้งานเบื้องต้น' },
  'Launchpad — Product Brief Kit': { title: 'ที่ปรึกษา Product และวางแผน Startup', category: 'product', price: 1800, seller: 'Keng Product Lab', rating: '4.8', reviews: 12, completed: 21, response: '2 ชม.', duration: '1–2 ครั้ง', deliverables: 'Product Brief · Roadmap · Workshop', tools: 'FigJam · Miro', description: 'ช่วยเปลี่ยนไอเดียให้เป็นโจทย์ผลิตภัณฑ์ที่ชัดเจน วิเคราะห์ผู้ใช้ จัดลำดับฟีเจอร์ และวางแผนขั้นตอนเริ่มต้น' },
  'API Blueprint — Diagram Pack': { title: 'พัฒนา Web App, API และระบบหลังบ้าน', category: 'dev', price: 4500, seller: 'Tan Builds', rating: '5.0', reviews: 31, completed: 44, response: '1 ชม.', duration: '10–20 วัน', deliverables: 'Web App · API · Admin Dashboard', tools: 'React · Node.js · Figma', description: 'พัฒนาเว็บแอปและระบบหลังบ้านสำหรับธุรกิจหรือโปรเจกต์ใหม่ เริ่มจากคุย requirement ก่อนประเมินขอบเขตงานและเวลา' },
  'Soft Signals — Interface Icon Set': { title: 'ออกแบบ UI Kit และ Design System', category: 'uxui', price: 2200, seller: 'Mook Studio', rating: '4.9', reviews: 18, completed: 35, response: '20 นาที', duration: '7–12 วัน', deliverables: 'UI Kit · Components · Design Tokens', tools: 'Figma · FigJam', description: 'จัดระเบียบหน้าตาผลิตภัณฑ์ให้เป็นระบบ ตั้งแต่สี ตัวอักษร คอมโพเนนต์ ไปจนถึงหน้าจอตัวอย่างเพื่อให้ทีมทำงานต่อได้ง่าย' },
};
const sampleServices = [
  { id: 'demo-fieldnotes', title: 'วางแผน UX Research และสัมภาษณ์ผู้ใช้', category: 'uxui', price: 1600, seller: 'Fern Research', deliverables: 'Interview Guide · Research Summary', tools: 'FigJam · Figma', description: 'วางแผนการวิจัยผู้ใช้ สัมภาษณ์ และสรุป insight ให้ทีมเห็นโอกาสในการพัฒนาผลิตภัณฑ์', art: 'research', duration: '5–8 วัน', rating: '5.0', reviews: 17, completed: 28, response: '15 นาที', createdAt: 6 },
  { id: 'demo-north', title: 'ออกแบบหน้าเว็บขายสินค้าและบริการ', category: 'web', price: 2800, seller: 'North Studio', deliverables: 'Landing Page · 6 Sections', tools: 'Figma · Webflow', description: 'ออกแบบหน้าเว็บให้เล่าเรื่องธุรกิจชัดเจน ดูดีบนมือถือ และพาลูกค้าไปสู่การติดต่อหรือซื้อบริการ', art: 'north', duration: '7–10 วัน', rating: '4.9', reviews: 22, completed: 41, response: '1 ชม.', createdAt: 5 },
  { id: 'demo-micro-saas', title: 'เวิร์กช็อปคิดไอเดีย Micro SaaS', category: 'idea', price: 1400, seller: 'Tiny Launch Club', deliverables: 'Workshop · Idea Validation Map', tools: 'Miro · Notion', description: 'ช่วยทีมระดมไอเดียและตรวจสอบปัญหาก่อนเริ่มสร้างผลิตภัณฑ์ดิจิทัล', art: 'idea', duration: '1–2 ครั้ง', rating: '4.8', reviews: 9, completed: 15, response: '2 ชม.', createdAt: 4 },
  { id: 'demo-weekly', title: 'ทำ Brand Identity สำหรับธุรกิจใหม่', category: 'template', price: 3200, seller: 'Nicha Creates', deliverables: 'Logo · Color System · Brand Guide', tools: 'Illustrator · Figma', description: 'สร้างภาพจำให้ธุรกิจด้วยโลโก้ ชุดสี และคู่มือใช้งานแบรนด์ที่นำไปต่อยอดบนเว็บไซต์และโซเชียลได้', art: 'weekly', duration: '7–14 วัน', rating: '5.0', reviews: 13, completed: 20, response: '30 นาที', createdAt: 3 },
  { id: 'demo-devkit', title: 'พัฒนา Dashboard สำหรับธุรกิจ', category: 'dev', price: 5200, seller: 'Build Mode', deliverables: 'Admin Dashboard · Responsive UI', tools: 'React · TypeScript', description: 'พัฒนาแดชบอร์ดสำหรับจัดการข้อมูลและงานภายใน พร้อมคุยเรื่องระบบและโครงสร้างก่อนเริ่มงาน', art: 'dev', duration: '12–20 วัน', rating: '4.9', reviews: 25, completed: 33, response: '1 ชม.', createdAt: 2 },
  { id: 'demo-discovery', title: 'ที่ปรึกษาไอเดีย AI Product', category: 'product', price: 1900, seller: 'Krit Product Lab', deliverables: 'Discovery Map · Prototype Plan', tools: 'FigJam · Miro', description: 'ช่วยประเมินโอกาสของไอเดีย AI ตั้งโจทย์ผู้ใช้ และวางแผนการทดลองต้นแบบก่อนลงทุนพัฒนา', art: 'ai', duration: '3–5 วัน', rating: '4.9', reviews: 11, completed: 19, response: '45 นาที', createdAt: 1 },
];

function freshState() {
  return { favorites: [], products: [], conversations: [], reports: [], seller: null, user: null };
}

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object') return freshState();
    return {
      favorites: Array.isArray(saved.favorites) ? saved.favorites.filter((id) => typeof id === 'string') : [],
      products: Array.isArray(saved.products) ? saved.products.filter((item) => item && typeof item.id === 'string' && typeof item.title === 'string').map((item) => ({ ...item, status: item.status || 'published', duration: item.duration || 'คุยรายละเอียด', deliverables: item.deliverables || item.files || 'รายละเอียดตามที่ตกลง', tools: item.tools || '', description: item.description || '', seller: item.seller || saved.seller?.storeName || 'ฟรีแลนซ์ตัวอย่าง' })) : [],
      conversations: Array.isArray(saved.conversations) ? saved.conversations.filter((item) => item && typeof item.id === 'string' && Array.isArray(item.messages)).slice(0, 100) : [],
      reports: Array.isArray(saved.reports) ? saved.reports.filter((item) => item && typeof item.id === 'string').slice(0, 100).map((item) => ({ ...item, status: item.status === 'resolved' ? 'resolved' : 'open' })) : [],
      seller: saved.seller && typeof saved.seller === 'object' ? { ...saved.seller, bio: saved.seller.bio || '' } : null,
      user: saved.user && typeof saved.user.email === 'string' ? saved.user : null,
    };
  } catch {
    return freshState();
  }
}

let state = loadState();
let selectedCategory = 'all';
let editingProductId = null;
let selectedProductId = '';
let currentChatMode = 'buyer';
let toastTimer = 0;
let stagedCoverFile = null;
let stagedCoverUrl = '';
let coverRemoved = false;

function persistState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    showToast('พื้นที่เก็บข้อมูลในเบราว์เซอร์เต็ม ลองใช้รูปที่เล็กลง');
  }
}

function escapeHtml(value) {
  return String(value ?? '').replace(/[&<>"']/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character]);
}

function slugify(value) {
  return String(value).toLocaleLowerCase('en').trim().replace(/[^a-z0-9ก-๙]+/g, '-').replace(/^-|-$/g, '') || `service-${Date.now()}`;
}

function money(amount) {
  return `฿${Number(amount || 0).toLocaleString('th-TH')}`;
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

function creatorMarkup(product) {
  const name = String(product.seller || 'Madeby Creator');
  const initial = escapeHtml(name.trim().charAt(0).toUpperCase() || 'M');
  const rating = product.rating ? `★ ${escapeHtml(product.rating)} (${Number(product.reviews) || 0})` : 'โปรไฟล์ใหม่';
  return `<div class="seller-mini"><span class="seller-avatar">${initial}</span><span class="seller-mini-copy"><button class="seller-profile-link" type="button" data-seller-profile="${escapeHtml(name)}">${escapeHtml(name)}</button><small>ตอบกลับภายใน ${escapeHtml(product.response || '1 วัน')}</small></span><span class="seller-rating">${rating}</span></div>`;
}

function serviceInfoMarkup(product) {
  const title = escapeHtml(product.title);
  const category = categoryNames[product.category] || 'DIGITAL SERVICE';
  const categoryClass = categoryClasses[product.category] || 'cat-purple';
  const social = product.rating ? `★ ${escapeHtml(product.rating)} (${Number(product.reviews) || 0}) · ส่งงานแล้ว ${Number(product.completed) || 0} งาน` : 'บริการใหม่ · ยินดีรับบรีฟ';
  return `<div class="product-info service-info">
    <div class="product-meta"><span class="product-category ${categoryClass}">${escapeHtml(category)}</span><button class="save-button" type="button" aria-label="บันทึก ${title}" aria-pressed="${state.favorites.includes(product.id)}">${state.favorites.includes(product.id) ? '♥' : '♡'}</button></div>
    <button class="product-title" type="button" data-product="${escapeHtml(product.id)}">${title}</button>
    <div class="service-proof"><span>✓ รับงานอยู่</span><span>${social}</span></div>
    <div class="service-price"><span>ราคาเริ่มต้น</span><strong>${money(product.price)}</strong></div>
    <div class="service-card-actions"><button class="button button-outline" type="button" data-product="${escapeHtml(product.id)}">ดูผลงาน</button><button class="button button-primary" type="button" data-contact-product="${escapeHtml(product.id)}">ทักคุย</button></div>
  </div>`;
}

function setCardData(card, product) {
  card.dataset.id = product.id;
  card.dataset.category = product.category;
  card.dataset.title = product.title;
  card.dataset.price = String(product.price);
  card.dataset.seller = product.seller;
  card.dataset.deliverables = product.deliverables || product.files || 'รายละเอียดตามที่ตกลง';
  card.dataset.tools = product.tools || '';
  card.dataset.description = product.description || '';
  card.dataset.duration = product.duration || 'คุยรายละเอียด';
  card.dataset.rating = product.rating || '';
  card.dataset.reviews = String(product.reviews || 0);
  card.dataset.completed = String(product.completed || 0);
  card.dataset.response = product.response || '1 วัน';
  card.dataset.createdAt = String(product.createdAt || 0);
  card.dataset.status = product.status || 'published';
  card.dataset.coverImage = product.coverImage || '';
  card.dataset.search = `${product.title} ${product.seller} ${product.deliverables || product.files || ''} ${product.tools || ''} ${product.description || ''}`;
}

function staticCardDefaults(card) {
  if (card.dataset.serviceReady === 'true') {
    const saveButton = card.querySelector('.save-button');
    if (saveButton) {
      saveButton.setAttribute('aria-pressed', String(state.favorites.includes(card.dataset.id)));
      saveButton.textContent = state.favorites.includes(card.dataset.id) ? '♥' : '♡';
    }
    return;
  }
  const oldTitle = card.querySelector('.product-title')?.textContent.trim() || 'บริการตัวอย่าง';
  const legacyId = card.dataset.id || slugify(oldTitle);
  const creatorText = card.querySelector('.creator-row')?.textContent.trim() || '';
  const defaultSeller = creatorText.replace(/^โดย\s*/, '').replace(/฿[\d,.]+/g, '').trim();
  const defaults = staticServices[oldTitle] || {};
  const product = {
    id: legacyId,
    title: defaults.title || oldTitle,
    category: defaults.category || card.dataset.category || 'uxui',
    price: defaults.price || Number((card.querySelector('.product-price')?.textContent || '').replace(/[^\d]/g, '')) || 1500,
    seller: defaults.seller || defaultSeller || 'ฟรีแลนซ์ตัวอย่าง',
    deliverables: defaults.deliverables || 'รายละเอียดและขอบเขตงานตามที่ตกลง',
    tools: defaults.tools || 'ระบุทักษะในรายละเอียดบริการ',
    description: defaults.description || 'บริการด้านดิจิทัล สามารถทักมาคุยรายละเอียด ขอบเขต และช่วงเวลาทำงานก่อนเริ่มงานได้',
    duration: defaults.duration || 'คุยรายละเอียด',
    rating: defaults.rating || '4.9',
    reviews: defaults.reviews || 12,
    completed: defaults.completed || 20,
    response: defaults.response || '1 ชม.',
    createdAt: 0,
  };
  setCardData(card, product);
  const visual = card.querySelector('.product-visual');
  if (visual) {
    visual.dataset.product = product.id;
    visual.setAttribute('aria-label', `ดูบริการ ${product.title}`);
  }
  let mini = card.querySelector('.seller-mini');
  if (!mini) {
    const shell = document.createElement('div');
    shell.innerHTML = creatorMarkup(product);
    mini = shell.firstElementChild;
    card.insertBefore(mini, visual || card.firstChild);
  } else mini.outerHTML = creatorMarkup(product);
  const oldInfo = card.querySelector('.product-info');
  if (oldInfo) {
    const shell = document.createElement('div');
    shell.innerHTML = serviceInfoMarkup(product);
    oldInfo.replaceWith(shell.firstElementChild);
  }
  card.classList.add('service-card');
  card.dataset.serviceReady = 'true';
}

function extraServiceCard(product, own = false) {
  const card = document.createElement('article');
  card.className = 'product-card service-card';
  if (own) card.dataset.own = 'true';
  else card.dataset.extra = 'true';
  setCardData(card, product);
  const visual = ['research', 'north', 'idea', 'weekly', 'dev', 'ai'].includes(product.art) ? product.art : product.category;
  const coverMarkup = product.coverImage ? `<img class="product-cover-image" src="${escapeHtml(product.coverImage)}" alt="" />` : '';
  card.innerHTML = `${creatorMarkup(product)}
    <button class="product-visual extra-visual extra-${escapeHtml(visual)} ${product.coverImage ? 'has-cover' : ''}" type="button" data-product="${escapeHtml(product.id)}" aria-label="ดูบริการ ${escapeHtml(product.title)}">
      ${coverMarkup}<span class="extra-kicker">${escapeHtml(categoryNames[product.category] || 'DIGITAL SERVICE')} <i>· PORTFOLIO</i></span><span class="extra-art-icon" aria-hidden="true">${categoryIcons[product.category] || '✳'}</span><span class="extra-art-title">${escapeHtml(product.title)}</span><span class="extra-art-lines" aria-hidden="true"><i></i><i></i><i></i></span><span class="visual-corner">${String(product.createdAt || 1).padStart(2, '0')}</span>
    </button>${serviceInfoMarkup(product)}`;
  return card;
}

function renderCatalog() {
  productGrid.querySelectorAll('[data-extra="true"], [data-own="true"]').forEach((card) => card.remove());
  const staticCards = [...productGrid.querySelectorAll('.product-card:not([data-extra]):not([data-own])')];
  staticCards.forEach(staticCardDefaults);
  const existingIds = new Set(staticCards.map((card) => card.dataset.id));
  const publicProducts = state.products.filter((item) => item.status === 'published');
  const generated = [...sampleServices, ...publicProducts].filter((product, index, list) => list.findIndex((candidate) => candidate.id === product.id) === index && !existingIds.has(product.id));
  generated.forEach((product) => productGrid.append(extraServiceCard(product, state.products.some((item) => item.id === product.id))));
  renderProducts();
}

function renderProducts() {
  const cards = [...productGrid.querySelectorAll('.product-card')];
  const query = searchInput.value.trim().toLocaleLowerCase('th');
  const sort = sortSelect.value;
  let visible = [];
  cards.forEach((card) => {
    const categoryMatches = selectedCategory === 'all' || (selectedCategory === 'saved' ? state.favorites.includes(card.dataset.id) : card.dataset.category === selectedCategory);
    const searchMatches = !query || card.dataset.search.toLocaleLowerCase('th').includes(query);
    const show = categoryMatches && searchMatches;
    card.hidden = !show;
    if (show) visible.push(card);
  });
  visible.sort((left, right) => {
    if (sort === 'price-low') return Number(left.dataset.price) - Number(right.dataset.price);
    if (sort === 'price-high') return Number(right.dataset.price) - Number(left.dataset.price);
    if (sort === 'newest') return Number(right.dataset.createdAt) - Number(left.dataset.createdAt);
    return Number(right.dataset.rating) - Number(left.dataset.rating) || left.dataset.title.localeCompare(right.dataset.title, 'th');
  });
  visible.forEach((card) => productGrid.append(card));
  emptyState.hidden = visible.length > 0;
  document.querySelector('#result-count').textContent = `พบ ${visible.length} จาก ${cards.length} บริการ`;
}

function currentCard(id) {
  return [...productGrid.querySelectorAll('.product-card')].find((card) => card.dataset.id === id);
}

function productFromCard(card) {
  return {
    id: card.dataset.id, title: card.dataset.title, category: card.dataset.category,
    price: Number(card.dataset.price) || 0, seller: card.dataset.seller || 'ฟรีแลนซ์ตัวอย่าง',
    deliverables: card.dataset.deliverables || 'รายละเอียดตามที่ตกลง', tools: card.dataset.tools || '',
    description: card.dataset.description || '', duration: card.dataset.duration || 'คุยรายละเอียด',
    rating: card.dataset.rating || '', reviews: Number(card.dataset.reviews) || 0,
    completed: Number(card.dataset.completed) || 0, response: card.dataset.response || '1 วัน',
    coverImage: card.dataset.coverImage || '',
  };
}

function openDialog(dialog) {
  document.querySelectorAll('dialog[open]').forEach((item) => { if (item !== dialog) item.close(); });
  if (!dialog.open) dialog.showModal();
}

function openProduct(id) {
  const card = currentCard(id);
  if (!card) return;
  const product = productFromCard(card);
  const sourceVisual = card.querySelector('.product-visual');
  const preview = document.createElement('div');
  preview.className = `detail-visual-preview ${sourceVisual.className.replace('product-visual', '')}`;
  preview.innerHTML = sourceVisual.innerHTML;
  document.querySelector('#detail-art').replaceChildren(preview);
  const thumbs = document.querySelector('#detail-gallery-thumbs');
  thumbs.innerHTML = ['ภาพรวม', 'เว็บไซต์', 'มือถือ', 'หน้าจอ'].map((label, index) => `<span class="detail-thumb detail-thumb-${index + 1} ${index === 0 ? 'active' : ''}" aria-hidden="true"><i></i><b></b><small>${label}</small></span>`).join('');
  document.querySelector('#detail-view-seller').textContent = product.seller;
  document.querySelector('#detail-seller-avatar').textContent = product.seller.trim().charAt(0).toUpperCase() || 'M';
  document.querySelector('#detail-view-seller').dataset.sellerProfile = product.seller;
  document.querySelector('#detail-seller-status').textContent = `รับงานอยู่ · ตอบกลับภายใน ${product.response}`;
  document.querySelector('#detail-rating').textContent = product.rating ? `★ ${product.rating} (${product.reviews})` : 'โปรไฟล์ใหม่';
  document.querySelector('#detail-category').textContent = categoryNames[product.category] || 'DIGITAL SERVICE';
  document.querySelector('#detail-category').className = `product-category ${categoryClasses[product.category] || 'cat-purple'}`;
  document.querySelector('#dialog-title').textContent = product.title;
  document.querySelector('#dialog-description').textContent = product.description;
  document.querySelector('#detail-specs').innerHTML = `<div><span>บริการ</span><strong>${escapeHtml(product.deliverables)}</strong></div><div><span>ทักษะ/เครื่องมือ</span><strong>${escapeHtml(product.tools)}</strong></div><div><span>ระยะเวลาโดยประมาณ</span><strong>${escapeHtml(product.duration)}</strong></div><div><span>ผลงานที่ส่งแล้ว</span><strong>${product.completed ? `${product.completed} งาน` : 'โปรไฟล์ใหม่'}</strong></div>`;
  document.querySelector('#detail-packages').innerHTML = `<div class="package-heading"><strong>ราคาเริ่มต้นโดยประมาณ</strong><span>เลือกขอบเขตงานร่วมกับฟรีแลนซ์</span></div><div class="package-options"><div><span>เริ่มต้น</span><strong>${money(product.price)}</strong><small>คุยโจทย์และขอบเขต</small></div><div><span>มาตรฐาน</span><strong>${money(Math.round(product.price * 1.8 / 100) * 100)}</strong><small>งานตามรายละเอียดบริการ</small></div><div><span>เต็มรูปแบบ</span><strong>${money(Math.round(product.price * 2.8 / 100) * 100)}</strong><small>เพิ่มรอบแก้ไข/หน้าจอ</small></div></div>`;
  document.querySelector('#detail-review-count').textContent = product.reviews ? `${product.reviews} รีวิวตัวอย่าง` : 'โปรไฟล์ใหม่';
  document.querySelector('#detail-review-summary').textContent = product.rating ? `คะแนนตัวอย่าง ${product.rating}/5 · ส่งมอบงานแล้ว ${product.completed} งาน` : 'ทักคุยรายละเอียดและขอดูตัวอย่างเพิ่มเติมได้';
  document.querySelector('#detail-price').textContent = `เริ่มต้น ${money(product.price)}`;
  document.querySelector('#detail-contact-button').dataset.productId = product.id;
  document.querySelector('#toggle-report-form').dataset.productId = product.id;
  document.querySelector('#toggle-report-form').setAttribute('aria-expanded', 'false');
  document.querySelector('#report-form').hidden = true;
  document.querySelector('#report-form').reset();
  openDialog(document.querySelector('#product-dialog'));
}

function openPublicProfile(sellerName) {
  const services = [...productGrid.querySelectorAll('.product-card')].filter((card) => card.dataset.seller === sellerName);
  const seller = state.seller?.storeName === sellerName ? state.seller : null;
  const categories = [...new Set(services.map((card) => categoryNames[card.dataset.category]).filter(Boolean))];
  const ratings = services.map((card) => Number(card.dataset.rating)).filter((rating) => rating > 0);
  const rating = ratings.length ? (ratings.reduce((sum, item) => sum + item, 0) / ratings.length).toFixed(1) : '';
  const completed = services.reduce((sum, card) => sum + (Number(card.dataset.completed) || 0), 0);
  document.querySelector('#public-profile-title').textContent = seller?.storeName || sellerName;
  document.querySelector('#public-profile-subtitle').textContent = `${seller?.displayName || sellerName} · ${categories.join(' · ') || 'Digital services'}`;
  document.querySelector('#public-profile-avatar').textContent = (seller?.displayName || sellerName).trim().charAt(0).toUpperCase() || 'M';
  document.querySelector('#public-profile-bio').textContent = seller?.bio || `ฟรีแลนซ์ด้าน ${categories.join(', ') || 'งานดิจิทัล'} พร้อมพูดคุยเรื่องโจทย์และขอบเขตงานก่อนเริ่มโปรเจกต์`;
  const link = document.querySelector('#public-profile-link');
  if (seller?.portfolio && seller.portfolio.startsWith('https://')) {
    link.href = seller.portfolio;
    link.hidden = false;
  } else link.hidden = true;
  document.querySelector('#public-profile-stats').innerHTML = `<div><strong>${services.length}</strong><span>บริการ</span></div><div><strong>${rating ? `★ ${rating}` : 'ใหม่'}</strong><span>คะแนนตัวอย่าง</span></div><div><strong>${completed}</strong><span>งานตัวอย่าง</span></div>`;
  document.querySelector('#public-profile-services').innerHTML = services.length ? services.map((card) => `<article class="profile-service-row"><div><span class="product-category ${categoryClasses[card.dataset.category] || 'cat-purple'}">${escapeHtml(categoryNames[card.dataset.category] || 'DIGITAL SERVICE')}</span><strong>${escapeHtml(card.dataset.title)}</strong><small>ราคาเริ่มต้น ${money(card.dataset.price)}</small></div><button type="button" class="button button-outline" data-product="${escapeHtml(card.dataset.id)}">ดูงาน</button><button type="button" class="button button-primary" data-contact-product="${escapeHtml(card.dataset.id)}">ทักคุย</button></article>`).join('') : '<div class="history-empty">ยังไม่มีบริการที่เผยแพร่</div>';
  openDialog(document.querySelector('#public-profile-dialog'));
}

function openInquiry(id) {
  const card = currentCard(id);
  if (!card) return;
  selectedProductId = id;
  const product = productFromCard(card);
  const form = document.querySelector('#inquiry-form');
  form.reset();
  form.elements.name.readOnly = Boolean(state.user);
  form.elements.email.readOnly = Boolean(state.user);
  if (state.user) {
    form.elements.name.value = state.user.displayName || '';
    form.elements.email.value = state.user.email || '';
  }
  document.querySelector('#inquiry-service-name').textContent = `${product.title} · ราคาเริ่มต้น ${money(product.price)} · โดย ${product.seller}`;
  openDialog(document.querySelector('#inquiry-dialog'));
}

function saveConversation(conversation) {
  state.conversations.unshift(conversation);
  state.conversations = state.conversations.slice(0, 100);
  persistState();
  renderConversationSummaries();
}

function openChat(id, mode = 'buyer') {
  const conversation = state.conversations.find((item) => item.id === id);
  if (!conversation) return;
  currentChatMode = mode;
  if (mode === 'seller') conversation.sellerRead = true;
  else conversation.buyerRead = true;
  persistState();
  document.querySelector('#chat-form').dataset.conversationId = conversation.id;
  document.querySelector('#chat-form').dataset.mode = mode;
  document.querySelector('#chat-title').textContent = mode === 'seller' ? `คุยกับ ${conversation.buyerName}` : `คุยกับ ${conversation.sellerStore}`;
  document.querySelector('#chat-subtitle').textContent = `บริการ: ${conversation.serviceTitle}`;
  renderChatMessages(conversation);
  renderConversationSummaries();
  openDialog(document.querySelector('#chat-dialog'));
}

function renderChatMessages(conversation) {
  const list = document.querySelector('#chat-messages');
  list.innerHTML = conversation.messages.map((message) => {
    const own = message.sender === currentChatMode;
    const senderName = message.sender === 'seller' ? conversation.sellerStore : conversation.buyerName;
    return `<div class="chat-line ${own ? 'own-message' : ''}"><span>${escapeHtml(senderName)} · ${escapeHtml(message.date || '')}</span><p>${escapeHtml(message.text)}</p></div>`;
  }).join('');
  list.scrollTop = list.scrollHeight;
}

function conversationForBuyer(conversation) {
  if (!state.user) return false;
  return String(conversation.buyerEmail || '').toLowerCase() === state.user.email.toLowerCase();
}

function conversationsForSeller() {
  if (!state.seller) return [];
  return state.conversations.filter((item) => item.sellerStore === state.seller.storeName || (item.sellerEmail && item.sellerEmail.toLowerCase() === state.seller.email.toLowerCase()));
}

function renderAccountInquiries() {
  const target = document.querySelector('#account-inquiries-list');
  const conversations = state.conversations.filter(conversationForBuyer);
  if (!conversations.length) {
    target.innerHTML = '<div class="history-empty">ข้อความที่ส่งถึงฟรีแลนซ์จะแสดงที่นี่</div>';
    return;
  }
  target.innerHTML = conversations.map((item) => `<button class="conversation-row" type="button" data-open-conversation="${escapeHtml(item.id)}" data-chat-mode="buyer"><span class="conversation-avatar">${escapeHtml(item.sellerStore.trim().charAt(0).toUpperCase() || 'M')}</span><span class="conversation-copy"><strong>${escapeHtml(item.sellerStore)}</strong><small>${escapeHtml(item.serviceTitle)} · ${escapeHtml(item.messages.at(-1)?.text || '')}</small></span><span class="conversation-date">${escapeHtml(item.messages.at(-1)?.date || '')}</span></button>`).join('');
}

function renderSellerInquiries() {
  const target = document.querySelector('#seller-inquiry-list');
  const conversations = conversationsForSeller();
  if (!conversations.length) {
    target.innerHTML = '<div class="history-empty">เมื่อมีลูกค้าทักสอบถาม ข้อความจะอยู่ที่นี่</div>';
    return;
  }
  target.innerHTML = conversations.map((item) => `<button class="conversation-row" type="button" data-open-conversation="${escapeHtml(item.id)}" data-chat-mode="seller"><span class="conversation-avatar">${escapeHtml(item.buyerName.trim().charAt(0).toUpperCase() || 'M')}</span><span class="conversation-copy"><strong>${escapeHtml(item.buyerName)} ${item.sellerRead ? '' : '<i class="unread-dot" aria-label="ข้อความใหม่"></i>'}</strong><small>${escapeHtml(item.serviceTitle)} · ${escapeHtml(item.messages.at(-1)?.text || '')}</small></span><span class="conversation-date">${escapeHtml(item.messages.at(-1)?.date || '')}</span></button>`).join('');
}

function renderConversationSummaries() {
  renderAccountInquiries();
  renderSellerInquiries();
  const unread = state.seller ? conversationsForSeller().filter((item) => !item.sellerRead).length : state.conversations.filter(conversationForBuyer).filter((item) => !item.buyerRead).length;
  document.querySelector('#inbox-count').textContent = String(unread);
  document.querySelector('#inbox-button').setAttribute('aria-label', `เปิดข้อความ มี ${unread} ข้อความใหม่`);
  if (state.seller) document.querySelector('#seller-inquiry-count').textContent = String(conversationsForSeller().length);
  if (state.user) document.querySelector('#account-message-count').textContent = String(state.conversations.filter(conversationForBuyer).length);
}

function renderAccountSaved() {
  const target = document.querySelector('#account-saved-list');
  const cards = state.favorites.map(currentCard).filter(Boolean);
  if (!cards.length) {
    target.innerHTML = '<div class="history-empty">ฟรีแลนซ์ที่คุณกดบันทึกจะแสดงที่นี่</div>';
    return;
  }
  target.innerHTML = cards.map((card) => `<div class="saved-row"><button type="button" data-product="${escapeHtml(card.dataset.id)}">${escapeHtml(card.dataset.seller)} · ${escapeHtml(card.dataset.title)}</button><strong>เริ่ม ${money(card.dataset.price)}</strong><button class="remove-saved" type="button" data-saved-remove="${escapeHtml(card.dataset.id)}" aria-label="นำออกจากรายการบันทึก">×</button></div>`).join('');
}

function updateAccount() {
  const user = state.user || { displayName: 'ผู้เยี่ยมชม', email: '' };
  document.querySelector('#account-title').textContent = `สวัสดี, ${user.displayName || 'ผู้ใช้ Madeby'}`;
  document.querySelector('#account-email').textContent = user.email || 'เข้าสู่ระบบตัวอย่างเพื่อดูบทสนทนาของคุณ';
  document.querySelector('#account-avatar').textContent = String(user.displayName || 'M').trim().charAt(0).toUpperCase();
  document.querySelector('#account-button .account-full').textContent = state.user ? user.displayName : 'บัญชี / ข้อความ';
  document.querySelector('#account-button .account-short').textContent = state.user ? String(user.displayName).slice(0, 7) : 'บัญชี';
  document.querySelector('#account-profile-form').elements.displayName.value = user.displayName || '';
  document.querySelector('#account-profile-form').elements.email.value = user.email || '';
  document.querySelector('#account-saved-count').textContent = String(state.favorites.length);
  document.querySelector('#account-service-count').textContent = String(productGrid.querySelectorAll('.product-card').length);
  document.querySelector('#account-seller-action').innerHTML = state.seller ? 'จัดการโปรไฟล์ฟรีแลนซ์ <span aria-hidden="true">↗</span>' : 'สมัครเป็นฟรีแลนซ์ <span aria-hidden="true">↗</span>';
  const history = document.querySelector('#account-history');
  const recent = state.user ? state.conversations.filter(conversationForBuyer).slice(0, 3) : [];
  history.innerHTML = recent.length ? `<h3>บทสนทนาล่าสุด</h3>${recent.map((item) => `<div class="history-row"><span>${escapeHtml(item.sellerStore)} · ${escapeHtml(item.serviceTitle)}</span><strong>${escapeHtml(item.messages.at(-1)?.date || '')}</strong></div>`).join('')}` : '<div class="history-empty">สำรวจบริการแล้วกด “ทักคุย” เพื่อเริ่มสอบถามฟรีแลนซ์</div>';
  renderConversationSummaries();
  renderAccountSaved();
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
  showToast('เข้าสู่ระบบตัวอย่างแล้ว');
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

function statusLabel(status) {
  return ({ pending: 'รอตรวจ', published: 'เปิดรับงาน', rejected: 'ต้องแก้ไข' })[status] || 'รอตรวจ';
}

function renderAdmin() {
  const pending = state.products.filter((product) => product.status === 'pending');
  const published = state.products.filter((product) => product.status === 'published');
  const openReports = state.reports.filter((report) => report.status !== 'resolved');
  document.querySelector('#admin-pending-count').textContent = String(pending.length);
  document.querySelector('#admin-published-count').textContent = String(published.length);
  document.querySelector('#admin-report-count').textContent = String(openReports.length);
  document.querySelector('#admin-product-queue').innerHTML = pending.length ? pending.map((product) => `<article class="moderation-card"><div class="moderation-info"><span class="product-category ${categoryClasses[product.category] || 'cat-purple'}">${escapeHtml(categoryNames[product.category] || 'DIGITAL SERVICE')}</span><h3>${escapeHtml(product.title)}</h3><p>${escapeHtml(product.description)}</p><small>ฟรีแลนซ์ ${escapeHtml(product.seller)} · ราคาเริ่ม ${money(product.price)}</small></div><div class="moderation-actions"><button class="button button-primary" type="button" data-admin-decision="published" data-product-id="${escapeHtml(product.id)}">อนุมัติ</button><button class="button button-outline" type="button" data-admin-decision="rejected" data-product-id="${escapeHtml(product.id)}">ส่งกลับแก้ไข</button></div></article>`).join('') : '<div class="history-empty">ไม่มีบริการรอตรวจในตอนนี้</div>';
  const reasonLabels = { copyright: 'ปัญหาลิขสิทธิ์', misleading: 'รายละเอียดไม่ตรง', quality: 'ผลงานมีปัญหา', other: 'อื่น ๆ' };
  const reports = [...state.reports].sort((a, b) => Number(a.status === 'resolved') - Number(b.status === 'resolved'));
  document.querySelector('#admin-report-queue').innerHTML = reports.length ? reports.map((report) => `<article class="report-card ${report.status === 'resolved' ? 'is-resolved' : ''}"><div><div class="report-card-heading"><strong>${escapeHtml(report.productTitle || 'บริการที่ถูกรายงาน')}</strong><span class="report-status">${report.status === 'resolved' ? 'ปิดเรื่องแล้ว' : 'รอตรวจสอบ'}</span></div><p>${escapeHtml(reasonLabels[report.reason] || 'ไม่ระบุเหตุผล')} · ฟรีแลนซ์ ${escapeHtml(report.seller || 'ไม่ระบุ')}</p><p class="report-message">${escapeHtml(report.message || 'ไม่มีรายละเอียดเพิ่มเติม')}</p><small>${escapeHtml(report.date || 'รายงานตัวอย่าง')}</small></div><button class="button ${report.status === 'resolved' ? 'button-outline' : 'button-primary'}" type="button" data-report-decision="${report.status === 'resolved' ? 'open' : 'resolved'}" data-report-id="${escapeHtml(report.id)}">${report.status === 'resolved' ? 'เปิดเรื่องอีกครั้ง' : 'ทำเครื่องหมายว่าจัดการแล้ว'}</button></article>`).join('') : '<div class="history-empty">ยังไม่มีรายงานปัญหา</div>';
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
  hiring: ['วิธีเริ่มจ้างงาน', 'เลือกหมวดและบริการที่สนใจ เปิดดูผลงานกับราคาเริ่มต้น แล้วกดทักคุยเพื่อส่งรายละเอียดโจทย์ งบประมาณ และกำหนดเวลาให้ฟรีแลนซ์คุยต่อ'],
  terms: ['ข้อกำหนดการใช้แพลตฟอร์ม', 'เวอร์ชันจริงควรอธิบายบทบาทของแพลตฟอร์ม ฟรีแลนซ์และลูกค้า การระงับบัญชี ขอบเขตการสื่อสาร ค่าธรรมเนียม และช่องทางอุทธรณ์ ข้อความนี้เป็นโครงร่างสำหรับต้นแบบ'],
  license: ['สิทธิ์การใช้งานผลงาน', 'ลูกค้าและฟรีแลนซ์ควรตกลงเรื่องสิทธิ์ในงาน ไฟล์ต้นฉบับ การใช้งานเชิงพาณิชย์ การส่งมอบ และการแก้ไขให้ชัดเจนก่อนเริ่มงาน ข้อความนี้เป็นตัวอย่างเท่านั้น'],
  privacy: ['ความเป็นส่วนตัวในโหมด Demo', 'ข้อมูลบัญชี โปรไฟล์ รายการบันทึก และข้อความจำลองเก็บใน localStorage ของเบราว์เซอร์นี้ ไม่มีการส่งไปยังเซิร์ฟเวอร์ ใช้ปุ่มล้างข้อมูลในหน้าบัญชีเพื่อลบข้อมูล'],
  safety: ['คุยงานอย่างปลอดภัย', 'ตรวจผลงานและรายละเอียดบริการก่อนติดต่อ ระบุขอบเขตงานและการแก้ไขให้ชัดเจน และอย่าส่งรหัสผ่านหรือข้อมูลสำคัญในข้อความตัวอย่างนี้'],
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
  const [title, text] = helpCopy[page] || helpCopy.hiring;
  content.innerHTML = `<h3>${escapeHtml(title)}</h3><p>${escapeHtml(text)}</p><div class="help-disclaimer">ข้อความในหน้านี้เป็นเนื้อหาตัวอย่างสำหรับออกแบบและต้องปรับให้ตรงกับบริการจริงก่อนเปิดใช้งาน</div>`;
}

function showSellerForm(editing = false) {
  document.querySelector('#seller-dashboard').hidden = true;
  document.querySelector('#seller-onboarding').hidden = false;
  document.querySelector('#seller-dialog-title').textContent = editing ? 'แก้ไขโปรไฟล์ฟรีแลนซ์' : 'สร้างโปรไฟล์ฟรีแลนซ์';
  const form = document.querySelector('#seller-form');
  form.elements.displayName.value = editing ? state.seller?.displayName || '' : '';
  form.elements.storeName.value = editing ? state.seller?.storeName || '' : '';
  form.elements.email.value = editing ? state.seller?.email || '' : state.user?.email || '';
  form.elements.bio.value = editing ? state.seller?.bio || '' : '';
  form.elements.portfolio.value = editing ? state.seller?.portfolio || '' : '';
  form.elements.category.value = editing ? state.seller?.category || 'uxui' : 'uxui';
  form.elements.agree.checked = editing;
  form.querySelector('button[type="submit"]').innerHTML = editing ? 'บันทึกโปรไฟล์ <span aria-hidden="true">✓</span>' : 'สร้างโปรไฟล์ตัวอย่าง <span aria-hidden="true">↗</span>';
}

function setSellerTab(name) {
  document.querySelectorAll('[data-seller-tab]').forEach((button) => {
    const active = button.dataset.sellerTab === name;
    button.classList.toggle('active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  document.querySelectorAll('.seller-pane').forEach((pane) => { pane.hidden = pane.id !== `seller-pane-${name}`; });
}

function renderSellerDashboard() {
  if (!state.seller) return;
  document.querySelector('#seller-onboarding').hidden = true;
  document.querySelector('#seller-dashboard').hidden = false;
  document.querySelector('#seller-store-title').textContent = state.seller.storeName;
  const own = state.products.filter((item) => item.seller === state.seller.storeName);
  document.querySelector('#seller-product-count').textContent = String(own.length);
  document.querySelector('#seller-profile-name').textContent = `${state.seller.displayName} · ${state.seller.storeName}`;
  document.querySelector('#seller-profile-email').textContent = state.seller.email;
  document.querySelector('#seller-profile-bio').textContent = state.seller.bio || 'เพิ่มคำแนะนำตัวและทักษะของคุณ เพื่อให้ลูกค้ารู้จักสไตล์การทำงานมากขึ้น';
  const portfolioLink = document.querySelector('#seller-profile-link');
  if (String(state.seller.portfolio || '').startsWith('https://')) {
    portfolioLink.href = state.seller.portfolio;
    portfolioLink.hidden = false;
  } else portfolioLink.hidden = true;
  const list = document.querySelector('#seller-product-list');
  list.innerHTML = own.length ? own.map((product) => `<article class="seller-listing"><div class="listing-avatar">${categoryIcons[product.category] || '✳'}</div><div class="listing-info"><strong>${escapeHtml(product.title)}</strong><span>${escapeHtml(categoryNames[product.category] || 'DIGITAL SERVICE')} · เริ่ม ${money(product.price)} · <i class="status-${escapeHtml(product.status || 'pending')}">${statusLabel(product.status)}</i></span></div><div class="listing-actions"><button type="button" data-edit-product="${escapeHtml(product.id)}">แก้ไข</button><button type="button" data-delete-product="${escapeHtml(product.id)}">ลบ</button></div></article>`).join('') : '<div class="history-empty">ยังไม่มีบริการ เพิ่มบริการแรกของคุณได้เลย</div>';
  document.querySelector('#seller-favorite-count').textContent = String(own.reduce((count, product) => count + state.favorites.filter((id) => id === product.id).length, 0));
  renderSellerInquiries();
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
  if (stagedCoverUrl) URL.revokeObjectURL(stagedCoverUrl);
  stagedCoverUrl = '';
  const form = document.querySelector('#product-form');
  form.reset();
  document.querySelector('#cover-preview').hidden = true;
  if (product) {
    form.elements.title.value = product.title;
    form.elements.category.value = product.category;
    form.elements.price.value = String(product.price);
    form.elements.fileType.value = product.deliverables || product.files || '';
    form.elements.tools.value = product.tools || '';
    form.elements.duration.value = product.duration || '';
    form.elements.description.value = product.description || '';
    if (product.coverImage) {
      document.querySelector('#cover-preview-image').src = product.coverImage;
      document.querySelector('#cover-preview').hidden = false;
    }
  }
  document.querySelector('#product-form-title').textContent = product ? 'แก้ไขบริการ' : 'เพิ่มบริการ';
  form.querySelector('button[type="submit"]').innerHTML = product ? 'ส่งการแก้ไขเข้าตรวจ <span aria-hidden="true">✓</span>' : 'ส่งบริการเข้าตรวจ <span aria-hidden="true">✓</span>';
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

renderCatalog();
renderConversationSummaries();
updateAccount();
renderAdmin();
setHelpPage('hiring');

categoryButtons.forEach((button) => button.addEventListener('click', () => {
  selectedCategory = button.dataset.filter;
  categoryButtons.forEach((item) => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  renderProducts();
}));
searchInput.addEventListener('input', renderProducts);
sortSelect.addEventListener('change', renderProducts);
document.querySelector('#show-more').addEventListener('click', resetFilters);

productGrid.addEventListener('click', (event) => {
  const card = event.target.closest('.product-card');
  if (!card) return;
  const sellerButton = event.target.closest('[data-seller-profile]');
  if (sellerButton) {
    openPublicProfile(sellerButton.dataset.sellerProfile);
    return;
  }
  const favorite = event.target.closest('.save-button');
  if (favorite) {
    const id = card.dataset.id;
    const index = state.favorites.indexOf(id);
    if (index >= 0) state.favorites.splice(index, 1);
    else state.favorites.push(id);
    persistState();
    favorite.textContent = index < 0 ? '♥' : '♡';
    favorite.setAttribute('aria-pressed', String(index < 0));
    renderProducts();
    updateAccount();
    showToast(index < 0 ? 'บันทึกฟรีแลนซ์แล้ว' : 'นำออกจากรายการที่บันทึกแล้ว');
    return;
  }
  const contact = event.target.closest('[data-contact-product]');
  if (contact) {
    openInquiry(contact.dataset.contactProduct);
    return;
  }
  if (event.target.closest('[data-product]')) openProduct(card.dataset.id);
});

document.querySelectorAll('[data-open-seller]').forEach((button) => button.addEventListener('click', openSeller));
document.querySelector('#account-button').addEventListener('click', openAccount);
document.querySelector('#inbox-button').addEventListener('click', () => {
  if (state.seller && conversationsForSeller().length) {
    renderSellerDashboard();
    setSellerTab('inbox');
    openDialog(document.querySelector('#seller-dialog'));
  } else if (state.user) {
    updateAccount();
    setAccountTab('messages');
    openDialog(document.querySelector('#account-dialog'));
  } else {
    setAuthMode('login');
    openDialog(document.querySelector('#auth-dialog'));
  }
});

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
  const data = new FormData(form);
  beginDemoSession(String(data.get('name') || '').trim(), String(data.get('email') || '').trim());
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
  const data = new FormData(event.currentTarget);
  const previousEmail = state.user?.email || '';
  state.user = { displayName: String(data.get('displayName') || '').trim(), email: String(data.get('email') || '').trim().toLowerCase() };
  if (previousEmail && previousEmail.toLowerCase() !== state.user.email) {
    state.conversations = state.conversations.map((item) => String(item.buyerEmail || '').toLowerCase() === previousEmail.toLowerCase() ? { ...item, buyerEmail: state.user.email } : item);
  }
  if (state.seller && state.seller.email.toLowerCase() === previousEmail.toLowerCase()) {
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
  openSeller();
});
document.querySelector('#open-admin-demo').addEventListener('click', () => {
  renderAdmin();
  setAdminTab('moderation');
  openDialog(document.querySelector('#admin-dialog'));
});
document.querySelector('#clear-demo-data').addEventListener('click', () => {
  if (!window.confirm('ล้างบัญชี บริการ รายการบันทึก และข้อความตัวอย่างจากเบราว์เซอร์นี้หรือไม่?')) return;
  state = freshState();
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
  resetFilters();
  renderCatalog();
  renderConversationSummaries();
  updateAccount();
  renderAdmin();
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
document.querySelector('#account-inquiries-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-open-conversation]');
  if (button) openChat(button.dataset.openConversation, 'buyer');
});
document.querySelector('#public-profile-services').addEventListener('click', (event) => {
  const contact = event.target.closest('[data-contact-product]');
  const view = event.target.closest('[data-product]');
  if (contact) {
    document.querySelector('#public-profile-dialog').close();
    openInquiry(contact.dataset.contactProduct);
  } else if (view) {
    document.querySelector('#public-profile-dialog').close();
    openProduct(view.dataset.product);
  }
});
document.querySelector('#seller-inquiry-list').addEventListener('click', (event) => {
  const button = event.target.closest('[data-open-conversation]');
  if (button) openChat(button.dataset.openConversation, 'seller');
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
  renderSellerDashboard();
  updateAccount();
  showToast(product.status === 'published' ? 'อนุมัติบริการตัวอย่างแล้ว' : 'ส่งบริการกลับไปแก้ไขแล้ว');
});
document.querySelector('#admin-report-queue').addEventListener('click', (event) => {
  const action = event.target.closest('[data-report-decision]');
  if (!action) return;
  const report = state.reports.find((item) => item.id === action.dataset.reportId);
  if (!report) return;
  report.status = action.dataset.reportDecision === 'resolved' ? 'resolved' : 'open';
  persistState();
  renderAdmin();
  showToast(report.status === 'resolved' ? 'จัดการรายงานตัวอย่างแล้ว' : 'เปิดรายงานให้ตรวจสอบอีกครั้ง');
});

document.querySelector('#detail-contact-button').addEventListener('click', (event) => {
  const id = event.currentTarget.dataset.productId;
  document.querySelector('#product-dialog').close();
  openInquiry(id);
});
document.querySelector('#detail-view-seller').addEventListener('click', (event) => {
  document.querySelector('#product-dialog').close();
  openPublicProfile(event.currentTarget.dataset.sellerProfile);
});
document.querySelector('#inquiry-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const product = currentCard(selectedProductId);
  if (!product) return showToast('ไม่พบบริการที่เลือก');
  const data = new FormData(event.currentTarget);
  const now = new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date());
  const conversation = {
    id: `chat-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    serviceId: selectedProductId,
    serviceTitle: product.dataset.title,
    sellerStore: product.dataset.seller,
    sellerEmail: state.seller?.storeName === product.dataset.seller ? state.seller.email : '',
    buyerName: String(data.get('name') || '').trim(),
    buyerEmail: String(data.get('email') || '').trim().toLowerCase(),
    createdAt: Date.now(),
    sellerRead: false,
    buyerRead: true,
    messages: [{ sender: 'buyer', text: String(data.get('message') || '').trim(), date: now }],
  };
  if (!state.user) state.user = { displayName: conversation.buyerName, email: conversation.buyerEmail };
  saveConversation(conversation);
  document.querySelector('#inquiry-dialog').close();
  updateAccount();
  openChat(conversation.id, 'buyer');
  showToast('ส่งข้อความตัวอย่างแล้ว');
});
document.querySelector('#chat-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const conversation = state.conversations.find((item) => item.id === form.dataset.conversationId);
  const message = String(new FormData(form).get('message') || '').trim();
  if (!conversation || !message) return;
  const sender = form.dataset.mode === 'seller' ? 'seller' : 'buyer';
  conversation.messages.push({ sender, text: message, date: new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()) });
  if (sender === 'buyer') conversation.sellerRead = false;
  else conversation.buyerRead = false;
  persistState();
  form.reset();
  renderChatMessages(conversation);
  renderConversationSummaries();
  updateAccount();
});

document.querySelector('#seller-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const previousSeller = state.seller;
  const portfolio = String(data.get('portfolio') || '').trim();
  if (portfolio && !portfolio.startsWith('https://')) {
    showToast('ลิงก์ผลงานควรเริ่มด้วย https://');
    form.elements.portfolio.focus();
    return;
  }
  state.seller = {
    displayName: String(data.get('displayName') || '').trim(),
    storeName: String(data.get('storeName') || '').trim(),
    email: String(data.get('email') || '').trim().toLowerCase(),
    bio: String(data.get('bio') || '').trim(),
    portfolio,
    category: String(data.get('category') || 'uxui'),
  };
  if (previousSeller && previousSeller.storeName !== state.seller.storeName) {
    state.products = state.products.map((product) => product.seller === previousSeller.storeName ? { ...product, seller: state.seller.storeName } : product);
    state.conversations = state.conversations.map((item) => item.sellerStore === previousSeller.storeName ? { ...item, sellerStore: state.seller.storeName } : item);
  }
  if (!state.user || state.user.email.toLowerCase() === String(previousSeller?.email || '').toLowerCase()) state.user = { displayName: state.seller.displayName, email: state.seller.email };
  persistState();
  renderCatalog();
  renderSellerDashboard();
  updateAccount();
  showToast('บันทึกโปรไฟล์ฟรีแลนซ์ตัวอย่างแล้ว');
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
    if (!product || !window.confirm(`ลบบริการ “${product.title}” จากโปรไฟล์ตัวอย่างนี้หรือไม่?`)) return;
    state.products = state.products.filter((item) => item.id !== product.id);
    state.favorites = state.favorites.filter((id) => id !== product.id);
    persistState();
    renderCatalog();
    renderSellerDashboard();
    renderAdmin();
    updateAccount();
    showToast('ลบบริการตัวอย่างแล้ว');
  }
});

function compressCover(file) {
  if (!file) return Promise.resolve('');
  if (file.size > 8 * 1024 * 1024) return Promise.reject(new Error('ภาพผลงานต้องมีขนาดไม่เกิน 8 MB'));
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
      let result = canvas.toDataURL('image/jpeg', 0.64);
      if (result.length > 320000) {
        canvas.width = Math.max(1, Math.round(canvas.width * 0.72));
        canvas.height = Math.max(1, Math.round(canvas.height * 0.72));
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        result = canvas.toDataURL('image/jpeg', 0.5);
      }
      URL.revokeObjectURL(url);
      if (result.length > 360000) reject(new Error('ภาพผลงานมีขนาดใหญ่เกินไป ลองเลือกภาพที่เล็กลง'));
      else resolve(result);
    };
    image.onerror = () => { URL.revokeObjectURL(url); reject(new Error('เปิดไฟล์ภาพไม่สำเร็จ')); };
    image.src = url;
  });
}

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
document.querySelector('#product-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!state.seller) return;
  const form = event.currentTarget;
  const submit = form.querySelector('button[type="submit"]');
  submit.disabled = true;
  submit.textContent = 'กำลังบันทึกบริการ…';
  try {
    const data = new FormData(form);
    const previous = state.products.find((item) => item.id === editingProductId);
    const coverImage = stagedCoverFile ? await compressCover(stagedCoverFile) : coverRemoved ? '' : previous?.coverImage || '';
    const product = {
      id: previous?.id || `service-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`,
      title: String(data.get('title') || '').trim(),
      category: String(data.get('category') || 'uxui'),
      price: Number(data.get('price')) || 0,
      deliverables: String(data.get('fileType') || '').trim(),
      tools: String(data.get('tools') || '').trim() || 'ยังไม่ระบุ',
      duration: String(data.get('duration') || '').trim() || 'คุยรายละเอียด',
      description: String(data.get('description') || '').trim(),
      seller: state.seller.storeName,
      coverImage,
      rating: '',
      reviews: 0,
      completed: 0,
      response: '1 วัน',
      status: 'pending',
      createdAt: Date.now(),
    };
    if (previous) state.products = state.products.map((item) => item.id === previous.id ? product : item);
    else state.products.unshift(product);
    persistState();
    renderCatalog();
    renderSellerDashboard();
    renderAdmin();
    updateAccount();
    document.querySelector('#product-form-dialog').close();
    openDialog(document.querySelector('#seller-dialog'));
    setSellerTab('products');
    showToast(previous ? 'ส่งการแก้ไขบริการเข้าตรวจแล้ว' : 'ส่งบริการเข้าคิวตรวจแล้ว');
  } catch (error) {
    showToast(error?.message || 'บันทึกบริการตัวอย่างไม่สำเร็จ');
  } finally {
    submit.disabled = false;
    submit.innerHTML = editingProductId ? 'ส่งการแก้ไขเข้าตรวจ <span aria-hidden="true">✓</span>' : 'ส่งบริการเข้าตรวจ <span aria-hidden="true">✓</span>';
  }
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
  const card = currentCard(document.querySelector('#toggle-report-form').dataset.productId);
  if (!card) return showToast('ไม่พบบริการที่ต้องการรายงาน');
  const data = new FormData(event.currentTarget);
  state.reports.unshift({
    id: `report-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`,
    productId: card.dataset.id,
    productTitle: card.dataset.title,
    seller: card.dataset.seller,
    reason: String(data.get('reason') || ''),
    message: String(data.get('message') || '').trim(),
    date: new Intl.DateTimeFormat('th-TH', { dateStyle: 'medium', timeStyle: 'short' }).format(new Date()),
    status: 'open',
  });
  persistState();
  renderAdmin();
  event.currentTarget.reset();
  event.currentTarget.hidden = true;
  document.querySelector('#toggle-report-form').setAttribute('aria-expanded', 'false');
  showToast('ส่งรายงานตัวอย่างแล้ว');
});

document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });
});
document.addEventListener('click', (event) => {
  const closeButton = event.target.closest('[data-close-dialog]');
  if (closeButton) document.querySelector(`#${closeButton.dataset.closeDialog}`)?.close();
  const menuButton = event.target.closest('.menu-toggle');
  const nav = document.querySelector('.main-nav');
  if (menuButton) {
    const expanded = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('open', !expanded);
  } else if (!event.target.closest('.main-nav')) {
    nav.classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
  }
});
