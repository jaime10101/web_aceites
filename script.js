const productsData = [
    {
        id: 1,
        name: "Aceite de Oliva Extra Virgen Clásico",
        tag: "Clásico",
        category: "Clásico",
        price: 12.99, 
        size: "500ml",
        description: "Aceite de oliva extra virgen de primera extracción en frío. Ideal para ensaladas y platos mediterráneos. Sabor equilibrado y suave con notas frutales.",
        certs: ["Certificación Orgánica", "DOP", "Extracción en Frío"],
        image: "./img/cl1.jpg" 
    },
    {
        id: 2,
        name: "Aceite de Oliva Virgen clasico",
        tag: "Clásico",
        category: "Clásico",
        price: 15.99, 
        size: "500ml",
        description: "Aceite de oliva virgen de calidad superior. Perfecto para cocinar y aliñar.",
        certs: ["ISO 9001"],
        image: "./img/cl2.jpg"
    },
    {
        id: 3,
        name: "Aceite de Oliva Gourmet Arbequina",
        tag: "Gourmet",
        category: "Gourmet",
        price: 24.99, 
        size: "500ml",
        description: "Aceite de oliva extra virgen de variedad Arbequina. Sabor dulce y delicado con notas a manzana verde y almendra.",
        certs: ["DOP", "Extracción en Frío"],
        image: "./img/gour1.jpg"
    },
    {
        id: 4,
        name: "Aceite de Oliva Gourmet Picual",
        tag: "Gourmet",
        category: "Gourmet",
        price: 26.99, 
        size: "500ml",
        description: "Aceite de oliva extra virgen de variedad Picual. Sabor intenso y robusto con notas amargas y picantes características.",
        certs: ["Certificación Orgánica", "DOP"],
        image: "./img/gour2.jpg"
    },
    {
        id: 5,
        name: "Aceite de Oliva Renovable Familiar",
        tag: "Renovable",
        category: "Renovable",
        price: 18.50, 
        size: "1L",
        description: "Envase retornable, reduciendo el impacto ambiental. Ideal para el consumo diario.",
        certs: ["Certificación Orgánica"],
        image: "./img/reno1.jpg"
    },
    {
        id: 6,
        name: "Aceite de Oliva Renovable",
        tag: "Renovable",
        category: "Renovable",
        price: 18.50, 
        size: "1L",
        description: "Envase retornable, reduciendo el impacto ambiental. Ideal para el consumo diario.",
        certs: ["Certificación Orgánica"],
        image: "./img/reno2.jpg"
    },
];


let cart = JSON.parse(localStorage.getItem('cart')) || [];



function applyTheme(isDarkMode) {
    const body = document.body;
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    if (isDarkMode) {
        body.classList.add('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '☀️'; 
            themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo claro');
        }
    } else {
        body.classList.remove('dark-mode');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = '🌙'; 
            themeToggleBtn.setAttribute('aria-label', 'Cambiar a modo oscuro');
        }
    }
}

function loadInitialTheme() {
   
    const savedTheme = localStorage.getItem('theme');
    
    
    if (savedTheme === 'dark') {
        applyTheme(true);
    } else if (savedTheme === 'light') {
        applyTheme(false);
    } 
    
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        applyTheme(true);
    } else {
        applyTheme(false); 
    }
}

function toggleTheme() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const newMode = !isDarkMode;

    applyTheme(newMode);
    
   
    localStorage.setItem('theme', newMode ? 'dark' : 'light');
}


function scrollFunction() {
    const scrollTopBtn = document.getElementById("scrollTopBtn");
    if (!scrollTopBtn) return;

   
    if (document.body.scrollTop > 400 || document.documentElement.scrollTop > 400) {
        scrollTopBtn.style.display = "block";
    } else {
        scrollTopBtn.style.display = "none";
    }
}


function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}




