
let cacheData='cacheV1'

this.addEventListener('install', async (e) => {
    const cache = await caches.open(cacheData)
    if (cache) {
        await cache.addAll([
            '/static/js/bundle.js',
            '/static/media/digitlgbg4.8284acd8b0359ab22e2e.jpg',
            '/favicon.ico',
            '/index.html',
            '/',
            '/reg',
            '/home',
            '/users',
            '/about',
            '/contact',
            '/workarounds',
            '/workcenter',
            '/schedules',
            '/taghistory',
            '/factory',
            '/production',
            '/lightup',
            '/officials',
            '/documents',
            '/review',
            '/analytics',
            '/profile',
        ])
    }
    else {
        console.warn(`Cache Still not Created !!!`)
    }
})

this.addEventListener('fetch', async (e) => {
    if (!navigator.onLine) {
        const resp = await e.respondWith(caches.match(e.request))
        if (resp) {
            return resp
        }
        let reqUrl = e.request.clone()
        fetch(reqUrl)
    }
})
