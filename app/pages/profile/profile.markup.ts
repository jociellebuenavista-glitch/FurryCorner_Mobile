import { appNavbar, appBottomNav } from '../../legacy/app-shell';
// Page markup + CSS carried over unchanged from profile.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Profile - FurryCorner`;
export const BODY_CLASS = `page-profile`;

export const HTML = `<!-- =====================================================
     MAIN PAGE
===================================================== -->

${appNavbar()}

<div class="page">

    <main class="panel">

        <!-- =================================================
             PROFILE HEADER
        ================================================= -->

        <div class="profile-head">

            <div class="avatar">
                FC
            </div>

            <div>

                <h1 id="profileName">
                    My Profile
                </h1>

                <p class="muted" id="profileSubtitle">
                    Keep your delivery details close.
                </p>

            </div>

            <div class="profile-actions" id="profileActions"></div>

        </div>


        <!-- =================================================
             ACCOUNT
        ================================================= -->

        <section class="section" id="accountSection" style="display:none">

            <h2>
                Welcome to FurryCorner
            </h2>

            <p class="muted">
                Create an account to save your details and track future orders.
            </p>

            <a class="button"
               id="signupLink"
               href="signup.html">

                Sign up

            </a>

            <a class="button secondary"
               href="checkout.html">

                View checkout

            </a>

        </section>


        <!-- =================================================
             MY ACCOUNT
        ================================================= -->

        <section class="menu-section">

            <h2>
                My Account
            </h2>

            <a class="menu-row"
                    href="account-security.html">

                Account &amp; Security

            </a>

            <a class="menu-row"
                    href="my-addresses.html">

                My Addresses

            </a>

            <a class="menu-row"
                    href="payment-methods.html">

                Bank Accounts / Cards

            </a>

        </section>


        <!-- =================================================
             SETTINGS
        ================================================= -->

        <section class="menu-section">

            <h2>
                Settings
            </h2>

            <a class="menu-row"
               href="notification-settings.html">

                Notifications

            </a>

            <a class="menu-row"
               href="privacy-settings.html">

                Privacy Settings

            </a>

            <a class="menu-row"
               href="language.html">

                Language

            </a>

        </section>


        <!-- =================================================
             SUPPORT
        ================================================= -->

        <section class="menu-section">

            <h2>
                Support
            </h2>

            <a class="menu-row"
                    href="help-center.html">

                Help Centre

            </a>

            <a class="menu-row"
                    href="community-rules.html">

                Community Rules

            </a>

            <a class="menu-row"
                    href="policies.html">

                FurryCorner Policies

            </a>

        </section>


        <!-- =================================================
             ABOUT
        ================================================= -->

        <section class="menu-section">

            <h2>
                About
            </h2>

            <a class="menu-row"
               href="index.html">

                Happy with FurryCorner? Rate us!

            </a>

            <a class="menu-row"
                    href="about.html#about-us">

                About FurryCorner

            </a>

        </section>


        <!-- =================================================
             QUICK LINKS
        ================================================= -->

        <section class="section">

            <h2>
                Quick links
            </h2>

            <div class="detail">

                <span>
                    Shopping cart
                </span>

                <a class="link"
                   href="index.html">

                    Browse products

                </a>

            </div>


            <div class="detail">

                <span>
                    Pet care services
                </span>

                <a class="link"
                   href="services.html">

                    See services

                </a>

            </div>

        </section>

    </main>

</div>

${appBottomNav('me')}`;

