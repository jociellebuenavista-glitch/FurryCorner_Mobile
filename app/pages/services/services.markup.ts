import { appNavbar, appBottomNav } from '../../legacy/app-shell';
// Page markup + CSS carried over unchanged from services.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Services - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<!-- =====================================================
     TOP NAVBAR
===================================================== -->

${appNavbar()}

<!-- =====================================================
     CART ALERT
===================================================== -->

<div class="cart-alert" id="cartAlert">

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
     CART OVERLAY
===================================================== -->

<div
    class="cart-overlay"
    id="cartOverlay"
></div>

<!-- =====================================================
     CART DRAWER
===================================================== -->

<aside
    class="cart-drawer"
    id="cartDrawer"
>

    <div class="cart-drawer-header">

        <h2>
            Cart
        </h2>

        <button
            class="cart-close"
            id="cartClose"
            aria-label="Close cart"
        >
            ×
        </button>

    </div>

    <div
        class="cart-drawer-body"
        id="cartDrawerBody"
    ></div>

    <div class="cart-drawer-footer">

        <div class="cart-total-row">

            <span>
                Total
            </span>

            <strong id="drawerTotal">
                ₱0.00
            </strong>

        </div>

        <a
            href="cart.html"
            class="view-cart-btn"
        >
            View Cart
        </a>

    </div>

</aside>

<!-- =====================================================
     MAIN
===================================================== -->

<main>

    <div class="services-container">

        <!-- SERVICE HERO -->

        <section
            class="service-hero"
            aria-label="FurryCorner PH healthcare services"
        >

            <h1 class="service-hero-title">
                One Stop for All Their Healthcare Needs
            </h1>

            <img
                src="images/service-hero.jpg"
                alt="FurryCorner PH healthcare services"
            >

        </section>

        <!-- SEARCH (moved out of the top bar so every tab page shares the same top bar) -->
<div class="top-search">

        <input
            type="text"
            id="searchInput"
            placeholder="Search for any services..."
            autocomplete="off"
        >

        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <circle cx="11" cy="11" r="7"></circle>
            <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
            ></line>
        </svg>

    </div>

<!-- FILTER BAR -->

        <div
            class="tab-bar"
            id="tabBar"
        >

            <button
                class="tab-btn active"
                data-category="All"
            >
                All Services
            </button>

            <button
                class="tab-btn"
                data-category="Grooming"
            >
                Grooming
            </button>

            <button
                class="tab-btn"
                data-category="Care"
            >
                Care
            </button>

            <button
                class="tab-btn"
                data-category="Boarding"
            >
                Boarding
            </button>

        </div>

        <!-- SERVICE GRIDS -->

        <div id="serviceGridContainer"></div>

    </div>

</main>

<!-- =====================================================
     BOOKING MODAL
===================================================== -->

<div
    class="booking-backdrop"
    id="bookingBackdrop"
>

    <div
        class="booking-modal"
        id="bookingModal"
    ></div>

</div>

<!-- =====================================================
     MOBILE BOTTOM NAVIGATION
===================================================== -->

${appBottomNav('services')}`;

export const CSS = `

/* =====================================================
   ROOT
===================================================== */

:root{
    --blue:#7BB8F0;
    --blue-dark:#5CA3E8;
    --cream:#FCE3C0;
    --cream-light:#FDEEDA;
    --ink:#1F2430;
    --white:#ffffff;
    --muted:#8b929e;
    --border:#e2e6ec;
}

/* =====================================================
   RESET
===================================================== */

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

h1,
h2,
h3,
h4,
.brand{
    font-family:'Baloo 2',cursive;
}

a{
    text-decoration:none;
    color:inherit;
}

img{
    max-width:100%;
    display:block;
}

/* =====================================================
   TOP NAVBAR
===================================================== */

.navbar{
    position:sticky;
    top:0;
    left:0;
    right:0;
    z-index:1000;
    background:var(--white);
    display:none;
    align-items:center;
    gap:20px;
    padding:12px 40px;
    box-shadow:0 2px 0 rgba(0,0,0,.04);
    transition:box-shadow .25s ease;
}

.navbar.scrolled{
    box-shadow:0 6px 18px rgba(0,0,0,.10);
}

/* =====================================================
   LOGO
===================================================== */

.logo{
    display:flex;
    align-items:center;
    justify-content:center;
    flex-shrink:0;
}

.logo img{
    width:44px;
    height:44px;
    object-fit:contain;
}

/* =====================================================
   SEARCH
===================================================== */

.top-search{
    flex:1;
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
    box-shadow:0 0 0 3px rgba(123,184,240,.15);
}

