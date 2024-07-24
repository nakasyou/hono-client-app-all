import { Hono } from '@hono/hono'
import { hc } from '@hono/hono/client'

const app = new Hono()
  .all('/', c => c.text(`Hello ${c.req.method}!`))

Deno.serve({
  async onListen() {
    const client = hc<typeof app>('http://localhost:8000')
    const res = await client.index.$all().then(res => res.text())
    console.log(res)
  }
}, app.fetch)
