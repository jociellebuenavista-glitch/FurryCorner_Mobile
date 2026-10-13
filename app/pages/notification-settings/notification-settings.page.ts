// @ts-nocheck  (legacy script below is plain JavaScript carried over from notification-settings.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './notification-settings.markup';

@Component({
  selector: 'app-notification-settings',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class NotificationSettingsPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of notification-settings.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {

;


  }
}
