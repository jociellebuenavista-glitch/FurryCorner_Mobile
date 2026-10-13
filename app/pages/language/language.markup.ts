// Page markup + CSS carried over from language.html, restyled so Language, Notifications, Privacy Settings,
// Help Centre, Community Rules and FurryCorner Policies all share the same header and intro band.
export const TITLE = `Language - FurryCorner`;
export const BODY_CLASS = ``;

export const HTML = `<header class="site-header"><div class="header-inner"><a class="brand" href="index.html"><img src="images/logo.png" alt="">Language</a><a class="back-link" href="profile.html">Profile</a></div></header>
<section class="intro-band"><div class="intro-inner"><p class="eyebrow">Settings</p><h1>Language</h1><p>Choose your preferred app language.</p></div></section>
<main class="content settings-content">
  <div class="panel settings-panel">
    <div class="lang-list">
      <div class="lang-item active"><span>English</span><span class="radio"></span></div>
      <div class="lang-item"><span>Tagalog</span><span class="radio"></span></div>
      <div class="lang-item"><span>Español</span><span class="radio"></span></div>
      <div class="lang-item"><span>日本語</span><span class="radio"></span></div>
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

.lang-list{display:flex;flex-direction:column;gap:10px;padding:12px 0}
.lang-item{display:flex;align-items:center;justify-content:space-between;padding:15px 14px;border:1.5px solid rgba(31,42,68,.10);border-radius:14px;background:#fff;font-weight:800;cursor:pointer;transition:background .15s ease,border-color .15s ease}
.lang-item:active{background:#EAF4FD}
.lang-item.active{border-color:var(--blue-dark);background:#EAF4FD}
.radio{width:20px;height:20px;border:2px solid var(--blue-dark);border-radius:50%;display:inline-block;position:relative;flex:0 0 20px}
.lang-item.active .radio::after{content:"";position:absolute;inset:3px;border-radius:50%;background:var(--blue-dark)}
`;
