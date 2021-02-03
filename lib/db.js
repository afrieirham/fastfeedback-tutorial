import firebase from './firebase'

const firestore = firebase.firestore()

export function createUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}

export function createSite(site) {
  const newSite = firestore.collection('sites').doc()
  newSite.set(site)
  return newSite
}

export function createFeedback(feedback) {
  const newFeedback = firestore.collection('feedback').doc()
  newFeedback.set(feedback)
  return newFeedback
}

export function deleteFeedback(feedbackId) {
  return firestore.collection('feedback').doc(feedbackId).delete()
}
