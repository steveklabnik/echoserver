const http = require('http');

const PORT = process.env.PORT || 8080;

const server = http.createServer((req, res) => {
  const timestamp = new Date().toISOString();

  // Collect request body
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });

  req.on('end', () => {
    // Log the request details
    console.log('='.repeat(60));
    console.log(`[${timestamp}] ${req.method} ${req.url}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    if (body) {
      console.log('Body:', body);
    }
    console.log('='.repeat(60));

    // Build echo response
    const echoResponse = {
      timestamp,
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: body || null
    };

    // Send response
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(echoResponse, null, 2));
  });
});

server.listen(PORT, () => {
  console.log(`Echo server listening on port ${PORT}`);
});
