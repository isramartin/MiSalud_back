export interface JwtPayload {
  sub: number; // userId
  username: string;
  iat?: number; // Opcional: Emitido en
  exp?: number; // Opcional: Expiración
}
