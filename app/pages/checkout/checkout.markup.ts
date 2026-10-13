import { pageHeader } from '../../legacy/app-shell';
// Page markup + CSS carried over unchanged from checkout.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Checkout - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `${pageHeader('index.html','Shop','Checkout')}
<!-- =====================================================
     MAIN CONTENT
===================================================== -->

<main>

<div class="checkout-container">


    <!-- =================================================
         MAIN CHECKOUT CONTAINER
    ================================================== -->

    <div class="main-checkout-section">


        <!-- COMPLETE YOUR ORDER + BACK BUTTON -->

        <div class="checkout-header">

            <button
                type="button"
                class="back-button"
                id="backButton"
                aria-label="Go back"
            >

                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                >

                    <path d="M19 12H5"></path>

                    <path d="M12 19l-7-7 7-7"></path>

                </svg>

            </button>

            <h2>
                Complete your order
            </h2>

        </div>


        <!-- =================================================
             CUSTOMER INFORMATION
        ================================================== -->

        <div class="form-section">

            <div class="form-row single" id="savedAddressGroup" hidden>
                <div class="form-group">
                    <label for="savedAddressSelect">Use a saved address</label>
                    <select id="savedAddressSelect"><option value="">Enter address manually</option></select>
                    <a class="saved-address-link" href="my-addresses.html">Manage saved addresses</a>
                </div>
            </div>

            <!-- FIRST NAME + LAST NAME -->

            <div class="form-row">

                <div class="form-group">

                    <label for="firstName">
                        First Name
                    </label>

                    <input
                        type="text"
                        id="firstName"
                        placeholder="First name"
                    >

                </div>


                <div class="form-group">

                    <label for="lastName">
                        Last Name
                    </label>

                    <input
                        type="text"
                        id="lastName"
                        placeholder="Last name"
                    >

                </div>

            </div>


            <!-- ADDRESS -->

            <div class="form-row single">

                <div class="form-group">

                    <label for="address">
                        Address
                    </label>

                    <input
                        type="text"
                        id="address"
                        placeholder="House number, street, barangay"
                    >

                </div>

            </div>


            <!-- CITY + PROVINCE -->

            <div class="form-row">

                <div class="form-group">

                    <label for="city">
                        City
                    </label>

                    <input
                        type="text"
                        id="city"
                        placeholder="City"
                    >

                </div>


                <div class="form-group">

                    <label for="province">
                        Province
                    </label>

                    <input
                        type="text"
                        id="province"
                        placeholder="Province"
                    >

                </div>

            </div>


            <!-- POSTAL CODE + PHONE -->

            <div class="form-row">

                <div class="form-group">

                    <label for="postalCode">
                        Postal Code
                    </label>

                    <input
                        type="text"
                        id="postalCode"
                        placeholder="Postal code"
                    >

                </div>


                <div class="form-group">

                    <label for="phone">
                        Phone Number
                    </label>

                    <input
                        type="tel"
                        id="phone"
                        placeholder="09XXXXXXXXXX"
                    >

                </div>

            </div>

        </div>


        <!-- =================================================
             PAYMENT OPTIONS
        ================================================== -->

        <div class="form-section">

            <div class="payment-options">


                <!-- COD -->

                <div
                    class="payment-option active"
                    data-payment="cod"
                >

                    <div class="payment-option-header">

                        <input
                            type="radio"
                            name="payment"
                            id="cod"
                            value="cod"
                            checked
                        >

                        <span>
                            Cash on Delivery
                        </span>

                    </div>

                    <p>
                        Pay when your order arrives.
                    </p>

                </div>


                <!-- GCASH -->

                <div
                    class="payment-option"
                    data-payment="gcash"
                >

                    <div class="payment-option-header">

                        <input
                            type="radio"
                            name="payment"
                            id="gcash"
                            value="gcash"
                        >

                        <span>
                            GCash
                        </span>

                    </div>

                    <p>
                        Pay using your GCash account.
                    </p>

                </div>


                <!-- SAVED PAYMENT METHOD -->

                <div
                    class="payment-option"
                    id="savedPaymentOption"
                    data-payment="saved"
                    hidden
                >

                    <div class="payment-option-header">
                        <input
                            type="radio"
                            name="payment"
                            id="savedPayment"
                            value="saved"
                        >
                        <span>Saved bank account / card</span>
                    </div>

                    <p id="savedPaymentSummary">Choose a registered payment method.</p>

                    <div class="payment-details" id="savedPaymentDetails">
                        <div class="form-group">
                            <label for="savedPaymentSelect">Registered method</label>
                            <select id="savedPaymentSelect"></select>
                        </div>
                        <a class="manage-methods-link" href="payment-methods.html">Manage saved methods</a>
                    </div>

                </div>


                <!-- CREDIT / DEBIT CARD -->

                <div
                    class="payment-option"
                    data-payment="card"
                >

                    <div class="payment-option-header">

                        <input
                            type="radio"
                            name="payment"
                            id="card"
                            value="card"
                        >

                        <span>
                            Credit / Debit Card
                        </span>

                    </div>

                    <p>
                        Pay securely using your card.
                    </p>


                    <!-- CARD DETAILS -->

                    <div
                        class="payment-details"
                        id="cardDetails"
                    >


                        <!-- CARDHOLDER -->

                        <div class="form-group">

                            <label for="cardholder">
                                Cardholder name
                            </label>

                            <input
                                type="text"
                                id="cardholder"
                                placeholder="Cardholder name"
                            >

                        </div>


                        <!-- CARD NUMBER -->

                        <div
                            class="form-group"
                            style="margin-top:16px;"
                        >

                            <label for="cardNumber">
                                Card number
                            </label>

                            <input
                                type="text"
                                id="cardNumber"
                                placeholder="Card number"
                            >

                        </div>


                        <!-- EXPIRY + CVV -->

                        <div class="card-expiry-row">

                            <div class="form-group">

                                <label for="expiry">
                                    Expiry date
                                </label>

                                <input
                                    type="text"
                                    id="expiry"
                                    placeholder="MM/YY"
                                >

                            </div>


                            <div class="form-group">

                                <label for="cvv">
                                    CVV
                                </label>

                                <input
                                    type="text"
                                    id="cvv"
                                    placeholder="CVV"
                                >

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </div>


    <!-- =================================================
         ORDER SUMMARY
    ================================================== -->

    <div class="order-summary">

        <h3>
            Order summary
        </h3>

        <div class="summary-row">

            <span>
                Total
            </span>

            <strong id="orderTotal">
                ₱0.00
            </strong>

        </div>

    </div>


    <!-- =================================================
         PLACE ORDER BUTTON
    ================================================== -->

    <div class="place-order-container">

        <button
            type="button"
            class="checkout-btn"
            id="checkoutBtn"
        >
            Place Order
        </button>

    </div>

