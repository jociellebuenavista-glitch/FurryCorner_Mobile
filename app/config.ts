// Address of your PHP API (the furrycorner_api folder).
// A phone cannot reach "localhost" on your PC - use your PC's LAN IP (run `ipconfig`, look for IPv4),
// or your hosted server URL later. No trailing slash.
export const API_BASE = 'http://192.168.18.149/furrycorner_api';

// Phones that draw the app edge-to-edge (behind the status bar and the gesture bar) report the size of those
// bars to the page. If a phone reports nothing, these fallbacks (in px) keep the top bar and the bottom tabs
// clear of them. Raise/lower them if you still see overlap or too much empty space.
export const STATUS_BAR_FALLBACK_PX = 40;
export const NAV_BAR_FALLBACK_PX = 20;
