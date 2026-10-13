// Page markup + CSS carried over unchanged from about.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `About Us - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<header class="site-header">
    <div class="header-inner">
        <a class="brand" href="index.html"><img src="images/logo.png" alt="">About</a>
        <a class="back-link" href="profile.html">Profile</a>
    </div>
</header>

<section class="intro-band" id="about-us" aria-labelledby="page-title">
    <div class="intro-inner">
        <p class="eyebrow">Our story</p>
        <h1 id="page-title">About FurryCorner</h1>
        <p>Pet essentials and care services, together in one platform.</p>
    </div>
</section>

<main class="content">
    <section class="section" id="history">
        <div class="section-heading"><span class="section-number">01</span><h2>Company History</h2></div>
        <div class="history-layout">
            <p class="history-year">2026</p>
            <div class="history-copy">
                <p>FurryCorner was founded in 2026 by IT students and pet owners frustrated with buying pet products, booking grooming, and arranging boarding across disconnected stores and platforms.</p>
                <p>It brings online cat and dog product retail together with grooming, daily care, and boarding in one platform.</p>
            </div>
        </div>
    </section>

    <section class="section" id="developers">
        <div class="section-heading"><span class="section-number">02</span><h2>Developers</h2></div>
        <div class="developer-grid">
            <article class="developer-card"><div class="photo-placeholder"><div class="photo-placeholder-inner"><span class="photo-frame" aria-hidden="true">+</span><span>Photo placeholder</span></div></div><div class="developer-info"><h3>[Name 1]</h3><p>[Role]</p></div></article>
            <article class="developer-card"><div class="photo-placeholder"><div class="photo-placeholder-inner"><span class="photo-frame" aria-hidden="true">+</span><span>Photo placeholder</span></div></div><div class="developer-info"><h3>[Name 2]</h3><p>[Role]</p></div></article>
            <article class="developer-card"><div class="photo-placeholder"><div class="photo-placeholder-inner"><span class="photo-frame" aria-hidden="true">+</span><span>Photo placeholder</span></div></div><div class="developer-info"><h3>[Name 3]</h3><p>[Role]</p></div></article>
            <article class="developer-card"><div class="photo-placeholder"><div class="photo-placeholder-inner"><span class="photo-frame" aria-hidden="true">+</span><span>Photo placeholder</span></div></div><div class="developer-info"><h3>[Name 4]</h3><p>[Role]</p></div></article>
        </div>
    </section>

    <section class="section" id="app">
        <div class="section-heading"><span class="section-number">03</span><h2>About the App</h2></div>
        <div class="app-layout">
            <p class="app-copy">FurryCorner brings everyday pet shopping and care tasks together, from choosing products to arranging services.</p>
            <ul class="feature-list">
                <li><span class="feature-mark" aria-hidden="true">+</span><span>Browse and buy pet products</span></li>
                <li><span class="feature-mark" aria-hidden="true">+</span><span>Book pet care services</span></li>
                <li><span class="feature-mark" aria-hidden="true">+</span><span>Order and delivery tracking</span></li>
                <li><span class="feature-mark" aria-hidden="true">+</span><span>Notifications</span></li>
                <li><span class="feature-mark" aria-hidden="true">+</span><span>Secure payments</span></li>
            </ul>
        </div>
    </section>

    <section class="section" id="contact">
        <div class="section-heading"><span class="section-number">04</span><h2>Contact Us</h2></div>
        <div class="contact-layout">
            <div class="contact-details">
                <div class="contact-item"><h3>Email</h3><p>[Email address]</p></div>
                <div class="contact-item"><h3>Phone</h3><p>[Phone number]</p></div>
                <div class="contact-item"><h3>Address</h3><p>[Business address]</p></div>
                <div class="contact-item"><h3>Social</h3><div class="social-links"><a href="#contact">[Facebook]</a><a href="#contact">[Instagram]</a><a href="#contact">[TikTok]</a></div></div>
            </div>
            <form class="contact-form" id="contactForm">
                <div class="form-field"><label for="contactName">Name</label><input id="contactName" name="name" autocomplete="name" required></div>
                <div class="form-field"><label for="contactEmail">Email</label><input id="contactEmail" name="email" type="email" autocomplete="email" required></div>
                <div class="form-field"><label for="contactMessage">Message</label><textarea id="contactMessage" name="message" required></textarea></div>
                <button class="submit-button" type="submit">Send message</button>
                <p class="form-status" id="formStatus" role="status" hidden></p>
            </form>
        </div>
    </section>
</main>

<footer>FurryCorner PH</footer>`;

export const CSS = `
:root{
    --blue:#7BB8F0;
    --blue-dark:#5CA3E8;
    --cream:#FCE3C0;
    --cream-light:#FDEEDA;
    --ink:#1F2430;
    --white:#fff;
    --muted:#7c8490;
    --border:#e2e6ec;
}

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Nunito',sans-serif;color:var(--ink);background:var(--cream-light);line-height:1.55}
a{color:inherit;text-decoration:none}
button,input,textarea{font:inherit}
h1,h2,h3,.brand{font-family:'Baloo 2',cursive}