function flyToCartAnimation(elementToAnimate) {
    const cartButton = document.getElementById('cart-icon-btn');
    if (!cartButton || !elementToAnimate) return;

    const startRect = elementToAnimate.getBoundingClientRect();
    const endRect = cartButton.getBoundingClientRect();

    const flyingDiv = document.createElement('div');
    flyingDiv.classList.add('flying-product');
    
    flyingDiv.style.left = `${startRect.left + startRect.width / 2 - 15}px`; 
    flyingDiv.style.top = `${startRect.top + startRect.height / 2 - 15}px`;
    
    document.body.appendChild(flyingDiv);

    void flyingDiv.offsetWidth; 

    flyingDiv.style.left = `${endRect.left + endRect.width / 2 - 5}px`;
    flyingDiv.style.top = `${endRect.top + endRect.height / 2 - 5}px`;
    flyingDiv.style.width = '10px'; 
    flyingDiv.style.height = '10px';
    flyingDiv.style.opacity = '0.5';

    setTimeout(() => {
        flyingDiv.remove();
        cartButton.style.transform = 'scale(1.2)';
        setTimeout(() => {
            cartButton.style.transform = 'scale(1)';
        }, 150);
    }, 700); 
}




function updateCartBadge() {
    const badge = document.getElementById('cart-count-badge');
    if (!badge) return;
    
    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.qty;
    });
    
    badge.textContent = totalItems;
    
    if (totalItems > 0) {
        badge.classList.add('visible');
    } else {
        badge.classList.remove('visible');
    }
}



function addItemToCart(productId, qty, productName = 'Producto', buttonElement = null) {
    const existingItem = cart.find(item => item.productId === productId);
    
    if (existingItem) {
        existingItem.qty += qty;
    } else {
        cart.push({ productId, qty });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartSidebar();
    
    showToast(`✅ ${qty}x ${productName} añadido al carrito.`);
    updateCartBadge(); 
    
    if (buttonElement) {
        flyToCartAnimation(buttonElement);
    }
}



function removeItemFromCart(productId) {
    cart = cart.filter(item => item.productId !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCartSidebar();
    updateCartBadge(); 
}



function calculateCartTotal() {
    let total = 0;
    cart.forEach(item => {
        const product = productsData.find(p => p.id === item.productId);
        if (product) {
            total += product.price * item.qty;
        }
    });
    return total;
}



function renderCartSidebar() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (!cartSidebar) return; 
    
    const cartItemsContainer = document.getElementById('cart-items');
    const cartSummary = document.querySelector('.cart-summary');
    
    let cartItemsHtml = `
        <p>${cart.length} producto${cart.length !== 1 ? 's' : ''}</p>
    `;
    
    if (cart.length === 0) {
      
        const bgColor = document.body.classList.contains('dark-mode') ? '#212121' : 'white';
        const color = document.body.classList.contains('dark-mode') ? '#E0E0E0' : '#333';

        cartItemsHtml += `<p style="color: ${color}; background: ${bgColor}; padding: 10px; border-radius: 5px;">El carrito está vacío.</p>`;
    } else {
        cart.forEach(item => {
            const product = productsData.find(p => p.id === item.productId);
            if (product) {
                const itemTotal = (product.price * item.qty).toFixed(2);
                cartItemsHtml += `
                    <div class="cart-item" data-id="${product.id}">
                        <img src="${product.image}" alt="${product.name}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px;">
                        <div style="flex-grow: 1;">
                            <h4>${product.name}</h4>
                            <p>€${itemTotal}</p>
                            <div class="qty-control">
                                <button class="cart-qty-btn minus" data-id="${product.id}">-</button>
                                <span>${item.qty}</span>
                                <button class="cart-qty-btn plus" data-id="${product.id}">+</button>
                            </div>
                        </div>
                        <button class="delete-item" data-id="${product.id}">🗑️</button>
                    </div>
                `;
            }
        });
    }
    
    cartItemsContainer.innerHTML = cartItemsHtml;
    
    const total = calculateCartTotal().toFixed(2);
    const subtotalElement = cartSummary.querySelector('p:first-child span');
    const totalElement = cartSummary.querySelector('.total span');
    
    
    if (subtotalElement) subtotalElement.textContent = `€${total}`; 
    if (totalElement) totalElement.textContent = `€${total}`;
    
    const checkoutButton = document.querySelector('.btn-checkout');
    if (checkoutButton) checkoutButton.disabled = cart.length === 0;


    updateCartBadge(); 
}



function showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(function(){ toast.classList.remove("show"); }, 3000);
}



