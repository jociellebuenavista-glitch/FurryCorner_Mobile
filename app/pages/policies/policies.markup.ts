// Page markup + CSS carried over unchanged from policies.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `FurryCorner Policies - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><img src="images/logo.png" alt="">FurryCorner Policies</a><a class="back-link" href="profile.html">Profile</a></div></header>
<section class="intro-band"><div class="intro-inner"><p class="eyebrow">Information</p><h1>FurryCorner Policies</h1><p>Review the general terms for using FurryCorner, shopping, and booking services.</p></div></section>
<main class="content">
    <p class="policy-note">Items in brackets are placeholders that must be confirmed before publication.</p>
    <details class="policy-section"><summary>Terms of Use</summary><div class="policy-copy"><p>Use FurryCorner to browse products, place orders, and request pet care services. Provide accurate account, order, and booking information, and keep your sign-in details private.</p><p>Product availability, prices, service details, and applicable fees are shown in the app and may change. Additional terms and effective date: [terms] and [effective date].</p></div></details>
    <details class="policy-section"><summary>Privacy Policy</summary><div class="policy-copy"><p>FurryCorner may collect information you provide, including your name, email, phone number, delivery details, account information, order and booking details, and payment-related information.</p><p>This information is used to create and manage accounts, process orders and bookings, provide delivery and service updates, and respond to support requests. Payment details are handled according to the selected payment method: [payment handling details].</p><p>Protection measures: [security safeguards]. Retention period: [retention period]. Privacy questions or requests: [privacy contact].</p></div></details>
    <details class="policy-section"><summary>Payment Policy</summary><div class="policy-copy"><p>Accepted payment methods: [payment methods]. Available options and any applicable charges are shown during checkout before an order is submitted.</p><p>Payment confirmation and processing time: [payment confirmation process] and [processing time]. If a payment status is unclear, contact [support contact] with the order reference.</p></div></details>
    <details class="policy-section"><summary>Shipping and Delivery</summary><div class="policy-copy"><p>Delivery is available in [service areas]. Estimated delivery time is [X-X business days], and delivery fees are [fee or fee calculation]. Any available tracking details are shown with the order.</p><p>Delivery estimates may change due to address coverage, carrier operations, weather, or other delays. For delivery questions, contact [support contact].</p></div></details>
    <details class="policy-section"><summary>Return and Refund</summary><div class="policy-copy"><p>Return eligibility period: [X days]. Eligible items, condition requirements, and exclusions: [return conditions]. Return shipping or handling fee: [fee].</p><p>Refund method and processing time: [refund method] and [X business days]. Contact [support contact] with your order reference before sending an item back.</p></div></details>
    <details class="policy-section"><summary>Service Booking and Cancellation</summary><div class="policy-copy"><p>Service requests are subject to availability and confirmation. Please provide accurate details about your pet and arrive at the confirmed time.</p><p>Rescheduling notice: [X hours]. Cancellation window: [X hours or days]. Applicable cancellation or no-show fee: [fee]. To request a change, contact [service contact].</p></div></details>
    <details class="policy-section"><summary>Pet Safety and Liability</summary><div class="policy-copy"><p>For grooming and boarding, provide relevant information about your pet's health, behavior, care needs, and emergency contact. Follow the care instructions provided for the booked service.</p><p>Safety procedures and service responsibilities: [procedures and responsibilities]. Any limits or allocation of liability must be specified in terms reviewed for the applicable location: [reviewed terms].</p></div></details>
</main>
<footer class="site-footer"><div class="footer-inner"><a class="footer-brand" href="index.html">FurryCorner PH</a><nav class="footer-links" aria-label="Information"><a href="help-center.html">Help Center</a><a href="community-rules.html">Community Rules</a><a href="policies.html">Policies</a></nav></div></footer>`;

export const CSS = `
:root{--blue:#7BB8F0;--blue-dark:#5CA3E8;--cream-light:#FDEEDA;--ink:#1F2430;--white:#fff;--muted:#7c8490;--border:#e2e6ec}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;color:var(--ink);background:var(--cream-light);line-height:1.55}
a{color:inherit;text-decoration:none}
h1,h2,.brand{font-family:'Baloo 2',cursive}
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
.content{width:min(100% - 32px,880px);margin:auto;padding:18px 0 40px}
.policy-note{margin:0 0 18px;color:#515866;font-size:14px}
.policy-section{border-top:1px solid #e4d8c7}
.policy-section:last-child{border-bottom:1px solid #e4d8c7}
.policy-section summary{position:relative;list-style:none;padding:18px 40px 18px 0;font:700 21px 'Baloo 2',cursive;cursor:pointer}
.policy-section summary::-webkit-details-marker{display:none}
.policy-section summary::after{content:'+';position:absolute;right:5px;top:13px;color:var(--blue-dark);font:600 25px 'Nunito',sans-serif}
.policy-section[open] summary::after{content:'-'}
.policy-section summary:focus-visible,.footer-links a:focus-visible,.back-link:focus-visible{outline:3px solid #245784;outline-offset:3px}
.policy-copy{max-width:760px;padding:0 16px 18px 0;color:#515866}
.policy-copy p+p{margin-top:10px}
.policy-copy ul{margin:8px 0 0 20px}
.site-footer{background:var(--white);border-top:1px solid var(--border)}
.footer-inner{width:min(100% - 32px,960px);margin:auto;padding:21px 0 25px;display:flex;justify-content:space-between;align-items:center;gap:18px}
.footer-brand{font:800 17px 'Baloo 2',cursive;color:var(--blue-dark)}
.footer-links{display:flex;flex-wrap:wrap;gap:8px 18px;color:#515866;font-size:13px;font-weight:700}
.footer-links a:hover{color:var(--blue-dark)}
@media(max-width:560px){.header-inner{min-height:60px}.brand{font-size:20px}.brand img{width:34px;height:34px}.intro-band{padding:34px 16px}.intro-band h1{font-size:34px}.policy-section summary{font-size:19px}.footer-inner{align-items:flex-start;flex-direction:column}}
`;
