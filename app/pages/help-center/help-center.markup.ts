// Page markup + CSS carried over unchanged from help-center.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Help Center - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><img src="images/logo.png" alt="">Help Center</a><a class="back-link" href="profile.html">Profile</a></div></header>
<section class="intro-band"><div class="intro-inner"><p class="eyebrow">Support</p><h1>Help Center</h1><p>Find answers about accounts, shopping, orders, services, and notifications.</p></div></section>
<main class="content">
    <section class="faq-section" aria-labelledby="account-heading">
        <h2 id="account-heading">Account</h2>
        <details class="faq-item"><summary>How do I sign up?</summary><p class="faq-answer">Open the sign-up page, enter your name, email, and password, then submit the form. Use an email address you can access.</p></details>
        <details class="faq-item"><summary>How do I log in?</summary><p class="faq-answer">Open the sign-in page and enter the email address and password associated with your account.</p></details>
        <details class="faq-item"><summary>How do I reset my password?</summary><p class="faq-answer">Password reset instructions: [password reset link or support email].</p></details>
    </section>
    <section class="faq-section" aria-labelledby="shopping-heading">
        <h2 id="shopping-heading">Shopping</h2>
        <details class="faq-item"><summary>How do I browse products?</summary><p class="faq-answer">Browse the product categories and open a product to see its details. Availability and prices are shown in the catalog.</p></details>
        <details class="faq-item"><summary>How do I use the cart?</summary><p class="faq-answer">Choose Add to Cart on a product. Review your selections in the cart before continuing to checkout.</p></details>
        <details class="faq-item"><summary>How do I check out?</summary><p class="faq-answer">Open the cart, choose Checkout, and complete the requested delivery and payment details before placing the order.</p></details>
    </section>
    <section class="faq-section" aria-labelledby="payments-heading">
        <h2 id="payments-heading">Payments</h2>
        <details class="faq-item"><summary>Which payment methods are accepted?</summary><p class="faq-answer">Accepted payment methods: [payment methods]. Available options are shown during checkout.</p></details>
        <details class="faq-item"><summary>How can I check my payment status?</summary><p class="faq-answer">Check the order status shown in your account. If it does not reflect your payment, contact [support email] with your order reference.</p></details>
    </section>
    <section class="faq-section" aria-labelledby="delivery-heading">
        <h2 id="delivery-heading">Orders and Delivery</h2>
        <details class="faq-item"><summary>How do I track my order?</summary><p class="faq-answer">Open Purchase Status from your account to view available order updates and tracking details.</p></details>
        <details class="faq-item"><summary>What if my order is delayed?</summary><p class="faq-answer">Delivery estimates are [X-X business days]. Delays may depend on the delivery area or carrier. For an update, contact [support email] with your order reference.</p></details>
    </section>
    <section class="faq-section" aria-labelledby="services-heading">
        <h2 id="services-heading">Service Bookings</h2>
        <details class="faq-item"><summary>How do I book grooming or boarding?</summary><p class="faq-answer">Choose a service, select an available date and time, and submit the requested pet and contact details. Booking confirmation: [confirmation process].</p></details>
        <details class="faq-item"><summary>Can I reschedule a service?</summary><p class="faq-answer">Rescheduling notice: [X hours]. Contact [support email or phone] with your booking details to request a change.</p></details>
        <details class="faq-item"><summary>How do I cancel a booking?</summary><p class="faq-answer">Cancellation window and any fee: [cancellation policy] and [fee]. Contact [support email or phone] with your booking details.</p></details>
    </section>
    <section class="faq-section" aria-labelledby="notifications-heading">
        <h2 id="notifications-heading">Notifications</h2>
        <details class="faq-item"><summary>Where can I see notifications?</summary><p class="faq-answer">Open Notifications from your profile to view available updates. Notification preferences: [preference settings].</p></details>
    </section>
    <section class="still-help"><div><h2>Still need help?</h2><p>Send a message through the Contact Us form.</p></div><a class="help-button" href="about.html#contact">Contact Us</a></section>
</main>
<footer class="site-footer"><div class="footer-inner"><a class="footer-brand" href="index.html">FurryCorner PH</a><nav class="footer-links" aria-label="Information"><a href="help-center.html">Help Center</a><a href="community-rules.html">Community Rules</a><a href="policies.html">Policies</a></nav></div></footer>`;

export const CSS = `
:root{--blue:#7BB8F0;--blue-dark:#5CA3E8;--cream-light:#FDEEDA;--ink:#1F2430;--white:#fff;--muted:#7c8490;--border:#e2e6ec}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;color:var(--ink);background:var(--cream-light);line-height:1.55}
a{color:inherit;text-decoration:none}
h1,h2,h3,.brand{font-family:'Baloo 2',cursive}
.site-header{background:var(--white);border-bottom:1px solid var(--border)}
.header-inner{width:min(100% - 32px,1080px);min-height:68px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:10px;color:var(--blue-dark);font-size:23px;font-weight:800}
.brand img{width:40px;height:40px;object-fit:contain}
.back-link{font-weight:800;color:var(--blue-dark);padding:9px 12px;border-radius:8px}
.back-link:hover{background:var(--cream-light)}
.intro-band{background:var(--blue);padding:42px 16px}
.intro-inner{width:min(100%,960px);margin:auto}
.eyebrow{color:#245784;font-size:12px;font-weight:800;text-transform:uppercase}
.intro-band h1{font-size:40px;line-height:1.12;margin:7px 0}
.intro-band p{max-width:640px;color:#26394b}
.content{width:min(100% - 32px,880px);margin:auto}
.faq-section{padding:28px 0;border-bottom:1px solid #e4d8c7}
.faq-section h2{font-size:22px;margin-bottom:8px}
.faq-item{border-top:1px solid #e1d8cb}
.faq-item summary{position:relative;list-style:none;padding:15px 38px 15px 0;font-weight:800;cursor:pointer}
.faq-item summary::-webkit-details-marker{display:none}
.faq-item summary::after{content:'+';position:absolute;right:5px;top:10px;color:var(--blue-dark);font-size:23px;font-weight:600}
.faq-item[open] summary::after{content:'-'}
.faq-item summary:focus-visible,.footer-links a:focus-visible,.back-link:focus-visible,.help-button:focus-visible{outline:3px solid #245784;outline-offset:3px}
.faq-answer{max-width:720px;padding:0 20px 16px 0;color:#515866}
.still-help{display:flex;align-items:center;justify-content:space-between;gap:20px;padding:27px 0 38px}
.still-help h2{font-size:22px}
.still-help p{color:#515866}
.help-button{flex:0 0 auto;padding:11px 16px;border-radius:7px;background:var(--blue-dark);color:var(--white);font-weight:800}
.site-footer{background:var(--white);border-top:1px solid var(--border)}
.footer-inner{width:min(100% - 32px,960px);margin:auto;padding:21px 0 25px;display:flex;justify-content:space-between;align-items:center;gap:18px}
.footer-brand{font:800 17px 'Baloo 2',cursive;color:var(--blue-dark)}
.footer-links{display:flex;flex-wrap:wrap;gap:8px 18px;color:#515866;font-size:13px;font-weight:700}
.footer-links a:hover{color:var(--blue-dark)}
@media(max-width:560px){.header-inner{min-height:60px}.brand{font-size:20px}.brand img{width:34px;height:34px}.intro-band{padding:34px 16px}.intro-band h1{font-size:34px}.faq-section{padding:24px 0}.still-help{align-items:flex-start;flex-direction:column}.footer-inner{align-items:flex-start;flex-direction:column}}
`;