function processPayment() {
    const processingOverlay = document.getElementById('payment-processing-overlay');
    const successOverlay = document.getElementById('payment-success-overlay');
    
    const form = document.querySelector('.payment-form');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }


    processingOverlay.style.display = 'flex';
    
    setTimeout(() => {
        processingOverlay.style.display = 'none';
        successOverlay.style.display = 'flex';
        
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartSidebar();
        updateCartBadge(); 
        
        setTimeout(() => {
            successOverlay.style.display = 'none';
            document.getElementById('payment-modal').style.display = 'none';
            
            form.reset();
            updateCardDisplay(); 
        }, 3000);
        
    }, 2000);
}


function updatePaymentSummary() {
    const orderSummaryContainer = document.querySelector('.order-summary');
    if (!orderSummaryContainer) return;
    
    let summaryHTML = '<p>Resumen del Pedido</p>';
    const total = calculateCartTotal().toFixed(2);
    
    cart.forEach(item => {
        const product = productsData.find(p => p.id === item.productId);
        if (product) {
            const itemTotal = (product.price * item.qty).toFixed(2);
            summaryHTML += `
                <div class="summary-line">
                    <span>${product.name} x${item.qty}</span>
                    <span>€${itemTotal}</span>
                </div>
            `;
        }
    });
    
    summaryHTML += `
        <div class="summary-line">
            <span>Total:</span>
            <span class="total-amount">€${total}</span>
        </div>
    `;
    
    orderSummaryContainer.innerHTML = summaryHTML;
    
    const payButton = document.querySelector('.btn-pay');
    if (payButton) {
      
        payButton.textContent = `Pagar €${total}`;
    }
}



function updateCardDisplay(number = '', name = '', expiry = '') {
    const displayNumber = document.getElementById('card-display-number');
    const displayHolder = document.getElementById('card-display-holder');
    const displayExpiry = document.getElementById('card-display-expiry');


    if (displayNumber) {
        let formattedNumber = number.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
        displayNumber.textContent = formattedNumber || '•••• •••• •••• ••••';
    }
    if (displayHolder) {
        displayHolder.textContent = name.toUpperCase() || 'NOMBRE APELLIDO';
    }
    if (displayExpiry) {
        let formattedExpiry = expiry.replace(/\D/g, '').slice(0, 4);
        if (formattedExpiry.length > 2) {
             formattedExpiry = formattedExpiry.slice(0, 2) + '/' + formattedExpiry.slice(2);
        }
        displayExpiry.textContent = formattedExpiry || 'MM/AA';
    }
}


function setupCardInputListeners() {
    const cardNumberInput = document.getElementById('card-number');
    const cardHolderInput = document.getElementById('card-holder-name');
    const cardExpiryInput = document.getElementById('card-expiry');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue.slice(0, 19); 
            updateCardDisplay(e.target.value, cardHolderInput?.value || '', cardExpiryInput?.value || '');
        });
    }
    
    if (cardHolderInput) {
        cardHolderInput.addEventListener('input', (e) => {
            updateCardDisplay(cardNumberInput?.value || '', e.target.value, cardExpiryInput?.value || '');
        });
    }
    
    if (cardExpiryInput) {
        cardExpiryInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            e.target.value = value.slice(0, 5); 
            updateCardDisplay(cardNumberInput?.value || '', cardHolderInput?.value || '', e.target.value);
        });
    }
    updateCardDisplay();
}



