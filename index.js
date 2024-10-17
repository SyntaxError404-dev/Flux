const express = require('express');
const cors = require('cors');
const axios = require('axios');
const winston = require('winston');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'error.log', level: 'error' })
  ]
});

app.get('/generate', async (req, res) => {
  try {
    const { prompt, ratio } = req.query;

    if (!prompt) {
      logger.warn('Prompt is missing in request');
      return res.status(400).json({ error: '📝 Prompt is required. Please provide a prompt to generate an image.' });
    }

    const response = await axios({
      method: 'get',
      url: `https://sandipbaruwal.onrender.com/fluxdev?prompt=${encodeURIComponent(prompt)}&ratio=${encodeURIComponent(ratio)}`,
      responseType: 'arraybuffer'
    });

    res.set('Content-Type', 'image/jpeg');
    res.send(Buffer.from(response.data, 'binary'));

  } catch (error) {
    logger.error('Error generating image:', error);
    res.status(500).json({
      error: '⚠️ Oops! There was an error generating the image. Please try again later.',
      contact: '📞 If the problem persists, reach out to the API author: https://www.facebook.com/nehal143meta?mibextid=ZbWKwL'
    });
  }
});

app.listen(port, () => {
  logger.info(`🚀 Server running at http://localhost:${port}`);
});
