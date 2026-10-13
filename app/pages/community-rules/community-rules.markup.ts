// Page markup + CSS carried over unchanged from community-rules.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Community Rules - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><img src="images/logo.png" alt="">Community Rules</a><a class="back-link" href="profile.html">Profile</a></div></header>
<section class="intro-band"><div class="intro-inner"><p class="eyebrow">Community</p><h1>Community Rules</h1><p>Help keep FurryCorner useful, respectful, and focused on pet care.</p></div></section>
<main class="content">
    <p class="rules-intro">These rules apply when using FurryCorner and interacting with other community members.</p>
    <ol class="rules-list">
        <li><div><h2>Be respectful</h2><p>Communicate with courtesy and treat customers, providers, and other community members respectfully.</p></div></li>
        <li><div><h2>Keep reviews honest</h2><p>Share reviews based on your own experience and describe it accurately.</p></div></li>
        <li><div><h2>No spam or fake reviews</h2><p>Do not post repetitive promotions, fabricated reviews, or attempts to manipulate ratings.</p></div></li>
        <li><div><h2>No offensive content</h2><p>Do not publish abusive, threatening, discriminatory, or otherwise offensive content.</p></div></li>
        <li><div><h2>Care responsibly for animals</h2><p>Make decisions that support animal welfare and share relevant care information when arranging a service.</p></div></li>
        <li><div><h2>Use bookings honestly</h2><p>Do not create fake bookings or repeatedly miss confirmed appointments without notice.</p></div></li>
        <li><div><h2>Protect personal information</h2><p>Do not share another person's private contact, account, or other personal information without permission.</p></div></li>
        <li><div><h2>Follow account and service guidance</h2><p>Use the platform for its intended shopping, booking, and community purposes.</p></div></li>
    </ol>
    <aside class="consequences"><h2>When rules are broken</h2><p>Depending on the situation, responses may include a warning, temporary suspension, or account removal.</p></aside>
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
.content{width:min(100% - 32px,880px);margin:auto;padding:24px 0 40px}
.rules-intro{max-width:720px;margin:0 0 16px;color:#515866}
.rules-list{list-style:none;counter-reset:rule}
.rules-list li{counter-increment:rule;position:relative;display:grid;grid-template-columns:42px 1fr;gap:14px;padding:17px 0;border-top:1px solid #e4d8c7}
.rules-list li::before{content:counter(rule,decimal-leading-zero);color:var(--blue-dark);font:800 18px 'Baloo 2',cursive}
.rules-list h2{font-size:18px;line-height:1.25}
.rules-list p{margin-top:3px;color:#515866}
.consequences{margin-top:24px;padding:18px 20px;border-left:4px solid var(--blue-dark);background:var(--white)}
.consequences h2{font-size:19px}
.consequences p{margin-top:5px;color:#515866}
.site-footer{background:var(--white);border-top:1px solid var(--border)}
.footer-inner{width:min(100% - 32px,960px);margin:auto;padding:21px 0 25px;display:flex;justify-content:space-between;align-items:center;gap:18px}
.footer-brand{font:800 17px 'Baloo 2',cursive;color:var(--blue-dark)}
.footer-links{display:flex;flex-wrap:wrap;gap:8px 18px;color:#515866;font-size:13px;font-weight:700}
.footer-links a:hover{color:var(--blue-dark)}
@media(max-width:560px){.header-inner{min-height:60px}.brand{font-size:20px}.brand img{width:34px;height:34px}.intro-band{padding:34px 16px}.intro-band h1{font-size:34px}.content{padding-top:18px}.rules-list li{grid-template-columns:34px 1fr;gap:10px;padding:14px 0}.footer-inner{align-items:flex-start;flex-direction:column}}
`;
