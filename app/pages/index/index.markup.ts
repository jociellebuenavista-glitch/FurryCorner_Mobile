import { appNavbar, appBottomNav } from '../../legacy/app-shell';
// Page markup + CSS carried over unchanged from index.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<!-- =====================================================
     TOP NAVBAR
===================================================== -->

${appNavbar()}

<!-- =====================================================
     MAIN HERO
===================================================== -->

<section class="hero-main" aria-label="Welcome back to FurryCorner PH">

    <div class="hero-main-overlay">
        <h1>Welcome Back,<br>Furrents!</h1>
    </div>

    <img
        src="images/hero-main.png"
        alt="Welcome back message with a dog and cat"
    >

</section>

<div class="hero-main-cta">
    <p>Keep those tails wagging—stock up on<br>paw-approved food, treats, and gear.</p>
    <a href="#category-title">Stock Up Today ↓</a>
</div>

<div class="top-search">
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2">
        <circle cx="11" cy="11" r="7"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
    <input
        type="text"
        id="searchInput"
        placeholder="Search..."
        autocomplete="off">
</div>

<!-- =====================================================
     SORT MODAL
===================================================== -->

<div class="sort-modal-overlay" id="sortModal" role="dialog" aria-modal="true" aria-labelledby="sort-modal-title">
    <div class="sort-modal">
        <div class="sort-modal-header">
            <h2 id="sort-modal-title">Sort Products</h2>
            <button class="sort-modal-close" id="closeSortModal" type="button" aria-label="Close sort options">×</button>
        </div>

        <label class="sort-option">
            <input type="radio" name="sortOption" value="Alphabetically, A-Z" checked>
            <span>Alphabetically, A-Z</span>
        </label>
        <label class="sort-option">
            <input type="radio" name="sortOption" value="Alphabetically, Z-A">
            <span>Alphabetically, Z-A</span>
        </label>
        <label class="sort-option">
            <input type="radio" name="sortOption" value="Price: Low to high">
            <span>Price: Low to high</span>
        </label>
        <label class="sort-option">
            <input type="radio" name="sortOption" value="Price: High to Low">
            <span>Price: High to Low</span>
        </label>
    </div>
</div>


<!-- =====================================================
     PRODUCT PREVIEW MODAL
===================================================== -->

<div class="product-modal-overlay" id="productModal" role="dialog" aria-modal="true" aria-labelledby="productModalName">
    <div class="product-modal">
        <button class="product-modal-close" id="closeProductModal" type="button" aria-label="Close product details">×</button>
        <div class="product-modal-image">
            <img id="productModalImage" src="" alt="">
        </div>

        <div class="product-modal-details">
            <div class="product-modal-category" id="productModalCategory"></div>
            <div class="product-modal-badges">
                <span class="product-modal-badge sale" id="productModalSale" hidden>Sale</span>
                <span class="product-modal-badge in-stock" id="productModalStockBadge"></span>
            </div>
            <p class="product-modal-stock" id="productModalStock"></p>
            <div class="product-modal-name-price">
                <h2 class="product-modal-name" id="productModalName"></h2>
                <div class="product-modal-pricing">
                    <span class="product-modal-price" id="productModalPrice"></span>
                    <del class="product-modal-original" id="productModalOriginalPrice" hidden></del>
                    <span class="product-modal-savings" id="productModalSavings" hidden></span>
                </div>
            </div>
            <p class="product-modal-description" id="productModalDescription"></p>
            <section class="product-modal-highlights" id="productModalHighlights" hidden>
                <h3>Highlights</h3>
                <ul id="productModalHighlightList"></ul>
            </section>
            <p class="product-modal-shipping">FREE 1-2 DAY SHIPPING ON ORDERS ABOVE PHP 995!</p>
        </div>

        <div class="product-modal-actions">
            <button class="product-modal-add" id="productModalAdd" type="button" data-auth-required data-auth-return="index.html">Add to cart</button>
            <div class="product-modal-quantity" aria-label="Quantity">
                <button id="productModalMinus" type="button" aria-label="Decrease quantity">−</button>
                <span id="productModalQuantity">1</span>
                <button id="productModalPlus" type="button" aria-label="Increase quantity">+</button>
            </div>
            <button class="product-modal-buy" id="productModalBuy" type="button" data-auth-required data-auth-return="checkout.html">Buy Now</button>
        </div>
    </div>
</div>


<!-- =====================================================
     CATEGORIES
===================================================== -->

<section class="category-bar" id="category-section" aria-labelledby="category-title">

    <div class="category-heading">
        <h2 id="category-title">Categories</h2>
        <div class="category-heading-actions">
            <button class="category-sort-btn" id="sortSelect" type="button" aria-label="Sort products alphabetically, A-Z" title="Sort: Alphabetically, A-Z">
                <span aria-hidden="true">⇅</span>
            </button>
            <button class="category-filter-btn" id="openCategoryFilter" type="button" aria-label="Open filters" title="Open filters">
                Filter
            </button>
        </div>
    </div>

    <div class="category-list" id="categoryList">
        <button class="category-option active" type="button" data-category="All">
            <span>All</span>
        </button>
        <button class="category-option" type="button" data-category="Food">
            <span>Food</span>
        </button>
        <button class="category-option" type="button" data-category="Accessories">
            <span>Accessories</span>
        </button>
    </div>

</section>


<!-- =====================================================
     CART ALERT
===================================================== -->

<div
    class="cart-alert"
    id="cartAlert">

    <div class="cart-alert-icon">
        ✓
    </div>


    <h3>
        Added to Cart!
    </h3>


    <p id="cartAlertText">
        Product has been added to your cart.
    </p>

</div>


<!-- =====================================================
     CART DRAWER
===================================================== -->

<div
    class="cart-overlay"
    id="cartOverlay">
</div>