.top-search input{
    width:100%;
    border:none;
    outline:none;
    background:transparent;
    margin-left:0;
    margin-right:10px;
    font-family:'Nunito',sans-serif;
    font-size:14px;
    font-weight:600;
    color:var(--ink);
}

.top-search input::placeholder{
    color:#9ca3af;
}

.top-search svg{
    width:20px;
    height:20px;
    color:#7d8490;
    flex-shrink:0;
    order:2;
}

/* =====================================================
   SERVICES CONTAINER
===================================================== */

.services-container{
    max-width:1400px;
    margin:0 auto;
    padding:30px 40px 70px;
}

/* =====================================================
   SERVICE HERO
===================================================== */

.service-hero{
    position:relative;
    display:flex;
    justify-content:center;
    align-items:center;
    width:calc(100% + 80px);
    aspect-ratio:16 / 9;
    margin:0 -40px 34px;
    overflow:hidden;
    background:#dfe8ed;
}

.service-hero img{
    width:100%;
    height:100%;
    max-width:none;
    display:block;
    object-fit:cover;
    object-position:center;
    filter:brightness(.90);
}

.service-hero-title{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-90%);
    width:68%;
    margin:0;
    z-index:2;
    font-family:'Nunito',sans-serif;
    font-size:28px;
    line-height:1.25;
    font-weight:800;
    color:#fff;
    text-align:center;
    text-shadow:0 2px 8px rgba(0,0,0,.4);
    pointer-events:none;
}

/* =====================================================
   FILTER BAR
===================================================== */

.tab-bar{
    width:100%;
    display:flex;
    flex-wrap:nowrap;
    overflow-x:auto;
    overflow-y:hidden;
    justify-content:flex-start;
    gap:10px;
    padding:4px 2px 10px;
    margin:0 auto 24px;
    scrollbar-width:none;
    -webkit-overflow-scrolling:touch;
}

.tab-bar::-webkit-scrollbar{
    display:none;
}

.tab-btn{
    flex:0 0 auto;
    white-space:nowrap;
    padding:12px 26px;
    border-radius:999px;
    border:1.5px solid var(--border);
    background:var(--white);
    font-family:'Nunito',sans-serif;
    font-weight:800;
    font-size:14.5px;
    color:var(--ink);
    cursor:pointer;
    transition:background .2s ease,
                border-color .2s ease,
                color .2s ease;
}

.tab-btn:hover{
    border-color:var(--blue);
}

.tab-btn.active{
    background:var(--blue);
    border-color:var(--blue);
    color:var(--white);
}

/* =====================================================
   SERVICE GRID
===================================================== */

.services-grid{
    width:100%;
    max-width:760px;
    margin:0 auto;
    display:grid;
    grid-template-columns:1fr;
    gap:20px;
}

.services-grid.hidden{
    display:none;
}

/* =====================================================
   SERVICE CARD
===================================================== */

.service-card{
    width:100%;
    max-width:760px;
    margin:0 auto;
    background:white;
    border:1px solid #e7e9ee;
    border-radius:16px;
    overflow:hidden;
    box-sizing:border-box;
    display:flex;
    flex-direction:column;
    box-shadow:0 3px 12px rgba(0,0,0,.045);
    transition:transform .2s ease,
                box-shadow .2s ease;
}

.service-card:hover{
    transform:translateY(-5px);
    box-shadow:0 10px 25px rgba(0,0,0,.10);
}

/* =====================================================
   SERVICE IMAGE
===================================================== */

.service-image{
    width:100%;
    height:300px;
    background:var(--blue);
    display:flex;
    align-items:center;
    justify-content:center;
    overflow:hidden;
}

.service-image img{
    width:100%;
    height:100%;
    object-fit:cover;
    display:block;
}

/* =====================================================
   SERVICE BODY
===================================================== */

.service-body{
    width:100%;
    box-sizing:border-box;
    padding:16px 18px 18px;
    display:flex;
    flex-direction:column;
}

/* =====================================================
   SERVICE INFO
===================================================== */

.service-info{
    width:100%;
    min-width:0;
    margin:0 0 16px;
    padding:0 0 14px;
    border-bottom:1px solid #e5e7eb;
    box-sizing:border-box;
}

.service-name{
    font-size:17px;
    font-weight:800;
    color:#252a31;
    line-height:1.25;
    margin-bottom:7px;
    overflow-wrap:anywhere;
}

.service-meta{
    width:100%;
    display:flex;
    align-items:center;
    justify-content:space-between;
    gap:12px;
    font-size:13px;
    font-weight:700;
    color:#6f7782;
}