</div>

</main>


<!-- =====================================================
     SUCCESS MODAL
===================================================== -->

<div
    class="success-modal-backdrop"
    id="successModalBackdrop"
>

    <div class="success-modal">

        <div class="success-modal-icon">

            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
                stroke-linecap="round"
                stroke-linejoin="round"
            >

                <polyline points="20 6 9 17 4 12"></polyline>

            </svg>

        </div>


        <h2>
            Order Placed Successfully!
        </h2>


        <p>
            Thank you for shopping with FurryCorner PH.<br>
            Your order has been received and is being processed.
        </p>


        <div class="success-modal-buttons">

            <button
                class="success-modal-btn primary"
                id="continueShoppingBtn"
            >
                Continue Shopping
            </button>


            <button
                class="success-modal-btn secondary"
                id="viewOrderBtn"
            >
                View Order
            </button>

        </div>

    </div>

</div>`;

export const CSS = `

:root{
    --blue:#7BB8F0;
    --blue-dark:#5CA3E8;
    --dark-blue:#315F91;
    --cream:#FCE3C0;
    --cream-light:#FDEEDA;
    --ink:#1F2430;
    --white:#ffffff;
    --muted:#8b929e;
    --border:#e2e6ec;
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
}

a{
    text-decoration:none;
    color:inherit;
}

img{
    max-width:100%;
    display:block;
}

h1,
h2,
h3,
h4,
.brand{
    font-family:'Baloo 2',cursive;
}


/* =====================================================
   CHECKOUT CONTAINER
===================================================== */

.checkout-container{
    max-width:800px;
    margin:0 auto;
    padding:30px 20px 40px;
}


/* =====================================================
   MAIN CHECKOUT CONTAINER
===================================================== */

