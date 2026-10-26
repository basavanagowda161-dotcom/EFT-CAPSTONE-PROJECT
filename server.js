require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public')); // serves the html, css and js files

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/medicines', require('./routes/medicine.routes'));
app.use('/api/billing', require('./routes/billing.routes'));
app.use('/api/orders', require('./routes/order.routes'));
app.use('/api/dashboard', require('./routes/dashboard.routes'));

// Any /api address that does not exist gives a clear message
app.use('/api', function (req, res) {
  res.status(404).json({ error: 'No such address: ' + req.method + ' ' + req.originalUrl });
});

// If any code throws an error, send it back as JSON
app.use(function (err, req, res, next) {
  res.status(400).json({ error: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Open http://localhost:' + PORT);
});