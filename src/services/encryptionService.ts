const KEY_STORAGE_KEY = 'cryptoKey';

class EncryptionService {
  private key: CryptoKey | null = null;

  constructor() {
    this.init();
  }

  private async init() {
    try {
      const storedKey = localStorage.getItem(KEY_STORAGE_KEY);
      if (storedKey) {
        this.key = await this.importKey(JSON.parse(storedKey));
      } else {
        this.key = await this.generateKey();
        const exportedKey = await this.exportKey(this.key);
        localStorage.setItem(KEY_STORAGE_KEY, JSON.stringify(exportedKey));
      }
    } catch (error) {
      console.error('Error initializing encryption service:', error);
    }
  }

  private async generateKey(): Promise<CryptoKey> {
    return window.crypto.subtle.generateKey(
      {
        name: 'AES-GCM',
        length: 256,
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  private async exportKey(key: CryptoKey): Promise<JsonWebKey> {
    return window.crypto.subtle.exportKey('jwk', key);
  }

  private async importKey(jwk: JsonWebKey): Promise<CryptoKey> {
    return window.crypto.subtle.importKey(
      'jwk',
      jwk,
      {
        name: 'AES-GCM',
      },
      true,
      ['encrypt', 'decrypt']
    );
  }

  async encrypt(data: string): Promise<string> {
    if (!this.key) {
      await this.init();
    }
    if (!this.key) {
      throw new Error('Encryption key not available');
    }

    const iv = window.crypto.getRandomValues(new Uint8Array(12));
    const encodedData = new TextEncoder().encode(data);

    const encryptedData = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      this.key,
      encodedData
    );

    const encryptedArray = new Uint8Array(encryptedData);
    const ivArray = Array.from(iv);
    const encryptedDataArray = Array.from(encryptedArray);

    return JSON.stringify({ iv: ivArray, data: encryptedDataArray });
  }

  async decrypt(encrypted: string): Promise<string> {
    if (!this.key) {
      await this.init();
    }
    if (!this.key) {
      throw new Error('Decryption key not available');
    }

    const { iv, data } = JSON.parse(encrypted);
    const ivArray = new Uint8Array(iv);
    const encryptedData = new Uint8Array(data);

    const decryptedData = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: ivArray,
      },
      this.key,
      encryptedData
    );

    return new TextDecoder().decode(decryptedData);
  }
}

export const encryptionService = new EncryptionService();