.service-meta span:first-child{
    min-width:0;
}

.service-meta span:last-child{
    flex:0 0 auto;
    color:#252a31;
    font-size:14px;
    font-weight:800;
}

/* =====================================================
   BOOK BUTTON
===================================================== */

.book-btn{
    width:100%;
    height:42px;
    display:flex;
    align-items:center;
    justify-content:center;
    box-sizing:border-box;
    border:none;
    border-radius:8px;
    background:var(--blue);
    color:white;
    font-family:'Nunito',sans-serif;
    font-size:13px;
    font-weight:800;
    cursor:pointer;
    transition:background .2s ease;
}

.book-btn:hover{
    background:var(--blue-dark);
}

/* =====================================================
   BOOKING MODAL
===================================================== */

.booking-backdrop{
    position:fixed;
    inset:0;
    background:rgba(31,36,48,.5);
    z-index:5000;
    display:none;
    align-items:center;
    justify-content:center;
    padding:20px;
}

.booking-backdrop.open{
    display:flex;
}

.booking-modal{
    background:var(--white);
    width:100%;
    max-width:460px;
    border-radius:16px;
    padding:30px 30px 28px;
    box-shadow:0 24px 60px rgba(0,0,0,.25);
    max-height:90vh;
    overflow-y:auto;
}

.booking-header{
    display:flex;
    align-items:flex-start;
    justify-content:space-between;
    gap:12px;
    margin-bottom:20px;
}

.booking-service-info{
    display:flex;
    align-items:center;
    gap:14px;
}

.booking-service-thumb{
    width:56px;
    height:56px;
    border-radius:10px;
    overflow:hidden;
    background:var(--cream-light);
    flex-shrink:0;
}

.booking-service-thumb img{
    width:100%;
    height:100%;
    object-fit:cover;
}

.booking-service-name{
    font-weight:800;
    font-size:16px;
}

.booking-service-price{
    font-weight:700;
    font-size:13.5px;
    color:var(--blue-dark);
}

.booking-close{
    background:none;
    border:none;
    cursor:pointer;
    flex-shrink:0;
}

.booking-close svg{
    width:22px;
    height:22px;
    color:var(--ink);
}

.booking-label{
    font-size:12px;
    font-weight:800;
    color:var(--muted);
    text-transform:uppercase;
    letter-spacing:.03em;
    margin-bottom:8px;
    display:block;
}

.booking-field{
    width:100%;
    padding:13px 16px;
    border:1.5px solid var(--border);
    border-radius:8px;
    font-family:'Nunito',sans-serif;
    font-size:14.5px;
    font-weight:600;
    color:var(--ink);
    outline:none;
    margin-bottom:18px;
}

.booking-field:focus{
    border-color:var(--blue);
}

.booking-address-detail{
    margin:-8px 0 14px;
    padding:10px 12px;
    border-radius:8px;
    background:var(--cream-light);
    color:var(--ink);
    font-size:13px;
    font-weight:700;
    line-height:1.5;
}

.booking-address-confirm{
    display:flex;
    align-items:flex-start;
    gap:9px;
    margin:0 0 8px;
    color:var(--ink);
    font-size:13px;
    font-weight:700;
}

.booking-address-confirm input{
    width:17px;
    height:17px;
    flex:0 0 auto;
    margin-top:2px;
    accent-color:var(--blue-dark);
}

.booking-address-link{
    display:inline-block;
    margin-bottom:14px;
    color:var(--blue-dark);
    font-size:12px;
    font-weight:800;
}

.time-slots{
    display:grid;
    grid-template-columns:repeat(3,1fr);
    gap:10px;
    margin-bottom:18px;
}

.time-slot{
    padding:10px 6px;
    border-radius:8px;
    border:1.5px solid var(--border);
    background:var(--white);
    font-family:'Nunito',sans-serif;
    font-weight:700;
    font-size:13px;
    cursor:pointer;
    text-align:center;
    transition:background .2s ease,
                border-color .2s ease,
                color .2s ease;
}

.time-slot:hover{
    border-color:var(--blue);
}

.time-slot.active{
    background:var(--cream-light);
    border-color:var(--blue);
    color:var(--blue-dark);
}

.booking-submit{
    width:100%;
    height:50px;
    border-radius:10px;
    border:none;
    background:var(--blue);
    color:var(--white);
    font-family:'Nunito',sans-serif;
    font-weight:800;
    font-size:15.5px;
    cursor:pointer;
    margin-top:4px;
}

.booking-submit:hover{
    background:var(--blue-dark);
}

