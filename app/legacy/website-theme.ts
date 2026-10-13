/*
 * Website theme for the mobile app.
 *
 * Loaded by LegacyPage AFTER each page's own CSS so it restyles every page to match the FurryCorner website
 * (light-blue page background, white blurred top bar, rounded cards with soft shadows, gradient blue buttons,
 * Baloo 2 / Nunito type). It only changes how things look: no markup, links, buttons or scripts are removed.
 * Selectors start with "html body" so they win over the per-page styles without needing !important everywhere.
 */
export const WEBSITE_THEME_CSS = `
:root{
  --blue:#7BB8F0;
  --blue-dark:#5CA3E8;
  --blue-deep:#3D7DC9;
  --blue-light:#EAF4FD;
  --blue-light-2:#DCEDFB;
  --cream:#FCE3C0;
  --cream-light:#FDEEDA;
  --ink:#1F2430;
  --muted:#667085;
  --muted-soft:#8B94A3;
  --radius-sm:10px;
  --radius-md:16px;
  --radius-lg:22px;
  --shadow-sm:0 4px 14px rgba(31,42,68,.07);
  --shadow-md:0 10px 28px rgba(31,42,68,.10);
  --shadow-lg:0 18px 40px rgba(31,42,68,.16);
}

/* ---------- page base ---------- */
html body{
  font-family:'Nunito',sans-serif;
  color:var(--ink);
  background:var(--blue-light) !important;
  -webkit-font-smoothing:antialiased;
}
html body main,
html body .products-layout,
html body .products-content,
html body .category-bar,
html body .page,
html body .wrap,
html body .container{ background-color:transparent; }
html body h1,html body h2,html body h3,html body h4,html body .brand{
  font-family:'Baloo 2',cursive;
  letter-spacing:-0.01em;
}
html body ::selection{ background:var(--blue); color:#fff; }

/* ---------- top bar (website: white, blurred, soft shadow, logo on the left) ---------- */
html body .navbar{
  background:rgba(255,255,255,.92);
  -webkit-backdrop-filter:blur(10px);
  backdrop-filter:blur(10px);
  box-shadow:0 1px 0 rgba(31,42,68,.06);
  transition:box-shadow .25s ease;
}
html body .navbar.scrolled{ box-shadow:var(--shadow-sm); }
html body .navbar .logo{
  position:static;
  left:auto;
  transform:none;
  margin-left:50px;               /* leaves room for the menu button */
  box-shadow:none;
}
html body .navbar .logo img{ width:44px; height:44px; object-fit:contain; }
html body .navbar a{ box-shadow:none; }
html body .cart-link{ color:var(--ink); border-radius:var(--radius-sm); }
html body .cart-link:hover{ background:var(--blue-light); }
html body .cart-badge{ background:var(--blue-dark); border:2px solid #fff; }

/* menu button + side menu (injected on every page) */
html body .furry-menu-button{
  background:#fff;
  border:1px solid rgba(31,42,68,.08);
  border-radius:var(--radius-sm);
  box-shadow:var(--shadow-sm);
}
html body .furry-menu-button span{ background:var(--blue-dark); }
html body .furry-menu-panel{
  background:#fff;
  border-radius:0 var(--radius-lg) var(--radius-lg) 0;
  box-shadow:var(--shadow-lg);
}
html body .furry-menu-item{
  border-radius:var(--radius-sm);
  font-family:'Nunito',sans-serif;
  font-weight:700;
}
html body .furry-menu-item:hover{ background:var(--blue-light); }
html body .furry-menu-title{ color:var(--muted); }


/* splash screen */
html body .splash-screen{ background:var(--blue-light); }
html body .splash-title{ color:var(--blue-deep); }

/* ---------- hero (home) ---------- */
html body .hero-main{ background:var(--cream); }
html body .hero-main-overlay h1{
  color:var(--blue-deep);
  font-weight:800;
  line-height:1.1;
  text-shadow:0 2px 0 rgba(255,255,255,.7);
}
html body .hero-main-cta{
  background:#fff;
  box-shadow:var(--shadow-sm);
}
html body .hero-main-cta p{ color:var(--ink); font-weight:700; }
html body .hero-main-cta a,
html body .btn,
html body .primary-btn,
html body .checkout-btn,
html body .apply-filter-btn,
html body .guest-cart-signin{
  background:linear-gradient(135deg,var(--blue),var(--blue-dark));
  color:#fff;
  border:none;
  border-radius:var(--radius-sm);
  font-weight:800;
  box-shadow:0 10px 24px rgba(92,163,232,.35);
  transition:box-shadow .2s ease, transform .2s ease;
}
html body .hero-main-cta a:active,
html body .btn:active,
html body .checkout-btn:active{ transform:translateY(1px); }

/* ---------- search ---------- */
html body .top-search{
  background:#fff;
  border:1.5px solid rgba(31,42,68,.08);
  border-radius:var(--radius-md);
  box-shadow:var(--shadow-sm);
}
html body .top-search:focus-within{
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(123,184,240,.2);
}

/* ---------- category chips / filter / sort ---------- */
html body .category-heading h2{ font-size:24px; font-weight:700; }
html body .category-option{
  background:#fff;
  border:1.5px solid rgba(31,42,68,.08);
  box-shadow:var(--shadow-sm);
  font-weight:800;
}
html body .category-option:hover,
html body .category-option.active{
  background:linear-gradient(135deg,var(--blue),var(--blue-dark));
  border-color:transparent;
  color:#fff;
}
html body .category-filter-btn,
html body .category-sort-btn,
html body .category-sort-select,
html body .mobile-filter-btn{
  background:#fff;
  border:1.5px solid rgba(31,42,68,.08);
  border-radius:var(--radius-sm);
  box-shadow:var(--shadow-sm);
}
html body .count,
html body .sort-label{ color:var(--muted); font-weight:700; }

/* ---------- product cards (website: white image panel, category/name/price, blue button) ---------- */
html body .card{
  background:#fff;
  border-radius:var(--radius-md);
  overflow:hidden;
  box-shadow:var(--shadow-sm);
  border:0;
  transition:box-shadow .22s ease, transform .22s ease;
}
html body .card:active{ box-shadow:var(--shadow-md); }
html body .card-thumb{
  background:#fff;
  aspect-ratio:1/1;
  padding:10px;
  overflow:hidden;
}
html body .card-thumb img{ width:100%; height:100%; object-fit:contain; }
html body .card-body{ padding:14px; gap:4px; }
html body .card-name{ font-size:14px; font-weight:700; color:var(--ink); }
html body .card-description{ color:var(--muted-soft); font-size:12px; font-weight:700; }
html body .card-price{ color:var(--blue-dark); font-size:13.5px; font-weight:800; }
html body .card-btn{
  background:var(--blue);
  color:#fff;
  border:none;
  border-radius:var(--radius-sm);
  font-weight:700;
  height:36px;
  transition:background .18s ease, transform .18s ease;
}
html body .card-btn:hover,
html body .card-btn:active{ background:var(--blue-dark); }
html body .pagination button{
  background:#fff;
  border:1.5px solid rgba(31,42,68,.08);
  border-radius:var(--radius-sm);
  box-shadow:var(--shadow-sm);
}
html body .pagination button.active{
  background:linear-gradient(135deg,var(--blue),var(--blue-dark));
  color:#fff;
  border-color:transparent;
}

/* ---------- drawers, modals, sheets ---------- */
html body .cart-drawer,
html body .mobile-filter-panel,
html body .sort-modal,
html body .product-modal{
  background:#fff;
  box-shadow:var(--shadow-lg);
}
html body .sort-modal,
html body .product-modal{ border-radius:var(--radius-lg); }
html body .mobile-filter-panel{ border-radius:var(--radius-lg) var(--radius-lg) 0 0; }
html body .cart-drawer-header h2,
html body .mobile-filter-header h3,
html body .sort-modal-header h2{ font-family:'Baloo 2',cursive; }
html body .drawer-cart-item{ border-radius:var(--radius-md); }
html body .product-modal-add,
html body .product-modal-buy{ border-radius:var(--radius-sm); font-weight:800; }
html body .product-modal-price{ color:var(--blue-dark); }

/* ---------- bottom tab bar ---------- */
html body .mobile-bottom-nav{
  background:rgba(255,255,255,.95);
  -webkit-backdrop-filter:blur(10px);
  backdrop-filter:blur(10px);
  border-top:1px solid rgba(31,42,68,.06);
  box-shadow:0 -6px 18px rgba(31,42,68,.08);
}
html body .mobile-bottom-nav .bottom-nav-item{ color:var(--muted-soft); font-family:'Nunito',sans-serif; }
html body .mobile-bottom-nav .bottom-nav-item.active,
html body .mobile-bottom-nav .bottom-nav-item.active:hover{ color:var(--blue-dark); }
html body .mobile-bottom-nav .bottom-notif-badge{ background:var(--blue-dark); }

/* ---------- services page ---------- */
html body .filter-chip,
html body .service-tab,
html body .pill,
html body .chip{
  background:#fff;
  border:1.5px solid rgba(31,42,68,.08);
  border-radius:999px;
  box-shadow:var(--shadow-sm);
  font-weight:800;
}
html body .filter-chip.active,
html body .service-tab.active,
html body .pill.active,
html body .chip.active{
  background:linear-gradient(135deg,var(--blue),var(--blue-dark));
  color:#fff;
  border-color:transparent;
}
html body .service-card{
  background:#fff;
  border:1px solid rgba(31,42,68,.06);
  border-radius:var(--radius-lg);
  box-shadow:0 6px 20px rgba(31,36,48,.07);
  overflow:hidden;
}
html body .service-card .service-body,
html body .service-card .service-info{ background:#fff; }

/* ---------- generic cards, forms and sections used by the other pages ---------- */
html body .panel,
html body .card-box,
html body .section-card,
html body .settings-card,
html body .auth-card,
html body .signin-card,
html body .form-card,
html body .profile-card,
html body .order-card,
html body .summary-card,
html body .address-card,
html body .payment-card,
html body .notif-card,
html body .help-card,
html body .policy-card{
  background:#fff;
  border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);
}
html body input[type="text"],
html body input[type="email"],
html body input[type="password"],
html body input[type="tel"],
html body input[type="number"],
html body input[type="search"],
html body select,
html body textarea{
  font-family:'Nunito',sans-serif;
  border-radius:var(--radius-sm);
  border:1.5px solid rgba(31,42,68,.12);
  background:#fff;
}
/* inputs that live inside a styled wrapper keep the wrapper's look */
html body .top-search input,
html body .top-search input:focus{
  border:none;
  box-shadow:none;
  background:transparent;
  border-radius:0;
}
html body input:focus,
html body select:focus,
html body textarea:focus{
  outline:none;
  border-color:var(--blue);
  box-shadow:0 0 0 3px rgba(123,184,240,.2);
}
html body button[type="submit"],
html body .submit-btn,
html body .save-btn,
html body .continue-btn,
html body .place-order,
html body .place-order-btn,
html body .primary{
  background:linear-gradient(135deg,var(--blue),var(--blue-dark));
  color:#fff;
  border:none;
  border-radius:var(--radius-sm);
  font-weight:800;
  box-shadow:0 10px 24px rgba(92,163,232,.30);
}
html body a{ color:inherit; }
html body a:focus-visible,
html body button:focus-visible,
html body input:focus-visible{ outline:2px solid var(--blue-deep); outline-offset:2px; }
/* =====================================================
   SAFE AREAS  (status bar on top, gesture bar at the bottom)
   --sat / --sab are measured and set on <html> by initSafeArea(); the values below are only the CSS-only default.
===================================================== */
:root{
  --sat:max(env(safe-area-inset-top,0px),var(--safe-area-inset-top,0px));
  --sab:max(env(safe-area-inset-bottom,0px),var(--safe-area-inset-bottom,0px));
  --paws:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 24 24'%3E%3Cg fill='%23b9c4d0' fill-opacity='.28'%3E%3Cellipse cx='12' cy='15.5' rx='4.2' ry='3.6'/%3E%3Ccircle cx='6.2' cy='10.2' r='1.8'/%3E%3Ccircle cx='9.8' cy='6.8' r='1.8'/%3E%3Ccircle cx='14.2' cy='6.8' r='1.8'/%3E%3Ccircle cx='17.8' cy='10.2' r='1.8'/%3E%3C/g%3E%3C/svg%3E");
}
/* Reserve the status-bar height at the very top of every page. Pages whose first element is a sticky top bar
   pull that bar up over this space (negative margin) so the bar's white background reaches the top of the screen. */
html body{ padding-top:var(--sat); }
html body .navbar,
html body .site-header{ margin-top:calc(-1 * var(--sat)); }

html body .navbar{
  box-sizing:border-box;
  height:auto;
  min-height:calc(64px + var(--sat));
  padding-top:calc(var(--sat) + 10px);
  padding-bottom:10px;
}

/* bottom tabs: lift above the gesture bar and give the page room to scroll past them */
@media(max-width:700px){
  html body:has(.mobile-bottom-nav){ padding-bottom:calc(72px + var(--sab)); }
}
html body .mobile-bottom-nav{
  box-sizing:border-box;
  height:auto;
  padding-bottom:var(--sab);
}
html body .mobile-bottom-nav .bottom-nav-item{ font-size:10.5px; }

/* slide-in panels also start below the status bar */
html body .cart-drawer-header{ padding-top:calc(var(--sat) + 16px); }
html body .cart-drawer-footer{ padding-bottom:calc(14px + var(--sab)); }

/* ---------- bottom tab "Sign in" / "Me" (icon is always kept) ---------- */
html body .mobile-bottom-nav .bottom-nav-item svg{ display:block; }

/* =====================================================
   INFO + SETTINGS PAGES (menu pages)
   Language, Notifications, Privacy Settings, Help Centre, Community Rules and FurryCorner Policies all share
   this header, intro band and page background, so they look like one family.
===================================================== */
html body .site-header{
  position:sticky;
  top:0;
  z-index:900;
  padding-top:var(--sat);
  background:rgba(255,255,255,.92);
  -webkit-backdrop-filter:blur(10px);
  backdrop-filter:blur(10px);
  border-bottom:0;
  box-shadow:0 1px 0 rgba(31,42,68,.06),0 4px 14px rgba(31,42,68,.05);
}
html body .site-header .header-inner{
  width:min(100% - 24px,1080px);
  min-height:60px;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}
html body .site-header .brand{
  display:flex;
  align-items:center;
  gap:9px;
  color:var(--blue-dark);
  font-size:21px;
  font-weight:800;
  line-height:1;
  white-space:nowrap;
}
html body .site-header .brand img{ width:36px; height:36px; object-fit:contain; }
html body .site-header .back-link{
  display:inline-flex;
  align-items:center;
  gap:7px;
  padding:8px 12px;
  border-radius:var(--radius-sm);
  color:var(--blue-dark);
  font-weight:800;
  white-space:nowrap;
}
html body .site-header .back-link:hover{ background:var(--blue-light); }
html body .intro-band{
  background:
    var(--paws) 0 0 / 120px 120px,
    linear-gradient(135deg,var(--blue) 0%,var(--blue-dark) 100%);
  border-radius:0 0 26px 26px;
  padding:30px 18px 38px;
}
html body .intro-band h1{ color:var(--ink); font-weight:800; }
html body .intro-band .eyebrow{ color:#1f4d7d; letter-spacing:.08em; }
html body .intro-band p:not(.eyebrow){ color:#1f3550; }
html body .faq-section,
html body .section{ border-bottom-color:rgba(31,42,68,.10); }
html body .faq-item,
html body .policy-section,
html body .rules-list li{ border-top-color:rgba(31,42,68,.10); }
html body .policy-section:last-child{ border-bottom-color:rgba(31,42,68,.10); }
html body .site-footer{ background:#fff; border-top:1px solid rgba(31,42,68,.06); }
/* settings pages: white card that overlaps the intro band */
html body .content.settings-content{ padding:0 0 40px; margin-top:-20px; position:relative; }
html body .settings-panel{
  background:#fff;
  border-radius:var(--radius-lg);
  padding:6px 18px;
  box-shadow:var(--shadow-md);
}

/* =====================================================
   NOTIFICATIONS PAGE  (layout of notif.html, website styling)
===================================================== */
html body.page-notif .notif-page{ max-width:640px; margin:0 auto; padding:16px 14px 28px; }
html body.page-notif .notif-page-header{ justify-content:flex-end; align-items:center; gap:12px; margin-bottom:14px; }
html body.page-notif .notif-heading h1{ font-size:26px; font-weight:800; line-height:1.1; color:var(--ink); margin:0; }
html body.page-notif .notif-heading p{ margin:2px 0 0; color:var(--muted); font-size:13px; font-weight:700; }
html body.page-notif .notif-mark-read{
  flex:0 0 auto;
  padding:7px 14px;
  border:1.5px solid rgba(31,42,68,.08);
  border-radius:999px;
  background:#fff;
  box-shadow:var(--shadow-sm);
  color:var(--blue-deep);
  font-family:'Nunito',sans-serif;
  font-size:12.5px;
  font-weight:800;
  text-decoration:none;
}
html body.page-notif .notif-mark-read:active{ background:var(--blue-light); }
html body.page-notif .notif-tabs{ gap:8px; margin-bottom:14px; }
html body.page-notif .notif-tab{
  min-height:44px;
  border:1.5px solid rgba(31,42,68,.08);
  background:#fff;
  box-shadow:var(--shadow-sm);
  color:var(--ink);
  font-weight:800;
}
html body.page-notif .notif-tab:hover{ background:#fff; color:var(--ink); border-color:rgba(31,42,68,.08); }
html body.page-notif .notif-tab.active,
html body.page-notif .notif-tab.active:hover{
  background:linear-gradient(135deg,var(--blue),var(--blue-dark));
  border-color:transparent;
  color:#fff;
  box-shadow:0 8px 18px rgba(92,163,232,.35);
}
html body.page-notif .tab-count{ background:var(--blue-light); color:var(--blue-deep); }
html body.page-notif .notif-tab.active .tab-count{ background:#fff; color:var(--blue-deep); }
html body.page-notif .notif-panel{
  background:#fff;
  border:1px solid rgba(31,42,68,.04);
  border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);
  overflow:hidden;
}
html body.page-notif .notif-item{
  gap:12px;
  padding:16px;
  border-bottom:1px solid rgba(31,42,68,.06);
  background:#fff;
  transition:background .15s ease;
}
html body.page-notif .notif-item:active{ background:var(--blue-light); }
html body.page-notif .notif-item.unread{
  background:linear-gradient(90deg,var(--blue-light),#fff);
  box-shadow:inset 3px 0 0 var(--blue-dark);
}
html body.page-notif .notif-icon{ width:44px; height:44px; box-shadow:0 4px 10px rgba(31,42,68,.08); }
html body.page-notif .notif-icon.payment{ background:linear-gradient(150deg,#e8f8ef,#d3f0e0); color:#2f9e63; }
html body.page-notif .notif-icon.booking{ background:linear-gradient(150deg,var(--blue-light),var(--blue-light-2)); color:var(--blue-deep); }
html body.page-notif .notif-title{ color:var(--ink); font-size:14.5px; font-weight:800; margin-bottom:5px; }
html body.page-notif .notif-item.unread .notif-title{ color:var(--blue-deep); }
html body.page-notif .notif-meta{ color:var(--muted-soft); font-size:12px; }
html body.page-notif .notif-meta .dot-sep{ background:var(--muted-soft); }
html body.page-notif .notif-unread-dot{ box-shadow:0 0 0 4px rgba(92,163,232,.18); margin-top:6px; }
html body.page-notif .notif-empty{ padding:54px 20px; color:var(--muted); }
html body.page-notif .notif-empty::before{ content:"🐾"; display:block; font-size:36px; margin-bottom:8px; opacity:.55; }

/* =====================================================
   PROFILE PAGE  (layout of profile.html, website styling)
===================================================== */
html body.page-profile .page{ max-width:680px; margin:0 auto; padding:0 14px 28px; }
html body.page-profile .page::before{
  content:"";
  display:block;
  height:108px;
  margin:0 -14px;
  border-radius:0 0 26px 26px;
  background:
    var(--paws) 0 0 / 120px 120px,
    linear-gradient(135deg,var(--cream) 0%,var(--cream-light) 55%,#fff6ea 100%);
}
html body.page-profile .panel{
  position:relative;
  margin-top:-66px;
  padding:24px 18px 8px;
  border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md);
  overflow:hidden;
}
html body.page-profile .panel::before{
  content:"";
  position:absolute;
  top:0; left:0; right:0;
  height:5px;
  background:linear-gradient(90deg,var(--blue),var(--blue-dark));
}
html body.page-profile .profile-head{ padding-top:6px; padding-bottom:20px; border-bottom-color:rgba(31,42,68,.08); }
html body.page-profile .avatar{
  width:70px;
  height:70px;
  background:linear-gradient(150deg,var(--blue),var(--blue-dark));
  box-shadow:0 10px 22px rgba(92,163,232,.42);
}
html body.page-profile .profile-head h1{ font-size:20px; font-weight:800; }
html body.page-profile .profile-head > div:nth-child(2){ flex:1; min-width:0; }
html body.page-profile .profile-head h1,
html body.page-profile .profile-head p.muted{ overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
html body.page-profile .profile-actions{ width:auto; flex:0 0 auto; }
html body.page-profile .profile-head .profile-actions .button{ padding:8px 14px; font-size:12px; width:auto; }
html body.page-profile .profile-head p.muted{ font-size:12px; color:var(--muted); }
html body.page-profile .section,
html body.page-profile .menu-section,
html body.page-profile .purchase-section{ border-bottom-color:rgba(31,42,68,.08); }
html body.page-profile .section h2,
html body.page-profile .purchase-header h2{ font-size:20px; }
html body.page-profile .menu-section h2{
  font-size:12px;
  letter-spacing:.08em;
  text-transform:uppercase;
  color:var(--muted);
  margin-bottom:4px;
}
html body.page-profile .menu-row{
  margin:0 -10px;
  padding:14px 10px;
  border-top:0;
  border-radius:12px;
  font-weight:800;
  transition:background .15s ease;
}
html body.page-profile .menu-row + .menu-row{ box-shadow:inset 0 1px 0 rgba(31,42,68,.06); }
html body.page-profile .menu-row:active{ background:var(--blue-light); }
html body.page-profile .menu-row::after{ color:var(--blue-dark); }
html body.page-profile .button{
  border-radius:var(--radius-sm);
  background:linear-gradient(135deg,var(--blue),var(--blue-dark));
  box-shadow:0 8px 18px rgba(92,163,232,.30);
}
html body.page-profile .button.secondary{
  background:#fff;
  color:var(--blue-deep);
  border:2px solid var(--blue-dark);
  box-shadow:none;
  padding-top:10px;
  padding-bottom:10px;
}
html body.page-profile .profile-head .profile-actions .button{ margin-top:0; border-radius:10px; }
html body.page-profile #accountSection .detail{
  display:block;
  margin-top:8px;
  padding:11px 14px;
  background:var(--blue-light);
  border:1px solid rgba(123,184,240,.22);
  border-radius:14px;
}
html body.page-profile #accountSection .detail span:first-child{
  display:block;
  font-size:11px;
  font-weight:800;
  letter-spacing:.07em;
  text-transform:uppercase;
  color:var(--muted);
}
html body.page-profile #accountSection .detail strong{ display:block; font-size:16px; font-weight:800; overflow-wrap:anywhere; }
html body.page-profile .section:last-child .detail{
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:12px 0;
  border-top:1px solid rgba(31,42,68,.06);
}
html body.page-profile .section:last-child .detail span{ display:inline; }
html body.page-profile .purchase-statuses{ gap:8px; }
html body.page-profile .purchase-status{
  padding:12px 2px 10px;
  border-radius:var(--radius-md);
  background:var(--blue-light);
  border:1px solid rgba(123,184,240,.22);
  transition:transform .15s ease;
}
html body.page-profile .purchase-status:active{ transform:scale(.97); }
html body.page-profile .purchase-status svg{ color:var(--blue-deep); }
html body.page-profile .history-link{ color:var(--blue-dark); }

/* =====================================================
   ONE DESIGN FOR EVERY TOP BAR AND THE BOTTOM TABS
   Home, Services, Notifications, Me  -> .navbar        [menu] [logo] ........ [cart]
   Menu pages, sign in/up, checkout   -> .site-header   [logo + name] ........ [link]
   Account sub-pages, My Purchases    -> .page-header / .mobile-header  [back] title
   All of them: same height, white blurred bar, soft shadow, and they sit below the status bar.
===================================================== */
html body .navbar,
html body .site-header,
html body .page-header,
html body .mobile-header{
  position:sticky;
  top:0;
  z-index:1000;
  box-sizing:border-box;
  margin-top:calc(-1 * var(--sat));
  padding-top:var(--sat);
  background:rgba(255,255,255,.94);
  -webkit-backdrop-filter:blur(10px);
  backdrop-filter:blur(10px);
  border:0;
  box-shadow:0 1px 0 rgba(31,42,68,.06),0 4px 14px rgba(31,42,68,.05);
}
/* main tabs */
html body .navbar{
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:10px;
  height:auto;
  min-height:calc(60px + var(--sat));
  padding:var(--sat) 12px 0 64px;      /* 64px on the left = room for the menu button */
}
html body .navbar .logo{ margin:0; padding:0; display:flex; align-items:center; background:none; }
html body .navbar .logo img{ width:42px; height:42px; object-fit:contain; display:block; }
html body .cart-link{
  position:relative;
  flex:0 0 auto;
  width:40px;
  height:40px;
  padding:0;
  display:grid;
  place-items:center;
  color:var(--ink);
  background:#fff;
  border:1px solid rgba(31,42,68,.10);
  border-radius:12px;
  box-shadow:0 2px 8px rgba(31,42,68,.08);
  cursor:pointer;
}
html body .cart-link svg{ width:21px; height:21px; }
html body .cart-link:active{ background:var(--blue-light); }
html body .cart-link .cart-badge{ position:absolute; top:-6px; right:-6px; }
/* menu pages / sign in / checkout */
html body .site-header .header-inner,
html body .page-header .header-inner{
  box-sizing:border-box;
  width:min(100% - 24px,1080px);
  max-width:none;
  min-height:60px;
  margin:0 auto;
  padding:0;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:12px;
}
html body .page-header .page-title{ font-size:20px; font-weight:800; color:var(--blue-dark); text-align:left; margin:0; }
html body .page-header .back-link{ padding:8px 12px; border-radius:var(--radius-sm); font-size:14px; white-space:nowrap; }
/* My Purchases */
html body .mobile-header{ min-height:calc(60px + var(--sat)); height:auto; padding-left:12px; padding-right:12px; align-items:center; }
html body .mobile-header .back-button{
  width:40px; height:40px; color:var(--ink);
  background:#fff; border:1px solid rgba(31,42,68,.10); border-radius:12px; box-shadow:0 2px 8px rgba(31,42,68,.08);
}
html body .mobile-header-title{ font-size:20px; color:var(--blue-dark); }

/* Bottom tabs: identical on every page that has them */
html body .mobile-bottom-nav{
  position:fixed;
  left:0; right:0; bottom:0;
  z-index:1100;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  align-items:stretch;
  box-sizing:border-box;
  height:auto;
  padding:0 0 var(--sab);
  background:rgba(255,255,255,.96);
  -webkit-backdrop-filter:blur(10px);
  backdrop-filter:blur(10px);
  border-top:1px solid rgba(31,42,68,.06);
  box-shadow:0 -6px 18px rgba(31,42,68,.08);
}
html body .mobile-bottom-nav .bottom-nav-item{
  position:relative;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  gap:3px;
  height:62px;
  min-width:0;
  padding:6px 2px;
  background:none;
  border:0;
  border-radius:0;
  box-shadow:none;
  color:var(--muted-soft);
  font-family:'Nunito',sans-serif;
  font-size:11px;
  font-weight:800;
  line-height:1.1;
  text-decoration:none;
  -webkit-tap-highlight-color:transparent;
}
html body .mobile-bottom-nav .bottom-nav-item svg{ display:block; width:24px; height:24px; flex:0 0 24px; }
html body .mobile-bottom-nav .bottom-nav-item > span:not(.bottom-notif-badge):not(.auth-account-avatar){
  display:block; width:100%; max-width:100%; text-align:center; font-size:11px; font-weight:800;
  white-space:nowrap; overflow:hidden; text-overflow:ellipsis;
}
html body .mobile-bottom-nav .bottom-nav-item.active{ color:var(--blue-dark); }
html body .mobile-bottom-nav .bottom-nav-item.active::before{
  content:""; position:absolute; top:0; left:50%; width:30px; height:3px; margin-left:-15px;
  border-radius:0 0 4px 4px; background:var(--blue-dark);
}
html body .mobile-bottom-nav .bottom-nav-item:active{ background:var(--blue-light); }
html body .mobile-bottom-nav .bottom-notif-badge{
  display:none;
  position:absolute; top:4px; left:calc(50% + 4px);
  min-width:17px; height:17px; padding:0 4px; box-sizing:border-box;
  border-radius:999px; background:var(--blue-dark); color:#fff; border:2px solid #fff;
  font-size:10px; font-weight:800; line-height:13px; align-items:center; justify-content:center;
}
html body .mobile-bottom-nav .bottom-notif-badge:empty{ display:none !important; }
/* signed-in avatar replaces the icon (same 24px footprint) */
html body .mobile-bottom-nav .bottom-nav-item .auth-account-avatar{
  display:grid; place-items:center; width:24px !important; height:24px !important; min-width:24px; flex:0 0 24px;
  border-radius:50%; background:var(--blue); color:var(--ink); font-size:10px !important; font-weight:800; line-height:1;
}
html body .mobile-bottom-nav .bottom-nav-item.active .auth-account-avatar{ background:var(--blue-dark); color:#fff; }
@media(min-width:701px){ html body .mobile-bottom-nav{ display:none; } }

html body .navbar .nav-title{
  flex:1;
  min-width:0;
  font-family:'Baloo 2',cursive;
  font-size:24px;
  font-weight:800;
  line-height:1;
  color:var(--blue-dark);
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
}
/* guest cart: the close button must clear the status bar */
html body .guest-cart-close{ top:calc(var(--sat) + 12px); }
html body.page-profile #accountSection .logout{ width:100%; margin-top:14px; }
/* error + retry (products / services) */
html body .retry-button{
  margin-top:4px; padding:10px 22px; border:0; border-radius:var(--radius-sm); cursor:pointer;
  background:linear-gradient(135deg,var(--blue),var(--blue-dark)); color:#fff;
  font-family:'Nunito',sans-serif; font-size:14px; font-weight:800; box-shadow:0 8px 18px rgba(92,163,232,.30);
}
html body .services-error{
  margin:24px 16px; padding:28px 18px; text-align:center; background:#fff; border-radius:var(--radius-lg);
  box-shadow:var(--shadow-md); color:var(--ink);
}
html body .services-error p{ font-weight:800; font-size:16px; margin-bottom:8px; }
html body .services-error small{ display:block; margin-bottom:14px; color:var(--muted); font-size:13px; line-height:1.45; }

@media (prefers-reduced-motion:reduce){
  html body *{ animation-duration:.001ms !important; transition-duration:.001ms !important; scroll-behavior:auto !important; }
}
`;
