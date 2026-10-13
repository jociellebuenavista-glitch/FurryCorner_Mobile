// @ts-nocheck  (legacy script below is plain JavaScript carried over from index.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './index.markup';

@Component({
  selector: 'app-index',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class IndexPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of index.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {


/* =====================================================
   NAVBAR
===================================================== */

const navbar =
    document.getElementById('navbar');

window.addEventListener('scroll', () => {

    navbar.classList.toggle(
        'scrolled',
        window.scrollY > 10
    );

});
async function loadProductsFromDatabase(){

    try{

        console.log("Loading products from API...");

        const response =
            await fetch(
                window.FURRY_API + "/getProducts.php"
            );

        console.log(
            "API response status:",
            response.status
        );

        if(!response.ok){

            throw new Error(
                "Server returned " +
                response.status
            );

        }

        const data =
            await response.json();

        console.log(
            "API response:",
            data
        );

        if(!data.success){

            throw new Error(
                data.message ||
                "Unable to load products."
            );

        }

        if(
            !Array.isArray(data.products)
        ){

            throw new Error(
                "API did not return a products array."
            );

        }

        products =
            data.products.map(product => ({

                id:
                    Number(
                        product.product_id
                    ),

                name:
                    String(
                        product.product_name || ''
                    ),

                description:
                    String(
                        product.description || ''
                    ),

                category:
                    String(
                        product.category || ''
                    ),

                subcategory:
                    String(
                        product.subcategory || ''
                    ),

                price:
                    Number(
                        product.price
                    ) || 0,

                originalPrice:
                    Number(
                        product.original_price
                    ) || 0,

                highlights:
                    String(
                        product.highlights || ''
                    ),

                stock:
                    Number(
                        product.stock
                    ) || 0,

                image:
                    product.image || ''

            }));


        console.log(
            "Products loaded:",
            products.length
        );


        /*
         * Apply the current search,
         * filters and sorting AFTER
         * the database products exist.
         */

        applyFiltersAndSort();


    }
    catch(error){

        console.error(
            "Product loading error:",
            error
        );

        if(grid){

            grid.innerHTML = `

                <div class="no-results">

                    Unable to load products.

                    <br><br>

                    <small>
                        ${window.furryApiError(error)}
                    </small>

                    <br><br>

                    <button type="button" class="retry-button" id="retryProducts">Try again</button>

                </div>

            `;

        }

        if(countEl){

            countEl.textContent =
                'Unable to load products';

        }

        document.getElementById('retryProducts')?.addEventListener('click', () => {
            if (grid) grid.innerHTML = '<div class="no-results">Loading products...</div>';
            loadProductsFromDatabase();
        });

    }

}

/* =====================================================
   VARIABLES
===================================================== */

const PER_PAGE = 15;

let currentPage = 1;

let products = [];

let filteredProducts = [];

let searchQuery = '';

let selectedCategories = new Set();

let selectedSubcategories = new Set();

let selectedPriceRanges = [];

let sortValue = 'Alphabetically, A-Z';


const grid =
    document.getElementById('productGrid');

const countEl =
    document.getElementById('productCount');

const paginationEl =
    document.getElementById('pagination');

const searchInput =
    document.getElementById('searchInput');

const productModal =
    document.getElementById('productModal');

const productModalImage =
    document.getElementById('productModalImage');

const productModalCategory =
    document.getElementById('productModalCategory');

const productModalName =
    document.getElementById('productModalName');

const productModalPrice =
    document.getElementById('productModalPrice');

const productModalDescription =
    document.getElementById('productModalDescription');

const productModalSale =
    document.getElementById('productModalSale');

const productModalStockBadge =
    document.getElementById('productModalStockBadge');

const productModalStock =
    document.getElementById('productModalStock');

const productModalOriginalPrice =
    document.getElementById('productModalOriginalPrice');

const productModalSavings =
    document.getElementById('productModalSavings');

const productModalHighlights =
    document.getElementById('productModalHighlights');

const productModalHighlightList =
    document.getElementById('productModalHighlightList');

const productModalAdd =
    document.getElementById('productModalAdd');

const productModalBuy =
    document.getElementById('productModalBuy');

const productModalMinus =
    document.getElementById('productModalMinus');

const productModalPlus =
    document.getElementById('productModalPlus');

const productModalQuantity =
    document.getElementById('productModalQuantity');

const closeProductModalButton =
    document.getElementById('closeProductModal');

let selectedProductId = null;
let selectedProductQuantity = 1;

function updateProductModalQuantity(){
    const product = products.find(item => item.id === selectedProductId);
    const stock = Number(product?.stock) || 0;

    selectedProductQuantity = stock > 0
        ? Math.min(stock, Math.max(1, selectedProductQuantity))
        : 0;
    productModalQuantity.textContent = selectedProductQuantity;
    productModalMinus.disabled = stock <= 0 || selectedProductQuantity <= 1;
    productModalPlus.disabled = stock <= 0 || selectedProductQuantity >= stock;
    productModalAdd.disabled = stock <= 0;
    productModalBuy.disabled = stock <= 0;
}

function openProductModal(productId){

    const product =
        products.find(item => item.id === productId);

    if(!product)
        return;

    selectedProductId = product.id;
    selectedProductQuantity = Number(product.stock) > 0 ? 1 : 0;
    updateProductModalQuantity();
    productModalImage.src = `images/product-${product.id}.png`;
    productModalImage.alt = product.name;
    productModalCategory.textContent = [product.category, product.subcategory].filter(Boolean).join(' / ');
    productModalName.textContent = product.name;
    productModalPrice.textContent = peso(product.price);
    productModalDescription.textContent = product.description || 'Product details have not been added yet.';

    const inStock = Number(product.stock) > 0;
    productModalStockBadge.textContent = inStock ? 'In Stock' : 'Out of Stock';
    productModalStockBadge.classList.toggle('in-stock', inStock);
    productModalStockBadge.classList.toggle('out-of-stock', !inStock);
    productModalStock.textContent = inStock
        ? `${product.stock} ${Number(product.stock) === 1 ? 'piece' : 'pieces'} left in stock`
        : 'Currently unavailable';

    const originalPrice = Number(product.originalPrice) || 0;
    const onSale = originalPrice > Number(product.price);
    productModalSale.hidden = !onSale;
    productModalOriginalPrice.hidden = !onSale;
    productModalSavings.hidden = !onSale;
    if(onSale){
        productModalOriginalPrice.textContent = peso(originalPrice);
        productModalSavings.textContent = `Save ${Math.round((originalPrice - product.price) / originalPrice * 100)}%`;
    }

    const highlights = String(product.highlights || '')
        .split(/\r?\n|\|/)
        .map(item => item.trim())
        .filter(Boolean);
    productModalHighlightList.replaceChildren();
    highlights.forEach(highlight => {
        const listItem = document.createElement('li');
        listItem.textContent = highlight;
        productModalHighlightList.append(listItem);
    });
    productModalHighlights.hidden = highlights.length === 0;

    productModalAdd.dataset.productId = product.id;
    productModalBuy.dataset.productId = product.id;
    productModal.classList.add('open');
    document.body.style.overflow = 'hidden';

}

function closeProductModal(){

    productModal.classList.remove('open');
    document.body.style.overflow = '';
    selectedProductId = null;

}

window.openProductModal = openProductModal;


/* =====================================================
   URL SEARCH
===================================================== */

const params =
    new URLSearchParams(
        location.search
    );

const keyword =
    params.get('search');

if(keyword){

    searchQuery =
        keyword.toLowerCase();

    searchInput.value =
        keyword;

}


/* =====================================================
   PESO FORMAT
===================================================== */

function peso(number){

    return '₱' +
        Number(number).toLocaleString(
            'en-PH',
            {
                minimumFractionDigits:2,
                maximumFractionDigits:2
            }
        );

}

function applyFiltersAndSort(){

    let result =
        products.filter(product => {

            /* =================================================
               SEARCH
            ================================================= */

            const matchesSearch =
                !searchQuery ||

                product.name
                    .toLowerCase()
                    .includes(searchQuery) ||

                product.category
                    .toLowerCase()
                    .includes(searchQuery) ||

                product.subcategory
                    .toLowerCase()
                    .includes(searchQuery);


            /* =================================================
               CATEGORY / SUBCATEGORY
            ================================================= */

            let matchesType = true;


            /*
             * If nothing is selected,
             * allow every product.
             */

            if(
                selectedCategories.size === 0 &&
                selectedSubcategories.size === 0
            ){

                matchesType = true;

            }else{

                const categoryMatch =
                    selectedCategories.size > 0 &&
                    selectedCategories.has(
                        product.category
                    );

                const subcategoryMatch =
                    selectedSubcategories.size > 0 &&
                    selectedSubcategories.has(
                        product.subcategory
                    );


                /*
                 * Category and subcategory selections
                 * work together as OR.
                 *
                 * Example:
                 * Food
                 * OR
                 * Treats
                 */

                matchesType =
                    categoryMatch ||
                    subcategoryMatch;

            }


            /* =================================================
               PRICE
            ================================================= */

            const matchesPrice =
                selectedPriceRanges.length === 0 ||

                selectedPriceRanges.some(
                    range =>

                        product.price >= range.min &&

                        product.price <= range.max
                );


            return (
                matchesSearch &&
                matchesType &&
                matchesPrice
            );

        });


    /* =================================================
       SORT
    ================================================= */

    switch(sortValue){

        case 'Alphabetically, Z-A':

            result.sort(
                (a,b) =>
                    b.name.localeCompare(a.name)
            );

            break;


        case 'Price: Low to high':

            result.sort(
                (a,b) =>
                    a.price - b.price
            );

            break;


        case 'Price: High to Low':

            result.sort(
                (a,b) =>
                    b.price - a.price
            );

            break;


        default:

            result.sort(
                (a,b) =>
                    a.name.localeCompare(b.name)
            );

    }


    filteredProducts = result;

    currentPage = 1;

    renderProducts();

    renderPagination();

}

/* =====================================================
   RENDER PRODUCTS
===================================================== */

function escapeHtml(value){

    const entities = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    };

    return String(value).replace(/[&<>"']/g, character => entities[character]);

}

function renderProducts(){

    const start =
        (currentPage - 1) * PER_PAGE;


    const pageItems =
        filteredProducts.slice(
            start,
            start + PER_PAGE
        );


    if(pageItems.length === 0){

        grid.innerHTML = `

            <div class="no-results">

                No products found.

            </div>

        `;


        countEl.textContent =
            '0 products';

        return;

    }


    grid.innerHTML =

        pageItems.map(product => {

            return `

                <div class="card">

                    <button
                        class="card-thumb"
                        type="button"
                        onclick="openProductModal(${product.id})"
                        aria-label="View ${product.name}">

                       <img
                            src="images/product-${product.id}.png"
                            alt="${product.name}"
                            loading="lazy">

                    </button>


                    <div class="card-body">

                        <button
                            class="card-name"
                            type="button"
                            onclick="openProductModal(${product.id})">

                            ${product.name}

                        </button>


                        <p class="card-description">

                            ${escapeHtml(product.description || '')}

                        </p>


                        <div class="card-price">

                            ${peso(product.price)}

                        </div>


                        <button
                            class="card-btn"
                            data-auth-required
                            data-auth-return="index.html"
                            type="button"
                            onclick="addToCart(${product.id})">

                            Add to Cart

                        </button>

                    </div>

                </div>

            `;

        }).join('');


    const end =
        Math.min(
            start + PER_PAGE,
            filteredProducts.length
        );


    countEl.textContent =
        `${start + 1}-${end} of ${filteredProducts.length} products`;

}


/* =====================================================
   PAGINATION
===================================================== */

function totalPages(){

    return Math.ceil(
        filteredProducts.length /
        PER_PAGE
    );

}


function renderPagination(){

    const pages =
        totalPages();


    if(
        filteredProducts.length === 0 ||
        pages <= 1
    ){

        paginationEl.innerHTML = '';

        return;

    }


    let html = `

        <button
            id="prevBtn"
            aria-label="Previous"
            ${currentPage === 1 ? 'disabled' : ''}>

            ‹

        </button>

    `;


    for(
        let page = 1;
        page <= pages;
        page++
    ){

        html += `

            <button
                class="${page === currentPage ? 'active' : ''}"
                data-page="${page}">

                ${page}

            </button>

        `;

    }


    html += `

        <button
            id="nextBtn"
            aria-label="Next"
            ${currentPage === pages ? 'disabled' : ''}>

            ›

        </button>

    `;


    paginationEl.innerHTML =
        html;

}


function goToPage(page){

    currentPage =
        Math.min(
            Math.max(page,1),
            totalPages()
        );


    renderProducts();

    renderPagination();


    const toolbar =
        document.querySelector('.toolbar');


    if(toolbar){

        window.scrollTo({

            top:
                toolbar.offsetTop - 80,

            behavior:'smooth'

        });

    }

}


paginationEl.addEventListener(
    'click',
    event => {

        const button =
            event.target.closest('button');


        if(!button || button.disabled)
            return;


        if(button.id === 'prevBtn'){

            if(currentPage > 1){

                goToPage(
                    currentPage - 1
                );

            }

            return;

        }


        if(button.id === 'nextBtn'){

            if(
                currentPage <
                totalPages()
            ){

                goToPage(
                    currentPage + 1
                );

            }

            return;

        }


        if(button.dataset.page){

            goToPage(
                Number(button.dataset.page)
            );

        }

    }
);


/* =====================================================
   SEARCH
===================================================== */

searchInput.addEventListener(
    'input',
    event => {

        searchQuery =
            event.target.value
                .trim()
                .toLowerCase();

        applyFiltersAndSort();

    }
);


/* =====================================================
   SORT
===================================================== */

const sortButton =
    document.getElementById('sortSelect');

const sortModal =
    document.getElementById('sortModal');

const closeSortModalButton =
    document.getElementById('closeSortModal');

const sortOptions = [
    'Alphabetically, A-Z',
    'Alphabetically, Z-A',
    'Price: Low to high',
    'Price: High to Low'
];

sortButton.addEventListener(
    'click',
    () => {

        document
            .querySelectorAll('input[name="sortOption"]')
            .forEach(option => {
                option.checked = option.value === sortValue;
            });

        sortModal.classList.add('open');

    }
);

document
    .querySelectorAll('input[name="sortOption"]')
    .forEach(option => {
        option.addEventListener('change', event => {
            sortValue = event.target.value;
            sortModal.classList.remove('open');
            applyFiltersAndSort();
        });
    });

closeSortModalButton.addEventListener(
    'click',
    () => sortModal.classList.remove('open')
);

sortModal.addEventListener(
    'click',
    event => {
        if(event.target === sortModal){
            sortModal.classList.remove('open');
        }
    }
);

productModalAdd.addEventListener(
    'click',
    () => {
        if(selectedProductId === null)
            return;

        addToCart(selectedProductId, selectedProductQuantity);
        closeProductModal();
    }
);

productModalBuy.addEventListener(
    'click',
    () => {
        if(selectedProductId === null)
            return;

        const product =
            products.find(item => item.id === selectedProductId);

        if(!product)
            return;

        localStorage.setItem(
            'checkoutItems',
            JSON.stringify([
                {
                    id:product.id,
                    name:product.name,
                    price:product.price,
                    quantity:selectedProductQuantity
                }
            ])
        );

        location.href = 'checkout.html';
    }
);

productModalMinus.addEventListener(
    'click',
    () => {
        selectedProductQuantity -= 1;
        updateProductModalQuantity();
    }
);

productModalPlus.addEventListener(
    'click',
    () => {
        selectedProductQuantity += 1;
        updateProductModalQuantity();
    }
);

closeProductModalButton.addEventListener(
    'click',
    closeProductModal
);

productModal.addEventListener(
    'click',
    event => {
        if(event.target === productModal){
            closeProductModal();
        }
    }
);


/* =====================================================
   FILTER CHANGE
===================================================== */

function handleFilterChange(event){

    const checkbox =
        event.target.closest(
            'input[type="checkbox"][data-filter]'
        );


    if(!checkbox)
        return;


    const type =
        checkbox.dataset.filter;


    const value =
        checkbox.dataset.value;


    /* CATEGORY */

    if(type === 'category'){

        if(checkbox.checked){

            selectedCategories.add(value);

        }else{

            selectedCategories.delete(value);

        }

    }


    /* SUBCATEGORY */

    if(type === 'subcategory'){

        if(checkbox.checked){

            selectedSubcategories.add(value);

        }else{

            selectedSubcategories.delete(value);

        }

    }


    /* PRICE */

    if(type === 'price'){

        const range = {

            min:
                Number(
                    checkbox.dataset.min
                ),

            max:
                Number(
                    checkbox.dataset.max
                )

        };


        if(checkbox.checked){

            const alreadyExists =
                selectedPriceRanges.some(
                    item =>

                        item.min === range.min &&
                        item.max === range.max
                );


            if(!alreadyExists){

                selectedPriceRanges.push(
                    range
                );

            }

        }else{

            selectedPriceRanges =
                selectedPriceRanges.filter(
                    item =>

                        !(
                            item.min === range.min &&
                            item.max === range.max
                        )

                );

        }

    }


    syncFilterCheckboxes();

    applyFiltersAndSort();

}


/* CATEGORY BUTTON EVENTS */

document
    .getElementById('categoryList')
    .addEventListener(
        'click',
        event => {

            const button =
                event.target.closest('.category-option');


            if(!button)
                return;


            const category =
                button.dataset.category;


            if(category === 'All'){

                selectedCategories.clear();
                selectedSubcategories.clear();
                selectedPriceRanges = [];

            }else if(selectedCategories.has(category)){

                selectedCategories.clear();

            }else{

                selectedCategories = new Set([category]);

                /*
                * Selecting a parent category
                * clears previously selected subcategories.
                */

                selectedSubcategories.clear();

            }

            syncFilterCheckboxes();

            document
                .querySelectorAll('.category-option')
                .forEach(option => {
                    option.classList.toggle(
                        'active',
                        option.dataset.category === 'All'
                            ? selectedCategories.size === 0
                            : selectedCategories.has(option.dataset.category)
                    );
                });


            applyFiltersAndSort();

        }
    );


/* DESKTOP FILTER EVENTS */

document
    .getElementById('desktopTypeFilter')
    .addEventListener(
        'change',
        handleFilterChange
    );


document
    .getElementById('desktopPriceFilter')
    .addEventListener(
        'change',
        handleFilterChange
    );


/* MOBILE FILTER EVENTS */

document
    .querySelector('.mobile-filter-content')
    .addEventListener(
        'change',
        handleFilterChange
    );


/* =====================================================
   SYNC FILTERS
===================================================== */

function syncFilterCheckboxes(){

    document
        .querySelectorAll(
            'input[type="checkbox"][data-filter]'
        )
        .forEach(checkbox => {

            const type =
                checkbox.dataset.filter;


            const value =
                checkbox.dataset.value;


            if(type === 'category'){

                checkbox.checked =
                    selectedCategories.has(
                        value
                    );

            }


            if(type === 'subcategory'){

                checkbox.checked =
                    selectedSubcategories.has(
                        value
                    );

            }


            if(type === 'price'){

                const min =
                    Number(
                        checkbox.dataset.min
                    );


                const max =
                    Number(
                        checkbox.dataset.max
                    );


                checkbox.checked =
                    selectedPriceRanges.some(
                        range =>

                            range.min === min &&
                            range.max === max

                    );

            }

        });

}


/* =====================================================
   CLEAR FILTERS
===================================================== */

function clearFilters(){

    selectedCategories.clear();

    selectedSubcategories.clear();

    selectedPriceRanges = [];

    syncFilterCheckboxes();

    document
        .querySelectorAll('.category-option')
        .forEach(option => {
            option.classList.toggle(
                'active',
                option.dataset.category === 'All'
            );
        });

    applyFiltersAndSort();

}


document
    .getElementById('clearDesktopFilters')
    .addEventListener(
        'click',
        clearFilters
    );


document
    .getElementById('clearMobileFilters')
    .addEventListener(
        'click',
        clearFilters
    );


/* =====================================================
   MOBILE FILTER PANEL
===================================================== */

const mobileFilterPanel =
    document.getElementById(
        'mobileFilterPanel'
    );


const mobileFilterOverlay =
    document.getElementById(
        'mobileFilterOverlay'
    );


function openFilterPanel(){

    syncFilterCheckboxes();

    mobileFilterPanel.classList.add(
        'open'
    );

    mobileFilterOverlay.classList.add(
        'open'
    );

}


function closeFilterPanel(){

    mobileFilterPanel.classList.remove(
        'open'
    );

    mobileFilterOverlay.classList.remove(
        'open'
    );

}


document
    .getElementById('openCategoryFilter')
    .addEventListener(
        'click',
        openFilterPanel
    );


document
    .getElementById('closeMobileFilter')
    .addEventListener(
        'click',
        closeFilterPanel
    );


document
    .getElementById('applyMobileFilter')
    .addEventListener(
        'click',
        closeFilterPanel
    );


mobileFilterOverlay.addEventListener(
    'click',
    closeFilterPanel
);


/* =====================================================
   CART STORAGE
===================================================== */

const accountCartUserId = window.FurryCornerAuth.isAuthenticated
    ? String(window.FurryCornerAuth.userId)
    : '';
const accountCartTokenKey = accountCartUserId
    ? `furryCornerCartToken:${accountCartUserId}`
    : '';
let accountCartToken = accountCartTokenKey
    ? localStorage.getItem(accountCartTokenKey) || ''
    : '';

if(accountCartTokenKey && !/^[a-f0-9]{64}$/i.test(accountCartToken)){
    const tokenBytes = new Uint8Array(32);
    crypto.getRandomValues(tokenBytes);
    accountCartToken = Array.from(tokenBytes, byte => byte.toString(16).padStart(2, '0')).join('');
    localStorage.setItem(accountCartTokenKey, accountCartToken);
}

const accountCartOwnerKey = 'furryCornerCartOwnerId';
let accountCartReady = false;
let accountCartSyncQueue = Promise.resolve();

function getCart(){

    if(!window.FurryCornerAuth.isAuthenticated)
        return [];

    try{

        const cart =
            JSON.parse(
                localStorage.getItem('cart')
            );


        return Array.isArray(cart)
            ? cart
            : [];

    }catch(error){

        console.error(
            'Cart data could not be loaded:',
            error
        );


        return [];

    }

}


function saveCart(cart){

    if(!window.FurryCornerAuth.isAuthenticated){
        localStorage.removeItem('cart');
        return;
    }

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );

    localStorage.setItem(accountCartOwnerKey, accountCartUserId);

    if(accountCartReady){
        syncAccountCart(cart);
    }

}

function syncAccountCart(cart){
    const items = cart.map(item => ({
        id: Number(item.id),
        quantity: Number(item.quantity)
    }));

    accountCartSyncQueue = accountCartSyncQueue
        .catch(() => {})
        .then(async () => {
            const response = await fetch(
                window.FURRY_API + '/syncGuestCart.php',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Guest-Cart-Token': accountCartToken
                    },
                    body: JSON.stringify({items})
                }
            );
            const data = await response.json();

            if(!response.ok || !data.success){
                throw new Error(data.message || 'Unable to sync cart.');
            }

        })
        .catch(error => {
            console.error('Account cart sync failed:', error);
        });

    return accountCartSyncQueue;
}

async function loadAccountCart(){
    if(!window.FurryCornerAuth.isAuthenticated){
        localStorage.removeItem('cart');
        localStorage.removeItem('furryCornerGuestCartToken');
        Object.keys(localStorage)
            .filter(key => key.startsWith('furryCornerGuestCartSynced:'))
            .forEach(key => localStorage.removeItem(key));
        accountCartReady = true;
        updateCartBadge();
        renderCartDrawer();
        return;
    }

    if(localStorage.getItem(accountCartOwnerKey) !== accountCartUserId){
        localStorage.setItem('cart', '[]');
        localStorage.setItem(accountCartOwnerKey, accountCartUserId);
    }

    try{
        const response = await fetch(
            window.FURRY_API + '/getGuestCart.php',
            {headers: {'X-Guest-Cart-Token': accountCartToken}}
        );
        const data = await response.json();

        if(!response.ok || !data.success || !Array.isArray(data.items)){
            throw new Error(data.message || 'Unable to load account cart.');
        }

        localStorage.setItem('cart', JSON.stringify(data.items));
    }catch(error){
        console.error('Account cart load failed:', error);
    }finally{
        accountCartReady = true;
        updateCartBadge();
        renderCartDrawer();
    }

}


/* =====================================================
   ADD TO CART
===================================================== */

function isLoggedIn(){

    const loggedUser =
        JSON.parse(
            localStorage.getItem(
                'loggedInUser'
            ) || 'null'
        );

    const userId =
        localStorage.getItem(
            'loggedInUserId'
        ) ||
        loggedUser?.user_id ||
        loggedUser?.id;

    return !!userId;
}

function addToCart(productId, quantity = 1){

    if(!window.FurryCornerAuth.isAuthenticated){
        window.FurryCornerAuth.promptForSignIn('index.html');
        return;
    }

    const product =
        products.find(
            item =>
                item.id === productId
        );


    if(!product)
        return;


    const quantityToAdd =
        Math.max(
            1,
            Number(quantity) || 1
        );


    /*
     * Get the current stock
     * from the database-loaded product.
     */

    const stock =
        Number(product.stock) || 0;

    console.log("Product:", product);
    console.log("Stock from JavaScript:", stock);


    /*
     * Product is out of stock.
     */

    if(stock <= 0){

        showCartAlert(product.name, 'error');
        return;

    }


    let cart =
        getCart();


    const existing =
        cart.find(
            item =>
                Number(item.id) === productId
        );


    const currentCartQuantity =
        existing
            ? Number(existing.quantity || 0)
            : 0;


    const newQuantity =
        currentCartQuantity +
        quantityToAdd;


    /*
     * Don't allow the cart quantity
     * to exceed database stock.
     */

    if(newQuantity > stock){

        showCartAlert(product.name, 'error');
        return;

    }


    if(existing){

        existing.quantity =
            newQuantity;

    }else{

        cart.push({

            id:product.id,

            name:product.name,

            price:product.price,

            quantity:quantityToAdd

        });

    }


    saveCart(cart);

    updateCartBadge();

    renderCartDrawer();

    showCartAlert(
        product.name
    );

}


window.addToCart =
    addToCart;

/* =====================================================
   CART BADGE
===================================================== */

function updateCartBadge(){

    const cart =
        getCart();


    const totalItems =
        cart.reduce(
            (total,item) =>

                total +
                Number(
                    item.quantity || 0
                ),

            0
        );


    const badge =
        document.getElementById(
            'cartBadge'
        );


    if(totalItems > 0){

        badge.textContent =
            totalItems;

        badge.style.display =
            'flex';

    }else{

        badge.style.display =
            'none';

    }

}


/* =====================================================
   CART ALERT
===================================================== */

const cartAlert =
    document.getElementById(
        'cartAlert'
    );


const cartAlertText =
    document.getElementById(
        'cartAlertText'
    );


let alertTimeout;


function showCartAlert(name, type = 'success'){

    const isSuccess = type === 'success';
    cartAlertText.textContent =
        isSuccess
            ? `${name} has been added to your cart.`
            : `${name} is currently out of stock.`;

    const icon = cartAlert.querySelector('.cart-alert-icon');
    if(icon){
        icon.textContent = isSuccess ? '✓' : '!';
        icon.style.background = isSuccess ? 'var(--blue)' : 'var(--danger)';
    }

    const title = cartAlert.querySelector('h3');
    if(title){
        title.textContent = isSuccess ? 'Added to Cart!' : 'Out of Stock';
    }

    cartAlert.classList.add(
        'show'
    );

    clearTimeout(
        alertTimeout
    );

    alertTimeout =
        setTimeout(
            () => {

                cartAlert.classList.remove(
                    'show'
                );

            },
            1800
        );

}


/* =====================================================
   CART VARIABLES
===================================================== */

const cartDrawer =
    document.getElementById(
        'cartDrawer'
    );


const cartOverlay =
    document.getElementById(
        'cartOverlay'
    );


const cartClose =
    document.getElementById(
        'cartClose'
    );


const cartEdit =
    document.getElementById(
        'cartEdit'
    );


const cartDrawerBody =
    document.getElementById(
        'cartDrawerBody'
    );


const drawerTotal =
    document.getElementById(
        'drawerTotal'
    );


const checkoutBtn =
    document.getElementById(
        'checkoutBtn'
    );


const selectAllCheckbox =
    document.getElementById(
        'selectAllCheckbox'
    );


const deleteSelectedBtn =
    document.getElementById(
        'deleteSelectedBtn'
    );


const cartToggle =
    document.getElementById(
        'cartToggle'
    );

let cartEditMode = false;

let selectedCartItems =
    new Set();


/* =====================================================
   OPEN CART
===================================================== */

function openCartDrawer(){

    if(!window.FurryCornerAuth.isAuthenticated){
        cartEditMode = false;
        selectedCartItems.clear();
        cartDrawer.classList.remove('edit-mode');
        cartDrawer.classList.add('guest-cart-view');
        cartDrawerBody.innerHTML = `
            <div class="guest-cart-empty">
                <button class="guest-cart-close" type="button" aria-label="Close cart">&times;</button>
                <svg class="guest-cart-icon" viewBox="0 0 120 100" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true">
                    <path d="M18 15h10l8 56h50l8-43H33" stroke-linecap="round" stroke-linejoin="round"/>
                    <circle cx="48" cy="84" r="4"/><circle cx="80" cy="84" r="4"/>
                    <path d="M7 91h103" stroke-linecap="round"/>
                    <path d="M79 8h1m18 9h1m-34-4h1" stroke-linecap="round"/>
                </svg>
                <h3>Your cart is empty</h3>
                <p>Sign in to view your cart and start shopping</p>
                <a class="guest-cart-signin" href="signin.html?return=index.html">SIGN IN / REGISTER</a>
            </div>
        `;
        cartDrawerBody.querySelector('.guest-cart-close').addEventListener('click', closeCartDrawer);
        cartDrawer.classList.add('open');
        cartOverlay.classList.add('open');
        return;
    }

    cartDrawer.classList.remove('guest-cart-view');

    renderCartDrawer();

    cartDrawer.classList.add(
        'open'
    );

    cartOverlay.classList.add(
        'open'
    );

}


/* =====================================================
   CLOSE CART
===================================================== */

function closeCartDrawer(){

    cartDrawer.classList.remove('guest-cart-view');

    cartDrawer.classList.remove(
        'open'
    );

    cartOverlay.classList.remove(
        'open'
    );


    cartEditMode = false;

    selectedCartItems.clear();


    cartDrawer.classList.remove(
        'edit-mode'
    );


    cartEdit.textContent =
        'Edit';


    selectAllCheckbox.checked =
        false;


    selectAllCheckbox.indeterminate =
        false;


    deleteSelectedBtn.disabled =
        true;

}


/* =====================================================
   CART TOGGLE
===================================================== */

cartToggle.addEventListener(
    'click',
    openCartDrawer
);


cartClose.addEventListener(
    'click',
    closeCartDrawer
);


cartOverlay.addEventListener(
    'click',
    closeCartDrawer
);


/* =====================================================
   EDIT MODE
===================================================== */

cartEdit.addEventListener(
    'click',
    () => {

        const cart =
            getCart();


        if(cart.length === 0){

            return;

        }


        cartEditMode =
            !cartEditMode;


        if(cartEditMode){

            cartDrawer.classList.add(
                'edit-mode'
            );


            cartEdit.textContent =
                'Done';

        }else{

            cartDrawer.classList.remove(
                'edit-mode'
            );


            cartEdit.textContent =
                'Edit';


            selectedCartItems.clear();


            selectAllCheckbox.checked =
                false;


            selectAllCheckbox.indeterminate =
                false;


            deleteSelectedBtn.disabled =
                true;

        }


        renderCartDrawer();

    }
);


/* =====================================================
   SELECT ALL
===================================================== */

selectAllCheckbox.addEventListener(
    'change',
    () => {

        const cart =
            getCart();


        if(
            cart.length === 0
        ){

            return;

        }


        if(
            selectAllCheckbox.checked
        ){

            cart.forEach(item => {

                selectedCartItems.add(
                    String(item.id)
                );

            });

        }else{

            selectedCartItems.clear();

        }


        renderCartDrawer();

    }
);


/* =====================================================
   UPDATE SELECT ALL
===================================================== */

function updateSelectAllCheckbox(){

    const cart =
        getCart();


    if(cart.length === 0){

        selectAllCheckbox.checked =
            false;

        selectAllCheckbox.indeterminate =
            false;

        return;

    }


    const allSelected =
        cart.every(
            item =>
                selectedCartItems.has(
                    String(item.id)
                )
        );


    const someSelected =
        cart.some(
            item =>
                selectedCartItems.has(
                    String(item.id)
                )
        );


    selectAllCheckbox.checked =
        allSelected;


    selectAllCheckbox.indeterminate =
        someSelected &&
        !allSelected;

}


/* =====================================================
   UPDATE DELETE BUTTON & TOTAL DISPLAY
===================================================== */

function updateSelectedCartTotal(){

    const cart = getCart();

    const selectedCount = cart.filter(
        item => selectedCartItems.has(String(item.id))
    ).length;

    deleteSelectedBtn.disabled = selectedCount === 0;
    updateSelectAllCheckbox();

    // Update Total Display strictly based on selection
    let total = 0;
    if (selectedCount > 0) {
        cart.forEach(item => {
            if (selectedCartItems.has(String(item.id))) {
                total += Number(item.price) * Number(item.quantity || 0);
            }
        });
    }
    // If selectedCount === 0, total remains 0
    
    drawerTotal.textContent = peso(total);
}


/* =====================================================
   ITEM CHECKBOX
===================================================== */

cartDrawerBody.addEventListener(
    'change',
    event => {

        if(
            !event.target.classList.contains(
                'drawer-item-checkbox'
            )
        ){

            return;

        }


        const id =
            String(
                event.target.dataset.id
            );


        if(
            event.target.checked
        ){

            selectedCartItems.add(id);

        }else{

            selectedCartItems.delete(id);

        }


        updateSelectedCartTotal();


        /* =========================================
           UPDATE CHECKOUT BUTTON
        ========================================= */

        checkoutBtn.disabled =
            selectedCartItems.size === 0;

    }
);

/* =====================================================
   QUANTITY BUTTONS
===================================================== */

cartDrawerBody.addEventListener(
    'click',
    event => {

        const minusBtn =
            event.target.closest(
                '.qty-btn.minus'
            );


        const plusBtn =
            event.target.closest(
                '.qty-btn.plus'
            );


        if(
            !minusBtn &&
            !plusBtn
        ){

            return;

        }


        const id =
            Number(
                minusBtn
                    ? minusBtn.dataset.id
                    : plusBtn.dataset.id
            );


        let cart =
            getCart();


        const itemIndex =
            cart.findIndex(
                item =>
                    Number(item.id) === id
            );


        if(itemIndex === -1){

            return;

        }


        /* ===============================
           DECREASE
        =============================== */

        if(minusBtn){

            const currentQuantity =
                Number(
                    cart[itemIndex].quantity || 1
                );


            if(currentQuantity > 1){

                cart[itemIndex].quantity =
                    currentQuantity - 1;

            }else{

                // Quantity reached 0,
                // delete the item entirely

                cart.splice(
                    itemIndex,
                    1
                );


                // Remove from selected items
                selectedCartItems.delete(
                    String(id)
                );

            }

        }

        /* INCREASE */
        if(plusBtn){

            const currentQuantity =
                Number(
                    cart[itemIndex].quantity || 0
                );

            /*
            * Find the latest product information
            * from the database-loaded products array.
            */
            const product =
                products.find(
                    item =>
                        Number(item.id) === id
                );


            if(!product){

                return;

            }


            const stock =
                Number(product.stock) || 0;


            /*
            * Don't allow cart quantity
            * to exceed available stock.
            */
            if(currentQuantity >= stock){

                showCartAlert(product.name, 'error');
                return;

            }


            cart[itemIndex].quantity =
                currentQuantity + 1;

}


        saveCart(cart);
        updateCartBadge();
        renderCartDrawer();

    }
);


/* =====================================================
   DELETE SELECTED
===================================================== */

deleteSelectedBtn.addEventListener(
    'click',
    () => {

        if(
            selectedCartItems.size === 0
        ){

            return;

        }


        const confirmed =
            confirm(
                'Are you sure you want to delete the selected items?'
            );


        if(!confirmed){

            return;

        }


        let cart =
            getCart();


        cart =
            cart.filter(
                item =>
                    !selectedCartItems.has(
                        String(item.id)
                    )
            );


        saveCart(cart);


        selectedCartItems.clear();

        updateCartBadge();


        /*
         * If the cart becomes empty,
         * completely exit Edit Mode.
         */

        if(cart.length === 0){

            cartEditMode = false;

            cartDrawer.classList.remove(
                'edit-mode'
            );

            cartEdit.textContent =
                'Edit';

        }


        renderCartDrawer();

    }
);


/* =====================================================
   CHECKOUT
===================================================== */

function goToCheckout(items){

    if(
        !items ||
        items.length === 0
    ){

        return;

    }


    localStorage.setItem(
        'checkoutItems',
        JSON.stringify(items)
    );


    location.href =
        'checkout.html';

}


checkoutBtn.addEventListener(
    'click',
    () => {

        if (!isLoggedIn()) {
            return;
        }

        const cart = getCart();

        const selectedItems = cart.filter(item =>
            selectedCartItems.has(String(item.id))
        );

        // Nothing selected
        if (selectedItems.length === 0) {

            alert(
                'Please select at least one item to proceed to checkout.'
            );

            return;
        }

        // Checkout selected items only
        goToCheckout(selectedItems);
    }
);


/* =====================================================
   RENDER CART
===================================================== */

function renderCartDrawer(){

    const cart =
        getCart();


    /*
     * Remove selections for products
     * that no longer exist.
     */

    const cartIds =
        new Set(
            cart.map(
                item =>
                    String(item.id)
            )
        );


    selectedCartItems =
        new Set(
            [...selectedCartItems]
                .filter(
                    id =>
                        cartIds.has(id)
                )
        );


    /* EMPTY CART */

    if(cart.length === 0){

        cartEditMode = false;


        cartDrawer.classList.remove(
            'edit-mode'
        );


        cartEdit.textContent =
            'Edit';


        cartDrawerBody.innerHTML = `

            <div class="drawer-empty">

                <h3>
                    Your cart is empty
                </h3>


                <p>
                    Add some products to your
                    cart to see them here.
                </p>

            </div>

        `;


        drawerTotal.textContent =
            '₱0.00';


        checkoutBtn.disabled =
            true;


        cartEdit.disabled =
            true;


        cartEdit.style.opacity =
            '.5';


        selectAllCheckbox.checked =
            false;


        selectAllCheckbox.indeterminate =
            false;


        deleteSelectedBtn.disabled =
            true;


        return;

    }


    /* CART HAS ITEMS */

    cartEdit.disabled =
        false;


    cartEdit.style.opacity =
        '1';


    cartDrawerBody.innerHTML =

        cart.map(item => {

            const isChecked =
                selectedCartItems.has(
                    String(item.id)
                );


            return `

                <div
                    class="drawer-cart-item"
                    data-id="${item.id}">


                    <input
                        type="checkbox"
                        class="drawer-item-checkbox"
                        data-id="${item.id}"
                        ${isChecked ? 'checked' : ''}>


                    <img
                        src="images/product-${item.id}.png"
                        alt="${item.name}">


                    <div class="drawer-item-info">

                        <div class="drawer-item-name">

                            ${item.name}

                        </div>


                        <div class="drawer-item-price">

                            ${peso(item.price)}

                        </div>

                    </div>


                    <div class="drawer-item-actions">

                        <div
                            class="drawer-item-qty-control">


                            <button
                                type="button"
                                class="qty-btn minus"
                                data-id="${item.id}"
                                aria-label="Decrease quantity">

                                −

                            </button>


                            <span class="qty-val">

                                ${Number(item.quantity || 1)}

                            </span>


                            <button
                                type="button"
                                class="qty-btn plus"
                                data-id="${item.id}"
                                aria-label="Increase quantity">

                                +

                            </button>

                        </div>

                    </div>

                </div>

            `;

        }).join('');


    /* TOTAL - STRICTLY BASED ON SELECTION */
    let total = 0;
    if (selectedCartItems.size > 0) {
        cart.forEach(item => {
            if (selectedCartItems.has(String(item.id))) {
                total += Number(item.price) * Number(item.quantity || 0);
            }
        });
    }
    // If selectedCartItems.size === 0, total remains 0.

    drawerTotal.textContent = peso(total);

    checkoutBtn.disabled =
        selectedCartItems.size === 0;

    /* EDIT MODE */

    if(cartEditMode){

        cartDrawer.classList.add(
            'edit-mode'
        );


        cartEdit.textContent =
            'Done';


        updateSelectedCartTotal();

    }else{

        cartDrawer.classList.remove(
            'edit-mode'
        );


        cartEdit.textContent =
            'Edit';


        deleteSelectedBtn.disabled =
            true;

    }

}


/* =====================================================
   NOTIFICATIONS (BADGE ONLY)
===================================================== */

const notificationUserId =
    window.FurryCornerAuth.userId;

const notificationStorageKey = notificationUserId
    ? `furrycornerNotificationRead:${notificationUserId}`
    : null;

let notifications = [];

async function loadNotificationBadge(){

    if(!window.FurryCornerAuth.isAuthenticated){
        notifications = [];
        renderNotifications();
        return;
    }

    try{
        const response = await fetch(
            window.FURRY_API + '/getNotifications.php'
        );
        const data = await response.json();

        if(!response.ok || !data.success || !Array.isArray(data.notifications)){
            throw new Error(data.message || 'Unable to load notifications.');
        }

        const savedStateText = localStorage.getItem(notificationStorageKey);
        const savedState = savedStateText ? JSON.parse(savedStateText) : {};
        const firstVisit = savedStateText === null;

        notifications = data.notifications.map(item => ({
            ...item,
            read: savedState[item.id] ?? firstVisit
        }));

        if(firstVisit){
            localStorage.setItem(
                notificationStorageKey,
                JSON.stringify(Object.fromEntries(notifications.map(item => [item.id, item.read])))
            );
        }

        renderNotifications();
    }catch(error){
        console.error('Notification loading failed:', error);
        notifications = [];
        renderNotifications();
    }

}


const notifBadge =
    document.getElementById(
        'bottomNotifBadge'
    );


function renderNotifications(){

    const unread =
        notifications.filter(
            item =>
                !item.read
        ).length;


    if(unread > 0){

        notifBadge.textContent =
            unread;


        notifBadge.style.display =
            'flex';

    }else{

        notifBadge.style.display =
            'none';

    }

}


/* =====================================================
   ESCAPE KEY
===================================================== */

document.addEventListener(
    'keydown',
    event => {

        if(
            event.key !== 'Escape'
        ){

            return;

        }


        closeCartDrawer();

        closeFilterPanel();

        sortModal.classList.remove('open');

        closeProductModal();

    }
);

/* =====================================================
   INITIALIZE
===================================================== */

async function initializePage(){

    renderNotifications();

    await loadNotificationBadge();

    updateCartBadge();

    renderCartDrawer();

    await loadAccountCart();

    await loadProductsFromDatabase();

}

initializePage();


;

const splashSessionKey = 'furrycornerSplashShown';

if (!sessionStorage.getItem(splashSessionKey)) {
sessionStorage.setItem(splashSessionKey, 'true');

const splashStyle = document.createElement('style');
splashStyle.textContent = `
    .splash-screen{position:fixed;inset:0;z-index:3000;display:grid;place-items:center;background:var(--cream-light);opacity:1;visibility:visible;transition:opacity .25s ease,visibility .25s ease}
    .splash-screen.is-hidden{opacity:0;visibility:hidden;pointer-events:none}
    .splash-content{display:grid;justify-items:center;gap:10px}
    .splash-logo{width:132px;height:132px;object-fit:contain;animation:splash-reveal .75s cubic-bezier(.2,.8,.2,1) both}
    .splash-title{color:var(--ink);font:800 27px 'Baloo 2',cursive;opacity:0;animation:splash-title-in .4s ease .2s forwards}
    .splash-dots{display:flex;gap:6px;margin-top:2px}
    .splash-dots span{width:7px;height:7px;border-radius:50%;background:var(--blue-dark);animation:splash-dot .6s ease-in-out infinite alternate}
    .splash-dots span:nth-child(2){animation-delay:.15s}
    .splash-dots span:nth-child(3){animation-delay:.3s}
    @keyframes splash-reveal{from{opacity:0;transform:translateY(12px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}
    @keyframes splash-title-in{to{opacity:1;transform:translateY(0)}}
    @keyframes splash-dot{to{opacity:.35;transform:translateY(-4px)}}
    @media(prefers-reduced-motion:reduce){.splash-logo,.splash-title,.splash-dots span{animation:none;opacity:1}.splash-screen{transition-duration:.01ms}}
`;
document.head.append(splashStyle);

const splashScreen = document.createElement('div');
splashScreen.className = 'splash-screen';
splashScreen.setAttribute('role', 'status');
splashScreen.setAttribute('aria-label', 'Loading FurryCorner');
splashScreen.innerHTML = '<div class="splash-content"><img class="splash-logo" src="images/logo.png" alt=""><p class="splash-title">FurryCorner PH</p><div class="splash-dots" aria-hidden="true"><span></span><span></span><span></span></div></div>';
document.body.prepend(splashScreen);
window.setTimeout(() => splashScreen.classList.add('is-hidden'), 1750);
}

;



/* Arriving from another tab's cart button (index.html?cart=1) -> open the cart straight away. */
if (new URLSearchParams(location.search).get('cart') === '1') {
    window.setTimeout(() => { try { openCartDrawer(); } catch (e) {} }, 500);
}

  }
}
