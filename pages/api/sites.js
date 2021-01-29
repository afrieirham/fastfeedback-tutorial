import { getAllSites } from '@/lib/db-admin'

export default async (_, res) => {
  const { sites, error } = await getAllSites()
  if (error) {
    return res.status(500).json({ error })
  }
  return res.status(200).json({ sites })
}
