// @ts-nocheck  (legacy script below is plain JavaScript carried over from checkout.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './checkout.markup';

@Component({
  selector: 'app-checkout',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class CheckoutPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of checkout.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {

console.log(
    "loggedInUserId:",
    localStorage.getItem("loggedInUserId")
);

console.log(
    "loggedInUser:",
    localStorage.getItem("loggedInUser")
);

console.log(
    "furryCornerUser:",
    localStorage.getItem("furryCornerUser")
);

/* =====================================================
   REQUIRE LOGIN
===================================================== */

const loggedUser =
    JSON.parse(
        localStorage.getItem('loggedInUser') || 'null'
    );

const userId =
    localStorage.getItem('loggedInUserId') ||
    loggedUser?.user_id ||
    loggedUser?.id;


if(!userId){
    location.replace('signin.html?return=checkout.html');

}

/* =====================================================
   BACK BUTTON
===================================================== */

const backButton =
    document.getElementById('backButton');

backButton.addEventListener('click', () => {

    if(window.history.length > 1){

        window.history.back();

    }else{

        location.href =
            'index.html';

    }

});


/* =====================================================
   PAYMENT OPTIONS
===================================================== */

const paymentOptions =
    document.querySelectorAll(
        '.payment-option'
    );


const paymentDetails = {

    cod:null,

    gcash:null,

    card:
        document.getElementById(
            'cardDetails'
        ),

    saved:
        document.getElementById(
            'savedPaymentDetails'
        )

};

const savedAddressGroup = document.getElementById('savedAddressGroup');
const savedAddressSelect = document.getElementById('savedAddressSelect');
const savedPaymentOption = document.getElementById('savedPaymentOption');
const savedPaymentSelect = document.getElementById('savedPaymentSelect');
const savedPaymentSummary = document.getElementById('savedPaymentSummary');
let savedCheckoutAddresses = [];
let savedPaymentMethods = [];


paymentOptions.forEach(option => {

    option.addEventListener(
        'click',
        () => {


            /* Remove active from all */

            paymentOptions.forEach(opt => {

                opt.classList.remove(
                    'active'
                );

            });


            /* Activate selected */

            option.classList.add(
                'active'
            );


            /* Hide all payment details */

            Object.values(
                paymentDetails
            ).forEach(detail => {

                if(detail){

                    detail.classList.remove(
                        'active'
                    );

                }

            });


            /* Get selected payment */

            const paymentType =
                option.dataset.payment;


            /* Show selected details */

            if(
                paymentDetails[paymentType]
            ){

                paymentDetails[
                    paymentType
                ].classList.add(
                    'active'
                );

            }


            /* Check radio */

            const radio =
                option.querySelector(
                    'input[type="radio"]'
                );

            if(radio){

                radio.checked = true;

            }

        }
    );

});


function applySavedAddress(address){
    document.getElementById('firstName').value = address.first_name || '';
    document.getElementById('lastName').value = address.last_name || '';
    document.getElementById('address').value = address.address_line || '';
    document.getElementById('city').value = address.city || '';
    document.getElementById('province').value = address.province || '';
    document.getElementById('postalCode').value = address.postal_code || '';
    document.getElementById('phone').value = address.phone || '';
}


async function loadSavedCheckoutDetails(){
    try{
        const [addressResponse, methodsResponse] = await Promise.all([
            fetch(window.FURRY_API + '/userAddresses.php', {headers:{Accept:'application/json'}}),
            fetch(window.FURRY_API + '/paymentMethods.php', {headers:{Accept:'application/json'}})
        ]);
        const [addressData, methodsData] = await Promise.all([
            addressResponse.json(),
            methodsResponse.json()
        ]);

        if(addressResponse.ok && addressData.success && addressData.addresses?.length){
            savedCheckoutAddresses = addressData.addresses;
            savedCheckoutAddresses.forEach(address => {
                const option = document.createElement('option');
                option.value = address.address_id;
                option.textContent = `${address.address_label} - ${address.address_line}, ${address.city}`;
                savedAddressSelect.append(option);
            });
            savedAddressGroup.hidden = false;
            const defaultAddress = savedCheckoutAddresses.find(address => Number(address.is_default) === 1) || savedCheckoutAddresses[0];
            savedAddressSelect.value = defaultAddress.address_id;
            applySavedAddress(defaultAddress);
        }

        if(methodsResponse.ok && methodsData.success && methodsData.payment_methods?.length){
            savedPaymentMethods = methodsData.payment_methods;
            savedPaymentMethods.forEach(method => {
                const option = document.createElement('option');
                option.value = method.payment_method_id;
                const type = method.method_type === 'card' ? 'Card' : 'Bank account';
                option.textContent = `${method.method_label} - ${type} ending in ${method.last_four}`;
                savedPaymentSelect.append(option);
            });
            savedPaymentOption.hidden = false;
            const defaultMethod = savedPaymentMethods.find(method => Number(method.is_default) === 1) || savedPaymentMethods[0];
            savedPaymentSelect.value = defaultMethod.payment_method_id;
            savedPaymentSummary.textContent = `Selected: ${defaultMethod.method_label} ending in ${defaultMethod.last_four}`;
        }
    }catch(error){
        console.error('Unable to load saved checkout details:', error);
    }
}


savedAddressSelect.addEventListener('change', () => {
    const selectedAddress = savedCheckoutAddresses.find(
        address => String(address.address_id) === savedAddressSelect.value
    );
    if(selectedAddress) applySavedAddress(selectedAddress);
});


savedPaymentSelect.addEventListener('change', () => {
    const selectedMethod = savedPaymentMethods.find(
        method => String(method.payment_method_id) === savedPaymentSelect.value
    );
    if(selectedMethod){
        savedPaymentSummary.textContent = `Selected: ${selectedMethod.method_label} ending in ${selectedMethod.last_four}`;
    }
});


/* =====================================================
   GET CART TOTAL
===================================================== */

const orderTotal =
    document.getElementById(
        'orderTotal'
    );


function updateOrderTotal(){

    const items =
        JSON.parse(
            localStorage.getItem(
                'checkoutItems'
            ) || '[]'
        );


    const total =
        items.reduce(
            (sum, item) => {

                return sum +
                    (
                        Number(item.price) *
                        Number(item.quantity || 0)
                    );

            },
            0
        );


    orderTotal.textContent =
        '₱' + total.toFixed(2);

}


/* =====================================================
   SUCCESS MODAL
===================================================== */

const successModalBackdrop =
    document.getElementById(
        'successModalBackdrop'
    );


const continueShoppingBtn =
    document.getElementById(
        'continueShoppingBtn'
    );


const viewOrderBtn =
    document.getElementById(
        'viewOrderBtn'
    );


function openSuccessModal(){

    successModalBackdrop.classList.add(
        'open'
    );

}


function closeSuccessModal(){

    successModalBackdrop.classList.remove(
        'open'
    );

}


continueShoppingBtn.addEventListener(

    'click',

    () => {

        /* Clear cart after successful order */

        localStorage.removeItem('cart');


        /* Close modal before redirect */

        closeSuccessModal();


        /* Return to home page */

        location.href =
            'index.html';

    }

);


/* =====================================================
   VIEW ORDER
===================================================== */

viewOrderBtn.addEventListener(
    'click',
    () => {

        const lastOrderId =
            localStorage.getItem('lastOrderId');

        if (!lastOrderId) {
            alert('Order information could not be found.');
            return;
        }

        location.href =
            'order-confirmation.html';
    }
);

/* =====================================================
   PLACE ORDER BUTTON
===================================================== */

const checkoutBtn =
    document.getElementById(
        'checkoutBtn'
    );


checkoutBtn.addEventListener(

    'click',

    async () => {

        /* =================================================
           GET CUSTOMER INFORMATION
        ================================================= */

        const firstName =
            document
                .getElementById('firstName')
                .value
                .trim();


        const lastName =
            document
                .getElementById('lastName')
                .value
                .trim();


        const address =
            document
                .getElementById('address')
                .value
                .trim();


        const city =
            document
                .getElementById('city')
                .value
                .trim();


        const province =
            document
                .getElementById('province')
                .value
                .trim();


        const postalCode =
            document
                .getElementById('postalCode')
                .value
                .trim();


        const phone =
            document
                .getElementById('phone')
                .value
                .trim();


        /* =================================================
           VALIDATE
        ================================================= */

        if (
            !firstName ||
            !lastName ||
            !address ||
            !city ||
            !province ||
            !postalCode ||
            !phone
        ) {

            alert(
                'Please fill in all required fields.'
            );

            return;

        }


        /* =================================================
           PAYMENT
        ================================================= */

        const selectedPayment =
            document.querySelector(
                'input[name="payment"]:checked'
            );


        const selectedPaymentValue =
            selectedPayment
                ? selectedPayment.value
                : 'cod';

        const savedPaymentMethodId = selectedPaymentValue === 'saved'
            ? Number(savedPaymentSelect.value)
            : 0;

        if(selectedPaymentValue === 'saved' && !savedPaymentMethodId){
            alert('Choose a saved payment method or select another payment option.');
            return;
        }

        const paymentMethod = selectedPaymentValue === 'saved'
            ? 'saved'
            : selectedPaymentValue;


        /* =================================================
           GET CHECKOUT ITEMS
        ================================================= */

        const items =
            JSON.parse(
                localStorage.getItem(
                    'checkoutItems'
                ) || '[]'
            );


        if (
            !items ||
            items.length === 0
        ) {

            alert(
                'Your cart is empty.'
            );

            return;

        }


        /* =================================================
           CALCULATE SUBTOTAL
        ================================================= */

        const subtotal =
            items.reduce(
                (sum, item) => {

                    return sum +
                        (
                            Number(item.price) *
                            Number(item.quantity || 0)
                        );

                },
                0
            );


        /* =================================================
           SHIPPING
        ================================================= */

        /*
           Change this if your website
           uses a different shipping fee.
        */

        const shippingFee = 0;


        const totalAmount =
            subtotal +
            shippingFee;


        /* =================================================
           DISABLE BUTTON
        ================================================= */

        checkoutBtn.disabled =
            true;

        checkoutBtn.textContent =
            'Placing Order...';


        try {

        /* =================================================
        SEND ORDER TO DATABASE
        ================================================= */

        const orderData = {

            user_id: Number(userId),

            first_name: firstName,

            last_name: lastName,

            address: address,

            city: city,

            province: province,

            postal_code: postalCode,

            phone: phone,

            payment_method: paymentMethod,

            saved_payment_method_id: savedPaymentMethodId,

            subtotal: subtotal,

            shipping_fee: shippingFee,

            total_amount: totalAmount,

            items: items

        };


        console.log(
            "SENDING ORDER DATA:",
            orderData
        );


        const response = await fetch(
            window.FURRY_API + '/createOrder.php',
            {
                method: 'POST',

                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },

                body: JSON.stringify(orderData)
            }
        );


        /* =================================================
        READ SERVER RESPONSE
        ================================================= */

        const responseText =
            await response.text();


        console.log(
            "RAW SERVER RESPONSE:",
            responseText
        );


        let data;

        try {

            data = JSON.parse(responseText);

        } catch(error) {

            console.error(
                "SERVER DID NOT RETURN VALID JSON:",
                responseText
            );

            throw new Error(
                "Invalid server response"
            );

        }


        console.log(
            "createOrder.php response:",
            data
        );

            /* =================================================
               DATABASE SUCCESS
            ================================================= */

            if(data.success){

                /*
                   Save the real database
                   order ID.
                */

                localStorage.setItem(
                    'lastOrderId',
                    data.order_id
                );


                /*
                   Remove checkout items.
                */

                localStorage.removeItem(
                    'checkoutItems'
                );


                /*
                   Open success modal.
                */

                openSuccessModal();

            }

            else{

                alert(
                    data.message ||
                    'Unable to place your order.'
                );

            }


        } catch(error){

            console.error(
                'Order error:',
                error
            );


            alert(
                'Unable to connect to the server. Please try again.'
            );

        }


        checkoutBtn.disabled =
            false;

        checkoutBtn.textContent =
            'Place Order';

    }

);


/* =====================================================
   INITIALIZE ORDER TOTAL
===================================================== */

updateOrderTotal();
loadSavedCheckoutDetails();


;


  }
}