.booking-submit:disabled{
    background:#cbd2db;
    cursor:not-allowed;
}

.booking-note-text{
    font-size:12.5px;
    color:var(--muted);
    font-weight:600;
    margin-top:12px;
    text-align:center;
}

.booking-confirmed{
    text-align:center;
    padding:10px 0 6px;
}

.booking-confirmed svg{
    width:56px;
    height:56px;
    color:#3fb27f;
    margin:0 auto 16px;
}

.booking-confirmed h3{
    font-size:20px;
    margin-bottom:8px;
}

.booking-confirmed p{
    font-size:14.5px;
    color:var(--muted);
    font-weight:600;
    margin-bottom:4px;
}

.booking-confirmed .summary{
    background:var(--cream-light);
    border-radius:10px;
    padding:14px 16px;
    margin:18px 0;
    text-align:left;
    font-size:14px;
    font-weight:700;
}

.booking-confirmed .summary div{
    margin-bottom:4px;
}

.booking-done-btn{
    width:100%;
    height:48px;
    border-radius:10px;
    border:none;
    background:var(--blue);
    color:var(--white);
    font-family:'Nunito',sans-serif;
    font-weight:800;
    font-size:15px;
    cursor:pointer;
}

.booking-done-btn:hover{
    background:var(--blue-dark);
}

/* =====================================================
   CART ALERT
===================================================== */

.cart-alert{
    position:fixed;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%) scale(.85);
    background:white;
    width:360px;
    max-width:90vw;
    padding:25px;
    border-radius:18px;
    box-shadow:0 15px 45px rgba(0,0,0,.20);
    border:2px solid var(--blue);
    z-index:5000;
    opacity:0;
    visibility:hidden;
    transition:.25s ease;
    text-align:center;
}

.cart-alert.show{
    opacity:1;
    visibility:visible;
    transform:translate(-50%,-50%) scale(1);
}

.cart-alert-icon{
    width:55px;
    height:55px;
    margin:0 auto 12px;
    border-radius:50%;
    background:var(--blue);
    color:white;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:27px;
    font-weight:800;
}

.cart-alert h3{
    font-size:22px;
    margin-bottom:5px;
}

.cart-alert p{
    font-size:14px;
    font-weight:600;
    opacity:.7;
}

/* =====================================================
   CART OVERLAY
===================================================== */

.cart-overlay{
    position:fixed;
    inset:0;
    background:rgba(31,36,48,.35);
    backdrop-filter:blur(2px);
    z-index:3000;
    opacity:0;
    visibility:hidden;
    transition:.25s ease;
}

.cart-overlay.open{
    opacity:1;
    visibility:visible;
}

/* =====================================================
   CART DRAWER
===================================================== */

.cart-drawer{
    position:fixed;
    top:0;
    right:0;
    width:390px;
    max-width:90vw;
    height:100vh;
    background:var(--cream-light);
    z-index:3001;
    display:flex;
    flex-direction:column;
    transform:translateX(100%);
    transition:transform .3s ease;
    box-shadow:-8px 0 30px rgba(0,0,0,.15);
}

.cart-drawer.open{
    transform:translateX(0);
}

.cart-drawer-header{
    background:var(--blue-dark);
    color:white;
    padding:22px 24px;
    display:flex;
    align-items:center;
    justify-content:space-between;
}

.cart-drawer-header h2{
    font-size:24px;
}

.cart-close{
    width:36px;
    height:36px;
    border:2px solid rgba(255,255,255,.7);
    border-radius:50%;
    background:transparent;
    color:white;
    font-size:25px;
    line-height:1;
    cursor:pointer;
}

.cart-drawer-body{
    flex:1;
    overflow-y:auto;
    padding:20px;
}

.drawer-cart-item{
    background:white;
    border-radius:14px;
    padding:12px;
    margin-bottom:12px;
    display:flex;
    gap:12px;
    box-shadow:0 3px 10px rgba(0,0,0,.06);
}

