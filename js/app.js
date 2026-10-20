// ========================================================
// SARTORIA AGUIAR — BESPOKE TAILORING (EST. 1928)
// Core Application Logic & State Management
// ========================================================

// 1. PRODUCTS CATALOG DATA
const PRODUCTS_CATALOG = [
  {
    id: 'prod-camisa-giza',
    name: 'Camisa Social Bespoke — Giza 45',
    category: 'camisas',
    fabric: 'Algodão Egípcio Giza 45 • Thomas Mason 140/2',
    desc: 'Colarinho italiano estruturado, punhos franceses para abotoaduras, botões em madrepérola e monograma artesanal.',
    specs: ['Colarinho Italiano', 'Punho Francês', 'Monograma Bordado'],
    tag: 'Ajuste sob medida: Ativo',
    price: 1850,
    priceFormatted: 'R$ 1.850,00',
    badge: 'Essencial Bespoke',
    iconType: 'shirt',
    image: 'assets/images/products/camisa-giza-1.jpg',
    hoverImage: 'assets/images/products/camisa-giza-2.jpg'
  },
  {
    id: 'prod-calca-gurkha',
    name: 'Calça de Alfaiataria Super 150s',
    category: 'calcas',
    fabric: 'Lã Fria Australiana Super 150s • Loro Piana',
    desc: 'Cós militar Gurkha com fivelas duplas em latão, pregas duplas italianas, vinco permanente e barra italiana de 4,5 cm.',
    specs: ['Cós Gurkha', 'Fivelas Ouro Antigo', 'Barra Italiana 4.5cm'],
    tag: 'Barra Italiana 4.5cm • Pregas',
    price: 2450,
    priceFormatted: 'R$ 2.450,00',
    badge: 'Mais Solicitado',
    iconType: 'trousers',
    image: 'assets/images/products/calca-gurkha-1.jpg',
    hoverImage: 'assets/images/products/calca-gurkha-2.jpg'
  },
  {
    id: 'prod-costume-fullcanvas',
    name: 'Costume Aguiar Privé — Full Canvas',
    category: 'ternos',
    fabric: 'Lã & Seda Midnight Navy 280g • Scabal',
    desc: 'Entretelamento flutuante em crina de cavalo sem colagem, lapela pontuda milanesa feita à mão e forro em cupro respirável.',
    specs: ['Full Canvas', 'Lapela Peaked Milanesa', 'Forro Seda Cupro'],
    tag: 'Prova Suíte Jardins Agendada',
    price: 9800,
    priceFormatted: 'R$ 9.800,00',
    badge: 'Alta Costura',
    iconType: 'suit',
    image: 'assets/images/products/costume-fullcanvas-1.jpg',
    hoverImage: 'assets/images/products/costume-fullcanvas-2.jpg'
  },
  {
    id: 'prod-blazer-nautico',
    name: 'Blazer Náutico Double-Breasted 6x2',
    category: 'ternos',
    fabric: 'Lã Hopsack Super 130s • Vitale Barberis Canonico',
    desc: 'Ombros napolitanos com franzido spalla camicia suave, botões brasão em ouro velho polido e bolso peito corte barchetta.',
    specs: ['Double-Breasted 6x2', 'Spalla Camicia', 'Botões Dourados'],
    tag: 'Corte Napolitano Privé',
    price: 5400,
    priceFormatted: 'R$ 5.400,00',
    badge: 'Ícone Riviera',
    iconType: 'suit',
    image: 'assets/images/categories/cat-ternos-blazer.jpg',
    hoverImage: 'assets/images/categories/cat-ternos-prive.jpg'
  },
  {
    id: 'prod-calca-pleated-flannel',
    name: 'Calça Sartorial em Flanela Inglesa Fox Brothers',
    category: 'calcas',
    fabric: 'Flanela Pura Lã 340g • Fox Brothers Somerset',
    desc: 'Modelagem com cós estendido e botão interno, ajustadores laterais sem passantes e caimento pesado impecável.',
    specs: ['Flanela Britânica', 'Cós Estendido', 'Ajustadores Laterais'],
    tag: 'Edição Especial de Inverno',
    price: 2650,
    priceFormatted: 'R$ 2.650,00',
    badge: 'Tecido Raro',
    iconType: 'trousers',
    image: 'assets/images/categories/cat-calcas.jpg',
    hoverImage: 'assets/images/categories/cat-calcas-gurkha.jpg'
  },
  {
    id: 'prod-camisa-linho-normandia',
    name: 'Camisa Sob Medida em Puro Linho da Normandia',
    category: 'camisas',
    fabric: 'Linho Puro Orgânico Certificado • Canclini 1925',
    desc: 'Lavagem aero-finish para toque sedoso sem pinicar, colarinho safari desestruturado e costura fina de 9 pontos por centímetro.',
    specs: ['Puro Linho Francês', 'Colarinho Safari', 'Costura Reforçada'],
    tag: 'Respirabilidade Natural',
    price: 1980,
    priceFormatted: 'R$ 1.980,00',
    badge: 'Temporada Quente',
    iconType: 'shirt',
    image: 'assets/images/categories/cat-camisas.jpg',
    hoverImage: 'assets/images/categories/cat-camisas-cuff.jpg'
  }
];

// 2. SHOPPING CART STATE (Initially empty as requested)
let cart = [];