<aside
    class="cart-drawer"
    id="cartDrawer">

    <div class="cart-drawer-header">

        <h2>
            Cart
        </h2>


        <div class="cart-header-actions">

            <button
                type="button"
                class="cart-edit"
                id="cartEdit">

                Edit

            </button>


            <button
                type="button"
                class="cart-close"
                id="cartClose"
                aria-label="Close cart">

                ×

            </button>

        </div>

    </div>


    <div
        class="cart-drawer-body"
        id="cartDrawerBody">
    </div>


    <div class="cart-drawer-footer">

        <!-- NORMAL FOOTER -->
        <div class="normal-footer">

            <div class="cart-total-row">

                <div class="cart-total-info">

                    <span>
                        Total
                    </span>


                    <strong id="drawerTotal">
                        ₱0.00
                    </strong>

                </div>


                <button
                    type="button"
                    class="checkout-btn"
                    id="checkoutBtn"
                    data-auth-required
                    data-auth-return="checkout.html"
                    disabled>

                    Checkout

                </button>

            </div>

        </div>


        <!-- EDIT FOOTER -->
        <div class="edit-mode-footer">

            <div class="edit-total-row">

                <label class="select-all-label">

                    <input
                        type="checkbox"
                        id="selectAllCheckbox">

                    <span>
                        Select All
                    </span>

                </label>


                <button
                    type="button"
                    class="delete-btn"
                    id="deleteSelectedBtn"
                    disabled>

                    Delete Selected

                </button>

            </div>

        </div>

    </div>

</aside>


<!-- =====================================================
     MAIN
===================================================== -->

<main>

    <div class="products-layout" id="products-section">


        <!-- DESKTOP FILTER -->

        <aside class="sidebar">

            <h3>
                Filter:
            </h3>


            <details
                class="filter-group"
                open>

                <summary>
                    Product Type
                </summary>


                <div
                    class="options"
                    id="desktopTypeFilter">

                    <label>

                        <input
                            type="checkbox"
                            data-filter="category"
                            data-value="Food">

                        Food

                    </label>


                    <label style="padding-left:16px;">

                        <input
                            type="checkbox"
                            data-filter="subcategory"
                            data-value="Dry Food">

                        Dry Food

                    </label>


                    <label style="padding-left:16px;">

                        <input
                            type="checkbox"
                            data-filter="subcategory"
                            data-value="Wet Food">

                        Wet Food

                    </label>


                    <label style="padding-left:16px;">

                        <input
                            type="checkbox"
                            data-filter="subcategory"
                            data-value="Treats">

                        Treats

                    </label>


                    <label>

                        <input
                            type="checkbox"
                            data-filter="category"
                            data-value="Accessories">

                        Accessories

                    </label>


                    <label style="padding-left:16px;">

                        <input
                            type="checkbox"
                            data-filter="subcategory"
                            data-value="Walking Essentials">

                        Walking Essentials

                    </label>


                    <label style="padding-left:16px;">

                        <input
                            type="checkbox"
                            data-filter="subcategory"
                            data-value="Home Gear">

                        Home Gear

                    </label>


                    <label style="padding-left:16px;">

                        <input
                            type="checkbox"
                            data-filter="subcategory"
                            data-value="Toys">

                        Toys

                    </label>

                </div>

            </details>


            <details class="filter-group">

                <summary>
                    Price
                </summary>


                <div
                    class="options"
                    id="desktopPriceFilter">

                    <label>

                        <input
                            type="checkbox"
                            data-filter="price"
                            data-min="0"
                            data-max="199.99">

                        Under ₱200

                    </label>


                    <label>

                        <input
                            type="checkbox"
                            data-filter="price"
                            data-min="200"
                            data-max="500">

                        ₱200 - ₱500

                    </label>


                    <label>

                        <input
                            type="checkbox"
                            data-filter="price"
                            data-min="500.01"
                            data-max="999999">

                        Over ₱500

                    </label>

                </div>

            </details>


            <button
                class="clear-filters"
                id="clearDesktopFilters">

                Clear filters

            </button>

        </aside>


        <!-- PRODUCT CONTENT -->

        <div class="products-content">

            <div class="toolbar">

                <span class="sort-label">
                    Sort By:
                </span>

                <span
                    class="count"
                    id="productCount">
                </span>

            </div>


            <section
                class="product-grid"
                id="productGrid">
            </section>

        </div>

    </div>


    <div
        class="pagination"
        id="pagination">
    </div>

</main>


<!-- =====================================================
     MOBILE BOTTOM NAVIGATION
===================================================== -->

${appBottomNav('home')}


<!-- =====================================================
     MOBILE FILTER
===================================================== -->

<div
    class="mobile-filter-overlay"
    id="mobileFilterOverlay">
</div>


<div
    class="mobile-filter-panel"
    id="mobileFilterPanel">

    <div class="mobile-filter-header">

        <h3>
            Filters
        </h3>


        <button
            class="close-filter"
            id="closeMobileFilter">

            ×

        </button>

    </div>


    <div class="mobile-filter-content">

        <details
            class="filter-group"
            open>

            <summary>
                Product Type
            </summary>


            <div class="options">

                <label>

                    <input
                        type="checkbox"
                        data-filter="category"
                        data-value="Food">

                    Food

                </label>


                <label style="padding-left:16px;">

                    <input
                        type="checkbox"
                        data-filter="subcategory"
                        data-value="Dry Food">

                    Dry Food

                </label>


                <label style="padding-left:16px;">

                    <input
                        type="checkbox"
                        data-filter="subcategory"
                        data-value="Wet Food">

                    Wet Food

                </label>


                <label style="padding-left:16px;">

                    <input
                        type="checkbox"
                        data-filter="subcategory"
                        data-value="Treats">

                    Treats

                </label>


                <label>

                    <input
                        type="checkbox"
                        data-filter="category"
                        data-value="Accessories">

                    Accessories

                </label>


                <label style="padding-left:16px;">

                    <input
                        type="checkbox"
                        data-filter="subcategory"
                        data-value="Walking Essentials">

                    Walking Essentials

                </label>


                <label style="padding-left:16px;">

                    <input
                        type="checkbox"
                        data-filter="subcategory"
                        data-value="Home Gear">

                    Home Gear

                </label>


                <label style="padding-left:16px;">

                    <input
                        type="checkbox"
                        data-filter="subcategory"
                        data-value="Toys">

                    Toys

                </label>

            </div>

        </details>


        <details class="filter-group">

            <summary>
                Price
            </summary>


            <div class="options">

                <label>

                    <input
                        type="checkbox"
                        data-filter="price"
                        data-min="0"
                        data-max="199.99">

                    Under ₱200

                </label>


                <label>

                    <input
                        type="checkbox"
                        data-filter="price"
                        data-min="200"
                        data-max="500">

                    ₱200 - ₱500

                </label>


                <label>

                    <input
                        type="checkbox"
                        data-filter="price"
                        data-min="500.01"
                        data-max="999999">

                    Over ₱500

                </label>

            </div>

        </details>


        <button
            class="clear-filters"
            id="clearMobileFilters">

            Clear filters

        </button>


        <button
            class="apply-filter-btn"
            id="applyMobileFilter">

            Done

        </button>

    </div>

