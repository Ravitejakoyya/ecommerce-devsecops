const express = require('express');
const app = express();
app.use(express.json());

app.post('/pay', (req, res) => {
  const { amount = 0 } = req.body || {};
  res.json({ status: "success", amount, txId: `tx_${Date.now()}` });
});

app.get('/health', (req, res) => res.json({ status: 'ok' }));

const port = process.env.PORT || 5001;
app.listen(port, () => console.log(`Payment service running on port ${port}`));
