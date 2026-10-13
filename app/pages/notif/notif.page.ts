// @ts-nocheck  (legacy script below is plain JavaScript carried over from notif.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './notif.markup';

@Component({
  selector: 'app-notif',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class NotifPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of notif.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {


/* =====================================================
   NAVBAR SCROLL SHADOW
===================================================== */

const navbar =
    document.getElementById(
        'navbar'
    );

window.addEventListener('scroll', () => {

    if(window.scrollY > 4){

        navbar.classList.add('scrolled');

    }else{

        navbar.classList.remove('scrolled');

    }

});


/* =====================================================
   CART STORAGE
===================================================== */

function getCart(){

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

    localStorage.setItem(
        'cart',
        JSON.stringify(cart)
    );

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
   CART DRAWER
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


        /* DECREASE */
        if(minusBtn){
            const currentQuantity = Number(cart[itemIndex].quantity || 1);

            if(currentQuantity > 1){
                cart[itemIndex].quantity = currentQuantity - 1;
            } else {
                // Quantity reached 0, delete the item entirely
                cart.splice(itemIndex, 1);
                
                // Also remove from selected items if it was checked
                selectedCartItems.delete(String(id));
            }
        }


        /* INCREASE */
        if(plusBtn){
            cart[itemIndex].quantity = Number(cart[itemIndex].quantity || 0) + 1;
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
        const cart = getCart();

        // Filter to only selected items if any are explicitly selected
        const selectedItems = cart.filter(item => 
            selectedCartItems.has(String(item.id))
        );

        // If user selected specific items, checkout those. Otherwise, checkout the whole cart.
        const itemsToCheckout = selectedItems.length > 0 ? selectedItems : cart;

        goToCheckout(itemsToCheckout);
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
        cart.length === 0;


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
   NOTIFICATIONS
===================================================== */

const notificationUserId =
    window.FurryCornerAuth.userId;

const notificationStorageKey = notificationUserId
    ? `furrycornerNotificationRead:${notificationUserId}`
    : null;

let notifications = [];

function persistNotificationReadState(){
    if(!notificationStorageKey)
        return;

    const readState = Object.fromEntries(
        notifications.map(item => [item.id, item.read])
    );

    localStorage.setItem(
        notificationStorageKey,
        JSON.stringify(readState)
    );
}

async function loadNotifications(){
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
            persistNotificationReadState();
        }

        renderNotifications();
    }catch(error){
        console.error('Notification loading failed:', error);
        notifications = [];
        renderNotifications();
    }
}


let activeFilter = 'all';


const notifList =
    document.getElementById(
        'notifList'
    );


const notifBadge =
    document.getElementById(
        'bottomNotifBadge'
    );


const notifIcons = {

    payment:`

        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">

            <rect
                x="2"
                y="5"
                width="20"
                height="14"
                rx="2">
            </rect>


            <line
                x1="2"
                y1="10"
                x2="22"
                y2="10">
            </line>

        </svg>

    `,


    booking:`

        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2">

            <rect
                x="3"
                y="4"
                width="18"
                height="18"
                rx="2">
            </rect>


            <line
                x1="16"
                y1="2"
                x2="16"
                y2="6">
            </line>


            <line
                x1="8"
                y1="2"
                x2="8"
                y2="6">
            </line>


            <line
                x1="3"
                y1="10"
                x2="21"
                y2="10">
            </line>

        </svg>

    `

};


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


    document.getElementById(
        'tabCountAll'
    ).textContent =
        notifications.length;


    const visible =
        notifications.filter(item => {

            if(activeFilter === 'unread')
                return !item.read;

            if(activeFilter === 'read')
                return item.read;

            return true;

        });


    notifList.innerHTML =

        visible.length

            ?

        visible.map(item => `

            <div
                class="notif-item ${item.read ? '' : 'unread'}"
                data-id="${item.id}">


                <div
                    class="notif-icon ${item.type}">

                    ${notifIcons[item.type]}

                </div>


                <div class="notif-body">

                    <div class="notif-title">

                        ${item.title}

                    </div>


                    <div class="notif-meta">

                        <span>${item.time}</span>

                        <span class="dot-sep"></span>

                        <span>${item.category}</span>

                    </div>

                </div>


                ${
                    item.read
                        ? ''
                        : '<div class="notif-unread-dot"></div>'
                }

            </div>

        `).join('')

            :

        `

            <div class="notif-empty">

                ${
                    activeFilter === 'unread'
                        ? "You're all caught up"
                        : activeFilter === 'read'
                            ? 'No read notifications yet'
                            : 'No notifications yet'
                }

            </div>

        `;

}


/* =====================================================
   FILTER TABS
===================================================== */

document
    .getElementById(
        'notifTabs'
    )
    .addEventListener(
        'click',
        event => {

            const tab =
                event.target.closest(
                    '.notif-tab'
                );


            if(!tab)
                return;


            document
                .querySelectorAll(
                    '.notif-tab'
                )
                .forEach(
                    el =>
                        el.classList.remove('active')
                );


            tab.classList.add('active');


            activeFilter =
                tab.dataset.filter;


            renderNotifications();

        }
    );


/* MARK ALL READ */

document
    .getElementById(
        'notifMarkAllRead'
    )
    .addEventListener(
        'click',
        () => {

            notifications.forEach(
                item =>
                    item.read = true
            );

            persistNotificationReadState();

            renderNotifications();

        }
    );


/* INDIVIDUAL NOTIFICATION */

notifList.addEventListener(
    'click',
    event => {

        const item =
            event.target.closest(
                '.notif-item'
            );


        if(!item)
            return;


        const notification =
            notifications.find(
                n =>
                    n.id ===
                    item.dataset.id
            );


        if(notification){

            notification.read =
                true;

            persistNotificationReadState();

            renderNotifications();

        }

    }
);


/* =====================================================
   INITIALIZE
===================================================== */

loadNotifications();

updateCartBadge();


;


  }
}
