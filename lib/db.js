import firebase from './firebase'
import { getStripe } from './stripe'

const firestore = firebase.firestore()
const app = firebase.app()

export function createUser(user) {
  return firestore.collection('users').doc(user.uid).set(user, { merge: true })
}

export function createSite(site) {
  const newSite = firestore.collection('sites').doc()
  newSite.set(site)
  return newSite
}

export async function deleteSite(siteId) {
  // Delete site in db
  firestore.collection('sites').doc(siteId).delete()

  // Delete all feedback for that site
  const batch = firestore.batch()
  const snapshot = await firestore.collection('feedback').where('siteId', '==', siteId).get()
  snapshot.forEach((doc) => {
    batch.delete(doc.ref)
  })

  return batch.commit()
}

export function updateSite(siteId, newValues) {
  return firestore.collection('sites').doc(siteId).update(newValues)
}

export function createFeedback(feedback) {
  const newFeedback = firestore.collection('feedback').doc()
  newFeedback.set(feedback)
  return newFeedback
}

export function deleteFeedback(feedbackId) {
  return firestore.collection('feedback').doc(feedbackId).delete()
}

export function updateFeedback(feedbackId, newValues) {
  return firestore.collection('feedback').doc(feedbackId).update(newValues)
}

export async function createCheckoutSession(uid) {
  const checkoutSessionRef = await firestore
    .collection('users')
    .doc(uid)
    .collection('checkout_sessions')
    .add({
      price: 'price_1IH9sVDdUlmR2Nyfipnw86yh',
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    })

  // Wait for the CheckoutSession to get attached by the extension
  checkoutSessionRef.onSnapshot(async (snap) => {
    const { error, sessionId } = snap.data()
    if (error) {
      alert(`An error occured: ${error.message}`)
    }

    // Direct to Stripe checkout
    if (sessionId) {
      const stripe = await getStripe()
      stripe.redirectToCheckout({ sessionId })
    }
  })
}

export async function goToBillingPortal() {
  const billingPortalRef = app
    .functions('us-central1')
    .httpsCallable('ext-firestore-stripe-subscriptions-createPortalLink')

  const { data } = await billingPortalRef({ returnUrl: `${window.location.origin}/account` })
  window.location.assign(data.url)
}
