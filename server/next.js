import express from 'express';
import next from 'next';

export async function setup() {
  const port = parseInt(process.env.PORT, 10) || 3000;
  const dev = process.env.NODE_ENV !== 'production';
  const app = next({ dev, dir: './src'});
  const handle = app.getRequestHandler();
  await app.prepare();

  const server = express();
  server.get('/',(req, res) => res.redirect('/search'));
  server.get('*', (req, res) => handle(req, res));
  server.listen(port, (err)=> {
    if (err) throw err;
    console.log(`> Ready on http:localhost:${port}`);
  });

}

export default {
  setup,
};