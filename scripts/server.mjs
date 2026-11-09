import { createReadStream, existsSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'public');
const port = Number(process.env.PORT) || 4174;
const categoryRoutes = new Set(['/certificates', '/badges', '/milestones']);
const types = { '.html':'text/html; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.css':'text/css; charset=utf-8', '.md':'text/markdown; charset=utf-8', '.png':'image/png', '.svg':'image/svg+xml', '.ico':'image/x-icon' };
createServer((request, response) => {
  const pathname = new URL(request.url, 'http://127.0.0.1').pathname;
  const path = normalize(join(root, pathname === '/' || categoryRoutes.has(pathname) ? 'index.html' : decodeURIComponent(pathname))).replace(root, '');
  const file = join(root, path);
  if (!file.startsWith(root) || !existsSync(file)) { response.writeHead(404); return response.end('Not found'); }
  response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream' });
  createReadStream(file).pipe(response);
}).listen(port, '127.0.0.1', () => console.log(`Credential Constellation → http://127.0.0.1:${port}`));