</div>`;

export const CSS = `

:root{
    --blue:#7BB8F0;
    --blue-dark:#5CA3E8;
    --cream:#FCE3C0;
    --cream-light:#FDEEDA;
    --ink:#1F2430;
    --white:#ffffff;
    --muted:#8b929e;
    --border:#e2e6ec;
    --danger:#e0685f;
    --danger-dark:#c9554d;
}

*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

html{
    scroll-behavior:smooth;
}

body{
    font-family:'Nunito',sans-serif;
    color:var(--ink);
    background:var(--cream);
    line-height:1.5;
}

main{
    background:var(--cream);
    min-height:70vh;
}

h1,h2,h3,h4,.brand{
    font-family:'Baloo 2',cursive;
}

.navbar{
    position:sticky;
    top:0;
    z-index:1000;
    width:100%;
    min-height:68px;
    display:flex;
    align-items:center;
    gap:20px;
    padding:12px 40px;
    background:var(--white);
    box-shadow:0 2px 0 rgba(0,0,0,.04);
}

a{
    text-decoration:none;
    box-shadow:0 6px 18px rgba(0,0,0,.10);
}

.logo{
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
    position:absolute;
    left:50%;
    transform:translateX(-50%);
}

.logo img{
    width:44px;
    height:44px;
    object-fit:contain;
}

.cart-link{
    margin-left:auto;
}

/* =====================================================
   SEARCH
===================================================== */

.top-search{
    flex:none;
    min-width:0;
    width:min(560px, calc(100% - 32px));
    margin:14px auto 18px;

    height:44px;

    display:flex;
    align-items:center;

    background:#f5f6f7;

    border:1.5px solid #e5e7eb;
    border-radius:8px;

    padding:0 14px;

    transition:.2s ease;
}

.top-search:focus-within{
    background:white;
    border-color:var(--blue);

    box-shadow:
        0 0 0 3px
        rgba(123,184,240,.15);
}

.top-search svg{
    width:20px;
    height:20px;

    color:#7d8490;

    flex-shrink:0;
    order:2;
    margin-left:10px;
}

.top-search input{
    width:100%;
    min-width:0;

    order:1;

    border:none;
    outline:none;

    background:transparent;

    margin-left:0;

    font-family:'Nunito',sans-serif;

    font-size:14px;
    font-weight:600;

    color:var(--ink);
}

.top-search input::placeholder{
    color:#9ca3af;
}


/* =====================================================
   CART ICON
===================================================== */

.cart-link{
    position:relative;

    width:44px;
    height:44px;

    display:flex;
    align-items:center;
    justify-content:center;

    flex-shrink:0;

    border-radius:8px;

    border:none;
    background:transparent;

    color:var(--ink);

    cursor:pointer;

    font-family:'Nunito',sans-serif;

    padding:0;
}

.cart-link:hover{
    background:var(--cream-light);
}

.cart-link svg{
    width:24px;
    height:24px;
}

.cart-badge{
    position:absolute;

    top:2px;
    right:0;

    min-width:18px;
    height:18px;

    padding:0 4px;

    display:none;

    align-items:center;
    justify-content:center;

    border-radius:50%;

    background:var(--blue-dark);
    color:white;

    font-size:10px;
    font-weight:800;

    border:2px solid white;
}


/* =====================================================
   PRODUCTS LAYOUT
===================================================== */

.products-layout{
    max-width:1400px;

    margin:0 auto;

    display:grid;

    grid-template-columns:220px 1fr;

    gap:45px;

    padding:35px 40px 70px;

    align-items:start;
}

/* =====================================================
   MAIN HERO
===================================================== */

.hero-main{
    position:relative;
    width:100%;
    height:auto;
    overflow:hidden;
    background:#fcebd5;
}

.hero-main img{
    width:100%;
    height:auto;
    max-width:100%;
    display:block;
    object-fit:contain;
    object-position:center;
}

.hero-main-overlay{
    position:absolute;
    top:30%;
    left:50%;
    z-index:1;
    width:min(90%, 560px);
    transform:translateX(-50%);
    text-align:center;
    color:var(--ink);
    pointer-events:none;
}

.hero-main-overlay h1{
    color:var(--blue-dark);
    font-size:clamp(42px, 5vw, 68px);
    line-height:1.2em;
    text-shadow:0 2px 0 rgba(255,255,255,.7);
}

.hero-main-cta{
    width:100%;
    margin:0 auto;
    padding:12px clamp(12px, 4vw, 20px);
    border-radius:0;
    background:rgba(255,255,255,.88);
    text-align:center;
    box-sizing:border-box;
    min-height:134px;

    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    text-align:center;

}

.hero-main-cta p{
    color:var(--ink);
    font-size:22px;
    font-weight:800;
}

.hero-main-cta a{
    display:inline-flex;
    align-items:center;
    justify-content:center;
    min-height:40px;
    margin-top:10px;
    padding:0 18px;
    border-radius:8px;
    background:var(--blue);
    color:var(--white);
    font-size:16px;
    font-weight:800;
}

.hero-main-cta a:hover{
    background:var(--blue-dark);
}

/* =====================================================
   CATEGORY BAR
===================================================== */

.category-bar{
    max-width:1400px;
    margin:0 auto;
    padding:24px 40px 0;
    background:var(--cream);
}

.category-heading{
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:12px;
}

.category-heading-actions{
    display:flex;
    align-items:center;
    gap:8px;
}

.category-heading h2{
    font-size:22px;
}

.category-list{
    display:flex;
    gap:10px;
}

.category-option{
    flex:1 1 0;
    min-width:0;
    min-height:46px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:10px 8px;
    border:1.5px solid var(--border);
    border-radius:999px;
    background:var(--white);
    color:var(--ink);
    font-family:'Nunito',sans-serif;
    font-size:13px;
    font-weight:800;
    cursor:pointer;
    transition:background .2s ease, border-color .2s ease, color .2s ease;
}

.category-option:hover,
.category-option.active{
    border-color:var(--blue);
    background:var(--blue);
    color:var(--white);
}

.category-filter-btn{
    display:flex;
    align-items:center;
    justify-content:center;
    flex:0 0 auto;
    height:38px;
    padding:0 14px;
    border:1.5px solid var(--border);
    border-radius:8px;
    background:var(--white);
    color:var(--ink);
    font-family:'Nunito',sans-serif;
    font-size:13px;
    font-weight:800;
    cursor:pointer;
}

