// @ts-nocheck  (legacy script below is plain JavaScript carried over from my-addresses.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './my-addresses.markup';

@Component({
  selector: 'app-my-addresses',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class MyAddressesPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of my-addresses.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {

const addressApi = window.FURRY_API + '/userAddresses.php';
const addressForm = document.getElementById('addressForm');
const addressList = document.getElementById('addressList');
const addressStatus = document.getElementById('addressStatus');
const addressIdField = document.getElementById('addressId');
const saveAddressButton = document.getElementById('saveAddress');
const cancelEditButton = document.getElementById('cancelEdit');
let savedAddresses = [];

function setAddressStatus(message, isError = false){
    addressStatus.textContent = message;
    addressStatus.classList.toggle('error', isError);
}

async function sendAddressRequest(method, payload){
    const response = await fetch(addressApi, {
        method,
        headers: {'Accept':'application/json', 'Content-Type':'application/json'},
        ...(payload ? {body:JSON.stringify(payload)} : {})
    });
    const data = await response.json();
    if(!response.ok || !data.success) throw new Error(data.message || 'Unable to update addresses.');
    return data;
}

function addressText(address){
    return [address.address_line, `${address.city}, ${address.province} ${address.postal_code}`, address.phone].join('\n');
}

function renderAddresses(){
    addressList.replaceChildren();
    if(savedAddresses.length === 0){
        const empty = document.createElement('p');
        empty.className = 'empty-state';
        empty.textContent = 'No saved addresses yet. Add one to use it at checkout or when booking a service.';
        addressList.append(empty);
        return;
    }

    savedAddresses.forEach(address => {
        const card = document.createElement('article');
        card.className = 'address-card';
        const head = document.createElement('div');
        head.className = 'address-card-head';
        const title = document.createElement('h3');
        title.textContent = address.address_label;
        head.append(title);
        if(Number(address.is_default)){
            const badge = document.createElement('span');
            badge.className = 'default-badge';
            badge.textContent = 'Default';
            head.append(badge);
        }
        const recipient = document.createElement('p');
        recipient.textContent = `${address.first_name} ${address.last_name}`.trim();
        const details = document.createElement('p');
        details.textContent = addressText(address);
        details.style.whiteSpace = 'pre-line';
        const actions = document.createElement('div');
        actions.className = 'address-actions';
        if(!Number(address.is_default)) actions.append(createAddressAction('Make default', 'default', address.address_id));
        actions.append(createAddressAction('Edit', 'edit', address.address_id));
        actions.append(createAddressAction('Delete', 'delete', address.address_id, true));
        card.append(head, recipient, details, actions);
        addressList.append(card);
    });
}

function createAddressAction(label, action, id, isDanger = false){
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = label;
    button.dataset.action = action;
    button.dataset.addressId = id;
    if(isDanger) button.classList.add('delete');
    return button;
}

async function loadAddresses(){
    try{
        const data = await sendAddressRequest('GET');
        savedAddresses = data.addresses || [];
        renderAddresses();
    }catch(error){
        setAddressStatus(error.message, true);
    }
}

function resetAddressForm(){
    addressForm.reset();
    addressIdField.value = '';
    document.getElementById('address-form-title').textContent = 'Add an address';
    saveAddressButton.textContent = 'Save address';
    cancelEditButton.hidden = true;
}

addressForm.addEventListener('submit', async event => {
    event.preventDefault();
    saveAddressButton.disabled = true;
    setAddressStatus('Saving address...');
    const payload = {
        action:'save',
        address_id:addressIdField.value || null,
        address_label:document.getElementById('addressLabel').value.trim(),
        first_name:document.getElementById('firstName').value.trim(),
        last_name:document.getElementById('lastName').value.trim(),
        address_line:document.getElementById('addressLine').value.trim(),
        city:document.getElementById('city').value.trim(),
        province:document.getElementById('province').value.trim(),
        postal_code:document.getElementById('postalCode').value.trim(),
        phone:document.getElementById('phone').value.trim(),
        is_default:document.getElementById('isDefault').checked
    };
    try{
        const data = await sendAddressRequest('POST', payload);
        savedAddresses = data.addresses || [];
        renderAddresses();
        resetAddressForm();
        setAddressStatus('Address saved.');
    }catch(error){
        setAddressStatus(error.message, true);
    }finally{
        saveAddressButton.disabled = false;
    }
});

cancelEditButton.addEventListener('click', resetAddressForm);
addressList.addEventListener('click', async event => {
    const button = event.target.closest('button[data-action]');
    if(!button) return;
    const address = savedAddresses.find(item => String(item.address_id) === button.dataset.addressId);
    if(!address) return;

    if(button.dataset.action === 'edit'){
        addressIdField.value = address.address_id;
        document.getElementById('addressLabel').value = address.address_label;
        document.getElementById('firstName').value = address.first_name;
        document.getElementById('lastName').value = address.last_name;
        document.getElementById('addressLine').value = address.address_line;
        document.getElementById('city').value = address.city;
        document.getElementById('province').value = address.province;
        document.getElementById('postalCode').value = address.postal_code;
        document.getElementById('phone').value = address.phone;
        document.getElementById('isDefault').checked = Number(address.is_default) === 1;
        document.getElementById('address-form-title').textContent = 'Edit address';
        saveAddressButton.textContent = 'Update address';
        cancelEditButton.hidden = false;
        window.scrollTo({top:0, behavior:'smooth'});
        return;
    }

    if(button.dataset.action === 'delete' && !window.confirm(`Delete the ${address.address_label} address?`)) return;
    try{
        const data = await sendAddressRequest('POST', {action:button.dataset.action, address_id:address.address_id});
        savedAddresses = data.addresses || [];
        renderAddresses();
        setAddressStatus(button.dataset.action === 'delete' ? 'Address deleted.' : 'Default address updated.');
    }catch(error){
        setAddressStatus(error.message, true);
    }
});

loadAddresses();

;


  }
}
