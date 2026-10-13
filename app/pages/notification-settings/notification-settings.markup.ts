// Page markup + CSS carried over from notification-settings.html, restyled so Language, Notifications, Privacy Settings,
// Help Centre, Community Rules and FurryCorner Policies all share the same header and intro band.
export const TITLE = `Notification Settings - FurryCorner`;
export const BODY_CLASS = ``;

export const HTML = `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><img src="images/logo.png" alt="">Notifications</a><a class="back-link" href="profile.html">Profile</a></div></header>
<section class="intro-band"><div class="intro-inner"><p class="eyebrow">Settings</p><h1>Notifications</h1><p>Choose which alerts you want to receive.</p></div></section>
<main class="content settings-content">
  <div class="panel settings-panel">
    <div class="option">
      <div class="option-text">
        <strong>Order updates</strong>
        <span>Track status changes and delivery updates</span>
      </div>
      <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
    </div>

    <div class="option">
      <div class="option-text">
        <strong>Promotions</strong>
        <span>Receive offers and special deals</span>
      </div>
      <label class="switch"><input type="checkbox" checked><span class="slider"></span></label>
    </div>

    <div class="option">
      <div class="option-text">
        <strong>Pet care reminders</strong>
        <span>Appointments, checkups, and follow-ups</span>
      </div>
      <label class="switch"><input type="checkbox"><span class="slider"></span></label>
    </div>
  </div>
</main>`;

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
.intro-band{background:var(--blue);padding:42px 16px}
.intro-inner{width:min(100%,960px);margin:auto}
.eyebrow{color:#245784;font-size:12px;font-weight:800;text-transform:uppercase}
.intro-band h1{font-size:40px;line-height:1.12;margin:7px 0}
.intro-band p{max-width:640px;color:#26394b}
.content{width:min(100% - 32px,880px);margin:auto}
.back-link:focus-visible{outline:3px solid #245784;outline-offset:3px}
@media(max-width:560px){.header-inner{min-height:60px}.brand{font-size:20px}.brand img{width:34px;height:34px}.intro-band{padding:34px 16px}.intro-band h1{font-size:34px}}

.option{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:16px 0;border-top:1px solid rgba(31,42,68,.08)}
.option:first-child{border-top:0}
.option-text strong{display:block;font-size:15px;margin-bottom:3px}
.option-text span{font-size:12.5px;color:var(--muted)}
.switch{position:relative;flex:0 0 48px;width:48px;height:28px;background:#dfe5ec;border-radius:999px;display:inline-block;cursor:pointer}
.switch input{opacity:0;width:0;height:0}
.slider{position:absolute;inset:0;border-radius:999px;transition:.2s ease}
.slider:before{content:"";position:absolute;width:22px;height:22px;left:3px;top:3px;border-radius:50%;background:#fff;transition:.2s ease;box-shadow:0 3px 8px rgba(31,36,48,.16)}
.switch input:checked + .slider{background:var(--blue-dark)}
.switch input:checked + .slider:before{transform:translateX(20px)}
.switch input:focus-visible + .slider{outline:3px solid #245784;outline-offset:2px}
`;