function renderProductModal(product) {
    const productModal = document.getElementById('product-modal');
    if (!productModal) return;
    const modalContent = productModal.querySelector('.modal-content');


    const certsHtml = product.certs.map(cert => `<span class="cert-tag">${cert}</span>`).join('');
    const itemInCart = cart.find(item => item.productId === product.id);
    const initialQty = itemInCart ? itemInCart.qty : 1;
    const initialTotal = (initialQty * product.price).toFixed(2);
    
    modalContent.innerHTML = `
        <span class="close-btn">×</span>
        <div class="modal-body">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.name}" id="product-modal-image">
                <span class="tag tag-${product.category.toLowerCase()}">${product.tag}</span>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                
                <h4>📜 Certificaciones</h4>
                <div class="certificaciones">${certsHtml}</div>
                
                <div class="price-display">
                    €${product.price.toFixed(2)}
                    <span class="price-detail">Precio por botella de ${product.size}</span>
                </div>


                <div class="quantity-control" data-id="${product.id}">
                    <span>Cantidad</span>
                    <button class="qty-btn minus" data-id="${product.id}">-</button>
                    <input type="number" value="${initialQty}" min="1" class="qty-input" id="qty-modal-${product.id}">
                    <button class="qty-btn plus" data-id="${product.id}">+</button>
                </div>


                <button class="btn-add-to-cart" data-id="${product.id}">
                    Añadir al Carrito – €${initialTotal}
                </button>
            </div>
        </div>
    `;


    const qtyInput = document.getElementById(`qty-modal-${product.id}`);
    const addToCartBtn = modalContent.querySelector('.btn-add-to-cart');


    addToCartBtn.addEventListener('click', (e) => {
        const productId = parseInt(e.currentTarget.dataset.id);
        const qty = parseInt(qtyInput.value);
        const product = productsData.find(p => p.id === productId);
        
        addItemToCart(productId, qty, product.name, e.currentTarget); 
        productModal.style.display = 'none';
    });


    modalContent.querySelectorAll('.qty-btn').forEach(button => {
        button.addEventListener('click', () => {
            let qty = parseInt(qtyInput.value);
            const addToCartBtn = modalContent.querySelector('.btn-add-to-cart');


            if (button.classList.contains('plus')) {
                qty++;
            } else if (button.classList.contains('minus') && qty > 1) {
                qty--;
            }
            
            qtyInput.value = qty;
            const newTotal = (qty * product.price).toFixed(2);
            
            addToCartBtn.textContent = `Añadir al Carrito – €${newTotal}`;
        });
    });


    qtyInput.addEventListener('input', (e) => {
        let qty = parseInt(e.target.value) || 1;
        qty = Math.max(1, qty);
        e.target.value = qty;
        const newTotal = (qty * product.price).toFixed(2);


        modalContent.querySelector('.btn-add-to-cart').textContent = `Añadir al Carrito – €${newTotal}`;
    });
}



function renderProducts(products) {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return;
    
    let html = '';
    if (products.length === 0) {
        productGrid.innerHTML = '<p>No se encontraron productos que coincidan con los criterios.</p>';
        return;
    }


    products.forEach(product => {
        html += `
            <div class="product-card" data-product-id="${product.id}" data-category="${product.category}">
                <img src="${product.image}" alt="${product.name}">
                <span class="tag tag-${product.category.toLowerCase()}">${product.tag}</span>
                <div class="card-content">
                    <h4>${product.name}</h4>
                    <p class="product-desc">${product.description.substring(0, 70)}...</p>
                    <span class="price">€${product.price.toFixed(2)}</span>
                    <button class="btn btn-details">Ver Detalles</button>
                </div>
            </div>
        `;
    });
    
    productGrid.innerHTML = html;
}


function applyFilters() {
    const searchInput = document.getElementById('searchInput');
    const activeFilterButton = document.querySelector('.filter-btn.active');
    
    if (!activeFilterButton) return;


    const activeFilter = activeFilterButton.dataset.filter;
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
    
    const filteredProducts = productsData.filter(product => {
        const categoryMatch = (activeFilter === 'todos' || product.category === activeFilter);
        const searchMatch = product.name.toLowerCase().includes(searchTerm) || 
                             product.description.toLowerCase().includes(searchTerm);
                             
        return categoryMatch && searchMatch;
    });


    renderProducts(filteredProducts);
}


function initializeProductPage() {
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) return; 
    
    const filterButtons = document.querySelectorAll('.filter-btn');
    const searchInput = document.getElementById('searchInput');
    const productModal = document.getElementById('product-modal'); 
    
    renderProducts(productsData);


    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            applyFilters();
        });
    });


    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }


    productGrid.addEventListener('click', (e) => {
        const btnDetails = e.target.closest('.btn-details');
        if (btnDetails) {
            const card = btnDetails.closest('.product-card');
            const productId = parseInt(card.dataset.productId);
            const product = productsData.find(p => p.id === productId);


            if (product && productModal) {
                renderProductModal(product);
                productModal.style.display = 'block';
            }
        }
    });
}



