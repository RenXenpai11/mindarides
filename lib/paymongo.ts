import 'server-only'

const PAYMONGO_BASE_URL = 'https://api.paymongo.com/v1'

function getPayMongoSecretKey() {
  const key = process.env.PAYMONGO_SECRET_KEY

  if (!key) {
    throw new Error('PAYMONGO_SECRET_KEY is not set')
  }

  return key
}

export async function createCheckoutLink(amount: number, description: string) {
  const encodedKey = Buffer.from(`${getPayMongoSecretKey()}:`).toString('base64')
  const response = await fetch(`${PAYMONGO_BASE_URL}/links`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${encodedKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      data: {
        attributes: {
          amount: amount * 100,
          description,
          remarks: 'MindaRide Pro membership',
        },
      },
    }),
  })

  if (!response.ok) {
    throw new Error('Unable to create PayMongo checkout link')
  }

  return response.json()
}
