// @ts-nocheck  (legacy script below is plain JavaScript carried over from purchase-status.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './purchase-status.markup';

@Component({
  selector: 'app-purchase-status',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class PurchaseStatusPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of purchase-status.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {


/* =====================================================
   GET CURRENT STATUS
===================================================== */

const urlParams =
    new URLSearchParams(
        location.search
    );


let currentStatus =
    urlParams.get("status") || "history";


/* =====================================================
   LOGGED-IN USER
===================================================== */

let loggedUser = null;


try{

    loggedUser =
        JSON.parse(
            localStorage.getItem(
                "loggedInUser"
            )
        );

}catch(error){

    loggedUser = null;

}


/*
 * If there is no logged-in user,
 * return to signin.
 */

if(
    !loggedUser ||
    !loggedUser.id
){

    location.href =
        "signin.html?return=checkout";

}


/* =====================================================
   PAGE TITLES
===================================================== */

const statusTitles = {

    pay:{

        title:"To Pay",

        subtitle:
            "Orders waiting for payment."

    },


    ship:{

        title:"To Ship",

        subtitle:
            "Orders being prepared for shipment."

    },


    receive:{

        title:"To Receive",

        subtitle:
            "Orders that have been shipped."

    },


    rate:{

        title:"To Rate",

        subtitle:
            "Orders that have been delivered."

    },


    history:{

        title:"Purchase History",

        subtitle:
            "View all of your previous orders."

    }

};


const selectedTitle =
    statusTitles[currentStatus]
        || statusTitles.history;


document.getElementById(
    "pageTitle"
).textContent =
    selectedTitle.title;


document.getElementById(
    "pageSubtitle"
).textContent =
    selectedTitle.subtitle;


/* =====================================================
   ACTIVE TAB
===================================================== */

document
    .querySelectorAll(".status-tab")
    .forEach(tab => {

        if(
            tab.dataset.status ===
            currentStatus
        ){

            tab.classList.add(
                "active"
            );

        }

    });


/* =====================================================
   BACK BUTTON
===================================================== */

function goBack(){

    if(
        document.referrer &&
        document.referrer.includes(
            location.hostname
        )
    ){

        window.history.back();

        return;

    }


    location.href =
        "profile.html";

}


/* =====================================================
   LOAD ORDERS
===================================================== */

function loadOrders(){

    if(
        !loggedUser ||
        !loggedUser.id
    ){

        return;

    }


    fetch(
        window.FURRY_API + "/getOrder.php?user_id=" +
        encodeURIComponent(
            loggedUser.id
        )
    )

    .then(response => {

        if(!response.ok){

            throw new Error(
                "Server returned " +
                response.status
            );

        }

        return response.json();

    })

    .then(data => {

        console.log(
            "Purchase status orders:",
            data
        );


        if(!data.success){

            showError(
                data.message ||
                "Unable to load your orders."
            );

            return;

        }


        const orders =
            Array.isArray(data.orders)
                ? data.orders
                : [];


        const filteredOrders =
            filterOrders(
                orders
            );


        renderOrders(
            filteredOrders
        );

    })

    .catch(error => {

        console.error(
            "Purchase status error:",
            error
        );


        showError(
            "Please try again later."
        );

    });

}


/* =====================================================
   FILTER ORDERS
===================================================== */

function filterOrders(orders){

    /*
     * History shows everything.
     */

    if(
        currentStatus ===
        "history"
    ){

        return orders;

    }


    return orders.filter(
        order => {

            const status =
                String(
                    order.status ||
                    ""
                ).toLowerCase();


            /*
             * TO PAY
             *
             * Pending orders.
             */

            if(
                currentStatus ===
                "pay"
            ){

                return status ===
                    "pending";

            }


            /*
             * TO SHIP
             *
             * Processing orders.
             */

            if(
                currentStatus ===
                "ship"
            ){

                return status ===
                    "processing";

            }


            /*
             * TO RECEIVE
             *
             * Shipped orders.
             */

            if(
                currentStatus ===
                "receive"
            ){

                return status ===
                    "shipped";

            }


            /*
             * TO RATE
             *
             * Delivered orders.
             */

            if(
                currentStatus ===
                "rate"
            ){

                return status ===
                    "delivered";

            }


            return false;

        }
    );

}


/* =====================================================
   RENDER ORDERS
===================================================== */

function renderOrders(
    orders
){

    const container =
        document.getElementById(
            "ordersContainer"
        );


    if(
        !orders ||
        orders.length === 0
    ){

        renderEmptyState();

        return;

    }


    container.innerHTML =
        orders
            .map(
                order =>
                    createOrderCard(
                        order
                    )
            )
            .join("");

}


/* =====================================================
   CREATE ORDER CARD
===================================================== */

function createOrderCard(
    order
){

    const status =
        String(
            order.status ||
            "Pending"
        );


    const statusClass =
        status
            .toLowerCase()
            .replace(
                /\s+/g,
                "-"
            );


    const itemCount =
        Array.isArray(order.items)
            ? order.items.reduce(
                (total, item) =>
                    total +
                    (Number(item.quantity) || 0),
                0
            )
            : 0;


    return `

        <article
            class="order-card">


            <div
                class="order-top">


                <div>

                    <div
                        class="order-number">

                        Order #${escapeHTML(
                            order.order_id
                        )}

                    </div>


                    <div
                        class="order-date">

                        ${formatDate(
                            order.order_date
                        )}

                    </div>

                </div>


                <span
                    class="status ${statusClass}">

                    ${escapeHTML(
                        status
                    )}

                </span>


            </div>


            <div
                class="order-body">


                <div
                    class="order-info-row">

                    <span
                        class="order-info-label">

                        Items

                    </span>


                    <span
                        class="order-info-value">

                        ${itemCount}
                        ${
                            itemCount === 1
                                ? "item"
                                : "items"
                        }

                    </span>

                </div>


                <div
                    class="order-info-row">

                    <span
                        class="order-info-label">

                        Total

                    </span>


                    <span
                        class="order-total">

                        ₱${formatPrice(
                            order.total_amount
                        )}

                    </span>

                </div>

            </div>


            <div
                class="order-bottom">


                <span
                    class="item-count">

                    Order #${escapeHTML(
                        order.order_id
                    )}

                </span>


                <button
                    type="button"
                    class="view-button"
                    onclick="viewOrder(
                        ${Number(
                            order.order_id
                        )}
                    )">

                    View Order

                </button>

            </div>


        </article>

    `;

}


/* =====================================================
   EMPTY STATE
===================================================== */

function renderEmptyState(){

    const messages = {

        pay:{
            title:"No orders to pay",
            message:
                "You don't have any pending orders."
        },


        ship:{
            title:"No orders to ship",
            message:
                "You don't have any orders being prepared."
        },


        receive:{
            title:"No orders to receive",
            message:
                "You don't have any shipped orders."
        },


        rate:{
            title:"No orders to rate",
            message:
                "You don't have any delivered orders waiting for a rating."
        },


        history:{
            title:"No orders yet",
            message:
                "You haven't placed any orders yet."
        }

    };


    const message =
        messages[currentStatus]
        || messages.history;


    document.getElementById(
        "ordersContainer"
    ).innerHTML = `

        <div
            class="empty-orders">


            <div
                class="empty-icon">

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round">

                    <path
                        d="M3 6h18v14H3z">
                    </path>

                    <path
                        d="M7 6V4h10v2">
                    </path>

                    <path
                        d="M8 10h8">
                    </path>

                    <path
                        d="M8 14h5">
                    </path>

                </svg>

            </div>


            <h3>

                ${message.title}

            </h3>


            <p>

                ${message.message}

            </p>


            <a
                href="AllProducts.php"
                class="shop-button">

                Start Shopping

            </a>


        </div>

    `;

}


/* =====================================================
   ERROR
===================================================== */

function showError(
    message
){

    document.getElementById(
        "ordersContainer"
    ).innerHTML = `

        <div
            class="error-box">


            <h3>

                Unable to load orders

            </h3>


            <p>

                ${escapeHTML(
                    message
                )}

            </p>


        </div>

    `;

}


/* =====================================================
   VIEW ORDER
===================================================== */

function viewOrder(
    orderId
){

    location.href =
        "OrderDetails.php?order_id=" +
        encodeURIComponent(
            orderId
        );

}


/* =====================================================
   FORMAT PRICE
===================================================== */

function formatPrice(
    value
){

    return Number(
        value || 0
    ).toLocaleString(
        "en-PH",
        {
            minimumFractionDigits:2,
            maximumFractionDigits:2
        }
    );

}


/* =====================================================
   FORMAT DATE
===================================================== */

function formatDate(
    date
){

    if(!date){

        return "";

    }


    const parsedDate =
        new Date(date);


    if(
        Number.isNaN(
            parsedDate.getTime()
        )
    ){

        return "";

    }


    return parsedDate.toLocaleDateString(
        "en-PH",
        {
            month:"long",
            day:"numeric",
            year:"numeric"
        }
    );

}


/* =====================================================
   HTML SECURITY
===================================================== */

function escapeHTML(
    value
){

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}


/* =====================================================
   CART BADGE
===================================================== */

function updateCartBadge(){

    /*
     * Cart is intentionally still
     * stored in localStorage,
     * based on your existing setup.
     */

    let cart = [];


    try{

        cart =
            JSON.parse(
                localStorage.getItem(
                    "cart"
                )
            ) || [];

    }
    catch(error){

        cart = [];

    }


    const totalItems =
        cart.reduce(
            (
                total,
                item
            ) => {

                return total +
                    (
                        Number(
                            item.quantity
                        ) || 0
                    );

            },
            0
        );


    const badge =
        document.getElementById(
            "bottomNotifBadge"
        );


    /*
     * No cart badge is displayed
     * in this page's bottom nav.
     *
     * Keep this function here so
     * the cart remains compatible
     * with the rest of the website.
     */

}


/* =====================================================
   START
===================================================== */

updateCartBadge();

loadOrders();


;
try { window.goBack = goBack; } catch (e) {}


/* inline onclick="viewOrder(...)" needs a global function */
try { window.viewOrder = viewOrder; } catch (e) {}

  }
}
