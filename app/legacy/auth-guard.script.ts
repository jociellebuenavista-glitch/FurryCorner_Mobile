// @ts-nocheck  (auth-guard.js carried over; runs once per page, same as the old <script src="auth-guard.js">)
export function runAuthGuard(location: any, __onReady: any): void {
(function () {
    'use strict';

    const protectedPages = new Set([
        'checkout.html',
        'order-confirmation.html',
        'purchase-status.html',
        'profile.html',
        'notif.html',
        'notification-settings.html',
        'privacy-settings.html',
        'my-addresses.html',
        'payment-methods.html',
        'account-security.html'
    ]);

    const authPages = new Set(['signin.html', 'signup.html']);
    const skipAuthSplashKey = 'furrycornerSkipAuthSplash';
    const token = localStorage.getItem('furryCornerAuthToken') || '';
    const userId = localStorage.getItem('loggedInUserId') || '';
    let user = null;

    try {
        user = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    } catch (error) {
        user = null;
    }

    const isAuthenticated = Boolean(token && userId && user);
    const pageName = location.pathname.split('/').pop() || 'index.html';

    function getSafeReturnTarget(value) {
        if (value === 'checkout') {
            return 'checkout.html';
        }

        try {
            const target = new URL(value || location.href, location.href);
            if (target.origin !== location.origin) {
                return 'index.html';
            }

            const targetPage = target.pathname.split('/').pop() || 'index.html';
            if (authPages.has(targetPage)) {
                return 'index.html';
            }

            return `${targetPage}${target.search}${target.hash}`;
        } catch (error) {
            return 'index.html';
        }
    }

    function signInUrl(returnTarget) {
        return `signin.html?return=${encodeURIComponent(getSafeReturnTarget(returnTarget))}`;
    }

    function clearLocalSession() {
        [
            'furryCornerAuthToken',
            'loggedInUserId',
            'loggedInUser',
            'loggedInName',
            'loggedInEmail',
            'furryCornerUser',
            'profileName',
            'furryCornerAccount'
        ].forEach(key => localStorage.removeItem(key));
    }

    // Plain-language reason shown on screen when the API cannot be reached.
    window.furryApiError = function (error) {
        const msg = String((error && error.message) || error || '');
        if (/failed to fetch|networkerror|load failed|network request|timeout|timed out|unable to resolve|connect/i.test(msg)) {
            return 'Cannot reach the FurryCorner server (' + window.FURRY_API + '). Make sure Apache/XAMPP is running and this phone is on the same Wi-Fi as your PC.';
        }
        return msg || 'Something went wrong.';
    };

    window.FurryCornerAuth = {
        isAuthenticated,
        user,
        userId,
        token,
        getSafeReturnTarget,
        signInUrl,
        promptForSignIn(returnTarget) {
            sessionStorage.setItem(skipAuthSplashKey, 'true');
            location.assign(signInUrl(returnTarget));
        },
        async logout() {
            try {
                await window.fetch(window.FURRY_API + '/logout.php', {
                    method: 'POST'
                });
            } catch (error) {
                console.error('Server logout failed:', error);
            }

            clearLocalSession();
            location.assign('signin.html');
        },
        clearLocalSession
    };

    const nativeFetch = window.__nativeFetch || (window.__nativeFetch = window.fetch.bind(window));
    window.fetch = function (resource, options) {
        const requestUrl = typeof resource === 'string' ? resource : resource.url;
        let isApiRequest = false;

        try {
            isApiRequest = new URL(requestUrl, location.href).pathname.includes('/furrycorner_api/');
        } catch (error) {
            isApiRequest = false;
        }

        if (!isApiRequest) {
            return nativeFetch(resource, options);
        }

        const requestOptions = options || {};
        const headers = new Headers(
            requestOptions.headers || (resource instanceof Request ? resource.headers : undefined)
        );
        const endpoint = new URL(requestUrl, location.href).pathname.split('/').pop();

        if (token && !['login.php', 'register.php'].includes(endpoint)) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return nativeFetch(resource, {...requestOptions, headers}).then(response => {
            const protectedEndpoint = new Set([
                'getProfile.php',
                'getOrder.php',
                'getOrderConfirmation.php',
                'getNotifications.php',
                'createOrder.php',
                'createBooking.php'
            ]).has(endpoint);

            if (response.status === 401 && protectedEndpoint && isAuthenticated) {
                clearLocalSession();
                location.replace(signInUrl(location.href));
            }

            return response;
        });
    };

    if (isAuthenticated) {
        nativeFetch(window.FURRY_API + '/checkSession.php', {
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => {
            if (response.status !== 401) {
                return;
            }

            clearLocalSession();
            location.replace(
                protectedPages.has(pageName)
                    ? signInUrl(location.href)
                    : location.href
            );
        }).catch(error => {
            console.error('Session check failed:', error);
        });
    }

    if (protectedPages.has(pageName) && !isAuthenticated) {
        sessionStorage.setItem(skipAuthSplashKey, 'true');
        location.replace(signInUrl(location.href));
        return;
    }

    if (authPages.has(pageName) && isAuthenticated) {
        location.replace('index.html');
        return;
    }

    function initialsFor(name) {
        const parts = name.trim().split(/\s+/).filter(Boolean);
        if (parts.length === 0) {
            return 'FC';
        }

        return `${parts[0][0]}${parts.length > 1 ? parts[parts.length - 1][0] : ''}`.toUpperCase();
    }

    function updateAccountLinks() {
        if (authPages.has(pageName)) {
            return;
        }

        const accountName = isAuthenticated
            ? (user.firstName || user.first_name || '') + ' ' + (user.lastName || user.last_name || '')
            : '';
        const displayName = accountName.trim() || localStorage.getItem('loggedInName') || 'Account';

        document.querySelectorAll('header a[href="profile.html"], nav a[href="profile.html"]').forEach(link => {
            if (link.closest('.menu-section')) {
                return;
            }

            link.setAttribute('aria-label', isAuthenticated ? `Profile: ${displayName}` : 'Sign in to continue');

            // Bottom tab bar: keep the tab's own icon + label. Signed out -> person icon with "Sign in".
            // Signed in -> initials circle with the first name.
            if (link.classList.contains('bottom-nav-item')) {
                const tabLabel = link.querySelector('span:not(.bottom-notif-badge):not(.auth-account-avatar)');
                if (isAuthenticated) {
                    let avatar = link.querySelector('.auth-account-avatar');
                    if (!avatar) {
                        avatar = document.createElement('span');
                        avatar.className = 'auth-account-avatar';
                        const icon = link.querySelector('svg');
                        if (icon) { icon.replaceWith(avatar); } else { link.prepend(avatar); }
                    }
                    avatar.textContent = initialsFor(displayName);
                    if (tabLabel) {
                        tabLabel.textContent = (user.firstName || user.first_name || '').trim() || 'Me';
                    }
                } else if (tabLabel) {
                    tabLabel.textContent = 'Sign in';
                }
                return;
            }

            // Top bars never show the signed-in user's name or avatar: signed in keeps the link as written
            // in the page ("Profile", "Back", ...); signed out turns it into "Sign in".
            if (!isAuthenticated) {
                link.textContent = 'Sign in';
            }
        });
    }

    /*
     * One shared notification badge for the bottom tabs on every page: just a number (99+ at most),
     * hidden when there is nothing unread. Read-state is the same localStorage record the Notifications page writes.
     */
    async function refreshNotifBadge() {
        const badge = document.getElementById('bottomNotifBadge');
        if (!badge || authPages.has(pageName)) {
            return;
        }

        const hide = () => {
            badge.textContent = '';
            badge.style.display = 'none';
        };

        if (!isAuthenticated) {
            hide();
            return;
        }

        try {
            const response = await window.fetch(window.FURRY_API + '/getNotifications.php');
            const data = await response.json();

            if (!response.ok || !data.success || !Array.isArray(data.notifications)) {
                throw new Error('notifications unavailable');
            }

            const text = localStorage.getItem('furrycornerNotificationRead:' + userId);
            const state = text ? JSON.parse(text) : {};
            const firstVisit = text === null;
            const unread = data.notifications.filter(item => !(state[item.id] ?? firstVisit)).length;

            if (unread > 0) {
                badge.textContent = unread > 99 ? '99+' : String(unread);
                badge.style.display = 'flex';
            } else {
                hide();
            }
        } catch (error) {
            // Keep whatever the page already shows if the server cannot be reached.
        }
    }

    function guardActions() {
        document.addEventListener('click', event => {
            const control = event.target.closest('a[href], [data-auth-required]');
            if (!control) {
                return;
            }

            const href = control.getAttribute('href');
            const targetPage = href
                ? new URL(href, location.href).pathname.split('/').pop()
                : '';

            if (authPages.has(targetPage)) {
                sessionStorage.setItem(skipAuthSplashKey, 'true');
                return;
            }

            if (isAuthenticated) {
                return;
            }

            const protectedLink = protectedPages.has(targetPage);

            if (!control.hasAttribute('data-auth-required') && !protectedLink) {
                return;
            }

            event.preventDefault();
            event.stopImmediatePropagation();

            const returnTarget = control.dataset.authReturn
                || (protectedLink ? control.href : location.href);
            window.FurryCornerAuth.promptForSignIn(returnTarget);
        }, true);
    }

    function installAccountStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .auth-account-link{display:inline-flex;align-items:center;gap:7px}
            .auth-account-avatar{width:28px;height:28px;flex:0 0 28px;display:inline-grid;place-items:center;border-radius:50%;background:#7BB8F0;color:#1F2430;font-size:11px;font-weight:800}
            .auth-account-name{max-width:120px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
            .furry-menu-button{position:fixed;left:12px;top:calc(var(--sat,0px) + 10px);z-index:1500;width:40px;height:40px;border:1px solid rgba(31,42,68,.10);border-radius:12px;background:#fff;display:flex;align-items:center;justify-content:center;flex-direction:column;gap:5px;box-shadow:0 2px 8px rgba(31,42,68,.08);cursor:pointer;padding:0}
            body:has(.cart-drawer.open) .furry-menu-button{display:none}
            .furry-menu-button span{display:block;width:18px;height:2px;background:#5CA3E8;border-radius:999px}
            .furry-menu-panel{position:fixed;left:0;top:0;bottom:0;width:290px;max-width:80vw;z-index:1501;background:#fff;transform:translateX(-105%);transition:transform .25s ease;box-shadow:12px 0 28px rgba(31,36,48,.12);padding:calc(22px + var(--sat,0px)) 16px calc(18px + var(--sab,0px));overflow-y:auto}
            .furry-menu-panel.open{transform:translateX(0)}
            body.menu-open::before{content:"";position:fixed;inset:0;background:rgba(31,36,48,.2);z-index:1480}
            .furry-menu-brand{display:flex;align-items:center;justify-content:center;margin:4px 8px 16px;padding:6px 0 0;border-bottom:0;text-decoration:none;box-shadow:none}
            .furry-menu-brand img{display:block;width:60px;height:60px;object-fit:contain}
            .furry-menu-section{margin-top:12px;padding-top:12px;border-top:1px solid #e2e6ec}
            .furry-menu-title{margin:0 0 8px 8px;color:#6a7280;font-size:12px;font-weight:800;letter-spacing:0;text-transform:uppercase}
            .furry-menu-list{display:flex;flex-direction:column;gap:0}
            .furry-menu-item{display:flex;align-items:center;justify-content:space-between;padding:11px 10px;border-bottom:1px solid #e2e6ec;border-radius:8px;color:#1F2430;text-decoration:none;font-weight:800;box-shadow:none}
            .furry-menu-item:last-child{border-bottom:0}
            .furry-menu-item:hover,.furry-menu-item:active{background:#EAF4FD}
            .furry-menu-item:focus-visible{outline:2px solid #5CA3E8;outline-offset:2px}
            .furry-menu-item .arrow{color:#5CA3E8;font-size:20px;line-height:1}
            
        `;

        document.head.append(style);
    }

    function installHamburgerMenu() {
        const currentPage = location.pathname.split('/').pop().toLowerCase();
        // The hamburger menu lives on the four main tabs (same top bar on each).
        if (!['index.html', 'services.html', 'notif.html', 'profile.html'].includes(currentPage)) {
            return;
        }

        if (document.getElementById('furry-menu-button')) {
            return;
        }

        const menuButton = document.createElement('button');
        menuButton.type = 'button';
        menuButton.id = 'furry-menu-button';
        menuButton.className = 'furry-menu-button';
        menuButton.setAttribute('aria-label', 'Open menu');
        menuButton.innerHTML = '<span></span><span></span><span></span>';

        const menuPanel = document.createElement('aside');
        menuPanel.id = 'furry-menu-panel';
        menuPanel.className = 'furry-menu-panel';
        menuPanel.innerHTML = `
            <a href="index.html" class="furry-menu-brand" aria-label="FurryCorner PH home"><img src="images/logo.png" alt="FurryCorner PH"></a>
            <div class="furry-menu-section">
                <div class="furry-menu-title">Settings</div>
                <div class="furry-menu-list">
                    ${isAuthenticated ? `
                    <a class="furry-menu-item" href="notification-settings.html">Notifications <span class="arrow">›</span></a>
                    <a class="furry-menu-item" href="privacy-settings.html">Privacy Settings <span class="arrow">›</span></a>
                    ` : ''}
                    <a class="furry-menu-item" href="language.html">Language <span class="arrow">›</span></a>
                </div>
            </div>
            <div class="furry-menu-section">
                <div class="furry-menu-title">Support</div>
                <div class="furry-menu-list">
                    <a class="furry-menu-item" href="help-center.html">Help Centre <span class="arrow">›</span></a>
                    <a class="furry-menu-item" href="community-rules.html">Community Rules <span class="arrow">›</span></a>
                    <a class="furry-menu-item" href="policies.html">FurryCorner Policies <span class="arrow">›</span></a>
                </div>
            </div>
        `;

        document.body.prepend(menuButton, menuPanel);

        const closeMenu = () => {
            menuPanel.classList.remove('open');
            document.body.classList.remove('menu-open');
        };

        menuButton.addEventListener('click', () => {
            const isOpen = menuPanel.classList.toggle('open');
            document.body.classList.toggle('menu-open', isOpen);
        });

        menuPanel.addEventListener('click', event => {
            if (event.target.closest('a')) {
                closeMenu();
            }
        });

        document.addEventListener('click', event => {
            if (!menuPanel.contains(event.target) && !menuButton.contains(event.target)) {
                closeMenu();
            }
        });
    }

    // Page changes are instant: no fade/slide animation between pages.
    function installPageTransitions() {
        document.body.classList.remove('furry-page-entering', 'furry-page-leaving');
    }

    function showLaunchSplash() {
        if (!authPages.has(pageName)) {
            return;
        }

        if (sessionStorage.getItem(skipAuthSplashKey) === 'true') {
            sessionStorage.removeItem(skipAuthSplashKey);
            return;
        }

        const style = document.createElement('style');
        style.textContent = `
            .splash-screen{position:fixed;inset:0;z-index:3000;display:grid;place-items:center;background:#FDEEDA;opacity:1;visibility:visible;transition:opacity .25s ease,visibility .25s ease}
            .splash-screen.is-hidden{opacity:0;visibility:hidden;pointer-events:none}
            .splash-content{display:grid;justify-items:center;gap:10px}
            .splash-logo{width:132px;height:132px;object-fit:contain;animation:splash-reveal .75s cubic-bezier(.2,.8,.2,1) both}
            .splash-title{color:#1F2430;font:800 27px 'Baloo 2',cursive;opacity:0;animation:splash-title-in .4s ease .2s forwards}
            .splash-dots{display:flex;gap:6px;margin-top:2px}
            .splash-dots span{width:7px;height:7px;border-radius:50%;background:#5CA3E8;animation:splash-dot .6s ease-in-out infinite alternate}
            .splash-dots span:nth-child(2){animation-delay:.15s}
            .splash-dots span:nth-child(3){animation-delay:.3s}
            @keyframes splash-reveal{from{opacity:0;transform:translateY(12px) scale(.9)}to{opacity:1;transform:translateY(0) scale(1)}}
            @keyframes splash-title-in{to{opacity:1;transform:translateY(0)}}
            @keyframes splash-dot{to{opacity:.35;transform:translateY(-4px)}}
            @media(prefers-reduced-motion:reduce){.splash-logo,.splash-title,.splash-dots span{animation:none;opacity:1}.splash-screen{transition-duration:.01ms}}
        `;
        document.head.append(style);

        const splash = document.createElement('div');
        splash.className = 'splash-screen';
        splash.setAttribute('role', 'status');
        splash.setAttribute('aria-label', 'Loading FurryCorner');
        splash.innerHTML = '<div class="splash-content"><img class="splash-logo" src="images/logo.png" alt=""><p class="splash-title">FurryCorner PH</p><div class="splash-dots" aria-hidden="true"><span></span><span></span><span></span></div></div>';
        document.body.prepend(splash);
        window.setTimeout(() => splash.classList.add('is-hidden'), 1750);
    }

    if (document.readyState === 'loading') {
        __onReady( () => {
            installAccountStyles();
            installHamburgerMenu();
            showLaunchSplash();
            updateAccountLinks();
            refreshNotifBadge();
            guardActions();
            installPageTransitions();
        }, {once: true});
    } else {
        installAccountStyles();
        installHamburgerMenu();
        showLaunchSplash();
        updateAccountLinks();
        refreshNotifBadge();
        window.setInterval(refreshNotifBadge, 45000);
        document.addEventListener('visibilitychange', () => { if (!document.hidden) refreshNotifBadge(); });
        guardActions();
        installPageTransitions();
    }
})();
}
