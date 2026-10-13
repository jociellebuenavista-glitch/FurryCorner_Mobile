// @ts-nocheck  (legacy script below is plain JavaScript carried over from order-confirmation.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './order-confirmation.markup';

@Component({
  selector: 'app-order-confirmation',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class OrderConfirmationPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of order-confirmation.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {


/* =====================================================
   FORMAT PESO
===================================================== */

function peso(number){

    return '₱' +
        Number(number || 0)
            .toLocaleString(
                'en-PH',
                {
                    minimumFractionDigits:2,
                    maximumFractionDigits:2
                }
            );

}


/* =====================================================
   GET LAST ORDER ID
===================================================== */
/* =====================================================
   GET LAST ORDER ID + LOGGED-IN USER
===================================================== */

const orderId =
    localStorage.getItem(
        'lastOrderId'
    );


const loggedInUser =
    JSON.parse(
        localStorage.getItem(
            'loggedInUser'
        ) || 'null'
    );


const userId =
    loggedInUser
        ? Number(loggedInUser.user_id || loggedInUser.id || 0)
        : 0;


console.log("Last Order ID:", orderId);
console.log("Logged In User:", loggedInUser);
console.log("User ID:", userId);


/* =====================================================
   ROOT
===================================================== */

const root =
    document.getElementById(
        'confirmationRoot'
    );


/* =====================================================
   LOAD ORDER
===================================================== */
async function loadOrder(){

    if(!orderId){

        showEmptyOrder(
            'No recent order ID was found.'
        );

        return;

    }


    console.log('========== LOAD ORDER ==========');
    console.log('Order ID:', orderId);
    console.log('User ID:', userId);


    try{

        const url =
            window.FURRY_API + '/getOrderConfirmation.php'
            + '?order_id='
            + encodeURIComponent(orderId)
            + '&user_id='
            + encodeURIComponent(userId);


        console.log(
            'Request URL:',
            url
        );


        const response =
            await fetch(url);


        const responseText =
            await response.text();


        console.log(
            'RAW SERVER RESPONSE:',
            responseText
        );


        let data;

        try{

            data =
                JSON.parse(responseText);

        }catch(error){

            console.error(
                'Invalid JSON from server:',
                responseText
            );

            throw new Error(
                'Invalid server response'
            );

        }


        console.log(
            'getOrderConfirmation.php response:',
            data
        );


        if(!data.success){

            showEmptyOrder(
                data.message
            );

            return;

        }


        /*
         * Depending on the PHP response,
         * the order may be inside data.order.
         */

        const order =
            data.order;


        if(!order){

            console.error(
                'No order object returned:',
                data
            );

            showEmptyOrder(
                'Order information was not returned by the server.'
            );

            return;

        }


        renderOrder(order);


    }catch(error){

        console.error(
            'Order loading error:',
            error
        );


        root.innerHTML = `

            <div class="confirmation-empty">

                <h2>
                    Unable to load order
                </h2>

                <p>
                    ${error.message}
                </p>

                <button
                    class="shop-btn"
                    onclick="loadOrder()"
                >
                    Try Again
                </button>

            </div>

        `;

    }

}


/* =====================================================
   EMPTY ORDER
===================================================== */

function showEmptyOrder(message){

    root.innerHTML = `

        <div class="confirmation-empty">

            <h2>
                No recent order found
            </h2>

            <p>
                ${
                    message ||
                    "We couldn't find your recent order."
                }
            </p>

            <a
                href="index.html"
                class="shop-btn"
            >
                Continue Shopping
            </a>

        </div>

    `;

}


/* =====================================================
   RENDER ORDER
===================================================== */

function renderOrder(order){

    const items =
        order.items || [];


    const itemCount =
        items.reduce(
            (sum,item) =>
                sum +
                Number(item.quantity || 0),
            0
        );


    const addressLine = [

        order.address,

        order.city,

        order.province,

        order.postal_code,

        'Philippines'

    ]
    .filter(Boolean)
    .join(', ');


    const itemsHtml =
        items.map(item => {

            return `

                <div class="confirmation-item">

                    <img
                        src="images/product-${item.product_id}.png"
                        alt="${item.product_name}"
                        onerror="this.style.display='none'"
                    >

                    <div class="confirmation-item-info">

                        <div class="confirmation-item-name">

                            ${item.product_name}

                        </div>

                        <div class="confirmation-item-quantity">

                            Quantity:
                            ${item.quantity}

                        </div>

                    </div>

                    <div class="confirmation-item-price">

                        ${peso(item.item_total)}

                    </div>

                </div>

            `;

        })
        .join('');


    root.innerHTML = `

        <!-- HEADER -->

        <div class="confirmation-header">

            <h2>
                Thank you, ${order.first_name || 'friend'}!
            </h2>

            <div class="confirmation-check-row">

                <div class="check-icon">
                    ✓
                </div>

                Your order is confirmed.

            </div>

            <p class="confirmation-note">

                Your order has been successfully placed.

            </p>

        </div>


        <!-- ORDER ID -->

        <div class="confirm-box">

            <p class="confirm-order-id">

                Order #${order.order_id}

            </p>

        </div>


        <!-- CUSTOMER INFORMATION -->

        <div class="confirm-box">

            <h3>
                Customer Information
            </h3>


            <h4>
                Contact
            </h4>

            <p>
                ${order.phone || '-'}
            </p>


            <h4>
                Shipping Address
            </h4>

            <p>
                ${addressLine || '-'}
            </p>


            <h4>
                Shipping Method
            </h4>

            <p>
                Standard Delivery
            </p>

        </div>


        <!-- PAYMENT -->

        <div class="confirm-box">

            <h3>
                Payment Method
            </h3>

            <p>
                ${formatPayment(order.payment_method)}
            </p>

        </div>


        <!-- ORDER SUMMARY -->

        <div class="confirm-box confirmation-summary-box">

            <h3>

                Order Summary
                (${itemCount}
                item${itemCount === 1 ? '' : 's'})

            </h3>


            <div>

                ${itemsHtml}

            </div>


            <div class="confirmation-totals">

                <div class="summary-row">

                    <span>
                        Subtotal
                    </span>

                    <span>
                        ${peso(order.subtotal)}
                    </span>

                </div>


                <div class="summary-row">

                    <span>
                        Shipping
                    </span>

                    <span>
                        ${peso(order.shipping_fee)}
                    </span>

                </div>


                <div class="summary-row total">

                    <span>
                        Total
                    </span>

                    <span>
                        ${peso(order.total_amount)}
                    </span>

                </div>

            </div>

        </div>


        <!-- CONTINUE SHOPPING -->

        <a
            href="index.html"
            class="shop-btn"
        >

            Continue Shopping

        </a>

    `;

}


/* =====================================================
   PAYMENT DISPLAY
===================================================== */

function formatPayment(payment){

    if(!payment){

        return '-';

    }


    const value =
        payment.toLowerCase();


    if(value === 'cod'){

        return 'Cash on Delivery';

    }


    if(value === 'gcash'){

        return 'GCash';

    }


    if(value === 'card'){

        return 'Credit / Debit Card';

    }


    return payment;

}


/* =====================================================
   START
===================================================== */

loadOrder();


;



/* inline onclick="loadOrder()" (Try again) needs a global function */
try { window.loadOrder = loadOrder; } catch (e) {}

  }
}
