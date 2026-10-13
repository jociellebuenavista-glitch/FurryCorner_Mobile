// @ts-nocheck  (legacy script below is plain JavaScript carried over from signup.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './signup.markup';

@Component({
  selector: 'app-signup',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class SignupPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of signup.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {


const signupForm = document.getElementById('signupForm');
const signupPanel = document.querySelector('.panel');
const fullNameField = document.getElementById('name').closest('.field');
const formError = document.getElementById('formError');
const successMessage = document.getElementById('successMessage');
const submitBtn = signupForm.querySelector('button[type="submit"]');

// --- Google-style signup UI (name split, Google button) ---
document.querySelector('.panel h1').textContent = 'Create your account';
document.querySelector('.intro').textContent = 'Join FurryCorner to shop and book pet services';
submitBtn.textContent = 'Create account';
document.getElementById('email').placeholder = 'you@example.com';
document.getElementById('password').placeholder = 'Enter password';
document.getElementById('confirm').placeholder = 'Confirm password';
document.querySelector('.signin a').textContent = 'Sign in';
document.querySelector('.signin a').href = 'signin.html';
signupPanel.insertBefore(Object.assign(document.createElement('button'), {className: 'google-button', type: 'button', innerHTML: '<svg class="google-mark" viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.24a4.48 4.48 0 0 1-1.94 2.94v2.45h3.15c1.84-1.69 2.9-4.18 2.9-7.22Z"></path><path fill="#34A853" d="M12 21.75c2.63 0 4.84-.87 6.45-2.36l-3.15-2.45c-.87.58-1.98.93-3.3.93-2.54 0-4.69-1.72-5.46-4.03H3.28v2.53A9.75 9.75 0 0 0 12 21.75Z"></path><path fill="#FBBC05" d="M6.54 13.84A5.86 5.86 0 0 1 6.23 12c0-.64.11-1.26.31-1.84V7.63H3.28A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.03 4.37l3.26-2.53Z"></path><path fill="#EA4335" d="M12 6.13c1.43 0 2.72.49 3.73 1.45l2.8-2.8C16.84 3.22 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.72 5.38l3.26 2.53c.77-2.31 2.92-4.03 5.46-4.03Z"></path></svg>Continue with Google'}), signupForm);
signupPanel.insertBefore(Object.assign(document.createElement('div'), {className: 'or-divider', textContent: 'OR'}), signupForm);
fullNameField.innerHTML = '<input id="name" type="hidden">';
fullNameField.style.display = 'none';
const nameFields = document.createElement('div');
nameFields.className = 'name-fields';
nameFields.innerHTML = '<div class="field"><input id="firstName" placeholder="First name" autocomplete="given-name" required></div><div class="field"><input id="lastName" placeholder="Last name" autocomplete="family-name" required></div>';
signupForm.insertBefore(nameFields, fullNameField);
const syncFullName = () => { document.getElementById('name').value = `${document.getElementById('firstName').value.trim()} ${document.getElementById('lastName').value.trim()}`.trim(); };
document.querySelectorAll('#firstName, #lastName').forEach(input => input.addEventListener('input', syncFullName));

function showFormError(msg) {
  formError.textContent = msg;
  formError.hidden = false;
}

function resetFormError() {
  formError.hidden = true;
  formError.textContent = '';
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateSignupFields() {
  const firstName = document.getElementById('firstName').value.trim();
  const lastName = document.getElementById('lastName').value.trim();
  const email = document.getElementById('email');
  const password = document.getElementById('password');
  const confirm = document.getElementById('confirm');

  confirm.setCustomValidity('');

  if (!firstName || !lastName) {
    return 'Please enter your first and last name.';
  }
  if (!email.value.trim()) {
    return 'Please enter your email address.';
  }
  if (!EMAIL_PATTERN.test(email.value.trim())) {
    return 'Please enter a valid email address.';
  }
  if (!password.value) {
    return 'Please enter a password.';
  }
  if (password.value.length < 6) {
    return 'Password must be at least 6 characters long.';
  }
  if (!confirm.value) {
    return 'Please confirm your password.';
  }
  if (password.value !== confirm.value) {
    confirm.setCustomValidity('Passwords do not match');
    return 'Passwords do not match.';
  }
  return null;
}

signupForm.addEventListener('submit', async event => {
  event.preventDefault();
  resetFormError();
  syncFullName();

  const validationError = validateSignupFields();
  if (validationError) {
    showFormError(validationError);
    return;
  }

  submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';

    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    try {
    const response = await fetch(
      window.FURRY_API + '/register.php',
      {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({firstName, lastName, email, password})
      }
    );

    const data = await response.json();

    if (!response.ok || !data.success) {
      showFormError(data.message || 'Unable to create account.');
      return;
    }

    const loggedInUser = {
      id: data.user_id,
      user_id: data.user_id,
      firstName,
      lastName,
      email,
      role: data.role || 'customer'
    };
    const name = `${firstName} ${lastName}`.trim();

    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
    localStorage.setItem('loggedInUserId', String(data.user_id));
    localStorage.setItem('furryCornerAuthToken', data.token);
    localStorage.setItem('loggedInName', name);
    localStorage.setItem('loggedInEmail', email);
    localStorage.setItem('furryCornerUser', JSON.stringify({name, email}));
    localStorage.setItem('profileName', name);
    localStorage.setItem('furryCornerAccount', JSON.stringify({name, email}));

    signupForm.hidden = true;
    document.getElementById('signinRow').hidden = true;
    successMessage.textContent = 'Account created successfully! Welcome to FurryCorner.';
    successMessage.hidden = false;

    setTimeout(() => {
      const returnPage = new URLSearchParams(location.search).get('return');
      location.href = window.FurryCornerAuth.getSafeReturnTarget(returnPage || 'profile.html');
    }, 600);
    } catch (error) {
    console.error('Registration request failed:', error);
    showFormError('Unable to connect to the server. Please try again.');
    } finally {
    if (!signupForm.hidden) {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Create account';
    }
    }
});

;


  }
}
