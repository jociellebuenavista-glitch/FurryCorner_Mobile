// @ts-nocheck  (legacy script below is plain JavaScript carried over from language.html)
import { Component } from '@angular/core';
import { LegacyPage } from '../../legacy/legacy-page';
import { HTML, CSS, TITLE, BODY_CLASS } from './language.markup';

@Component({
  selector: 'app-language',
  standalone: true,
  template: '<div class="legacy-root" #host></div>',
  styles: [':host, .legacy-root { display: contents; }'],
})
export class LanguagePage extends LegacyPage {
  protected markup = { html: HTML, css: CSS, title: TITLE, bodyClass: BODY_CLASS };

  // Original <script> code of language.html. `location` is a shim that routes through the Angular Router.
  protected run(location: any, __onReady: any): void {

;


  }
}
