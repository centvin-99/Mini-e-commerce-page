// cart array
let cart = [];

// page elements
const cartCountEl    = document.getElementById('cart-count');
const cartCountPanel = document.getElementById('cart-count-panel');
const cartTotalEl    = document.getElementById('cart-total');
const cartItemsEl    = document.getElementById('cart-items');
const noResultsEl    = document.getElementById('no-results');
const cartWrapper    = document.getElementById('cartWrapper');
const catDropdown    = document.getElementById('catDropdown');

let activeCategory = 'all';


// render cart
function renderCart() {
    let totalCount = 0;
    let totalPrice = 0;

    cart.forEach(item => {
        totalCount = totalCount + item.qty;
        totalPrice = totalPrice + (item.price * item.qty);
    });

    cartCountEl.textContent    = totalCount;
    cartCountPanel.textContent = totalCount;
    cartTotalEl.textContent    = totalPrice.toLocaleString('en-NG', { minimumFractionDigits: 2 });

    cartItemsEl.innerHTML = '';

    if (cart.length === 0) {
        cartItemsEl.innerHTML = '<li style="opacity:0.5; font-size:13px;">No items yet.</li>';
        return;
    }

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.name} x${item.qty}</span>
            <span>
                &#8358;${(item.price * item.qty).toLocaleString()}
                <button class="remove-btn" data-index="${index}">&#10005;</button>
            </span>
        `;
        cartItemsEl.appendChild(li);
    });

    document.querySelectorAll('.remove-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const index = parseInt(this.dataset.index);
            cart.splice(index, 1);
            renderCart();
        });
    });
}


// add to cart
document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', function() {
        const name  = this.dataset.name;
        const price = parseInt(this.dataset.price);

        let alreadyInCart = null;
        cart.forEach(item => {
            if (item.name === name) {
                alreadyInCart = item;
            }
        });

        if (alreadyInCart) {
            alreadyInCart.qty = alreadyInCart.qty + 1;
        } else {
            cart.push({ name: name, price: price, qty: 1 });
        }

        renderCart();
        showNotification(name);

        // button feedback
        const clickedBtn = this;
        clickedBtn.textContent          = '✔ Added to Cart!';
        clickedBtn.style.backgroundColor = '#27ae60';
        clickedBtn.disabled              = true;

        setTimeout(() => {
            clickedBtn.textContent          = 'Add to Cart';
            clickedBtn.style.backgroundColor = '';
            clickedBtn.disabled              = false;
        }, 1400);
    });
});


// notification banner
function showNotification(productName) {
    const existing = document.getElementById('cart-notification');
    if (existing) {
        existing.remove();
    }

    const banner = document.createElement('div');
    banner.id            = 'cart-notification';
    banner.textContent   = '✔  ' + productName + ' was added to your cart!';

    banner.style.position        = 'fixed';
    banner.style.bottom          = '30px';
    banner.style.left            = '50%';
    banner.style.transform       = 'translateX(-50%)';
    banner.style.backgroundColor = '#27ae60';
    banner.style.color           = '#ffffff';
    banner.style.padding         = '12px 24px';
    banner.style.borderRadius    = '6px';
    banner.style.fontSize        = '14px';
    banner.style.fontWeight      = '600';
    banner.style.boxShadow       = '0 4px 12px rgba(0,0,0,0.15)';
    banner.style.zIndex          = '9999';

    document.body.appendChild(banner);

    setTimeout(() => {
        banner.remove();
    }, 2000);
}


// clear cart
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    renderCart();
});


// cart dropdown toggle
document.getElementById('cartBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    cartWrapper.classList.toggle('open');
    catDropdown.classList.remove('open');
});


// categories dropdown toggle
document.getElementById('catBtn').addEventListener('click', (e) => {
    e.stopPropagation();
    catDropdown.classList.toggle('open');
    cartWrapper.classList.remove('open');
});


// category filter from dropdown
document.querySelectorAll('.categories-menu li').forEach(li => {
    li.addEventListener('click', function() {
        activeCategory = this.dataset.category;

        document.querySelectorAll('.categories-menu li').forEach(item => {
            item.classList.remove('active');
        });
        this.classList.add('active');

        applyFilters();
        catDropdown.classList.remove('open');
    });
});


// close dropdowns on outside click
document.addEventListener('click', () => {
    cartWrapper.classList.remove('open');
    catDropdown.classList.remove('open');
});


// filter products
function applyFilters() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    let visibleCount = 0;

    document.querySelectorAll('.product-card').forEach(card => {
        const cardName     = card.dataset.name.toLowerCase();
        const cardCategory = card.dataset.category;

        const matchesCategory = (activeCategory === 'all' || cardCategory === activeCategory);
        const matchesSearch   = (searchTerm === '' || cardName.includes(searchTerm));

        if (matchesCategory && matchesSearch) {
            card.classList.remove('hidden');
            visibleCount = visibleCount + 1;
        } else {
            card.classList.add('hidden');
        }
    });

    if (visibleCount === 0) {
        noResultsEl.style.display = 'block';
    } else {
        noResultsEl.style.display = 'none';
    }
}

document.getElementById('search-input').addEventListener('input', () => {
    applyFilters();
});


// initial render
renderCart();
