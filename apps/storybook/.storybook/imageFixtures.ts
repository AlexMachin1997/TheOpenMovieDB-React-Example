import type { Plugin } from 'vite';

/** The route the fixture is served from. Stories build their URLs with `imageFixtureUrl`. */
export const IMAGE_FIXTURE_ROUTE = '/__image-fixture';

const svg = (width: number, height: number) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
	<defs>
		<linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
			<stop offset="0" stop-color="#0d253f"/>
			<stop offset="1" stop-color="#01b4e4"/>
		</linearGradient>
	</defs>
	<rect width="100%" height="100%" fill="url(#g)"/>
	<circle cx="${width / 2}" cy="${height / 2}" r="${Math.min(width, height) / 4}" fill="none" stroke="#90cea1" stroke-width="${Math.max(2, Math.min(width, height) / 40)}"/>
	<text x="50%" y="50%" fill="#ffffff" font-family="sans-serif" font-size="${Math.max(10, Math.min(width, height) / 10)}" text-anchor="middle" dominant-baseline="middle">${width} × ${height}</text>
</svg>`;

/**
 * Serves stand-in images whose network behaviour a story chooses, so the `Image` component's
 * loading and failure paths run against real requests rather than synthetic events.
 *
 * Query parameters: `w` and `h` set the intrinsic size; `delay` holds the response for that many
 * milliseconds, as a slow or mobile connection would; `status` answers with that HTTP status
 * instead of an image; `abort` drops the socket with no response at all, as a lost connection
 * would. Responses are never cached, so a story always sees the behaviour it asked for.
 *
 * Nothing waits forever, deliberately. The dev server speaks HTTP/1.1, so Chromium allows six
 * connections to it; a request left open would hold one for the rest of the run and starve the
 * module requests of every later story in the same page.
 */
export const imageFixtures = (): Plugin => ({
	name: 'image-fixtures',
	configureServer(server) {
		server.middlewares.use(IMAGE_FIXTURE_ROUTE, (req, res) => {
			const query = new URL(req.url ?? '', 'http://localhost').searchParams;
			const delay = Math.min(Number(query.get('delay') ?? 0), 10_000);

			setTimeout(() => {
				if (query.has('abort')) {
					req.socket.destroy();
					return;
				}

				res.setHeader('Cache-Control', 'no-store');

				const status = Number(query.get('status') ?? 200);
				if (status !== 200) {
					res.statusCode = status;
					res.end();
					return;
				}

				res.setHeader('Content-Type', 'image/svg+xml');
				res.end(svg(Number(query.get('w') ?? 300), Number(query.get('h') ?? 450)));
			}, delay);
		});
	}
});