.category-sort-select{
    height:38px;
    padding:0 8px;
    font-size:12px;
}

html {
    scroll-behavior: smooth;
}

#category-title {
    scroll-margin-top: 80px;
}

.sort-modal-overlay{
    position:fixed;
    inset:0;
    display:none;
    align-items:center;
    justify-content:center;
    padding:16px;
    background:rgba(31,36,48,.35);
    z-index:4500;
}

.sort-modal-overlay.open{
    display:flex;
}

.sort-modal{
    width:min(360px, 100%);
    padding:22px;
    border-radius:16px;
    background:var(--white);
    box-shadow:0 18px 45px rgba(0,0,0,.2);
}

.sort-modal-header{
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:16px;
}

.sort-modal-header h2{
    font-size:22px;
}

.sort-modal-close{
    width:32px;
    height:32px;
    border:0;
    border-radius:50%;
    background:#f1f2f3;
    color:var(--ink);
    font-size:22px;
    line-height:1.2em;
    cursor:pointer;
}

.sort-option{
    display:flex;
    align-items:center;
    gap:10px;
    width:100%;
    padding:13px 0;
    border-top:1px solid #edf0f3;
    color:var(--ink);
    font-size:14px;
    font-weight:700;
    cursor:pointer;
}

.sort-option input{
    width:18px;
    height:18px;
    accent-color:var(--blue-dark);
}

.product-modal-overlay{
    position:fixed;
    inset:0;
    display:none;
    align-items:center;
    justify-content:center;
    padding:20px;
    background:rgba(31,36,48,.45);
    z-index:4600;
}

.product-modal-overlay.open{
    display:flex;
}

.product-modal{
    position:relative;
    display:grid;
    grid-template-columns:minmax(280px,.9fr) minmax(0,1.1fr);
    grid-template-rows:minmax(0,1fr) auto;
    width:min(1040px, 100%);
    max-height:calc(100vh - 40px);
    overflow:auto;
    border-radius:12px;
    background:var(--white);
    box-shadow:0 12px 35px rgba(0,0,0,.18);
}

.product-modal-image{
    position:relative;
    grid-column:1;
    grid-row:1 / 3;
    min-height:460px;
    display:flex;
    align-items:center;
    justify-content:center;
    padding:24px;
    background:#f5f6f7;
}

.product-modal-image img{
    width:100%;
    height:100%;
    max-width:360px;
    object-fit:contain;
}

.product-modal-close{
    position:absolute;
    top:14px;
    right:14px;
    width:40px;
    height:40px;
    border:0;
    border-radius:50%;
    background:rgba(255,255,255,.95);
    color:var(--ink);
    font-size:25px;
    cursor:pointer;
    z-index:2;
}

.product-modal-details{
    grid-column:2;
    grid-row:1;
    min-width:0;
    padding:32px 32px 12px;
}

.product-modal-category{
    color:var(--muted);
    font-size:12px;
    font-weight:800;
    letter-spacing:0;
    text-transform:uppercase;
}

.product-modal-badges{
    display:flex;
    flex-wrap:wrap;
    gap:8px;
    margin-bottom:12px;
}

.product-modal-badge{
    display:inline-flex;
    align-items:center;
    min-height:24px;
    padding:3px 10px;
    border-radius:6px;
    color:#fff;
    font-size:12px;
    font-weight:800;
}

