import { LRUCache } from 'lru-cache'

// Create cache instance
const cache = new LRUCache({
	max: 100, // Maximum number of items
	ttl: 1000 * 60 * 5, // 5 minutes TTL
	allowStale: false,
	updateAgeOnGet: false,
	updateAgeOnHas: false,
})

export function getCached(key) {
	return cache.get(key)
}

export function setCached(key, value, ttl) {
	return cache.set(key, value, { ttl })
}

export function deleteCached(key) {
	return cache.delete(key)
}

export function clearCache() {
	return cache.clear()
}