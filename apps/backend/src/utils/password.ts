/**
 * Utilitário para gerenciamento de senhas.
 * Utiliza a API nativa do Bun para máxima performance e segurança.
 */
export class PasswordUtils {
  /**
   * Gera um hash seguro para salvar no banco de dados.
   * Por padrão utiliza Argon2 (segundo recomendações atuais de segurança).
   */
  static async hash(password: string): Promise<string> {
    return await Bun.password.hash(password, {
      algorithm: "argon2id",
      memoryCost: 65536,
      timeCost: 2,
    });
  }

  /**
   * Verifica se uma senha em texto simples coincide com o hash do banco.
   */
  static async verify(password: string, hash: string): Promise<boolean> {
    return await Bun.password.verify(password, hash);
  }

  /**
   * Gera uma senha aleatória segura para resets de senha ou senhas temporárias.
   * @param length Tamanho da senha (padrão 12)
   */
  static generateRandom(length: number = 12): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let password = "";
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);
    
    for (let i = 0; i < length; i++) {
      password += charset[randomValues[i]! % charset.length];
    }
    
    return password;
  }
}
