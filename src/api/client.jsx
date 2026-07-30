/**
 * apiClient
 * ---------
 * Right now this reads from a static JSON file in /public/data.json, but it's
 * shaped like a real API call on purpose: a single async function that
 * returns a Promise. When a real backend is ready, only the inside of this
 * file needs to change (swap the fetch URL for your API endpoint) — every
 * component that calls getSiteData() keeps working exactly the same.
 */

const DATA_ENDPOINT = '/data.json'

let cachedData = null
let inFlightRequest = null

/**
 * Fetch all site content (nav, hero, technologies, team, projects,
 * testimonials, contact, footer, etc).
 * @param {{ force?: boolean }} options - pass { force: true } to bypass cache
 * @returns {Promise<object>} the full site data object
 */
export async function getSiteData(options = {}) {
  const { force = false } = options

  if (cachedData && !force) return cachedData
  if (inFlightRequest && !force) return inFlightRequest

  inFlightRequest = fetch(DATA_ENDPOINT, { headers: { Accept: 'application/json' } })
    .then((res) => {
      if (!res.ok) {
        throw new Error(`Failed to load site data (${res.status})`)
      }
      return res.json()
    })
    .then((json) => {
      cachedData = json
      inFlightRequest = null
      return json
    })
    .catch((err) => {
      inFlightRequest = null
      throw err
    })

  return inFlightRequest
}

/** Convenience helper: fetch all data, then find one project by slug. */
export async function getProjectBySlug(slug) {
  const data = await getSiteData()
  return data.projects?.find((p) => p.slug === slug) || null
}

export default getSiteData
