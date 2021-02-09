import { getAllFeedback, getSite } from '@/lib/db-admin'
import { formatObjectKeys, logger } from '@/utils/logger'

export default async (req, res) => {
  try {
    const [siteId, route] = req.query.site || []
    const { feedback } = await getAllFeedback(siteId, route)
    const { site } = await getSite(siteId)

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
