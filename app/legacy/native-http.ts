import { Capacitor, CapacitorHttp } from '@capacitor/core';
import { API_BASE } from '../config';

/**
 * Inside the installed app the WebView blocks plain-http calls to your PC (mixed content / CORS), which is why
 * products, services and the profile never loaded on the phone even though they work in a browser.
 * This sends every request to API_BASE through the phone's native HTTP client instead, which has neither limit.
 * In a normal browser (ionic serve) nothing changes.
 */
export function installNativeHttp(): void {
  if (!Capacitor.isNativePlatform()) return;
  const browserFetch = window.fetch.bind(window);

  window.fetch = async (input: any, init: any = {}) => {
    const url: string = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url;
    if (!url.startsWith(API_BASE)) return browserFetch(input, init);

    const method = String(init.method || (input instanceof Request ? input.method : 'GET')).toUpperCase();

    const headers: Record<string, string> = {};
    const rawHeaders = init.headers || (input instanceof Request ? input.headers : undefined);
    if (rawHeaders) new Headers(rawHeaders).forEach((v, k) => (headers[k] = v));

    let data: any = undefined;
    const body = init.body;
    if (body !== undefined && body !== null && method !== 'GET' && method !== 'HEAD') {
      if (typeof body === 'string') {
        const isJson = String(headers['content-type'] || '').includes('json');
        try { data = isJson ? JSON.parse(body) : body; } catch { data = body; }
      } else if (body instanceof URLSearchParams) {
        data = body.toString();
        headers['content-type'] = headers['content-type'] || 'application/x-www-form-urlencoded';
      } else {
        // FormData / Blob uploads: let the WebView handle these.
        return browserFetch(input, init);
      }
    }

    const res = await CapacitorHttp.request({
      url, method, headers, data,
      responseType: 'text',
      connectTimeout: 12000,
      readTimeout: 20000,
    });

    const text = typeof res.data === 'string' ? res.data : JSON.stringify(res.data ?? '');
    const noBody = [101, 204, 205, 304].includes(res.status);
    return new Response(noBody ? null : text, { status: res.status, headers: res.headers as any });
  };
}
