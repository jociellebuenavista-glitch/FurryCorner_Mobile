import { RouteReuseStrategy, ActivatedRouteSnapshot, DetachedRouteHandle } from '@angular/router';

// Legacy pages run their script once at start-up, so every navigation (even to the same page with a
// different ?query) must create a fresh component, like a real page load did before.
export class NoReuseStrategy implements RouteReuseStrategy {
  shouldDetach(): boolean { return false; }
  store(_r: ActivatedRouteSnapshot, _h: DetachedRouteHandle | null): void {}
  shouldAttach(): boolean { return false; }
  retrieve(): DetachedRouteHandle | null { return null; }
  shouldReuseRoute(): boolean { return false; }
}
