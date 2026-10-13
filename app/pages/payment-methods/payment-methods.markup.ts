// Page markup + CSS carried over unchanged from payment-methods.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Bank Accounts / Cards - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<header class="page-header"><div class="header-inner"><h1 class="page-title">Bank Accounts / Cards</h1><a class="back-link" href="profile.html">Back to profile</a></div></header>
<main>
    <section aria-labelledby="method-form-title">
        <h2 class="section-title" id="method-form-title">Add a payment method</h2>
        <form class="method-form" id="methodForm">
            <div class="field"><label for="methodType">Account type</label><select id="methodType"><option value="card">Credit or debit card</option><option value="bank">Bank account</option></select></div>
            <div class="field"><label for="methodLabel">Name this method</label><input id="methodLabel" maxlength="50" placeholder="Personal card, Payroll, or another name" required></div>
            <div class="field"><label for="provider" id="providerLabel">Card brand</label><input id="provider" maxlength="50" placeholder="Visa, Mastercard, etc." required></div>
            <div class="field"><label for="accountHolder">Name on account</label><input id="accountHolder" maxlength="100" autocomplete="name" required></div>
            <div class="field"><label for="accountNumber" id="numberLabel">Card number</label><input id="accountNumber" type="text" inputmode="numeric" autocomplete="off" maxlength="23" pattern="[0-9 ]{8,27}" required aria-describedby="securityNote"></div>
            <div class="field-grid" id="expiryFields">
                <div class="field"><label for="expiry">Expiration</label><input id="expiry" type="month" autocomplete="cc-exp" required></div>
            </div>
            <label class="default-control"><input id="isDefault" type="checkbox"> Set as my default payment method</label>
            <p class="security-note" id="securityNote">Only the account type, name, provider, and last four digits are saved. The full number and CVV are not stored. Saved methods are displayed at checkout; payment processing is not enabled.</p>
            <div class="form-actions"><button class="button" id="saveMethod" type="submit">Save payment method</button></div>
            <p class="status" id="methodStatus" role="status" aria-live="polite"></p>
        </form>
    </section>
    <section aria-labelledby="saved-methods-title">
        <h2 class="section-title" id="saved-methods-title">Saved methods</h2>
        <div class="method-list" id="methodList" aria-live="polite"></div>
    </section>
</main>`;

export const CSS = `
:root{--blue:#7BB8F0;--blue-dark:#5CA3E8;--cream:#FCE3C0;--cream-light:#FDEEDA;--ink:#1F2430;--muted:#8b929e;--border:#e2e6ec;--white:#fff;--danger:#c9554d}
*{box-sizing:border-box;margin:0;padding:0}
body{min-height:100vh;background:var(--cream);color:var(--ink);font:600 15px 'Nunito',sans-serif;line-height:1.5;padding-bottom:36px}
a{color:inherit;text-decoration:none}
.page-header{background:var(--white);border-bottom:1px solid var(--border)}
.header-inner{max-width:900px;min-height:64px;margin:auto;padding:10px 20px;display:flex;align-items:center;justify-content:space-between;gap:16px}
.back-link{color:var(--blue-dark);font-weight:800}
.page-title{font:800 22px 'Baloo 2',cursive;color:var(--blue-dark);text-align:right}
main{max-width:900px;margin:28px auto;padding:0 20px;display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.9fr);gap:24px;align-items:start}
.section-title{font:800 21px 'Baloo 2',cursive;margin-bottom:14px}
.method-form,.method-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px}
.method-form{display:grid;gap:13px}
.field{display:grid;gap:5px}
.field label{font-size:12px;font-weight:800;color:#626b79}
.field input,.field select{width:100%;height:42px;padding:0 11px;border:1px solid var(--border);border-radius:8px;background:#fff;font:600 14px 'Nunito',sans-serif;color:var(--ink)}
.field input:focus,.field select:focus{outline:2px solid rgba(92,163,232,.25);border-color:var(--blue-dark)}
.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.default-control{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:700}
.default-control input{width:18px;height:18px;accent-color:var(--blue-dark)}
.security-note{padding:11px 12px;border-left:3px solid var(--blue-dark);background:var(--cream-light);color:#5b6472;font-size:12px}
.form-actions{display:flex;gap:9px}
.button{min-height:42px;padding:0 16px;border:0;border-radius:8px;background:var(--blue-dark);color:#fff;font:800 14px 'Nunito',sans-serif;cursor:pointer}
.button:disabled{opacity:.6;cursor:wait}
.status{min-height:22px;color:#39784c;font-size:13px;font-weight:800}
.status.error{color:var(--danger)}
.method-list{display:grid;gap:10px}
.method-card{padding:15px 16px}
.method-card-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:7px}
.method-card h3{font:800 17px 'Baloo 2',cursive}
.default-badge{padding:3px 8px;border-radius:20px;background:var(--cream-light);color:var(--blue-dark);font-size:11px;font-weight:800;white-space:nowrap}
.method-card p{font-size:13px;color:#596170;line-height:1.55;overflow-wrap:anywhere}
.method-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.method-actions button{border:0;background:none;padding:2px 0;color:var(--blue-dark);font:800 13px 'Nunito',sans-serif;cursor:pointer}
.method-actions button.delete{color:var(--danger)}
.empty-state{padding:16px;background:rgba(255,255,255,.65);border-radius:10px;color:#687180;font-size:14px}
@media(max-width:700px){main{grid-template-columns:1fr;margin-top:18px;padding:0 14px;gap:22px}.header-inner{padding:9px 14px}.method-form{padding:16px}}
@media(max-width:380px){.field-grid{grid-template-columns:1fr}.page-title{font-size:19px}}
`;
