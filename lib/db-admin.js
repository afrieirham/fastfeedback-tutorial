import { compareDesc, parseISO } from 'date-fns'

import firebase from './firebase-admin'

export async function getAllFeedback(siteId) {
  try {
    const snapshot = await firebase.collection('feedback').where('siteId', '==', siteId).get()

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
    const snapshot = await firebase.collection('sites').get()

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
