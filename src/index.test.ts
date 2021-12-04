import { genKeys, encrypt, decrypt } from './index';

test('Text', () => {
  const keys = genKeys();
  const message = 'Hello!';
  const encrypted = encrypt(message, keys.e, keys.n);
  const decrypted = decrypt(encrypted, keys.d, keys.n);
  expect(decrypted).toStrictEqual(message);
});

test('Emojis', () => {
  const keys = genKeys();
  const message = '🐝🤗☕⛄😉';
  const encrypted = encrypt(message, keys.e, keys.n);
  const decrypted = decrypt(encrypted, keys.d, keys.n);
  expect(decrypted).toStrictEqual(message);
});

test('Japaneese', () => {
  const keys = genKeys();
  const message = 'ハロー・ワールド';
  const encrypted = encrypt(message, keys.e, keys.n);
  const decrypted = decrypt(encrypted, keys.d, keys.n);
  expect(decrypted).toStrictEqual(message);
});
