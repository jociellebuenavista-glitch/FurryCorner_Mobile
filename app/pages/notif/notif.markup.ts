import { appNavbar, appBottomNav } from '../../legacy/app-shell';
// Page markup + CSS carried over unchanged from notif.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Notifications - FurryCorner`;
export const BODY_CLASS = `page-notif`;

export const HTML = `<!-- =====================================================
     TOP NAVBAR
===================================================== -->

${appNavbar('Notifications')}


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
     NOTIFICATIONS
===================================================== -->

<main class="notif-page">

    <div class="notif-page-header">

        <button
            class="notif-mark-read"
            id="notifMarkAllRead">

            Mark all as read

        </button>

    </div>


    <div class="notif-tabs" id="notifTabs" role="tablist">

        <button
            class="notif-tab active"
            data-filter="all"
            type="button">

            All

            <span
                class="tab-count"
                id="tabCountAll">
                0
            </span>

        </button>

        <button
            class="notif-tab"
            data-filter="unread"
            type="button">

            Unread

        </button>

        <button
            class="notif-tab"
            data-filter="read"
            type="button">

            Read

        </button>

    </div>


    <div class="notif-panel">

        <div
            class="notif-list"
            id="notifList">
        </div>

    </div>

</main>


<!-- =====================================================
     MOBILE BOTTOM NAVIGATION
===================================================== -->

${appBottomNav('notifications')}`;

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
    padding-bottom:88px;
}

main{
    background:var(--cream);
    min-height:70vh;
}

h1,h2,h3,h4,.brand{
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

    display:flex;
    align-items:center;
    gap:20px;

    padding:12px 40px;

    box-shadow:0 2px 0 rgba(0,0,0,.04);

    transition:box-shadow .25s ease;
}

.navbar.scrolled{
    box-shadow:0 6px 18px rgba(0,0,0,.10);
}

.navbar-title{
    flex:1;

    font-size:29px;

    color:var(--blue-dark);
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
   NOTIFICATIONS PAGE
===================================================== */

.notif-page{
    max-width:640px;

    margin:0 auto;

    padding:28px 20px 40px;
}

.notif-panel{
    background:white;

    border-radius:14px;

    box-shadow:0 5px 18px rgba(31,36,48,.07);

    overflow:hidden;
}

.notif-page-header{
    display:flex;

    justify-content:flex-end;

    margin-bottom:14px;
}


/* =====================================================
   FILTER TABS
===================================================== */

.notif-tabs{
    display:flex;

    gap:10px;

    margin-bottom:16px;
}

.notif-tab{
    flex:1 1 0;

    min-width:0;
    min-height:46px;

    display:flex;

    align-items:center;
    justify-content:center;

    gap:8px;

    padding:10px 8px;

    border:1.5px solid var(--border);
    border-radius:999px;

    background:var(--white);

    color:var(--ink);

    font-family:'Nunito',sans-serif;
    font-size:13px;
    font-weight:800;

    cursor:pointer;

    transition:
        background .2s ease,
        border-color .2s ease,
        color .2s ease;
}

.notif-tab:hover,
.notif-tab.active{
    border-color:var(--blue);
    background:var(--blue);
    color:var(--white);
}

.tab-count{
    display:flex;

    align-items:center;
    justify-content:center;

    min-width:22px;
    height:22px;

    padding:0 6px;

    border-radius:50%;

    background:var(--ink);
    color:white;

    font-size:12px;
    font-weight:800;
}

.notif-mark-read{
    background:none;

    border:none;

    cursor:pointer;

    font-size:13px;

    font-weight:800;

    color:var(--blue-dark);

    text-decoration:underline;
}

.notif-list{
    display:flex;
    flex-direction:column;
}

.notif-item{
    display:flex;

    align-items:flex-start;

    gap:14px;

    padding:18px 22px;

    border-bottom:1px solid #f2f2f2;

    position:relative;

    cursor:pointer;
}

.notif-item:last-child{
    border-bottom:none;
}

.notif-item.unread{
    background:#eef0f2;
}

.notif-icon{
    width:46px;
    height:46px;

    border-radius:50%;

    flex-shrink:0;

    display:flex;

    align-items:center;
    justify-content:center;
}

.notif-icon.payment{
    background:#e5f5ec;
    color:#2f9e63;
}

.notif-icon.booking{
    background:#e8f1fd;
    color:var(--blue-dark);
}

.notif-icon svg{
    width:21px;
    height:21px;
}

.notif-body{
    flex:1;
    min-width:0;
}

.notif-title{
    font-weight:800;

    font-size:15px;

    line-height:1.35;

    margin-bottom:6px;

    color:var(--blue-dark);
}

.notif-meta{
    display:flex;

    align-items:center;

    gap:6px;

    font-size:12.5px;

    color:#9aa1ad;

    font-weight:700;
}

.notif-meta .dot-sep{
    width:3px;
    height:3px;

    border-radius:50%;

    background:#9aa1ad;
}

.notif-unread-dot{
    width:9px;
    height:9px;

    border-radius:50%;

    background:var(--blue-dark);

    flex-shrink:0;

    margin-top:5px;
}

.notif-empty{
    text-align:center;

    padding:60px 20px;

    color:#9aa1ad;

    font-weight:700;
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

    /* FurryCorner text styling */
    font-family:'Baloo 2',cursive;
    font-size:11px;
    font-weight:800;
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
   RESPONSIVE
===================================================== */

@media(max-width:700px){

    .navbar{
        padding:10px 16px;
    }

    .navbar-title{
        font-size:21px;
    }

    .notif-page{
        padding:18px 12px 30px;
    }
}

@media(max-width:380px){

    .navbar{
        padding:9px 8px;
    }

    .cart-link{
        width:36px;
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

@media(min-width:701px){

    .mobile-bottom-nav{
        display:none;
    }

    body{
        padding-bottom:0;
    }
}


/* =====================================================
   CART DRAWER
===================================================== */

.cart-overlay{
    position:fixed;

    inset:0;

    background:
        rgba(31,36,48,.35);

    backdrop-filter:blur(2px);

    z-index:5000;

    opacity:0;
    visibility:hidden;

    transition:.25s ease;
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


@media(max-width:700px){

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
`;
