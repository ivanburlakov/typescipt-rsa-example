import { generatePrimeSync } from 'crypto';
import { modInv, modPow } from 'bigint-mod-arith';

function isPrime(num: bigint): boolean {
  for (let i = 2n; i < num; i++) {
    if (num % i === 0n) {
      return false;
    }
  }
  return true;
}

function getCoprime(t: bigint, n: bigint): bigint {
  for (let i = 2n; i < n; i++) {
    if (isPrime(i) && t % i !== 0n && n % i !== 0n) {
      return i;
    }
  }
}

function encrypt(message: string, e: bigint, n: bigint): string {
  const codes = message.split('').map((i) => i.codePointAt(0));
  const newCodes = [];
  for (const code of codes) {
    newCodes.push(modPow(BigInt(code), e, n));
  }
  return newCodes.join('.');
}

function decrypt(encryptedMsg: string, d: bigint, n: bigint): string {
  const codes = encryptedMsg.split('.');
  let decryptedString = '';
  for (const code of codes) {
    decryptedString += String.fromCodePoint(Number(modPow(BigInt(code), d, n)));
  }
  return decryptedString;
}

function genKeys() {
  const p = generatePrimeSync(128, { bigint: true });
  const q = generatePrimeSync(128, { bigint: true });
  const n: bigint = p * q;
  const t: bigint = (p - 1n) * (q - 1n);
  const e: bigint = getCoprime(t, n);
  const d: bigint = modInv(e, t);
  return {
    n,
    e,
    d,
  };
}

export { genKeys, encrypt, decrypt };
