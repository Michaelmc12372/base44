# Base44 dev environment notes

## What this repo is
`index.js` is a plain Node script that prints `hi base44` to stdout and exits. It has no
dependencies, no `package.json`, and no web server of its own, so on its own it can never
serve the preview.

`server.js` is the preview entry point added for the sandbox: it `require`s `index.js` (so
the script's output still runs at startup) and serves a small static page on port 3000.

## Running it
```sh
docker compose -f docker-compose.base44.yml up -d
```
- Single `web` service: `node:22-slim`, repo bind-mounted at `/app`, started with
  `node --watch server.js` for live reload. No install step is needed (zero dependencies);
  if dependencies are ever added, add a lockfile-preserving install to the service
  `command` before `exec node --watch server.js`.
- The service listens on `0.0.0.0:3000`, mapped to host port 3000 (the preview port).
- No external services and no credentials are required.

## How to verify
```sh
curl -s http://localhost:3000/            # 200 + the "hi base44" page
docker compose -f docker-compose.base44.yml logs --tail 20   # prints "hi base44"
docker compose -f docker-compose.base44.yml ps               # web should be (healthy)
```
Live reload: `node --watch` restarts the process when `server.js` or `index.js` change, and the
logs show `Restarting 'server.js'`. The healthcheck uses the Node binary itself (the image has
no curl), so no health endpoint exists in the app code.