// Helper: Format currency
function formatBRL(amount) {
  return amount.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

// 3. NAVIGATION & VIEW SWITCHING
function switchMainView(viewName) {
  document.querySelectorAll('.view-container').forEach(el => el.classList.remove('active-view'));
  document.querySelectorAll('.dropdown-item').forEach(btn => btn.classList.remove('active'));

  if (viewName === 'home') {
    document.getElementById('view-home').classList.add('active-view');
    const homeBtn = document.getElementById('dropBtnHome');
    if (homeBtn) homeBtn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  } else if (viewName === 'checkout') {
    renderCheckoutRecap();
    document.getElementById('view-checkout').classList.add('active-view');
    const checkoutBtn = document.getElementById('dropBtnCheckout');
    if (checkoutBtn) checkoutBtn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

// DROPDOWN MENU CONTROLLER FOR FAST VIEW SWITCHER
function toggleViewDropdown(event) {
  if (event) {
    event.stopPropagation();
  }
  const wrap = document.getElementById('viewDropdownWrap');
  const btn = document.getElementById('viewDropdownBtn');
  if (!wrap) return;

  const isOpen = wrap.classList.toggle('open');
  if (btn) {
    btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  }
}

function closeViewDropdown() {
  const wrap = document.getElementById('viewDropdownWrap');
  const btn = document.getElementById('viewDropdownBtn');
  if (wrap) {
    wrap.classList.remove('open');
  }
  if (btn) {
    btn.setAttribute('aria-expanded', 'false');
  }
}

function selectViewAndClose(viewName) {
  switchMainView(viewName);
  closeViewDropdown();
}

function selectActionAndClose(action) {
  closeViewDropdown();
  if (action === 'cart') {
    toggleCartDrawer(true);
  } else if (action === 'checkout') {
    switchMainView('checkout');
  } else if (action === 'profile') {
    toggleProfileDrawer(true);
  } else if (action === 'signin') {
    openAuthModal('signin');
  } else if (action === 'signup') {
    openAuthModal('signup');
  } else if (action === 'logout') {
    logoutUser();
  }
}

// Global click & Escape handlers for view dropdown
document.addEventListener('click', function(e) {
  const wrap = document.getElementById('viewDropdownWrap');
  if (wrap && wrap.classList.contains('open') && !wrap.contains(e.target)) {
    closeViewDropdown();
  }
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closeViewDropdown();
  }
});

// Smooth scroll directly to the catalog
function scrollToProducts(event) {
  if (event) event.preventDefault();
  const catalogEl = document.getElementById('acervo-produtos');
  if (catalogEl) {
    // If not in home view, switch to home first
    if (!document.getElementById('view-home').classList.contains('active-view')) {
      switchMainView('home');
    }
    catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

// 4. CART DRAWER CONTROLS & RENDERING
function toggleCartDrawer(isOpen) {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (!drawer || !backdrop) return;

  if (isOpen) {
    renderCartDrawer();
    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function addToCart(productId) {
  const product = PRODUCTS_CATALOG.find(p => p.id === productId);
  if (!product) return;

  const existingIndex = cart.findIndex(item => item.id === productId);
  if (existingIndex > -1) {
    cart[existingIndex].qty += 1;
  } else {
    cart.push({
      ...product,
      qty: 1
    });
  }

  updateCartBadges();
  renderCartDrawer();
  showToastNotice(`${product.name} adicionado à sacola de atelier!`);

  // Animate the button clicked
  const clickedBtn = document.getElementById(`btn-add-${productId}`);
  if (clickedBtn) {
    const originalText = clickedBtn.innerHTML;
    clickedBtn.innerHTML = 'Adicionado ✓';
    clickedBtn.classList.add('added');
    setTimeout(() => {
      clickedBtn.innerHTML = originalText;
      clickedBtn.classList.remove('added');
    }, 1800);
  }
}

function removeFromCart(index) {
  if (index >= 0 && index < cart.length) {
    const removedItem = cart[index];
    cart.splice(index, 1);
    updateCartBadges();
    renderCartDrawer();
    renderCheckoutRecap();
    showToastNotice(`${removedItem.name} removido da sacola.`);
  }
}

function updateCartBadges() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);

  // Header badge
  const headerBadge = document.getElementById('headerCartBadge');
  if (headerBadge) {
    headerBadge.innerText = totalCount;
    headerBadge.style.display = totalCount > 0 ? 'flex' : 'none';
  }

  // Dropdown menu badge
  const dropBadge = document.getElementById('dropdownCartBadge');
  if (dropBadge) {
    dropBadge.innerText = totalCount;
    dropBadge.style.display = totalCount > 0 ? 'inline-flex' : 'none';
  }

  // Drawer count title badge
  const drawerCountBadge = document.getElementById('drawerCountBadge');
  if (drawerCountBadge) {
    drawerCountBadge.innerText = `${totalCount} ${totalCount === 1 ? 'PEÇA' : 'PEÇAS'}`;
  }
}

function renderCartDrawer() {
  const container = document.getElementById('drawerItemsList');
  const subtotalEl = document.getElementById('drawerSubtotal');
  const totalEl = document.getElementById('drawerTotal');
  const countLabelEl = document.getElementById('drawerItemsCountLabel');
  const installmentEl = document.getElementById('drawerInstallmentText');
  const checkoutBtn = document.getElementById('btnDrawerCheckout');

  if (!container) return;

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  if (cart.length === 0) {
    // EMPTY STATE
    container.innerHTML = `
      <div class="drawer-empty-state">
        <div class="drawer-empty-icon">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
            <line x1="3" y1="6" x2="21" y2="6"/>
            <path d="M16 10a4 4 0 0 1-8 0"/>
          </svg>
        </div>
        <div class="drawer-empty-title">Sua sacola de atelier está vazia</div>
        <p class="drawer-empty-text">Nenhuma peça sob medida foi adicionada ainda. Explore nosso acervo sartorial e encomende criações com caimento exclusivo.</p>
        <button class="btn-empty-explore" onclick="toggleCartDrawer(false); scrollToProducts();">
          Explorar Acervo Sob Medida →
        </button>
      </div>
    `;

    if (subtotalEl) subtotalEl.innerText = 'R$ 0,00';
    if (totalEl) totalEl.innerText = 'R$ 0,00';
    if (countLabelEl) countLabelEl.innerText = 'Subtotal das Peças (0)';
    if (installmentEl) installmentEl.innerText = 'Ou até 10x sem juros no Cartão Private após adicionar itens';
    if (checkoutBtn) {
      checkoutBtn.classList.add('disabled');
      checkoutBtn.style.opacity = '';
      checkoutBtn.style.cursor = 'not-allowed';
    }
  } else {
    // ITEMS IN CART
    let html = '';
    cart.forEach((item, index) => {
      let iconSvg = '';
      if (item.iconType === 'shirt') {
        iconSvg = `
          <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
            <polygon points="26,24 50,38 74,24 68,44 50,54 32,44" fill="#FFFFFF" stroke="#A47B36" stroke-width="1.8"/>
            <line x1="50" y1="54" x2="50" y2="86" stroke="#A47B36" stroke-width="1.8"/>
            <path d="M 26,24 L 12,34 L 22,82" stroke="#181614" stroke-width="1.8"/>
            <path d="M 74,24 L 88,34 L 78,82" stroke="#181614" stroke-width="1.8"/>
          </svg>
        `;
      } else if (item.iconType === 'trousers') {
        iconSvg = `
          <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
            <path d="M 22,22 L 78,22 L 78,29 L 58,29 L 50,46 L 42,29 L 22,29 Z" fill="#F8F5F0" stroke="#A47B36" stroke-width="1.8"/>
            <path d="M 26,65 L 29,82 L 46,82 L 49,50 L 54,82 L 71,82" stroke="#181614" stroke-width="1.8"/>
          </svg>
        `;
      } else {
        iconSvg = `
          <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
            <polygon points="40,22 60,22 64,34 50,44 36,34" fill="#181614"/>
            <path d="M 36,34 L 20,48 L 16,82 L 50,88 L 84,82 L 80,48 L 64,34" stroke="#181614" stroke-width="1.8"/>
          </svg>
        `;
      }

      html += `
        <div class="cart-drawer-item ${index === 0 ? 'highlight' : ''}">
          <div class="drawer-item-thumb">
            ${iconSvg}
          </div>
          <div class="drawer-item-info">
            <div style="display: flex; justify-content: space-between; align-items: flex-start;">
              <div class="drawer-item-name">${item.name}</div>
              <button class="btn-drawer-remove" onclick="removeFromCart(${index})" title="Remover item">
                ✕ Remover
              </button>
            </div>
            <div class="drawer-item-specs">${item.fabric}</div>
            <span class="drawer-item-tag">${item.tag}</span>
            <div class="drawer-item-price-row">
              <span style="color: var(--ink-muted);">Qtd: <strong style="color: var(--ink-primary);">${item.qty} un</strong></span>
              <span class="drawer-item-price">${formatBRL(item.price * item.qty)}</span>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;

    const installmentVal = (subtotal / 10);
    if (subtotalEl) subtotalEl.innerText = formatBRL(subtotal);
    if (totalEl) totalEl.innerText = formatBRL(subtotal);
    if (countLabelEl) countLabelEl.innerText = `Subtotal das Peças (${totalCount})`;
    if (installmentEl) installmentEl.innerText = `Ou até 10x de ${formatBRL(installmentVal)} sem juros no Cartão Private`;
    if (checkoutBtn) {
      checkoutBtn.classList.remove('disabled');
      checkoutBtn.style.opacity = '';
      checkoutBtn.style.cursor = 'pointer';
    }
  }
}

function goToPaymentPage() {
  if (cart.length === 0) {
    alert('Sua sacola de compras está vazia. Adicione ao menos uma peça sob medida do acervo antes de prosseguir.');
    return;
  }
  toggleCartDrawer(false);
  switchMainView('checkout');
}

// 5. CHECKOUT RECAP SYNCHRONIZATION
function renderCheckoutRecap() {
  const container = document.getElementById('checkoutItemsCard');
  const countBreadcrumb = document.getElementById('checkoutCountBreadcrumb');
  const pixSubtotalEl = document.getElementById('pixSubtotalVal');
  const pixDiscountEl = document.getElementById('pixDiscountVal');
  const pixFinalEl = document.getElementById('pixFinalTotal');
  const pixFinalBadge = document.getElementById('pixFinalBadge');

  if (!container) return;

  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const pixDiscount = subtotal * 0.05; // 5% discount
  const pixFinal = subtotal - pixDiscount;

  if (countBreadcrumb) {
    countBreadcrumb.innerText = `1. Sacola (${totalCount} ${totalCount === 1 ? 'Item' : 'Itens'})`;
  }

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="checkout-card-header">
        Itens Encomendados • Resumo da Confecção Sob Medida
      </div>
      <div style="padding: 30px; text-align: center; color: var(--ink-muted);">
        <p style="font-size: 14px; margin-bottom: 14px;">Nenhuma peça selecionada ainda para confecção.</p>
        <button class="btn-ink-primary" onclick="switchMainView('home'); scrollToProducts();">
          Explorar Acervo Sob Medida →
        </button>
      </div>
    `;
    if (pixSubtotalEl) pixSubtotalEl.innerText = 'R$ 0,00';
    if (pixDiscountEl) pixDiscountEl.innerText = '- R$ 0,00';
    if (pixFinalEl) pixFinalEl.innerText = 'R$ 0,00';
    if (pixFinalBadge) pixFinalBadge.innerText = 'R$ 0,00';
    return;
  }

  let html = `
    <div class="checkout-card-header">
      Itens Encomendados • Resumo da Confecção Sob Medida (${totalCount} ${totalCount === 1 ? 'Peça' : 'Peças'})
    </div>
  `;

  cart.forEach(item => {
    let iconSvg = '';
    if (item.iconType === 'shirt') {
      iconSvg = `
        <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
          <polygon points="26,24 50,38 74,24 68,44 50,54 32,44" fill="#FFFFFF" stroke="#A47B36" stroke-width="2"/>
          <line x1="50" y1="54" x2="50" y2="86" stroke="#A47B36" stroke-width="2"/>
        </svg>
      `;
    } else if (item.iconType === 'trousers') {
      iconSvg = `
        <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
          <path d="M 22,22 L 78,22 L 78,29 L 58,29 L 50,46 L 42,29 L 22,29 Z" fill="#F8F5F0" stroke="#A47B36" stroke-width="2"/>
          <path d="M 26,65 L 29,82 L 46,82 L 49,50 L 54,82 L 71,82" stroke="#181614" stroke-width="2"/>
        </svg>
      `;
    } else {
      iconSvg = `
        <svg width="22" height="22" viewBox="0 0 100 100" fill="none">
          <polygon points="40,22 60,22 64,34 50,44 36,34" fill="#181614"/>
          <path d="M 36,34 L 20,48 L 16,82 L 50,88 L 84,82 L 80,48 L 64,34" stroke="#181614" stroke-width="2"/>
        </svg>
      `;
    }

    html += `
      <div class="checkout-item-row">
        <div class="checkout-item-left">
          <div class="checkout-mini-icon">
            ${iconSvg}
          </div>
          <div class="checkout-item-titles">
            <h4>${item.name} (${item.qty}x)</h4>
            <p>${item.fabric} • ${item.tag}</p>
          </div>
        </div>
        <div class="checkout-item-price">${formatBRL(item.price * item.qty)}</div>
      </div>
    `;
  });

  container.innerHTML = html;

  if (pixSubtotalEl) pixSubtotalEl.innerText = formatBRL(subtotal);
  if (pixDiscountEl) pixDiscountEl.innerText = `- ${formatBRL(pixDiscount)}`;
  if (pixFinalEl) pixFinalEl.innerText = formatBRL(pixFinal);
  if (pixFinalBadge) pixFinalBadge.innerText = '5% OFF';
  populateInstallmentOptions();
}

// 6. PRODUCTS CATALOG RENDERING & FILTERING
function renderProductsCatalog(filterCategory = 'todos') {
  const container = document.getElementById('productsCatalogGrid');
  if (!container) return;

  const filtered = filterCategory === 'todos' 
    ? PRODUCTS_CATALOG 
    : PRODUCTS_CATALOG.filter(p => p.category === filterCategory);

  let html = '';
  filtered.forEach(item => {
    let thumbSvg = '';
    if (item.iconType === 'shirt') {
      thumbSvg = `
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
          <polygon points="26,24 44,28 50,38 56,28 74,24 68,44 50,54 32,44" fill="#FFFFFF" stroke="#A47B36" stroke-width="1.5"/>
          <polygon points="44,28 56,28 53,38 50,42 47,38" fill="#A47B36"/>
          <line x1="50" y1="54" x2="50" y2="86" stroke="#A47B36" stroke-width="1.5"/>
          <circle cx="50" cy="62" r="1.8" fill="#181614"/>
          <circle cx="50" cy="72" r="1.8" fill="#181614"/>
          <path d="M 26,24 L 12,34 L 16,68 L 22,82" stroke="#181614" stroke-width="1.6" stroke-linecap="round"/>
          <path d="M 74,24 L 88,34 L 84,68 L 78,82" stroke="#181614" stroke-width="1.6" stroke-linecap="round"/>
        </svg>
      `;
    } else if (item.iconType === 'trousers') {
      thumbSvg = `
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
          <path d="M 22,22 L 78,22 L 78,29 L 58,29 L 54,33 L 46,33 L 42,29 L 22,29 Z" fill="#FFFFFF" stroke="#A47B36" stroke-width="1.5"/>
          <circle cx="50" cy="26" r="1.8" fill="#A47B36"/>
          <path d="M 22,29 L 26,65 L 29,82 L 46,82 L 49,50 L 50,46 L 51,50 L 54,82 L 71,82 L 74,65 L 78,29" stroke="#181614" stroke-width="1.6" stroke-linejoin="round"/>
          <line x1="38" y1="40" x2="38" y2="82" stroke="#A47B36" stroke-width="1.2" stroke-dasharray="3 2"/>
          <line x1="62" y1="40" x2="62" y2="82" stroke="#A47B36" stroke-width="1.2" stroke-dasharray="3 2"/>
        </svg>
      `;
    } else {
      thumbSvg = `
        <svg width="90" height="90" viewBox="0 0 100 100" fill="none">
          <polygon points="40,20 60,20 66,32 50,44 34,32" fill="#181614"/>
          <polygon points="48,44 52,44 53,56 50,60 47,56" fill="#A47B36"/>
          <line x1="50" y1="60" x2="50" y2="92" stroke="#A47B36" stroke-width="1.3"/>
          <path d="M 34,32 L 18,48 L 26,55 L 14,84 L 26,88 L 50,90 L 74,88 L 86,84 L 74,55 L 82,48 L 66,32" stroke="#181614" stroke-width="1.8" stroke-linejoin="round"/>
          <line x1="24" y1="58" x2="36" y2="56" stroke="#A47B36" stroke-width="1.8"/>
        </svg>
      `;
    }

    const pillsHtml = item.specs.map(spec => `<span class="product-spec-pill">${spec}</span>`).join('');

    let mediaHtml = '';
    if (item.image) {
      mediaHtml = `
        <div class="product-card-img-container">
          <img src="${item.image}" alt="${item.name}" class="product-img-primary" loading="lazy">
          ${item.hoverImage ? `<img src="${item.hoverImage}" alt="${item.name} - Detalhe" class="product-img-hover" loading="lazy">` : ''}
        </div>
      `;
    } else {
      mediaHtml = thumbSvg;
    }

    html += `
      <div class="product-card">
        <div class="product-card-thumb-wrap">
          <span class="product-card-badge">${item.badge}</span>
          <span class="product-card-tailor-tag">Sob Medida</span>
          ${mediaHtml}
        </div>
        <div class="product-card-body">
          <div class="product-fabric-origin">${item.fabric}</div>
          <h3 class="product-title">${item.name}</h3>
          <p class="product-desc">${item.desc}</p>
          <div class="product-meta-specs">
            ${pillsHtml}
          </div>
          <div class="product-card-footer">
            <div class="product-price-block">
              <span class="product-price-label">Valor de Alfaiataria</span>
              <span class="product-price-value">${item.priceFormatted}</span>
            </div>
            <button class="btn-add-product" id="btn-add-${item.id}" onclick="addToCart('${item.id}')">
              <span>+</span> Adicionar à Sacola
            </button>
          </div>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}

function filterProducts(category) {
  document.querySelectorAll('.filter-tab-btn').forEach(btn => btn.classList.remove('active'));
  const targetBtn = document.getElementById(`filter-btn-${category}`);
  if (targetBtn) targetBtn.classList.add('active');
  renderProductsCatalog(category);
}

// 7. TOAST NOTIFICATIONS
let toastTimer = null;
function showToastNotice(message) {
  const toast = document.getElementById('toastNotice');
  const toastText = document.getElementById('toastNoticeText');
  if (!toast || !toastText) return;

  toastText.innerText = message;
  toast.classList.add('show');

  if (toastTimer) clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// 8. AUTH MODAL LOGIC
function openAuthModal(mode) {
  const modal = document.getElementById('authModal');
  if (!modal) return;
  modal.classList.add('active-modal');
  setAuthMode(mode);
}

function closeAuthModal() {
  const modal = document.getElementById('authModal');
  if (modal) modal.classList.remove('active-modal');
}

function setAuthMode(mode) {
  const formSignIn = document.getElementById('formSignIn');
  const formSignUp = document.getElementById('formSignUp');
  const tabSignIn = document.getElementById('tabBtnSignIn');
  const tabSignUp = document.getElementById('tabBtnSignUp');
  const title = document.getElementById('authHeaderTitle');
  const bottomText = document.getElementById('authBottomText');
  const bottomLink = document.getElementById('authBottomLink');

  if (!formSignIn || !formSignUp) return;

  if (mode === 'signup') {
    formSignIn.style.display = 'none';
    formSignUp.style.display = 'block';
    if (tabSignIn) tabSignIn.classList.remove('active');
    if (tabSignUp) tabSignUp.classList.add('active');
    if (title) title.innerText = 'Cadastro Aguiar Privé';
    if (bottomText) bottomText.innerText = 'Já possui o Cartão de Membro Aguiar?';
    if (bottomLink) {
      bottomLink.innerText = 'FAZER LOGIN NO LOUNGE PRIVÉ ↗';
      bottomLink.onclick = () => setAuthMode('signin');
    }
  } else {
    formSignIn.style.display = 'block';
    formSignUp.style.display = 'none';
    if (tabSignIn) tabSignIn.classList.add('active');
    if (tabSignUp) tabSignUp.classList.remove('active');
    if (title) title.innerText = 'Acesso Aguiar Privé';
    if (bottomText) bottomText.innerText = 'Ainda não possui o Cartão de Membro Aguiar?';
    if (bottomLink) {
      bottomLink.innerText = 'SOLICITAR CONVITE DE ATELIER ↗';
      bottomLink.onclick = () => setAuthMode('signup');
    }
  }
}

function loginViaWhatsAppConcierge() {
  const phone = '5511988440020';
  const text = encodeURIComponent('Olá, Atelier Aguiar Bespoke. Gostaria de receber meu link seguro de acesso ao Lounge Privé.');
  showToastNotice('Conectando ao WhatsApp Concierge (+55 11 98844-0020)...');
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

function quickBiometricAuth() {
  showToastNotice('Verificando biometria facial / digital segura...');
  setTimeout(() => {
    loginUser('Arthur Montgomery');
    showToastNotice('Biometria autenticada com sucesso • Bem-vindo, Arthur Montgomery!');
    closeAuthModal();
  }, 500);
}

// ========================================================
// GOOGLE IDENTITY SERVICES CONFIGURATION
// ========================================================
// Para conectar com o Google real: crie seu Client ID no https://console.cloud.google.com
// e substitua a chave abaixo pelo seu ID (ex: 123456789-abc.apps.googleusercontent.com)
const GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID_DO_GOOGLE_AQUI.apps.googleusercontent.com';

function initGoogleAuth() {
  if (typeof google !== 'undefined' && google.accounts && google.accounts.id) {
    try {
      google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        callback: handleGoogleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true
      });
    } catch (e) {
      console.warn('Google Identity Services inicialização:', e);
    }
  }
}

function handleGoogleCredentialResponse(response) {
  try {
    // Decodifica o token JWT retornado pelo Google Identity Services
    const base64Url = response.credential.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    const profile = JSON.parse(jsonPayload);
    const googleName = profile.name || profile.given_name || 'Arthur Montgomery';
    const googleEmail = profile.email || '';
    const googleAvatar = profile.picture || '';

    localStorage.setItem('sartoria-logged-user', googleName);
    if (googleEmail) localStorage.setItem('sartoria-logged-email', googleEmail);
    if (googleAvatar) localStorage.setItem('sartoria-logged-avatar', googleAvatar);

    updateLoggedUserState();
    showToastNotice(`Autenticado com sucesso via Google: ${googleName}`);
    closeAuthModal();
  } catch (err) {
    console.error('Erro na resposta do Google:', err);
    loginUser('Arthur Montgomery');
    closeAuthModal();
  }
}

function loginWithGoogle() {
  const isKeyConfigured = GOOGLE_CLIENT_ID && !GOOGLE_CLIENT_ID.includes('SEU_CLIENT_ID');

  // Se a biblioteca oficial do Google estiver carregada e uma chave real configurada:
  if (typeof google !== 'undefined' && google.accounts && google.accounts.id && isKeyConfigured) {
    try {
      showToastNotice('Abrindo autenticação oficial com a Conta Google...');
      google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
          // Fallback seguro caso o navegador bloqueie o OneTap automático
          fallbackGoogleLogin();
        }
      });
    } catch (err) {
      console.warn('Google prompt indisponível:', err);
      fallbackGoogleLogin();
    }
  } else {
    fallbackGoogleLogin();
  }
}

function fallbackGoogleLogin() {
  showToastNotice('Conectando à Conta Google segura...');
  setTimeout(() => {
    loginUser('Arthur Montgomery');
    showToastNotice('Autenticado com sucesso via Google! Bem-vindo ao Lounge Privé.');
    closeAuthModal();
  }, 450);
}

function forgotPasswordNotice(event) {
  if (event) event.preventDefault();
  showToastNotice('Instruções de redefinição enviadas para arthur.vip@aguiar.com e Concierge WhatsApp.');
}

function loginUser(userName) {
  localStorage.setItem('sartoria-logged-user', userName);
  updateLoggedUserState();
}

function logoutUser() {
  localStorage.removeItem('sartoria-logged-user');
  toggleProfileDrawer(false);
  updateLoggedUserState();
  showToastNotice('Sessão encerrada com sucesso. Botões de acesso restaurados.');
}

// 8.1 MEMBER PROFILE & ORDERS FLYOUT DRAWER CONTROLLER
let currentProfileFilter = 'all';

const INITIAL_MEMBER_ORDERS = [
  {
    id: 'AG-9420',
    title: 'Terno Completo Super 160s Loro Piana',
    category: 'Ternos Sob Medida',
    fabric: 'Lã Fria Australiana Super 160s • Azul Noturno Sartorial • Forro em Seda Bemberg',
    price: 'R$ 14.800,00',
    date: '14 de Outubro, 2026',
    status: 'processing', // 'processing' | 'shipping' | 'delivered'
    statusLabel: 'Em Processamento',
    statusDesc: 'Corte manual e alinhavo de prova pelo Master Tailor.',
    step: 2, // 1: Aprovado, 2: Confecção, 3: Prova, 4: Envio
    badgeColor: 'gold',
    note: 'Prova de suíte agendada: Quinta-feira, 24 de Outubro às 15:00 na Suíte Jardins (SP).',
    image: 'assets/images/categories/cat-ternos-reais.jpg'
  },
  {
    id: 'AG-8815',
    title: 'Camisa Sob Medida Giza 87 Thomas Mason',
    category: 'Camisaria Italiana',
    fabric: 'Algodão Egípcio Puro Giza 87 • Colarinho Italiano Reforçado • Branca',
    price: 'R$ 1.890,00',
    date: '16 de Outubro, 2026',
    status: 'shipping',
    statusLabel: 'Em Envio',
    statusDesc: 'Portador Concierge Privativo a caminho com capa de proteção.',
    step: 3,
    badgeColor: 'blue',
    note: 'Portador Aguiar: Ricardo Silveira • Previsão de entrega: Hoje até às 18:30 no endereço cadastrado.',
    image: 'assets/images/categories/cat-camisas-sociais.jpg'
  },
  {
    id: 'AG-7204',
    title: 'Calça de Alfaiataria Gurkha Lã Fria 130s',
    category: 'Calças de Alfaiataria',
    fabric: 'Lã Fria 130s Scabal • Cintura Alta Gurkha com Fivelas de Latão • Cinza Grafite',
    price: 'R$ 3.450,00',
    date: '02 de Outubro, 2026',
    status: 'delivered',
    statusLabel: 'Entregue',
    statusDesc: 'Ajustes finos aprovados e peça entregue no closet do membro.',
    step: 4,
    badgeColor: 'green',
    note: 'Concluído na Suíte Jardins com o Alfaiate Mestre Matteo Rossi.',
    image: 'assets/images/categories/cat-calcas-gurkha-real.jpg'
  }
];

let memberOrdersList = [...INITIAL_MEMBER_ORDERS];

function handleLoungeHeaderClick() {
  const user = localStorage.getItem('sartoria-logged-user');
  if (user) {
    toggleProfileDrawer(true);
  } else {
    openAuthModal('signin');
  }
}

function toggleProfileDrawer(isOpen) {
  const drawer = document.getElementById('profileDrawer');
  const backdrop = document.getElementById('profileBackdrop');
  if (!drawer || !backdrop) return;

  if (isOpen) {
    if (!localStorage.getItem('sartoria-logged-user')) {
      loginUser('Arthur Montgomery');
    }

    const userName = localStorage.getItem('sartoria-logged-user') || 'Arthur Montgomery';
    const nameEl = document.getElementById('profileMemberName');
    const avatarEl = document.getElementById('profileAvatarMonogram');
    if (nameEl) nameEl.innerText = userName;
    if (avatarEl) {
      avatarEl.innerText = userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'VIP';
    }

    drawer.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    filterProfileOrders(currentProfileFilter || 'all');
  } else {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function filterProfileOrders(filter) {
  currentProfileFilter = filter;
  const tabAll = document.getElementById('tabOrderAll');
  const tabProcessing = document.getElementById('tabOrderProcessing');
  const tabShipping = document.getElementById('tabOrderShipping');

  if (tabAll) tabAll.classList.toggle('active', filter === 'all');
  if (tabProcessing) tabProcessing.classList.toggle('active', filter === 'processing');
  if (tabShipping) tabShipping.classList.toggle('active', filter === 'shipping');

  renderProfileOrders(filter);
}

function renderProfileOrders(filter) {
  const container = document.getElementById('profileOrdersContainer');
  if (!container) return;

  const countAll = memberOrdersList.length;
  const countProcessing = memberOrdersList.filter(o => o.status === 'processing').length;
  const countShipping = memberOrdersList.filter(o => o.status === 'shipping').length;

  const countAllEl = document.getElementById('countAllOrders');
  const countProcEl = document.getElementById('countProcessingOrders');
  const countShipEl = document.getElementById('countShippingOrders');
  if (countAllEl) countAllEl.innerText = countAll;
  if (countProcEl) countProcEl.innerText = countProcessing;
  if (countShipEl) countShipEl.innerText = countShipping;

  const filtered = filter === 'all' 
    ? memberOrdersList 
    : memberOrdersList.filter(o => o.status === filter);

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="profile-orders-empty">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="12" cy="12" r="10"/>
          <line x1="8" y1="12" x2="16" y2="12"/>
        </svg>
        <h4>Nenhum pedido nesta etapa</h4>
        <p>Você não possui peças no status selecionado no momento.</p>
        <button type="button" class="btn-order-action" onclick="filterProfileOrders('all')" style="margin-top:8px;">
          Ver Todos os Pedidos
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(order => {
    const s1 = order.step >= 1 ? 'done' : '';
    const s2 = order.step > 2 ? 'done' : (order.step === 2 ? 'current' : '');
    const s3 = order.step > 3 ? 'done' : (order.step === 3 ? 'current' : '');
    const s4 = order.step >= 4 ? 'done' : '';
    const fillWidth = order.step === 1 ? '15%' : (order.step === 2 ? '48%' : (order.step === 3 ? '80%' : '100%'));

    return `
      <div class="order-luxury-card">
        <div class="order-card-header">
          <div class="order-id-group">
            <span class="order-id-text">Pedido #${order.id}</span>
            <span class="order-date-text">• ${order.date}</span>
          </div>
          <span class="order-status-badge ${order.badgeColor}">${order.statusLabel}</span>
        </div>

        <div class="order-product-row">
          <div class="order-product-thumb">
            <img src="${order.image}" alt="${order.title}">
          </div>
          <div class="order-product-details">
            <h4>${order.title}</h4>
            <p>${order.fabric}</p>
            <div class="order-price-val">${order.price}</div>
          </div>
        </div>

        <div class="order-stepper-track">
          <div class="order-stepper-steps">
            <div class="order-stepper-bar-bg"></div>
            <div class="order-stepper-bar-fill" style="width: ${fillWidth};"></div>
            <div class="stepper-node ${s1}">
              <div class="node-dot">✓</div>
              <span class="node-label">Aprovado</span>
            </div>
            <div class="stepper-node ${s2}">
              <div class="node-dot">${order.step > 2 ? '✓' : '2'}</div>
              <span class="node-label">Confecção</span>
            </div>
            <div class="stepper-node ${s3}">
              <div class="node-dot">${order.step > 3 ? '✓' : '3'}</div>
              <span class="node-label">Prova</span>
            </div>
            <div class="stepper-node ${s4}">
              <div class="node-dot">${order.step >= 4 ? '✓' : '4'}</div>
              <span class="node-label">Envio</span>
            </div>
          </div>
          <div class="order-step-status-note">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>${order.note}</span>
          </div>
        </div>

        <div class="order-card-actions">
          <button type="button" class="btn-order-action" onclick="contactConciergeForOrder('${order.id}')">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
            </svg>
            <span>Concierge do Pedido</span>
          </button>
          <button type="button" class="btn-order-action" onclick="showToastNotice('Ficha técnica e medidas 3D do Pedido #${order.id} consultadas.')">
            <span>Ficha do Molde</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

function contactConciergeForOrder(orderId) {
  const phone = '5511988440020';
  const text = encodeURIComponent(`Olá, Atelier Aguiar! Gostaria de falar sobre o andamento do meu Pedido #${orderId}.`);
  showToastNotice(`Conectando ao Concierge VIP sobre o Pedido #${orderId}...`);
  window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
}

function goToCatalogFromProfile() {
  toggleProfileDrawer(false);
  switchMainView('home');
  setTimeout(() => {
    const acervo = document.getElementById('acervo');
    if (acervo) {
      acervo.scrollIntoView({ behavior: 'smooth' });
    }
  }, 180);
  showToastNotice('Exibindo Acervo Completo da Sartoria Aguiar');
}

function logoutUserFromDrawer() {
  toggleProfileDrawer(false);
  logoutUser();
}

function updateLoggedUserState() {
  const user = localStorage.getItem('sartoria-logged-user');

  // 1. Top bar buttons (Sign In, Sign Up, Sair da Conta, Meu Lounge)
  const btnSignIn = document.getElementById('topBtnSignIn');
  const btnSignUp = document.getElementById('topBtnSignUp');
  const btnLogout = document.getElementById('topBtnLogout');
  const btnProfile = document.getElementById('topBtnProfile');

  if (user) {
    if (btnSignIn) btnSignIn.style.display = 'none';
    if (btnSignUp) btnSignUp.style.display = 'none';
    if (btnLogout) btnLogout.style.display = 'flex';
    if (btnProfile) btnProfile.style.display = 'flex';
  } else {
    if (btnSignIn) btnSignIn.style.display = 'flex';
    if (btnSignUp) btnSignUp.style.display = 'flex';
    if (btnLogout) btnLogout.style.display = 'none';
    if (btnProfile) btnProfile.style.display = 'none';
  }

  // 2. Header lounge button & header logout button
  const loungeBtns = document.querySelectorAll('.btn-lounge-vip');
  const headerLogoutBtn = document.getElementById('headerLogoutBtn');

  if (headerLogoutBtn) {
    headerLogoutBtn.style.display = user ? 'inline-flex' : 'none';
  }

  loungeBtns.forEach(btn => {
    if (user) {
      const initials = user.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'VIP';
      btn.innerHTML = `
        <div class="lounge-monogram" style="background:var(--gold-antique); color:#181614; font-weight:700;">${initials}</div>
        <span>${user.toUpperCase()} • PRIVÉ</span>
      `;
      btn.title = `${user} (Membro Privé) • Clique para abrir Menu do Lounge`;
      btn.onclick = () => toggleProfileDrawer(true);
    } else {
      btn.innerHTML = `
        <div class="lounge-monogram">A</div>
        <span>LOUNGE PRIVÉ</span>
      `;
      btn.title = 'Acessar Lounge Privé';
      btn.onclick = () => openAuthModal('signin');
    }
  });

  // 3. Club section CTA banner
  const clubBannerCta = document.querySelector('.club-banner-cta');
  if (clubBannerCta) {
    if (user) {
      clubBannerCta.innerHTML = `
        <button class="btn-ink-primary" onclick="toggleProfileDrawer(true)">
          Acessar Meu Lounge Privé →
        </button>
        <a class="link-small-login" onclick="logoutUser()" style="cursor:pointer;">Sair da conta (${user}) ↗</a>
      `;
    } else {
      clubBannerCta.innerHTML = `
        <button class="btn-ink-primary" onclick="openAuthModal('signup')">
          Criar Conta Aguiar Privé →
        </button>
        <a class="link-small-login" onclick="openAuthModal('signin')">Já é membro? Fazer login ↗</a>
      `;
    }
  }
}

function handleAuthSubmit(event, mode) {
  event.preventDefault();
  if (mode === 'signup') {
    loginUser('Arthur Montgomery');
    showToastNotice('Solicitação de Cadastro enviada! Chave de segurança gerada com sucesso.');
  } else {
    const emailVal = document.getElementById('authEmailInput') ? document.getElementById('authEmailInput').value : 'arthur.vip@aguiar.com';
    const name = emailVal.toLowerCase().includes('arthur') ? 'Arthur Montgomery' : emailVal.split('@')[0];
    loginUser(name);
    showToastNotice(`Acesso autorizado • Bem-vindo ao Lounge Privé, ${name}!`);
  }
  closeAuthModal();
}

// 9. PAYMENT METHOD SELECTION & CREDIT CARD / CONCIERGE LOGIC
function selectPaymentMethod(method) {
  document.querySelectorAll('.payment-option-tab').forEach(el => el.classList.remove('selected'));
  const boxPix = document.getElementById('box-pix-content');
  const boxCard = document.getElementById('box-card-content');
  const boxConcierge = document.getElementById('box-concierge-content');

  if (method === 'pix') {
    const tabPix = document.getElementById('tab-pix');
    if (tabPix) tabPix.classList.add('selected');
    if (boxPix) boxPix.style.display = 'block';
    if (boxCard) boxCard.style.display = 'none';
    if (boxConcierge) boxConcierge.style.display = 'none';
  } else if (method === 'card') {
    const tabCard = document.getElementById('tab-card');
    if (tabCard) tabCard.classList.add('selected');
    if (boxPix) boxPix.style.display = 'none';
    if (boxCard) boxCard.style.display = 'block';
    if (boxConcierge) boxConcierge.style.display = 'none';
    populateInstallmentOptions();
  } else if (method === 'concierge') {
    const tabConcierge = document.getElementById('tab-concierge');
    if (tabConcierge) tabConcierge.classList.add('selected');
    if (boxPix) boxPix.style.display = 'none';
    if (boxCard) boxCard.style.display = 'none';
    if (boxConcierge) boxConcierge.style.display = 'block';
  }
}

// CREDIT CARD FORMATTING & REAL-TIME PREVIEW
function handleCardNumberInput(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 16);
  let formatted = val.replace(/(\d{4})(?=\d)/g, '$1 ');
  input.value = formatted;

  const displayEl = document.getElementById('cardDisplayNumber');
  const badgeEl = document.getElementById('cardBrandBadge');
  const iconEl = document.getElementById('cardDetectedIcon');

  if (val.length === 0) {
    if (displayEl) displayEl.innerText = '•••• •••• •••• ••••';
    if (badgeEl) badgeEl.innerText = 'AGUIAR PRIVÉ';
    if (iconEl) iconEl.innerText = '';
    return;
  }

  // Format with masked bullet points
  let masked = '';
  for (let i = 0; i < 16; i++) {
    if (i > 0 && i % 4 === 0) masked += ' ';
    if (i < val.length) {
      if (i < 4 || i >= val.length - 4) {
        masked += val[i];
      } else {
        masked += '•';
      }
    } else {
      masked += '•';
    }
  }
  if (displayEl) displayEl.innerText = masked;

  // Brand detection
  if (val.startsWith('4')) {
    if (badgeEl) badgeEl.innerText = 'VISA PRIVÉ BLACK';
    if (iconEl) iconEl.innerText = 'Visa';
  } else if (/^5[1-5]|^2[2-7]/.test(val)) {
    if (badgeEl) badgeEl.innerText = 'MASTERCARD BLACK';
    if (iconEl) iconEl.innerText = 'Mastercard';
  } else if (/^3[47]/.test(val)) {
    if (badgeEl) badgeEl.innerText = 'AMEX PLATINUM';
    if (iconEl) iconEl.innerText = 'Amex';
  } else {
    if (badgeEl) badgeEl.innerText = 'AGUIAR PRIVÉ';
    if (iconEl) iconEl.innerText = '';
  }
}

function handleCardHolderInput(input) {
  input.value = input.value.toUpperCase();
  const displayEl = document.getElementById('cardDisplayName');
  if (displayEl) {
    displayEl.innerText = input.value.trim() || 'NOME DO TITULAR';
  }
}

function handleCardExpiryInput(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 4);
  if (val.length >= 3) {
    val = val.substring(0, 2) + '/' + val.substring(2);
  }
  input.value = val;
  const displayEl = document.getElementById('cardDisplayExp');
  if (displayEl) {
    displayEl.innerText = val || 'MM/AA';
  }
}

function handleCardCvvInput(input) {
  input.value = input.value.replace(/\D/g, '').substring(0, 4);
}

function handleCardDocInput(input) {
  let val = input.value.replace(/\D/g, '').substring(0, 11);
  val = val.replace(/(\d{3})(\d)/, '$1.$2');
  val = val.replace(/(\d{3})(\d)/, '$1.$2');
  val = val.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  input.value = val;
}

// AUTO-FILL HYPOTHETICAL CARD FOR TESTING
function autoFillHypotheticalCard() {
  const numberInput = document.getElementById('cardNumberInput');
  const holderInput = document.getElementById('cardHolderInput');
  const expInput = document.getElementById('cardExpiryInput');
  const cvvInput = document.getElementById('cardCvvInput');
  const docInput = document.getElementById('cardDocInput');

  if (numberInput) numberInput.value = '4532 8910 2345 6789';
  if (holderInput) holderInput.value = 'ARTHUR MONTGOMERY';
  if (expInput) expInput.value = '12/29';
  if (cvvInput) cvvInput.value = '888';
  if (docInput) docInput.value = '123.456.789-00';

  // Update card virtual preview
  const displayNum = document.getElementById('cardDisplayNumber');
  const displayName = document.getElementById('cardDisplayName');
  const displayExp = document.getElementById('cardDisplayExp');
  const badgeEl = document.getElementById('cardBrandBadge');
  const iconEl = document.getElementById('cardDetectedIcon');

  if (displayNum) displayNum.innerText = '4532 •••• •••• 6789';
  if (displayName) displayName.innerText = 'ARTHUR MONTGOMERY';
  if (displayExp) displayExp.innerText = '12/29';
  if (badgeEl) badgeEl.innerText = 'VISA PRIVÉ BLACK';
  if (iconEl) iconEl.innerText = 'Visa';

  // Automatically confirm card and reveal installment options
  confirmCardAndShowInstallments(true);
  showToastNotice('Cartão hipotético preenchido! Escolha as parcelas e condições abaixo.');
}

// CONFIRM CARD & SHOW INSTALLMENTS
function confirmCardAndShowInstallments(isAuto = false) {
  const numberInput = document.getElementById('cardNumberInput');
  const holderInput = document.getElementById('cardHolderInput');
  const expInput = document.getElementById('cardExpiryInput');

  const numberVal = numberInput ? numberInput.value.replace(/\D/g, '') : '';
  const holderVal = holderInput ? holderInput.value.trim() : '';
  const expVal = expInput ? expInput.value.trim() : '';

  if (!isAuto && (numberVal.length < 13 || !holderVal || expVal.length < 5)) {
    alert('Por favor, preencha o número do cartão, nome do titular e validade antes de prosseguir.');
    return;
  }

  const last4 = numberVal.length >= 4 ? numberVal.slice(-4) : '6789';
  const confirmedSummary = document.getElementById('confirmedCardSummary');
  const confirmedHolder = document.getElementById('confirmedCardHolder');

  if (confirmedSummary) confirmedSummary.innerText = `Cartão Final ${last4} Adicionado`;
  if (confirmedHolder) confirmedHolder.innerText = `${holderVal || 'Arthur Montgomery'} • Venc. ${expVal || '12/29'}`;

  // Hide initial add button and reveal installments section smoothly
  const btnAdd = document.getElementById('btnAddCard');
  if (btnAdd) btnAdd.style.display = 'none';

  const installmentsSection = document.getElementById('cardInstallmentsSection');
  if (installmentsSection) {
    installmentsSection.style.display = 'flex';
    populateInstallmentOptions();
    installmentsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}

function editCardDetails() {
  const installmentsSection = document.getElementById('cardInstallmentsSection');
  if (installmentsSection) installmentsSection.style.display = 'none';

  const btnAdd = document.getElementById('btnAddCard');
  if (btnAdd) btnAdd.style.display = 'block';

  const numberInput = document.getElementById('cardNumberInput');
  if (numberInput) numberInput.focus();
}

// INSTALLMENTS CALCULATION & DROPDOWN POPULATION
const INSTALLMENT_PLANS = [
  { count: 1, rate: 0, label: 'Sem Juros (Cortesía Privé)' },
  { count: 2, rate: 0, label: 'Sem Juros (Cortesía Privé)' },
  { count: 3, rate: 0, label: 'Sem Juros (Cortesía Privé)' },
  { count: 4, rate: 0.024, label: 'Taxa de 2,4%' },
  { count: 5, rate: 0.032, label: 'Taxa de 3,2%' },
  { count: 6, rate: 0.041, label: 'Taxa de 4,1%' },
  { count: 7, rate: 0.052, label: 'Taxa de 5,2%' },
  { count: 8, rate: 0.063, label: 'Taxa de 6,3%' },
  { count: 9, rate: 0.074, label: 'Taxa de 7,4%' },
  { count: 10, rate: 0.085, label: 'Taxa de 8,5%' },
  { count: 12, rate: 0.099, label: 'Taxa de 9,9%' }
];

function populateInstallmentOptions() {
  const select = document.getElementById('installmentSelect');
  if (!select) return;

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) || 1980; // fallback if viewing empty
  const subtotalDisplay = document.getElementById('instSubtotalDisplay');
  if (subtotalDisplay) subtotalDisplay.innerText = formatBRL(subtotal);

  select.innerHTML = '';
  INSTALLMENT_PLANS.forEach(plan => {
    const totalWithInterest = subtotal * (1 + plan.rate);
    const installmentValue = totalWithInterest / plan.count;

    const opt = document.createElement('option');
    opt.value = plan.count;
    opt.innerText = `${plan.count}x de ${formatBRL(installmentValue)} (Total: ${formatBRL(totalWithInterest)}) • ${plan.rate === 0 ? 'Sem Juros' : `Taxa de ${(plan.rate * 100).toFixed(1)}%`}`;
    select.appendChild(opt);
  });

  handleInstallmentChange(select.value || 1);
}

function handleInstallmentChange(countValue) {
  const count = parseInt(countValue, 10) || 1;
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) || 1980;
  const plan = INSTALLMENT_PLANS.find(p => p.count === count) || INSTALLMENT_PLANS[0];

  const totalWithInterest = subtotal * (1 + plan.rate);
  const installmentValue = totalWithInterest / plan.count;
  const interestAmount = totalWithInterest - subtotal;

  const planEl = document.getElementById('instSelectedPlan');
  const rateEl = document.getElementById('instRateDisplay');
  const totalEl = document.getElementById('instTotalDisplay');

  if (planEl) planEl.innerText = `${plan.count}x de ${formatBRL(installmentValue)}`;
  if (rateEl) {
    if (plan.rate === 0) {
      rateEl.innerText = 'Sem Juros (Cortesía Privé)';
      rateEl.style.background = 'rgba(46, 125, 50, 0.15)';
      rateEl.style.color = '#2E7D32';
    } else {
      rateEl.innerText = `Pequena taxa de ${(plan.rate * 100).toFixed(1)}% (+${formatBRL(interestAmount)})`;
      rateEl.style.background = 'rgba(164, 123, 54, 0.14)';
      rateEl.style.color = 'var(--gold-antique)';
    }
  }
  if (totalEl) totalEl.innerText = formatBRL(totalWithInterest);
}

function processCardPayment() {
  const count = document.getElementById('installmentSelect')?.value || '1';
  const plan = INSTALLMENT_PLANS.find(p => p.count === parseInt(count, 10)) || INSTALLMENT_PLANS[0];
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0) || 1980;
  const totalWithInterest = subtotal * (1 + plan.rate);
  const installmentValue = totalWithInterest / plan.count;
  const newOrderId = `AG-${Math.floor(1000 + Math.random() * 9000)}`;

  alert(`Pagamento Aprovado com Sucesso!\n\nPedido #${newOrderId} registrado no Cartão de Crédito em ${plan.count}x de ${formatBRL(installmentValue)}.\nTotal: ${formatBRL(totalWithInterest)}.\n\nSeu Master Tailor e Concierge Dedicado foram notificados para o agendamento da prova.`);

  memberOrdersList.unshift({
    id: newOrderId,
    title: cart[0]?.name || 'Peça Sob Medida Aguiar Privé',
    category: 'Alta Alfaiataria',
    fabric: 'Tecidos Raros Selecionados • Modelagem 3D Anatômica',
    price: formatBRL(totalWithInterest),
    date: 'Hoje',
    status: 'processing',
    statusLabel: 'Em Processamento',
    statusDesc: 'Pedido aprovado no cartão. Encaminhado para corte manual.',
    step: 2,
    badgeColor: 'gold',
    note: 'Entrada na fila de confecção e prova. Concierge agendará o horário na sua suíte.',
    image: cart[0]?.image || 'assets/images/categories/cat-ternos-reais.jpg'
  });

  cart = [];
  updateCartBadges();
  renderCartDrawer();
  renderCheckoutRecap();
  switchMainView('home');
}

function processConciergePayment() {
  const newOrderId = `CN-${Math.floor(5000 + Math.random() * 4000)}`;
  alert(`Solicitação de Faturamento Concierge Privé enviada com sucesso!\n\nO número de protocolo VIP #${newOrderId} foi aberto. Nossa equipe de concierge entrará em contato via WhatsApp / E-mail para formalizar a fatura.`);

  memberOrdersList.unshift({
    id: newOrderId,
    title: cart[0]?.name || 'Faturamento Concierge Privé',
    category: 'Conta Privé',
    fabric: 'Confecção Sob Medida • Fatura consolidada em 30/60 dias',
    price: formatBRL(cart.reduce((sum, item) => sum + (item.price * item.qty), 0) || 1980),
    date: 'Hoje',
    status: 'processing',
    statusLabel: 'Em Processamento',
    statusDesc: 'Faturamento em análise pelo Concierge particular.',
    step: 2,
    badgeColor: 'gold',
    note: 'Protocolo aberto. Confecção liberada e prova pré-agendada.',
    image: cart[0]?.image || 'assets/images/categories/cat-ternos-reais.jpg'
  });

  cart = [];
  updateCartBadges();
  renderCartDrawer();
  renderCheckoutRecap();
  switchMainView('home');
}

function copyPixCode() {
  const input = document.getElementById('pixKeyInput');
  if (!input) return;
  input.select();
  navigator.clipboard.writeText(input.value).then(() => {
    const btn = document.getElementById('copyPixBtn');
    if (btn) {
      btn.innerText = 'Copiado!';
      btn.style.background = '#2E7D32';
      setTimeout(() => {
        btn.innerText = 'Copiar Chave';
        btn.style.background = '';
      }, 2500);
    }
  }).catch(() => {
    alert('Chave copiada para a área de transferência!');
  });
}

// 10. REAL-TIME COUNTDOWN TIMER
let countdownMinutes = 14;
let countdownSeconds = 52;
setInterval(() => {
  if (countdownSeconds === 0) {
    if (countdownMinutes === 0) return;
    countdownMinutes--;
    countdownSeconds = 59;
  } else {
    countdownSeconds--;
  }
  const timerEl = document.getElementById('pix-countdown');
  if (timerEl) {
    timerEl.innerText = `${countdownMinutes}:${countdownSeconds < 10 ? '0' : ''}${countdownSeconds}`;
  }
}, 1000);

// 11. INITIALIZATION ON DOM READY
document.addEventListener('DOMContentLoaded', () => {
  // Initialize theme from browser preferences or saved choice
  initTheme();
  // Initialize hero sartorial carousel with top progress bars
  initHeroCarousel();
  // Render products catalog on home page
  renderProductsCatalog('todos');
  // Initially render the empty cart drawer
  renderCartDrawer();
  updateCartBadges();
  // Initialize authenticated user state if saved
  updateLoggedUserState();
  // Initialize dynamic headline word rotator ("SHIRT" -> "PANTS" -> "BLAZER" -> "FIT")
  initHeroWordRotator();
  // Initialize Google Identity Services if available
  initGoogleAuth();
});

// 12. THEME CONTROLLER (AUTOMATIC BROWSER DETECTION + MANUAL TOGGLE)
function initTheme() {
  const savedTheme = localStorage.getItem('sartoria-theme') || 'auto';
  applyTheme(savedTheme);

  // Listen to OS / browser preference changes in real-time
  try {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', () => {
      if ((localStorage.getItem('sartoria-theme') || 'auto') === 'auto') {
        applyTheme('auto');
      }
    });
  } catch (e) {
    // Legacy fallback
  }
}

const THEME_ICONS = {
  moon: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`,
  sun: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`,
  auto: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"></circle><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"></path></svg>`
};

function applyTheme(theme) {
  const root = document.documentElement;
  const label = document.getElementById('themeLabel');
  const icon = document.getElementById('themeIcon');
  const headerIcon = document.getElementById('themeHeaderIcon');

  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
    if (label) label.innerText = 'Tema: Escuro';
    if (icon) icon.innerHTML = THEME_ICONS.moon;
    if (headerIcon) headerIcon.innerHTML = THEME_ICONS.moon;
  } else if (theme === 'light') {
    root.setAttribute('data-theme', 'light');
    if (label) label.innerText = 'Tema: Claro';
    if (icon) icon.innerHTML = THEME_ICONS.sun;
    if (headerIcon) headerIcon.innerHTML = THEME_ICONS.sun;
  } else {
    // Auto: follows browser prefers-color-scheme
    root.removeAttribute('data-theme');
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (label) label.innerText = isDark ? 'Tema: Auto Escuro' : 'Tema: Auto Claro';
    if (icon) icon.innerHTML = THEME_ICONS.auto;
    if (headerIcon) headerIcon.innerHTML = THEME_ICONS.auto;
  }
}

function toggleTheme() {
  const current = localStorage.getItem('sartoria-theme') || 'auto';
  let next = 'light';
  if (current === 'auto') {
    const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    next = isDark ? 'light' : 'dark';
  } else if (current === 'light') {
    next = 'dark';
  } else {
    next = 'auto';
  }
  localStorage.setItem('sartoria-theme', next);
  applyTheme(next);
  showToastNotice(`Tema alterado: ${next === 'dark' ? 'Modo Escuro Ativado' : next === 'light' ? 'Modo Claro Ativado' : 'Modo Automático Ativado'}`);
}

// 13. HERO SARTORIAL CAROUSEL CONTROLLER
let currentHeroSlide = 0;
const totalHeroSlides = 4;
const HERO_SLIDE_DURATION = 4800; // 4.8 seconds per slide
let heroSlideProgress = 0;
let isHeroCarouselPaused = false;
let heroCarouselInterval = null;

function initHeroCarousel() {
  const frame = document.getElementById('heroCarouselFrame');
  if (!frame) return;

  // Pause timer on hover ONLY if device has a fine pointer (desktop mouse).
  // This prevents simulated mouseenter on mobile touchscreens from freezing the progress bar.
  const hasFinePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (hasFinePointer) {
    frame.addEventListener('mouseenter', () => {
      isHeroCarouselPaused = true;
    });
    frame.addEventListener('mouseleave', () => {
      isHeroCarouselPaused = false;
    });
  }

  // Touch swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  frame.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  frame.addEventListener('touchend', (e) => {
    isHeroCarouselPaused = false;
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 45) {
      nextHeroSlide();
    } else if (touchEndX > touchStartX + 45) {
      prevHeroSlide();
    }
  }, { passive: true });
  frame.addEventListener('touchcancel', () => {
    isHeroCarouselPaused = false;
  }, { passive: true });

  // Start progress and show first slide
  setHeroSlide(0);
  startHeroCarouselTimer();
}

function startHeroCarouselTimer() {
  if (heroCarouselInterval) clearInterval(heroCarouselInterval);
  const stepMs = 40;
  const progressIncrement = (stepMs / HERO_SLIDE_DURATION) * 100;

  heroCarouselInterval = setInterval(() => {
    if (isHeroCarouselPaused) return;

    heroSlideProgress += progressIncrement;
    const currentBar = document.getElementById(`carouselProgress${currentHeroSlide}`);
    if (currentBar) {
      currentBar.style.width = `${Math.min(heroSlideProgress, 100)}%`;
    }

    if (heroSlideProgress >= 100) {
      setHeroSlide((currentHeroSlide + 1) % totalHeroSlides);
    }
  }, stepMs);
}

function setHeroSlide(index) {
  currentHeroSlide = index;
  heroSlideProgress = 0;
  isHeroCarouselPaused = false;

  const slides = document.querySelectorAll('.hero-carousel-slide');
  slides.forEach((slide, i) => {
    if (i === index) {
      slide.classList.add('active');
      // Update footer specs
      const specLeft = document.getElementById('heroCarouselSpecLeft');
      const specRight = document.getElementById('heroCarouselSpecRight');
      if (specLeft && slide.dataset.specLeft) specLeft.innerHTML = slide.dataset.specLeft;
      if (specRight && slide.dataset.specRight) specRight.innerHTML = slide.dataset.specRight;
    } else {
      slide.classList.remove('active');
    }
  });

  // Update progress bars
  for (let i = 0; i < totalHeroSlides; i++) {
    const bar = document.getElementById(`carouselProgress${i}`);
    if (bar) {
      if (i < index) {
        bar.style.width = '100%';
      } else if (i === index) {
        bar.style.width = '0%';
      } else {
        bar.style.width = '0%';
      }
    }
  }
}

function nextHeroSlide(event) {
  if (event) event.stopPropagation();
  setHeroSlide((currentHeroSlide + 1) % totalHeroSlides);
}

function prevHeroSlide(event) {
  if (event) event.stopPropagation();
  setHeroSlide((currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides);
}

// 14. HERO DYNAMIC HEADLINE WORD ROTATOR ("SHIRT" -> "PANTS" -> "BLAZER" -> "FIT")
const HERO_ROTATING_WORDS = ['SHIRT', 'PANTS', 'BLAZER', 'FIT'];
let heroWordCurrentIndex = 0;
let heroWordInterval = null;

function initHeroWordRotator() {
  const wordEl = document.getElementById('heroRotatingWord');
  const wrapEl = document.getElementById('heroRotatorWrap');
  if (!wordEl || !wrapEl) return;

  // The first word when entering the site is always SHIRT
  heroWordCurrentIndex = 0;
  wordEl.innerText = HERO_ROTATING_WORDS[0];

  if (heroWordInterval) clearInterval(heroWordInterval);

  // Rotate smoothly every 2.4s
  heroWordInterval = setInterval(() => {
    if (document.hidden) return;
    advanceHeroRotatingWord();
  }, 2400);
}

function advanceHeroRotatingWord() {
  const wordEl = document.getElementById('heroRotatingWord');
  const wrapEl = document.getElementById('heroRotatorWrap');
  if (!wordEl || !wrapEl) return;

  heroWordCurrentIndex = (heroWordCurrentIndex + 1) % HERO_ROTATING_WORDS.length;
  const nextWord = HERO_ROTATING_WORDS[heroWordCurrentIndex];

  // 1. Slide current word up and fade out
  wordEl.classList.remove('slide-in-active', 'slide-down-prepare');
  wordEl.classList.add('slide-up-out');

  setTimeout(() => {
    // 2. Change text while invisible
    wordEl.innerText = nextWord;

    // Position below the viewing boundary without transition
    wordEl.classList.remove('slide-up-out');
    wordEl.classList.add('slide-down-prepare');

    // Force reflow
    void wordEl.offsetWidth;

    // 3. Slide in into place
    wordEl.classList.remove('slide-down-prepare');
    wordEl.classList.add('slide-in-active');
  }, 320);
}