.main-checkout-section{
    background:var(--white);
    border-radius:12px;
    padding:24px;
    margin-bottom:20px;
    box-shadow:0 2px 8px rgba(0,0,0,.04);
}


/* =====================================================
   CHECKOUT HEADER
===================================================== */

.checkout-header{
    display:flex;
    align-items:center;
    gap:14px;
    margin-bottom:24px;
    padding-bottom:18px;
    border-bottom:1px solid var(--border);
}

.back-button{
    display:flex;
    align-items:center;
    justify-content:center;
    width:38px;
    height:38px;
    flex-shrink:0;
    border:none;
    border-radius:8px;
    background:#f5f8fc;
    color:var(--blue-dark);
    cursor:pointer;
    transition:
        background .2s ease,
        transform .15s ease;
}

.back-button:hover{
    background:#eaf3fb;
}

.back-button:active{
    transform:scale(.96);
}

.back-button svg{
    width:21px;
    height:21px;
}

.checkout-header h2{
    font-size:25px;
    margin:0;
    color:var(--blue-dark);
    text-align:left;
    line-height:1.2;
}


/* =====================================================
   FORM SECTIONS
===================================================== */

.form-section{
    padding:0;
    margin-bottom:25px;
}

.saved-address-link,
.manage-methods-link{
    display:inline-block;
    margin-top:7px;
    color:var(--blue-dark);
    font-size:12px;
    font-weight:800;
}

.form-row{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:16px;
    margin-bottom:16px;
}

.form-row.single{
    grid-template-columns:1fr;
}

.form-group{
    display:flex;
    flex-direction:column;
    gap:6px;
    min-width:0;
}

.form-group label{
    font-weight:700;
    font-size:14px;
    color:var(--ink);
    line-height:1.3;
}

.form-group input,
.form-group select{
    width:100%;
    height:46px;
    padding:12px 16px;
    border:1.5px solid var(--border);
    border-radius:8px;
    font-family:'Nunito',sans-serif;
    font-size:14px;
    font-weight:600;
    color:var(--ink);
    outline:none;
    transition:
        border-color .2s ease,
        box-shadow .2s ease;
    background:#fff;
}

.form-group input:focus,
.form-group select:focus{
    border-color:var(--blue);
    box-shadow:
        0 0 0 3px rgba(123,184,240,.12);
}

.form-group input::placeholder{
    color:#9ca3af;
}


/* =====================================================
   PAYMENT OPTIONS
===================================================== */

.payment-options{
    display:flex;
    flex-direction:column;
    gap:12px;
    margin-bottom:0;
}

.payment-option{
    border:1.5px solid var(--border);
    border-radius:10px;
    padding:16px;
    cursor:pointer;
    transition:
        border-color .2s ease,
        background .2s ease;
}

.payment-option:hover{
    border-color:var(--blue);
}

.payment-option.active{
    border-color:var(--blue);
    background:var(--cream-light);
}

.payment-option-header{
    display:flex;
    align-items:center;
    gap:12px;
    margin-bottom:8px;
}

.payment-option-header input[type="radio"]{
    width:20px;
    height:20px;
    accent-color:var(--blue);
    flex-shrink:0;
}

.payment-option-header span{
    font-weight:800;
    font-size:15px;
}

.payment-option p{
    font-size:13px;
    color:var(--muted);
    margin-left:32px;
}


/* =====================================================
   PAYMENT DETAILS
===================================================== */

.payment-details{
    display:none;
    margin-top:16px;
    padding-top:16px;
    border-top:1px solid var(--border);
}

.payment-details.active{
    display:block;
}


/* =====================================================
   CARD EXPIRY + CVV
===================================================== */

.card-expiry-row{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:16px;
    margin-top:16px;
}

.card-expiry-row .form-group{
    min-width:0;
}


/* =====================================================
   ORDER SUMMARY
===================================================== */

.order-summary{
    background:var(--white);
    border-radius:12px;
    padding:24px;
    margin-bottom:12px;
    box-shadow:0 2px 8px rgba(0,0,0,.04);
}

.order-summary h3{
    font-size:19px;
    font-weight:800;
    margin-bottom:16px;
    color:var(--dark-blue);
}

.summary-row{
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:12px 0;
    border-bottom:1px solid var(--border);
}

