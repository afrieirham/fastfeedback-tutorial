import db from '@/lib/firebase-admin'

export default async (_, res) => {
  const snapshot = await db.collection('sites').get()

  const sites = []
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  // Sort sites based on createdAt
  const sortedSites = sites.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))

  return res.status(200).json(sortedSites)
}
