const express = require('express')
const app = express()
app.use(express.json());
const port = 2000
var cors = require('cors')

require('dotenv').config()

//#region Mongo
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URL);

const Product = mongoose.model('Product', {
  name: String,
  image: String,
  ingreS: [String],
  description: String
});
//#endregion
app.use(cors())
// app.get('/', (req, res) => {
//   res.send('¯\_(ツ)_/¯ Lesson 21 Server (Back-end)')
// })
app.use('/', express.static('public'));

app.get('/api/product', async (req, res) => {
  let allProducts = await Product.find()
  res.json(allProducts)
})
app.post('/api/product', async (req, res) => {
  let product = req.body
  if (!product._id) product._id = new mongoose.Types.ObjectId()

  await Product.findByIdAndUpdate(product._id, product, {upsert: true})
  res.json({ 'status': true })
})
app.listen(port, () => {
  console.log(`Lesson 22 http://localhost:${port}`)
})