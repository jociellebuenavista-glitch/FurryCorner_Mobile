// @ts-nocheck  (legacy script below is plain JavaScript carried over from help-center.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './help-center.markup';

@Component({
  selector: 'app-help-center',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class HelpCenterPage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of help-center.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {

;


  }
}
