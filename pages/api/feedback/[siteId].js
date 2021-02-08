import { getAllFeedback, getSite } from '@/lib/db-admin'
import { formatObjectKeys, logger } from '@/utils/logger'

export default async (req, res) => {
  try {
    const { feedback } = await getAllFeedback(req.query.siteId)
    const { site } = await getSite(req.query.siteId)
    res.status(200).json({ feedback, site })
  } catch (error) {
    res.status(500).json({ error })
    logger.error(
      {
        request: {
          headers: formatObjectKeys(req.headers),
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message,
    )
  }
}
