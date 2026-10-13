import { AfterViewInit, Directive, ElementRef, OnDestroy, ViewChild, inject } from '@angular/core';
import { Router } from '@angular/router';
import { API_BASE } from '../config';
import { runAuthGuard } from './auth-guard.script';
import { WEBSITE_THEME_CSS } from './website-theme';

export interface PageMarkup { html: string; css: string; title: string; bodyClass: string; }

type Tracked = { target: EventTarget; type: string; fn: any; opts: any };
let tracked: Tracked[] | null = null;
let intervals: number[] | null = null;
let patched = false;

/** Remember listeners/intervals a page adds to window/document so they can be removed when leaving it. */
function patchOnce() {
  if (patched) return;
  patched = true;
  const add = EventTarget.prototype.addEventListener;
  EventTarget.prototype.addEventListener = function (this: EventTarget, type: string, fn: any, opts?: any) {
    const t: any = this;
    if (tracked && (t === window || t === document || t === document.body || t === document.documentElement)) {
      tracked.push({ target: t, type, fn, opts });
    }
    return add.call(this, type, fn, opts);
  } as any;
  const setI = window.setInterval.bind(window);
  (window as any).setInterval = (...a: any[]) => {
    const id = (setI as any)(...a);
    intervals?.push(id);
    return id;
  };
}

@Directive()
export abstract class LegacyPage implements AfterViewInit, OnDestroy {
  protected abstract markup: PageMarkup;
  protected abstract run(location: any, onReady: (fn: () => void) => void): void;

  @ViewChild('host', { static: true }) host!: ElementRef<HTMLElement>;
  private router = inject(Router);
  private styleEl?: HTMLStyleElement;
  private bodyKids = new Set<Element>();
  private headKids = new Set<Element>();
  private bodyClass = '';
  private myTracked: Tracked[] = [];
  private myIntervals: number[] = [];

  /** Turns old links like "signin.html?return=x" into Angular routes like "/signin?return=x". */
  private go(value: string, replace = false) {
    const base = window.location.origin + this.legacyPath();
    const u = new URL(String(value), base);
    if (u.origin !== window.location.origin) { window.location.href = u.href; return; }
    const seg = (u.pathname.split('/').pop() || 'index').replace(/\.html$/, '');
    const path = seg === 'index' ? '/' : '/' + seg;
    this.router.navigateByUrl(path + u.search + u.hash, { replaceUrl: replace });
  }

  private legacyPath() {
    const seg = window.location.pathname.split('/').pop();
    return seg ? `/${seg}.html` : '/index.html';
  }

  /** Stand-in for window.location: reads look like the old multi-page site, writes go through the Router. */
  private makeLocation() {
    const self = this, w = window.location;
    return {
      get href() { return w.origin + self.legacyPath() + w.search + w.hash; },
      set href(v: string) { self.go(v); },
      assign: (v: string) => self.go(v),
      replace: (v: string) => self.go(v, true),
      reload: () => w.reload(),
      get pathname() { return self.legacyPath(); },
      get search() { return w.search; },
      get hash() { return w.hash; },
      get origin() { return w.origin; },
      get host() { return w.host; },
      get hostname() { return w.hostname; },
      get protocol() { return w.protocol; },
      get port() { return w.port; },
      toString() { return this.href; },
    };
  }

  ngAfterViewInit() {
    patchOnce();
    const m = this.markup;
    (window as any).FURRY_API = API_BASE;
    this.bodyKids = new Set(Array.from(document.body.children));
    this.headKids = new Set(Array.from(document.head.children));
    this.bodyClass = document.body.className;

    document.title = m.title;
    if (m.bodyClass) document.body.classList.add(...m.bodyClass.split(/\s+/).filter(Boolean));
    this.styleEl = document.createElement('style');
    // Page CSS first, then the shared website theme so it overrides the old cream mobile look.
    this.styleEl.textContent = m.css + '\n' + WEBSITE_THEME_CSS;
    document.head.appendChild(this.styleEl);
    this.host.nativeElement.innerHTML = m.html;
    window.scrollTo(0, 0);

    tracked = this.myTracked;
    intervals = this.myIntervals;
    const loc = this.makeLocation();
    const onReady = (fn: () => void) => fn();
    try {
      runAuthGuard(loc, onReady);
      this.run(loc, onReady);
    } catch (e) {
      console.error('Page script error:', e);
    }
  }

  ngOnDestroy() {
    this.myTracked.forEach(t => t.target.removeEventListener(t.type, t.fn, t.opts));
    this.myIntervals.forEach(id => clearInterval(id));
    tracked = null; intervals = null;
    this.styleEl?.remove();
    Array.from(document.body.children).forEach(el => { if (!this.bodyKids.has(el)) el.remove(); });
    Array.from(document.head.children).forEach(el => { if (!this.headKids.has(el)) el.remove(); });
    document.body.className = this.bodyClass;
  }
}
