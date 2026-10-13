// Page markup + CSS carried over unchanged from signup.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Sign Up - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<div class="page"><header class="topbar"><a class="brand" href="index.html">FurryCorner PH</a><a class="back" href="profile.html">Profile</a></header><main class="panel"><h1>Create your account</h1><p class="intro">Save your details for a faster, friendlier checkout.</p><form id="signupForm"><div class="field"><label for="name">Full name</label><input id="name" required></div><div class="field"><label for="email">Email address</label><input id="email" type="email" required></div><div class="field"><label for="password">Password</label><input id="password" type="password" minlength="6" required></div><div class="field"><label for="confirm">Confirm password</label><input id="confirm" type="password" minlength="6" required></div><button class="button" type="submit">Create account</button><p class="error-message" id="formError" hidden></p></form><p class="message" id="successMessage" hidden></p>

<p class="signin" id="signinRow">Already have an account? <a href="signin.html">Sign in</a></p><p class="guest-link"><a href="index.html">Continue as guest</a></p></main></div>`;

export const CSS = `
:root{--blue:#7BB8F0;--blue-dark:#5CA3E8;--cream:#FCE3C0;--cream-light:#FDEEDA;--ink:#1F2430;--white:#fff;--border:#e5e7eb}*{box-sizing:border-box;margin:0;padding:0}body{font-family:'Nunito',sans-serif;color:var(--ink);background:var(--cream-light);line-height:1.5}h1{font:800 31px 'Baloo 2',cursive}a{text-decoration:none;color:inherit}.page{max-width:520px;margin:auto;padding:18px 16px 40px}.topbar{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}.brand{font:800 25px 'Baloo 2',cursive;color:var(--blue-dark)}.back,.link{color:var(--blue-dark);font-weight:800}.panel{background:var(--white);border-radius:16px;padding:24px;box-shadow:0 5px 18px #1f243012}.intro{margin:4px 0 20px;color:#7c8490;font-size:14px}.field{margin-top:15px}.field label{display:block;font-size:13px;font-weight:800;margin-bottom:6px}.field input{width:100%;border:1.5px solid var(--border);border-radius:9px;padding:12px;font:600 14px 'Nunito',sans-serif}.button{width:100%;border:0;border-radius:9px;padding:13px;margin-top:20px;background:var(--blue-dark);color:#fff;font:800 15px 'Nunito',sans-serif;cursor:pointer}.button:disabled{opacity:.6;cursor:not-allowed}.message{margin-top:14px;color:#43824b;font-weight:800;font-size:14px}.error-message{margin-top:14px;color:#c0392b;font-weight:800;font-size:14px}.signin{margin-top:18px;text-align:center;font-size:14px;color:#7c8490}.signin a{color:var(--blue-dark);font-weight:800}@media(max-width:480px){.page{padding:14px 12px}.panel{padding:19px}}


body{min-height:100vh;background:#FCEBD6}
.page{min-height:100vh;width:100%;max-width:none;display:flex;align-items:center;justify-content:center;padding:35px 16px}
.topbar{display:none}
.panel{width:100%;max-width:390px;padding:26px;background:#fff;border-radius:16px;box-shadow:0 8px 24px rgba(88,63,35,.08);text-align:center}
.panel::before{content:"";display:block;width:140px;height:140px;margin:0 auto 10px;background:url("images/logo.png") center/contain no-repeat}
.panel h1{font-size:27px;margin-bottom:6px}
.intro{margin:0 0 20px;font-size:15px;color:#929caf}
.google-button{width:100%;height:52px;border:1px solid #dce2ea;border-radius:10px;background:#fff;color:var(--ink);font:800 16px 'Nunito',sans-serif;display:flex;align-items:center;justify-content:center;gap:14px;cursor:pointer}
.google-mark{font:800 20px Arial,sans-serif;color:#4285f4}
.google-mark{width:20px;height:20px;flex:0 0 auto}
.or-divider{display:flex;align-items:center;gap:14px;margin:20px 0 22px;color:#929caf;font-size:13px;font-weight:800}.or-divider::before,.or-divider::after{content:"";height:1px;background:#dce2ea;flex:1}
.name-fields{display:grid;grid-template-columns:1fr 1fr;gap:15px}
.field{text-align:left;margin-top:0;margin-bottom:16px}.field label{display:none}.field input{height:50px;padding:0 15px;border-radius:10px;font-size:15px;color:var(--ink)}
.button{height:52px;margin-top:0;border-radius:10px;font-size:16px}.signin{margin-top:20px;font-size:15px}
@media(max-width:480px){.page{padding:16px 12px}.panel{padding:22px 18px;border-radius:14px}.panel::before{width:115px;height:115px}.panel h1{font-size:25px}.intro{font-size:14px}.google-button{font-size:15px}.field input{font-size:14px}.signin{font-size:14px}}


.guest-link{margin-top:14px;text-align:center;font-size:14px;color:#7c8490}.guest-link a{color:var(--blue-dark);font-weight:800}
`;
