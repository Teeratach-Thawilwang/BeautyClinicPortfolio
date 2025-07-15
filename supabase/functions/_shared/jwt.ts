// @ts-ignore: no type declarations
import {SignJWT, importPKCS8} from 'npm:jose@5.9.6'

export async function createJWT(
  payload: Record<string, any>,
  secret: string,
): Promise<string> {
  const now = Math.floor(Date.now() / 1000) // วินาที
  const iat = now
  const exp = now + 3600 // 1 ชั่วโมง

  const alg = 'RS256'
  const privateKey = await importPKCS8(secret, alg)
  const jwt = await new SignJWT({scope: payload.scope})
    .setProtectedHeader({alg: alg})
    .setIssuedAt(iat)
    .setExpirationTime(exp)
    .setIssuer(payload.iss)
    .setSubject(payload.iss)
    .setAudience(payload.aud)
    .sign(privateKey)

  return jwt
}
