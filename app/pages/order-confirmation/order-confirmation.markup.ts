import { pageHeader } from '../../legacy/app-shell';
// Page markup + CSS carried over unchanged from order-confirmation.html.
// Migrate this to a real Angular template (.html) / .scss one page at a time.
export const TITLE = `Order Confirmed - FurryCorner`;
export const BODY_CLASS = ``;

export const HTML = `<!-- =========================
     HEADER
========================= -->

${pageHeader('index.html','Shop','Order Confirmation')}


<!-- =========================
     PAGE
========================= -->

<main class="container">

    <div class="confirmation-wrap">

        <div
            class="box"
            id="confirmationRoot"
        >

            <div class="confirmation-empty">

                <h2>
                    Loading your order...
                </h2>

            </div>

        </div>

    </div>

</main>`;

export const CSS = `

:root{

    --blue:#7BB8F0;
    --blue-dark:#5CA3E8;

    --cream:#FCE3C0;

    --ink:#1F2430;

    --white:#ffffff;

    --gray:#777;

    --border:#e5e5e5;

    --panel:#f7f8fa;

}


*{

    box-sizing:border-box;

    margin:0;

    padding:0;

}


body{

    font-family:'Nunito',sans-serif;

    background:var(--cream);

    color:var(--ink);

    min-height:100vh;

}


/* =========================
   HEADER
========================= */

.top-header{

    display:flex;

    justify-content:center;

    padding:20px;

    background:white;

    box-shadow:
        0 2px 8px rgba(0,0,0,.06);

}


.logo{

    display:flex;

    align-items:center;

    gap:8px;

    font-family:'Baloo 2',cursive;

    font-weight:800;

    font-size:22px;

    color:var(--blue-dark);

    text-decoration:none;

}


.logo img{

    width:40px;

    height:40px;

    object-fit:contain;

}


/* =========================
   CONTAINER
========================= */

.container{

    width:100%;

    max-width:700px;

    margin:auto;

    padding:20px;

}


.confirmation-wrap{

    padding:25px 0 50px;

}


/* =========================
   MAIN BOX
========================= */

.box{

    background:white;

    border-radius:16px;

    padding:22px;

    box-shadow:
        0 4px 14px rgba(0,0,0,.05);

}


/* =========================
   HEADER
========================= */

.confirmation-header{

    margin-bottom:25px;

}


.confirmation-header h2{

    font-family:'Baloo 2',cursive;

    font-size:30px;

    margin-bottom:10px;

}


.confirmation-check-row{

    display:flex;

    align-items:center;

    gap:8px;

    font-weight:800;

    font-size:16px;

    margin-bottom:8px;

}


.check-icon{

    width:22px;

    height:22px;

    border-radius:50%;

    background:#3fb27f;

    color:white;

    display:flex;

    align-items:center;

    justify-content:center;

    font-size:14px;

}


.confirmation-note{

    color:var(--gray);

    font-size:14px;

}


/* =========================
   BOXES
========================= */

.confirm-box{

    background:white;

    border:1.5px solid var(--border);

    border-radius:14px;

    padding:18px;

    margin-bottom:18px;

}


.confirm-box h3{

    font-family:'Baloo 2',cursive;

    font-size:19px;

    margin-bottom:13px;

}


.confirm-box h4{

    font-size:14px;

    font-weight:800;

    margin-bottom:4px;

}


.confirm-box p{

    font-size:14px;

    margin-bottom:14px;

    line-height:1.5;

}


.confirm-box p:last-child{

    margin-bottom:0;

}


/* =========================
   ORDER ID
========================= */

.confirm-order-id{

    font-family:'Baloo 2',cursive;

    font-size:21px;

    font-weight:800;

}


/* =========================
   ORDER SUMMARY
========================= */

.confirmation-summary-box{

    background:var(--panel);

}


.confirmation-item{

    display:flex;

    align-items:center;

    gap:12px;

    padding:12px 0;

    border-bottom:1px solid var(--border);

}


.confirmation-item img{

    width:55px;

    height:55px;

    border-radius:8px;

    background:white;

    object-fit:contain;

    padding:5px;

    flex-shrink:0;

}


.confirmation-item-info{

    flex:1;

    min-width:0;

}


.confirmation-item-name{

    font-weight:800;

    font-size:14px;

}


.confirmation-item-quantity{

    color:var(--gray);

    font-size:13px;

    margin-top:3px;

}


.confirmation-item-price{

    font-weight:800;

    font-size:14px;

    white-space:nowrap;

}


/* =========================
   TOTALS
========================= */

.confirmation-totals{

    margin-top:14px;

    padding-top:14px;

    border-top:1px solid var(--border);

}


.summary-row{

    display:flex;

    justify-content:space-between;

    margin-bottom:10px;

    font-size:14px;

}


.summary-row.total{

    border-top:1px solid var(--border);

    padding-top:14px;

    margin-top:5px;

    font-size:19px;

    font-weight:800;

}


.summary-row.total span:last-child{

    color:var(--blue-dark);

}


/* =========================
   BUTTON
========================= */

.shop-btn{

    display:block;

    width:100%;

    padding:13px;

    border-radius:9px;

    background:var(--blue);

    color:white;

    font-weight:800;

    text-align:center;

    text-decoration:none;

    border:none;

    font-size:15px;

    cursor:pointer;

}


.shop-btn:hover{

    background:var(--blue-dark);

}


/* =========================
   EMPTY
========================= */

.confirmation-empty{

    text-align:center;

    padding:50px 10px;

}


.confirmation-empty h2{

    font-family:'Baloo 2',cursive;

    font-size:25px;

    margin-bottom:10px;

}


.confirmation-empty p{

    color:var(--gray);

    margin-bottom:20px;

}


/* =========================
   MOBILE
========================= */

@media(max-width:500px){

    .container{

        padding:12px;

    }


    .confirmation-wrap{

        padding-top:15px;

    }


    .box{

        padding:16px;

    }


    .confirmation-header h2{

        font-size:27px;

    }


    .confirm-box{

        padding:16px;

    }

}

`;
