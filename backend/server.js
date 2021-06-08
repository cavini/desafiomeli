const express = require('express');
const app = express();
const axios = require('axios');

const PORT = process.env.PORT || 5000;

app.get('/api/items', async (req, res) => {
  try {
    const result = await axios.get(
      `https://api.mercadolibre.com/sites/MLA/search?q=:${req.query.search}`
    );

    res.json(result.data);
  } catch (error) {
    console.log(error);
    res.sendStatus(error.response.status);
  }
});

app.get('/api/items/:id', async (req, res) => {
  try {
    const productInfo = await axios.get(
      `https://api.mercadolibre.com/items/${req.params.id}`
    );
    const description = await axios.get(
      `https://api.mercadolibre.com/items/${req.params.id}/description`
    );
    res.json({ ...productInfo.data, ...description.data });
  } catch (error) {
    res.sendStatus(error.response.status);
  }
});

app.get('/api/categories/:id', async (req, res) => {
  const categoryInfo = await axios.get(
    `https://api.mercadolibre.com/categories/${req.params.id}`
  );

  res.json(categoryInfo.data);
});

app.listen(PORT, console.log(`Server running on port ${PORT}`));
