import express from 'express';
import fetch from 'node-fetch';
const app = express();
app.get('/api/proxy', async (req, res) => {
  const url = req.query.url as string;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

const port = process.env.PORT || 3000;


app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