function initializeReviewsCarousel() {
    const container = document.querySelector('.reviews-carousel-container');
    const inner = document.getElementById('reviewsCarouselInner');
    
    if (!container || !inner) return; 


    const items = inner.querySelectorAll('.carousel-item-review');
    const totalItems = items.length;
    let currentIndex = 0;
    
    if (totalItems <= 1) {
        const prevBtn = document.querySelector('.prev-review');
        const nextBtn = document.querySelector('.next-review');
        if (prevBtn) prevBtn.style.display = 'none';
        if (nextBtn) nextBtn.style.display = 'none';
        return;
    }


    function updateReviewsCarousel() {
        const offset = -currentIndex * 100; 
        inner.style.transform = `translateX(${offset}%)`;
    }
    
    const prevButton = container.querySelector('.prev-review');
    const nextButton = container.querySelector('.next-review');


    if (prevButton && nextButton) {
        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalItems;
            updateReviewsCarousel();
        });
        
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalItems) % totalItems;
            updateReviewsCarousel();
        });
    }
    updateReviewsCarousel(); 
}




document.addEventListener('DOMContentLoaded', () => {
    
    
    loadInitialTheme(); 

    const cartIcon = document.getElementById('cart-icon-btn'); 
    const cartSidebar = document.getElementById('cart-sidebar');
    const checkoutButton = document.querySelector('.btn-checkout');
    const paymentModal = document.getElementById('payment-modal');
    const productModal = document.getElementById('product-modal'); 
    const themeToggleButton = document.getElementById('theme-toggle-btn'); 
    const scrollTopBtn = document.getElementById('scrollTopBtn'); 

 
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', toggleTheme);
    }
    
   
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', topFunction);
    }
    
   
    window.onscroll = function() { scrollFunction() };
    
    
    initializeReviewsCarousel(); 
    initializeProductPage();
    
    if (paymentModal) {
        setupCardInputListeners();
    }


    updateCartBadge();
    
 
    
    document.body.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-btn')) {
            const modal = e.target.closest('.modal');
            if (modal) modal.style.display = 'none';
        }
        if (e.target.classList.contains('close-cart-btn') && cartSidebar) {
             cartSidebar.style.right = '-400px'; 
        }
        if (e.target === paymentModal) {
            paymentModal.style.display = 'none';
        }
        if (productModal && e.target === productModal) {
             productModal.style.display = 'none';
        }
    });


    
    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', (e) => {
            e.preventDefault();
            renderCartSidebar();
            cartSidebar.style.right = '0'; 
        });
    }



    if (checkoutButton && paymentModal && cartSidebar) {
        checkoutButton.addEventListener('click', () => {
            cartSidebar.style.right = '-400px'; 
            updatePaymentSummary();
            paymentModal.style.display = 'block';
        });
    }


    
    const paymentForm = document.querySelector('.payment-form');
    if (paymentForm) {
        paymentForm.addEventListener('submit', (e) => {
            e.preventDefault();
            processPayment();
        });
    }


    
    if (cartSidebar) {
        cartSidebar.addEventListener('click', (e) => {
            const target = e.target;
            const itemElement = target.closest('[data-id]');
            if (!itemElement) return;


            const productId = parseInt(itemElement.dataset.id);
            const product = productsData.find(p => p.id === productId);


            if (target.classList.contains('delete-item')) {
                removeItemFromCart(productId);
                showToast(`🗑️ ${product.name} eliminado del carrito.`);
            } 
            else if (target.classList.contains('cart-qty-btn')) {
                const item = cart.find(i => i.productId === productId);
                if (item) {
                    if (target.classList.contains('plus')) {
                        item.qty++;
                        showToast(`➕ Añadida una unidad más de ${product.name}.`);
                    } else if (target.classList.contains('minus') && item.qty > 1) {
                        item.qty--;
                        showToast(`➖ Eliminada una unidad de ${product.name}.`);
                    } else if (target.classList.contains('minus') && item.qty === 1) {
                        removeItemFromCart(productId);
                        showToast(`🗑️ ${product.name} eliminado del carrito.`);
                        return; 
                    }
                    localStorage.setItem('cart', JSON.stringify(cart));
                    renderCartSidebar();
                }
            }
        });
    }


    renderCartSidebar();
});