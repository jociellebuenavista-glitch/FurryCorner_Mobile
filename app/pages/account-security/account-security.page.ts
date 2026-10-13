// @ts-nocheck  (legacy script below is plain JavaScript carried over from account-security.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './account-security.markup';

@Component({
  selector: 'app-account-security',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class AccountSecurityPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of account-security.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {

const profileApi = window.FURRY_API + '/getProfile.php';
const updateApi = window.FURRY_API + '/updateAccount.php';
const accountForm = document.getElementById('accountForm');
const passwordForm = document.getElementById('passwordForm');
const accountStatus = document.getElementById('accountStatus');
const passwordStatus = document.getElementById('passwordStatus');

function setStatus(element, message, isError = false){
    element.textContent = message;
    element.classList.toggle('error', isError);
}

async function requestJson(url, method, payload){
    const response = await fetch(url, {
        method,
        headers:{'Accept':'application/json', 'Content-Type':'application/json'},
        ...(payload ? {body:JSON.stringify(payload)} : {})
    });
    const data = await response.json();
    if(!response.ok || !data.success) throw new Error(data.message || 'Unable to update account.');
    return data;
}

async function loadAccount(){
    try{
        const data = await requestJson(profileApi, 'GET');
        document.getElementById('firstName').value = data.user.first_name || '';
        document.getElementById('lastName').value = data.user.last_name || '';
        document.getElementById('email').value = data.user.email || '';
    }catch(error){
        setStatus(accountStatus, error.message, true);
    }
}

accountForm.addEventListener('submit', async event => {
    event.preventDefault();
    const button = document.getElementById('saveAccount');
    button.disabled = true;
    setStatus(accountStatus, 'Saving account details...');
    try{
        const data = await requestJson(updateApi, 'POST', {
            action:'profile',
            first_name:document.getElementById('firstName').value.trim(),
            last_name:document.getElementById('lastName').value.trim(),
            email:document.getElementById('email').value.trim(),
            current_password:document.getElementById('profileCurrentPassword').value
        });
        const current = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
        localStorage.setItem('loggedInUser', JSON.stringify({...current, id:data.user.user_id, user_id:data.user.user_id, firstName:data.user.first_name, lastName:data.user.last_name, email:data.user.email}));
        localStorage.setItem('loggedInName', `${data.user.first_name} ${data.user.last_name}`.trim());
        localStorage.setItem('loggedInEmail', data.user.email);
        document.getElementById('profileCurrentPassword').value = '';
        setStatus(accountStatus, data.message);
    }catch(error){
        setStatus(accountStatus, error.message, true);
    }finally{
        button.disabled = false;
    }
});

passwordForm.addEventListener('submit', async event => {
    event.preventDefault();
    const button = document.getElementById('savePassword');
    button.disabled = true;
    setStatus(passwordStatus, 'Updating password...');
    try{
        const data = await requestJson(updateApi, 'POST', {
            action:'password',
            current_password:document.getElementById('currentPassword').value,
            new_password:document.getElementById('newPassword').value,
            confirm_password:document.getElementById('confirmPassword').value
        });
        passwordForm.reset();
        setStatus(passwordStatus, data.message);
    }catch(error){
        setStatus(passwordStatus, error.message, true);
    }finally{
        button.disabled = false;
    }
});

loadAccount();

;


  }
}
