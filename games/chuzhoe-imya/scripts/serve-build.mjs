import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'

const port = Number(process.env.CHUZHOE_PORT || 42714)
const page = new URL('../../../web/public/games/chuzhoe-imya/index.html', import.meta.url)
const index = await readFile(page)
createServer((request, response) => {
  if (!['/', '/index.html'].includes(new URL(request.url, 'http://127.0.0.1').pathname)) {
    response.writeHead(404).end()
    return
  }
  response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' }).end(index)
}).listen(port, '127.0.0.1', () => console.log('http://127.0.0.1:' + port))