.summary-row:last-child{
    border-bottom:none;
    font-size:18px;
    font-weight:800;
    color:var(--dark-blue);
}


/* =====================================================
   PLACE ORDER BUTTON
===================================================== */

.place-order-container{
    width:100%;
    margin-bottom:20px;
}

.checkout-btn{
    width:100%;
    height:52px;
    border:none;
    border-radius:10px;
    background:var(--blue);
    color:var(--white);
    font-family:'Nunito',sans-serif;
    font-size:16px;
    font-weight:800;
    cursor:pointer;
    transition:
        background .2s ease,
        transform .15s ease;
}

.checkout-btn:hover{
    background:var(--blue-dark);
}

.checkout-btn:active{
    transform:scale(.99);
}

.checkout-btn:disabled{
    background:#cbd2db;
    cursor:not-allowed;
}


/* =====================================================
   SUCCESS MODAL
===================================================== */

.success-modal-backdrop{
    position:fixed;
    inset:0;
    background:rgba(31,36,48,.5);
    backdrop-filter:blur(2px);
    z-index:9999;
    display:none;
    align-items:center;
    justify-content:center;
    padding:20px;
}

.success-modal-backdrop.open{
    display:flex;
}

.success-modal{
    background:var(--white);
    border-radius:16px;
    padding:40px 30px;
    max-width:420px;
    width:100%;
    text-align:center;
    box-shadow:0 24px 60px rgba(0,0,0,.25);
}

.success-modal-icon{
    width:80px;
    height:80px;
    background:var(--blue);
    border-radius:50%;
    display:flex;
    align-items:center;
    justify-content:center;
    margin:0 auto 24px;
}

.success-modal-icon svg{
    width:40px;
    height:40px;
    color:var(--white);
}

.success-modal h2{
    font-size:24px;
    font-weight:800;
    margin-bottom:8px;
    color:var(--ink);
}


/* =====================================================
   SUCCESS MODAL SUBTEXT
   COMPACT TWO-LINE VERSION
===================================================== */

.success-modal p{
    width:100%;
    max-width:330px;
    margin:0 auto 22px;
    font-size:12px;
    font-weight:600;
    color:var(--muted);
    line-height:1.35;
}

.success-modal p br{
    display:block;
}


/* =====================================================
   MODAL BUTTONS - SAME LEVEL
===================================================== */

.success-modal-buttons{
    display:grid;
    grid-template-columns:1fr 1fr;
    gap:12px;
    width:100%;
}

.success-modal-btn{
    width:100%;
    height:48px;
    border:none;
    border-radius:10px;
    font-family:'Nunito',sans-serif;
    font-size:14px;
    font-weight:800;
    cursor:pointer;
    transition:
        background .2s ease,
        transform .15s ease;
}

.success-modal-btn:active{
    transform:scale(.98);
}

.success-modal-btn.primary{
    background:var(--blue);
    color:var(--white);
}

.success-modal-btn.primary:hover{
    background:var(--blue-dark);
}

.success-modal-btn.secondary{
    background:#f0f4f8;
    color:var(--ink);
}

.success-modal-btn.secondary:hover{
    background:#e5ebf2;
}


/* =====================================================
   RESPONSIVE
===================================================== */

@media(max-width:600px){

    .checkout-container{
        padding:20px 15px 30px;
    }

    .main-checkout-section,
    .order-summary{
        padding:20px;
    }

    .checkout-header{
        gap:10px;
        margin-bottom:22px;
        padding-bottom:16px;
    }

    .checkout-header h2{
        font-size:23px;
    }

    .back-button{
        width:36px;
        height:36px;
    }

    .form-row{
        grid-template-columns:1fr;
        gap:16px;
    }

    .card-expiry-row{
        grid-template-columns:1fr 1fr;
        gap:12px;
    }

    .success-modal{
        padding:30px 20px;
    }

    .success-modal h2{
        font-size:22px;
        margin-bottom:7px;
    }

    /* Smaller 2-line success message */
    .success-modal p{
        max-width:300px;
        font-size:11.5px;
        line-height:1.35;
        margin-bottom:20px;
    }

    .success-modal-buttons{
        grid-template-columns:1fr 1fr;
        gap:10px;
    }

    .success-modal-btn{
        height:46px;
        font-size:13px;
    }
}

`;
