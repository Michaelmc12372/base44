const http = require('node:http');

// Run the project's own script so its output is part of the app's startup.
require('./index.js');

const PORT = Number(process.env.PORT) || 3000;

const page = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>hi base44</title>
    <style>
      body {
        margin: 0;
        min-height: 100vh;
        display: grid;
        place-items: center;
        font-family: ui-sans-serif, system-ui, sans-serif;
        background: #0b0b0f;
        color: #f5f5f7;
      }
      main { text-align: center; }
      h1 { font-size: clamp(2rem, 8vw, 4rem); margin: 0 0 0.5rem; }
      p { margin: 0; color: #9a9aa5; font-size: 0.95rem; }
    </style>
  </head>
  <body>
    <main>
      <h1>hi base44</h1>
      <p>Served from <code>index.js</code> by <code>server.js</code></p>
    </main>
  </body>
</html>
`;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
  res.end(page);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`listening on http://0.0.0.0:${PORT}`);
});
