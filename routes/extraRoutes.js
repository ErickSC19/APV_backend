import express from 'express';

const router = express.Router();

router.head('/head', async (req, res) => {
  res.set('APV', 'Veterinarian Patient Admin');
  res.status(200).end();
});

router.trace('*', async (req, res) => {
  res.set('Content-Type', 'message/http');
  res.status(200).end(
    `${req.method} ${req.url} HTTP/${req.httpVersion}\r\n` +
      req.rawHeaders.join('\r\n')
  );
});

export default router;