.product-modal-badge.sale{background:#08b5c4}
.product-modal-badge.in-stock{background:#32c74d}
.product-modal-badge.out-of-stock{background:var(--danger)}
.product-modal-badge[hidden]{display:none}

.product-modal-stock{
    margin:0 0 12px;
    color:var(--ink);
    font-size:13px;
    font-weight:800;
}

.product-modal-name-price{
    display:block;
    margin-top:0;
}

.product-modal-name{
    margin:0 0 10px;
    font:800 27px 'Nunito',sans-serif;
    line-height:1.2;
}

.product-modal-pricing{
    display:flex;
    align-items:baseline;
    flex-wrap:wrap;
    gap:8px;
}

.product-modal-price{
    color:#e27745;
    font-family:'Baloo 2',cursive;
    font-size:27px;
    font-weight:800;
    white-space:nowrap;
}

.product-modal-original{
    color:var(--muted);
    font-size:15px;
    text-decoration:line-through;
}

.product-modal-original[hidden],
.product-modal-savings[hidden]{display:none}

.product-modal-savings{
    color:var(--muted);
    font-size:13px;
    font-weight:800;
}

.product-modal-description{
    margin-top:16px;
    color:var(--ink);
    font-size:14px;
    line-height:1.55;
}

.product-modal-highlights{
    margin-top:14px;
}

.product-modal-highlights[hidden]{display:none}

.product-modal-highlights h3{
    margin-bottom:6px;
    font:800 14px 'Nunito',sans-serif;
}

.product-modal-highlights ul{
    display:grid;
    gap:5px;
    padding-left:19px;
    font-size:13px;
    line-height:1.45;
}

.product-modal-shipping{
    margin:16px 0 0;
    color:var(--ink);
    font-size:14px;
    font-weight:700;
}

.product-modal-actions{
    grid-column:2;
    grid-row:2;
    display:flex;
    align-items:center;
    gap:8px;
    padding:12px 32px 28px;
}

.product-modal-quantity{
    height:44px;
    display:flex;
    align-items:center;
    border:1.5px solid var(--blue);
    border-radius:8px;
    overflow:hidden;
    flex:0 0 auto;
}

.product-modal-quantity button,
.product-modal-quantity span,
.product-modal-actions > button{
    min-height:44px;
    border:0;
    font-family:'Nunito',sans-serif;
    font-size:14px;
    font-weight:800;
}

.product-modal-quantity button{
    width:38px;
    background:var(--white);
    color:var(--blue-dark);
    cursor:pointer;
}

.product-modal-quantity button:hover{
    background:var(--cream-light);
}

.product-modal-quantity span{
    width:38px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-left:1px solid var(--blue);
    border-right:1px solid var(--blue);
}

.product-modal-actions > button{
    flex:1;
    border:1.5px solid var(--blue);
    border-radius:8px;
    cursor:pointer;
}

.product-modal-add{
    background:var(--white);
    color:var(--blue-dark);
}

.product-modal-add:hover{
    background:var(--blue);
    color:var(--white);
}

.product-modal-buy{
    background:var(--blue);
    color:var(--white);
}

.product-modal-buy:hover{
    background:var(--blue-dark);
}

.category-sort-btn{
    display:flex;
    align-items:center;
    justify-content:center;
    width:42px;
    height:38px;
    padding:0;
    border:1.5px solid var(--border);
    border-radius:8px;
    background:var(--white);
    color:var(--ink);
    font-family:'Nunito',sans-serif;
    font-size:21px;
    font-weight:800;
    cursor:pointer;
}

.category-sort-btn:hover{
    background:var(--blue);
    color:var(--white);
}

.category-filter-btn:hover{
    background:var(--blue);
    color:var(--white);
}


/* =====================================================
   SIDEBAR
===================================================== */

.sidebar{
    position:sticky;
    top:90px;
}

.sidebar h3{
    font-size:18px;
    font-weight:800;
    margin-bottom:22px;
}

.filter-group{
    margin-bottom:20px;
}

.filter-group summary{
    font-weight:700;
    font-size:15px;

    cursor:pointer;
    list-style:none;

    display:flex;
    align-items:center;
    justify-content:space-between;

    padding:5px 0;
}

.filter-group summary::-webkit-details-marker{
    display:none;
}

.filter-group summary::after{
    content:'+';
    font-size:17px;
    color:var(--blue-dark);
}

.filter-group[open] summary::after{
    content:'−';
}

.filter-group .options{
    margin-top:10px;

    display:flex;
    flex-direction:column;

    gap:8px;

    padding-left:4px;
}

.filter-group label{
    font-size:14px;
    font-weight:600;

    display:flex;
    align-items:center;

    gap:8px;

    cursor:pointer;
}

.filter-group input{
    accent-color:var(--blue-dark);
}

.clear-filters{
    background:none;
    border:none;

    cursor:pointer;

    color:var(--blue-dark);

    font-family:'Nunito',sans-serif;

    font-weight:700;
    font-size:13.5px;

    text-decoration:underline;

    margin-top:4px;
}


/* =====================================================
   PRODUCTS
===================================================== */

.products-content{
    width:100%;
    min-width:0;
}

.toolbar{
    display:flex;

    align-items:center;

    justify-content:flex-end;

    gap:12px;

    margin-bottom:22px;
}

.sort-label{
    font-weight:700;
    font-size:14px;
}

.count{
    font-size:13px;

    font-weight:700;

    opacity:.7;
}

select{
    font-family:'Nunito',sans-serif;

    font-weight:700;
    font-size:13px;

    padding:8px 12px;

    border-radius:8px;

    border:1.5px solid var(--blue);

    background:white;

    color:var(--ink);

    cursor:pointer;
}

.mobile-filter-btn{
    display:none;

    border:none;

    background:white;

    border:1.5px solid var(--blue);

    border-radius:8px;

    padding:8px 13px;

    font-family:'Nunito',sans-serif;

    font-size:13px;

    font-weight:800;

    cursor:pointer;
}


/* =====================================================
   PRODUCT GRID
===================================================== */

.product-grid{
    width:100%;

    display:grid;

    grid-template-columns:
        repeat(3,minmax(0,1fr));

    gap:24px;

    align-content:start;
}

.card{
    background:white;

    border-radius:16px;

    overflow:hidden;

    display:flex;
    flex-direction:column;

    box-shadow:
        0 4px 14px
        rgba(0,0,0,.05);

    transition:
        transform .2s ease,
        box-shadow .2s ease;
}

.card:hover{
    transform:translateY(-4px);

    box-shadow:
        0 10px 22px
        rgba(0,0,0,.10);
}

.card-thumb{
    background:var(--blue);

    width:100%;
    height:230px;

    display:flex;

    justify-content:center;
    align-items:center;

    padding:15px;

    overflow:hidden;

    border-bottom:1px solid #eee;
    border-left:0;
    border-right:0;
    border-top:0;
    cursor:pointer;
    font-family:'Nunito',sans-serif;
}

.card-thumb img{
    width:100%;
    height:100%;

    object-fit:contain;
    object-position:center;
}

.card-body{
    padding:15px;

    display:flex;
    flex-direction:column;

    gap:7px;
}

.card-name{
    display:block;
    width:100%;
    padding:0;
    border:0;
    background:transparent;
    text-align:left;
    cursor:pointer;
    font-family:'Nunito',sans-serif;

    font-size:14.5px;
    font-weight:700;

    color:var(--ink);

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
}

.card-name:hover{
    color:var(--blue-dark);
}

.card-description{
    min-height:2.8em;
    overflow:hidden;
    color:#737b87;
    font-size:12px;
    line-height:1.4;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2;
}

.card-price{
    font-size:15px;

    font-weight:800;

    color:var(--blue-dark);

    margin-bottom:3px;
}

.card-btn{
    width:100%;
    height:38px;

    border-radius:8px;
    border:none;

    background:var(--blue);

    color:white;

    font-family:'Nunito',sans-serif;

    font-weight:700;
    font-size:14px;

    cursor:pointer;

    transition:background .2s ease;
}

.card-btn:hover{
    background:var(--blue-dark);
}


/* =====================================================
   PAGINATION
===================================================== */

.pagination{
    display:flex;

    justify-content:center;
    align-items:center;

    gap:8px;

    padding:10px 40px 50px;
}

.pagination button{
    width:38px;
    height:38px;

    border-radius:8px;

    border:1.5px solid var(--blue);

    background:white;

    font-family:'Nunito',sans-serif;

    font-weight:700;

    cursor:pointer;
}

.pagination button.active{
    background:var(--blue);

    color:white;
}

.pagination button:disabled{
    opacity:.45;
    cursor:not-allowed;
}


/* =====================================================
   CART ALERT
===================================================== */

.cart-alert{
    position:fixed;

    left:50%;
    top:50%;

    transform:
        translate(-50%,-50%)
        scale(.85);

    background:#fff;

    width:360px;
    max-width:90vw;

    padding:24px 20px 18px;

    border-radius:18px;

    box-shadow:
        0 18px 45px
        rgba(31,36,48,.18);

    border:2px solid var(--blue-dark);

    z-index:5000;

    opacity:0;
    visibility:hidden;

    transition:.25s ease;

    text-align:center;
}

.cart-alert.show{
    opacity:1;

    visibility:visible;

    transform:
        translate(-50%,-50%)
        scale(1);
}

.cart-alert-icon{
    width:58px;
    height:58px;

    margin:0 auto 12px;

    border-radius:50%;

    background:var(--danger);

    color:white;

    display:flex;

    align-items:center;
    justify-content:center;

    font-size:28px;

    font-weight:800;
}

.cart-alert h3{
    margin-bottom:6px;

    font-family:'Baloo 2',cursive;
    font-size:28px;
    line-height:1;
    letter-spacing:.02em;
}

.cart-alert p{
    font-size:14px;

    font-weight:700;

    color:#586273;
}

.cart-overlay.open{
    opacity:1;
    visibility:visible;
}

.cart-drawer{
    position:fixed;

    top:0;
    bottom:0;
    right:0;

    width:390px;
    max-width:90vw;

    height:100dvh;

    background:var(--cream-light);

    z-index:5001;

    display:flex;
    flex-direction:column;

    transform:translateX(100%);

    transition:
        transform .3s ease;

    box-shadow:
        -8px 0 30px
        rgba(0,0,0,.15);
}

.cart-drawer.open{
    transform:translateX(0);
}

.cart-drawer.guest-cart-view{
    width:100%;
    max-width:100%;
    background:#fff;
    box-shadow:none;
}

.cart-drawer.guest-cart-view .cart-drawer-header,
.cart-drawer.guest-cart-view .cart-drawer-footer{
    display:none;
}

.cart-drawer.guest-cart-view .cart-drawer-body{
    display:grid;
    place-items:center;
    padding:28px 20px 32px;
    background:var(--cream-light);
    overflow:auto;
}

.guest-cart-empty{
    width:min(100%,380px);
    min-height:100%;
    display:flex;
    flex-direction:column;
    align-items:center;
    justify-content:center;
    gap:12px;
    text-align:center;
    color:var(--ink);
}

.guest-cart-close{
    position:absolute;
    top:12px;
    right:12px;
    width:38px;
    height:38px;
    border:0;
    border-radius:50%;
    background:#f3f4f6;
    color:var(--ink);
    font-size:24px;
    cursor:pointer;
}

.guest-cart-icon{
    width:128px;
    height:128px;
    color:var(--ink);
    opacity:.92;
}

.guest-cart-empty h3{
    margin-top:4px;
    font-family:'Baloo 2',cursive;
    font-size:32px;
    line-height:1.02;
    font-weight:800;
    letter-spacing:.01em;
    text-transform:uppercase;
}

.guest-cart-empty p{
    color:#5b6472;
    font-size:15px;
    line-height:1.5;
    margin-top:2px;
}

.guest-cart-signin{
    width:min(100%, 310px);
    min-height:52px;
    display:grid;
    place-items:center;
    margin-top:18px;
    border-radius:10px;
    background:var(--blue-dark);
    color:#fff;
    font-family:'Nunito',sans-serif;
    font-size:18px;
    font-weight:900;
    letter-spacing:.02em;
    box-shadow:0 8px 18px rgba(92,163,232,.25);
    transition:transform .2s ease, background .2s ease;
}

.guest-cart-signin:hover{
    background:var(--blue);
    transform:translateY(-1px);
}


/* =====================================================
   CART HEADER
===================================================== */

.cart-drawer-header{
    background:var(--blue-dark);

    color:white;

    padding:18px 20px;

    display:flex;

    align-items:center;

    justify-content:space-between;

    flex-shrink:0;
}

.cart-drawer-header h2{
    font-size:24px;
}

.cart-header-actions{
    display:flex;

    align-items:center;

    gap:8px;
}

.cart-edit{
    height:34px;

    padding:0 12px;

    border:none;

    border-radius:8px;

    background:rgba(255,255,255,.15);

    color:white;

    font-family:'Nunito',sans-serif;

    font-size:13px;

    font-weight:800;

    cursor:pointer;

    transition:.2s ease;
}

.cart-edit:hover{
    background:rgba(255,255,255,.25);
}

.cart-edit:disabled{
    cursor:not-allowed;
    opacity:.5 !important;
}

.cart-close{
    width:36px;
    height:36px;

    border:2px solid
        rgba(255,255,255,.7);

    border-radius:50%;

    background:transparent;

    color:white;

    font-size:25px;

    line-height:1;

    cursor:pointer;

    display:flex;

    align-items:center;

    justify-content:center;
}


/* =====================================================
   CART BODY
===================================================== */

.cart-drawer-body{
    flex:1;

    overflow-y:auto;

    padding:20px;

    min-height:0;
}

.drawer-cart-item{
    background:white;

    border-radius:14px;

    padding:12px;

    margin-bottom:12px;

    display:flex;

    align-items:center;

    gap:12px;

    box-shadow:
        0 3px 10px
        rgba(0,0,0,.06);
}

/* UPDATED: Checkbox is now always visible */
.drawer-item-checkbox{
    width:20px;
    height:20px;
    flex-shrink:0;
    accent-color:var(--blue-dark);
    cursor:pointer;
    display: block; 
}

.drawer-cart-item img{
    width:70px;
    height:70px;

    border-radius:10px;

    background:var(--blue);

    object-fit:contain;

    flex-shrink:0;
}

.drawer-item-info{
    flex:1;

    min-width:0;
}

.drawer-item-name{
    font-weight:800;

    font-size:14px;

    margin-bottom:4px;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
}

.drawer-item-price{
    color:var(--blue-dark);

    font-weight:800;

    font-size:14px;
}

.drawer-item-actions{
    display:flex;

    flex-direction:column;

    align-items:flex-end;

    gap:6px;

    flex-shrink:0;
}

.drawer-item-qty-control{
    display:flex;

    align-items:center;

    border:1.5px solid var(--blue);

    border-radius:8px;

    overflow:hidden;

    background:var(--white);
}

.qty-btn{
    width:30px;
    height:30px;

    border:none;

    background:transparent;

    color:var(--blue-dark);

    font-size:18px;

    font-weight:700;

    cursor:pointer;

    display:flex;

    align-items:center;

    justify-content:center;

    transition:background .2s ease;
}

.qty-btn:hover{
    background:var(--cream-light);
}

.qty-btn:active{
    background:var(--blue);

    color:white;
}

.qty-val{
    width:32px;

    text-align:center;

    font-size:14px;

    font-weight:800;

    border-left:1.5px solid var(--blue);

    border-right:1.5px solid var(--blue);

    height:30px;

    display:flex;

    align-items:center;

    justify-content:center;
}

.drawer-empty{
    min-height:300px;

    display:flex;

    flex-direction:column;

    align-items:center;

    justify-content:center;

    text-align:center;

    padding:30px;
}

.drawer-empty h3{
    font-size:22px;

    margin-bottom:8px;
}

.drawer-empty p{
    font-size:14px;

    opacity:.7;
}


/* =====================================================
   CART FOOTER
===================================================== */

.cart-drawer-footer{
    background:white;

    padding:16px 20px;

    border-top:1px solid #eee;

    flex-shrink:0;
}


/* =====================================================
   NORMAL / EDIT FOOTER
===================================================== */

.normal-footer{
    display:block;
}

.edit-mode-footer{
    display:none;
}

.cart-drawer.edit-mode .normal-footer{
    display:none;
}

.cart-drawer.edit-mode .edit-mode-footer{
    display:block;
}


/* =====================================================
   NORMAL TOTAL
===================================================== */

.cart-total-row{
    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:12px;

    margin:0;

    font-size:16px;

    font-weight:800;
}

.cart-total-info{
    display:flex;

    align-items:center;

    gap:7px;

    min-width:0;
}

.cart-total-info span{
    white-space:nowrap;
}

.cart-total-row strong{
    color:var(--blue-dark);

    white-space:nowrap;

    font-size:17px;
}


/* =====================================================
   EDIT FOOTER
===================================================== */

.edit-total-row{
    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:10px;
}

.select-all-label{
    display:flex;

    align-items:center;

    gap:8px;

    font-weight:800;

    font-size:13px;

    cursor:pointer;

    color:var(--ink);

    white-space:nowrap;
}

.select-all-label input{
    width:20px;
    height:20px;

    accent-color:var(--blue-dark);

    cursor:pointer;
}


/* =====================================================
   BUTTONS (Same Size)
===================================================== */

.checkout-btn,
.delete-btn{
    height:42px;
    width: 125px;
    padding: 0;
    border:none;
    border-radius:9px;
    color:white;
    font-family:'Nunito',sans-serif;
    font-size:12.5px;
    font-weight:800;
    cursor:pointer;
    transition:.2s ease;
    white-space:nowrap;
    text-align: center;
}

.checkout-btn{
    background:var(--blue-dark);
}

.checkout-btn:hover{
    background:#4b95dc;
}

.delete-btn{
    background:var(--danger);
}

.delete-btn:hover{
    background:var(--danger-dark);
}

.checkout-btn:disabled,
.delete-btn:disabled{
    background:#c8cdd3;
    color:#f5f5f5;
    cursor:not-allowed;
    opacity:.8;
}


/* =====================================================
   NO RESULTS
===================================================== */

.no-results{
    grid-column:1/-1;

    text-align:center;

    padding:60px 20px;

    font-weight:700;

    opacity:.7;
}


/* =====================================================
   MOBILE BOTTOM NAVIGATION
===================================================== */

.mobile-bottom-nav{
    position:fixed;

    left:0;
    right:0;
    bottom:0;

    width:100%;
    height:68px;

    background:var(--white);

    border-top:1px solid #e5e5e5;

    box-shadow:
        0 -4px 15px
        rgba(0,0,0,.08);

    z-index:4000;

    display:grid;

    grid-template-columns:
        repeat(4,1fr);

    align-items:stretch;

    padding:0;
    margin:0;
}

.mobile-bottom-nav .bottom-nav-item{
    width:100%;
    min-width:0;

    height:68px;

    display:flex;

    flex-direction:column;

    align-items:center;
    justify-content:center;

    gap:3px;

    color:#7d8490;

    font-family:'Nunito',sans-serif;

    font-size:10.5px;
    font-weight:700;

    line-height:1;

    text-decoration:none;

    border:none;

    background:transparent;

    cursor:pointer;

    position:relative;

    padding:8px 2px;
    margin:0;
}

.mobile-bottom-nav .bottom-nav-item svg{
    width:22px;
    height:22px;

    display:block;

    flex-shrink:0;

    margin:0;
}

.mobile-bottom-nav .bottom-nav-item span:not(.bottom-notif-badge){
    display:block;

    width:100%;

    text-align:center;

    line-height:1;

    white-space:nowrap;

    overflow:hidden;

    text-overflow:ellipsis;
}

.mobile-bottom-nav .bottom-nav-item.active{
    color:var(--blue-dark);
}

.mobile-bottom-nav .bottom-nav-item:hover{
    color:#7d8490;
}

.mobile-bottom-nav .bottom-nav-item.active:hover{
    color:var(--blue-dark);
}

.mobile-bottom-nav .bottom-notif-badge{
    position:absolute;

    top:6px;

    right:50%;

    transform:translateX(12px);

    min-width:16px;
    height:16px;

    padding:0 4px;

    display:none;

    align-items:center;
    justify-content:center;

    border-radius:50%;

    background:var(--danger);

    color:white;

    font-size:9px;

    font-weight:800;

    line-height:1;

    z-index:2;
}


/* =====================================================
   MOBILE FILTER
===================================================== */

.mobile-filter-overlay{
    display:none;

    position:fixed;

    inset:0;

    background:
        rgba(31,36,48,.35);

    z-index:4000;
}

.mobile-filter-panel{
    position:fixed;

    left:0;
    right:0;
    bottom:0;

    background:white;

    border-radius:
        20px 20px 0 0;

    padding:20px;

    max-height:80vh;

    overflow-y:auto;

    transform:translateY(100%);

    transition:
        transform .3s ease;

    z-index:4001;
}

.mobile-filter-panel.open{
    transform:translateY(0);
}

.mobile-filter-overlay.open{
    display:block;
}

.mobile-filter-header{
    display:flex;

    justify-content:space-between;
    align-items:center;

    margin-bottom:18px;

    padding-bottom:15px;

    border-bottom:1px solid #eee;
}

.mobile-filter-header h3{
    font-size:21px;
}

.close-filter{
    border:none;

    background:#f1f2f3;

    width:34px;
    height:34px;

    border-radius:50%;

    font-size:22px;

    cursor:pointer;
}

.apply-filter-btn{
    width:100%;

    height:44px;

    border:none;

    border-radius:9px;

    background:var(--blue-dark);

    color:white;

    font-family:'Nunito',sans-serif;

    font-weight:800;

    cursor:pointer;

    margin-top:10px;
}


/* =====================================================
   TABLET
===================================================== */

@media(max-width:1000px){

    .products-layout{
        grid-template-columns:
            190px 1fr;

        gap:25px;

        padding-left:25px;
        padding-right:25px;
    }

    .product-grid{
        grid-template-columns:
            repeat(2,minmax(0,1fr));
    }

    .card-thumb{
        height:220px;
    }

}


/* =====================================================
   MOBILE
===================================================== */

@media(max-width:700px){

    body{
        padding-bottom:68px;
    }

    .navbar{
        position:sticky;

        top:0;

        padding:10px 12px;
        gap:8px;
        height:64px;
    }

    .logo img{
        width:38px;
        height:38px;
    }

    .top-search{
        height:40px;
        padding:0 11px;
        border-radius:7px;
    }

    .top-search svg{
        width:18px;
        height:18px;
    }

    .top-search input{
        font-size:13px;

        margin-left:7px;
    }

    .category-bar{
        padding:18px 15px 0;
    }

    .category-list{
        gap:8px;
    }

    .category-option{
        font-size:12px;
    }

    .hero-main-cta{
        width:100%;
        padding:14px 12px;
    }

    .hero-main-cta p{
        font-size:15px;
    }

    .hero-main-cta a{
        min-height:34px;
        margin-top:7px;
        font-size:13px;
    }

    .product-modal-overlay{
        padding:12px;
    }

    .product-modal{
        grid-template-columns:minmax(0,1fr);
        grid-template-rows:auto auto auto;
        max-height:calc(100vh - 24px);
    }

    .product-modal-image{
        grid-column:1;
        grid-row:1;
        height:220px;
        min-height:220px;
    }

    .product-modal-details{
        grid-column:1;
        grid-row:2;
        padding:16px 18px 6px;
    }

    .product-modal-name{
        font-size:21px;
    }

    .product-modal-price{
        font-size:22px;
    }

    .product-modal-actions{
        grid-column:1;
        grid-row:3;
        flex-wrap:wrap;
        padding:10px 18px 18px;
    }

    .product-modal-quantity button,
    .product-modal-quantity span,
    .product-modal-actions > button{
        min-height:40px;
    }

    .product-modal-quantity{
        height:40px;
    }

    .product-modal-quantity button,
    .product-modal-quantity span{
        width:32px;
        font-size:12px;
    }

    .cart-link{
        width:40px;
        height:40px;
    }

    .cart-link svg{
        width:22px;
        height:22px;
    }

    .products-layout{
        display:block;

        padding:20px 15px 30px;
    }

    .sidebar{
        display:none;
    }

    .toolbar{
        justify-content:space-between;

        gap:7px;

        margin-bottom:15px;

        flex-wrap:wrap;
    }

    .mobile-filter-btn{
        display:block;
    }

    .sort-label{
        display:none;
    }

    select{
        padding:8px 9px;

        font-size:12px;

        max-width:150px;
    }

    .count{
        font-size:11.5px;

        margin-left:auto;
    }

    .product-grid{
        grid-template-columns:
            repeat(2,minmax(0,1fr));

        gap:10px;
    }

    .card{
        border-radius:10px;

        box-shadow:
            0 2px 8px
            rgba(0,0,0,.06);
    }

    .card:hover{
        transform:none;
    }

    .card-thumb{
        height:145px;

        padding:8px;
    }

    .card-body{
        padding:10px;

        gap:5px;
    }

    .card-name{
        font-size:12.5px;
    }

    .card-price{
        font-size:13.5px;
    }

    .card-btn{
        height:34px;

        font-size:12px;

        border-radius:7px;
    }

    .pagination{
        padding:10px 15px 30px;

        gap:5px;
    }

    .pagination button{
        width:34px;
        height:34px;

        font-size:12px;
    }

    .cart-drawer{
        width:100%;
        max-width:100%;
    }

    .cart-drawer-header{
        padding:16px 15px;
    }

    .cart-drawer-header h2{
        font-size:22px;
    }

    .cart-header-actions{
        gap:6px;
    }

    .cart-edit{
        height:32px;

        padding:0 10px;

        font-size:12px;
    }

    .cart-close{
        width:34px;
        height:34px;

        font-size:23px;
    }

    .cart-drawer-body{
        padding:15px;
    }

    .drawer-cart-item{
        padding:10px;

        gap:8px;
    }

    .drawer-cart-item img{
        width:62px;
        height:62px;
    }

    .drawer-item-checkbox{
        width:19px;
        height:19px;
    }

    .drawer-item-name{
        font-size:13px;
    }

    .drawer-item-price{
        font-size:13px;
    }

    .qty-btn{
        width:28px;
        height:28px;

        font-size:16px;
    }

    .qty-val{
        width:28px;

        font-size:13px;
    }

    .cart-drawer-footer{
        padding:14px 15px;
    }

    .cart-total-row{
        gap:8px;
    }

    .cart-total-info{
        gap:5px;
    }

    .cart-total-row strong{
        font-size:15px;
    }

    .checkout-btn,
    .delete-btn{
        height:40px;
        width: 110px;
        padding: 0;
        font-size:11.5px;
    }

    .select-all-label{
        font-size:12px;
    }

    .select-all-label input{
        width:18px;
        height:18px;
    }

    .edit-total-row{
        display:flex;

        align-items:center;

        justify-content:space-between;

        gap:8px;
    }

}


/* =====================================================
   SMALL PHONES
===================================================== */

@media(max-width:380px){

    .navbar{
        padding:9px 8px;
    }

    .logo img{
        width:34px;
        height:34px;
    }

    .cart-link{
        width:36px;
    }

    .top-search{
        height:38px;
    }

    .top-search input{
        font-size:12px;
    }

    .card-thumb{
        height:130px;
    }

    .card-body{
        padding:8px;
    }

    .card-name{
        font-size:11.5px;
    }

    .card-price{
        font-size:12.5px;
    }

    .card-btn{
        font-size:11px;

        height:32px;
    }

    body{
        padding-bottom:64px;
    }

    .mobile-bottom-nav{
        height:64px;
    }

    .mobile-bottom-nav .bottom-nav-item{
        height:64px;

        font-size:9.5px;

        gap:3px;

        padding:6px 2px;
    }

    .mobile-bottom-nav .bottom-nav-item svg{
        width:20px;
        height:20px;
    }

}


/* =====================================================
   DESKTOP
===================================================== */

@media(min-width:701px){

    .mobile-bottom-nav{
        display:none;
    }

}

`;
