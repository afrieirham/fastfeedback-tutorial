import { compareDesc, parseISO } from 'date-fns'

import { db } from './firebase-admin'

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await db.collection('feedback').where('siteId', '==', siteId).get()

    const feedbacks = []
    snapshot.forEach((doc) => {
      feedbacks.push({ id: doc.id, ...doc.data() })
    })

    const sortedFeedback = feedbacks.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
    )

    return { feedback: sortedFeedback }
  } catch (error) {
    return { error }
  }
}

export async function getAllSites() {
  try {
    const snapshot = await db.collection('sites').get()

    const sites = []
    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() })
    })

    const sortedSites = sites.sort((a, b) =>
      compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
    )

    return { sites: sortedSites }
  } catch (error) {
    return { error }
  }
}

export async function getUserSites(uid) {
  const snapshot = await db.collection('sites').where('authorId', '==', uid).get()

  const sites = []
  snapshot.forEach((doc) => {
    sites.push({ id: doc.id, ...doc.data() })
  })

  const sortedSites = sites.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  )

  return { sites: sortedSites }
}

export async function getUserFeedback(uid) {
  const snapshot = await db.collection('feedback').where('authorId', '==', uid).get()

  const feedback = []
  snapshot.forEach((doc) => {
    feedback.push({ id: doc.id, ...doc.data() })
  })

  const sortedFeedback = feedback.sort((a, b) =>
    compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)),
  )

  return { feedback: sortedFeedback }
}
