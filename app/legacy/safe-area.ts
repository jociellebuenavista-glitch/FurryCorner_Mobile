import { Capacitor } from '@capacitor/core';
import { NAV_BAR_FALLBACK_PX, STATUS_BAR_FALLBACK_PX } from '../config';

/**
 * Publishes the phone's status-bar / gesture-bar sizes as CSS variables (--sat = top, --sab = bottom) on <html>.
 * Every page uses them, so top bars sit BELOW the clock/battery and the bottom tabs sit ABOVE the gesture bar.
 *
 * Order of trust: env(safe-area-inset-*) -> Capacitor's --safe-area-inset-* variables -> a fixed fallback
 * (only on a native Android build that reports nothing).
 */
export function initSafeArea(): void {
  const root = document.documentElement;
  const probe = document.createElement('div');
  probe.setAttribute('aria-hidden', 'true');
  probe.style.cssText =
    'position:fixed;left:0;top:0;width:0;height:0;visibility:hidden;pointer-events:none;' +
    'padding-top:max(env(safe-area-inset-top,0px),var(--safe-area-inset-top,0px));' +
    'padding-bottom:max(env(safe-area-inset-bottom,0px),var(--safe-area-inset-bottom,0px));';
  // Attached to <html> (not <body>) so page changes never remove it.
  root.appendChild(probe);

  const nativeAndroid = Capacitor.isNativePlatform() && Capacitor.getPlatform() === 'android';

  const apply = () => {
    const cs = getComputedStyle(probe);
    const top = parseFloat(cs.paddingTop) || 0;
    const bottom = parseFloat(cs.paddingBottom) || 0;
    root.style.setProperty('--sat', (top > 0 ? top : nativeAndroid ? STATUS_BAR_FALLBACK_PX : 0) + 'px');
    root.style.setProperty('--sab', (bottom > 0 ? bottom : nativeAndroid ? NAV_BAR_FALLBACK_PX : 0) + 'px');
  };

  apply();
  // Some WebViews only report the insets a moment after start-up or after rotating.
  [150, 600, 1500].forEach(ms => setTimeout(apply, ms));
  window.addEventListener('resize', apply);
  window.addEventListener('orientationchange', () => setTimeout(apply, 250));
}
