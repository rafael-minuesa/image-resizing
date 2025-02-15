/*global SENTRY_DSN*/
/*global USE_SENTRY*/

import ImageComponents from './src/imageComponents'
import Toucan from 'toucan-js'
import ResizerOptions from './src/resizerOptions'

addEventListener('fetch', (event) => {
  let sentry = {}
  if (USE_SENTRY === 'true') {
    sentry = new Toucan({
      dsn: SENTRY_DSN,
      event,
    })
  }
  event.respondWith(handleRequest(event.request, sentry))
})

function sentryWrapper(isException, sentry, payload) {
  if (USE_SENTRY !== 'true') return
  if (isException) {
    sentry.captureException(payload)
  } else {
    sentry.captureMessage(payload)
  }
}

async function handleRequest(request, sentry) {
  try {
    /* Get the origin image if the request is from the resizer worker itself */
    if (/image-resizing/.test(request.headers.get('via'))) {
      return fetch(request)
    }
    const imgComponents = new ImageComponents(request.url)

    // Do not attempt to resize svg
    if (imgComponents.getExtension === '.svg') {
      return fetch(request)
    }

    const imageResizerOptions = new ResizerOptions(
      request.headers,
      imgComponents.getSize()
    )
    const imageRequest = new Request(imgComponents.getUnsizedUrl(), {
      headers: request.headers,
    })

    const response = await fetch(imageRequest, imageResizerOptions.getOptions())
    if (response.ok) {
      return response
    } else {
      sentryWrapper(false, sentry, 'Image resizing failed: ' + response.status)
      return response
    }
  } catch (err) {
    sentryWrapper(true, sentry, err)
    return new Response('Error fetching image', { status: 500 })
  }
}
