import CryptoJS from 'crypto-js'

/**
 * sm2 加密方法
 * @param data
 * @returns {*}
 */
export function encrypt(data) {
  try {
    return CryptoJS.MD5(data).toString();
  } catch {
    return '';
  }
}
