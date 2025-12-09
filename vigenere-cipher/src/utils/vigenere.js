/**
 * Vigenère Cipher Implementation
 * Preserves case, spaces, and special characters
 */

/**
 * Encrypts plaintext using Vigenère cipher
 * @param {string} plaintext - Text to encrypt
 * @param {string} key - Encryption key (alphabetic only)
 * @returns {string} Encrypted ciphertext
 */
export function encryptVigenere(plaintext, key) {
  if (!plaintext || !key) return '';
  
  const cleanKey = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
  if (cleanKey.length === 0) return plaintext;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < plaintext.length; i++) {
    const char = plaintext[i];
    
    // Check if character is alphabetic
    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97; // ASCII codes for 'A' and 'a'
      
      // Convert to 0-25 range
      const charCode = char.toUpperCase().charCodeAt(0) - 65;
      const keyChar = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
      
      // Apply Vigenère encryption formula: C = (P + K) mod 26
      const encryptedCode = (charCode + keyChar) % 26;
      
      // Convert back to character, preserving case
      const encryptedChar = String.fromCharCode(encryptedCode + base);
      result += isUpperCase ? encryptedChar.toUpperCase() : encryptedChar.toLowerCase();
      
      keyIndex++; // Only increment key index for alphabetic characters
    } else {
      // Preserve non-alphabetic characters (spaces, punctuation, etc.)
      result += char;
    }
  }
  
  return result;
}

/**
 * Decrypts ciphertext using Vigenère cipher
 * @param {string} ciphertext - Text to decrypt
 * @param {string} key - Decryption key (alphabetic only)
 * @returns {string} Decrypted plaintext
 */
export function decryptVigenere(ciphertext, key) {
  if (!ciphertext || !key) return '';
  
  const cleanKey = key.replace(/[^a-zA-Z]/g, '').toUpperCase();
  if (cleanKey.length === 0) return ciphertext;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < ciphertext.length; i++) {
    const char = ciphertext[i];
    
    if (/[a-zA-Z]/.test(char)) {
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97;
      
      const charCode = char.toUpperCase().charCodeAt(0) - 65;
      const keyChar = cleanKey[keyIndex % cleanKey.length].charCodeAt(0) - 65;
      
      // Apply Vigenère decryption formula: P = (C - K + 26) mod 26
      const decryptedCode = (charCode - keyChar + 26) % 26;
      
      const decryptedChar = String.fromCharCode(decryptedCode + base);
      result += isUpperCase ? decryptedChar.toUpperCase() : decryptedChar.toLowerCase();
      
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

/**
 * Validates encryption key (must contain at least one alphabetic character)
 * @param {string} key - Key to validate
 * @returns {boolean} True if valid
 */
export function validateKey(key) {
  return key && /[a-zA-Z]/.test(key);
}
