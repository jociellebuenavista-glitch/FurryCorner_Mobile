/**
 * Shared top bar + bottom tabs for the four main tabs (Home, Services, Notifications, Me).
 * Every one of those pages uses these two functions, so the design can only ever be changed in one place.
 * (Styling lives in website-theme.ts; the hamburger button is added by auth-guard.script.ts.)
 */
export type TabName = 'home' | 'services' | 'notifications' | 'me';

const CART_ICON =
  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
  '<circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>' +
  '<path d="M1 1h4l2.6 13.4a2 2 0 002 1.6h9.7a2 2 0 002-1.6L23 6H6"></path></svg>';

/** Top bar: [hamburger] [logo or page title] ........ [cart] */
export function appNavbar(title = ''): string {
  const left = title
    ? `<span class="nav-title">${title}</span>`
    : '<a href="index.html" class="logo" aria-label="FurryCorner PH home"><img src="images/logo.png" alt="FurryCorner PH"></a>';
  return `<nav class="navbar" id="navbar">
    ${left}
    <button type="button" class="cart-link" id="cartToggle" aria-label="Open shopping cart">${CART_ICON}<span class="cart-badge" id="cartBadge">0</span></button>
</nav>`;
}

const TABS: { id: TabName; href: string; label: string; icon: string }[] = [
  { id: 'home', href: 'index.html', label: 'Home',
    icon: '<path d="M3 10.5L12 3l9 7.5"></path><path d="M5 9.5V21h14V9.5"></path><path d="M9 21v-6h6v6"></path>' },
  { id: 'services', href: 'services.html', label: 'Services',
    icon: '<path d="M5 8h14l1 13H4L5 8z"></path><path d="M9 8V6a3 3 0 0 1 6 0v2"></path>' },
  { id: 'notifications', href: 'notif.html', label: 'Notifications',
    icon: '<path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 01-3.46 0"></path>' },
  { id: 'me', href: 'profile.html', label: 'Me',
    icon: '<circle cx="12" cy="8" r="4"></circle><path d="M4 21c0-4 4-6 8-6s8 2 8 6"></path>' },
];

/** Bottom tabs. The last tab becomes "Sign in" (signed out) or the user's initials (signed in) via auth-guard. */
export function appBottomNav(active: TabName): string {
  const items = TABS.map(t =>
    `<a href="${t.href}" class="bottom-nav-item${t.id === active ? ' active' : ''}"${t.id === 'notifications' ? ' id="mobileNotifToggle"' : ''}>` +
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${t.icon}</svg>` +
    `<span>${t.label}</span>` +
    (t.id === 'notifications' ? '<span class="bottom-notif-badge" id="bottomNotifBadge"></span>' : '') +
    `</a>`).join('');
  return `<nav class="mobile-bottom-nav" aria-label="Main">${items}</nav>`;
}

/** Slim top bar used by every other page (menu pages, sign in/up, checkout, ...). */
export function pageHeader(rightHref = 'index.html', rightLabel = 'Shop', title = 'FurryCorner PH'): string {
  return `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><img src="images/logo.png" alt="">${title}</a><a class="back-link" href="${rightHref}">${rightLabel}</a></div></header>`;
}
