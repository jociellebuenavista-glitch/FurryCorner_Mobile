// Page markup + CSS carried over unchanged from my-addresses.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `My Addresses - FurryCorner PH`;
export const BODY_CLASS = ``;

export const HTML = `<header class="page-header"><div class="header-inner"><h1 class="page-title">My Addresses</h1><a class="back-link" href="profile.html">Back to profile</a></div></header>
<main>
    <section aria-labelledby="address-form-title">
        <h2 class="section-title" id="address-form-title">Add an address</h2>
        <form class="address-form" id="addressForm">
            <input type="hidden" id="addressId">
            <div class="field"><label for="addressLabel">Address name</label><input id="addressLabel" maxlength="50" placeholder="Home, Work, or another name" required></div>
            <div class="field-grid">
                <div class="field"><label for="firstName">First name</label><input id="firstName" maxlength="50" required></div>
                <div class="field"><label for="lastName">Last name</label><input id="lastName" maxlength="50" required></div>
            </div>
            <div class="field"><label for="addressLine">House number, street, barangay</label><input id="addressLine" maxlength="255" required></div>
            <div class="field-grid">
                <div class="field"><label for="city">City / Municipality</label><input id="city" maxlength="100" required></div>
                <div class="field"><label for="province">Province</label><input id="province" maxlength="100" required></div>
            </div>
            <div class="field-grid">
                <div class="field"><label for="postalCode">Postal code</label><input id="postalCode" maxlength="20" required></div>
                <div class="field"><label for="phone">Phone number</label><input id="phone" type="tel" maxlength="20" required></div>
            </div>
            <label class="default-control"><input id="isDefault" type="checkbox"> Set as my default address</label>
            <div class="form-actions"><button class="button" id="saveAddress" type="submit">Save address</button><button class="button secondary" id="cancelEdit" type="button" hidden>Cancel</button></div>
            <p class="status" id="addressStatus" role="status" aria-live="polite"></p>
        </form>
    </section>
    <section aria-labelledby="saved-address-title">
        <h2 class="section-title" id="saved-address-title">Saved addresses</h2>
        <div class="address-list" id="addressList" aria-live="polite"></div>
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
.page-title{font:800 22px 'Baloo 2',cursive;color:var(--blue-dark)}
main{max-width:900px;margin:28px auto;padding:0 20px;display:grid;grid-template-columns:minmax(0,1fr) minmax(280px,.9fr);gap:24px;align-items:start}
.section-title{font:800 21px 'Baloo 2',cursive;margin-bottom:14px}
.address-form,.address-card{background:var(--white);border:1px solid var(--border);border-radius:12px;padding:20px}
.address-form{display:grid;gap:13px}
.field-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px}
.field{display:grid;gap:5px}
.field label{font-size:12px;font-weight:800;color:#626b79}
.field input{width:100%;height:42px;padding:0 11px;border:1px solid var(--border);border-radius:8px;background:#fff;font:600 14px 'Nunito',sans-serif;color:var(--ink)}
.field input:focus{outline:2px solid rgba(92,163,232,.25);border-color:var(--blue-dark)}
.default-control{display:flex;align-items:center;gap:9px;font-size:14px;font-weight:700}
.default-control input{width:18px;height:18px;accent-color:var(--blue-dark)}
.form-actions{display:flex;gap:9px}
.button{min-height:42px;padding:0 16px;border:0;border-radius:8px;background:var(--blue-dark);color:#fff;font:800 14px 'Nunito',sans-serif;cursor:pointer}
.button.secondary{border:1px solid var(--border);background:var(--cream-light);color:var(--ink)}
.button:disabled{opacity:.6;cursor:wait}
.status{min-height:22px;color:#39784c;font-size:13px;font-weight:800}
.status.error{color:var(--danger)}
.address-list{display:grid;gap:10px}
.address-card{padding:15px 16px}
.address-card-head{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-bottom:7px}
.address-card h3{font:800 17px 'Baloo 2',cursive}
.default-badge{padding:3px 8px;border-radius:20px;background:var(--cream-light);color:var(--blue-dark);font-size:11px;font-weight:800;white-space:nowrap}
.address-card p{font-size:13px;color:#596170;line-height:1.55;overflow-wrap:anywhere}
.address-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
.address-actions button{border:0;background:none;padding:2px 0;color:var(--blue-dark);font:800 13px 'Nunito',sans-serif;cursor:pointer}
.address-actions button.delete{color:var(--danger)}
.empty-state{padding:16px;background:rgba(255,255,255,.65);border-radius:10px;color:#687180;font-size:14px}
@media(max-width:700px){main{grid-template-columns:1fr;margin-top:18px;padding:0 14px;gap:22px}.header-inner{padding:9px 14px}.address-form{padding:16px}}
@media(max-width:380px){.field-grid{grid-template-columns:1fr}.page-title{font-size:19px}.form-actions{flex-wrap:wrap}}
`;