export const CSS = `
:root{
    --blue:#7BB8F0;
    --blue-dark:#5CA3E8;
    --cream:#FCE3C0;
    --cream-light:#FDEEDA;
    --ink:#1F2430;
    --white:#fff;
    --border:#e5e7eb;
    --red:#e0685f;
}

*{
    box-sizing:border-box;
    margin:0;
    padding:0;
}

body{
    font-family:'Nunito',sans-serif;
    color:var(--ink);
    background:var(--cream-light);
    line-height:1.5;
}

h1,h2{
    font-family:'Baloo 2',cursive;
}

a{
    text-decoration:none;
    color:inherit;
}

/* ================================
   PAGE
================================ */

.page{
    max-width:680px;
    margin:auto;
    padding:18px 16px 40px;
}

/* ================================
   NAVBAR
================================ */

.topbar{
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin-bottom:24px;
}

.navbar{
    position:sticky;
    top:0;
    z-index:1000;

    width:100%;

    background:var(--white);

    display:flex;
    align-items:center;
    justify-content:space-between;

    padding:12px 40px;

    box-shadow:0 2px 0 rgba(0,0,0,.04);
}

.navbar .back{
    display:none;
}

.navbar .brand{
    display:flex;
    align-items:center;
    gap:9px;

    font:800 25px 'Baloo 2',cursive;
    color:var(--blue-dark);
}

.navbar .brand img{
    width:38px;
    height:38px;
    object-fit:contain;
}

/* ================================
   CART BUTTON
================================ */

.navbar .cart-link{
    position:relative;

    width:44px;
    height:44px;

    display:flex;
    align-items:center;
    justify-content:center;

    border:0;
    border-radius:8px;

    background:transparent;
    color:var(--ink);

    cursor:pointer;
    padding:0;
}

.navbar .cart-link:hover{
    background:var(--cream-light);
}

.navbar .cart-link svg{
    width:24px;
    height:24px;
}

/* ================================
   BRAND
================================ */

.brand{
    font:800 25px 'Baloo 2',cursive;
    color:var(--blue-dark);
}

.back,
.link{
    color:var(--blue-dark);
    font-weight:800;
}

/* ================================
   MAIN PANEL
================================ */

.panel{
    background:#fff;
    border-radius:16px;
    padding:24px;
    box-shadow:0 5px 18px #1f243012;
}

/* ================================
   PROFILE HEADER
================================ */

.profile-head{
    display:flex;
    align-items:center;
    gap:16px;

    padding-bottom:22px;

    border-bottom:1px solid var(--border);
}

.avatar{
    width:68px;
    height:68px;

    border-radius:50%;

    background:var(--blue);

    display:grid;
    place-items:center;

    font:800 28px 'Baloo 2',cursive;

    color:#fff;

    flex-shrink:0;
}

.avatar svg{
    width:34px;
    height:34px;
}

.profile-head h1{
    font-size:24px;
    line-height:1.1;
    white-space:nowrap;
}

.profile-head p.muted{
    font-size:11px;
    line-height:1.2;
}

.muted{
    color:#7c8490;
    font-size:14px;
}

/* ================================
   PROFILE ACTIONS
================================ */

.profile-actions{
    display:flex;
    flex-direction:column;
    align-items:stretch;

    gap:4px;

    margin-left:auto;

    width:86px;
}

.profile-head .profile-actions .button{
    margin-top:1px;

    padding:6px 8px;

    font-size:12px;

    text-align:center;
}

.profile-head .profile-actions .secondary{
    margin-left:0;
}

.profile-head .profile-actions .logout{
    padding:6px 4px;
    font-size:12px;
}

/* ================================
   SECTIONS
================================ */

.section{
    padding:20px 0;
    border-bottom:1px solid var(--border);
}

.section:last-child{
    border-bottom:0;
    padding-bottom:0;
}

.section h2{
    font-size:21px;
    margin-bottom:10px;
}

/* ================================
   DETAILS
================================ */

.detail{
    display:flex;
    justify-content:space-between;

    gap:16px;

    padding:9px 0;

    font-size:14px;
}

.detail span:first-child{
    color:#7c8490;
}

/* ================================
   MENU
================================ */

.menu-section{
    padding:18px 0;
    border-bottom:1px solid var(--border);
}

.menu-section h2{
    font-size:14px;

    color:#7c8490;

    font-family:'Nunito',sans-serif;

    font-weight:800;

    margin-bottom:4px;
}

.menu-row{
    display:flex;
    align-items:center;
    justify-content:space-between;

    gap:16px;

    padding:13px 0;

    border-top:1px solid #f0f1f2;

    font-weight:700;
}

.menu-row:first-of-type{
    border-top:0;
}

.menu-row::after{
    content:'›';

    color:#7c8490;

    font-size:24px;

    font-weight:400;

    line-height:1;
}

/* ================================
   BUTTONS
================================ */

.button{
    display:inline-block;

    margin-top:18px;

    background:var(--blue-dark);

    color:#fff;

    border-radius:9px;

    padding:12px 18px;

    font-weight:800;

    border:0;

    cursor:pointer;
}

.secondary{
    background:var(--cream);
    color:var(--ink);
    margin-left:8px;
}

.logout{
    font:800 14px 'Nunito',sans-serif;
}

/* ================================
   PURCHASE SECTION
================================ */

.purchase-section{
    padding:22px 0;

    border-bottom:1px solid var(--border);
}

.purchase-header{
    display:flex;

    align-items:center;

    justify-content:space-between;

    gap:12px;

    margin-bottom:18px;
}

.purchase-header h2{
    font-size:21px;
    margin:0;
}

.history-link{
    color:var(--blue-dark);

    font-size:14px;

    font-weight:800;

    white-space:nowrap;
}

.purchase-statuses{
    display:grid;

    grid-template-columns:repeat(4,1fr);

    gap:10px;
}

.purchase-status{
    display:flex;

    flex-direction:column;

    align-items:center;

    gap:7px;

    text-align:center;

    font-size:13px;

    font-weight:700;
}

.purchase-status svg{
    width:34px;
    height:34px;

    color:var(--ink);
}

/* ================================
   MOBILE BOTTOM NAVIGATION
================================ */

.mobile-bottom-nav{
    display:none;
}

/* =====================================================
   MOBILE
===================================================== */

@media(max-width:700px){

    body{
        padding-bottom:68px;
    }

    .page{
        padding:14px 12px;
    }

    .panel{
        padding:18px;
    }

    /* NAVBAR */

    .navbar{
        padding:10px 12px;
        gap:8px;
    }

    .navbar .brand{
        font-size:21px;
    }

    .navbar .brand img{
        width:34px;
        height:34px;
    }

    /* BOTTOM NAV */

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

    .mobile-bottom-nav
    .bottom-nav-item
    span:not(.bottom-notif-badge){

        display:block;

        width:100%;

        text-align:center;

        line-height:1;

        white-space:nowrap;

        overflow:hidden;

        text-overflow:ellipsis;
    }

    .mobile-bottom-nav
    .bottom-nav-item.active{
        color:var(--blue-dark);
    }

    .mobile-bottom-nav
    .bottom-nav-item:hover{
        color:#7d8490;
    }

    .mobile-bottom-nav
    .bottom-nav-item.active:hover{
        color:var(--blue-dark);
    }

    /* =================================================
       NOTIFICATION BADGE
       SAME POSITION AS NOTIF.HTML
    ================================================= */

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

        background:var(--red);

        color:white;

        font-size:9px;

        font-weight:800;

        line-height:1;

        z-index:2;
    }

    /* PROFILE HEADER */

    .profile-head{
        align-items:flex-start;

        flex-wrap:nowrap;
    }

    .profile-head>div:nth-child(2){
        flex:1;
        min-width:0;
    }

    .profile-actions{
        width:86px;
        flex-shrink:0;
    }

    .profile-head h1{
        font-size:20px;
    }

    .profile-head .profile-actions .button{
        padding:6px 5px;
        font-size:11px;
    }

    /* DETAILS */

    .detail{
        display:block;
    }

    .detail span{
        display:block;
    }

    .secondary{
        margin-left:0;
        margin-top:8px;
    }

    /* PURCHASE */

    .purchase-statuses{
        gap:4px;
    }

    .purchase-status{
        font-size:11px;
    }

    .purchase-status svg{
        width:29px;
        height:29px;
    }

    .history-link{
        font-size:12px;
    }
}

/* =====================================================
   SMALL MOBILE
===================================================== */

@media(max-width:380px){

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
`;
