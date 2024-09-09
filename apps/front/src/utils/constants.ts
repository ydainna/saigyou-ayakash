export class constants {
  //URL for the API
  static readonly API_URL: string = import.meta.env.VITE_API_BASE_URL;
  static readonly RECAPTCHA_SITE_KEY: string = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  static readonly TOKEN_PAYLOAD_KEY: string = "Authorization";
  static readonly DISPLAYNAME_KEY: string = "displayname";
}
