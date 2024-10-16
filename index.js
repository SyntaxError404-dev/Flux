const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const port = 3000;

app.use(cors());

app.get('/generate', async (req, res) => {
  try {
    const { prompt, ratio } = req.query;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    const response = await axios({
      method: 'get',
      url: `https://sandipbaruwal.onrender.com/fluxdev?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`,
      responseType: 'arraybuffer'
    });

    res.set('Content-Type', 'image/jpeg');
    res.send(Buffer.from(response.data, 'binary'));

  } catch (error) {
    console.error('Error generating image:', error);
    res.status(500).json({ 
      error: 'Error generating image, Please contact the API author at: https://www.facebook.com/nehal143meta?mibextid=ZbWKwL' 
    });
  }
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
