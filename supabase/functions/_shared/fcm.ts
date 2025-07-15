import {createJWT} from './jwt.ts'

const CLIENT_EMAIL = Deno.env.get('FIREBASE_CLIENT_EMAIL')
const PRIVATE_KEY = Deno.env.get('FIREBASE_PRIVATE_KEY')?.replace(/\\n/g, '\n')
const PROJECT_ID = Deno.env.get('FIREBASE_PROJECT_ID')
const LOGO_IMAGE = Deno.env.get('LOGO_IMAGE')

export const OAUTH_URL = 'https://oauth2.googleapis.com/token'
export const SCOPE = 'https://www.googleapis.com/auth/firebase.messaging'

export async function getAccessToken(): Promise<string> {
  if (!CLIENT_EMAIL || !PRIVATE_KEY) {
    throw new Error("Missing Firebase credentials on supabase's secret.")
  }

  const jwt = await createJWT(
    {
      iss: CLIENT_EMAIL,
      scope: SCOPE,
      aud: OAUTH_URL,
    },
    PRIVATE_KEY,
  )

  const res = await fetch(OAUTH_URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }).toString(),
  })

  const data = await res.json()

  if (!res.ok) {
    throw new Error(`Failed to get access token: ${JSON.stringify(data)}`)
  }

  return data.access_token
}

export async function sendNotificationToFCM(
  accessToken: string,
  token: string,
  title: string,
  body: string,
  imageUrl?: string,
) {
  if (!PROJECT_ID) {
    throw new Error("Missing FIREBASE_PROJECT_ID on supabase's secret.")
  }
  const image = imageUrl ?? LOGO_IMAGE
  const response = await fetch(
    `https://fcm.googleapis.com/v1/projects/${PROJECT_ID}/messages:send`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        message: {
          token: token,
          notification: {
            title,
            body,
            ...(image ? {image: image} : {}),
          },
        },
      }),
    },
  )

  if (!response.ok) {
    const text = await response.text()
    console.error('Failed to send notification:', text)
  }
}