.site-header{background:var(--white);border-bottom:1px solid var(--border)}
.header-inner{width:min(100% - 32px,1080px);min-height:68px;margin:auto;display:flex;align-items:center;justify-content:space-between;gap:16px}
.brand{display:flex;align-items:center;gap:10px;color:var(--blue-dark);font-size:23px;font-weight:800}
.brand img{width:40px;height:40px;object-fit:contain}
.back-link{font-weight:800;color:var(--blue-dark);padding:9px 12px;border-radius:8px}
.back-link:hover{background:var(--cream-light)}

.intro-band{background:var(--blue);padding:44px 16px 48px}
.intro-inner{width:min(100%,1080px);margin:auto}
.eyebrow{color:#245784;font-size:12px;font-weight:800;text-transform:uppercase}
.intro-band h1{font-size:42px;line-height:1.1;margin:8px 0 12px}
.intro-band p{max-width:650px;color:#26394b;font-size:17px}

.content{width:min(100% - 32px,960px);margin:auto}
.section{padding:42px 0;border-bottom:1px solid #e4d8c7}
.section-heading{display:flex;align-items:baseline;gap:12px;margin-bottom:18px}
.section-number{color:var(--blue-dark);font-weight:800;font-size:13px}
.section h2{font-size:28px;line-height:1.2}
.history-layout{display:grid;grid-template-columns:150px 1fr;gap:30px;align-items:start}
.history-year{font:800 42px 'Baloo 2',cursive;color:var(--blue-dark);line-height:1}
.history-copy{max-width:690px;display:grid;gap:12px;color:#515866}

.developer-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:14px}
.developer-card{overflow:hidden;background:var(--white);border:1px solid var(--border);border-radius:8px}
.photo-placeholder{min-height:142px;display:grid;place-items:center;background:var(--cream);color:#6a7581;font-size:12px;font-weight:800;text-transform:uppercase}
.photo-frame{width:48px;height:48px;border:2px solid #b0cbe2;border-radius:50%;display:grid;place-items:center;margin-bottom:7px;color:var(--blue-dark);font-size:20px}
.photo-placeholder-inner{display:grid;justify-items:center}
.developer-info{padding:13px 14px 15px}
.developer-info h3{font-family:'Nunito',sans-serif;font-size:15px;font-weight:800}
.developer-info p{margin-top:2px;color:var(--muted);font-size:13px}

.app-layout{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:36px;align-items:start}
.app-copy{max-width:360px;color:#515866}
.feature-list{list-style:none;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 18px}
.feature-list li{display:flex;align-items:flex-start;gap:10px;font-size:14px;font-weight:700}
.feature-mark{flex:0 0 20px;width:20px;height:20px;border-radius:50%;display:grid;place-items:center;background:var(--blue);color:#173c5e;font-size:12px;line-height:1}

.contact-layout{display:grid;grid-template-columns:minmax(0,.85fr) minmax(0,1.15fr);gap:36px}
.contact-details{display:grid;gap:17px;align-content:start}
.contact-item h3{font-family:'Nunito',sans-serif;font-size:12px;font-weight:800;color:var(--muted);text-transform:uppercase}
.contact-item p,.contact-item a{font-size:15px;font-weight:700;overflow-wrap:anywhere}
.social-links{display:flex;flex-wrap:wrap;gap:8px}
.social-links a{padding:5px 9px;border:1px solid #d5e5f3;border-radius:6px;color:#386a96;font-size:13px}
.contact-form{display:grid;gap:13px}
.form-field{display:grid;gap:5px}
.form-field label{font-size:13px;font-weight:800}
.form-field input,.form-field textarea{width:100%;border:1px solid #d9dee5;border-radius:7px;background:var(--white);padding:11px 12px;color:var(--ink)}
.form-field input:focus,.form-field textarea:focus{outline:2px solid #b6d8f5;border-color:var(--blue-dark)}
.form-field textarea{min-height:112px;resize:vertical}
.submit-button{justify-self:start;border:0;border-radius:7px;background:var(--blue-dark);color:var(--white);font-weight:800;padding:11px 18px;cursor:pointer}
.submit-button:hover{background:#438fd7}
.form-status{color:#7c522d;font-size:13px;font-weight:700}

footer{padding:22px 16px 30px;text-align:center;color:var(--muted);font-size:13px}

@media(max-width:760px){
    .developer-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
    .app-layout,.contact-layout{grid-template-columns:1fr;gap:20px}
    .app-copy{max-width:620px}
}

@media(max-width:520px){
    .header-inner{min-height:60px}
    .brand{font-size:20px}
    .brand img{width:34px;height:34px}
    .intro-band{padding:34px 16px 38px}
    .intro-band h1{font-size:34px}
    .intro-band p{font-size:15px}
    .section{padding:32px 0}
    .section-heading{margin-bottom:15px}
    .section h2{font-size:25px}
    .history-layout{grid-template-columns:1fr;gap:12px}
    .history-year{font-size:34px}
    .developer-grid{gap:10px}
    .photo-placeholder{min-height:118px}
    .developer-info{padding:11px}
    .feature-list{grid-template-columns:1fr;gap:10px}
}
`;
