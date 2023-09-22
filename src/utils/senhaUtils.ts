import crypto from 'crypto';

function encryptPassword(password): string {
  const iv = crypto.randomBytes(12); // 12 bytes IV for GCM
  const key = crypto.scryptSync(process.env.SECRET_KEY_CRYPTO as string, 'salt', 32);
  const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
  let encrypted = cipher.update(password, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag(); // Obtenha a tag de autenticação

  // Registre a tag de autenticação para verificar o tamanho
  console.log('Tamanho da tag de autenticação:', authTag.length);

  const encryptedData = encrypted + authTag.toString('hex'); // Combine os dados criptografados e a tag de autenticação

  console.log('Chave usada para criptografia:', key.toString('hex'));
  console.log('IV (Nonce) usado para criptografia:', iv.toString('hex'));

  return iv.toString('hex') + ':' + encryptedData;
}

function decryptPassword(encryptedPassword: string): string {
  const [ivHex, encryptedData] = encryptedPassword.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const key = crypto.scryptSync(process.env.SECRET_KEY_CRYPTO as string, 'salt', 32);
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv);

  const authTagHex = encryptedData.slice(-32); // A tag de autenticação é os últimos 32 caracteres
  const encryptedHex = encryptedData.slice(0, -32); // Os dados criptografados são todos, exceto os últimos 32 caracteres

  decipher.setAuthTag(Buffer.from(authTagHex, 'hex')); // Configure a tag de autenticação

  let decrypted = decipher.update(encryptedHex, 'hex', 'utf8');
  decrypted += decipher.final('utf8');

  console.log('Chave usada para descriptografia:', key.toString('hex'));
  console.log('IV (Nonce) usado para descriptografia:', iv.toString('hex'));

  return decrypted;
}

export { encryptPassword, decryptPassword };
