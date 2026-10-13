// @ts-nocheck  (legacy script below is plain JavaScript carried over from profile.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './profile.markup';

@Component({
  selector: 'app-profile',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class ProfilePage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of profile.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {


/* =====================================================
   GLOBAL VARIABLES
===================================================== */

let user = null;

const account =
    document.getElementById('accountSection');

const returnTo =
    new URLSearchParams(
        location.search
    ).get('return');


/* =====================================================
   LOAD USER PROFILE FROM DATABASE
===================================================== */

async function loadProfile() {

    const userId =
        localStorage.getItem('loggedInUserId');

    /*
     * No logged-in user
     */
    if (!userId) {

        handleLoggedOutProfile();

        return;
    }


    /*
     * Signed in on this phone -> show the signed-in profile (with Sign out) right away from the saved
     * session, then refresh it from the server. A slow or unreachable server must never turn a signed-in
     * user into the "Welcome" screen.
     */
    let cachedUser = null;

    try {
        cachedUser = JSON.parse(localStorage.getItem('loggedInUser') || 'null');
    } catch (error) {
        cachedUser = null;
    }

    if (cachedUser) {
        renderSignedIn({
            first_name: cachedUser.firstName || cachedUser.first_name || '',
            last_name: cachedUser.lastName || cachedUser.last_name || '',
            email: cachedUser.email || ''
        });
    }

    try {

        const response = await fetch(
            `${window.FURRY_API}/getProfile.php?user_id=${encodeURIComponent(userId)}`
        );


        if (!response.ok) {

            throw new Error(
                `Server returned ${response.status}`
            );

        }


        const data =
            await response.json();


        console.log(
            'getProfile.php response:',
            data
        );


        /*
         * Database did not return user
         */

        if (!data.success) {

            console.error(
                'Profile loading failed:',
                data.message
            );

            if (!cachedUser) {
                handleLoggedOutProfile();
            }

            return;
        }


        /*
         * Store database user
         */

        user = data.user;


        /*
         * Keep logged-in information
         * synchronized
         */

        localStorage.setItem(
            'loggedInUser',
            JSON.stringify({
                id: user.user_id,
                user_id: user.user_id,
                firstName: user.first_name,
                lastName: user.last_name,
                email: user.email,
                role: user.role
            })
        );


        localStorage.setItem(
            'loggedInName',
            `${user.first_name} ${user.last_name}`.trim()
        );


        localStorage.setItem(
            'loggedInEmail',
            user.email
        );


        renderSignedIn(user);


    }

    catch (error) {

        console.error(
            'Unable to load profile:',
            error
        );

        // Server unreachable: stay on the signed-in view built from the saved session.
        if (!cachedUser) {
            handleLoggedOutProfile();
        }

    }

}


/* =====================================================
   SIGNED IN PROFILE
===================================================== */

function renderSignedIn(u) {

    user = u;

    // Signed in: the header shows name + email + Sign out, so the separate "Account details" block is not needed.
    account.style.display = 'none';

    const fullName =
        ((u.first_name || '') + ' ' + (u.last_name || '')).trim();

    document.getElementById('profileName').textContent =
        fullName || 'My Profile';

    document.getElementById('profileSubtitle').textContent =
        u.email || '';

    const actions =
        document.getElementById('profileActions');

    actions.innerHTML = `
        <button
            class="button secondary logout"
            id="logout"
            type="button">
            Sign out
        </button>
    `;

    document
        .getElementById('logout')
        .addEventListener('click', logoutUser);

    updateProfileAvatar();

}


/* =====================================================
   LOGGED OUT PROFILE
===================================================== */

function handleLoggedOutProfile() {

    user = null;

    account.style.display = '';


    if (returnTo === 'checkout') {

        document.getElementById(
            'signupLink'
        ).href =
            'signup.html?return=checkout';


        account.querySelector('h2')
            .textContent =
            'Sign in to checkout';


        account.querySelector('.muted')
            .textContent =
            'Create an account first to continue with your order.';

    }


    /*
     * Add login button
     */

    if (
        !document.getElementById('profileLoginButton')
    ) {

        const loginLink =
            document.createElement('a');

        loginLink.id =
            'profileLoginButton';

        loginLink.className =
            'button secondary';

        loginLink.textContent =
            'Log in';

        loginLink.href =
            returnTo === 'checkout'
                ? 'signin.html?return=checkout'
                : 'signin.html';


        account.insertBefore(
            loginLink,
            document.getElementById('signupLink')
        );

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutUser() {
    window.FurryCornerAuth.logout();
}


/* =====================================================
   AVATAR
===================================================== */

function updateProfileAvatar() {

    const avatar =
        document.querySelector('.avatar');


    if (!avatar) return;


    if (!user) {

        avatar.innerHTML = `

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <circle
                    cx="12"
                    cy="8"
                    r="4">
                </circle>

                <path d="
                    M4 21
                    c0-4 4-6 8-6
                    s8 2 8 6
                "></path>

            </svg>

        `;

        return;
    }


    const profileName =
        `${user.first_name || ''} ${user.last_name || ''}`.trim();


    const nameParts =
        profileName
            .split(/\s+/)
            .filter(Boolean);


    if (nameParts.length === 0) {

        avatar.textContent = 'FC';

        return;
    }


    const initials =
        nameParts[0][0] +
        (
            nameParts.length > 1
                ? nameParts[nameParts.length - 1][0]
                : ''
        );


    avatar.textContent =
        initials.toUpperCase();

}


/* =====================================================
   MOVE PROFILE ACTIONS
===================================================== */

function moveProfileActions() {

    /*
     * Prevent duplicate profile actions
     */

    if (
        document.querySelector('.profile-actions')
    ) {

        return;
    }


    const profileHead =
        document.querySelector('.profile-head');


    if (!profileHead) return;


    const profileActions =
        document.createElement('div');


    profileActions.className =
        'profile-actions';


    const logoutButton =
        document.querySelector(
            '#accountSection .logout'
        );


    if (logoutButton) {

        profileActions.appendChild(
            logoutButton
        );

    }


    profileHead.appendChild(
        profileActions
    );

}


/* =====================================================
   HTML SECURITY
===================================================== */

function escapeHTML(value) {

    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');

}


/* =====================================================
   PURCHASE SECTION
===================================================== */

const purchaseSection =
    document.createElement('section');


purchaseSection.className =
    'purchase-section';


purchaseSection.innerHTML = `

    <div class="purchase-header">

        <h2>
            My Purchases
        </h2>

        <a
            class="history-link"
            href="purchase-status.html?status=history">

            View Purchase History
            <span aria-hidden="true">›</span>

        </a>

    </div>


    <div class="purchase-statuses">

        <!-- TO PAY -->

        <a
            class="purchase-status"
            href="purchase-status.html?status=pay">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M3 6h13v14H3z"/>
                <path d="M16 10h3l2 3v7h-5zM6 3h10v3H6z"/>
                <path d="M7 17h.01M18 17h.01"/>

            </svg>

            <span>
                To Pay
            </span>

        </a>


        <!-- TO SHIP -->

        <a
            class="purchase-status"
            href="purchase-status.html?status=ship">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linejoin="round">

                <path d="M3 7h18v14H3z"/>
                <path d="M3 7l3-4h12l3 4"/>
                <path d="M8 3v6l4-3 4 3V3"/>

            </svg>

            <span>
                To Ship
            </span>

        </a>


        <!-- TO RECEIVE -->

        <a
            class="purchase-status"
            href="purchase-status.html?status=receive">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <path d="M3 7h11v10H3z"/>
                <path d="M14 11h4l3 3v3h-7z"/>
                <path d="M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
                <path d="M18 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>

            </svg>

            <span>
                To Receive
            </span>

        </a>


        <!-- TO RATE -->

        <a
            class="purchase-status"
            href="purchase-status.html?status=rate">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.8"
                stroke-linecap="round"
                stroke-linejoin="round">

                <circle
                    cx="12"
                    cy="12"
                    r="9"/>

                <path d="
                    m12 7
                    1.5 3
                    3.5.5
                    -2.5 2.5
                    .5 3.5
                    -3-1.5
                    -3 1.5
                    .5-3.5
                    L7 10.5
                    l3.5-.5z
                "/>

            </svg>

            <span>
                To Rate
            </span>

        </a>

    </div>

`;


/*
 * Insert purchases section
 */

account.insertAdjacentElement(
    'afterend',
    purchaseSection
);


/* NAVBAR and MOBILE BOTTOM NAVIGATION are written directly into the page markup (profile.markup.ts).
   The old code moved the header with document.body.insertBefore(), which fails inside the Angular app because
   the page is not a direct child of <body>; that error stopped the rest of this script (profile never loaded). */


/* =====================================================
   PROFILE TITLE
===================================================== */

const profileTitle =
    document.querySelector(
        '.profile-head h1'
    );


if (profileTitle) {

    profileTitle.textContent =
        'My Profile';

}


/* =====================================================
   START
===================================================== */

async function updateProfileNotificationBadge(){

    const badge = document.getElementById('bottomNotifBadge');

    if(!badge || !window.FurryCornerAuth.isAuthenticated){
        if(badge)
            badge.style.display = 'none';
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

        const storageKey =
            `furrycornerNotificationRead:${window.FurryCornerAuth.userId}`;
        const storedStateText = localStorage.getItem(storageKey);
        const storedState = storedStateText
            ? JSON.parse(storedStateText)
            : {};
        const firstVisit = storedStateText === null;
        const unreadIds = data.notifications
            .filter(item => !(storedState[item.id] ?? firstVisit))
            .map(item => item.id);

        if(firstVisit){
            localStorage.setItem(
                storageKey,
                JSON.stringify(Object.fromEntries(data.notifications.map(item => [item.id, true])))
            );
        }

        if(unreadIds.length){
            badge.textContent = unreadIds.length;
            badge.style.display = 'flex';
        }else{
            badge.style.display = 'none';
        }
    }catch(error){
        console.error('Profile notification badge update failed:', error);
        badge.style.display = 'none';
    }

}

updateProfileNotificationBadge();
loadProfile();


;




/* =====================================================
   TOP BAR CART BUTTON (shared top bar)
===================================================== */
function refreshNavCartBadge(){
    const badge = document.getElementById('cartBadge');
    if(!badge) return;
    let items = [];
    try { items = JSON.parse(localStorage.getItem('cart') || '[]'); } catch(e) { items = []; }
    const total = Array.isArray(items) ? items.reduce((t,i) => t + Number(i.quantity || 0), 0) : 0;
    badge.textContent = total;
    badge.style.display = total > 0 ? 'flex' : 'none';
}
refreshNavCartBadge();
window.addEventListener('storage', refreshNavCartBadge);

document.getElementById('cartToggle')?.addEventListener('click', () => location.assign('index.html?cart=1'));

  }
}
