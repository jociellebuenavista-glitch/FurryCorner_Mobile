// @ts-nocheck  (legacy script below is plain JavaScript carried over from payment-methods.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './payment-methods.markup';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class PaymentMethodsPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of payment-methods.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {

const methodsApi = window.FURRY_API + '/paymentMethods.php';
const methodForm = document.getElementById('methodForm');
const methodList = document.getElementById('methodList');
const methodStatus = document.getElementById('methodStatus');
const methodTypeField = document.getElementById('methodType');
const accountNumberField = document.getElementById('accountNumber');
const expiryFields = document.getElementById('expiryFields');
const saveMethodButton = document.getElementById('saveMethod');
let savedMethods = [];

function setMethodStatus(message, isError = false){
    methodStatus.textContent = message;
    methodStatus.classList.toggle('error', isError);
}

async function sendMethodRequest(method, payload){
    const response = await fetch(methodsApi, {
        method,
        headers: {'Accept':'application/json', 'Content-Type':'application/json'},
        ...(payload ? {body:JSON.stringify(payload)} : {})
    });
    const data = await response.json();
    if(!response.ok || !data.success) throw new Error(data.message || 'Unable to update payment methods.');
    return data;
}

function updateMethodType(){
    const isCard = methodTypeField.value === 'card';
    document.getElementById('providerLabel').textContent = isCard ? 'Card brand' : 'Bank name';
    document.getElementById('provider').placeholder = isCard ? 'Visa, Mastercard, etc.' : 'Bank or e-wallet name';
    document.getElementById('numberLabel').textContent = isCard ? 'Card number' : 'Account number';
    accountNumberField.maxLength = isCard ? 23 : 27;
    expiryFields.hidden = !isCard;
    document.getElementById('expiry').required = isCard;
}

function createMethodAction(label, action, id, danger = false){
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.dataset.action = action;
    button.dataset.methodId = id;
    if(danger) button.classList.add('delete');
    return button;
}

function renderMethods(){
    methodList.replaceChildren();
    if(savedMethods.length === 0){
        const empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'No saved payment methods yet.';
        methodList.append(empty);
        return;
    }

    savedMethods.forEach(method => {
        const card = document.createElement('article');
        card.className = 'method-card';
        const head = document.createElement('div');
        head.className = 'method-card-head';
        const title = document.createElement('h3');
        title.textContent = method.method_label;
        head.append(title);
        if(Number(method.is_default)){
            const badge = document.createElement('span');
            badge.className = 'default-badge';
            badge.textContent = 'Default';
            head.append(badge);
        }
        const details = document.createElement('p');
        const typeLabel = method.method_type === 'card' ? 'Card' : 'Bank account';
        const expiry = method.expiry_month && method.expiry_year ? ` · Expires ${String(method.expiry_month).padStart(2, '0')}/${method.expiry_year}` : '';
        details.textContent = `${typeLabel} · ${method.provider} ·•••• ${method.last_four}${expiry}\n${method.account_holder}`;
        details.style.whiteSpace = 'pre-line';
        const actions = document.createElement('div');
        actions.className = 'method-actions';
        if(!Number(method.is_default)) actions.append(createMethodAction('Make default', 'default', method.payment_method_id));
        actions.append(createMethodAction('Delete', 'delete', method.payment_method_id, true));
        card.append(head, details, actions);
        methodList.append(card);
    });
}

async function loadMethods(){
    try{
        const data = await sendMethodRequest('GET');
        savedMethods = data.payment_methods || [];
        renderMethods();
    }catch(error){
        setMethodStatus(error.message, true);
    }
}

methodTypeField.addEventListener('change', updateMethodType);
methodForm.addEventListener('submit', async event => {
    event.preventDefault();
    const number = accountNumberField.value.replace(/\D/g, '');
    const isCard = methodTypeField.value === 'card';
    if((isCard && (number.length < 12 || number.length > 19)) || (!isCard && (number.length < 8 || number.length > 23))){
        setMethodStatus(isCard ? 'Enter a valid card number.' : 'Enter a valid account number.', true);
        return;
    }
    const expiry = document.getElementById('expiry').value;
    const [expiryYear, expiryMonth] = expiry ? expiry.split('-').map(Number) : [null, null];
    saveMethodButton.disabled = true;
    setMethodStatus('Saving payment method...');
    const payload = {
        action:'save',
        method_type:methodTypeField.value,
        method_label:document.getElementById('methodLabel').value.trim(),
        provider:document.getElementById('provider').value.trim(),
        account_holder:document.getElementById('accountHolder').value.trim(),
        last_four:number.slice(-4),
        expiry_month:expiryMonth,
        expiry_year:expiryYear,
        is_default:document.getElementById('isDefault').checked
    };
    try{
        const data = await sendMethodRequest('POST', payload);
        savedMethods = data.payment_methods || [];
        renderMethods();
        methodForm.reset();
        updateMethodType();
        setMethodStatus('Payment method saved. Only its last four digits are retained.');
    }catch(error){
        setMethodStatus(error.message, true);
    }finally{
        saveMethodButton.disabled = false;
    }
});

methodList.addEventListener('click', async event => {
    const button = event.target.closest('button[data-action]');
    if(!button) return;
    const method = savedMethods.find(item => String(item.payment_method_id) === button.dataset.methodId);
    if(!method) return;
    if(button.dataset.action === 'delete' && !window.confirm(`Delete ${method.method_label}?`)) return;
    try{
        const data = await sendMethodRequest('POST', {action:button.dataset.action, payment_method_id:method.payment_method_id});
        savedMethods = data.payment_methods || [];
        renderMethods();
        setMethodStatus(button.dataset.action === 'delete' ? 'Payment method deleted.' : 'Default payment method updated.');
    }catch(error){
        setMethodStatus(error.message, true);
    }
});

updateMethodType();
loadMethods();

;


  }
}
