const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017/ecom';

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err.message));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

app.get('/health', (req, res) => res.json({ status: 'ok' }));

app.get('/products', async (req, res) => {
  const products = await Product.find().limit(100);
  res.json(products);
});

app.post('/products', async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  res.status(201).json(p);
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on port ${port}`));
