declare module 'crypto-js/build' {
  import CryptoJS from 'crypto-js';
  import algo = CryptoJS.algo;
  export { algo };
}

declare module 'crypto-js/build/enc-base64' {
  import CryptoJS from 'crypto-js';
  export const parse: typeof CryptoJS.enc.Base64.parse;
  export const stringify: typeof CryptoJS.enc.Base64.stringify;
}

declare module 'crypto-js/build/lib-typedarrays' {
  import CryptoJS from 'crypto-js';
  export default CryptoJS.lib.WordArray;
}

declare module 'crypto-js/build/hmac-sha256' {
  import CryptoJS from 'crypto-js';
  export default CryptoJS.HmacSHA256;
}
