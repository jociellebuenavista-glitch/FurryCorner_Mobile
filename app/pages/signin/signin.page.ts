// @ts-nocheck  (legacy script below is plain JavaScript carried over from signin.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './signin.markup';

@Component({
  selector: 'app-signin',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class SigninPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of signin.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {


/* =========================
   RETURN LOCATION
========================= */

const returnTo =
    new URLSearchParams(location.search).get('return');


/* =========================
   SIGN UP LINK
========================= */

const signupLink =
    document.getElementById('signupLink');

signupLink.href =
    `signup.html?return=${encodeURIComponent(
        window.FurryCornerAuth.getSafeReturnTarget(
            returnTo || 'profile.html'
        )
    )}`;


/* =========================
   EMAIL LOGIN
   EMAIL ONLY
========================= */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showError(message) {
    const error = document.getElementById('error');
    error.textContent = message;
    error.hidden = false;
}

function resetError() {
    const error = document.getElementById('error');
    error.hidden = true;
    error.textContent = '';
}

document
    .getElementById('loginForm')
    .addEventListener('submit', async event => {

        event.preventDefault();

        resetError();


        const emailValue =
            document
                .getElementById('email')
                .value
                .trim()
                .toLowerCase();


        const passwordValue =
            document
                .getElementById('password')
                .value;


        /* =================================================
           VALIDATION
        ================================================= */

        if (!emailValue) {

            showError(
                'Please enter your email address.'
            );

            return;
        }


        if (!EMAIL_PATTERN.test(emailValue)) {

            showError(
                'Please enter a valid email address.'
            );

            return;
        }


        if (!passwordValue) {

            showError(
                'Please enter your password.'
            );

            return;
        }


        /* =================================================
           DISABLE BUTTON
        ================================================= */

        const button =
            document.querySelector(
                '#loginForm .button'
            );


        const originalText =
            button.textContent;


        button.disabled = true;

        button.textContent =
            'Signing in...';


        try {

            /* =============================================
               SEND LOGIN TO DATABASE
            ============================================= */

            const response =
                await fetch(
                    window.FURRY_API + '/login.php',
                    {
                        method: 'POST',

                        headers: {
                            'Content-Type':
                                'application/json'
                        },

                        body: JSON.stringify({

                            email:
                                emailValue,

                            password:
                                passwordValue

                        })
                    }
                );


            const data =
                await response.json();


            console.log(
                'login.php response:',
                data
            );


            /* =============================================
               LOGIN FAILED
            ============================================= */

            if (!data.success) {

                showError(
                    data.message ||
                    'Login failed.'
                );

                return;
            }


            /* =============================================
               SAVE DATABASE USER ID
            ============================================= */

            localStorage.setItem(
                'loggedInUserId',
                data.user_id
            );

            localStorage.setItem(
                'furryCornerAuthToken',
                data.token
            );


            /* =============================================
               SAVE USER INFORMATION
               FOR FRONT-END SESSION
            ============================================= */

            localStorage.setItem(
                'loggedInUser',
                JSON.stringify({

                    id:
                        data.user_id,

                    user_id:
                        data.user_id,

                    firstName:
                        data.first_name,

                    lastName:
                        data.last_name,

                    email:
                        data.email,

                    role:
                        data.role

                })
            );


            localStorage.setItem(
                'loggedInName',
                `${data.first_name} ${data.last_name}`.trim()
            );


            localStorage.setItem(
                'loggedInEmail',
                data.email
            );


            /* =============================================
               REDIRECT
            ============================================= */

            location.href =
                window.FurryCornerAuth.getSafeReturnTarget(
                    returnTo || 'profile.html'
                );


        }
        catch (error) {

            console.error(
                'Login request failed:',
                error
            );


            showError(
                'Unable to connect to the server. Please try again.'
            );

        }
        finally {

            button.disabled = false;

            button.textContent =
                originalText;

        }

    });

/* =========================
   GOOGLE BUTTON
========================= */

document
    .getElementById('googleButton')
    .addEventListener('click', () => {

        alert(
            'Google Sign-In is not connected yet.'
        );

    });


;


  }
}
