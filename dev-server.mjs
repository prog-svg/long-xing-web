import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const root = join(process.cwd(), 'dist');
const types = { '.html':'text/html; charset=utf-8', '.css':'text/css; charset=utf-8', '.js':'text/javascript; charset=utf-8', '.png':'image/png' };

createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = normalize(join(root, pathname === '/' ? 'index.html' : pathname));
    if (!file.startsWith(root)) throw new Error('Forbidden');
    if ((await stat(file)).isDirectory()) file = join(file, 'index.html');
    const body = await readFile(file);
    response.writeHead(200, { 'Content-Type': types[extname(file)] || 'application/octet-stream', 'Cache-Control':'no-store' });
    response.end(body);
  } catch {
    response.writeHead(404, { 'Content-Type':'text/plain; charset=utf-8' });
    response.end('No encontrado');
  }
}).listen(46731, '127.0.0.1', () => console.log('LONG XING preview: http://127.0.0.1:46731'));
