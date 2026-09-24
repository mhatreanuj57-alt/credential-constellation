import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'public');
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.md':'text/markdown; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon' };
createServer((request, response) => {
  const path = normalize(join(root, request.url === '/' ? 'index.html' : decodeURIComponent(request.url))).replace(root, '');
  const file = join(root, path);
  if (!file.startsWith(root) || !existsSync(file)) { response.writeHead(404); return response.end('Not found'); }
  response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(4173, '127.0.0.1', () => console.log('Credential Constellation → http://127.0.0.1:4173'));