.drawer-cart-item img{
    width:70px;
    height:70px;
    border-radius:10px;
    background:var(--blue);
    object-fit:contain;
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

.drawer-item-quantity{
    font-size:13px;
    font-weight:700;
    opacity:.7;
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

.cart-drawer-footer{
    background:white;
    padding:20px;
    border-top:1px solid #eee;
}

.cart-total-row{
    display:flex;
    align-items:center;
    justify-content:space-between;
    margin-bottom:15px;
    font-size:16px;
    font-weight:800;
}

.cart-total-row strong{
    color:var(--blue-dark);
}

.view-cart-btn{
    width:100%;
    height:44px;
    border-radius:9px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-family:'Nunito',sans-serif;
    font-size:14px;
    font-weight:800;
    cursor:pointer;
    background:var(--blue-dark);
    color:white;
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
    box-shadow:0 -4px 15px rgba(0,0,0,.08);
    z-index:4000;
    display:grid;
    grid-template-columns:repeat(4,1fr);
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

/* =====================================================
   NOTIFICATION BADGE
   SAME POSITION AS NOTIF.HTML
===================================================== */

.bottom-notif-badge{
    position:absolute;
    top:6px;
    right:50%;
    transform:translateX(12px);

    min-width:16px;
    height:16px;
    padding:0 4px;

    display:flex;
    align-items:center;
    justify-content:center;

    border-radius:50%;
    background:#e0685f;
    color:white;

    font-family:'Nunito',sans-serif;
    font-size:9px;
    font-weight:800;
    line-height:1;

    z-index:2;
}

/* =====================================================
   TABLET
===================================================== */

@media(max-width:1000px){

    .services-container{
        padding-left:25px;
        padding-right:25px;
    }

    .services-grid{
        width:100%;
        align-items:center;
    }
}

/* =====================================================
   MOBILE
===================================================== */

@media(max-width:700px){

    body{
        padding-bottom:68px;
    }

    /* NAVBAR */

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
        margin-left:0;
        margin-right:7px;
    }

    /* SERVICES */

    .services-container{
        width:100%;
        box-sizing:border-box;
        padding:0 14px 35px;
        overflow-x:hidden;
    }

    /* HERO */

    .service-hero{
        width:calc(100% + 28px);
        margin-left:-14px;
        margin-right:-14px;
        margin-bottom:24px;
    }

    .service-hero img{
        width:100%;
        max-width:430px;
    }

    .service-hero-title{
        top:50%;
        width:62%;
        font-size:30px;
        line-height:1.2;
    }

    /* FILTER */

    .tab-bar{
        width:calc(100% + 28px);
        margin-left:-14px;
        margin-right:-14px;
        padding-left:14px;
        padding-right:14px;
        gap:8px;
        margin-bottom:18px;
    }

    .tab-btn{
        padding:9px 16px;
        font-size:13px;
        flex:0 0 auto;
    }

    /* SERVICE GRID */

    .services-grid{
        width:100%;
        max-width:500px;
        grid-template-columns:1fr;
        gap:16px;
        justify-items:stretch;
    }

    .service-card{
        width:100%;
        max-width:500px;
        min-width:0;
        margin:0 auto;
        border-radius:12px;
    }

    .service-image{
        height:220px;
    }

    .service-body{
        padding:14px 14px 15px;
    }

    .service-info{
        margin-bottom:13px;
        padding-bottom:12px;
    }

    .service-name{
        font-size:15px;
        margin-bottom:6px;
    }

    .service-meta{
        font-size:11.5px;
        gap:8px;
    }

    .service-meta span:last-child{
        font-size:13px;
    }

    .book-btn{
        height:38px;
        font-size:12px;
    }

    /* CART */

    .cart-drawer{
        width:100%;
        max-width:100%;
    }

    /* MOBILE NAV */

    .mobile-bottom-nav{
        height:68px;
    }

    .mobile-bottom-nav .bottom-nav-item{
        height:68px;
        font-size:10px;
    }

    .mobile-bottom-nav .bottom-nav-item svg{
        width:20px;
        height:20px;
    }

    
}

/* =====================================================
   SMALL PHONES
===================================================== */

@media(max-width:420px){

    .services-container{
        padding-left:12px;
        padding-right:12px;
    }

    .tab-bar{
        width:calc(100% + 24px);
        margin-left:-12px;
        margin-right:-12px;
        padding-left:12px;
        padding-right:12px;
    }

    .services-grid{
        width:100%;
        max-width:360px;
        margin-left:auto;
        margin-right:auto;
        gap:14px;
    }

    .service-card{
        width:100%;
        max-width:360px;
    }

    .service-image{
        height:190px;
    }

    .service-body{
        padding:12px;
    }

    .service-name{
        font-size:14px;
    }

    .service-meta{
        font-size:10.5px;
    }

    .service-meta span:last-child{
        font-size:12px;
    }

    .book-btn{
        height:36px;
        font-size:11px;
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
    }

    .mobile-bottom-nav .bottom-nav-item svg{
        width:20px;
        height:20px;
    }

    .service-hero-title{
        top:50%;
        width:64%;
        font-size:20px;
    }

    .service-hero img{
        width:100%;
        max-width:none;
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
